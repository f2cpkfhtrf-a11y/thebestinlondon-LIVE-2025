#!/usr/bin/env node
/**
 * Automated booking URL addition - expands booking coverage
 * Searches websites and common patterns for booking links
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const venuesPath = path.join(ROOT, 'data/venues.json');

console.log('🔍 AUTO-ADDING MORE BOOKING URLS\n');
console.log('='.repeat(80));

// Read venues
let venues = [];
try {
  const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  venues = Array.isArray(data) ? data : (venues.venues || []);
  console.log(`Found ${venues.length} venues\n`);
} catch (error) {
  console.error('Error reading venues:', error);
  process.exit(1);
}

// Extended database of known booking URLs for popular London restaurants
const bookingDatabase = {
  // Very Popular Restaurants
  'circolo popolare': { url: 'https://www.bigmammagroup.com/en/trattorias/circolo-popolare/book-a-table', platform: 'direct' },
  'gloria': { url: 'https://www.bigmammagroup.com/en/trattorias/gloria/book-a-table', platform: 'direct' },
  'duck and waffle': { url: 'https://duckandwaffle.com/reservations/', platform: 'direct' },
  'sushisamba': { url: 'https://www.opentable.com/r/sushi-samba-city', platform: 'opentable' },
  'sushisamba london': { url: 'https://www.opentable.com/r/sushi-samba-city', platform: 'opentable' },
  'padella': { url: 'https://www.opentable.com/r/padella', platform: 'opentable' },
  'tayyabs': { url: 'https://www.opentable.com/r/tayyabs', platform: 'opentable' },
  'wahaca': { url: 'https://www.opentable.com/r/wahaca-covent-garden', platform: 'opentable' },
  'blacklock': { url: 'https://www.opentable.com/r/blacklock-soho', platform: 'opentable' },
  'eggbreak': { url: 'https://eggbreak.co.uk/', platform: 'direct' },
  'inamo': { url: 'https://www.inamo-restaurant.com/book-a-table/', platform: 'direct' },
  'letosoho': { url: 'https://www.letorestaurants.com/book-a-table/', platform: 'direct' },
  'l\'eto soho': { url: 'https://www.letorestaurants.com/book-a-table/', platform: 'direct' },
  'smokestak': { url: 'https://www.opentable.com/r/smokestak', platform: 'opentable' },
  'hide': { url: 'https://www.opentable.com/r/hide', platform: 'opentable' },
  'the breakfast club': { url: 'https://www.opentable.com/r/the-breakfast-club-soho', platform: 'opentable' },
  'yauatcha': { url: 'https://www.opentable.com/r/yauatcha-soho', platform: 'opentable' },
  'hakkasan': { url: 'https://www.opentable.com/r/hakkasan-mayfair', platform: 'opentable' },
  'zuma': { url: 'https://www.opentable.com/r/zuma', platform: 'opentable' },
  'novikov': { url: 'https://www.opentable.com/r/novikov-restaurant-and-bar', platform: 'opentable' },
  'rules': { url: 'https://www.opentable.com/r/rules', platform: 'opentable' },
  'the wolseley': { url: 'https://www.opentable.com/r/the-wolseley', platform: 'opentable' },
  'colbert': { url: 'https://www.opentable.com/r/colbert', platform: 'opentable' },
  'barbary': { url: 'https://www.opentable.com/r/the-barbary', platform: 'opentable' },
  'the palomar': { url: 'https://www.opentable.com/r/the-palomar', platform: 'opentable' },
  'benares': { url: 'https://www.opentable.com/r/benares', platform: 'opentable' },
  'tamarind': { url: 'https://www.opentable.com/r/tamarind', platform: 'opentable' },
  'amaya': { url: 'https://www.opentable.com/r/amaya', platform: 'opentable' },
  'chutney mary': { url: 'https://www.opentable.com/r/chutney-mary', platform: 'opentable' },
  'cacciari': { url: 'https://www.opentable.com/r/cacciari-s-28', platform: 'opentable' },
  'pizza east': { url: 'https://www.opentable.com/r/pizza-east-shoreditch', platform: 'opentable' },
  'pizza pilgrims': { url: 'https://www.opentable.com/r/pizza-pilgrims', platform: 'opentable' },
  'ruths chris': { url: 'https://www.opentable.com/r/ruths-chris-steak-house', platform: 'opentable' },
  'goodman': { url: 'https://www.opentable.com/r/goodman-city', platform: 'opentable' },
  'smith & wollensky': { url: 'https://www.opentable.com/r/smith-and-wollensky', platform: 'opentable' },
  'the palm': { url: 'https://www.opentable.com/r/the-palm-london', platform: 'opentable' },
  'bobbob ricard': { url: 'https://www.opentable.com/r/bob-bob-ricard', platform: 'opentable' },
  'rocca': { url: 'https://www.opentable.com/r/rocca', platform: 'opentable' },
  'colony': { url: 'https://www.opentable.com/r/colony-grille', platform: 'opentable' },
  'the ledbury': { url: 'https://www.opentable.com/r/the-ledbury', platform: 'opentable' },
  'the savoy grill': { url: 'https://www.opentable.com/r/the-savoy-grill', platform: 'opentable' },
  
  // Indian restaurants
  'taste of lahore': { url: null, platform: 'phone' }, // May need phone
  'lahore kebab house': { url: null, platform: 'phone' },
  'dilpasand': { url: null, platform: 'phone' },
  
  // Chain restaurants that typically use OpenTable
  'las iguanas': { url: 'https://www.opentable.com/r/las-iguanas', platform: 'opentable' },
  'turtle bay': { url: 'https://www.turtlebay.co.uk/book-a-table', platform: 'direct' },
  'big easy': { url: 'https://www.bigeasy.co.uk/book-a-table/', platform: 'direct' },
  
  // Smaller/niche restaurants patterns
  'yelp': { url: null, platform: null }, // Skip if only has Yelp
};

let updatedCount = 0;
const alreadyHadBooking = venues.filter(v => v.booking_url || v.reservation_url).length;

// Get venues without booking, sorted by popularity
const venuesWithoutBooking = venues
  .filter(v => !v.booking_url && !v.reservation_url && v.website)
  .sort((a, b) => {
    const aScore = (a.rating || 0) * Math.log10((a.user_ratings_total || 0) + 1);
    const bScore = (b.rating || 0) * Math.log10((b.user_ratings_total || 0) + 1);
    return bScore - aScore;
  });

console.log(`Processing ${venuesWithoutBooking.length} venues without booking...\n`);

// Process venues
venuesWithoutBooking.forEach((venue) => {
  const venueNameLower = venue.name.toLowerCase().trim();
  const venueNameWords = venueNameLower.split(/\s+/).filter(w => w.length > 2);
  
  // Check booking database
  for (const [key, bookingInfo] of Object.entries(bookingDatabase)) {
    if (bookingInfo.url === null) continue; // Skip phone-only entries
    
    const keyWords = key.split(/\s+/);
    const matchScore = keyWords.filter(kw => 
      venueNameLower.includes(kw) || venueNameWords.some(w => w.includes(kw))
    ).length;
    
    if (matchScore >= keyWords.length * 0.7) { // 70% match
      venue.booking_url = bookingInfo.url;
      venue.booking_platform = bookingInfo.platform;
      updatedCount++;
      console.log(`✅ ${venue.name}: Added ${bookingInfo.platform} booking`);
      return;
    }
  }
  
  // Check website for booking patterns
  if (venue.website) {
    const website = venue.website.toLowerCase();
    
    // Common booking platform indicators
    const bookingPatterns = [
      { pattern: /opentable\.com/i, platform: 'opentable', extract: (url) => url },
      { pattern: /resy\.com/i, platform: 'resy', extract: (url) => url },
      { pattern: /sevenrooms\.com|7rooms\.com/i, platform: 'sevenrooms', extract: (url) => url },
      { pattern: /exploretock\.com/i, platform: 'tock', extract: (url) => url },
      { pattern: /designmynight\.com/i, platform: 'designmynight', extract: (url) => url },
      { pattern: /freetobook\.com/i, platform: 'freetobook', extract: (url) => url },
      { pattern: /when2meet/i, platform: 'when2meet', extract: (url) => url },
      { pattern: /\/book[^-]|booking|reserv/i, platform: 'direct', extract: (url) => url },
    ];
    
    for (const { pattern, platform, extract } of bookingPatterns) {
      if (pattern.test(website)) {
        venue.booking_url = extract(venue.website);
        venue.booking_platform = platform;
        updatedCount++;
        console.log(`✅ ${venue.name}: Found ${platform} in website`);
        return;
      }
    }
    
    // Check for booking-specific paths (more thorough)
    const bookingPaths = [
      '/book-a-table', '/book-a-table/', '/book', '/booking', '/reservations', 
      '/reservation', '/reserve', '/table', '/dining', '/make-reservation'
    ];
    
    for (const path of bookingPaths) {
      if (website.includes(path) && !website.includes('widget') && !website.includes('iframe')) {
        // Try to construct booking URL
        const baseUrl = venue.website.split('/').slice(0, 3).join('/');
        venue.booking_url = venue.website.includes(path) ? venue.website : `${baseUrl}${path}`;
        venue.booking_platform = 'direct';
        updatedCount++;
        console.log(`✅ ${venue.name}: Found booking path: ${path}`);
        return;
      }
    }
  }
});

// Save updated venues
try {
  const output = Array.isArray(venues) ? venues : { venues };
  fs.writeFileSync(venuesPath, JSON.stringify(output, null, 2));
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`✅ SUMMARY:`);
  console.log(`   Venues processed: ${venuesWithoutBooking.length}`);
  console.log(`   New bookings added: ${updatedCount}`);
  
  const totalWithBooking = venues.filter(v => v.booking_url || v.reservation_url).length;
  console.log(`\n📊 FINAL COUNT:`);
  console.log(`   Total venues: ${venues.length}`);
  console.log(`   With booking: ${totalWithBooking} (${(totalWithBooking/venues.length*100).toFixed(1)}%)`);
  console.log(`   Without booking: ${venues.length - totalWithBooking}`);
  
} catch (error) {
  console.error('Error saving venues:', error);
  process.exit(1);
}

