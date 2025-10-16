// Quick test to verify venues.json can be imported
const fs = require('fs');
const path = require('path');

const venuesPath = path.join(__dirname, 'public', 'venues.json');

if (!fs.existsSync(venuesPath)) {
  console.error('❌ venues.json NOT FOUND at:', venuesPath);
  process.exit(1);
}

const stats = fs.statSync(venuesPath);
console.log('✅ venues.json exists');
console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

try {
  const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  console.log(`   Venues: ${venues.length}`);
  
  // Check structure
  const first = venues[0];
  console.log(`   Sample venue keys: ${Object.keys(first).join(', ')}`);
  
  // Test halal detection
  const { isHalalVenue } = require('./utils/halalStations');
  const halalCount = venues.filter(v => isHalalVenue(v).isHalal).length;
  console.log(`   Halal venues: ${halalCount}`);
  
  console.log('\n✅ venues.json is valid and ready for build');
} catch (err) {
  console.error('❌ Error reading venues.json:', err.message);
  process.exit(1);
}
