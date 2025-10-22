#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import sharp from 'sharp';

console.log('🚀 DOWNLOADING GOOGLE PHOTOS FOR ALL MISSING VENUES\n');

// Configuration
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyBvOkBwJ1X5X5X5X5X5X5X5X5X5X5X5X5X'; // Replace with your actual API key
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/photo';
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

// Load venues data
const venuesPath = path.join(process.cwd(), 'data/venues-wrapped.json');
const venuesData = JSON.parse(await fs.readFile(venuesPath, 'utf8'));
const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues || [];

console.log(`📊 Total venues: ${venues.length}`);

// Find venues without real images
const venuesWithoutImages = venues.filter(venue => {
  const hasRealHero = venue.image_hero_path && !venue.image_hero_path.includes('placeholder');
  const hasRealCard = venue.image_card_path && !venue.image_card_path.includes('placeholder');
  return !hasRealHero && !hasRealCard;
});

console.log(`❌ Venues missing images: ${venuesWithoutImages.length}`);
console.log(`📸 Venues with Google photos: ${venues.filter(v => v.photos && v.photos.length > 0).length}`);

if (venuesWithoutImages.length === 0) {
  console.log('✅ All venues already have images!');
  process.exit(0);
}

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images', 'restaurants');
await fs.mkdir(imagesDir, { recursive: true });

let successCount = 0;
let errorCount = 0;
let skippedCount = 0;

console.log('\n🔄 Starting download process...\n');

for (let i = 0; i < venuesWithoutImages.length; i++) {
  const venue = venuesWithoutImages[i];
  const progress = `[${i + 1}/${venuesWithoutImages.length}]`;
  
  try {
    // Check if venue already has images
    const venueDir = path.join(imagesDir, venue.slug);
    const heroFile = path.join(venueDir, `${venue.slug}-hero.webp`);
    const cardFile = path.join(venueDir, `${venue.slug}-card.webp`);
    
    if (await fs.access(heroFile).then(() => true).catch(() => false) && 
        await fs.access(cardFile).then(() => true).catch(() => false)) {
      console.log(`${progress} ⏭️  Skipped ${venue.name} (images already exist)`);
      skippedCount++;
      continue;
    }

    // Get Google photos
    if (!venue.photos || venue.photos.length === 0) {
      console.log(`${progress} ❌ ${venue.name} - No Google photos available`);
      errorCount++;
      continue;
    }

    // Use the first photo (usually the best one)
    const photoRef = venue.photos[0].photo_reference;
    if (!photoRef) {
      console.log(`${progress} ❌ ${venue.name} - No photo reference`);
      errorCount++;
      continue;
    }

    // Download hero image (larger)
    const heroUrl = `${BASE_URL}?maxwidth=${MAX_WIDTH}&maxheight=${MAX_HEIGHT}&photoreference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`;
    const heroResponse = await fetch(heroUrl);
    
    if (!heroResponse.ok) {
      console.log(`${progress} ❌ ${venue.name} - Failed to download hero image (${heroResponse.status})`);
      errorCount++;
      continue;
    }

    const heroBuffer = await heroResponse.buffer();
    
    // Download card image (smaller)
    const cardUrl = `${BASE_URL}?maxwidth=800&maxheight=600&photoreference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`;
    const cardResponse = await fetch(cardUrl);
    
    if (!cardResponse.ok) {
      console.log(`${progress} ❌ ${venue.name} - Failed to download card image (${cardResponse.status})`);
      errorCount++;
      continue;
    }

    const cardBuffer = await cardResponse.buffer();

    // Create venue directory
    await fs.mkdir(venueDir, { recursive: true });

    // Process and save hero image
    const heroFilename = `${venue.slug}-hero.webp`;
    const heroPath = path.join(venueDir, heroFilename);
    
    await sharp(heroBuffer)
      .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(heroPath);

    // Process and save card image
    const cardFilename = `${venue.slug}-card.webp`;
    const cardPath = path.join(venueDir, cardFilename);
    
    await sharp(cardBuffer)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(cardPath);

    // Update venue data
    venue.image_hero_path = `/images/restaurants/${venue.slug}/${heroFilename}`;
    venue.image_card_path = `/images/restaurants/${venue.slug}/${cardFilename}`;
    venue.image_alt = `${venue.name} — ${venue.cuisines?.[0] || venue.cuisine || 'restaurant'} in ${venue.borough || venue.area || 'London'}`;

    // Add gallery images (use first 4 photos)
    if (venue.photos && venue.photos.length > 1) {
      venue.gallery_images = venue.photos.slice(1, 5).map((photo, index) => ({
        filename: `${venue.slug}-gallery-${index + 1}.webp`,
        path: `/images/restaurants/${venue.slug}/${venue.slug}-gallery-${index + 1}.webp`,
        attribution: `Google Places Photo`
      }));
    }

    successCount++;
    console.log(`${progress} ✅ ${venue.name} - Downloaded hero & card images`);

    // Add small delay to avoid rate limiting
    if (i % 10 === 0 && i > 0) {
      console.log(`   ⏳ Pausing for 2 seconds to avoid rate limiting...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

  } catch (error) {
    console.log(`${progress} ❌ ${venue.name} - Error: ${error.message}`);
    errorCount++;
  }
}

// Save updated venues data
console.log('\n💾 Saving updated venues data...');
await fs.writeFile(venuesPath, JSON.stringify(venues, null, 2));

console.log('\n📊 DOWNLOAD SUMMARY:');
console.log(`✅ Successfully downloaded: ${successCount} venues`);
console.log(`⏭️  Skipped (already exist): ${skippedCount} venues`);
console.log(`❌ Failed: ${errorCount} venues`);
console.log(`📈 Total processed: ${successCount + skippedCount + errorCount} venues`);

if (successCount > 0) {
  console.log('\n🎉 SUCCESS! Google photos downloaded for missing venues.');
  console.log(`   ${successCount} venues now have real restaurant photos.`);
  console.log(`   Total venues with real images: ${168 + successCount}`);
} else {
  console.log('\n⚠️  No new images were downloaded.');
}

if (errorCount > 0) {
  console.log(`\n⚠️  ${errorCount} venues failed to download images.`);
  console.log('   This might be due to API rate limits or missing photo references.');
}
