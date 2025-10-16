#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const venuesPath = path.join(__dirname, '..', 'public', 'venues.json');
let data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

// Handle both flat array and wrapped object
if (!Array.isArray(data)) {
  if (data.venues && Array.isArray(data.venues)) {
    data = data.venues;
  } else {
    console.log('❌ venues.json is not in expected format');
    console.log('Keys found:', Object.keys(data));
    process.exit(1);
  }
}

console.log('=== FSA FIELD NAME CHECK ===\n');
console.log(`Total venues: ${data.length}\n`);

// Get first venue with FSA data
const venueWithFSA = data.find(v => v.fsaRating || v.fsa_rating || v.FSARating);

if (!venueWithFSA) {
  console.log('❌ No venues found with FSA data');
  console.log('\nFirst venue keys:');
  console.log(Object.keys(data[0]).filter(k => k.toLowerCase().includes('fsa')));
  process.exit(1);
}

console.log('✅ Found venue with FSA data:');
console.log('Name:', venueWithFSA.name);
console.log('\nFSA-related fields:');
console.log('- fsaRating:', venueWithFSA.fsaRating);
console.log('- fsa_rating:', venueWithFSA.fsa_rating);
console.log('- FSARating:', venueWithFSA.FSARating);
console.log('- fsaUrl:', venueWithFSA.fsaUrl);
console.log('- fsa_url:', venueWithFSA.fsa_url);

console.log('\nAll FSA-related keys in this venue:');
const fsaKeys = Object.keys(venueWithFSA).filter(k => k.toLowerCase().includes('fsa'));
console.log(fsaKeys);

// Check how many venues have each field
console.log('\n=== FIELD USAGE STATS ===');
const countFsaRating = data.filter(v => v.fsaRating).length;
const countFsa_rating = data.filter(v => v.fsa_rating).length;
const countFSARating = data.filter(v => v.FSARating).length;

console.log(`fsaRating (camelCase): ${countFsaRating} venues`);
console.log(`fsa_rating (snake_case): ${countFsa_rating} venues`);
console.log(`FSARating (PascalCase): ${countFSARating} venues`);

console.log('\n✅ Analysis complete');
