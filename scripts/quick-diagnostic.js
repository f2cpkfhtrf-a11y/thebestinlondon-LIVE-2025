#!/usr/bin/env node

/**
 * BestOfLondon - FSA Integration Diagnostic (Standalone)
 */

const fs = require('fs');
const path = require('path');

// Find project root by looking for package.json
let projectRoot = __dirname;
while (projectRoot !== '/' && !fs.existsSync(path.join(projectRoot, 'package.json'))) {
  projectRoot = path.dirname(projectRoot);
}

if (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
  console.error('❌ Cannot find project root');
  process.exit(1);
}

console.log('\n🔍 FSA INTEGRATION DIAGNOSTIC\n');
console.log(`📁 Project: ${projectRoot}\n`);

const VENUES_PATH = path.join(projectRoot, 'public/venues.json');

if (!fs.existsSync(VENUES_PATH)) {
  console.error('❌ venues.json not found');
  console.error('   Expected: ' + VENUES_PATH);
  process.exit(1);
}

try {
  const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
  const venues = data.venues || [];
  
  const stats = {
    total: venues.length,
    withFSA: venues.filter(v => v.fsaRating !== null && v.fsaRating !== undefined).length,
    withGoogleRating: venues.filter(v => v.rating > 0).length,
    withPhotos: venues.filter(v => v.photos && v.photos.length > 0).length,
    withWebsite: venues.filter(v => v.website).length,
    fsaCoverage: 0
  };
  
  stats.fsaCoverage = stats.total > 0 ? parseFloat(((stats.withFSA / stats.total) * 100).toFixed(1)) : 0;
  
  console.log('📊 CURRENT STATUS:\n');
  console.log(`   Total Venues: ${stats.total}`);
  console.log(`   FSA Ratings: ${stats.withFSA} (${stats.fsaCoverage}%)`);
  console.log(`   Google Ratings: ${stats.withGoogleRating} (${((stats.withGoogleRating/stats.total)*100).toFixed(1)}%)`);
  console.log(`   Photos: ${stats.withPhotos} (${((stats.withPhotos/stats.total)*100).toFixed(1)}%)`);
  console.log(`   Websites: ${stats.withWebsite} (${((stats.withWebsite/stats.total)*100).toFixed(1)}%)`);
  
  console.log('\n' + (stats.fsaCoverage >= 60 ? '✅' : '⚠️') + ` FSA Coverage: ${stats.fsaCoverage}% (target: 60%+)\n`);
  
  if (stats.fsaCoverage < 60) {
    const needed = Math.ceil((stats.total * 0.6) - stats.withFSA);
    console.log(`📈 Need ${needed} more FSA ratings to reach 60%\n`);
  }
  
  // Sample venues without FSA
  const needsFSA = venues.filter(v => !v.fsaRating && v.address);
  if (needsFSA.length > 0) {
    console.log(`🔍 Sample venues needing FSA (showing first 5):\n`);
    needsFSA.slice(0, 5).forEach((v, i) => {
      console.log(`   ${i+1}. ${v.name}`);
      if (v.address) console.log(`      ${v.address.substring(0, 50)}...`);
    });
    console.log('');
  }
  
  // Write report
  const reportDir = path.join(projectRoot, 'reports');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    stats,
    status: stats.fsaCoverage >= 60 ? 'HEALTHY' : 'NEEDS_REPAIR',
    recommendation: stats.fsaCoverage >= 60 
      ? 'FSA coverage is good' 
      : 'Run repair script to improve FSA coverage'
  };
  
  fs.writeFileSync(
    path.join(reportDir, 'fsa-diagnostic.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('📄 Report saved: reports/fsa-diagnostic.json\n');
  console.log('═'.repeat(60));
  
  // Exit with appropriate code
  process.exit(stats.fsaCoverage >= 60 ? 0 : 1);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
