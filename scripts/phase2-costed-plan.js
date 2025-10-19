#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('💰 PHASE 2: Generating costed plan for image fetching...');

// Load venue data
const venuesPath = path.join(process.cwd(), 'public/venues.json');
const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = venuesData.venues || venuesData;

// Count venues needing images
const venuesNeedingImages = venues.filter(v => v.needs_fetch || !v.image_card_path || !v.image_hero_path);
const venuesWithPlaceId = venuesNeedingImages.filter(v => v.place_id && v.place_id.length > 10);

console.log('📊 COST ANALYSIS:');
console.log(`   Total venues: ${venues.length}`);
console.log(`   Venues needing images: ${venuesNeedingImages.length}`);
console.log(`   Venues with valid place_id: ${venuesWithPlaceId.length}`);

// Calculate API costs
const googlePlacesDetailsCalls = venuesWithPlaceId.length; // 1 call per venue to get photo references
const googlePlacesPhotosCalls = venuesWithPlaceId.length * 2; // 2 photos per venue (card + hero)
const totalApiCalls = googlePlacesDetailsCalls + googlePlacesPhotosCalls;

// Google Places API pricing (as of 2024)
const detailsPricePerCall = 0.017; // $0.017 per Places Details call
const photosPricePerCall = 0.007; // $0.007 per Photos call

const detailsCost = googlePlacesDetailsCalls * detailsPricePerCall;
const photosCost = googlePlacesPhotosCalls * photosPricePerCall;
const totalCost = detailsCost + photosCost;

console.log('');
console.log('🔢 API CALL BREAKDOWN:');
console.log(`   Places Details calls: ${googlePlacesDetailsCalls} × $${detailsPricePerCall} = $${detailsCost.toFixed(2)}`);
console.log(`   Places Photos calls: ${googlePlacesPhotosCalls} × $${photosPricePerCall} = $${photosCost.toFixed(2)}`);
console.log(`   Total API calls: ${totalApiCalls}`);
console.log(`   Total estimated cost: $${totalCost.toFixed(2)}`);

// Check for venues without place_id
const venuesWithoutPlaceId = venuesNeedingImages.filter(v => !v.place_id || v.place_id.length <= 10);
if (venuesWithoutPlaceId.length > 0) {
  console.log('');
  console.log('⚠️  VENUES WITHOUT PLACE_ID:');
  console.log(`   ${venuesWithoutPlaceId.length} venues will need manual image sourcing`);
  console.log('   Sample venues:');
  venuesWithoutPlaceId.slice(0, 5).forEach(v => {
    console.log(`     • ${v.name} (${v.slug || 'no-slug'})`);
  });
}

// Generate detailed plan
const plan = {
  timestamp: new Date().toISOString(),
  totalVenues: venues.length,
  venuesNeedingImages: venuesNeedingImages.length,
  venuesWithPlaceId: venuesWithPlaceId.length,
  venuesWithoutPlaceId: venuesWithoutPlaceId.length,
  apiCalls: {
    placesDetails: googlePlacesDetailsCalls,
    placesPhotos: googlePlacesPhotosCalls,
    total: totalApiCalls
  },
  costs: {
    placesDetails: detailsCost,
    placesPhotos: photosCost,
    total: totalCost
  },
  pricing: {
    placesDetailsPerCall: detailsPricePerCall,
    placesPhotosPerCall: photosPricePerCall
  },
  estimatedTime: {
    minutes: Math.ceil(totalApiCalls / 10), // Assuming 10 calls per minute with rate limiting
    hours: Math.ceil(totalApiCalls / 10 / 60)
  },
  sampleVenues: venuesWithPlaceId.slice(0, 10).map(v => ({
    name: v.name,
    place_id: v.place_id,
    slug: v.slug,
    cuisines: v.cuisines
  }))
};

// Save plan
const planPath = path.join(process.cwd(), 'reports/costed-plan.json');
fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));

console.log('');
console.log('⏱️  ESTIMATED TIME:');
console.log(`   With rate limiting (10 calls/min): ${plan.estimatedTime.minutes} minutes`);
console.log(`   With conservative rate limiting: ${plan.estimatedTime.hours} hours`);

console.log('');
console.log('📋 NEXT STEPS:');
console.log('   1. Review the costed plan above');
console.log('   2. Confirm approval to proceed with API calls');
console.log('   3. Run Phase 3 (Google Photos Fetcher)');

console.log('');
console.log('📁 Plan saved to:', planPath);

console.log('');
console.log('🚨 APPROVAL REQUIRED');
console.log(`   Total estimated cost: $${totalCost.toFixed(2)}`);
console.log(`   Total API calls: ${totalApiCalls}`);
console.log('');
console.log('Type "APPROVED" to proceed with Phase 3, or provide feedback on the plan.');
