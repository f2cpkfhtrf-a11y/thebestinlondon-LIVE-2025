#!/usr/bin/env node

/**
 * MERGE EXPANSION DATA
 * Safely merges new venues with existing ones, preserving all data
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(PROJECT_ROOT, 'public', 'venues.json');
const EXPANSION_DETAILS_PATH = path.join(PROJECT_ROOT, 'data', 'google-raw', 'expansion-details.json');
const BACKUP_DIR = path.join(PROJECT_ROOT, 'backups');

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

function generateSlug(name, placeId) {
  const nameSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return `${nameSlug}-${placeId.slice(-8)}`;
}

function extractPostcode(address) {
  if (!address) return null;
  const match = address.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/i);
  return match ? `${match[1]} ${match[2]}`.toUpperCase() : null;
}

function extractBorough(address) {
  if (!address) return 'Central London';
  
  const boroughMap = {
    'Whitechapel': 'Tower Hamlets',
    'Bethnal Green': 'Tower Hamlets',
    'Canary Wharf': 'Tower Hamlets',
    'Bow': 'Tower Hamlets',
    'Mile End': 'Tower Hamlets',
    'Ilford': 'Redbridge',
    'Romford': 'Havering',
    'Stratford': 'Newham',
    'West Ham': 'Newham',
    'Maryland': 'Newham',
    'Shoreditch': 'Hackney',
    'Hoxton': 'Hackney',
    'Hackney': 'Hackney',
    'Camden': 'Camden',
    'Soho': 'Westminster',
    'Covent Garden': 'Westminster',
    'Mayfair': 'Westminster',
    'Brixton': 'Lambeth',
    'Islington': 'Islington',
    'Notting Hill': 'Kensington and Chelsea',
    'Borough': 'Southwark',
    'Greenwich': 'Greenwich'
  };
  
  for (const [area, borough] of Object.entries(boroughMap)) {
    if (address.toLowerCase().includes(area.toLowerCase())) {
      return borough;
    }
  }
  
  return 'Central London';
}

function inferCuisines(place) {
  const text = `${place.name} ${place.types.join(' ')} ${place.editorial_summary?.text || ''}`.toLowerCase();
  const cuisines = [];
  
  const cuisineMap = {
    'indian': ['indian', 'curry', 'tandoor', 'biryani'],
    'italian': ['italian', 'pizza', 'pasta', 'trattoria', 'pizzeria'],
    'japanese': ['japanese', 'sushi', 'ramen', 'izakaya'],
    'chinese': ['chinese', 'dim sum', 'cantonese'],
    'thai': ['thai', 'pad thai'],
    'turkish': ['turkish', 'kebab', 'meze'],
    'french': ['french', 'bistro', 'brasserie'],
    'spanish': ['spanish', 'tapas', 'paella'],
    'korean': ['korean', 'kimchi', 'bulgogi'],
    'mexican': ['mexican', 'taco', 'burrito'],
    'mediterranean': ['mediterranean', 'greek', 'lebanese'],
    'british': ['british', 'pub', 'fish and chips'],
    'caribbean': ['caribbean', 'jerk'],
    'vietnamese': ['vietnamese', 'pho'],
    'middle eastern': ['middle eastern', 'shawarma', 'falafel']
  };
  
  for (const [cuisine, keywords] of Object.entries(cuisineMap)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      cuisines.push(cuisine);
    }
  }
  
  return cuisines.length > 0 ? cuisines : ['international'];
}

function inferDietaryTags(place) {
  const text = `${place.name} ${place.types.join(' ')} ${place.editorial_summary?.text || ''}`.toLowerCase();
  const tags = {};
  
  tags.halal = text.includes('halal');
  tags.vegan = text.includes('vegan');
  tags.vegetarian = text.includes('vegetarian') || text.includes('veggie');
  tags.gluten_free = text.includes('gluten free') || text.includes('gluten-free');
  
  return tags;
}

function inferCategories(place, cuisines) {
  const categories = [];
  const text = `${place.name} ${place.types.join(' ')}`.toLowerCase();
  
  if (text.includes('cafe') || text.includes('coffee')) categories.push('cafe');
  if (text.includes('bakery')) categories.push('bakery');
  if (text.includes('bar') || text.includes('pub')) categories.push('bar');
  if (text.includes('restaurant')) categories.push('restaurant');
  if (text.includes('fine dining') || (place.price_level && place.price_level >= 3)) categories.push('fine-dining');
  if (text.includes('brunch') || text.includes('breakfast')) categories.push('brunch');
  
  if (categories.length === 0) {
    categories.push(cuisines.length > 0 ? 'restaurant' : 'venue');
  }
  
  return categories;
}

function transformToVenue(place) {
  const slug = generateSlug(place.name, place.place_id);
  const postcode = extractPostcode(place.formatted_address);
  const borough = extractBorough(place.formatted_address);
  const cuisines = inferCuisines(place);
  const dietary_tags = inferDietaryTags(place);
  const categories = inferCategories(place, cuisines);
  
  return {
    place_id: place.place_id,
    slug,
    name: place.name,
    description: place.editorial_summary?.text || null,
    cuisines,
    categories,
    dietary_tags,
    rating: place.rating || null,
    user_ratings_total: place.user_ratings_total || 0,
    price_level: place.price_level || null,
    price_range: place.price_level ? '£'.repeat(place.price_level) : null,
    address: place.formatted_address,
    postcode,
    borough,
    lat: place.geometry?.location?.lat,
    lng: place.geometry?.location?.lng,
    phone: place.formatted_phone_number || null,
    phone_international: place.international_phone_number || null,
    website: place.website || null,
    url: place.url || null,
    opening_hours: place.opening_hours || null,
    photos: (place.photos || []).slice(0, 5).map(photo => ({
      reference: photo.photo_reference,
      width: photo.width,
      height: photo.height,
      attributions: photo.html_attributions
    })),
    reviews: place.reviews || [],
    types: place.types,
    discoveredBy: place.discoveredBy,
    fsa_rating: null,
    fsa_rating_text: null,
    fsa_authority: null,
    fsa_url: null,
    lastVerifiedGoogle: place.fetched_at,
    lastVerifiedFSA: null,
    createdAt: place.fetched_at,
    updatedAt: new Date().toISOString()
  };
}

async function mergeExpansion() {
  console.log('🔄 MERGING EXPANSION DATA\n');
  console.log('='.repeat(70));
  
  // Load existing venues
  const existingData = loadJSON(VENUES_PATH);
  if (!existingData) {
    console.error('❌ Error: venues.json not found');
    process.exit(1);
  }
  
  const existingVenues = existingData.venues || existingData;
  console.log(`📋 Existing venues: ${existingVenues.length}`);
  
  // Backup existing data
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const backupPath = path.join(BACKUP_DIR, `venues-pre-expansion-${Date.now()}.json`);
  saveJSON(backupPath, existingData);
  console.log(`💾 Backup saved: ${backupPath}`);
  
  // Load expansion details
  const expansionData = loadJSON(EXPANSION_DETAILS_PATH);
  if (!expansionData || !expansionData.places) {
    console.error('❌ Error: expansion-details.json not found. Run fetch-expansion-details.js first.');
    process.exit(1);
  }
  
  console.log(`📋 New places: ${expansionData.places.length}\n`);
  
  // Create place_id map for deduplication
  const existingIds = new Set(existingVenues.map(v => v.place_id));
  
  // Transform and add new venues
  const newVenues = [];
  let added = 0;
  let skipped = 0;
  
  for (const place of expansionData.places) {
    if (existingIds.has(place.place_id)) {
      skipped++;
      console.log(`⏭️  Skipping duplicate: ${place.name}`);
    } else {
      const venue = transformToVenue(place);
      newVenues.push(venue);
      added++;
      console.log(`✅ Adding: ${place.name} (${venue.borough})`);
    }
  }
  
  // Merge
  const mergedVenues = [...existingVenues, ...newVenues];
  
  // Recalculate coverage
  const coverage = {
    google_rating: mergedVenues.filter(v => v.rating).length,
    fsa_rating: mergedVenues.filter(v => v.fsa_rating !== null).length,
    fsa_coverage_pct: `${((mergedVenues.filter(v => v.fsa_rating !== null).length / mergedVenues.length) * 100).toFixed(1)}%`,
    photos: mergedVenues.filter(v => v.photos && v.photos.length > 0).length,
    website: mergedVenues.filter(v => v.website).length,
    phone: mergedVenues.filter(v => v.phone || v.phone_international).length,
    opening_hours: mergedVenues.filter(v => v.opening_hours).length
  };
  
  // Build output
  const output = {
    lastUpdated: new Date().toISOString(),
    totalVenues: mergedVenues.length,
    dataSource: existingData.dataSource || {
      google: 'Google Places API',
      fsa: 'UK Food Standards Agency API'
    },
    coverage,
    venues: mergedVenues
  };
  
  // Save merged venues
  saveJSON(VENUES_PATH, output);
  
  // Update coverage.json
  const coveragePath = path.join(PROJECT_ROOT, 'data', 'coverage.json');
  saveJSON(coveragePath, {
    timestamp: new Date().toISOString(),
    coverage,
    totalVenues: mergedVenues.length,
    byBorough: Object.entries(
      mergedVenues.reduce((acc, v) => {
        acc[v.borough] = (acc[v.borough] || 0) + 1;
        return acc;
      }, {})
    ).map(([borough, count]) => ({ borough, count }))
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ MERGE COMPLETE');
  console.log('='.repeat(70));
  console.log(`Previous total: ${existingVenues.length}`);
  console.log(`New venues added: ${added}`);
  console.log(`Duplicates skipped: ${skipped}`);
  console.log(`New total: ${mergedVenues.length}`);
  console.log('');
  console.log('Coverage:');
  console.log(`  Google Ratings: ${coverage.google_rating} (${(coverage.google_rating/mergedVenues.length*100).toFixed(1)}%)`);
  console.log(`  FSA Ratings: ${coverage.fsa_rating} (${coverage.fsa_coverage_pct})`);
  console.log(`  Photos: ${coverage.photos} (${(coverage.photos/mergedVenues.length*100).toFixed(1)}%)`);
  console.log('='.repeat(70) + '\n');
  
  return { added, skipped, newTotal: mergedVenues.length };
}

if (require.main === module) {
  mergeExpansion()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { mergeExpansion };
