#!/usr/bin/env node
/**
 * VENUE DATA ENHANCEMENT
 * Merges Google Places + FSA data, adds slugs, categories, dietary tags
 * Outputs production-ready venues.json
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';
const INPUT_DIR = path.join(__dirname, '../data/google-raw');
const FSA_CACHE_PATH = path.join(__dirname, '../data/fsa-cache.json');
const OUTPUT_PATH = path.join(__dirname, '../public/venues.json');

// Load or create FSA cache
let fsaCache = {};
if (fs.existsSync(FSA_CACHE_PATH)) {
  try {
    fsaCache = JSON.parse(fs.readFileSync(FSA_CACHE_PATH, 'utf8'));
    console.log(`📦 Loaded FSA cache: ${Object.keys(fsaCache).length} entries`);
  } catch (error) {
    console.log('⚠️  FSA cache corrupted, starting fresh');
  }
}

// Utility functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizePostcode(address) {
  if (!address) return null;
  const match = address.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/i);
  return match ? `${match[1]} ${match[2]}`.toUpperCase() : null;
}

function extractBorough(address, types) {
  if (!address) return null;
  
  const boroughMap = {
    'Shoreditch': 'Hackney',
    'Hoxton': 'Hackney',
    'Hackney': 'Hackney',
    'Dalston': 'Hackney',
    'Bethnal Green': 'Tower Hamlets',
    'Whitechapel': 'Tower Hamlets',
    'Spitalfields': 'Tower Hamlets',
    'Camden': 'Camden',
    'Kings Cross': 'Camden',
    'Kentish Town': 'Camden',
    'Soho': 'Westminster',
    'Covent Garden': 'Westminster',
    'Mayfair': 'Westminster',
    'Marylebone': 'Westminster',
    'Fitzrovia': 'Westminster',
    'Brixton': 'Lambeth',
    'Clapham': 'Lambeth',
    'Stockwell': 'Lambeth',
    'Islington': 'Islington',
    'Angel': 'Islington',
    'Notting Hill': 'Kensington and Chelsea',
    'Chelsea': 'Kensington and Chelsea',
    'Kensington': 'Kensington and Chelsea',
    'Borough': 'Southwark',
    'Bermondsey': 'Southwark',
    'Canary Wharf': 'Tower Hamlets',
    'Greenwich': 'Greenwich',
    'Richmond': 'Richmond upon Thames',
    'Wimbledon': 'Merton',
    'Stratford': 'Newham',
    'Clerkenwell': 'Islington',
  };
  
  for (const [area, borough] of Object.entries(boroughMap)) {
    if (address.includes(area)) {
      return borough;
    }
  }
  
  return 'Central London';
}

function extractArea(address) {
  if (!address) return null;
  
  const areas = [
    'Shoreditch', 'Soho', 'Covent Garden', 'Camden', 'Islington', 'Hackney',
    'Notting Hill', 'Mayfair', 'Chelsea', 'Brixton', 'Clapham', 'Borough',
    'Canary Wharf', 'Kings Cross', 'Clerkenwell', 'Fitzrovia', 'Marylebone',
    'Kensington', 'Greenwich', 'Richmond', 'Hoxton', 'Bethnal Green',
    'Whitechapel', 'Spitalfields', 'Kentish Town', 'Angel', 'Bermondsey',
    'Wimbledon', 'Stratford', 'Dalston', 'Stockwell'
  ];
  
  for (const area of areas) {
    if (address.includes(area)) {
      return area;
    }
  }
  
  // Try postcode prefix
  const match = address.match(/([A-Z]{1,2}\d{1,2})/);
  if (match) {
    const postcodeMap = {
      'E1': 'Whitechapel', 'E2': 'Bethnal Green', 'E8': 'Hackney',
      'E9': 'Hackney', 'E14': 'Canary Wharf', 'E15': 'Stratford',
      'EC1': 'Clerkenwell', 'EC2': 'Shoreditch', 'EC4': 'City of London',
      'N1': 'Islington', 'N5': 'Highbury', 'N7': 'Holloway',
      'NW1': 'Camden', 'NW5': 'Kentish Town',
      'SE1': 'Borough', 'SE10': 'Greenwich', 'SE16': 'Bermondsey',
      'SW1': 'Westminster', 'SW3': 'Chelsea', 'SW9': 'Brixton', 'SW11': 'Clapham',
      'W1': 'Soho', 'W2': 'Paddington', 'W8': 'Kensington', 'W11': 'Notting Hill',
      'WC1': 'Bloomsbury', 'WC2': 'Covent Garden',
    };
    
    const prefix = match[1].toUpperCase();
    if (postcodeMap[prefix]) {
      return postcodeMap[prefix];
    }
  }
  
  return null;
}

function inferCuisine(name, types = []) {
  const text = `${name} ${types.join(' ')}`.toLowerCase();
  
  const cuisineKeywords = {
    'indian': ['indian', 'curry', 'tandoor', 'masala', 'biryani', 'punjabi', 'bengali'],
    'italian': ['italian', 'pizza', 'pasta', 'trattoria', 'osteria', 'ristorante'],
    'japanese': ['japanese', 'sushi', 'ramen', 'izakaya', 'yakitori', 'tempura'],
    'chinese': ['chinese', 'dim sum', 'cantonese', 'szechuan', 'peking'],
    'thai': ['thai', 'pad thai', 'tom yum', 'green curry'],
    'turkish': ['turkish', 'kebab', 'meze', 'mangal'],
    'french': ['french', 'bistro', 'brasserie', 'cafe'],
    'spanish': ['spanish', 'tapas', 'paella', 'iberico'],
    'korean': ['korean', 'bbq', 'kimchi', 'bibimbap'],
    'vietnamese': ['vietnamese', 'pho', 'banh mi'],
    'greek': ['greek', 'souvlaki', 'gyros', 'mezze'],
    'mexican': ['mexican', 'taco', 'burrito', 'tequila'],
    'lebanese': ['lebanese', 'falafel', 'shawarma', 'hummus'],
    'persian': ['persian', 'iranian'],
    'american': ['american', 'burger', 'steak', 'diner'],
  };
  
  for (const [cuisine, keywords] of Object.entries(cuisineKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return cuisine;
    }
  }
  
  // Check Google types
  if (types.includes('meal_takeaway') || types.includes('meal_delivery')) {
    return 'takeaway';
  }
  
  return null;
}

function inferDietaryTags(name, types = []) {
  const text = `${name} ${types.join(' ')}`.toLowerCase();
  
  return {
    halal: text.includes('halal'),
    vegan: text.includes('vegan') || text.includes('plant-based') || text.includes('plant based'),
    vegetarian: text.includes('vegetarian') || text.includes('veggie'),
    gluten_free: text.includes('gluten free') || text.includes('gluten-free') || text.includes('coeliac')
  };
}

function inferCategory(name, types = []) {
  const text = `${name} ${types.join(' ')}`.toLowerCase();
  
  if (types.includes('cafe') || text.includes('cafe') || text.includes('café')) {
    return 'cafe';
  }
  if (types.includes('bakery') || text.includes('bakery') || text.includes('patisserie')) {
    return 'bakery';
  }
  if (types.includes('bar') || text.includes('bar') || text.includes('cocktail')) {
    return 'bar';
  }
  if (text.includes('coffee') || text.includes('espresso')) {
    return 'coffee';
  }
  if (text.includes('brunch') || text.includes('breakfast')) {
    return 'brunch';
  }
  if (text.includes('michelin') || text.includes('fine dining') || text.includes('tasting menu')) {
    return 'fine_dining';
  }
  if (text.includes('rooftop')) {
    return 'rooftop';
  }
  
  return 'restaurant';
}

function generateSlug(name, placeId) {
  const nameSlug = name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 50);
  
  const idSuffix = placeId.slice(-8);
  return `${nameSlug}-${idSuffix}`;
}

// FSA API functions
async function searchFSA(name, postcode) {
  const cacheKey = `${name}|${postcode}`;
  
  // Check cache
  if (fsaCache[cacheKey]) {
    return fsaCache[cacheKey];
  }
  
  try {
    const normalizedName = name.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const normalizedPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    
    const url = `${FSA_API_BASE}/Establishments`;
    const response = await axios.get(url, {
      params: {
        name: normalizedName,
        address: normalizedPostcode
      },
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json'
      },
      timeout: 8000
    });
    
    if (response.data.establishments && response.data.establishments.length > 0) {
      const establishment = response.data.establishments[0];
      
      const fsaData = {
        fhrs_id: establishment.FHRSID,
        rating_value: establishment.RatingValue,
        rating_date: establishment.RatingDate,
        local_authority: establishment.LocalAuthorityName,
        business_type: establishment.BusinessType,
        url: `https://ratings.food.gov.uk/business/${establishment.FHRSID}`,
        fetched_at: new Date().toISOString()
      };
      
      // Cache result
      fsaCache[cacheKey] = fsaData;
      return fsaData;
    }
    
    // Cache negative result
    fsaCache[cacheKey] = null;
    return null;
    
  } catch (error) {
    if (error.code !== 'ECONNABORTED') {
      console.log(`   FSA lookup failed for ${name}: ${error.message}`);
    }
    fsaCache[cacheKey] = null;
    return null;
  }
}

// Main enhancement function
async function enhanceVenues() {
  console.log('🔧 Starting venue data enhancement\n');
  
  // Load Google data
  const consolidatedPath = path.join(INPUT_DIR, '_consolidated.json');
  
  if (!fs.existsSync(consolidatedPath)) {
    console.error('❌ Error: Google data not found. Run fetch-google.js first.');
    process.exit(1);
  }
  
  const googleData = JSON.parse(fs.readFileSync(consolidatedPath, 'utf8'));
  console.log(`📥 Loaded ${googleData.venues.length} venues from Google\n`);
  
  const stats = {
    total: googleData.venues.length,
    enhanced: 0,
    fsaFound: 0,
    fsaFailed: 0,
    categorized: 0,
    slugged: 0
  };
  
  const enhancedVenues = [];
  
  // Process each venue
  for (let i = 0; i < googleData.venues.length; i++) {
    const venue = googleData.venues[i];
    
    if ((i + 1) % 50 === 0) {
      console.log(`   Processed ${i + 1}/${googleData.venues.length}...`);
    }
    
    const postcode = normalizePostcode(venue.formatted_address);
    const area = extractArea(venue.formatted_address);
    const borough = extractBorough(venue.formatted_address, venue.types);
    const cuisine = inferCuisine(venue.name, venue.types);
    const dietaryTags = inferDietaryTags(venue.name, venue.types);
    const category = inferCategory(venue.name, venue.types);
    const slug = generateSlug(venue.name, venue.place_id);
    
    // Enhanced venue object
    const enhanced = {
      // IDs
      place_id: venue.place_id,
      slug,
      
      // Basic Info
      name: venue.name,
      category,
      cuisine,
      
      // Location
      address: venue.formatted_address,
      postcode,
      area,
      borough,
      lat: venue.geometry?.location?.lat || null,
      lng: venue.geometry?.location?.lng || null,
      
      // Ratings
      google: {
        rating: venue.rating || null,
        reviews: venue.user_ratings_total || 0,
        url: `https://www.google.com/maps/place/?q=place_id:${venue.place_id}`
      },
      
      // Pricing
      price_level: venue.price_level || null,
      price_range: venue.price_level ? '£'.repeat(venue.price_level) : '££',
      
      // Contact
      phone: venue.formatted_phone_number || null,
      website: venue.website || null,
      
      // Hours
      opening_hours: venue.opening_hours ? {
        open_now: venue.opening_hours.open_now || null,
        weekday_text: venue.opening_hours.weekday_text || []
      } : null,
      
      // Status
      business_status: venue.business_status || 'OPERATIONAL',
      
      // Types
      types: venue.types || [],
      
      // Photos
      photos: venue.photos ? venue.photos.slice(0, 5).map((photo, idx) => ({
        reference: photo.photo_reference,
        width: photo.width,
        height: photo.height,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY || ''}`,
        attribution: photo.html_attributions ? photo.html_attributions[0] : null,
        is_primary: idx === 0
      })) : [],
      
      // Dietary
      dietary_tags: Object.entries(dietaryTags)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      
      // Reviews
      reviews: venue.reviews ? venue.reviews.slice(0, 3).map(review => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relative_time: review.relative_time_description
      })) : [],
      
      // FSA (to be filled)
      fsa: null,
      
      // Metadata
      search_metadata: venue.search_metadata,
      last_verified: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    stats.enhanced++;
    stats.slugged++;
    if (cuisine || category !== 'restaurant') stats.categorized++;
    
    // Fetch FSA rating if postcode available
    if (postcode) {
      const fsaData = await searchFSA(venue.name, postcode);
      
      if (fsaData) {
        const rating = parseInt(fsaData.rating_value);
        enhanced.fsa = {
          rating: !isNaN(rating) ? rating : null,
          rating_text: fsaData.rating_value,
          rating_date: fsaData.rating_date,
          authority: fsaData.local_authority,
          url: fsaData.url,
          verified_at: fsaData.fetched_at
        };
        stats.fsaFound++;
      } else {
        stats.fsaFailed++;
      }
      
      await delay(250); // FSA rate limiting
    } else {
      stats.fsaFailed++;
    }
    
    enhancedVenues.push(enhanced);
    
    // Save FSA cache periodically
    if ((i + 1) % 100 === 0) {
      fs.writeFileSync(FSA_CACHE_PATH, JSON.stringify(fsaCache, null, 2));
    }
  }
  
  // Save final FSA cache
  fs.writeFileSync(FSA_CACHE_PATH, JSON.stringify(fsaCache, null, 2));
  console.log(`\n💾 Saved FSA cache: ${Object.keys(fsaCache).length} entries`);
  
  // Create output
  const output = {
    last_updated: new Date().toISOString(),
    total_venues: enhancedVenues.length,
    data_sources: {
      google: 'Google Places API',
      fsa: 'UK Food Standards Agency API'
    },
    coverage: {
      google_rating: enhancedVenues.filter(v => v.google.rating).length,
      fsa_rating: enhancedVenues.filter(v => v.fsa?.rating).length,
      photos: enhancedVenues.filter(v => v.photos.length > 0).length,
      website: enhancedVenues.filter(v => v.website).length,
      phone: enhancedVenues.filter(v => v.phone).length,
      categorized: enhancedVenues.filter(v => v.cuisine || v.category !== 'restaurant').length
    },
    venues: enhancedVenues
  };
  
  // Save to public
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  
  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('✅ VENUE ENHANCEMENT COMPLETE');
  console.log('='.repeat(70));
  console.log(`Total Venues: ${stats.total}`);
  console.log(`Enhanced: ${stats.enhanced}`);
  console.log(`FSA Found: ${stats.fsaFound} (${Math.round(stats.fsaFound/stats.total*100)}%)`);
  console.log(`FSA Failed: ${stats.fsaFailed}`);
  console.log(`Categorized: ${stats.categorized} (${Math.round(stats.categorized/stats.total*100)}%)`);
  console.log(`Slugged: ${stats.slugged}`);
  console.log('='.repeat(70));
  console.log(`\nOutput: ${OUTPUT_PATH}`);
  console.log(`File size: ${(fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`\n🎉 Ready for production!\n`);
  
  return output;
}

// Run if called directly
if (require.main === module) {
  enhanceVenues()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { enhanceVenues };
