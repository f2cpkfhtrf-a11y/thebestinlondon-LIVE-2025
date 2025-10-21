#!/usr/bin/env node
/**
 * Add booking URLs for top-rated restaurants
 * Focuses on restaurants with highest ratings and most reviews
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const venuesPath = path.join(ROOT, 'data/venues.json');

console.log('🔍 ADDING BOOKING FOR TOP-RATED RESTAURANTS\n');
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

// Common OpenTable restaurants in London (top-rated ones)
const opentableRestaurants = {
  // High-end / Popular
  'the ivy': 'https://www.opentable.com/r/the-ivy',
  'sketch': 'https://www.opentable.com/r/sketch',
  'hakkasan': 'https://www.opentable.com/r/hakkasan-mayfair',
  'zuma': 'https://www.opentable.com/r/zuma',
  'novikov': 'https://www.opentable.com/r/novikov-restaurant-and-bar',
  'dinings': 'https://www.opentable.com/r/dinings',
  'ruths chris': 'https://www.opentable.com/r/ruths-chris-steak-house',
  'the wolseley': 'https://www.opentable.com/r/the-wolseley',
  'colbert': 'https://www.opentable.com/r/colbert',
  'delamina': 'https://www.opentable.com/r/delamina',
  'the delaunay': 'https://www.opentable.com/r/the-delaunay',
  'brasserie zedel': 'https://www.opentable.com/r/brasserie-zedel',
  'galvin la chapelle': 'https://www.opentable.com/r/galvin-la-chapelle',
  'galvin at windows': 'https://www.opentable.com/r/galvin-at-windows',
  'colony': 'https://www.opentable.com/r/colony-grille',
  'gordon ramsay': 'https://www.opentable.com/r/gordon-ramsay',
  'the savoy grill': 'https://www.opentable.com/r/the-savoy-grill',
  
  // Indian
  'dishoom': 'https://www.opentable.com/r/dishoom-covent-garden',
  'benares': 'https://www.opentable.com/r/benares',
  'tamarind': 'https://www.opentable.com/r/tamarind',
  'amaya': 'https://www.opentable.com/r/amaya',
  'chutney mary': 'https://www.opentable.com/r/chutney-mary',
  
  // Italian
  'cacciari': 'https://www.opentable.com/r/cacciari-s-28',
  'l\'anima': 'https://www.opentable.com/r/lanima',
  'bancone': 'https://www.opentable.com/r/bancone',
  'pizza east': 'https://www.opentable.com/r/pizza-east-shoreditch',
  'pizza pilgrims': 'https://www.opentable.com/r/pizza-pilgrims',
  
  // Asian
  'hutong': 'https://www.opentable.com/r/hutong',
  'yauatcha': 'https://www.opentable.com/r/yauatcha-soho',
  'sushi samba': 'https://www.opentable.com/r/sushi-samba-city',
  
  // British/European
  'hawksmoor': 'https://www.opentable.com/r/hawksmoor-guildhall',
  'rules': 'https://www.opentable.com/r/rules',
  'the palm': 'https://www.opentable.com/r/the-palm-london',
  'bobbob ricard': 'https://www.opentable.com/r/bob-bob-ricard',
  'the grill': 'https://www.opentable.com/r/the-grill-at-the-dorchester',
  'the square': 'https://www.opentable.com/r/the-square',
  
  // Mediterranean/Middle Eastern
  'the palomar': 'https://www.opentable.com/r/the-palomar',
  'barbary': 'https://www.opentable.com/r/the-barbary',
  'rocca': 'https://www.opentable.com/r/rocca',
  
  // Steakhouses
  'goodman': 'https://www.opentable.com/r/goodman-city',
  'smith & wollensky': 'https://www.opentable.com/r/smith-and-wollensky',
  
  // French
  'la trompette': 'https://www.opentable.com/r/la-trompette',
  'le gavroche': 'https://www.opentable.com/r/le-gavroche',
  'the ledbury': 'https://www.opentable.com/r/the-ledbury',
};

// Get top-rated restaurants without booking
const topRated = venues
  .filter(v => !v.booking_url && !v.reservation_url)
  .sort((a, b) => {
    // Sort by: rating * reviews (engagement score)
    const aScore = (a.rating || 0) * Math.log10((a.user_ratings_total || 0) + 1);
    const bScore = (b.rating || 0) * Math.log10((b.user_ratings_total || 0) + 1);
    return bScore - aScore;
  });

console.log(`Processing top ${Math.min(100, topRated.length)} restaurants...\n`);

let updatedCount = 0;
const updatedVenues = [];

// Process top restaurants
topRated.slice(0, 100).forEach((venue, index) => {
  const venueNameLower = venue.name.toLowerCase();
  
  // Check OpenTable database
  for (const [key, bookingUrl] of Object.entries(opentableRestaurants)) {
    if (venueNameLower.includes(key) || key.includes(venueNameLower.split(' ')[0])) {
      venue.booking_url = bookingUrl;
      venue.booking_platform = 'opentable';
      updatedCount++;
      updatedVenues.push(venue.name);
      console.log(`✅ ${venue.name}: Added OpenTable booking`);
      return;
    }
  }
  
  // Check website for booking indicators
  if (venue.website) {
    const website = venue.website.toLowerCase();
    
    // OpenTable
    if (website.includes('opentable.com') && !website.includes('widget')) {
      venue.booking_url = venue.website;
      venue.booking_platform = 'opentable';
      updatedCount++;
      updatedVenues.push(venue.name);
      console.log(`✅ ${venue.name}: Found OpenTable in website`);
      return;
    }
    
    // Resy
    if (website.includes('resy.com')) {
      venue.booking_url = venue.website;
      venue.booking_platform = 'resy';
      updatedCount++;
      updatedVenues.push(venue.name);
      console.log(`✅ ${venue.name}: Found Resy booking`);
      return;
    }
    
    // SevenRooms
    if (website.includes('sevenrooms.com') || website.includes('7rooms.com')) {
      venue.booking_url = venue.website;
      venue.booking_platform = 'sevenrooms';
      updatedCount++;
      updatedVenues.push(venue.name);
      console.log(`✅ ${venue.name}: Found SevenRooms booking`);
      return;
    }
    
    // Booking paths on website
    if (website.includes('/book') || website.includes('/reservation') || 
        website.includes('/booking') || website.includes('/reserve') ||
        website.includes('/table')) {
      venue.booking_url = venue.website;
      venue.booking_platform = 'direct';
      updatedCount++;
      updatedVenues.push(venue.name);
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
  console.log(`   Total venues processed: ${topRated.length}`);
  console.log(`   New bookings added: ${updatedCount}`);
  console.log(`   Venues updated: ${updatedVenues.length > 0 ? updatedVenues.join(', ') : 'None'}`);
  
  // Count total with booking now
  const totalWithBooking = venues.filter(v => v.booking_url || v.reservation_url).length;
  console.log(`\n📊 Total venues with booking: ${totalWithBooking} / ${venues.length}`);
  console.log(`   Remaining without booking: ${venues.length - totalWithBooking}`);
  
} catch (error) {
  console.error('Error saving venues:', error);
  process.exit(1);
}

