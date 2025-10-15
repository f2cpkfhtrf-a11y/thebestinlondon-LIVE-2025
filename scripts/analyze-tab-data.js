const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/venues.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('=== DATA ANALYSIS FOR TAB FILTERS ===\n');

// Sample venue structure
console.log('Sample venue fields:');
const sample = data.venues[0];
console.log('  name:', sample.name);
console.log('  rating:', sample.rating);
console.log('  price_range:', sample.price_range);
console.log('  fsa_rating:', sample.fsa_rating);
console.log('  cuisines:', sample.cuisines);
console.log('  types:', sample.types);

// Rating distribution
const ratingRanges = {
  '4.5+': 0,
  '4.0-4.5': 0,
  '3.5-4.0': 0,
  'below 3.5': 0
};

data.venues.forEach(v => {
  if (v.rating >= 4.5) ratingRanges['4.5+']++;
  else if (v.rating >= 4.0) ratingRanges['4.0-4.5']++;
  else if (v.rating >= 3.5) ratingRanges['3.5-4.0']++;
  else ratingRanges['below 3.5']++;
});

console.log('\n=== RATING DISTRIBUTION ===');
Object.entries(ratingRanges).forEach(([range, count]) => {
  console.log(`  ${range}: ${count}`);
});

// Price range distribution
const priceRanges = {};
data.venues.forEach(v => {
  const price = v.price_range || 'unknown';
  priceRanges[price] = (priceRanges[price] || 0) + 1;
});

console.log('\n=== PRICE RANGE DISTRIBUTION ===');
Object.entries(priceRanges).sort((a, b) => b[1] - a[1]).forEach(([price, count]) => {
  console.log(`  ${price}: ${count}`);
});

// FSA ratings
const fsaCount = data.venues.filter(v => v.fsa_rating && v.fsa_rating >= 4).length;
console.log('\n=== FSA RATINGS ===');
console.log(`  4-5 stars (Good hygiene): ${fsaCount}`);

// Check for Michelin indicators
const michelin = data.venues.filter(v => 
  v.name.toLowerCase().includes('michelin') ||
  v.types?.some(t => t.toLowerCase().includes('michelin')) ||
  (v.rating >= 4.7 && v.price_range === '££££')
).length;

console.log('\n=== MICHELIN-LEVEL ===');
console.log(`  Potential Michelin/Fine Dining: ${michelin}`);

console.log('\n=== RECOMMENDATIONS FOR TABS ===');
console.log('✅ Top Rated (4.5+):', ratingRanges['4.5+'], 'venues');
console.log('✅ Fine Dining (4.7+ & ££££):', michelin, 'venues');
console.log('✅ Budget Friendly (£ or ££):', (priceRanges['£'] || 0) + (priceRanges['££'] || 0), 'venues');
console.log('✅ FSA Verified (4-5):', fsaCount, 'venues');
