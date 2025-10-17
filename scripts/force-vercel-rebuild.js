#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BUILD_TRIGGER_PATH = path.join(__dirname, '../.vercel-build-trigger');
const VENUES_PATH = path.join(__dirname, '../public/venues.json');

try {
  console.log('🔄 Creating Vercel build trigger...');
  
  let venueCount = 0;
  let lastModified = new Date().toISOString();
  
  if (fs.existsSync(VENUES_PATH)) {
    const venuesData = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf8'));
    venueCount = Array.isArray(venuesData) 
      ? venuesData.length 
      : (venuesData.venues?.length || 0);
    
    const stats = fs.statSync(VENUES_PATH);
    lastModified = stats.mtime.toISOString();
  }
  
  const triggerData = {
    timestamp: Date.now(),
    reason: 'data_update',
    venueCount: venueCount,
    venuesLastModified: lastModified,
    buildId: `build-${Date.now()}`,
    message: 'Force rebuild: venues.json updated'
  };
  
  fs.writeFileSync(BUILD_TRIGGER_PATH, JSON.stringify(triggerData, null, 2));
  
  console.log('✅ Build trigger created:');
  console.log(`   - Build ID: ${triggerData.buildId}`);
  console.log(`   - Venue count: ${triggerData.venueCount}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
