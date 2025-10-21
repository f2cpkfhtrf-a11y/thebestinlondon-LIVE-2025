#!/usr/bin/env node
/**
 * Update Slough and Southall venues with real Google Places IDs
 * and fetch photo references for them
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Google API Key - try multiple sources
let GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 
                     process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
                     process.env.GOOGLE_PLACES_API_KEY ||
                     process.env.GOOGLE_MAPS_API_KEY;

// Try reading from .env file if not in environment
if (!GOOGLE_API_KEY) {
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
    GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 
                     process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
                     process.env.GOOGLE_PLACES_API_KEY ||
                     process.env.GOOGLE_MAPS_API_KEY;
  } catch (e) {
    // dotenv not available, continue
  }
}

if (!GOOGLE_API_KEY) {
  console.error('❌ Google API Key not found');
  console.error('Please set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in .env file or environment');
  console.error('\nTo run this script:');
  console.error('  export NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key_here');
  console.error('  node scripts/updateSloughSouthallPlaceIds.mjs');
  process.exit(1);
}

const RATE_LIMIT_MS = 150; // Delay between API calls

// Delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Search Google Places by name and location
async function searchPlace(venueName, location, address) {
  try {
    const query = `${venueName}, ${location || 'London'}`;
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const params = new URLSearchParams({
      query,
      key: GOOGLE_API_KEY,
      location: '51.5074,-0.1278', // London center
      radius: '50000', // 50km
    });
    
    await delay(RATE_LIMIT_MS);
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      // Find best match (exact name match preferred)
      const exactMatch = data.results.find(r => 
        r.name.toLowerCase() === venueName.toLowerCase()
      );
      
      if (exactMatch) {
        return exactMatch;
      }
      
      // Return first result as fallback
      return data.results[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error searching for ${venueName}:`, error.message);
    return null;
  }
}

// Get place details including photos
async function getPlaceDetails(placeId) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json';
    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'place_id,name,formatted_address,photos,geometry',
      key: GOOGLE_API_KEY,
    });
    
    await delay(RATE_LIMIT_MS);
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    
    if (data.status === 'OK' && data.result) {
      return data.result;
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting details for ${placeId}:`, error.message);
    return null;
  }
}

// Main function
async function updateVenues() {
  console.log('🔍 Updating Slough and Southall venue place_ids and photos...\n');
  
  // Load venues
  const venuesPath = path.join(__dirname, '../data/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  // Find venues that need updating
  const slough = venues.filter(v => 
    (v.area || v.borough || '').toLowerCase().includes('slough') &&
    v.place_id && v.place_id.startsWith('seed-')
  );
  
  const southall = venues.filter(v => 
    (v.area || '').toLowerCase().includes('southall') &&
    v.place_id && v.place_id.startsWith('seed-')
  );
  
  const venuesToUpdate = [...slough, ...southall];
  
  console.log(`Found ${venuesToUpdate.length} venues to update:`);
  console.log(`  Slough: ${slough.length}`);
  console.log(`  Southall: ${southall.length}\n`);
  
  let updated = 0;
  let failed = 0;
  
  for (const venue of venuesToUpdate.slice(0, 20)) { // Limit to 20 for testing
    try {
      console.log(`\n📍 Processing: ${venue.name}`);
      console.log(`   Current place_id: ${venue.place_id}`);
      
      const location = venue.area || venue.borough || 'London';
      const address = venue.address?.formatted || venue.vicinity || '';
      
      // Search for real place
      const searchResult = await searchPlace(venue.name, location, address);
      
      if (!searchResult) {
        console.log(`   ❌ No Google Places result found`);
        failed++;
        continue;
      }
      
      console.log(`   ✅ Found: ${searchResult.name} (${searchResult.place_id})`);
      
      // Get details including photos
      const details = await getPlaceDetails(searchResult.place_id);
      
      if (!details) {
        console.log(`   ⚠️  Could not fetch details`);
        failed++;
        continue;
      }
      
      // Update venue data
      const originalPlaceId = venue.place_id;
      venue.place_id = details.place_id;
      
      // Update photos if available
      if (details.photos && details.photos.length > 0) {
        venue.photos = details.photos.map(photo => ({
          reference: photo.photo_reference,
          photo_reference: photo.photo_reference,
          url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`,
          width: photo.width,
          height: photo.height,
        }));
        console.log(`   📸 Added ${venue.photos.length} photo(s)`);
      }
      
      // Update geometry if available
      if (details.geometry) {
        venue.lat = details.geometry.location.lat;
        venue.lng = details.geometry.location.lng;
      }
      
      // Update address if better
      if (details.formatted_address && !venue.address?.formatted) {
        venue.formatted_address = details.formatted_address;
      }
      
      console.log(`   ✅ Updated place_id: ${originalPlaceId} → ${venue.place_id}`);
      updated++;
      
    } catch (error) {
      console.error(`   ❌ Error processing ${venue.name}:`, error.message);
      failed++;
    }
  }
  
  // Save updated venues
  if (updated > 0) {
    // Create backup first
    const backupPath = venuesPath.replace('.json', `.backup-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(venuesData, null, 2));
    console.log(`\n💾 Created backup: ${path.basename(backupPath)}`);
    
    // Save updated data
    fs.writeFileSync(venuesPath, JSON.stringify(venuesData, null, 2));
    console.log(`✅ Saved ${updated} updated venues to venues.json`);
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total processed: ${venuesToUpdate.length}`);
}

// Run
updateVenues().catch(console.error);

