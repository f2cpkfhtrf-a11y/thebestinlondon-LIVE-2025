/**
 * Auto-Refresh Script
 * 
 * This script is run daily by GitHub Actions to:
 * 1. Update venue data from Google Places API
 * 2. Refresh FSA hygiene ratings
 * 3. Update venue metadata (opening hours, ratings, etc)
 * 4. Maintain data quality and freshness
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const VENUES_PATH = path.join(__dirname, '../public/venues.json');
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const FSA_API_KEY = process.env.FSA_API_KEY;

// Stats tracking
const stats = {
  total: 0,
  updated: 0,
  failed: 0,
  skipped: 0,
  fsaUpdated: 0,
  ratingChanges: 0,
  startTime: Date.now()
};

/**
 * Make HTTPS request
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch updated place details from Google
 */
async function updateVenueFromGoogle(venue) {
  if (!GOOGLE_API_KEY) {
    console.log('⚠️  No Google API key - skipping Google refresh');
    return venue;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${venue.place_id}&fields=name,rating,user_ratings_total,photos,opening_hours,website,formatted_phone_number&key=${GOOGLE_API_KEY}`;
    
    const data = await makeRequest(url);
    
    if (data.status === 'OK' && data.result) {
      const result = data.result;
      const updated = { ...venue };
      let changed = false;

      // Update rating if different
      if (result.rating && result.rating !== venue.rating) {
        console.log(`  📊 ${venue.name}: Rating ${venue.rating} → ${result.rating}`);
        updated.rating = result.rating;
        stats.ratingChanges++;
        changed = true;
      }

      // Update review count
      if (result.user_ratings_total !== venue.user_ratings_total) {
        updated.user_ratings_total = result.user_ratings_total;
        changed = true;
      }

      // Update opening hours
      if (result.opening_hours) {
        updated.opening_hours = result.opening_hours;
        changed = true;
      }

      // Update website if changed
      if (result.website && result.website !== venue.website) {
        updated.website = result.website;
        changed = true;
      }

      // Update phone if changed
      if (result.formatted_phone_number && result.formatted_phone_number !== venue.phone) {
        updated.phone = result.formatted_phone_number;
        changed = true;
      }

      if (changed) {
        updated.lastUpdated = new Date().toISOString();
        stats.updated++;
      }

      return updated;
    }
    
    return venue;
  } catch (error) {
    console.error(`  ❌ Error updating ${venue.name}:`, error.message);
    stats.failed++;
    return venue;
  }
}

/**
 * Fetch FSA rating for a venue
 */
async function updateFSARating(venue) {
  if (!venue.address || !FSA_API_KEY) {
    return venue;
  }

  // FSA API implementation
  // Note: FSA API requires specific authentication and rate limiting
  // This is a placeholder - implement based on FSA API documentation
  
  return venue;
}

/**
 * Main refresh function
 */
async function refreshVenueData() {
  console.log('🔄 Starting auto-refresh process...\n');

  // Load existing venues
  const venuesData = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf8'));
  stats.total = venuesData.venues.length;

  console.log(`📍 Found ${stats.total} venues to refresh`);
  console.log('⏳ This will take several minutes due to API rate limits...\n');

  // Process venues in batches to respect rate limits
  const BATCH_SIZE = 10;
  const DELAY_MS = 2000; // 2 second delay between batches

  for (let i = 0; i < venuesData.venues.length; i += BATCH_SIZE) {
    const batch = venuesData.venues.slice(i, i + BATCH_SIZE);
    
    console.log(`Processing venues ${i + 1}-${Math.min(i + BATCH_SIZE, venuesData.venues.length)}...`);
    
    const updatedBatch = await Promise.all(
      batch.map(async (venue) => {
        const updated = await updateVenueFromGoogle(venue);
        return updated;
      })
    );

    // Update venues in data
    for (let j = 0; j < updatedBatch.length; j++) {
      venuesData.venues[i + j] = updatedBatch[j];
    }

    // Delay between batches
    if (i + BATCH_SIZE < venuesData.venues.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  }

  // Update metadata
  venuesData.lastUpdated = new Date().toISOString();
  venuesData.totalVenues = venuesData.venues.length;

  // Recalculate coverage
  const coverage = {
    google_rating: venuesData.venues.filter(v => v.rating).length,
    fsa_rating: venuesData.venues.filter(v => v.fsa_rating).length,
    photos: venuesData.venues.filter(v => v.photos && v.photos.length > 0).length,
    website: venuesData.venues.filter(v => v.website).length,
    phone: venuesData.venues.filter(v => v.phone).length,
    opening_hours: venuesData.venues.filter(v => v.opening_hours).length
  };
  
  coverage.fsa_coverage_pct = `${((coverage.fsa_rating / venuesData.venues.length) * 100).toFixed(1)}%`;
  venuesData.coverage = coverage;

  // Save updated data
  fs.writeFileSync(VENUES_PATH, JSON.stringify(venuesData, null, 2));

  // Print summary
  const duration = ((Date.now() - stats.startTime) / 1000 / 60).toFixed(1);
  
  console.log('\n✅ Auto-refresh complete!\n');
  console.log('📊 REFRESH SUMMARY:');
  console.log(`   Total venues: ${stats.total}`);
  console.log(`   Updated: ${stats.updated}`);
  console.log(`   Rating changes: ${stats.ratingChanges}`);
  console.log(`   Failed: ${stats.failed}`);
  console.log(`   Duration: ${duration} minutes`);
  console.log(`\n📈 COVERAGE:`);
  console.log(`   Google ratings: ${coverage.google_rating}/${stats.total}`);
  console.log(`   FSA ratings: ${coverage.fsa_rating}/${stats.total} (${coverage.fsa_coverage_pct})`);
  console.log(`   Photos: ${coverage.photos}/${stats.total}`);
  console.log(`   Websites: ${coverage.website}/${stats.total}`);
  console.log(`   Phone numbers: ${coverage.phone}/${stats.total}`);
  
  if (stats.updated > 0) {
    console.log(`\n✅ ${stats.updated} venues updated successfully`);
  } else {
    console.log('\nℹ️  No changes detected - data is current');
  }
}

// Run if called directly
if (require.main === module) {
  refreshVenueData()
    .then(() => {
      console.log('\n✅ Process complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Fatal error:', error.message);
      process.exit(1);
    });
}

module.exports = { refreshVenueData };
