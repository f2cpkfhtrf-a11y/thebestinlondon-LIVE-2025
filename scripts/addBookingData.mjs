#!/usr/bin/env node
/**
 * Script to add booking URLs to venue data
 * Scans restaurant websites for booking links or adds manual booking URLs
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const venuesPath = path.join(ROOT, 'data/venues.json');

console.log('🔍 ADDING BOOKING DATA TO VENUES\n');
console.log('='.repeat(80));

// Read venues
let venues = [];
try {
  const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  venues = Array.isArray(data) ? data : (data.venues || []);
  console.log(`Found ${venues.length} venues\n`);
} catch (error) {
  console.error('Error reading venues:', error);
  process.exit(1);
}

// Common booking platform patterns
const bookingPatterns = {
  opentable: /opentable\.com/i,
  resy: /resy\.com/i,
  sevenrooms: /sevenrooms\.com|7rooms\.com/i,
  tock: /exploretock\.com/i,
  designmynight: /designmynight\.com/i,
  freetobook: /freetobook\.com/i
};

let updatedCount = 0;

// Process each venue
venues.forEach((venue, index) => {
  // Skip if already has booking_url
  if (venue.booking_url || venue.reservation_url) {
    return;
  }

  // Check website for booking indicators
  if (venue.website) {
    const website = venue.website.toLowerCase();
    
    // Check if website contains booking platform
    for (const [platform, pattern] of Object.entries(bookingPatterns)) {
      if (pattern.test(website)) {
        venue.booking_url = venue.website;
        venue.booking_platform = platform;
        updatedCount++;
        console.log(`✅ ${venue.name}: Found ${platform} booking`);
        return;
      }
    }

    // Check for common booking paths
    const bookingPaths = ['/book', '/reservation', '/booking', '/reserve', '/table'];
    for (const path of bookingPaths) {
      if (website.includes(path)) {
        venue.booking_url = venue.website;
        venue.booking_platform = 'direct';
        updatedCount++;
        console.log(`✅ ${venue.name}: Found direct booking on website`);
        return;
      }
    }
  }
});

// Save updated venues
try {
  const output = Array.isArray(venues) ? venues : { venues };
  fs.writeFileSync(venuesPath, JSON.stringify(output, null, 2));
  console.log(`\n✅ Updated ${updatedCount} venues with booking information`);
  console.log(`\n📝 Next Steps:`);
  console.log(`   1. Manually add booking_url to venues that need it`);
  console.log(`   2. Check booking URLs for accuracy`);
  console.log(`   3. Add OpenTable/Resy IDs for widget support if available`);
} catch (error) {
  console.error('Error saving venues:', error);
  process.exit(1);
}

console.log('\n' + '='.repeat(80));

