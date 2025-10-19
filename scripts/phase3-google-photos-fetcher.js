#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  console.error('❌ GOOGLE_MAPS_API_KEY not found in .env file');
  process.exit(1);
}

console.log('🚀 PHASE 3: Google Photos Fetcher with Cost Controls');
console.log('💰 Budget: $12.00 hard cap, $10.00 soft alert');
console.log('⏱️  Rate limit: 120 calls/hour');
console.log('');

// Initialize tracking
const tracking = {
  startTime: Date.now(),
  totalCalls: 0,
  totalCost: 0,
  callsByType: { details: 0, photos: 0 },
  venuesProcessed: 0,
  venuesSkipped: 0,
  venuesFailed: 0,
  batch1Venues: [],
  batch2Venues: [],
  apiUsageLog: [],
  provenance: []
};

// Cost tracking
const COSTS = {
  details: 0.017,
  photos: 0.007
};

const RATE_LIMIT = 120; // calls per hour
const SOFT_LIMIT = 10.00; // dollars
const HARD_LIMIT = 12.00; // dollars

// Load venue data
const venuesPath = path.join(process.cwd(), 'public/venues.json');
const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = venuesData.venues || venuesData;

// Create directories
const imagesDir = path.join(process.cwd(), 'public/images/restaurants');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Priority batching - identify high-impact venues first
function prioritizeVenues(venues) {
  const batch1 = [];
  const batch2 = [];
  
  venues.forEach(venue => {
    if (venue.needs_fetch || !venue.image_hero_path) {
      // Batch 1: High-impact venues (top rated, popular cuisines, central locations)
      if (venue.rating >= 4.5 || 
          venue.cuisines?.includes('british') || 
          venue.cuisines?.includes('indian') ||
          venue.cuisines?.includes('italian') ||
          venue.borough === 'Central London' ||
          venue.borough === 'Westminster') {
        batch1.push(venue);
      } else {
        batch2.push(venue);
      }
    }
  });
  
  return { batch1, batch2 };
}

// Check if we can proceed with API calls
function canProceed() {
  if (tracking.totalCost >= HARD_LIMIT) {
    console.log(`❌ HARD LIMIT REACHED: $${tracking.totalCost.toFixed(2)}`);
    return false;
  }
  
  if (tracking.totalCost >= SOFT_LIMIT) {
    console.log(`⚠️  SOFT LIMIT REACHED: $${tracking.totalCost.toFixed(2)}`);
    console.log('📊 PROGRESS REPORT:');
    console.log(`   Venues processed: ${tracking.venuesProcessed}`);
    console.log(`   Venues skipped: ${tracking.venuesSkipped}`);
    console.log(`   Venues failed: ${tracking.venuesFailed}`);
    console.log(`   Total API calls: ${tracking.totalCalls}`);
    console.log(`   Total cost: $${tracking.totalCost.toFixed(2)}`);
    console.log('');
    console.log('🛑 PAUSING FOR APPROVAL');
    console.log('Continue with remaining venues? (yes/no)');
    return false;
  }
  
  return true;
}

// Rate limiting
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Make API call with rate limiting
async function makeApiCall(url, callType) {
  // Rate limiting: 120 calls/hour = 1 call per 30 seconds
  const rateLimitDelay = (60 * 60 * 1000) / RATE_LIMIT; // 30 seconds
  await sleep(rateLimitDelay);
  
  tracking.totalCalls++;
  tracking.callsByType[callType]++;
  tracking.totalCost += COSTS[callType];
  
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const duration = Date.now() - startTime;
        const bytes = Buffer.byteLength(data);
        
        // Log API usage
        tracking.apiUsageLog.push({
          timestamp: new Date().toISOString(),
          callType,
          url: url.substring(0, 100) + '...',
          bytes,
          duration,
          cost: COSTS[callType],
          status: res.statusCode
        });
        
        if (res.statusCode === 200) {
          resolve({ data, bytes });
        } else {
          reject(new Error(`API call failed: ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Check if venue has valid local images
function hasValidLocalImages(venue) {
  if (!venue.image_hero_path || venue.image_hero_path.startsWith('http')) {
    return false;
  }
  
  const heroPath = path.join(process.cwd(), 'public', venue.image_hero_path);
  if (!fs.existsSync(heroPath)) {
    return false;
  }
  
  const stats = fs.statSync(heroPath);
  if (stats.size < 50000) { // Less than 50KB
    return false;
  }
  
  // Check if it's a valid image file
  const content = fs.readFileSync(heroPath);
  const isWebP = content.slice(0, 4).toString('hex') === '52494646'; // RIFF header
  const isJPEG = content.slice(0, 2).toString('hex') === 'ffd8';
  const isPNG = content.slice(0, 8).toString('hex') === '89504e470d0a1a0a';
  
  return isWebP || isJPEG || isPNG;
}

// Get photo references from venue data or API
async function getPhotoReferences(venue) {
  // Check if venue already has photo references
  if (venue.photos && venue.photos.length > 0) {
    const validPhotos = venue.photos.filter(photo => 
      photo.url && !photo.url.includes('placeholder') && photo.url.includes('photoreference=')
    );
    
    if (validPhotos.length > 0) {
      console.log(`   ✅ Using existing photo references for ${venue.name}`);
      return validPhotos.map(photo => {
        const match = photo.url.match(/photoreference=([^&]+)/);
        return match ? match[1] : null;
      }).filter(Boolean);
    }
  }
  
  // Need to call Details API
  if (!canProceed()) {
    throw new Error('Budget limit reached');
  }
  
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${venue.place_id}&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;
  
  console.log(`   📞 Calling Details API for ${venue.name}`);
  const response = await makeApiCall(detailsUrl, 'details');
  const details = JSON.parse(response.data);
  
  if (details.result && details.result.photos) {
    const photoRefs = details.result.photos.map(photo => photo.photo_reference);
    
    // Update venue with photo references
    venue.photos = details.result.photos.map(photo => ({
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`,
      photo_reference: photo.photo_reference,
      width: photo.width,
      height: photo.height
    }));
    
    return photoRefs;
  }
  
  return [];
}

// Download and process image
async function downloadAndProcessImage(venue, photoRef, cuisine) {
  if (!canProceed()) {
    throw new Error('Budget limit reached');
  }
  
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
  
  console.log(`   📸 Downloading image for ${venue.name}`);
  const response = await makeApiCall(photoUrl, 'photos');
  
  // Create venue directory
  const venueDir = path.join(imagesDir, venue.slug || venue.place_id);
  if (!fs.existsSync(venueDir)) {
    fs.mkdirSync(venueDir, { recursive: true });
  }
  
  // Generate hash for filename
  const hash = crypto.createHash('md5').update(response.data).digest('hex').substring(0, 8);
  
  // Save hero image (1600w)
  const heroFilename = `${cuisine}-${venue.slug || venue.place_id}-hero-${hash}.webp`;
  const heroPath = path.join(venueDir, heroFilename);
  fs.writeFileSync(heroPath, response.data);
  
  // For now, we'll use the same image for card (we can optimize this later)
  const cardFilename = `${cuisine}-${venue.slug || venue.place_id}-card-${hash}.webp`;
  const cardPath = path.join(venueDir, cardFilename);
  fs.writeFileSync(cardPath, response.data);
  
  // Update venue data
  venue.image_hero_path = `/images/restaurants/${venue.slug || venue.place_id}/${heroFilename}`;
  venue.image_card_path = `/images/restaurants/${venue.slug || venue.place_id}/${cardFilename}`;
  venue.image_alt = `${venue.name} — ${cuisine} restaurant in ${venue.borough || 'London'}`;
  venue.needs_fetch = false;
  
  // Record provenance
  tracking.provenance.push({
    venue: venue.name,
    slug: venue.slug || venue.place_id,
    source: 'google_places',
    photo_reference: photoRef,
    hero_path: venue.image_hero_path,
    card_path: venue.image_card_path,
    bytes: response.bytes,
    timestamp: new Date().toISOString()
  });
  
  console.log(`   ✅ Saved images for ${venue.name}`);
  return { heroPath: venue.image_hero_path, cardPath: venue.image_card_path };
}

// Process a single venue
async function processVenue(venue) {
  try {
    console.log(`\n🏪 Processing: ${venue.name}`);
    
    // Skip if already has valid local images
    if (hasValidLocalImages(venue)) {
      console.log(`   ⏭️  Skipping ${venue.name} - has valid local images`);
      tracking.venuesSkipped++;
      return;
    }
    
    // Get photo references
    const photoRefs = await getPhotoReferences(venue);
    
    if (photoRefs.length === 0) {
      console.log(`   ❌ No photo references found for ${venue.name}`);
      venue.needs_manual_image = true;
      tracking.venuesFailed++;
      return;
    }
    
    // Use the first photo reference
    const primaryCuisine = venue.cuisines?.[0] || 'restaurant';
    await downloadAndProcessImage(venue, photoRefs[0], primaryCuisine);
    
    tracking.venuesProcessed++;
    
  } catch (error) {
    console.log(`   ❌ Error processing ${venue.name}: ${error.message}`);
    venue.needs_manual_image = true;
    tracking.venuesFailed++;
  }
}

// Process batch
async function processBatch(batch, batchName) {
  console.log(`\n📦 Processing ${batchName}: ${batch.length} venues`);
  
  for (let i = 0; i < batch.length; i++) {
    const venue = batch[i];
    
    if (!canProceed()) {
      console.log(`\n🛑 Stopping ${batchName} - budget limit reached`);
      break;
    }
    
    await processVenue(venue);
    
    // Progress update every 10 venues
    if ((i + 1) % 10 === 0) {
      console.log(`   📊 Progress: ${i + 1}/${batch.length} venues, $${tracking.totalCost.toFixed(2)} spent`);
    }
  }
  
  // Save batch summary
  const batchSummary = {
    batch: batchName,
    timestamp: new Date().toISOString(),
    venuesProcessed: tracking.venuesProcessed,
    venuesSkipped: tracking.venuesSkipped,
    venuesFailed: tracking.venuesFailed,
    totalCalls: tracking.totalCalls,
    totalCost: tracking.totalCost,
    callsByType: tracking.callsByType
  };
  
  const summaryPath = path.join(process.cwd(), 'reports/batch_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(batchSummary, null, 2));
  
  console.log(`\n✅ ${batchName} complete: ${tracking.venuesProcessed} processed, $${tracking.totalCost.toFixed(2)} spent`);
}

// Main execution
async function main() {
  console.log('🎯 Starting image fetching pipeline...');
  
  // Prioritize venues
  const { batch1, batch2 } = prioritizeVenues(venues);
  tracking.batch1Venues = batch1;
  tracking.batch2Venues = batch2;
  
  console.log(`📊 Batch 1 (high priority): ${batch1.length} venues`);
  console.log(`📊 Batch 2 (remaining): ${batch2.length} venues`);
  
  // Process Batch 1
  await processBatch(batch1, 'Batch 1 (High Priority)');
  
  // Check if we can continue
  if (!canProceed()) {
    console.log('\n🛑 Stopping after Batch 1 - budget limit reached');
  } else {
    // Process Batch 2
    await processBatch(batch2, 'Batch 2 (Remaining)');
  }
  
  // Save updated venue data
  fs.writeFileSync(venuesPath, JSON.stringify(venuesData, null, 2));
  
  // Save final reports
  const finalReport = {
    timestamp: new Date().toISOString(),
    duration: Date.now() - tracking.startTime,
    totalVenues: venues.length,
    venuesProcessed: tracking.venuesProcessed,
    venuesSkipped: tracking.venuesSkipped,
    venuesFailed: tracking.venuesFailed,
    totalCalls: tracking.totalCalls,
    totalCost: tracking.totalCost,
    callsByType: tracking.callsByType,
    batch1Size: batch1.length,
    batch2Size: batch2.length
  };
  
  fs.writeFileSync(path.join(process.cwd(), 'reports/final_report_v6.json'), JSON.stringify(finalReport, null, 2));
  fs.writeFileSync(path.join(process.cwd(), 'reports/api_usage_v6.csv'), 
    'timestamp,callType,url,bytes,duration,cost,status\n' +
    tracking.apiUsageLog.map(log => 
      `${log.timestamp},${log.callType},"${log.url}",${log.bytes},${log.duration},${log.cost},${log.status}`
    ).join('\n')
  );
  fs.writeFileSync(path.join(process.cwd(), 'reports/image_provenance_v6.json'), JSON.stringify(tracking.provenance, null, 2));
  
  console.log('\n🎉 PHASE 3 COMPLETE!');
  console.log(`📊 Final Stats:`);
  console.log(`   Venues processed: ${tracking.venuesProcessed}`);
  console.log(`   Venues skipped: ${tracking.venuesSkipped}`);
  console.log(`   Venues failed: ${tracking.venuesFailed}`);
  console.log(`   Total API calls: ${tracking.totalCalls}`);
  console.log(`   Total cost: $${tracking.totalCost.toFixed(2)}`);
  console.log(`   Duration: ${Math.round((Date.now() - tracking.startTime) / 1000 / 60)} minutes`);
  console.log('');
  console.log('📁 Reports saved:');
  console.log('   • /reports/final_report_v6.json');
  console.log('   • /reports/api_usage_v6.csv');
  console.log('   • /reports/image_provenance_v6.json');
  console.log('   • /reports/batch_summary.json');
}

// Run the pipeline
main().catch(console.error);
