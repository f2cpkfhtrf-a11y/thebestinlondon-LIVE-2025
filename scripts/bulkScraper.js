const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';

const searches = [
  // Location-based (10)
  'restaurants Shoreditch London',
  'restaurants Soho London',
  'restaurants Camden London',
  'restaurants Brixton London',
  'restaurants Hackney London',
  'restaurants Islington London',
  'restaurants Clapham London',
  'restaurants Canary Wharf London',
  'restaurants Covent Garden London',
  'restaurants Borough London',
  
  // Dietary (7)
  'vegan restaurants London',
  'vegan restaurants Shoreditch',
  'halal restaurants London',
  'halal restaurants Brick Lane',
  'vegetarian restaurants London',
  'gluten free restaurants London',
  'kosher restaurants London',
  
  // Cuisine (8)
  'indian restaurants London',
  'italian restaurants London',
  'chinese restaurants London',
  'japanese restaurants London',
  'turkish restaurants London',
  'mexican restaurants London',
  'thai restaurants London',
  'korean restaurants London',
  
  // Experience (7)
  'fine dining London',
  'cheap eats London',
  'brunch London',
  'rooftop restaurants London',
  'riverside restaurants London',
  'michelin star restaurants London',
  'date night restaurants London'
];

async function searchPlaces(query) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query,
        key: API_KEY,
        type: 'restaurant'
      }
    });
    return response.data.results || [];
  } catch (error) {
    console.error(`❌ Error: ${query} - ${error.message}`);
    return [];
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeAll() {
  console.log('🚀 Starting bulk venue scrape...');
  console.log(`📊 ${searches.length} searches queued\n`);
  
  const allVenues = [];
  const seenPlaceIds = new Set();
  
  for (let i = 0; i < searches.length; i++) {
    const query = searches[i];
    console.log(`[${i + 1}/${searches.length}] ${query}`);
    
    const results = await searchPlaces(query);
    
    let newCount = 0;
    results.forEach(place => {
      if (!seenPlaceIds.has(place.place_id)) {
        seenPlaceIds.add(place.place_id);
        allVenues.push(place);
        newCount++;
      }
    });
    
    console.log(`   ✅ ${results.length} results (${newCount} new) | Total: ${allVenues.length}\n`);
    
    // Rate limit: 1 request per second
    await delay(1100);
  }
  
  // Save
  const outputPath = path.join(__dirname, '../public/venues.json');
  fs.writeFileSync(outputPath, JSON.stringify(allVenues, null, 2));
  
  console.log('\n✅ COMPLETE!');
  console.log(`📁 ${allVenues.length} venues → ${outputPath}`);
}

scrapeAll().catch(console.error);
