const axios = require('axios');
const fs = require('fs');

const API_KEY = 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';

const searches = [
  { query: 'vegan restaurants london', category: 'vegan' },
  { query: 'vegetarian restaurants london', category: 'vegetarian' },
  { query: 'halal restaurants london', category: 'halal' },
  { query: 'restaurants near london eye', category: 'landmark' },
  { query: 'restaurants canary wharf london', category: 'area' },
  { query: 'gluten free restaurants london', category: 'gluten-free' }
];

async function fetchVenueData() {
  let allVenues = [];
  
  console.log('Starting venue data collection...\n');
  
  for (const search of searches) {
    console.log(`Fetching: ${search.query}...`);
    
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
        params: {
          query: search.query,
          key: API_KEY,
          type: 'restaurant'
        }
      });
      
      if (response.data.results) {
        const venues = response.data.results.map(place => ({
          ...place,
          category: search.category
        }));
        
        allVenues = allVenues.concat(venues);
        console.log(`✓ Found ${venues.length} venues for "${search.query}"`);
      } else {
        console.log(`✗ No results for "${search.query}"`);
      }
      
      // Wait 2 seconds between requests to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`✗ Error fetching ${search.query}:`, error.message);
    }
  }
  
  // Remove duplicates by place_id
  const uniqueVenues = Array.from(
    new Map(allVenues.map(v => [v.place_id, v])).values()
  );
  
  console.log(`\n========================================`);
  console.log(`✓ Total venues fetched: ${allVenues.length}`);
  console.log(`✓ Unique venues: ${uniqueVenues.length}`);
  console.log(`========================================\n`);
  
  // Save to file
  fs.writeFileSync(
    'public/venues.json',
    JSON.stringify(uniqueVenues, null, 2)
  );
  
  console.log('✓ Successfully saved to public/venues.json');
  console.log(`File size: ${(fs.statSync('public/venues.json').size / 1024 / 1024).toFixed(2)} MB`);
}

fetchVenueData().catch(error => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
