const fs = require('fs');
const path = require('path');

const venuesPath = path.join(__dirname, '../public/venues.json');
const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

const internationalCount = venues.filter(v => 
  v.cuisines && v.cuisines.some(c => c.toLowerCase() === 'international')
).length;

console.log(`\n📊 Current "International" venues: ${internationalCount}`);

if (internationalCount > 0) {
  console.log(`\n🔍 Sample "International" venues (first 5):\n`);
  venues
    .filter(v => v.cuisines && v.cuisines.some(c => c.toLowerCase() === 'international'))
    .slice(0, 5)
    .forEach(v => {
      console.log(`   ${v.name}`);
      console.log(`   - Types: ${v.types?.slice(0, 3).join(', ') || 'none'}`);
      console.log(`   - Description: ${(v.description || 'none').substring(0, 80)}...`);
      console.log('');
    });
}

console.log(`✅ Cuisine recategorization status: ${internationalCount === 0 ? 'COMPLETE' : `${internationalCount} remaining`}\n`);
