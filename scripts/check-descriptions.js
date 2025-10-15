const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/venues.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('=== VENUE DESCRIPTION CHECK ===\n');

// Sample 3 venues
const sample = data.venues.slice(0, 3);
sample.forEach((v, i) => {
  console.log(`Venue ${i+1}: ${v.name}`);
  console.log('  Has description:', !!v.description);
  if (v.description) {
    console.log('  Description length:', v.description.length, 'chars');
    console.log('  Preview:', v.description.substring(0, 100) + '...');
  }
  console.log('');
});

// Count venues with descriptions
const withDesc = data.venues.filter(v => v.description && v.description.length > 50).length;
console.log('\n=== SUMMARY ===');
console.log(`Total venues: ${data.venues.length}`);
console.log(`With descriptions (50+ chars): ${withDesc}`);
console.log(`Missing descriptions: ${data.venues.length - withDesc}`);
