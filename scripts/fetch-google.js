#!/usr/bin/env node
/**
 * GOOGLE PLACES DATA FETCHER
 * Systematically fetches restaurant data from Google Places API
 * Organized by cuisine types and London areas
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load API key from environment
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY;

if (!GOOGLE_API_KEY) {
  console.error('❌ Error: NEXT_PUBLIC_GOOGLE_PLACES_KEY not found in .env.local');
  process.exit(1);
}

// Central London coordinates
const LONDON_CENTER = { lat: 51.5074, lng: -0.1278 };

// Search configurations
const SEARCHES = {
  cuisines: [
    { query: 'Indian restaurant', category: 'indian', limit: 40 },
    { query: 'Italian restaurant', category: 'italian', limit: 40 },
    { query: 'Japanese restaurant', category: 'japanese', limit: 35 },
    { query: 'Chinese restaurant', category: 'chinese', limit: 35 },
    { query: 'Thai restaurant', category: 'thai', limit: 30 },
    { query: 'Turkish restaurant', category: 'turkish', limit: 30 },
    { query: 'French restaurant', category: 'french', limit: 25 },
    { query: 'Spanish restaurant', category: 'spanish', limit: 25 },
    { query: 'Korean restaurant', category: 'korean', limit: 20 },
    { query: 'Vietnamese restaurant', category: 'vietnamese', limit: 20 },
    { query: 'Greek restaurant', category: 'greek', limit: 20 },
    { query: 'Lebanese restaurant', category: 'lebanese', limit: 20 },
    { query: 'Persian restaurant', category: 'persian', limit: 15 },
    { query: 'Mexican restaurant', category: 'mexican', limit: 20 },
    { query: 'American restaurant', category: 'american', limit: 20 },
  ],
  
  dietary: [
    { query: 'halal restaurant', category: 'halal', limit: 40 },
    { query: 'vegan restaurant', category: 'vegan', limit: 35 },
    { query: 'vegetarian restaurant', category: 'vegetarian', limit: 30 },
    { query: 'gluten free restaurant', category: 'gluten_free', limit: 20 },
  ],
  
  types: [
    { query: 'cafe', category: 'cafe', limit: 40 },
    { query: 'coffee shop', category: 'coffee', limit: 35 },
    { query: 'bakery', category: 'bakery', limit: 30 },
    { query: 'brunch restaurant', category: 'brunch', limit: 30 },
    { query: 'breakfast restaurant', category: 'breakfast', limit: 25 },
    { query: 'bar', category: 'bar', limit: 35 },
    { query: 'pub', category: 'pub', limit: 30 },
    { query: 'fine dining restaurant', category: 'fine_dining', limit: 25 },
    { query: 'michelin star restaurant', category: 'michelin', limit: 20 },
    { query: 'rooftop bar', category: 'rooftop', limit: 20 },
  ],
  
  areas: [
    { query: 'restaurant in Shoreditch', area: 'Shoreditch', limit: 25 },
    { query: 'restaurant in Soho', area: 'Soho', limit: 25 },
    { query: 'restaurant in Covent Garden', area: 'Covent Garden', limit: 25 },
    { query: 'restaurant in Camden', area: 'Camden', limit: 20 },
    { query: 'restaurant in Islington', area: 'Islington', limit: 20 },
    { query: 'restaurant in Hackney', area: 'Hackney', limit: 20 },
    { query: 'restaurant in Notting Hill', area: 'Notting Hill', limit: 20 },
    { query: 'restaurant in Mayfair', area: 'Mayfair', limit: 20 },
    { query: 'restaurant in Chelsea', area: 'Chelsea', limit: 20 },
    { query: 'restaurant in Brixton', area: 'Brixton', limit: 18 },
    { query: 'restaurant in Clapham', area: 'Clapham', limit: 18 },
    { query: 'restaurant in Borough', area: 'Borough', limit: 18 },
    { query: 'restaurant in Canary Wharf', area: 'Canary Wharf', limit: 18 },
    { query: 'restaurant in Kings Cross', area: 'Kings Cross', limit: 15 },
    { query: 'restaurant in Clerkenwell', area: 'Clerkenwell', limit: 15 },
    { query: 'restaurant in Fitzrovia', area: 'Fitzrovia', limit: 15 },
    { query: 'restaurant in Marylebone', area: 'Marylebone', limit: 15 },
    { query: 'restaurant in Kensington', area: 'Kensington', limit: 15 },
    { query: 'restaurant in Greenwich', area: 'Greenwich', limit: 12 },
    { query: 'restaurant in Richmond', area: 'Richmond', limit: 12 },
  ],
};

// Utility functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sanitizeFilename(str) {
  return str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

// Google Places API functions
async function textSearch(query, location = LONDON_CENTER) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const params = {
      query: `${query} London`,
      location: `${location.lat},${location.lng}`,
      radius: 15000,
      key: GOOGLE_API_KEY
    };
    
    const response = await axios.get(url, { params });
    
    if (response.data.status === 'OVER_QUERY_LIMIT') {
      console.error('❌ Google API quota exceeded');
      return { results: [], error: 'QUOTA_EXCEEDED' };
    }
    
    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      console.log(`⚠️  Search warning for "${query}": ${response.data.status}`);
      return { results: [], error: response.data.status };
    }
    
    return { 
      results: response.data.results || [], 
      next_page_token: response.data.next_page_token 
    };
  } catch (error) {
    console.error(`Error in textSearch: ${error.message}`);
    return { results: [], error: error.message };
  }
}

async function getPlaceDetails(placeId) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json';
    const params = {
      place_id: placeId,
      fields: 'name,formatted_address,geometry,rating,user_ratings_total,price_level,opening_hours,website,formatted_phone_number,photos,types,reviews,business_status',
      key: GOOGLE_API_KEY
    };
    
    const response = await axios.get(url, { params });
    
    if (response.data.status === 'OK') {
      return response.data.result;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching details for ${placeId}: ${error.message}`);
    return null;
  }
}

// Main fetching logic
async function fetchAllVenues() {
  console.log('🚀 Starting Google Places data fetch\n');
  console.log(`API Key: ${GOOGLE_API_KEY.substring(0, 10)}...`);
  console.log(`Output: /data/google-raw/\n`);
  
  const stats = {
    totalSearches: 0,
    successfulSearches: 0,
    totalVenues: 0,
    detailsFetched: 0,
    errors: []
  };
  
  const allVenues = new Map(); // Dedupe by place_id
  const outputDir = path.join(__dirname, '../data/google-raw');
  
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  
  // Process all search types
  for (const [searchType, searches] of Object.entries(SEARCHES)) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`📍 Fetching ${searchType.toUpperCase()}`);
    console.log('='.repeat(70));
    
    for (const search of searches) {
      stats.totalSearches++;
      const identifier = search.category || search.area;
      
      console.log(`\n🔍 Search: "${search.query}" (limit: ${search.limit})`);
      
      // Text search
      const searchResults = await textSearch(search.query);
      await delay(200); // Rate limiting
      
      if (searchResults.error) {
        stats.errors.push({ search: search.query, error: searchResults.error });
        if (searchResults.error === 'QUOTA_EXCEEDED') {
          console.error('❌ Quota exceeded - stopping fetch');
          break;
        }
        continue;
      }
      
      const results = searchResults.results.slice(0, search.limit);
      console.log(`   Found ${results.length} results`);
      
      if (results.length === 0) {
        continue;
      }
      
      stats.successfulSearches++;
      
      // Fetch details for each venue
      let newVenues = 0;
      for (const place of results) {
        if (allVenues.has(place.place_id)) {
          continue; // Already fetched
        }
        
        const details = await getPlaceDetails(place.place_id);
        await delay(100); // Rate limiting
        
        if (!details) continue;
        
        // Add metadata
        details.search_metadata = {
          search_type: searchType,
          search_query: search.query,
          category: search.category,
          area: search.area,
          fetched_at: new Date().toISOString()
        };
        
        allVenues.set(place.place_id, details);
        newVenues++;
        stats.detailsFetched++;
      }
      
      console.log(`   ✓ Fetched details for ${newVenues} new venues`);
      
      // Save individual search results
      const filename = `${searchType}-${sanitizeFilename(identifier)}.json`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, JSON.stringify({
        search: search.query,
        type: searchType,
        identifier,
        count: results.length,
        fetched_at: new Date().toISOString(),
        venues: results.map(r => allVenues.get(r.place_id)).filter(Boolean)
      }, null, 2));
      
      console.log(`   💾 Saved to: ${filename}`);
    }
  }
  
  stats.totalVenues = allVenues.size;
  
  // Save consolidated data
  const consolidated = {
    fetched_at: new Date().toISOString(),
    total_venues: allVenues.size,
    venues: Array.from(allVenues.values())
  };
  
  const consolidatedPath = path.join(outputDir, '_consolidated.json');
  fs.writeFileSync(consolidatedPath, JSON.stringify(consolidated, null, 2));
  
  // Save stats
  const statsPath = path.join(outputDir, '_fetch-stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
  
  // Print summary
  console.log('\n\n' + '='.repeat(70));
  console.log('✅ GOOGLE PLACES FETCH COMPLETE');
  console.log('='.repeat(70));
  console.log(`Total Searches: ${stats.totalSearches}`);
  console.log(`Successful Searches: ${stats.successfulSearches}`);
  console.log(`Unique Venues: ${stats.totalVenues}`);
  console.log(`Details Fetched: ${stats.detailsFetched}`);
  console.log(`Errors: ${stats.errors.length}`);
  console.log('='.repeat(70));
  console.log(`\nData saved to: ${outputDir}`);
  console.log(`Consolidated file: ${consolidatedPath}`);
  console.log(`File size: ${(fs.statSync(consolidatedPath).size / 1024).toFixed(2)} KB\n`);
  
  if (stats.errors.length > 0) {
    console.log('⚠️  Errors encountered:');
    stats.errors.forEach(err => console.log(`   - ${err.search}: ${err.error}`));
  }
  
  return { venues: Array.from(allVenues.values()), stats };
}

// Run if called directly
if (require.main === module) {
  fetchAllVenues()
    .then(() => {
      console.log('\n🎉 Ready for enhancement phase (run enhance-venues.js next)\n');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllVenues };
