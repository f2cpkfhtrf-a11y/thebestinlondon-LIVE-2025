#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 ANALYZING VENUES WITHOUT REAL IMAGES\n');

try {
  // Load venues data
  const venuesPath = path.join(process.cwd(), 'data/venues-wrapped.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues || [];

  console.log(`📊 Total venues: ${venues.length}`);

  // Categorize venues
  const venuesWithRealImages = [];
  const venuesWithoutImages = [];
  const venuesWithPlaceholders = [];

  for (const venue of venues) {
    const hasRealHero = venue.image_hero_path && !venue.image_hero_path.includes('placeholder');
    const hasRealCard = venue.image_card_path && !venue.image_card_path.includes('placeholder');
    const hasPlaceholder = venue.image_hero_path?.includes('placeholder') || venue.image_card_path?.includes('placeholder');
    
    if (hasRealHero || hasRealCard) {
      venuesWithRealImages.push(venue);
    } else if (hasPlaceholder) {
      venuesWithPlaceholders.push(venue);
    } else {
      venuesWithoutImages.push(venue);
    }
  }

  console.log(`✅ Venues with real images: ${venuesWithRealImages.length}`);
  console.log(`🔄 Venues with placeholders: ${venuesWithPlaceholders.length}`);
  console.log(`❌ Venues without images: ${venuesWithoutImages.length}`);

  // Analyze venues without images by cuisine
  const cuisineStats = {};
  venuesWithoutImages.forEach(venue => {
    const cuisine = venue.cuisines?.[0] || venue.cuisine || 'Unknown';
    cuisineStats[cuisine] = (cuisineStats[cuisine] || 0) + 1;
  });

  console.log('\n📈 VENUES WITHOUT IMAGES BY CUISINE:');
  Object.entries(cuisineStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([cuisine, count]) => {
      console.log(`   ${cuisine}: ${count} venues`);
    });

  // Show sample venues without images
  console.log('\n🔍 SAMPLE VENUES WITHOUT IMAGES:');
  venuesWithoutImages.slice(0, 10).forEach((venue, index) => {
    console.log(`${index + 1}. ${venue.name} (${venue.cuisines?.[0] || venue.cuisine || 'Unknown'})`);
    console.log(`   Location: ${venue.borough || venue.area || 'Unknown'}`);
    console.log(`   Hero: ${venue.image_hero_path || 'None'}`);
    console.log(`   Card: ${venue.image_card_path || 'None'}`);
    console.log('');
  });

  // Check if we have any Google photo references
  const venuesWithGooglePhotos = venues.filter(v => v.photos && v.photos.length > 0);
  console.log(`\n📸 Venues with Google photo references: ${venuesWithGooglePhotos.length}`);

  if (venuesWithGooglePhotos.length > 0) {
    console.log('\n🔍 SAMPLE VENUES WITH GOOGLE PHOTOS:');
    venuesWithGooglePhotos.slice(0, 5).forEach((venue, index) => {
      console.log(`${index + 1}. ${venue.name}`);
      console.log(`   Photos: ${venue.photos.length} available`);
      console.log(`   First photo ref: ${venue.photos[0]?.photo_reference || 'N/A'}`);
    });
  }

} catch (error) {
  console.error('❌ Error analyzing venues:', error);
}
