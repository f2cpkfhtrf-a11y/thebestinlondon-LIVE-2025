const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/venues.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('Total venues:', data.venues.length);
console.log('\n=== First 3 venues structure ===');
data.venues.slice(0, 3).forEach((v, i) => {
  console.log(`\nVenue ${i+1}: ${v.name}`);
  console.log('  cuisines:', v.cuisines);
  console.log('  types:', v.types);
});

console.log('\n=== Cuisine counting ===');
const cuisineCounts = {};
data.venues.forEach(v => {
  if (v.cuisines && Array.isArray(v.cuisines)) {
    v.cuisines.forEach(cuisine => {
      const lower = cuisine.toLowerCase();
      cuisineCounts[lower] = (cuisineCounts[lower] || 0) + 1;
    });
  }
});

console.log('Cuisine counts:', cuisineCounts);
console.log('\nTop cuisines:');
Object.entries(cuisineCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([cuisine, count]) => {
    console.log(`  ${cuisine}: ${count}`);
  });
