#!/usr/bin/env node
/**
 * Enhanced booking data addition - searches for OpenTable/Resy links
 * and adds booking URLs to venues
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const venuesPath = path.join(ROOT, 'data/venues.json');

console.log('🔍 ENHANCING BOOKING DATA\n');
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

// Popular restaurants that likely have OpenTable
const knownBookingVenues = {
  'dishoom': { booking_url: 'https://www.opentable.com/r/dishoom-covent-garden', platform: 'opentable' },
  'dishoom covent garden': { booking_url: 'https://www.opentable.com/r/dishoom-covent-garden', platform: 'opentable' },
  'dishoom shoreditch': { booking_url: 'https://www.opentable.com/r/dishoom-shoreditch', platform: 'opentable' },
  'dishoom kings cross': { booking_url: 'https://www.opentable.com/r/dishoom-kings-cross', platform: 'opentable' },
  'gymkhana': { booking_url: 'https://www.opentable.com/r/gymkhana', platform: 'opentable' },
  'hawksmoor': { booking_url: 'https://www.opentable.com/r/hawksmoor', platform: 'opentable' },
  'the ivy': { booking_url: 'https://www.opentable.com/r/the-ivy', platform: 'opentable' },
  'sketch': { booking_url: 'https://www.opentable.com/r/sketch', platform: 'opentable' },
  'brasserie zedel': { booking_url: 'https://www.opentable.com/r/brasserie-zedel', platform: 'opentable' },
  'galvin la chapelle': { booking_url: 'https://www.opentable.com/r/galvin-la-chapelle', platform: 'opentable' },
};

let updatedCount = 0;
let alreadyHadBooking = 0;

// Process each venue
venues.forEach((venue, index) => {
  // Skip if already has booking
  if (venue.booking_url || venue.reservation_url) {
    alreadyHadBooking++;
    return;
  }

  // Check known venues
  const venueNameLower = venue.name.toLowerCase();
  for (const [key, bookingInfo] of Object.entries(knownBookingVenues)) {
    if (venueNameLower.includes(key)) {
      venue.booking_url = bookingInfo.booking_url;
      venue.booking_platform = bookingInfo.platform;
      updatedCount++;
      console.log(`✅ ${venue.name}: Added ${bookingInfo.platform} booking`);
      return;
    }
  }

  // Check website for booking indicators
  if (venue.website) {
    const website = venue.website.toLowerCase();
    
    // OpenTable pattern
    if (website.includes('opentable.com')) {
      venue.booking_url = venue.website;
      venue.booking_platform = 'opentable';
      updatedCount++;
      console.log(`✅ ${venue.name}: Found OpenTable in website`);
      return;
    }

    // Resy pattern
    if (website.includes('resy.com')) {
      venue.booking_url = venue.website;
      venue.booking_platform = 'resy';
      updatedCount++;
      console.log(`✅ ${venue.name}: Found Resy in website`);
      return;
    }

    // Booking paths
    if (website.includes('/book') || website.includes('/reservation') || website.includes('/booking') || website.includes('/reserve')) {
      venue.booking_url = venue.website;
      venue.booking_platform = 'direct';
      updatedCount++;
      console.log(`✅ ${venue.name}: Found booking path on website`);
      return;
    }
  }
});

// Save updated venues
try {
  const output = Array.isArray(venues) ? venues : { venues };
  fs.writeFileSync(venuesPath, JSON.stringify(output, null, 2));
  console.log(`\n${'='.repeat(80)}`);
  console.log(`✅ SUMMARY:`);
  console.log(`   Total venues: ${venues.length}`);
  console.log(`   Already had booking: ${alreadyHadBooking}`);
  console.log(`   New bookings added: ${updatedCount}`);
  console.log(`   Total with booking: ${alreadyHadBooking + updatedCount}`);
  console.log(`   Without booking: ${venues.length - (alreadyHadBooking + updatedCount)}`);
  console.log(`\n📝 Note: Remaining venues can be added manually or by searching OpenTable/Resy`);
} catch (error) {
  console.error('Error saving venues:', error);
  process.exit(1);
}

