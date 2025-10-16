#!/usr/bin/env node

/**
 * SAFE FSA REPAIR - With automatic backup and rollback
 * 
 * This version uses the stability layer for safety
 */

const { safeExecute } = require('./stability-layer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(ROOT, 'public/venues.json');
const FSA_API_BASE = 'https://api.ratings.food.gov.uk';

// Helper functions (inline to avoid module issues)
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

async function searchFSA(name, postcode) {
  try {
    const response = await axios.get(`${FSA_API_BASE}/Establishments`, {
      params: { name, address: postcode },
      headers: { 'x-api-version': '2', 'Accept': 'application/json' },
      timeout: 10000
    });
    return response.data.establishments || [];
  } catch (error) {
    return [];
  }
}

async function getFSARating(fhrsid) {
  try {
    const response = await axios.get(`${FSA_API_BASE}/Establishments/${fhrsid}`, {
      headers: { 'x-api-version': '2', 'Accept': 'application/json' },
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

// Main repair function
async function repairFSA() {
  const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
  const venues = data.venues || [];
  
  const needsFSA = venues.filter(v => !v.fsa_rating && v.address);
  
  console.log(`📊 Analysis:`);
  console.log(`   Total venues: ${venues.length}`);
  console.log(`   Need FSA: ${needsFSA.length}\n`);
  
  if (needsFSA.length === 0) {
    console.log('✅ All venues already have FSA ratings!\n');
    return;
  }
  
  console.log('🔄 Starting FSA repair...\n');
  
  const stats = { attempted: 0, successful: 0, failed: 0 };
  
  for (let i = 0; i < needsFSA.length; i++) {
    const venue = needsFSA[i];
    stats.attempted++;
    
    const progress = `[${i + 1}/${needsFSA.length}]`;
    const postcode = extractPostcode(venue.address);
    
    if (!postcode) {
      console.log(`${progress} ⏭️  ${venue.name.substring(0, 40)} - No postcode`);
      stats.failed++;
      continue;
    }
    
    try {
      console.log(`${progress} 🔍 ${venue.name.substring(0, 40)} (${postcode})`);
      
      const establishments = await searchFSA(venue.name, postcode);
      
      if (!establishments || establishments.length === 0) {
        console.log(`${progress}    ⚠️  No match`);
        stats.failed++;
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
      
      const rating = await getFSARating(bestMatch.FHRSID);
      
      if (rating) {
        venue.fsa_rating = rating.RatingValue;
        venue.fsa_rating_text = rating.RatingValue;
        venue.fsa_authority = rating.LocalAuthorityName;
        venue.fsa_url = `https://ratings.food.gov.uk/business/${rating.FHRSID}`;
        venue.lastVerifiedFSA = new Date().toISOString();
        
        console.log(`${progress}    ✅ FSA: ${rating.RatingValue}`);
        stats.successful++;
      } else {
        console.log(`${progress}    ⚠️  No rating`);
        stats.failed++;
      }
      
    } catch (error) {
      console.log(`${progress}    ❌ Error: ${error.message}`);
      stats.failed++;
    }
    
    await sleep(250);
  }
  
  // Save updated data
  console.log('\n💾 Saving changes...\n');
  
  data.lastUpdated = new Date().toISOString();
  const finalFSA = venues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length;
  const finalCoverage = ((finalFSA / venues.length) * 100).toFixed(1);
  
  if (data.coverage) {
    data.coverage.fsa_rating = finalFSA;
    data.coverage.fsa_coverage_pct = finalCoverage + '%';
  }
  
  fs.writeFileSync(VENUES_PATH, JSON.stringify(data, null, 2));
  
  console.log('📊 REPAIR SUMMARY:\n');
  console.log(`   Attempted: ${stats.attempted}`);
  console.log(`   Successful: ${stats.successful} (${((stats.successful/stats.attempted)*100).toFixed(1)}%)`);
  console.log(`   Failed: ${stats.failed}`);
  console.log(`\n   FINAL FSA COVERAGE: ${finalFSA}/${venues.length} (${finalCoverage}%)\n`);
}

// Run with safety layer
if (require.main === module) {
  safeExecute('FSA Repair', repairFSA)
    .then(() => {
      console.log('✅ FSA repair completed successfully!\n');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ FSA repair failed:', error.message);
      process.exit(1);
    });
}

module.exports = { repairFSA };
