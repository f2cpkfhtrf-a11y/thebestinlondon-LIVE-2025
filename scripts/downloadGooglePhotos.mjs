#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📸 GOOGLE PHOTOS DOWNLOADER & VENUE DATA UPDATER\n');

// Configuration
const VENUES_FILE = path.join(__dirname, '..', 'data', 'venues-wrapped.json');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'restaurants');
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';

// Image processing configuration
const IMAGE_CONFIG = {
  hero: { maxWidth: 1920, maxHeight: 1080, quality: 85 },
  card: { maxWidth: 1200, maxHeight: 800, quality: 85 },
  gallery: { maxWidth: 1600, maxHeight: 1200, quality: 90 }
};

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 100; // 100ms between requests

// Download image from Google Places API
async function downloadGooglePhoto(photoReference, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&maxheight=${maxHeight}&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer);
        });
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Rate limiting function
function rateLimit() {
  return new Promise((resolve) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const delay = Math.max(0, MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    
    setTimeout(() => {
      lastRequestTime = Date.now();
      resolve();
    }, delay);
  });
}

// Process venue images
async function processVenueImages(venue) {
  try {
    console.log(`\n🏪 Processing: ${venue.name}`);
    
    // Skip if no photos available
    if (!venue.photos || venue.photos.length === 0) {
      console.log(`   ❌ No photos available for ${venue.name}`);
      return { success: false, reason: 'No photos' };
    }
    
    // Create venue directory
    const venueDir = path.join(IMAGES_DIR, venue.slug);
    if (!fs.existsSync(venueDir)) {
      fs.mkdirSync(venueDir, { recursive: true });
    }
    
    // Get primary photo for hero and card
    const primaryPhoto = venue.photos[0];
    const primaryCuisine = venue.cuisines?.[0] || 'restaurant';
    
    console.log(`   📸 Downloading primary photo for ${venue.name}`);
    await rateLimit();
    
    // Download hero image
    const heroBuffer = await downloadGooglePhoto(
      primaryPhoto.reference,
      IMAGE_CONFIG.hero.maxWidth,
      IMAGE_CONFIG.hero.maxHeight
    );
    
    // Download card image
    const cardBuffer = await downloadGooglePhoto(
      primaryPhoto.reference,
      IMAGE_CONFIG.card.maxWidth,
      IMAGE_CONFIG.card.maxHeight
    );
    
    // Generate filenames
    const heroHash = crypto.createHash('md5').update(heroBuffer).digest('hex').substring(0, 8);
    const cardHash = crypto.createHash('md5').update(cardBuffer).digest('hex').substring(0, 8);
    
    const heroFilename = `${primaryCuisine}-${venue.slug}-hero-${heroHash}.webp`;
    const cardFilename = `${primaryCuisine}-${venue.slug}-card-${cardHash}.webp`;
    
    // Save images
    const heroPath = path.join(venueDir, heroFilename);
    const cardPath = path.join(venueDir, cardFilename);
    
    fs.writeFileSync(heroPath, heroBuffer);
    fs.writeFileSync(cardPath, cardBuffer);
    
    // Download gallery images (up to 4 additional photos)
    const galleryImages = [];
    const maxGalleryImages = Math.min(4, venue.photos.length - 1);
    
    for (let i = 1; i <= maxGalleryImages; i++) {
      const photo = venue.photos[i];
      if (photo) {
        console.log(`   📸 Downloading gallery image ${i} for ${venue.name}`);
        await rateLimit();
        
        try {
          const galleryBuffer = await downloadGooglePhoto(
            photo.reference,
            IMAGE_CONFIG.gallery.maxWidth,
            IMAGE_CONFIG.gallery.maxHeight
          );
          
          const galleryHash = crypto.createHash('md5').update(galleryBuffer).digest('hex').substring(0, 8);
          const galleryFilename = `${primaryCuisine}-${venue.slug}-gallery-${i}-${galleryHash}.webp`;
          const galleryPath = path.join(venueDir, galleryFilename);
          
          fs.writeFileSync(galleryPath, galleryBuffer);
          
          galleryImages.push({
            filename: galleryFilename,
            path: `/images/restaurants/${venue.slug}/${galleryFilename}`,
            width: photo.width,
            height: photo.height,
            attribution: photo.attributions?.[0] || null
          });
        } catch (error) {
          console.log(`   ⚠️ Failed to download gallery image ${i}: ${error.message}`);
        }
      }
    }
    
    // Update venue data
    venue.image_hero_path = `/images/restaurants/${venue.slug}/${heroFilename}`;
    venue.image_card_path = `/images/restaurants/${venue.slug}/${cardFilename}`;
    venue.image_alt = `${venue.name} — ${primaryCuisine} restaurant in ${venue.borough || 'London'}`;
    venue.gallery_images = galleryImages;
    venue.photos_processed = true;
    venue.photos_processed_at = new Date().toISOString();
    
    console.log(`   ✅ Successfully processed ${venue.name}`);
    console.log(`      Hero: ${heroFilename} (${(heroBuffer.length / 1024).toFixed(1)}KB)`);
    console.log(`      Card: ${cardFilename} (${(cardBuffer.length / 1024).toFixed(1)}KB)`);
    console.log(`      Gallery: ${galleryImages.length} images`);
    
    return { 
      success: true, 
      hero: heroFilename, 
      card: cardFilename, 
      gallery: galleryImages.length 
    };
    
  } catch (error) {
    console.log(`   ❌ Error processing ${venue.name}: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

// Main processing function
async function processAllVenues() {
  console.log('🚀 Starting Google Photos Download & Venue Data Update...\n');
  
  // Load venues data
  console.log('📂 Loading venues data...');
  const venuesData = JSON.parse(fs.readFileSync(VENUES_FILE, 'utf8'));
  const venues = venuesData.venues;
  
  console.log(`📊 Found ${venues.length} venues to process\n`);
  
  // Ensure images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
  
  // Process venues in batches
  const batchSize = 10;
  const results = {
    processed: 0,
    failed: 0,
    skipped: 0,
    totalPhotos: 0
  };
  
  for (let i = 0; i < venues.length; i += batchSize) {
    const batch = venues.slice(i, i + batchSize);
    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(venues.length / batchSize)}`);
    
    for (const venue of batch) {
      // Skip if already processed
      if (venue.photos_processed) {
        console.log(`   ⏭️  Skipping ${venue.name} - already processed`);
        results.skipped++;
        continue;
      }
      
      const result = await processVenueImages(venue);
      
      if (result.success) {
        results.processed++;
        results.totalPhotos += (result.gallery || 0) + 2; // +2 for hero and card
      } else {
        results.failed++;
      }
    }
    
    // Save progress after each batch
    console.log(`\n💾 Saving progress...`);
    fs.writeFileSync(VENUES_FILE, JSON.stringify(venuesData, null, 2));
    console.log(`   ✅ Progress saved`);
  }
  
  // Final save
  console.log(`\n💾 Final save...`);
  fs.writeFileSync(VENUES_FILE, JSON.stringify(venuesData, null, 2));
  
  console.log('\n🎉 Google Photos Download Complete!');
  console.log('\n📊 Summary:');
  console.log(`✅ Venues Processed: ${results.processed}`);
  console.log(`❌ Venues Failed: ${results.failed}`);
  console.log(`⏭️  Venues Skipped: ${results.skipped}`);
  console.log(`📸 Total Photos Downloaded: ${results.totalPhotos}`);
  
  console.log('\n📝 Next Steps:');
  console.log('1. Update image resolution logic');
  console.log('2. Enhance venue page gallery');
  console.log('3. Test all venues show real photos');
  console.log('4. Deploy and verify production');
}

// Run the script
processAllVenues().catch(console.error);
