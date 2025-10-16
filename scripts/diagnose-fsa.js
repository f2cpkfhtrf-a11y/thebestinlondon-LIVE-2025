#!/usr/bin/env node

/**
 * BestOfLondon - FSA Integration Diagnostic
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 FSA INTEGRATION DIAGNOSTIC\n');

const VENUES_PATH = path.join(__dirname, '../public/venues.json');

try {
  const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
  const venues = data.venues || [];
  
  const stats = {
    total: venues.length,
    withFSA: venues.filter(v => v.fsaRating !== null && v.fsaRating !== undefined).length,
    withGoogleRating: venues.filter(v => v.rating > 0).length,
    withPhotos: venues.filter(v => v.photos && v.photos.length > 0).length,
    withWebsite: venues.filter(v => v.website).length
  };
  
  const fsaCoverage = stats.total > 0 ? ((stats.withFSA / stats.total) * 100).toFixed(1) : 0;
  
  console.log('📊 CURRENT STATUS:\n');
  console.log(`   Total Venues: ${stats.total}`);
  console.log(`   FSA Ratings: ${stats.withFSA} (${fsaCoverage}%)`);
  console.log(`   Google Ratings: ${stats.withGoogleRating} (${((stats.withGoogleRating/stats.total)*100).toFixed(1)}%)`);
  console.log(`   Photos: ${stats.withPhotos} (${((stats.withPhotos/stats.total)*100).toFixed(1)}%)`);
  console.log(`   Websites: ${stats.withWebsite} (${((stats.withWebsite/stats.total)*100).toFixed(1)}%)`);
  
  console.log('\n' + (parseFloat(fsaCoverage) >= 60 ? '✅' : '⚠️') + ` FSA Coverage: ${fsaCoverage}% (target: 60%+)\n`);
  
  // Output JSON for parsing
  console.log('JSON_OUTPUT:' + JSON.stringify(stats));
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
