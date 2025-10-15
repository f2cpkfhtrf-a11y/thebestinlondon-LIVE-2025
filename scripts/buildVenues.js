#!/usr/bin/env node

/**
 * VENUE BUILDER
 * Merges Google Places data with FSA hygiene ratings
 * Generates slugs, infers cuisines, adds tags
 * Outputs: public/venues.json + data/coverage.json
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API Configuration
const FSA_API_BASE = 'https://api.ratings.food.gov.uk';
const RATE_LIMIT_MS = 250; // FSA rate limiting (more conservative)

// Utility functions
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

// Generate clean URL slug
function generateSlug(name, placeId) {
  const nameSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return `${nameSlug}-${placeId.slice(-8)}`;
}

// Extract postcode from address
function extractPostcode(address) {
  if (!address) return null;
  const match = address.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/i);
  return match ? `${match[1]} ${match[2]}`.toUpperCase() : null;
}

// Extract borough from address
function extractBorough(address) {
  if (!address) return 'Central London';
  
  const boroughMap = {
    'Shoreditch': 'Hackney',
    'Hoxton': 'Hackney',
    'Hackney': 'Hackney',
    'Bethnal Green': 'Tower Hamlets',
    'Whitechapel': 'Tower Hamlets',
    'Camden': 'Camden',
    'Kings Cross': 'Camden',
    "King's Cross": 'Camden',
    'Soho': 'Westminster',
    'Covent Garden': 'Westminster',
    'Mayfair': 'Westminster',
    'Westminster': 'Westminster',
    'Brixton': 'Lambeth',
    'Clapham': 'Lambeth',
    'Islington': 'Islington',
    'Angel': 'Islington',
    'Notting Hill': 'Kensington and Chelsea',
    'Chelsea': 'Kensington and Chelsea',
    'Borough': 'Southwark',
    'London Bridge': 'Southwark',
    'Canary Wharf': 'Tower Hamlets',
    'Greenwich': 'Greenwich',
    'Stratford': 'Newham'
  };
  
  for (const [area, borough] of Object.entries(boroughMap)) {
    if (address.toLowerCase().includes(area.toLowerCase())) {
      return borough;
    }
  }
  
  return 'Central London';
}

// Infer cuisines from types and name
function inferCuisines(place) {
  const text = `${place.name} ${place.types.join(' ')}`.toLowerCase();
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
    'british': ['british', 'pub', 'fish and chips']
  };
  
  for (const [cuisine, keywords] of Object.entries(cuisineMap)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      cuisines.push(cuisine);
    }
  }
  
  return cuisines.length > 0 ? cuisines : ['international'];
}

// Infer dietary tags
function inferDietaryTags(place) {
  const text = `${place.name} ${place.types.join(' ')} ${place.editorial_summary || ''}`.toLowerCase();
  
  return {
    halal: text.includes('halal'),
    vegan: text.includes('vegan'),
    vegetarian: text.includes('vegetarian') || text.includes('veggie'),
    gluten_free: text.includes('gluten free') || text.includes('gluten-free'),
    organic: text.includes('organic'),
    healthy: text.includes('healthy') || text.includes('health')
  };
}

// Infer venue categories
function inferCategories(place, cuisines) {
  const categories = [];
  const text = `${place.name} ${place.types.join(' ')}`.toLowerCase();
  
  // Primary categories
  if (text.includes('cafe') || text.includes('coffee')) categories.push('cafe');
  if (text.includes('bakery')) categories.push('bakery');
  if (text.includes('bar') || text.includes('pub')) categories.push('bar');
  if (text.includes('restaurant')) categories.push('restaurant');
  if (text.includes('fine dining') || (place.price_level && place.price_level >= 3)) categories.push('fine-dining');
  if (text.includes('brunch') || text.includes('breakfast')) categories.push('brunch');
  if (text.includes('rooftop')) categories.push('rooftop');
  
  // Default if none found
  if (categories.length === 0) {
    if (cuisines.length > 0) {
      categories.push('restaurant');
    } else {
      categories.push('venue');
    }
  }
  
  return categories;
}

// FSA API lookup
async function searchFSA(name, postcode) {
  if (!postcode) return null;
  
  try {
    const normalizedName = name.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const normalizedPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    
    const url = `${FSA_API_BASE}/Establishments`;
    const params = {
      name: normalizedName,
      address: normalizedPostcode
    };
    
    const response = await axios.get(url, {
      params,
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json'
      },
      timeout: 5000
    });
    
    if (response.data.establishments && response.data.establishments.length > 0) {
      return response.data.establishments[0];
    }
    
    return null;
  } catch (error) {
    // FSA API is often unreliable, fail gracefully
    return null;
  }
}

// Main build function
async function buildVenues() {
  console.log('🏗️  VENUE BUILDER\n');
  console.log('=' .repeat(70));
  console.log('Merging Google Places + FSA hygiene data');
  console.log('=' .repeat(70) + '\n');
  
  // Load Google details
  const detailsDir = path.join(__dirname, '../data/google/details');
  const detailsIndex = loadJSON(path.join(detailsDir, '_details-index.json'));
  
  if (!detailsIndex) {
    console.error('❌ Error: Google details not found. Run fetchPlaceDetails.js first.');
    process.exit(1);
  }
  
  console.log(`📋 Found ${detailsIndex.places.length} Google Places\n`);
  
  const venues = [];
  let fsaFound = 0;
  let fsaAttempted = 0;
  
  // Process each place
  for (let i = 0; i < detailsIndex.places.length; i++) {
    const place = detailsIndex.places[i];
    const progress = `[${i + 1}/${detailsIndex.places.length}]`;
    
    console.log(`${progress} Processing: ${place.name}`);
    
    // Generate slug
    const slug = generateSlug(place.name, place.place_id);
    
    // Extract location data
    const postcode = extractPostcode(place.formatted_address);
    const borough = extractBorough(place.formatted_address);
    
    // Infer data
    const cuisines = inferCuisines(place);
    const dietaryTags = inferDietaryTags(place);
    const categories = inferCategories(place, cuisines);
    
    // Build base venue object
    const venue = {
      // IDs & URLs
      place_id: place.place_id,
      slug,
      google_place_url: place.google_place_url,
      
      // Basic Info
      name: place.name,
      description: place.editorial_summary || null,
      
      // Categories & Tags
      cuisines,
      categories,
      dietary_tags: dietaryTags,
      
      // Ratings
      rating: place.rating || null,
      user_ratings_total: place.user_ratings_total || 0,
      price_level: place.price_level || null,
      price_range: place.price_level ? '£'.repeat(place.price_level) : null,
      
      // Location
      address: place.formatted_address,
      vicinity: place.vicinity,
      postcode,
      borough,
      lat: place.lat,
      lng: place.lng,
      
      // Contact
      phone: place.formatted_phone_number || null,
      phone_international: place.international_phone_number || null,
      website: place.website || null,
      url: place.url || null,
      
      // Hours
      opening_hours: place.opening_hours,
      
      // Media
      photos: place.photos.slice(0, 5).map(photo => ({
        reference: photo.photo_reference,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw`,
        width: photo.width,
        height: photo.height,
        attributions: photo.html_attributions
      })),
      
      // Reviews (sample)
      reviews: place.reviews.slice(0, 3),
      
      // Google data
      types: place.types,
      
      // FSA data (to be filled)
      fsa_rating: null,
      fsa_rating_text: null,
      fsa_authority: null,
      fsa_url: null,
      fsa_last_inspection: null,
      
      // Timestamps
      lastVerifiedGoogle: place.fetched_at,
      lastVerifiedFSA: null,
      createdAt: place.fetched_at,
      updatedAt: new Date().toISOString()
    };
    
    // Attempt FSA lookup if postcode available
    if (postcode) {
      console.log(`   🔍 Looking up FSA rating...`);
      fsaAttempted++;
      
      const fsaData = await searchFSA(place.name, postcode);
      await delay(RATE_LIMIT_MS);
      
      if (fsaData) {
        const ratingValue = fsaData.RatingValue;
        const numericRating = !isNaN(parseInt(ratingValue)) ? parseInt(ratingValue) : null;
        
        venue.fsa_rating = numericRating;
        venue.fsa_rating_text = ratingValue;
        venue.fsa_authority = fsaData.LocalAuthorityName;
        venue.fsa_url = `https://ratings.food.gov.uk/business/${fsaData.FHRSID}`;
        venue.fsa_last_inspection = fsaData.RatingDate;
        venue.lastVerifiedFSA = new Date().toISOString();
        
        fsaFound++;
        console.log(`   ✅ FSA: ${ratingValue} (${fsaData.LocalAuthorityName})`);
      } else {
        console.log(`   ⚠️  FSA: Not found`);
      }
    } else {
      console.log(`   ⚠️  No postcode - skipping FSA lookup`);
    }
    
    venues.push(venue);
  }
  
  // Build final output
  const output = {
    lastUpdated: new Date().toISOString(),
    totalVenues: venues.length,
    dataSource: {
      google: 'Google Places API',
      fsa: 'UK Food Standards Agency API'
    },
    coverage: {
      google_rating: venues.filter(v => v.rating).length,
      fsa_rating: venues.filter(v => v.fsa_rating !== null).length,
      fsa_coverage_pct: fsaAttempted > 0 ? ((fsaFound / fsaAttempted) * 100).toFixed(1) + '%' : '0%',
      photos: venues.filter(v => v.photos.length > 0).length,
      website: venues.filter(v => v.website).length,
      phone: venues.filter(v => v.phone).length,
      opening_hours: venues.filter(v => v.opening_hours).length
    },
    venues
  };
  
  // Save venues.json
  const venuesPath = path.join(__dirname, '../public/venues.json');
  saveJSON(venuesPath, output);
  
  // Save coverage.json
  const coveragePath = path.join(__dirname, '../data/coverage.json');
  saveJSON(coveragePath, {
    timestamp: new Date().toISOString(),
    coverage: output.coverage,
    totalVenues: output.totalVenues,
    byCategory: Object.entries(
      venues.reduce((acc, v) => {
        v.categories.forEach(cat => {
          acc[cat] = (acc[cat] || 0) + 1;
        });
        return acc;
      }, {})
    ).map(([category, count]) => ({ category, count })),
    byCuisine: Object.entries(
      venues.reduce((acc, v) => {
        v.cuisines.forEach(cuisine => {
          acc[cuisine] = (acc[cuisine] || 0) + 1;
        });
        return acc;
      }, {})
    ).map(([cuisine, count]) => ({ cuisine, count })),
    byBorough: Object.entries(
      venues.reduce((acc, v) => {
        acc[v.borough] = (acc[v.borough] || 0) + 1;
        return acc;
      }, {})
    ).map(([borough, count]) => ({ borough, count }))
  });
  
  // Summary
  console.log('\n\n' + '='.repeat(70));
  console.log('✅ VENUE BUILD COMPLETE');
  console.log('='.repeat(70));
  console.log(`Total Venues: ${venues.length}`);
  console.log(`FSA Ratings Found: ${fsaFound}/${fsaAttempted} (${fsaAttempted > 0 ? ((fsaFound/fsaAttempted)*100).toFixed(1) : 0}%)`);
  console.log(`Output: ${venuesPath}`);
  console.log('='.repeat(70) + '\n');
  
  console.log('📊 Coverage Summary:');
  console.log(`   Google Ratings: ${output.coverage.google_rating} (${(output.coverage.google_rating/venues.length*100).toFixed(1)}%)`);
  console.log(`   FSA Ratings: ${output.coverage.fsa_rating} (${output.coverage.fsa_coverage_pct})`);
  console.log(`   Photos: ${output.coverage.photos} (${(output.coverage.photos/venues.length*100).toFixed(1)}%)`);
  console.log(`   Websites: ${output.coverage.website} (${(output.coverage.website/venues.length*100).toFixed(1)}%)`);
  console.log(`   Phone Numbers: ${output.coverage.phone} (${(output.coverage.phone/venues.length*100).toFixed(1)}%)\n`);
  
  // Generate report
  const report = `# Venue Build Report

**Date:** ${new Date().toISOString()}

## Summary
- **Total Venues:** ${venues.length}
- **FSA Ratings:** ${fsaFound}/${fsaAttempted} (${fsaAttempted > 0 ? ((fsaFound/fsaAttempted)*100).toFixed(1) : 0}%)

## Coverage

| Metric | Count | Percentage |
|--------|-------|------------|
| Google Ratings | ${output.coverage.google_rating} | ${(output.coverage.google_rating/venues.length*100).toFixed(1)}% |
| FSA Ratings | ${output.coverage.fsa_rating} | ${output.coverage.fsa_coverage_pct} |
| Photos | ${output.coverage.photos} | ${(output.coverage.photos/venues.length*100).toFixed(1)}% |
| Websites | ${output.coverage.website} | ${(output.coverage.website/venues.length*100).toFixed(1)}% |
| Phone Numbers | ${output.coverage.phone} | ${(output.coverage.phone/venues.length*100).toFixed(1)}% |

## Output Files
- \`public/venues.json\` - Final venue data (${(fs.statSync(venuesPath).size / 1024).toFixed(2)} KB)
- \`data/coverage.json\` - Coverage statistics

## Next Steps
1. Update pages to use \`getStaticProps\` from \`venues.json\`
2. Generate venue detail pages with \`getStaticPaths\`
3. Test site with real data
4. Run link verification

## Sample Venues

${venues.slice(0, 5).map(v => `
### ${v.name}
- **Slug:** \`/${v.slug}\`
- **Rating:** ${v.rating || 'N/A'} ⭐ (${v.user_ratings_total} reviews)
- **FSA:** ${v.fsa_rating_text || 'Not found'}
- **Cuisines:** ${v.cuisines.join(', ')}
- **Categories:** ${v.categories.join(', ')}
- **Borough:** ${v.borough}
- **Photos:** ${v.photos.length}
`).join('\n')}
`;
  
  const reportPath = path.join(__dirname, '../reports/build-venues-report.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`📊 Report saved: ${reportPath}`);
  console.log(`📊 Venues saved: ${venuesPath}`);
  console.log(`📊 Coverage saved: ${coveragePath}\n`);
  
  return output;
}

// Run if called directly
if (require.main === module) {
  buildVenues()
    .then(() => {
      console.log('✅ Success! Venues ready for integration.\n');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { buildVenues };
