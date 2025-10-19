#!/usr/bin/env tsx

import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { buildPhotoUrl, downloadGooglePhoto, refreshPhotoRefs } from './googlePhotoDownloader';
import { isValidLocalImage } from './imageValidation';

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Validate API key
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) {
  console.error('❌ GOOGLE_MAPS_API_KEY not found in environment variables');
  process.exit(1);
}

// Log environment variables on startup
console.log('🔧 ENVIRONMENT CHECK:');
console.log(`GOOGLE_MAPS_API_KEY: ${API_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`PIPELINE_BUDGET_USD: ${process.env.PIPELINE_BUDGET_USD}`);
console.log(`PIPELINE_CONCURRENCY: ${process.env.PIPELINE_CONCURRENCY}`);
console.log(`PIPELINE_MIN_FILE_KB: ${process.env.PIPELINE_MIN_FILE_KB}`);
console.log(`PIPELINE_MAX_CALLS_PER_MIN: ${process.env.PIPELINE_MAX_CALLS_PER_MIN}`);

// Configuration from environment
const BUDGET_USD = parseFloat(process.env.PIPELINE_BUDGET_USD || '15.0');
const CONCURRENCY_LIMIT = parseInt(process.env.PIPELINE_CONCURRENCY || '4');
const MIN_FILE_KB = parseInt(process.env.PIPELINE_MIN_FILE_KB || '50');
const MAX_CALLS_PER_MIN = parseInt(process.env.PIPELINE_MAX_CALLS_PER_MIN || '40');
const CALL_INTERVAL_MS = (60 * 1000) / MAX_CALLS_PER_MIN;

const RETRY_DELAYS = [250, 750, 2000]; // ms

// Cost tracking
const COSTS = {
  details: 0.017,
  photos: 0.007
};

interface VenueResult {
  venue: string;
  slug: string;
  placeId: string;
  status: 'downloaded' | 'skipped' | 'failed';
  triedRefs: string[];
  chosenRef?: string;
  card?: { path: string; bytes: number };
  hero?: { path: string; bytes: number };
  error?: string;
  cost: number;
}

interface ProcessingStats {
  processed: number;
  skipped: number;
  failed: number;
  totalCost: number;
  startTime: number;
}

class VenueProcessor {
  private stats: ProcessingStats;
  private results: VenueResult[] = [];
  private semaphore = 0;
  private lastApiCall = 0;

  constructor() {
    this.stats = {
      processed: 0,
      skipped: 0,
      failed: 0,
      totalCost: 0,
      startTime: Date.now()
    };
  }

  private async waitForSlot(): Promise<void> {
    while (this.semaphore >= CONCURRENCY_LIMIT) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.semaphore++;
  }

  private releaseSlot(): void {
    this.semaphore--;
  }

  private canAfford(estimatedCost: number): boolean {
    return (this.stats.totalCost + estimatedCost) <= BUDGET_USD;
  }

  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastApiCall;
    
    if (timeSinceLastCall < CALL_INTERVAL_MS) {
      const delay = CALL_INTERVAL_MS - timeSinceLastCall;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    this.lastApiCall = Date.now();
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries = 3
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries - 1) {
          const delay = RETRY_DELAYS[attempt] || 2000;
          console.log(`   ⚠️  Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  private generateImagePath(venue: any, type: 'card' | 'hero'): string {
    const slug = venue.slug || venue.place_id;
    const cuisine = venue.cuisines?.[0] || 'restaurant';
    
    // Generate a hash for filename uniqueness - use a shorter hash to match existing pattern
    const hash = crypto.createHash('md5')
      .update(slug + type + Date.now().toString())
      .digest('hex')
      .substring(0, 8);
    
    return path.join(process.cwd(), 'public', 'images', 'restaurants', slug, 
      `${cuisine}-${slug}-${type}-${hash}.webp`);
  }

  private async processVenue(venue: any): Promise<VenueResult> {
    const result: VenueResult = {
      venue: venue.name,
      slug: venue.slug || venue.place_id,
      placeId: venue.place_id,
      status: 'failed',
      triedRefs: [],
      cost: 0
    };

    try {
      const cardPath = this.generateImagePath(venue, 'card');
      const heroPath = this.generateImagePath(venue, 'hero');
      
      // Ensure directory exists
      await fs.mkdir(path.dirname(cardPath), { recursive: true });

      // Check if both files already exist and are valid
      const cardValid = await isValidLocalImage(cardPath, MIN_FILE_KB);
      const heroValid = await isValidLocalImage(heroPath, MIN_FILE_KB);
      
      if (cardValid && heroValid) {
        console.log(`   ⏭️  Skipping ${venue.name} - valid images already exist`);
        result.status = 'skipped';
        return result;
      }

      // Get photo references
      let photoRefs: string[] = [];
      
      // Try existing photo references first
      if (venue.photos && venue.photos.length > 0) {
        photoRefs = venue.photos
          .map((photo: any) => photo.reference || photo.photo_reference || photo.url?.match(/photoreference=([^&]+)/)?.[1])
          .filter(Boolean);
      }
      
      // If no valid references, fetch new ones
      if (photoRefs.length === 0) {
        if (!this.canAfford(COSTS.details)) {
          throw new Error('Budget exceeded - cannot fetch photo references');
        }
        
        console.log(`   📞 Fetching new photo references for ${venue.name}`);
        await this.rateLimit();
        photoRefs = await this.retryWithBackoff(() => refreshPhotoRefs(venue.place_id, API_KEY!));
        result.cost += COSTS.details;
        this.stats.totalCost += COSTS.details;
      }

      if (photoRefs.length === 0) {
        throw new Error('No photo references available');
      }

      // Try up to 3 photo references
      let success = false;
      for (const ref of photoRefs.slice(0, 3)) {
        if (!this.canAfford(COSTS.photos * 2)) {
          throw new Error('Budget exceeded - cannot download photos');
        }

        result.triedRefs.push(ref);
        
        try {
          console.log(`   📸 Trying photo reference ${ref.substring(0, 8)}...`);
          
          // Download card image (1200w)
          const cardUrl = buildPhotoUrl(ref, API_KEY!, 1200);
          await this.rateLimit();
          await this.retryWithBackoff(() => downloadGooglePhoto({
            photoUrl: cardUrl,
            outPath: cardPath
          }));
          
          // Download hero image (1600w)
          const heroUrl = buildPhotoUrl(ref, API_KEY!, 1600);
          await this.rateLimit();
          await this.retryWithBackoff(() => downloadGooglePhoto({
            photoUrl: heroUrl,
            outPath: heroPath
          }));
          
          // Validate both images
          const finalCardValid = await isValidLocalImage(cardPath, MIN_FILE_KB);
          const finalHeroValid = await isValidLocalImage(heroPath, MIN_FILE_KB);
          
          if (finalCardValid && finalHeroValid) {
            const cardStats = await fs.stat(cardPath);
            const heroStats = await fs.stat(heroPath);
            
            result.status = 'downloaded';
            result.chosenRef = ref;
            result.card = { path: cardPath, bytes: cardStats.size };
            result.hero = { path: heroPath, bytes: heroStats.size };
            result.cost += COSTS.photos * 2;
            this.stats.totalCost += COSTS.photos * 2;
            
            console.log(`   ✅ Success: Downloaded images for ${venue.name}`);
            success = true;
            break;
          } else {
            throw new Error('Downloaded images failed validation');
          }
          
        } catch (error) {
          console.log(`   ❌ Failed with ref ${ref.substring(0, 8)}: ${error}`);
          // Clean up failed downloads
          try {
            await fs.unlink(cardPath);
            await fs.unlink(heroPath);
          } catch {
            // Ignore cleanup errors
          }
        }
      }
      
      if (!success) {
        throw new Error(`Failed to download valid images after trying ${result.triedRefs.length} references`);
      }
      
    } catch (error) {
      result.error = (error as Error).message;
      console.log(`   ❌ Failed: ${venue.name} - ${result.error}`);
    }
    
    return result;
  }

  async processVenues(venues: any[]): Promise<void> {
    console.log(`🚀 Processing ${venues.length} venues with budget $${BUDGET_USD}`);
    console.log(`📊 Concurrency limit: ${CONCURRENCY_LIMIT}`);
    console.log('');

    const promises = venues.map(async (venue) => {
      await this.waitForSlot();
      
      try {
        const result = await this.processVenue(venue);
        this.results.push(result);
        
        if (result.status === 'downloaded') {
          this.stats.processed++;
        } else if (result.status === 'skipped') {
          this.stats.skipped++;
        } else {
          this.stats.failed++;
        }
        
        // Progress update every 10 venues
        const total = this.stats.processed + this.stats.skipped + this.stats.failed;
        if (total % 10 === 0) {
          console.log(`📊 Progress: ${total}/${venues.length}, $${this.stats.totalCost.toFixed(2)} spent`);
        }
        
      } finally {
        this.releaseSlot();
      }
    });

    await Promise.all(promises);
  }

  getResults(): VenueResult[] {
    return this.results;
  }

  getStats(): ProcessingStats & { duration: number } {
    return {
      ...this.stats,
      duration: Date.now() - this.stats.startTime
    };
  }
}

async function loadFailedVenues(): Promise<any[]> {
  // Try to load from final report first
  let failureReport;
  try {
    const reportPath = path.join(process.cwd(), 'reports/final_report_v6.json');
    const reportData = await fs.readFile(reportPath, 'utf8');
    failureReport = JSON.parse(reportData);
  } catch {
    // Fallback to batch summary
    try {
      const summaryPath = path.join(process.cwd(), 'reports/batch_summary.json');
      const summaryData = await fs.readFile(summaryPath, 'utf8');
      failureReport = JSON.parse(summaryData);
    } catch {
      throw new Error('No failure report found. Please run the initial pipeline first.');
    }
  }

  // Load venue data
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(await fs.readFile(venuesPath, 'utf8'));
  const allVenues = venuesData.venues || venuesData;

  // Return venues that need processing:
  // 1. Don't have image_hero_path or image_card_path
  // 2. Have photos references available for downloading
  return allVenues.filter((venue: any) => {
    const hasLocalImages = venue.image_hero_path && venue.image_card_path;
    const hasPhotoRefs = venue.photos && venue.photos.length > 0;
    return !hasLocalImages && hasPhotoRefs;
  });
}

async function main() {
  try {
    console.log('🔧 Image Pipeline - Processing Failed Venues');
    console.log('==========================================');
    
    // Load failed venues
    const failedVenues = await loadFailedVenues();
    console.log(`📋 Found ${failedVenues.length} venues to process`);
    
    if (failedVenues.length === 0) {
      console.log('✅ No venues need processing');
      process.exit(0);
    }

    // Process venues
    const processor = new VenueProcessor();
    await processor.processVenues(failedVenues);

    // Generate report
    const results = processor.getResults();
    const stats = processor.getStats();
    
    const report = {
      timestamp: new Date().toISOString(),
      budget: BUDGET_USD,
      stats,
      results
    };

    const reportPath = path.join(process.cwd(), 'reports/image_replacement_summary_v7.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    // Console summary
    console.log('\n🎉 PROCESSING COMPLETE!');
    console.log('========================');
    console.log(`📊 Processed: ${stats.processed} venues`);
    console.log(`⏭️  Skipped: ${stats.skipped} venues`);
    console.log(`❌ Failed: ${stats.failed} venues`);
    console.log(`💰 Cost: $${stats.totalCost.toFixed(2)} / $${BUDGET_USD}`);
    console.log(`⏱️  Duration: ${Math.round(stats.duration / 1000)} seconds`);
    console.log(`📁 Report: ${reportPath}`);

    // Exit code based on results
    const exitCode = stats.failed > 0 ? 2 : 0;
    process.exit(exitCode);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
