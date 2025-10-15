// AUTOMATED DATA INTEGRATION SCRIPT
// Fetches venue data from Google Places + FSA and saves to venues.json

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY || 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';
const FSA_API_BASE = 'https://api.ratings.food.gov.uk';

// Search parameters for different categories
const SEARCH_QUERIES = [
  // Restaurants by cuisine
  { query: 'indian restaurant london', category: 'indian', limit: 30 },
  { query: 'italian restaurant london', category: 'italian', limit: 30 },
  { query: 'japanese restaurant london', category: 'japanese', limit: 25 },
  { query: 'chinese restaurant london', category: 'chinese', limit: 25 },
  { query: 'thai restaurant london', category: 'thai', limit: 20 },
  { query: 'turkish restaurant london', category: 'turkish', limit: 20 },
  
  // Dietary
  { query: 'halal restaurant london', category: 'halal', limit: 30 },
  { query: 'vegan restaurant london', category: 'vegan', limit: 25 },
  { query: 'vegetarian restaurant london', category: 'vegetarian', limit: 20 },
  
  // Categories
  { query: 'cafe london', category: 'cafe', limit: 25 },
  { query: 'coffee shop london', category: 'coffee', limit: 25 },
  { query: 'bakery london', category: 'bakery', limit: 20 },
  { query: 'brunch restaurant london', category: 'brunch', limit: 20 },
  { query: 'bar london', category: 'bar', limit: 25 },
  
  // Popular areas
  { query: 'restaurant shoreditch london', category: 'shoreditch', limit: 20 },
  { query: 'restaurant soho london', category: 'soho', limit: 20 },
  { query: 'restaurant camden london', category: 'camden', limit: 15 },
];

// Utility functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizePostcode(address) {
  if (!address) return null;
  const match = address.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/i);
  return match ? `${match[1]} ${match[2]}`.toUpperCase() : null;
}

function extractBorough(address) {
  if (!address) return 'Central London';
  
  const boroughMap = {
    'Shoreditch': 'Hackney', 'Hoxton': 'Hackney', 'Hackney': 'Hackney',
    'Bethnal Green': 'Tower Hamlets', 'Whitechapel': 'Tower Hamlets',
    'Camden': 'Camden', 'Kings Cross': 'Camden',
    'Soho': 'Westminster', 'Covent Garden': 'Westminster', 'Mayfair': 'Westminster',
    'Brixton': 'Lambeth', 'Clapham': 'Lambeth',
    'Islington': 'Islington', 'Angel': 'Islington',
    'Notting Hill': 'Kensington and Chelsea', 'Chelsea': 'Kensington and Chelsea',
    'Borough': 'Southwark', 'Canary Wharf': 'Tower Hamlets',
  };
  
  for (const [area, borough] of Object.entries(boroughMap)) {
    if (address.toLowerCase().includes(area.toLowerCase())) {
      return borough;
    }
  }
  
  return 'Central London';
}

function inferDietaryTags(venue) {
  const text = `${venue.name} ${venue.types?.join(' ')}`.toLowerCase();
  return {
    halal: text.includes('halal'),
    vegan: text.includes('vegan'),
    vegetarian: text.includes('vegetarian'),
    glutenFree: text.includes('gluten free') || text.includes('gluten-free')
  };
}

function generateSlug(name, placeId) {
  const nameSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `${nameSlug}-${placeId.slice(-8)}`;
}

// Google Places API functions
async function searchGooglePlaces(query, location = '51.5074,-0.1278') {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const params = {
      query,
      location,
      radius: 15000,
      key: GOOGLE_API_KEY
    };
    
    const response = await axios.get(url, { params });
    
    if (response.data.status !== 'OK') {
      console.log(`❌ Google search failed for "${query}": ${response.data.status}`);
      return [];
    }
    
    return response.data.results || [];
  } catch (error) {
    console.error(`Error searching Google Places: ${error.message}`);
    return [];
  }
}

async function getPlaceDetails(placeId) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json`;
    const params = {
      place_id: placeId,
      fields: 'name,formatted_address,geometry,rating,user_ratings_total,price_level,opening_hours,website,formatted_phone_number,photos,types',
      key: GOOGLE_API_KEY
    };
    
    const response = await axios.get(url, { params });
    
    if (response.data.status === 'OK') {
      return response.data.result;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching place details: ${error.message}`);
    return null;
  }
}

// FSA API functions
async function searchFSA(name, postcode) {
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
      }
    });
    
    if (response.data.establishments && response.data.establishments.length > 0) {
      return response.data.establishments[0];
    }
    
    return null;
  } catch (error) {
    console.log(`FSA lookup failed for ${name}: ${error.message}`);
    return null;
  }
}

// Main integration function
async function integrateVenueData() {
  console.log('🚀 Starting automated data integration...\n');
  
  const allVenues = new Map(); // Use Map to dedupe by place_id
  let totalSearches = 0;
  let totalVenues = 0;
  let fsaSuccess = 0;
  
  // Execute searches
  for (const search of SEARCH_QUERIES) {
    console.log(`\n🔍 Searching: ${search.query} (limit: ${search.limit})`);
    
    const results = await searchGooglePlaces(search.query);
    console.log(`   Found ${results.length} results`);
    
    totalSearches++;
    
    // Process each result
    for (let i = 0; i < Math.min(results.length, search.limit); i++) {
      const place = results[i];
      
      // Skip if already processed
      if (allVenues.has(place.place_id)) {
        continue;
      }
      
      console.log(`   Processing: ${place.name}...`);
      
      // Get full details
      const details = await getPlaceDetails(place.place_id);
      await delay(100); // Rate limiting
      
      if (!details) continue;
      
      // Extract data
      const postcode = normalizePostcode(details.formatted_address);
      const borough = extractBorough(details.formatted_address);
      const dietaryTags = inferDietaryTags(details);
      const slug = generateSlug(details.name, details.place_id);
      
      // Build venue object
      const venue = {
        place_id: details.place_id,
        slug,
        name: details.name,
        category: search.category,
        
        // Ratings
        rating: details.rating || null,
        user_ratings_total: details.user_ratings_total || 0,
        price_level: details.price_level || null,
        
        // Location
        address: details.formatted_address,
        postcode,
        borough,
        lat: details.geometry?.location?.lat || null,
        lng: details.geometry?.location?.lng || null,
        
        // Contact
        phone: details.formatted_phone_number || null,
        website: details.website || null,
        
        // Hours
        opening_hours: details.opening_hours ? {
          open_now: details.opening_hours.open_now || null,
          weekday_text: details.opening_hours.weekday_text || []
        } : null,
        
        // Types
        types: details.types || [],
        
        // Photos
        photos: details.photos ? details.photos.slice(0, 3).map(photo => ({
          reference: photo.photo_reference,
          width: photo.width,
          height: photo.height,
          attributions: photo.html_attributions || []
        })) : [],
        
        // Dietary
        dietary_tags: dietaryTags,
        
        // FSA (to be filled)
        fsa_rating: null,
        fsa_rating_text: null,
        fsa_authority: null,
        fsa_url: null,
        
        // Timestamps
        lastVerifiedGoogle: new Date().toISOString(),
        lastVerifiedFSA: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Fetch FSA rating if postcode available
      if (postcode) {
        const fsaData = await searchFSA(details.name, postcode);
        await delay(200); // FSA rate limiting
        
        if (fsaData) {
          const ratingValue = fsaData.RatingValue;
          const numericRating = !isNaN(parseInt(ratingValue)) ? parseInt(ratingValue) : null;
          
          venue.fsa_rating = numericRating;
          venue.fsa_rating_text = ratingValue;
          venue.fsa_authority = fsaData.LocalAuthorityName;
          venue.fsa_url = `https://ratings.food.gov.uk/business/${fsaData.FHRSID}`;
          venue.lastVerifiedFSA = new Date().toISOString();
          
          fsaSuccess++;
          console.log(`      ✓ FSA: ${ratingValue}`);
        }
      }
      
      allVenues.set(place.place_id, venue);
      totalVenues++;
    }
    
    console.log(`   ✓ Processed ${Math.min(results.length, search.limit)} venues`);
    
    // Delay between searches
    await delay(500);
  }
  
  // Convert to array
  const venuesArray = Array.from(allVenues.values());
  
  // Add metadata
  const output = {
    lastUpdated: new Date().toISOString(),
    totalVenues: venuesArray.length,
    dataSource: {
      google: 'Google Places API',
      fsa: 'UK Food Standards Agency API'
    },
    coverage: {
      google_rating: venuesArray.filter(v => v.rating).length,
      fsa_rating: venuesArray.filter(v => v.fsa_rating !== null).length,
      photos: venuesArray.filter(v => v.photos.length > 0).length,
      website: venuesArray.filter(v => v.website).length,
      phone: venuesArray.filter(v => v.phone).length
    },
    venues: venuesArray
  };
  
  // Save to file
  const outputPath = path.join(__dirname, '../public/venues.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  
  // Generate report
  console.log('\n\n✅ DATA INTEGRATION COMPLETE\n');
  console.log('=' .repeat(60));
  console.log(`Total Searches: ${totalSearches}`);
  console.log(`Total Venues: ${totalVenues}`);
  console.log(`FSA Ratings Found: ${fsaSuccess} (${Math.round(fsaSuccess/totalVenues*100)}%)`);
  console.log('=' .repeat(60));
  console.log(`\nData saved to: ${outputPath}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
  
  // Save detailed report
  const reportPath = path.join(__dirname, '../logs/data-integration-report.md');
  const report = `# Data Integration Report

**Date:** ${new Date().toISOString()}
**Status:** ✅ Complete

## Summary
- Total Searches: ${totalSearches}
- Total Venues Collected: ${totalVenues}
- FSA Ratings Found: ${fsaSuccess} (${Math.round(fsaSuccess/totalVenues*100)}%)

## Coverage
- Google Ratings: ${output.coverage.google_rating} (${Math.round(output.coverage.google_rating/totalVenues*100)}%)
- FSA Ratings: ${output.coverage.fsa_rating} (${Math.round(output.coverage.fsa_rating/totalVenues*100)}%)
- Photos: ${output.coverage.photos} (${Math.round(output.coverage.photos/totalVenues*100)}%)
- Websites: ${output.coverage.website} (${Math.round(output.coverage.website/totalVenues*100)}%)
- Phone Numbers: ${output.coverage.phone} (${Math.round(output.coverage.phone/totalVenues*100)}%)

## Categories
${SEARCH_QUERIES.map(q => `- ${q.category}: ${venuesArray.filter(v => v.category === q.category).length} venues`).join('\n')}

## Next Steps
1. ✅ Venue data integrated
2. ⏳ Generate static paths for venue pages
3. ⏳ Update sitemaps with new venues
4. ⏳ Verify all internal links
`;
  
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report);
  
  console.log(`\nReport saved to: ${reportPath}`);
  console.log('\n🎉 Ready for next phase!\n');
  
  return output;
}

// Run if called directly
if (require.main === module) {
  integrateVenueData()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { integrateVenueData };
