#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔧 Normalizing venues.json structure...\n');

// Read wrapped structure
const wrappedPath = path.join(__dirname, '..', 'public', 'venues.json');
const wrapped = JSON.parse(fs.readFileSync(wrappedPath, 'utf8'));

console.log('Current structure:');
console.log('- Type:', typeof wrapped);
console.log('- Has venues array:', !!wrapped.venues);
console.log('- Total venues:', wrapped.totalVenues || 'N/A');

if (wrapped.venues && Array.isArray(wrapped.venues)) {
  // Backup the wrapped version
  const backupPath = path.join(__dirname, '..', 'data', 'venues-wrapped.json');
  fs.writeFileSync(backupPath, JSON.stringify(wrapped, null, 2));
  console.log('\n✓ Backed up wrapped version to:', backupPath);
  
  // Write flat array for pages
  const flatPath = path.join(__dirname, '..', 'public', 'venues.json');
  fs.writeFileSync(flatPath, JSON.stringify(wrapped.venues, null, 2));
  console.log('✓ Created flat array version:', flatPath);
  console.log('  → Array length:', wrapped.venues.length);
  
  // Also save metadata separately
  const metaPath = path.join(__dirname, '..', 'data', 'venue-metadata.json');
  const metadata = {
    lastUpdated: wrapped.lastUpdated,
    totalVenues: wrapped.totalVenues,
    dataSource: wrapped.dataSource,
    coverage: wrapped.coverage
  };
  fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
  console.log('✓ Saved metadata to:', metaPath);
  
  console.log('\n✅ Normalization complete!');
  console.log('Pages can now read venues.json as a flat array.');
  
} else {
  console.log('\n⚠️  venues.json is already a flat array or has unexpected structure');
  console.log('Current keys:', Object.keys(wrapped).join(', '));
}
