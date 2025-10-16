// Test if venues.json import works
const fs = require('fs');
const path = require('path');

console.log('Testing venues.json import...');

try {
  // Method 1: Direct require
  const venuesPath = path.join(__dirname, 'public', 'venues.json');
  console.log('Path:', venuesPath);
  console.log('Exists:', fs.existsSync(venuesPath));
  
  if (fs.existsSync(venuesPath)) {
    const venues = require('./public/venues.json');
    console.log('✅ Import successful');
    console.log('Venue count:', venues.length);
    console.log('First venue:', venues[0].name);
    
    // Test halal detection
    const { isHalalVenue } = require('./utils/halalStations');
    const halal = isHalalVenue(venues[0]);
    console.log('✅ Halal detection works:', halal);
  }
} catch (err) {
  console.error('❌ Error:', err.message);
  console.error(err.stack);
}
