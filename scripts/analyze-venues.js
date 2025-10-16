#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(PROJECT_ROOT, 'public', 'venues.json');

try {
  console.log('📊 ANALYZING VENUES DATA...\n');
  
  const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf8'));
  
  // Basic stats
  console.log('=== BASIC STATS ===');
  console.log(`Total venues: ${data.length}`);
  
  // FSA coverage
  const withFSA = data.filter(v => v.fsaRating || v.fsa_rating);
  const fsaCoverage = (withFSA.length / data.length * 100).toFixed(1);
  console.log(`Venues with FSA data: ${withFSA.length} (${fsaCoverage}%)`);
  
  // Photos
  const withPhotos = data.filter(v => v.photos && v.photos.length > 0);
  console.log(`Venues with photos: ${withPhotos.length} (${(withPhotos.length/data.length*100).toFixed(1)}%)`);
  
  // Postcodes
  const withPostcode = data.filter(v => v.address && v.address.postcode);
  console.log(`Venues with postcode: ${withPostcode.length} (${(withPostcode.length/data.length*100).toFixed(1)}%)`);
  
  // Ratings
  const withRating = data.filter(v => v.rating && v.rating > 0);
  console.log(`Venues with rating: ${withRating.length} (${(withRating.length/data.length*100).toFixed(1)}%)`);
  
  // Dietary tags
  const withDietary = data.filter(v => v.dietaryTags && v.dietaryTags.length > 0);
  console.log(`Venues with dietary tags: ${withDietary.length} (${(withDietary.length/data.length*100).toFixed(1)}%)`);
  
  // Sample venue
  console.log('\n=== SAMPLE VENUE (first) ===');
  const sample = data[0];
  console.log(JSON.stringify({
    name: sample.name,
    slug: sample.slug,
    rating: sample.rating,
    cuisines: sample.cuisines,
    dietaryTags: sample.dietaryTags,
    fsaRating: sample.fsaRating || sample.fsa_rating,
    hasPhotos: sample.photos?.length || 0,
    address: sample.address,
    lastVerified: sample.lastVerified
  }, null, 2));
  
  // Field completeness
  console.log('\n=== FIELD COMPLETENESS ===');
  const fields = ['name', 'slug', 'rating', 'address', 'photos', 'cuisines', 'website', 'phone'];
  fields.forEach(field => {
    const count = data.filter(v => {
      if (field === 'photos') return v[field] && v[field].length > 0;
      if (field === 'address') return v[field] && v[field].formatted;
      return v[field];
    }).length;
    console.log(`${field}: ${count}/${data.length} (${(count/data.length*100).toFixed(1)}%)`);
  });
  
  // Write summary
  const summary = {
    timestamp: new Date().toISOString(),
    totalVenues: data.length,
    coverage: {
      fsa: fsaCoverage + '%',
      photos: (withPhotos.length/data.length*100).toFixed(1) + '%',
      postcodes: (withPostcode.length/data.length*100).toFixed(1) + '%',
      ratings: (withRating.length/data.length*100).toFixed(1) + '%'
    }
  };
  
  fs.writeFileSync(
    path.join(PROJECT_ROOT, 'reports', 'venue-analysis.json'),
    JSON.stringify(summary, null, 2)
  );
  
  console.log('\n✅ Analysis complete - saved to reports/venue-analysis.json');
  
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
