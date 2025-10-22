#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');
const VENUES_FILE = path.join(PUB, 'venues.json');
const REPORT_FILE = path.join(ROOT, 'reports', 'smart_image_healing_report.json');

// Configuration
const MIN_FILE_SIZE = 50 * 1024; // 50KB minimum for valid images
const MAX_PLACEHOLDER_SIZE = 5 * 1024; // 5KB max for placeholders
const DAILY_FETCH_LIMIT = 100; // Conservative limit for external fetches

// Free Wikimedia Commons API
const WIKIMEDIA_API = 'https://commons.wikimedia.org/w/api.php';

class SmartImageHealer {
  constructor() {
    this.healedCount = 0;
    this.fetchedCount = 0;
    this.skippedCount = 0;
    this.errors = [];
    this.report = {
      timestamp: new Date().toISOString(),
      summary: {},
      details: []
    };
  }

  // Check if an image is a placeholder (too small or likely low-quality)
  isPlaceholder(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return stats.size < MIN_FILE_SIZE;
    } catch {
      return true;
    }
  }

  // Find the best local replacement image for a venue
  findBestLocalImage(venueSlug) {
    const candidates = [
      // Priority 1: Restaurant-specific images
      path.join(PUB, 'images', 'restaurants', venueSlug, 'hero.webp'),
      path.join(PUB, 'images', 'restaurants', venueSlug, 'card.webp'),
      path.join(PUB, 'images', 'restaurants', venueSlug, '1.webp'),
      
      // Priority 2: Venue-specific images
      path.join(PUB, 'images', 'venues', `${venueSlug}.webp`),
      path.join(PUB, 'images', 'venues', `${venueSlug}.jpg`),
      path.join(PUB, 'images', 'venues', `${venueSlug}.jpeg`),
      
      // Priority 3: Cached images
      path.join(PUB, 'images', '_cached', `${venueSlug}.webp`),
      path.join(PUB, 'images', '_cached', `${venueSlug}.jpg`),
      
      // Priority 4: Sourced images
      path.join(PUB, 'images', 'sourced', venueSlug, 'hero.webp'),
      path.join(PUB, 'images', 'sourced', venueSlug, 'card.webp'),
      
      // Priority 5: Google photos
      path.join(PUB, 'images', 'google', venueSlug, 'hero.webp'),
      path.join(PUB, 'images', 'google', venueSlug, 'card.webp'),
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && !this.isPlaceholder(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  // Fetch image from Wikimedia Commons (free, license-free)
  async fetchFromWikimedia(query, destPath) {
    return new Promise((resolve) => {
      const searchQuery = encodeURIComponent(`${query} restaurant food london`);
      const url = `${WIKIMEDIA_API}?action=query&generator=search&gsrsearch=${searchQuery}&gsrlimit=3&prop=imageinfo&iiprop=url&format=json&origin=*`;
      
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', async () => {
          try {
            const json = JSON.parse(data);
            const pages = json?.query?.pages || {};
            const imageUrls = Object.values(pages)
              .map(page => page.imageinfo?.[0]?.url)
              .filter(Boolean);
            
            if (imageUrls.length === 0) {
              resolve(false);
              return;
            }

            // Try each image URL until one works
            for (const imageUrl of imageUrls) {
              const success = await this.downloadImage(imageUrl, destPath);
              if (success) {
                resolve(true);
                return;
              }
            }
            resolve(false);
          } catch (error) {
            console.warn(`Wikimedia API error for "${query}":`, error.message);
            resolve(false);
          }
        });
      }).on('error', () => resolve(false));
    });
  }

  // Download image from URL
  async downloadImage(url, destPath) {
    return new Promise((resolve) => {
      const file = fs.createWriteStream(destPath);
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(destPath);
          resolve(false);
          return;
        }
        
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          // Verify the downloaded image is valid
          if (fs.existsSync(destPath) && !this.isPlaceholder(destPath)) {
            resolve(true);
          } else {
            fs.unlinkSync(destPath);
            resolve(false);
          }
        });
      }).on('error', () => {
        file.close();
        fs.unlinkSync(destPath);
        resolve(false);
      });
    });
  }

  // Heal a single venue's images
  async healVenueImages(venue) {
    const slug = venue.slug || venue.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
    const results = [];

    // Check current image paths - ensure they're strings
    const imagePaths = [
      venue.image_card_path,
      venue.image_hero_path,
      ...(venue.photos_local || []),
      ...(venue.photos || [])
    ].filter(Boolean).filter(path => typeof path === 'string');

    for (const imagePath of imagePaths) {
      const fullPath = path.join(PUB, imagePath.replace(/^\/+/, ''));
      
      if (fs.existsSync(fullPath) && this.isPlaceholder(fullPath)) {
        console.log(`🔧 Healing placeholder: ${imagePath}`);
        
        // Try to find a better local image first
        const betterLocal = this.findBestLocalImage(slug);
        if (betterLocal) {
          // Copy the better local image
          fs.copyFileSync(betterLocal, fullPath);
          results.push({
            path: imagePath,
            action: 'replaced_with_local',
            source: betterLocal.replace(PUB, ''),
            size: fs.statSync(fullPath).size
          });
          this.healedCount++;
        } else {
          // For now, skip external fetching due to API issues
          results.push({
            path: imagePath,
            action: 'no_replacement_found',
            reason: 'no_local_match_available'
          });
          this.skippedCount++;
        }
      } else {
        results.push({
          path: imagePath,
          action: 'no_action_needed',
          reason: fs.existsSync(fullPath) ? 'valid_image' : 'file_not_found'
        });
      }
    }

    return results;
  }

  // Main healing process
  async healAllImages() {
    console.log('🚀 Starting Smart Image Healing Process');
    
    if (!fs.existsSync(VENUES_FILE)) {
      throw new Error(`Venues file not found: ${VENUES_FILE}`);
    }

    const venues = JSON.parse(fs.readFileSync(VENUES_FILE, 'utf-8'));
    console.log(`📊 Processing ${venues.length} venues`);

    // Process venues in batches to avoid overwhelming the system
    const batchSize = 10;
    for (let i = 0; i < venues.length; i += batchSize) {
      const batch = venues.slice(i, i + batchSize);
      
      for (const venue of batch) {
        try {
          const results = await this.healVenueImages(venue);
          this.report.details.push({
            slug: venue.slug,
            name: venue.name,
            results
          });
        } catch (error) {
          this.errors.push({
            slug: venue.slug,
            error: error.message
          });
          console.warn(`⚠️ Error healing venue ${venue.slug}:`, error.message);
        }
      }
      
      // Progress update
      if (i % 50 === 0) {
        console.log(`📈 Progress: ${i}/${venues.length} venues processed`);
      }
    }

    // Generate summary
    this.report.summary = {
      totalVenues: venues.length,
      healedImages: this.healedCount,
      fetchedFromExternal: this.fetchedCount,
      skippedImages: this.skippedCount,
      errors: this.errors.length
    };

    // Save report
    fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
    fs.writeFileSync(REPORT_FILE, JSON.stringify(this.report, null, 2));

    console.log('\n✅ Smart Image Healing Complete!');
    console.log(`📸 Images healed: ${this.healedCount}`);
    console.log(`🌐 External fetches: ${this.fetchedCount}`);
    console.log(`⏭️ Skipped: ${this.skippedCount}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`📊 Report saved: ${REPORT_FILE}`);

    return this.report;
  }
}

// Run the healer
const healer = new SmartImageHealer();
healer.healAllImages().catch(console.error);
