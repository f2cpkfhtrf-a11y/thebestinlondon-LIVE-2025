#!/usr/bin/env node

/**
 * GOOGLE PLACES DETAILS FETCHER
 * Fetches full Place Details for each place_id from fetchPlaces.js
 * Fields: name, rating, reviews, price, address, phone, website, hours, geometry, photos
 * Outputs: data/google/details/*.json
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API Configuration
const GOOGLE_API_KEY = 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';
const RATE_LIMIT_MS = 150; // 150ms between requests

// Fields to request (comprehensive)
const PLACE_FIELDS = [
  'place_id',
  'name',
  'formatted_address',
  'geometry',
  'rating',
  'user_ratings_total',
  'price_level',
  'opening_hours',
  'website',
  'formatted_phone_number',
  'international_phone_number',
  'photos',
  'types',
  'url',
  'vicinity',
  'editorial_summary',
  'reviews'
].join(',');

// Utility: Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility: Save JSON
function saveJSON(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// Utility: Load JSON
function loadJSON(filepath) {
  if (!fs.existsSync(filepath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

// Google Places Details API
async function getPlaceDetails(placeId) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json';
    const params = {
      place_id: placeId,
      fields: PLACE_FIELDS,
      key: GOOGLE_API_KEY
    };
    
    const response = await axios.get(url, { params });
    
    if (response.data.status !== 'OK') {
      return { status: response.data.status, error: response.data.error_message, result: null };
    }
    
    return {
      status: 'OK',
      result: response.data.result
    };
    
  } catch (error) {
    return { status: 'ERROR', error: error.message, result: null };
  }
}

// Main execution
async function fetchAllPlaceDetails() {
  console.log('🔍 GOOGLE PLACES DETAILS FETCHER\n');
  console.log('=' .repeat(70));
  console.log(`API Key: ${GOOGLE_API_KEY.substring(0, 20)}...`);
  console.log(`Rate Limit: ${RATE_LIMIT_MS}ms between requests`);
  console.log('=' .repeat(70) + '\n');
  
  // Load index from fetchPlaces.js
  const indexPath = path.join(__dirname, '../data/google/raw/_index.json');
  const index = loadJSON(indexPath);
  
  if (!index) {
    console.error('❌ Error: _index.json not found. Run fetchPlaces.js first.');
    process.exit(1);
  }
  
  console.log(`📋 Found ${index.place_ids.length} place_ids to fetch\n`);
  
  // Create details directory
  const detailsDir = path.join(__dirname, '../data/google/details');
  if (!fs.existsSync(detailsDir)) {
    fs.mkdirSync(detailsDir, { recursive: true });
  }
  
  const results = {
    fetched_at: new Date().toISOString(),
    total_places: index.place_ids.length,
    successful: 0,
    failed: 0,
    places: []
  };
  
  // Fetch details for each place
  for (let i = 0; i < index.place_ids.length; i++) {
    const placeId = index.place_ids[i];
    const progress = `[${i + 1}/${index.place_ids.length}]`;
    
    // Check if already fetched
    const detailPath = path.join(detailsDir, `${placeId}.json`);
    if (fs.existsSync(detailPath)) {
      const cached = loadJSON(detailPath);
      console.log(`${progress} ✓ Cached: ${cached.name}`);
      results.successful++;
      results.places.push(cached);
      continue;
    }
    
    console.log(`${progress} Fetching: ${placeId}...`);
    
    const response = await getPlaceDetails(placeId);
    
    if (response.status === 'OK' && response.result) {
      const place = response.result;
      
      // Enhance with metadata
      const enhanced = {
        place_id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        vicinity: place.vicinity,
        
        // Ratings
        rating: place.rating || null,
        user_ratings_total: place.user_ratings_total || 0,
        price_level: place.price_level || null,
        
        // Location
        geometry: place.geometry,
        lat: place.geometry?.location?.lat || null,
        lng: place.geometry?.location?.lng || null,
        
        // Contact
        formatted_phone_number: place.formatted_phone_number || null,
        international_phone_number: place.international_phone_number || null,
        website: place.website || null,
        url: place.url || null,
        
        // Hours
        opening_hours: place.opening_hours ? {
          open_now: place.opening_hours.open_now || null,
          weekday_text: place.opening_hours.weekday_text || [],
          periods: place.opening_hours.periods || []
        } : null,
        
        // Photos
        photos: place.photos ? place.photos.map(photo => ({
          photo_reference: photo.photo_reference,
          width: photo.width,
          height: photo.height,
          html_attributions: photo.html_attributions || []
        })) : [],
        
        // Types & Categories
        types: place.types || [],
        editorial_summary: place.editorial_summary?.overview || null,
        
        // Reviews (first 5)
        reviews: place.reviews ? place.reviews.slice(0, 5).map(review => ({
          author_name: review.author_name,
          rating: review.rating,
          text: review.text,
          time: review.time,
          relative_time_description: review.relative_time_description
        })) : [],
        
        // Metadata
        fetched_at: new Date().toISOString(),
        google_place_url: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
      };
      
      // Save individual file
      saveJSON(detailPath, enhanced);
      
      console.log(`   ✅ ${place.name} (${place.rating || 'N/A'} ⭐)`);
      results.successful++;
      results.places.push(enhanced);
      
    } else {
      console.log(`   ❌ Failed: ${response.status} - ${response.error || 'Unknown error'}`);
      results.failed++;
    }
    
    // Rate limiting
    await delay(RATE_LIMIT_MS);
  }
  
  // Save master details index
  const masterPath = path.join(detailsDir, '_details-index.json');
  saveJSON(masterPath, results);
  
  // Generate summary report
  console.log('\n\n' + '='.repeat(70));
  console.log('✅ DETAILS FETCH COMPLETE');
  console.log('='.repeat(70));
  console.log(`Total Places: ${results.total_places}`);
  console.log(`Successful: ${results.successful} (${(results.successful/results.total_places*100).toFixed(1)}%)`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Output Directory: data/google/details/`);
  console.log('='.repeat(70) + '\n');
  
  // Calculate coverage stats
  const withRating = results.places.filter(p => p.rating).length;
  const withPhotos = results.places.filter(p => p.photos.length > 0).length;
  const withWebsite = results.places.filter(p => p.website).length;
  const withPhone = results.places.filter(p => p.formatted_phone_number).length;
  const withHours = results.places.filter(p => p.opening_hours).length;
  
  console.log('📊 Data Coverage:');
  console.log(`   Ratings: ${withRating}/${results.successful} (${(withRating/results.successful*100).toFixed(1)}%)`);
  console.log(`   Photos: ${withPhotos}/${results.successful} (${(withPhotos/results.successful*100).toFixed(1)}%)`);
  console.log(`   Websites: ${withWebsite}/${results.successful} (${(withWebsite/results.successful*100).toFixed(1)}%)`);
  console.log(`   Phone Numbers: ${withPhone}/${results.successful} (${(withPhone/results.successful*100).toFixed(1)}%)`);
  console.log(`   Opening Hours: ${withHours}/${results.successful} (${(withHours/results.successful*100).toFixed(1)}%)\n`);
  
  // Generate markdown report
  const report = `# Google Places Details Report

**Date:** ${new Date().toISOString()}

## Summary
- **Total Places:** ${results.total_places}
- **Successful:** ${results.successful} (${(results.successful/results.total_places*100).toFixed(1)}%)
- **Failed:** ${results.failed}

## Data Coverage
| Field | Count | Percentage |
|-------|-------|------------|
| Ratings | ${withRating} | ${(withRating/results.successful*100).toFixed(1)}% |
| Photos | ${withPhotos} | ${(withPhotos/results.successful*100).toFixed(1)}% |
| Websites | ${withWebsite} | ${(withWebsite/results.successful*100).toFixed(1)}% |
| Phone Numbers | ${withPhone} | ${(withPhone/results.successful*100).toFixed(1)}% |
| Opening Hours | ${withHours} | ${(withHours/results.successful*100).toFixed(1)}% |

## Sample Venues

${results.places.slice(0, 10).map(p => `
### ${p.name}
- **Rating:** ${p.rating || 'N/A'} ⭐ (${p.user_ratings_total} reviews)
- **Address:** ${p.formatted_address}
- **Price:** ${'£'.repeat(p.price_level || 1)}
- **Photos:** ${p.photos.length}
- **Website:** ${p.website ? '✅' : '❌'}
- **Phone:** ${p.formatted_phone_number || 'N/A'}
`).join('\n')}

## Next Steps
1. Run \`buildVenues.js\` to merge with FSA data
2. This will create the final \`public/venues.json\`

## Output Files
- \`data/google/details/_details-index.json\` - Master index
- \`data/google/details/{place_id}.json\` - ${results.successful} individual venue files
`;
  
  const reportPath = path.join(__dirname, '../reports/fetch-details-report.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`📊 Report saved: ${reportPath}`);
  console.log(`📊 Index saved: ${masterPath}\n`);
  
  return results;
}

// Run if called directly
if (require.main === module) {
  fetchAllPlaceDetails()
    .then(() => {
      console.log('✅ Success! Ready for next phase: buildVenues.js\n');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllPlaceDetails };
