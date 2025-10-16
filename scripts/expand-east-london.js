#!/usr/bin/env node

/**
 * EAST LONDON & DIETARY EXPANSION
 * Targeted Google Places fetching for underrepresented areas and dietary options
 * 
 * Strategy:
 * 1. East London focus: Whitechapel, Ilford, Romford, Stratford, Bethnal Green, etc.
 * 2. Station-based queries: "restaurant near [Station]"
 * 3. Dietary emphasis: halal, vegetarian, vegan
 * 4. Smart deduplication by place_id
 * 5. Rate limiting: 4 req/s max, exponential backoff
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configuration
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY;
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data', 'google-raw');
const EXISTING_VENUES_PATH = path.join(PROJECT_ROOT, 'public', 'venues.json');

// Rate limiting
const RATE_LIMIT_MS = 250; // 4 req/s
const MAX_RETRIES = 3;
const BACKOFF_BASE = 1000;

// Budget control
const MAX_NEW_DETAILS_FETCHES = 1000; // Cost control

// Query templates
const EAST_LONDON_QUERIES = [
  // Areas
  { query: 'restaurant Whitechapel London', area: 'Whitechapel', type: 'area' },
  { query: 'halal restaurant Whitechapel London', area: 'Whitechapel', type: 'halal-area' },
  { query: 'restaurant Ilford London', area: 'Ilford', type: 'area' },
  { query: 'halal restaurant Ilford London', area: 'Ilford', type: 'halal-area' },
  { query: 'restaurant Romford London', area: 'Romford', type: 'area' },
  { query: 'halal restaurant Romford', area: 'Romford', type: 'halal-area' },
  { query: 'restaurant Stratford London', area: 'Stratford', type: 'area' },
  { query: 'halal restaurant Stratford London', area: 'Stratford', type: 'halal-area' },
  { query: 'restaurant Bethnal Green London', area: 'Bethnal Green', type: 'area' },
  { query: 'halal restaurant Bethnal Green', area: 'Bethnal Green', type: 'halal-area' },
  { query: 'restaurant Hackney London', area: 'Hackney', type: 'area' },
  { query: 'restaurant Canary Wharf London', area: 'Canary Wharf', type: 'area' },
  { query: 'restaurant Bow London', area: 'Bow', type: 'area' },
  { query: 'restaurant Mile End London', area: 'Mile End', type: 'area' },
  
  // Stations (high-footfall)
  { query: 'restaurant near Stratford station', area: 'Stratford', type: 'station' },
  { query: 'halal restaurant near Stratford station', area: 'Stratford', type: 'halal-station' },
  { query: 'restaurant near Whitechapel station', area: 'Whitechapel', type: 'station' },
  { query: 'halal restaurant near Whitechapel station', area: 'Whitechapel', type: 'halal-station' },
  { query: 'restaurant near Liverpool Street station', area: 'City', type: 'station' },
  { query: 'restaurant near Ilford station', area: 'Ilford', type: 'station' },
  { query: 'halal restaurant near Ilford station', area: 'Ilford', type: 'halal-station' },
  { query: 'restaurant near Canary Wharf station', area: 'Canary Wharf', type: 'station' },
  { query: 'restaurant near Bethnal Green station', area: 'Bethnal Green', type: 'station' },
  { query: 'restaurant near Mile End station', area: 'Mile End', type: 'station' },
  { query: 'restaurant near Bow Road station', area: 'Bow', type: 'station' },
  
  // Dietary (London-wide to capture missing venues)
  { query: 'halal restaurant East London', area: 'East London', type: 'dietary' },
  { query: 'vegetarian restaurant East London', area: 'East London', type: 'dietary' },
  { query: 'vegan restaurant East London', area: 'East London', type: 'dietary' },
  { query: 'halal restaurant London', area: 'London', type: 'dietary' },
  { query: 'vegetarian restaurant London', area: 'London', type: 'dietary' },
  { query: 'vegan restaurant London', area: 'London', type: 'dietary' },
];

// Utilities
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function saveJSON(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

function loadJSON(filepath) {
  if (!fs.existsSync(filepath)) return null;
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

// Load existing place IDs to avoid duplicates
function loadExistingPlaceIds() {
  const existingData = loadJSON(EXISTING_VENUES_PATH);
  if (!existingData) return new Set();
  
  const venues = existingData.venues || existingData;
  return new Set(venues.map(v => v.place_id).filter(Boolean));
}

// Google Places Text Search with retry
async function searchPlaces(query, retryCount = 0) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const response = await axios.get(url, {
      params: {
        query,
        key: GOOGLE_API_KEY,
        type: 'restaurant'
      },
      timeout: 10000
    });
    
    if (response.data.status === 'OK') {
      return response.data.results;
    } else if (response.data.status === 'ZERO_RESULTS') {
      return [];
    } else if (response.data.status === 'OVER_QUERY_LIMIT' && retryCount < MAX_RETRIES) {
      console.log(`   ⚠️  Rate limited, backing off...`);
      await delay(BACKOFF_BASE * Math.pow(2, retryCount));
      return searchPlaces(query, retryCount + 1);
    } else {
      console.error(`   ❌ API Error: ${response.data.status}`);
      return [];
    }
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`   ⚠️  Error, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
      await delay(BACKOFF_BASE * Math.pow(2, retryCount));
      return searchPlaces(query, retryCount + 1);
    }
    console.error(`   ❌ Fatal error: ${error.message}`);
    return [];
  }
}

// Main expansion function
async function expandDataset() {
  console.log('🚀 EAST LONDON & DIETARY EXPANSION\n');
  console.log('='.repeat(70));
  console.log('Target: New venues in underrepresented areas');
  console.log('Budget: Max 1000 new detail fetches');
  console.log('='.repeat(70) + '\n');
  
  // Load existing place IDs
  const existingPlaceIds = loadExistingPlaceIds();
  console.log(`📋 Loaded ${existingPlaceIds.size} existing place IDs\n`);
  
  // Track new discoveries
  const newPlaces = new Map();
  const stats = {
    queriesExecuted: 0,
    totalResults: 0,
    newPlaces: 0,
    duplicates: 0,
    byArea: {},
    byType: {}
  };
  
  // Execute queries
  for (let i = 0; i < EAST_LONDON_QUERIES.length; i++) {
    const { query, area, type } = EAST_LONDON_QUERIES[i];
    const progress = `[${i + 1}/${EAST_LONDON_QUERIES.length}]`;
    
    console.log(`${progress} Searching: "${query}"`);
    
    const results = await searchPlaces(query);
    stats.queriesExecuted++;
    stats.totalResults += results.length;
    
    console.log(`   📍 Found ${results.length} results`);
    
    // Process results
    let newInQuery = 0;
    let dupsInQuery = 0;
    
    for (const place of results) {
      if (existingPlaceIds.has(place.place_id)) {
        dupsInQuery++;
        stats.duplicates++;
      } else if (!newPlaces.has(place.place_id)) {
        newPlaces.set(place.place_id, {
          place_id: place.place_id,
          name: place.name,
          formatted_address: place.formatted_address,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          price_level: place.price_level,
          types: place.types,
          geometry: place.geometry,
          discoveredBy: { query, area, type },
          fetched_at: new Date().toISOString()
        });
        newInQuery++;
        stats.newPlaces++;
        
        // Track by area and type
        stats.byArea[area] = (stats.byArea[area] || 0) + 1;
        stats.byType[type] = (stats.byType[type] || 0) + 1;
      }
    }
    
    console.log(`   ✅ New: ${newInQuery}, Duplicates: ${dupsInQuery}`);
    
    // Rate limiting
    await delay(RATE_LIMIT_MS);
    
    // Budget check
    if (stats.newPlaces >= MAX_NEW_DETAILS_FETCHES) {
      console.log(`\n⚠️  Reached budget limit (${MAX_NEW_DETAILS_FETCHES} new places). Stopping search.\n`);
      break;
    }
  }
  
  // Save new places for detail fetching
  const outputPath = path.join(DATA_DIR, 'expansion-candidates.json');
  saveJSON(outputPath, {
    timestamp: new Date().toISOString(),
    totalNew: newPlaces.size,
    places: Array.from(newPlaces.values()),
    stats
  });
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('✅ EXPANSION SEARCH COMPLETE');
  console.log('='.repeat(70));
  console.log(`Queries Executed: ${stats.queriesExecuted}`);
  console.log(`Total Results: ${stats.totalResults}`);
  console.log(`New Places: ${stats.newPlaces}`);
  console.log(`Duplicates: ${stats.duplicates}`);
  console.log('');
  console.log('By Area:');
  Object.entries(stats.byArea)
    .sort((a, b) => b[1] - a[1])
    .forEach(([area, count]) => {
      console.log(`  ${area}: ${count}`);
    });
  console.log('');
  console.log('By Type:');
  Object.entries(stats.byType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
  console.log('');
  console.log(`📊 Saved to: ${outputPath}`);
  console.log('');
  console.log('Next Steps:');
  console.log('1. Run fetchPlaceDetails.js on expansion-candidates.json');
  console.log('2. Run FSA enhancement');
  console.log('3. Merge with existing venues.json');
  console.log('='.repeat(70) + '\n');
  
  return {
    newPlaces: stats.newPlaces,
    outputPath,
    stats
  };
}

// Run if called directly
if (require.main === module) {
  if (!GOOGLE_API_KEY) {
    console.error('❌ Error: NEXT_PUBLIC_GOOGLE_PLACES_KEY not found in .env.local');
    process.exit(1);
  }
  
  expandDataset()
    .then((result) => {
      console.log(`✅ Success! Found ${result.newPlaces} new venues.`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { expandDataset };
