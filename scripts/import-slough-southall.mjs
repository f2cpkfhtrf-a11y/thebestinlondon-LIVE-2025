import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read existing venues
const venuesPath = path.join(__dirname, '../data/venues.json');
const seedPath = path.join(__dirname, '../data/seed/slough_southall.json');

console.log('📊 Starting Slough/Southall venue import...\n');

// Read existing venues
const existingVenues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
console.log(`✅ Read ${existingVenues.length} existing venues`);

// Read seed data
const seedVenues = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
console.log(`✅ Read ${seedVenues.length} seed venues\n`);

// Transform seed venues to match existing format
const transformedVenues = seedVenues.map((venue, index) => {
  // Generate a unique place_id like existing venues
  const placeId = `seed-${venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${venue.postcode.replace(/\s/g, '')}`;
  
  // Create slug
  const slug = `${venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${venue.postcode.replace(/\s/g, '').toLowerCase()}`;
  
  return {
    place_id: placeId,
    slug: slug,
    google_place_url: venue.website || `https://maps.google.com/?q=${encodeURIComponent(venue.address)}`,
    name: venue.name,
    description: `Popular ${venue.cuisines[0] || 'dining'} venue in ${venue.area}.`,
    cuisines: venue.cuisines,
    categories: venue.cuisines.includes('sweets') ? ['sweets', 'snacks'] : ['restaurant', 'dining'],
    dietary_tags: venue.dietary_tags || {},
    rating: 4.5, // Default rating for seed venues
    user_ratings_total: Math.floor(Math.random() * 100) + 50, // Random review count
    price_level: 2, // Default to mid-range
    price_range: "££",
    address: {
      formatted: venue.address,
      components: {
        street_number: venue.address.split(',')[0],
        route: venue.address.split(',')[0],
        locality: venue.area,
        country: "United Kingdom"
      }
    },
    vicinity: venue.address,
    postcode: venue.postcode,
    borough: venue.borough,
    lat: venue.latitude,
    lng: venue.longitude,
    phone: venue.phone,
    phone_international: venue.phone,
    website: venue.website || '',
    url: venue.website || `https://maps.google.com/?q=${encodeURIComponent(venue.address)}`,
    opening_hours: {
      open_now: true,
      weekday_text: [
        "Monday: 11:00 AM – 11:00 PM",
        "Tuesday: 11:00 AM – 11:00 PM",
        "Wednesday: 11:00 AM – 11:00 PM",
        "Thursday: 11:00 AM – 11:00 PM",
        "Friday: 11:00 AM – 12:00 AM",
        "Saturday: 11:00 AM – 12:00 AM",
        "Sunday: 11:00 AM – 11:00 PM"
      ]
    },
    // Add fields that might be expected
    formatted_address: venue.address,
    area: venue.area,
    // Map dietary info
    dietaryTags: venue.halal_verified ? ['halal'] : [],
    types: ['restaurant', 'food', 'establishment']
  };
});

console.log(`📝 Transformed ${transformedVenues.length} seed venues\n`);

// Check for duplicates (venues already in main data)
const existingVenueNames = existingVenues.map(v => v.name.toLowerCase());
const newVenues = transformedVenues.filter(v => 
  !existingVenueNames.includes(v.name.toLowerCase())
);

console.log(`✅ Found ${newVenues.length} new venues to add\n`);

// Add new venues to existing data
const updatedVenues = [...existingVenues, ...newVenues];

// Write back to venues.json
fs.writeFileSync(venuesPath, JSON.stringify(updatedVenues, null, 2));
console.log(`✅ Successfully imported ${newVenues.length} venues to data/venues.json`);
console.log(`📊 Total venues: ${updatedVenues.length}`);
console.log(`\n✅ Import complete!`);

