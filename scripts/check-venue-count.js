#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const venuesPath = path.join(__dirname, '..', 'public', 'venues.json');

try {
  const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  console.log('=== VENUES.JSON ANALYSIS ===');
  console.log('Total venues:', data.length);
  
  if (data.length > 0) {
    const sample = data[0];
    console.log('\nSample venue structure:');
    console.log('- Has slug:', !!sample.slug);
    console.log('- Has name:', !!sample.name);
    console.log('- Has rating:', !!sample.rating);
    console.log('- Has address:', !!sample.address);
    console.log('- Has cuisines:', !!sample.cuisines);
    console.log('- Has photos:', !!sample.photos && sample.photos.length > 0);
    console.log('- Has fsaRating:', !!sample.fsaRating);
    console.log('- Has lastVerified:', !!sample.lastVerified);
    
    // Count venues with complete data
    const complete = data.filter(v => 
      v.slug && v.name && v.rating && v.address && 
      v.photos && v.photos.length > 0
    );
    console.log('\nVenues with complete core data:', complete.length);
    
    // Count venues with FSA ratings
    const withFSA = data.filter(v => v.fsaRating);
    console.log('Venues with FSA rating:', withFSA.length);
  }
  
  console.log('\n✓ venues.json is valid JSON and readable');
  process.exit(0);
  
} catch (error) {
  console.error('ERROR reading venues.json:', error.message);
  process.exit(1);
}
