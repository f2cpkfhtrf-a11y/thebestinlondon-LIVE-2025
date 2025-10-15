#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const venuesPath = path.join(__dirname, '..', 'public', 'venues.json');

try {
  const raw = fs.readFileSync(venuesPath, 'utf8');
  const data = JSON.parse(raw);
  
  console.log('=== VENUES.JSON ANALYSIS ===');
  console.log('Raw file size:', (raw.length / 1024 / 1024).toFixed(2), 'MB');
  console.log('Data type:', typeof data);
  console.log('Is array:', Array.isArray(data));
  
  if (Array.isArray(data)) {
    console.log('Total venues:', data.length);
    
    if (data.length > 0) {
      const sample = data[0];
      console.log('\nFirst venue keys:', Object.keys(sample).join(', '));
      console.log('\nSample venue:');
      console.log(JSON.stringify(sample, null, 2).substring(0, 500));
      
      // Check completeness
      const withSlug = data.filter(v => v.slug).length;
      const withRating = data.filter(v => v.rating).length;
      const withPhotos = data.filter(v => v.photos && v.photos.length > 0).length;
      const withFSA = data.filter(v => v.fsaRating).length;
      
      console.log('\n=== COMPLETENESS ===');
      console.log('With slug:', withSlug);
      console.log('With rating:', withRating);
      console.log('With photos:', withPhotos);
      console.log('With FSA:', withFSA);
    }
  } else {
    console.log('ERROR: Data is not an array!');
    console.log('Keys:', Object.keys(data));
  }
  
  process.exit(0);
  
} catch (error) {
  console.error('ERROR:', error.message);
  process.exit(1);
}
