#!/usr/bin/env node
const fs = require('fs');

try {
  const raw = fs.readFileSync('/Users/htanweer/Desktop/thebestinlondon/public/venues.json', 'utf8');
  const data = JSON.parse(raw);
  
  console.log('=== DATA TYPE ANALYSIS ===');
  console.log('Type:', typeof data);
  console.log('Is Array:', Array.isArray(data));
  console.log('Is Object:', typeof data === 'object' && !Array.isArray(data));
  
  if (Array.isArray(data)) {
    console.log('\n✓ Array with', data.length, 'items');
    if (data.length > 0) {
      console.log('\nFirst item keys:', Object.keys(data[0]).slice(0, 10).join(', '));
    }
  } else if (typeof data === 'object') {
    const keys = Object.keys(data);
    console.log('\n✓ Object with keys:', keys.join(', '));
    
    // Check if it has a venues property
    if (data.venues && Array.isArray(data.venues)) {
      console.log('   → Found "venues" array with', data.venues.length, 'items');
    }
    if (data.results && Array.isArray(data.results)) {
      console.log('   → Found "results" array with', data.results.length, 'items');
    }
  }
  
  // Show first 1000 chars
  console.log('\n=== FIRST 1000 CHARS ===');
  console.log(raw.substring(0, 1000));
  
} catch (error) {
  console.error('ERROR:', error.message);
}
