#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const VENUES_PATH = path.join(__dirname, '../public/venues.json');

try {
  console.log('📊 Adding version metadata to venues.json...');
  
  const venuesData = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf8'));
  
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(venuesData))
    .digest('hex')
    .substring(0, 8);
  
  const versionedData = {
    _meta: {
      version: `v${Date.now()}`,
      hash: hash,
      lastUpdated: new Date().toISOString(),
      venueCount: Array.isArray(venuesData) ? venuesData.length : (venuesData.venues?.length || 0)
    },
    venues: Array.isArray(venuesData) ? venuesData : venuesData.venues
  };
  
  fs.writeFileSync(VENUES_PATH, JSON.stringify(versionedData, null, 2));
  
  console.log('✅ Version metadata added:');
  console.log(`   - Version: ${versionedData._meta.version}`);
  console.log(`   - Hash: ${versionedData._meta.hash}`);
  console.log(`   - Venues: ${versionedData._meta.venueCount}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
