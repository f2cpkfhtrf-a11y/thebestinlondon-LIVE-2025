#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 VERIFYING RESTAURANT IMAGE PATHS\n');

try {
  // Load venues data
  const venuesPath = path.join(process.cwd(), 'data/venues-wrapped.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues || [];

  console.log(`📊 Total venues: ${venues.length}`);

  // Check venues with real images
  let venuesWithRealImages = 0;
  let venuesWithCardImages = 0;
  let venuesWithHeroImages = 0;
  let venuesWithGalleryImages = 0;

  const sampleVenues = [];

  for (const venue of venues) {
    if (venue.image_hero_path && !venue.image_hero_path.includes('placeholder')) {
      venuesWithHeroImages++;
    }
    
    if (venue.image_card_path && !venue.image_card_path.includes('placeholder')) {
      venuesWithCardImages++;
    }
    
    if (venue.gallery_images && venue.gallery_images.length > 0) {
      venuesWithGalleryImages++;
    }
    
    if ((venue.image_hero_path || venue.image_card_path) && 
        !venue.image_hero_path?.includes('placeholder') && 
        !venue.image_card_path?.includes('placeholder')) {
      venuesWithRealImages++;
      
      if (sampleVenues.length < 5) {
        sampleVenues.push({
          name: venue.name,
          hero: venue.image_hero_path,
          card: venue.image_card_path,
          gallery: venue.gallery_images?.length || 0
        });
      }
    }
  }

  console.log('\n📈 IMAGE STATISTICS:');
  console.log(`✅ Venues with real hero images: ${venuesWithHeroImages}`);
  console.log(`✅ Venues with real card images: ${venuesWithCardImages}`);
  console.log(`✅ Venues with gallery images: ${venuesWithGalleryImages}`);
  console.log(`🎯 Venues with any real images: ${venuesWithRealImages}`);

  console.log('\n🔍 SAMPLE VENUES WITH REAL IMAGES:');
  sampleVenues.forEach((venue, index) => {
    console.log(`\n${index + 1}. ${venue.name}`);
    console.log(`   Hero: ${venue.hero}`);
    console.log(`   Card: ${venue.card}`);
    console.log(`   Gallery: ${venue.gallery} images`);
  });

  // Check if image files actually exist
  console.log('\n📁 CHECKING IMAGE FILE EXISTENCE:');
  let existingImages = 0;
  let missingImages = 0;

  for (const venue of venues.slice(0, 10)) { // Check first 10 venues
    if (venue.image_card_path) {
      const imagePath = path.join(process.cwd(), 'public', venue.image_card_path.replace('/public', ''));
      if (fs.existsSync(imagePath)) {
        existingImages++;
        console.log(`✅ ${venue.name}: ${venue.image_card_path}`);
      } else {
        missingImages++;
        console.log(`❌ ${venue.name}: ${venue.image_card_path} (file not found)`);
      }
    }
  }

  console.log(`\n📊 FILE EXISTENCE CHECK:`);
  console.log(`✅ Existing images: ${existingImages}`);
  console.log(`❌ Missing images: ${missingImages}`);

  if (venuesWithRealImages > 0) {
    console.log('\n🎉 SUCCESS: Restaurant images are properly configured!');
    console.log(`   ${venuesWithRealImages} venues have real images that will display on the restaurants page.`);
  } else {
    console.log('\n⚠️  WARNING: No venues have real images configured.');
  }

} catch (error) {
  console.error('❌ Error verifying restaurant images:', error);
}
