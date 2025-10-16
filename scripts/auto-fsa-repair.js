#!/usr/bin/env node

/**
 * AUTONOMOUS FSA DIAGNOSTIC & REPAIR
 * Run from project root: node scripts/auto-fsa-repair.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const VENUES_PATH = path.join(ROOT, 'public/venues.json');
const FSA_CLIENT_PATH = path.join(ROOT, 'utils/fsaClient.js');

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log('🚀 BESTINLONDON - AUTONOMOUS FSA DIAGNOSTIC & REPAIR');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// STEP 1: DIAGNOSE
console.log('STEP 1: DIAGNOSTIC SCAN\n');

if (!fs.existsSync(VENUES_PATH)) {
  console.error('❌ venues.json not found!');
  console.error('   Run: node scripts/run-data-pipeline.js first\n');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
const venues = data.venues || [];

const stats = {
  total: venues.length,
  withFSA: venues.filter(v => v.fsaRating !== null && v.fsaRating !== undefined).length,
  withGoogleRating: venues.filter(v => v.rating > 0).length,
  withPhotos: venues.filter(v => v.photos && v.photos.length > 0).length
};

stats.fsaCoverage = stats.total > 0 ? parseFloat(((stats.withFSA / stats.total) * 100).toFixed(1)) : 0;

console.log('📊 CURRENT DATA QUALITY:\n');
console.log(`   Total Venues: ${stats.total}`);
console.log(`   FSA Ratings: ${stats.withFSA} (${stats.fsaCoverage}%)`);
console.log(`   Google Ratings: ${stats.withGoogleRating} (${((stats.withGoogleRating/stats.total)*100).toFixed(1)}%)`);
console.log(`   Photos: ${stats.withPhotos} (${((stats.withPhotos/stats.total)*100).toFixed(1)}%)\n`);

const needsRepair = stats.fsaCoverage < 60;
const needsFSA = venues.filter(v => !v.fsaRating && v.address);

if (!needsRepair) {
  console.log('✅ FSA COVERAGE IS HEALTHY (≥60%)\n');
  console.log('═══════════════════════════════════════════════════════════════════════\n');
  console.log(`✅ FSA integration repaired — total venues = ${stats.total}, FSA coverage = ${stats.fsaCoverage}%\n`);
  process.exit(0);
}

console.log(`⚠️  FSA COVERAGE BELOW TARGET (${stats.fsaCoverage}% < 60%)`);
console.log(`   ${needsFSA.length} venues need FSA ratings\n`);

// Load FSA client
if (!fs.existsSync(FSA_CLIENT_PATH)) {
  console.error('❌ FSA client not found at:', FSA_CLIENT_PATH);
  process.exit(1);
}

const fsaClient = require(FSA_CLIENT_PATH);

// STEP 2: REPAIR
console.log('STEP 2: FSA REPAIR (250ms rate limit)\n');
console.log('─'.repeat(70) + '\n');

// Helper functions
function extractPostcode(address) {
  if (!address) return null;
  const patterns = [
    /\b([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})\b/i,
    /\b([A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2})\b/i,
    /,\s*([A-Z]{1,2}\d{1,2}[A-Z]?)\b/i
  ];
  for (const pattern of patterns) {
    const match = address.match(pattern);
    if (match) return match[1].replace(/\s+/g, ' ').trim().toUpperCase();
  }
  return null;
}

function cleanVenueName(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^\w\s&-]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b(restaurant|cafe|bar|kitchen|grill|bistro|brasserie)\b/gi, '')
    .trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const repairStats = {
  attempted: 0,
  successful: 0,
  failed: 0
};

// Process venues
(async function repair() {
  for (let i = 0; i < needsFSA.length; i++) {
    const venue = needsFSA[i];
    repairStats.attempted++;
    
    const progress = `[${i + 1}/${needsFSA.length}]`;
    const postcode = extractPostcode(venue.address);
    
    if (!postcode) {
      console.log(`${progress} ⏭️  ${venue.name.substring(0, 40)} - No postcode`);
      repairStats.failed++;
      continue;
    }
    
    try {
      console.log(`${progress} 🔍 ${venue.name.substring(0, 40)} (${postcode})`);
      
      const establishments = await fsaClient.searchEstablishment(venue.name, postcode);
      
      if (!establishments || establishments.length === 0) {
        console.log(`${progress}    ⚠️  No FSA match`);
        repairStats.failed++;
        await sleep(250);
        continue;
      }
      
      // Find best match
      const cleanTarget = cleanVenueName(venue.name);
      let bestMatch = establishments[0];
      let bestScore = 0;
      
      for (const est of establishments) {
        const cleanEst = cleanVenueName(est.BusinessName);
        const targetWords = new Set(cleanTarget.split(' ').filter(w => w.length > 2));
        const estWords = new Set(cleanEst.split(' ').filter(w => w.length > 2));
        const overlap = [...targetWords].filter(w => estWords.has(w)).length;
        const score = overlap / Math.max(targetWords.size, 1);
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = est;
        }
      }
      
      const rating = await fsaClient.getRatingByEstablishmentId(bestMatch.FHRSID);
      
      if (rating) {
        venue.fsaRating = rating.RatingValue;
        venue.fsaRatingText = rating.RatingValue;
        venue.fsaAuthority = rating.LocalAuthorityName;
        venue.fsaUrl = `https://ratings.food.gov.uk/business/${rating.FHRSID}`;
        venue.lastVerifiedFSA = new Date().toISOString();
        
        console.log(`${progress}    ✅ FSA: ${rating.RatingValue} (${bestMatch.BusinessName.substring(0, 30)})`);
        repairStats.successful++;
      } else {
        console.log(`${progress}    ⚠️  Rating unavailable`);
        repairStats.failed++;
      }
      
    } catch (error) {
      console.log(`${progress}    ❌ Error: ${error.message}`);
      repairStats.failed++;
    }
    
    await sleep(250);
  }
  
  // Save updated data
  console.log('\n─'.repeat(70));
  console.log('\n💾 Saving updated venues.json...\n');
  
  data.lastUpdated = new Date().toISOString();
  const finalFSA = venues.filter(v => v.fsaRating !== null && v.fsaRating !== undefined).length;
  const finalCoverage = ((finalFSA / venues.length) * 100).toFixed(1);
  
  if (data.coverage) {
    data.coverage.fsa_rating = finalFSA;
    data.coverage.fsa_coverage_pct = finalCoverage + '%';
  }
  
  fs.writeFileSync(VENUES_PATH, JSON.stringify(data, null, 2));
  
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('\n📊 REPAIR SUMMARY\n');
  console.log(`   Attempted: ${repairStats.attempted}`);
  console.log(`   Successful: ${repairStats.successful} (${((repairStats.successful/repairStats.attempted)*100).toFixed(1)}%)`);
  console.log(`   Failed: ${repairStats.failed}\n`);
  console.log(`   FINAL FSA COVERAGE: ${finalFSA}/${venues.length} (${finalCoverage}%)\n`);
  
  if (parseFloat(finalCoverage) >= 60) {
    console.log('✅ TARGET ACHIEVED (≥60%)');
  } else {
    console.log(`⚠️  Still below target (${finalCoverage}% < 60%)`);
    console.log(`   Need ${Math.ceil((venues.length * 0.6) - finalFSA)} more ratings`);
  }
  
  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log(`\n✅ FSA integration repaired — total venues = ${venues.length}, FSA coverage = ${finalCoverage}%\n`);
  
})().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
