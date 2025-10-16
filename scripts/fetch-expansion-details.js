#!/usr/bin/env node

/**
 * FETCH PLACE DETAILS FOR EXPANSION
 * Fetches detailed information for new places from expansion search
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY;
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data', 'google-raw');
const RATE_LIMIT_MS = 250;
const MAX_RETRIES = 3;
const BACKOFF_BASE = 1000;

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

async function fetchPlaceDetails(placeId, retryCount = 0) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json';
    const response = await axios.get(url, {
      params: {
        place_id: placeId,
        fields: 'place_id,name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,price_level,opening_hours,geometry,photos,reviews,types,url,editorial_summary',
        key: GOOGLE_API_KEY
      },
      timeout: 10000
    });
    
    if (response.data.status === 'OK') {
      return response.data.result;
    } else if (response.data.status === 'OVER_QUERY_LIMIT' && retryCount < MAX_RETRIES) {
      console.log(`   ⚠️  Rate limited, backing off...`);
      await delay(BACKOFF_BASE * Math.pow(2, retryCount));
      return fetchPlaceDetails(placeId, retryCount + 1);
    } else {
      console.error(`   ❌ API Error: ${response.data.status}`);
      return null;
    }
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`   ⚠️  Error, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
      await delay(BACKOFF_BASE * Math.pow(2, retryCount));
      return fetchPlaceDetails(placeId, retryCount + 1);
    }
    console.error(`   ❌ Fatal error: ${error.message}`);
    return null;
  }
}

async function fetchExpansionDetails() {
  console.log('🔍 FETCHING EXPANSION PLACE DETAILS\n');
  console.log('='.repeat(70));
  
  // Load expansion candidates
  const candidatesPath = path.join(DATA_DIR, 'expansion-candidates.json');
  const candidates = loadJSON(candidatesPath);
  
  if (!candidates || !candidates.places) {
    console.error('❌ Error: expansion-candidates.json not found. Run expand-east-london.js first.');
    process.exit(1);
  }
  
  console.log(`📋 Loading ${candidates.places.length} candidates\n`);
  
  const details = [];
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < candidates.places.length; i++) {
    const place = candidates.places[i];
    const progress = `[${i + 1}/${candidates.places.length}]`;
    
    console.log(`${progress} ${place.name}`);
    
    const detail = await fetchPlaceDetails(place.place_id);
    
    if (detail) {
      details.push({
        ...detail,
        fetched_at: new Date().toISOString(),
        discoveredBy: place.discoveredBy
      });
      success++;
      console.log(`   ✅ Success`);
    } else {
      failed++;
      console.log(`   ❌ Failed`);
    }
    
    await delay(RATE_LIMIT_MS);
  }
  
  // Save details
  const outputPath = path.join(DATA_DIR, 'expansion-details.json');
  saveJSON(outputPath, {
    timestamp: new Date().toISOString(),
    totalFetched: success,
    totalFailed: failed,
    places: details
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ DETAIL FETCH COMPLETE');
  console.log('='.repeat(70));
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log(`Output: ${outputPath}`);
  console.log('='.repeat(70) + '\n');
  
  return { success, failed, outputPath };
}

if (require.main === module) {
  if (!GOOGLE_API_KEY) {
    console.error('❌ Error: NEXT_PUBLIC_GOOGLE_PLACES_KEY not found in .env.local');
    process.exit(1);
  }
  
  fetchExpansionDetails()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { fetchExpansionDetails };
