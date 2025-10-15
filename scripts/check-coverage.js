#!/usr/bin/env node
/**
 * DATA COVERAGE CHECKER
 * Analyzes venues.json for completeness and data quality
 */

const fs = require('fs');
const path = require('path');

const VENUES_PATH = path.join(__dirname, '../public/venues.json');

function checkCoverage() {
  console.log('📊 Analyzing venue data coverage\n');
  
  if (!fs.existsSync(VENUES_PATH)) {
    console.error('❌ Error: venues.json not found. Run fetch & enhance scripts first.');
    process.exit(1);
  }
  
  const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf8'));
  const venues = data.venues || [];
  
  const total = venues.length;
  
  // Coverage stats
  const stats = {
    total,
    
    // Core fields
    with_name: venues.filter(v => v.name).length,
    with_address: venues.filter(v => v.address).length,
    with_postcode: venues.filter(v => v.postcode).length,
    with_area: venues.filter(v => v.area).length,
    with_borough: venues.filter(v => v.borough).length,
    with_coordinates: venues.filter(v => v.lat && v.lng).length,
    
    // Ratings
    with_google_rating: venues.filter(v => v.google?.rating).length,
    with_google_reviews: venues.filter(v => v.google?.reviews > 0).length,
    with_fsa_rating: venues.filter(v => v.fsa?.rating).length,
    
    // Content
    with_photos: venues.filter(v => v.photos && v.photos.length > 0).length,
    with_reviews: venues.filter(v => v.reviews && v.reviews.length > 0).length,
    with_website: venues.filter(v => v.website).length,
    with_phone: venues.filter(v => v.phone).length,
    
    // Categorization
    with_cuisine: venues.filter(v => v.cuisine).length,
    with_category: venues.filter(v => v.category && v.category !== 'restaurant').length,
    with_dietary_tags: venues.filter(v => v.dietary_tags && v.dietary_tags.length > 0).length,
    with_price_level: venues.filter(v => v.price_level).length,
    
    // Hours
    with_opening_hours: venues.filter(v => v.opening_hours).length,
    with_open_now_status: venues.filter(v => v.opening_hours?.open_now !== null).length,
    
    // Status
    operational: venues.filter(v => v.business_status === 'OPERATIONAL').length,
    closed: venues.filter(v => v.business_status === 'CLOSED_PERMANENTLY').length,
  };
  
  // Calculate percentages
  const pct = (count) => `${Math.round(count / total * 100)}%`;
  
  // Missing fields analysis
  const missing = {
    no_area: venues.filter(v => !v.area).map(v => ({ name: v.name, address: v.address })).slice(0, 10),
    no_fsa: venues.filter(v => !v.fsa).map(v => ({ name: v.name, postcode: v.postcode })).slice(0, 10),
    no_photos: venues.filter(v => !v.photos || v.photos.length === 0).map(v => v.name).slice(0, 10),
    no_cuisine: venues.filter(v => !v.cuisine).map(v => ({ name: v.name, types: v.types })).slice(0, 10),
  };
  
  // Category breakdown
  const categories = venues.reduce((acc, v) => {
    acc[v.category] = (acc[v.category] || 0) + 1;
    return acc;
  }, {});
  
  const cuisines = venues
    .filter(v => v.cuisine)
    .reduce((acc, v) => {
      acc[v.cuisine] = (acc[v.cuisine] || 0) + 1;
      return acc;
    }, {});
  
  const areas = venues
    .filter(v => v.area)
    .reduce((acc, v) => {
      acc[v.area] = (acc[v.area] || 0) + 1;
      return acc;
    }, {});
  
  const boroughs = venues
    .filter(v => v.borough)
    .reduce((acc, v) => {
      acc[v.borough] = (acc[v.borough] || 0) + 1;
      return acc;
    }, {});
  
  // FSA rating distribution
  const fsaRatings = venues
    .filter(v => v.fsa?.rating)
    .reduce((acc, v) => {
      acc[v.fsa.rating] = (acc[v.fsa.rating] || 0) + 1;
      return acc;
    }, {});
  
  // Rating quality
  const ratingRanges = {
    'excellent': venues.filter(v => v.google?.rating >= 4.5).length,
    'good': venues.filter(v => v.google?.rating >= 4.0 && v.google?.rating < 4.5).length,
    'average': venues.filter(v => v.google?.rating >= 3.0 && v.google?.rating < 4.0).length,
    'poor': venues.filter(v => v.google?.rating < 3.0).length,
    'unrated': venues.filter(v => !v.google?.rating).length,
  };
  
  // Print report
  console.log('=' .repeat(80));
  console.log('VENUE DATA COVERAGE REPORT');
  console.log('='.repeat(80));
  console.log(`Total Venues: ${total}`);
  console.log(`Last Updated: ${data.last_updated}`);
  console.log('\n' + '-'.repeat(80));
  console.log('CORE FIELDS');
  console.log('-'.repeat(80));
  console.log(`Names:           ${stats.with_name} / ${total} (${pct(stats.with_name)})`);
  console.log(`Addresses:       ${stats.with_address} / ${total} (${pct(stats.with_address)})`);
  console.log(`Postcodes:       ${stats.with_postcode} / ${total} (${pct(stats.with_postcode)})`);
  console.log(`Areas:           ${stats.with_area} / ${total} (${pct(stats.with_area)})`);
  console.log(`Boroughs:        ${stats.with_borough} / ${total} (${pct(stats.with_borough)})`);
  console.log(`Coordinates:     ${stats.with_coordinates} / ${total} (${pct(stats.with_coordinates)})`);
  
  console.log('\n' + '-'.repeat(80));
  console.log('RATINGS & REVIEWS');
  console.log('-'.repeat(80));
  console.log(`Google Rating:   ${stats.with_google_rating} / ${total} (${pct(stats.with_google_rating)})`);
  console.log(`Google Reviews:  ${stats.with_google_reviews} / ${total} (${pct(stats.with_google_reviews)})`);
  console.log(`FSA Rating:      ${stats.with_fsa_rating} / ${total} (${pct(stats.with_fsa_rating)})`);
  
  console.log('\nRating Quality:');
  console.log(`  ⭐ Excellent (4.5+):  ${ratingRanges.excellent} (${pct(ratingRanges.excellent)})`);
  console.log(`  ⭐ Good (4.0-4.4):     ${ratingRanges.good} (${pct(ratingRanges.good)})`);
  console.log(`  ⭐ Average (3.0-3.9):  ${ratingRanges.average} (${pct(ratingRanges.average)})`);
  console.log(`  ⭐ Poor (<3.0):        ${ratingRanges.poor} (${pct(ratingRanges.poor)})`);
  console.log(`  ⚪ Unrated:            ${ratingRanges.unrated} (${pct(ratingRanges.unrated)})`);
  
  console.log('\nFSA Distribution:');
  Object.entries(fsaRatings).sort((a, b) => b[0] - a[0]).forEach(([rating, count]) => {
    console.log(`  FSA ${rating}: ${count} (${pct(count)})`);
  });
  
  console.log('\n' + '-'.repeat(80));
  console.log('CONTENT');
  console.log('-'.repeat(80));
  console.log(`Photos:          ${stats.with_photos} / ${total} (${pct(stats.with_photos)})`);
  console.log(`Reviews:         ${stats.with_reviews} / ${total} (${pct(stats.with_reviews)})`);
  console.log(`Website:         ${stats.with_website} / ${total} (${pct(stats.with_website)})`);
  console.log(`Phone:           ${stats.with_phone} / ${total} (${pct(stats.with_phone)})`);
  console.log(`Opening Hours:   ${stats.with_opening_hours} / ${total} (${pct(stats.with_opening_hours)})`);
  
  console.log('\n' + '-'.repeat(80));
  console.log('CATEGORIZATION');
  console.log('-'.repeat(80));
  console.log(`Cuisine:         ${stats.with_cuisine} / ${total} (${pct(stats.with_cuisine)})`);
  console.log(`Category:        ${stats.with_category} / ${total} (${pct(stats.with_category)})`);
  console.log(`Dietary Tags:    ${stats.with_dietary_tags} / ${total} (${pct(stats.with_dietary_tags)})`);
  console.log(`Price Level:     ${stats.with_price_level} / ${total} (${pct(stats.with_price_level)})`);
  
  console.log('\n' + '-'.repeat(80));
  console.log('CATEGORIES');
  console.log('-'.repeat(80));
  Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat.padEnd(20)}: ${count.toString().padStart(4)} (${pct(count)})`);
  });
  
  console.log('\n' + '-'.repeat(80));
  console.log('TOP 10 CUISINES');
  console.log('-'.repeat(80));
  Object.entries(cuisines)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([cuisine, count]) => {
      console.log(`  ${cuisine.padEnd(20)}: ${count.toString().padStart(4)} (${pct(count)})`);
    });
  
  console.log('\n' + '-'.repeat(80));
  console.log('TOP 15 AREAS');
  console.log('-'.repeat(80));
  Object.entries(areas)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .forEach(([area, count]) => {
      console.log(`  ${area.padEnd(20)}: ${count.toString().padStart(4)} (${pct(count)})`);
    });
  
  console.log('\n' + '-'.repeat(80));
  console.log('BOROUGHS');
  console.log('-'.repeat(80));
  Object.entries(boroughs)
    .sort((a, b) => b[1] - a[1])
    .forEach(([borough, count]) => {
      console.log(`  ${borough.padEnd(30)}: ${count.toString().padStart(4)} (${pct(count)})`);
    });
  
  console.log('\n' + '-'.repeat(80));
  console.log('BUSINESS STATUS');
  console.log('-'.repeat(80));
  console.log(`Operational:     ${stats.operational} (${pct(stats.operational)})`);
  console.log(`Closed:          ${stats.closed} (${pct(stats.closed)})`);
  
  console.log('\n' + '-'.repeat(80));
  console.log('MISSING DATA SAMPLES');
  console.log('-'.repeat(80));
  
  if (missing.no_area.length > 0) {
    console.log('\nVenues without area (sample):');
    missing.no_area.forEach(v => console.log(`  - ${v.name} (${v.address})`));
  }
  
  if (missing.no_fsa.length > 0) {
    console.log('\nVenues without FSA (sample):');
    missing.no_fsa.forEach(v => console.log(`  - ${v.name} (${v.postcode || 'no postcode'})`));
  }
  
  if (missing.no_photos.length > 0) {
    console.log('\nVenues without photos (sample):');
    missing.no_photos.forEach(name => console.log(`  - ${name}`));
  }
  
  if (missing.no_cuisine.length > 0) {
    console.log('\nVenues without cuisine (sample):');
    missing.no_cuisine.forEach(v => console.log(`  - ${v.name} (types: ${v.types.join(', ')})`));
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('QUALITY SCORE');
  console.log('='.repeat(80));
  
  const qualityScore = Math.round(
    (stats.with_google_rating / total * 0.2 +
     stats.with_fsa_rating / total * 0.2 +
     stats.with_photos / total * 0.15 +
     stats.with_website / total * 0.1 +
     stats.with_cuisine / total * 0.15 +
     stats.with_area / total * 0.1 +
     stats.with_opening_hours / total * 0.1) * 100
  );
  
  console.log(`Overall Quality: ${qualityScore}/100`);
  
  if (qualityScore >= 80) {
    console.log('✅ Excellent! Ready for production.');
  } else if (qualityScore >= 70) {
    console.log('⚠️  Good, but could improve FSA/photo coverage.');
  } else if (qualityScore >= 60) {
    console.log('⚠️  Moderate quality. Consider running enhancement again.');
  } else {
    console.log('❌ Low quality. Re-fetch data or check API connectivity.');
  }
  
  console.log('\n');
  
  return { stats, qualityScore, missing };
}

// Run if called directly
if (require.main === module) {
  checkCoverage();
}

module.exports = { checkCoverage };
