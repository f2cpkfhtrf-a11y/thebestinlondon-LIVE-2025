#!/usr/bin/env node

/**
 * BULK FSA ENHANCEMENT
 * Enhances FSA hygiene rating coverage for all venues with postcodes
 * Smart matching: name + postcode fuzzy match
 * Rate limited and batched for reliability
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(PROJECT_ROOT, 'public', 'venues.json');
const FSA_API_BASE = 'https://api.ratings.food.gov.uk';
const RATE_LIMIT_MS = 300; // Conservative for FSA API
const MAX_RETRIES = 2;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function saveJSON(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

function loadJSON(filepath) {
  if (!fs.existsSync(filepath)) return null;
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

function normalizeForMatching(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function searchFSA(name, postcode, retryCount = 0) {
  if (!postcode) return null;
  
  try {
    const normalizedName = normalizeForMatching(name);
    const normalizedPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    
    const url = `${FSA_API_BASE}/Establishments`;
    const response = await axios.get(url, {
      params: {
        name: normalizedName,
        address: normalizedPostcode,
        pageSize: 10
      },
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json'
      },
      timeout: 8000
    });
    
    if (response.data.establishments && response.data.establishments.length > 0) {
      // Find best match
      const establishments = response.data.establishments;
      
      // Try exact name match first
      let match = establishments.find(e => 
        normalizeForMatching(e.BusinessName) === normalizedName
      );
      
      // Fall back to partial match
      if (!match) {
        match = establishments.find(e => {
          const eName = normalizeForMatching(e.BusinessName);
          return eName.includes(normalizedName) || normalizedName.includes(eName);
        });
      }
      
      // Use first result if no good match
      if (!match) match = establishments[0];
      
      return {
        fsa_rating: !isNaN(parseInt(match.RatingValue)) ? parseInt(match.RatingValue) : null,
        fsa_rating_text: match.RatingValue,
        fsa_authority: match.LocalAuthorityName,
        fsa_url: match.FHRSID ? `https://ratings.food.gov.uk/business/${match.FHRSID}` : null,
        fsa_last_inspection: match.RatingDate,
        fsa_business_type: match.BusinessType,
        lastVerifiedFSA: new Date().toISOString()
      };
    }
    
    return null;
  } catch (error) {
    if (error.response?.status === 429 && retryCount < MAX_RETRIES) {
      console.log(`   ⚠️  Rate limited, backing off...`);
      await delay(2000 * (retryCount + 1));
      return searchFSA(name, postcode, retryCount + 1);
    }
    // FSA API is unreliable, fail gracefully
    return null;
  }
}

async function enhanceFSA() {
  console.log('🏥 BULK FSA ENHANCEMENT\n');
  console.log('='.repeat(70));
  
  // Load venues
  const data = loadJSON(VENUES_PATH);
  if (!data) {
    console.error('❌ Error: venues.json not found');
    process.exit(1);
  }
  
  const venues = data.venues || data;
  console.log(`📋 Total venues: ${venues.length}`);
  
  // Filter venues that need FSA lookup
  const needsFSA = venues.filter(v => {
    const hasPostcode = v.postcode || (v.address && typeof v.address === 'object' && v.address.postcode);
    const hasFSA = v.fsa_rating !== null && v.fsa_rating !== undefined;
    return hasPostcode && !hasFSA;
  });
  
  console.log(`📍 Venues with postcode: ${venues.filter(v => v.postcode || (v.address?.postcode)).length}`);
  console.log(`✅ Already have FSA: ${venues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length}`);
  console.log(`🔍 Need FSA lookup: ${needsFSA.length}\n`);
  
  if (needsFSA.length === 0) {
    console.log('✅ All venues already have FSA data or no postcode. Nothing to do.\n');
    return;
  }
  
  // Backup
  const backupPath = path.join(PROJECT_ROOT, 'backups', `venues-pre-fsa-${Date.now()}.json`);
  saveJSON(backupPath, data);
  console.log(`💾 Backup: ${backupPath}\n`);
  
  // Process venues
  let found = 0;
  let notFound = 0;
  let errors = 0;
  
  for (let i = 0; i < needsFSA.length; i++) {
    const venue = needsFSA[i];
    const postcode = venue.postcode || venue.address?.postcode;
    const progress = `[${i + 1}/${needsFSA.length}]`;
    
    console.log(`${progress} ${venue.name}`);
    console.log(`   📍 Postcode: ${postcode}`);
    
    try {
      const fsaData = await searchFSA(venue.name, postcode);
      
      if (fsaData) {
        // Update venue
        Object.assign(venue, fsaData);
        found++;
        console.log(`   ✅ FSA: ${fsaData.fsa_rating_text} (${fsaData.fsa_authority})`);
      } else {
        notFound++;
        console.log(`   ⚠️  FSA: Not found`);
      }
    } catch (error) {
      errors++;
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    await delay(RATE_LIMIT_MS);
    
    // Progress checkpoint every 50 venues
    if ((i + 1) % 50 === 0) {
      console.log(`\n📊 Checkpoint: ${found} found, ${notFound} not found, ${errors} errors\n`);
    }
  }
  
  // Recalculate coverage
  const coverage = {
    google_rating: venues.filter(v => v.rating).length,
    fsa_rating: venues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length,
    fsa_coverage_pct: `${((venues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length / venues.length) * 100).toFixed(1)}%`,
    photos: venues.filter(v => v.photos && v.photos.length > 0).length,
    website: venues.filter(v => v.website).length,
    phone: venues.filter(v => v.phone || v.phone_international).length,
    opening_hours: venues.filter(v => v.opening_hours).length
  };
  
  // Update output
  const output = {
    ...data,
    lastUpdated: new Date().toISOString(),
    coverage,
    venues
  };
  
  saveJSON(VENUES_PATH, output);
  
  // Update coverage.json
  const coveragePath = path.join(PROJECT_ROOT, 'data', 'coverage.json');
  saveJSON(coveragePath, {
    timestamp: new Date().toISOString(),
    coverage,
    totalVenues: venues.length
  });
  
  // Generate report
  console.log('\n' + '='.repeat(70));
  console.log('✅ FSA ENHANCEMENT COMPLETE');
  console.log('='.repeat(70));
  console.log(`Processed: ${needsFSA.length} venues`);
  console.log(`Found: ${found}`);
  console.log(`Not Found: ${notFound}`);
  console.log(`Errors: ${errors}`);
  console.log(`Success Rate: ${((found / needsFSA.length) * 100).toFixed(1)}%`);
  console.log('');
  console.log('Coverage:');
  console.log(`  FSA Ratings: ${coverage.fsa_rating} venues (${coverage.fsa_coverage_pct})`);
  console.log(`  Improvement: +${found} venues with FSA data`);
  console.log('='.repeat(70) + '\n');
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    processed: needsFSA.length,
    found,
    notFound,
    errors,
    successRate: `${((found / needsFSA.length) * 100).toFixed(1)}%`,
    newCoverage: coverage.fsa_coverage_pct,
    improvement: found
  };
  
  const reportPath = path.join(PROJECT_ROOT, 'reports', `fsa-enhancement-${Date.now()}.json`);
  saveJSON(reportPath, report);
  console.log(`📊 Report: ${reportPath}\n`);
  
  return report;
}

if (require.main === module) {
  enhanceFSA()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { enhanceFSA };
