#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🖼️ VENUE IMAGE PATH UPDATER\n');

// Configuration
const VENUES_FILE = path.join(__dirname, '..', 'data', 'venues-wrapped.json');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'restaurants');

// Update venue data with existing local images
function updateVenueImagePaths(venue) {
  const venueDir = path.join(IMAGES_DIR, venue.slug);
  
  if (!fs.existsSync(venueDir)) {
    return false;
  }
  
  const files = fs.readdirSync(venueDir);
  const webpFiles = files.filter(file => file.endsWith('.webp'));
  
  if (webpFiles.length === 0) {
    return false;
  }
  
  // Find hero and card images
  let heroImage = null;
  let cardImage = null;
  const galleryImages = [];
  
  for (const file of webpFiles) {
    if (file.includes('-hero-') && !file.includes('gallery')) {
      heroImage = file;
    } else if (file.includes('-card-')) {
      cardImage = file;
    } else if (file.includes('-gallery-')) {
      galleryImages.push(file);
    } else if (file === 'hero.webp') {
      // Fallback hero image
      if (!heroImage) heroImage = file;
    }
  }
  
  // Update venue data
  if (heroImage) {
    venue.image_hero_path = `/images/restaurants/${venue.slug}/${heroImage}`;
  }
  
  if (cardImage) {
    venue.image_card_path = `/images/restaurants/${venue.slug}/${cardImage}`;
  }
  
  // Add gallery images
  if (galleryImages.length > 0) {
    venue.gallery_images = galleryImages.map(file => ({
      filename: file,
      path: `/images/restaurants/${venue.slug}/${file}`,
      attribution: null
    }));
  }
  
  // Add alt text
  const primaryCuisine = venue.cuisines?.[0] || 'restaurant';
  venue.image_alt = `${venue.name} — ${primaryCuisine} restaurant in ${venue.borough || 'London'}`;
  
  return true;
}

// Main processing function
async function updateAllVenues() {
  console.log('🚀 Starting Venue Image Path Update...\n');
  
  // Load venues data
  console.log('📂 Loading venues data...');
  const venuesData = JSON.parse(fs.readFileSync(VENUES_FILE, 'utf8'));
  const venues = venuesData.venues;
  
  console.log(`📊 Found ${venues.length} venues to process\n`);
  
  // Process venues
  const results = {
    updated: 0,
    skipped: 0,
    noImages: 0
  };
  
  for (const venue of venues) {
    console.log(`🏪 Processing: ${venue.name}`);
    
    const updated = updateVenueImagePaths(venue);
    
    if (updated) {
      results.updated++;
      console.log(`   ✅ Updated image paths for ${venue.name}`);
      if (venue.image_hero_path) console.log(`      Hero: ${venue.image_hero_path}`);
      if (venue.image_card_path) console.log(`      Card: ${venue.image_card_path}`);
      if (venue.gallery_images) console.log(`      Gallery: ${venue.gallery_images.length} images`);
    } else {
      results.noImages++;
      console.log(`   ❌ No images found for ${venue.name}`);
    }
  }
  
  // Save updated data
  console.log(`\n💾 Saving updated venue data...`);
  fs.writeFileSync(VENUES_FILE, JSON.stringify(venuesData, null, 2));
  
  console.log('\n🎉 Venue Image Path Update Complete!');
  console.log('\n📊 Summary:');
  console.log(`✅ Venues Updated: ${results.updated}`);
  console.log(`❌ Venues with No Images: ${results.noImages}`);
  console.log(`⏭️  Venues Skipped: ${results.skipped}`);
  
  console.log('\n📝 Next Steps:');
  console.log('1. Update image resolution logic');
  console.log('2. Enhance venue page gallery');
  console.log('3. Test all venues show real photos');
  console.log('4. Deploy and verify production');
}

// Run the script
updateAllVenues().catch(console.error);
