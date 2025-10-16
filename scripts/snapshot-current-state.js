#!/usr/bin/env node

/**
 * SNAPSHOT CURRENT STATE
 * Creates a comprehensive snapshot of the current dataset for comparison
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(PROJECT_ROOT, 'public', 'venues.json');
const COVERAGE_PATH = path.join(PROJECT_ROOT, 'data', 'coverage.json');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'reports', 'snapshots', `snapshot-${Date.now()}.json`);

console.log('📸 CREATING DATASET SNAPSHOT...\n');

try {
  // Read venues
  const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf8'));
  const venues = data.venues || data; // Handle both formats
  const coverage = fs.existsSync(COVERAGE_PATH) 
    ? JSON.parse(fs.readFileSync(COVERAGE_PATH, 'utf8'))
    : null;

  // Calculate stats
  const stats = {
    timestamp: new Date().toISOString(),
    totalVenues: venues.length,
    
    // Coverage metrics
    withGoogleRating: venues.filter(v => v.rating && v.rating > 0).length,
    withReviews: venues.filter(v => v.user_ratings_total && v.user_ratings_total > 0).length,
    withFSA: venues.filter(v => v.fsaRating || v.fsa_rating).length,
    withPhotos: venues.filter(v => v.photos && v.photos.length > 0).length,
    withWebsite: venues.filter(v => v.website).length,
    withPhone: venues.filter(v => v.phone || v.phone_international || v.international_phone_number).length,
    withAddress: venues.filter(v => v.address || v.formatted_address).length,
    withPostcode: venues.filter(v => v.postcode || (v.address && typeof v.address === 'object' && v.address.postcode)).length,
    withCoordinates: venues.filter(v => (v.lat && v.lng) || (v.address && typeof v.address === 'object' && v.address.lat && v.address.lng)).length,
    withOpeningHours: venues.filter(v => v.opening_hours).length,
    withPriceLevel: venues.filter(v => v.price_level).length,
    
    // Geographic distribution
    byBorough: {},
    byArea: {},
    
    // Cuisine distribution
    byCuisine: {},
    
    // Dietary tags
    dietaryTagsDistribution: {
      halal: venues.filter(v => {
        const tags = v.dietaryTags || v.dietary_tags;
        if (Array.isArray(tags)) return tags.includes('halal');
        if (typeof tags === 'object') return tags.halal;
        return false;
      }).length,
      vegetarian: venues.filter(v => {
        const tags = v.dietaryTags || v.dietary_tags;
        if (Array.isArray(tags)) return tags.includes('vegetarian');
        if (typeof tags === 'object') return tags.vegetarian;
        return false;
      }).length,
      vegan: venues.filter(v => {
        const tags = v.dietaryTags || v.dietary_tags;
        if (Array.isArray(tags)) return tags.includes('vegan');
        if (typeof tags === 'object') return tags.vegan;
        return false;
      }).length,
    },
    
    // Quality metrics
    avgRating: 0,
    avgReviewCount: 0,
    
    // Place ID tracking (for deduplication)
    uniquePlaceIds: [...new Set(venues.map(v => v.place_id).filter(Boolean))].length,
    
    // Coverage from previous report
    existingCoverage: coverage
  };
  
  // Calculate averages
  const venuesWithRating = venues.filter(v => v.rating);
  if (venuesWithRating.length > 0) {
    stats.avgRating = venuesWithRating.reduce((sum, v) => sum + v.rating, 0) / venuesWithRating.length;
  }
  
  const venuesWithReviews = venues.filter(v => v.user_ratings_total);
  if (venuesWithReviews.length > 0) {
    stats.avgReviewCount = venuesWithReviews.reduce((sum, v) => sum + v.user_ratings_total, 0) / venuesWithReviews.length;
  }
  
  // Calculate percentages
  stats.coveragePercent = {
    googleRating: ((stats.withGoogleRating / stats.totalVenues) * 100).toFixed(1),
    reviews: ((stats.withReviews / stats.totalVenues) * 100).toFixed(1),
    fsa: ((stats.withFSA / stats.totalVenues) * 100).toFixed(1),
    photos: ((stats.withPhotos / stats.totalVenues) * 100).toFixed(1),
    website: ((stats.withWebsite / stats.totalVenues) * 100).toFixed(1),
    phone: ((stats.withPhone / stats.totalVenues) * 100).toFixed(1),
    address: ((stats.withAddress / stats.totalVenues) * 100).toFixed(1),
    postcode: ((stats.withPostcode / stats.totalVenues) * 100).toFixed(1),
    coordinates: ((stats.withCoordinates / stats.totalVenues) * 100).toFixed(1),
    openingHours: ((stats.withOpeningHours / stats.totalVenues) * 100).toFixed(1),
    priceLevel: ((stats.withPriceLevel / stats.totalVenues) * 100).toFixed(1),
  };
  
  // Borough distribution
  venues.forEach(v => {
    const borough = v.borough || (v.address && typeof v.address === 'object' && v.address.borough) || 'Unknown';
    stats.byBorough[borough] = (stats.byBorough[borough] || 0) + 1;
  });
  
  // Area distribution
  venues.forEach(v => {
    const areas = v.areas || [];
    if (Array.isArray(areas)) {
      areas.forEach(area => {
        stats.byArea[area] = (stats.byArea[area] || 0) + 1;
      });
    }
  });
  
  // Cuisine distribution
  venues.forEach(v => {
    const cuisines = v.cuisines || [];
    if (Array.isArray(cuisines)) {
      cuisines.forEach(cuisine => {
        stats.byCuisine[cuisine] = (stats.byCuisine[cuisine] || 0) + 1;
      });
    }
  });
  
  // Sample venues for quality check
  stats.sampleVenues = venues.slice(0, 3).map(v => ({
    name: v.name,
    slug: v.slug,
    place_id: v.place_id,
    rating: v.rating,
    cuisines: v.cuisines,
    dietaryTags: v.dietaryTags || v.dietary_tags,
    fsaRating: v.fsaRating || v.fsa_rating,
    hasPhotos: v.photos?.length || 0,
    hasWebsite: !!v.website,
    hasPhone: !!(v.phone || v.phone_international || v.international_phone_number),
    borough: v.borough || (v.address && typeof v.address === 'object' && v.address.borough),
    postcode: v.postcode || (v.address && typeof v.address === 'object' && v.address.postcode)
  }));
  
  // Write snapshot
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(stats, null, 2));
  
  // Console output
  console.log('=== DATASET SNAPSHOT ===');
  console.log(`Timestamp: ${stats.timestamp}`);
  console.log(`Total Venues: ${stats.totalVenues}`);
  console.log(`Unique Place IDs: ${stats.uniquePlaceIds}`);
  console.log('');
  console.log('=== COVERAGE ===');
  console.log(`Google Rating: ${stats.withGoogleRating} (${stats.coveragePercent.googleRating}%)`);
  console.log(`Reviews: ${stats.withReviews} (${stats.coveragePercent.reviews}%)`);
  console.log(`FSA Rating: ${stats.withFSA} (${stats.coveragePercent.fsa}%)`);
  console.log(`Photos: ${stats.withPhotos} (${stats.coveragePercent.photos}%)`);
  console.log(`Website: ${stats.withWebsite} (${stats.coveragePercent.website}%)`);
  console.log(`Phone: ${stats.withPhone} (${stats.coveragePercent.phone}%)`);
  console.log(`Postcode: ${stats.withPostcode} (${stats.coveragePercent.postcode}%)`);
  console.log(`Coordinates: ${stats.withCoordinates} (${stats.coveragePercent.coordinates}%)`);
  console.log('');
  console.log('=== QUALITY ===');
  console.log(`Avg Rating: ${stats.avgRating.toFixed(1)}`);
  console.log(`Avg Reviews: ${Math.round(stats.avgReviewCount)}`);
  console.log('');
  console.log('=== DIETARY TAGS ===');
  console.log(`Halal: ${stats.dietaryTagsDistribution.halal}`);
  console.log(`Vegetarian: ${stats.dietaryTagsDistribution.vegetarian}`);
  console.log(`Vegan: ${stats.dietaryTagsDistribution.vegan}`);
  console.log('');
  console.log('=== TOP BOROUGHS ===');
  Object.entries(stats.byBorough)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([borough, count]) => {
      console.log(`${borough}: ${count}`);
    });
  console.log('');
  console.log('=== TOP CUISINES ===');
  Object.entries(stats.byCuisine)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([cuisine, count]) => {
      console.log(`${cuisine}: ${count}`);
    });
  console.log('');
  console.log(`✅ Snapshot saved to: ${OUTPUT_PATH}`);
  console.log('');
  
  // Return summary for piping
  const summary = {
    totalVenues: stats.totalVenues,
    fsaCoverage: stats.coveragePercent.fsa,
    photosCoverage: stats.coveragePercent.photos,
    websiteCoverage: stats.coveragePercent.website,
    timestamp: stats.timestamp
  };
  console.log('\n📊 SUMMARY JSON:');
  console.log(JSON.stringify(summary, null, 2));
  
} catch (err) {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
  process.exit(1);
}
