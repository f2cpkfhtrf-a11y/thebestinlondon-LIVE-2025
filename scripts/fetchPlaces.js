#!/usr/bin/env node

/**
 * GOOGLE PLACES TEXT SEARCH
 * Fetches place_ids for venues across London by cuisine, area, and category
 * Outputs: data/google/raw/*.json
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API Configuration
const GOOGLE_API_KEY = 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';
const RATE_LIMIT_MS = 200; // 200ms between requests (gentle rate limiting)

// Search Queries - London Focus
const SEARCH_QUERIES = [
  // Cuisine Types
  { query: 'indian restaurant london', category: 'indian', priority: 'high', limit: 30 },
  { query: 'italian restaurant london', category: 'italian', priority: 'high', limit: 30 },
  { query: 'japanese restaurant london', category: 'japanese', priority: 'high', limit: 25 },
  { query: 'chinese restaurant london', category: 'chinese', priority: 'high', limit: 25 },
  { query: 'thai restaurant london', category: 'thai', priority: 'medium', limit: 20 },
  { query: 'turkish restaurant london', category: 'turkish', priority: 'medium', limit: 20 },
  { query: 'french restaurant london', category: 'french', priority: 'medium', limit: 15 },
  { query: 'spanish restaurant london', category: 'spanish', priority: 'medium', limit: 15 },
  { query: 'korean restaurant london', category: 'korean', priority: 'medium', limit: 15 },
  { query: 'mexican restaurant london', category: 'mexican', priority: 'medium', limit: 15 },
  
  // Dietary & Niche
  { query: 'halal restaurant london', category: 'halal', priority: 'high', limit: 30 },
  { query: 'vegan restaurant london', category: 'vegan', priority: 'high', limit: 25 },
  { query: 'vegetarian restaurant london', category: 'vegetarian', priority: 'medium', limit: 20 },
  { query: 'michelin star restaurant london', category: 'michelin', priority: 'high', limit: 20 },
  { query: 'fine dining restaurant london', category: 'fine-dining', priority: 'medium', limit: 20 },
  
  // Categories
  { query: 'cafe london', category: 'cafe', priority: 'high', limit: 25 },
  { query: 'coffee shop london', category: 'coffee', priority: 'high', limit: 25 },
  { query: 'bakery london', category: 'bakery', priority: 'medium', limit: 20 },
  { query: 'brunch restaurant london', category: 'brunch', priority: 'high', limit: 20 },
  { query: 'breakfast london', category: 'breakfast', priority: 'medium', limit: 15 },
  { query: 'bar london', category: 'bar', priority: 'medium', limit: 25 },
  { query: 'rooftop restaurant london', category: 'rooftop', priority: 'medium', limit: 15 },
  
  // Premium Areas
  { query: 'restaurant soho london', category: 'soho', priority: 'high', limit: 20 },
  { query: 'restaurant shoreditch london', category: 'shoreditch', priority: 'high', limit: 20 },
  { query: 'restaurant mayfair london', category: 'mayfair', priority: 'high', limit: 15 },
  { query: 'restaurant chelsea london', category: 'chelsea', priority: 'high', limit: 15 },
  { query: 'restaurant covent garden london', category: 'covent-garden', priority: 'high', limit: 15 },
  { query: 'restaurant notting hill london', category: 'notting-hill', priority: 'medium', limit: 15 },
  { query: 'restaurant camden london', category: 'camden', priority: 'medium', limit: 15 },
  { query: 'restaurant canary wharf london', category: 'canary-wharf', priority: 'medium', limit: 15 },
];

// Utility: Delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility: Save JSON file
function saveJSON(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// Google Places Text Search
async function textSearch(query, location = '51.5074,-0.1278', radius = 15000) {
  try {
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const params = {
      query,
      location,
      radius,
      key: GOOGLE_API_KEY
    };
    
    const response = await axios.get(url, { params });
    
    if (response.data.status === 'ZERO_RESULTS') {
      return { results: [], status: 'ZERO_RESULTS' };
    }
    
    if (response.data.status !== 'OK') {
      console.error(`   ❌ Search failed: ${response.data.status}`);
      return { results: [], status: response.data.status, error: response.data.error_message };
    }
    
    return {
      results: response.data.results || [],
      status: 'OK',
      next_page_token: response.data.next_page_token || null
    };
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { results: [], status: 'ERROR', error: error.message };
  }
}

// Main execution
async function fetchAllPlaces() {
  console.log('🔍 GOOGLE PLACES TEXT SEARCH\n');
  console.log('=' .repeat(70));
  console.log(`API Key: ${GOOGLE_API_KEY.substring(0, 20)}...`);
  console.log(`Rate Limit: ${RATE_LIMIT_MS}ms between requests`);
  console.log(`Total Queries: ${SEARCH_QUERIES.length}`);
  console.log('=' .repeat(70) + '\n');
  
  const allResults = [];
  const placeIdSet = new Set();
  let totalPlaces = 0;
  let totalQueries = 0;
  
  for (const searchConfig of SEARCH_QUERIES) {
    console.log(`\n📍 Query: "${searchConfig.query}"`);
    console.log(`   Category: ${searchConfig.category} | Priority: ${searchConfig.priority} | Limit: ${searchConfig.limit}`);
    
    const result = await textSearch(searchConfig.query);
    totalQueries++;
    
    if (result.status !== 'OK') {
      console.log(`   ⚠️  Status: ${result.status}`);
      continue;
    }
    
    console.log(`   ✅ Found ${result.results.length} results`);
    
    // Process results
    const processedResults = [];
    for (const place of result.results.slice(0, searchConfig.limit)) {
      if (!placeIdSet.has(place.place_id)) {
        placeIdSet.add(place.place_id);
        
        processedResults.push({
          place_id: place.place_id,
          name: place.name,
          category: searchConfig.category,
          priority: searchConfig.priority,
          rating: place.rating || null,
          user_ratings_total: place.user_ratings_total || 0,
          formatted_address: place.formatted_address || null,
          types: place.types || [],
          geometry: place.geometry || null,
          fetched_at: new Date().toISOString(),
          query_used: searchConfig.query
        });
        
        totalPlaces++;
      }
    }
    
    console.log(`   ✓ ${processedResults.length} new places (${placeIdSet.size} total unique)`);
    
    allResults.push({
      query: searchConfig.query,
      category: searchConfig.category,
      priority: searchConfig.priority,
      results: processedResults,
      count: processedResults.length,
      timestamp: new Date().toISOString()
    });
    
    // Save individual category file
    const filename = `${searchConfig.category}.json`;
    const filepath = path.join(__dirname, '../data/google/raw', filename);
    saveJSON(filepath, {
      category: searchConfig.category,
      query: searchConfig.query,
      count: processedResults.length,
      results: processedResults,
      fetched_at: new Date().toISOString()
    });
    
    // Rate limiting
    await delay(RATE_LIMIT_MS);
  }
  
  // Save master index
  const masterIndex = {
    fetched_at: new Date().toISOString(),
    total_queries: totalQueries,
    total_unique_places: placeIdSet.size,
    total_results: totalPlaces,
    categories: allResults.map(r => ({
      category: r.category,
      query: r.query,
      count: r.count,
      filename: `${r.category}.json`
    })),
    place_ids: Array.from(placeIdSet)
  };
  
  const masterPath = path.join(__dirname, '../data/google/raw/_index.json');
  saveJSON(masterPath, masterIndex);
  
  // Generate summary report
  console.log('\n\n' + '='.repeat(70));
  console.log('✅ FETCH COMPLETE');
  console.log('='.repeat(70));
  console.log(`Total Queries Executed: ${totalQueries}`);
  console.log(`Total Unique Places Found: ${placeIdSet.size}`);
  console.log(`Output Directory: data/google/raw/`);
  console.log(`Files Created: ${totalQueries + 1} (${totalQueries} categories + 1 index)`);
  console.log('='.repeat(70) + '\n');
  
  // Generate markdown report
  const report = `# Google Places Fetch Report

**Date:** ${new Date().toISOString()}

## Summary
- **Total Queries:** ${totalQueries}
- **Unique Places Found:** ${placeIdSet.size}
- **Output Directory:** \`data/google/raw/\`

## Categories

${allResults.map(r => `- **${r.category}** (${r.priority} priority): ${r.count} places`).join('\n')}

## Top Places by Category

${allResults.slice(0, 5).map(r => `
### ${r.category} (${r.count} places)
${r.results.slice(0, 3).map(p => `- ${p.name} (${p.rating || 'N/A'} ⭐, ${p.user_ratings_total} reviews)`).join('\n')}
`).join('\n')}

## Next Steps
1. Run \`fetchPlaceDetails.js\` to get full venue details
2. Run \`buildVenues.js\` to merge with FSA data

## Files Created
- \`data/google/raw/_index.json\` - Master index of all place_ids
${allResults.map(r => `- \`data/google/raw/${r.category}.json\` - ${r.count} places`).join('\n')}
`;
  
  const reportPath = path.join(__dirname, '../reports/fetch-places-report.md');
  saveJSON(reportPath.replace('.md', '.json'), masterIndex);
  fs.writeFileSync(reportPath, report);
  
  console.log(`📊 Report saved: ${reportPath}`);
  console.log(`📊 Index saved: ${masterPath}\n`);
  
  return masterIndex;
}

// Run if called directly
if (require.main === module) {
  fetchAllPlaces()
    .then(() => {
      console.log('✅ Success! Ready for next phase: fetchPlaceDetails.js\n');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { fetchAllPlaces };
