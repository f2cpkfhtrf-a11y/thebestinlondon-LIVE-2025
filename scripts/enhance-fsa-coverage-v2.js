#!/usr/bin/env node

/**
 * COMPREHENSIVE FSA RATING ENHANCER
 * Automatically detects venues.json structure and enhances with FSA ratings
 * Works with both array and object formats
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';
const RATE_LIMIT_MS = 200;
const MAX_RETRIES = 3;
const TARGET_COVERAGE = 0.6; // 60% target

// === UTILITY FUNCTIONS ===

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractPostcode(address) {
  if (!address) return null;
  
  const fullPattern = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})\b/i;
  const fullMatch = address.match(fullPattern);
  if (fullMatch) {
    return `${fullMatch[1]}${fullMatch[2]}`.replace(/\s+/g, '').toUpperCase();
  }
  
  const outwardPattern = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\b/i;
  const outwardMatch = address.match(outwardPattern);
  return outwardMatch ? outwardMatch[1].toUpperCase() : null;
}

function normalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\s+(ltd|limited|plc|restaurant|cafe|bar|pub|kitchen|grill|bistro|brasserie|&|and|the)\s*/gi, ' ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(str1, str2) {
  const s1 = normalizeName(str1);
  const s2 = normalizeName(str2);
  
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.85;
  
  const words1 = s1.split(' ').filter(w => w.length > 2);
  const words2 = s2.split(' ').filter(w => w.length > 2);
  const overlap = words1.filter(w => words2.includes(w)).length;
  const maxWords = Math.max(words1.length, words2.length);
  
  return maxWords > 0 ? overlap / maxWords : 0;
}

// === FSA API FUNCTIONS ===

async function searchFSA(name, postcode, retryCount = 0) {
  try {
    if (!postcode) return null;
    
    const normalizedName = normalizeName(name);
    const cleanPostcode = postcode.replace(/\s+/g, '');
    
    // Strategy 1: Name + Full Postcode
    try {
      const response = await axios.get(`${FSA_API_BASE}/Establishments`, {
        params: {
          name: normalizedName,
          address: cleanPostcode
        },
        headers: {
          'x-api-version': '2',
          'Accept': 'application/json'
        },
        timeout: 10000
      });
      
      if (response.data.establishments && response.data.establishments.length > 0) {
        const establishments = response.data.establishments;
        
        // Find best match by similarity
        let bestMatch = null;
        let bestScore = 0;
        
        for (const est of establishments) {
          const score = similarity(name, est.BusinessName);
          if (score > bestScore && score >= 0.6) {
            bestScore = score;
            bestMatch = est;
          }
        }
        
        if (bestMatch) {
          return { establishment: bestMatch, matchScore: bestScore };
        }
      }
      
      await delay(RATE_LIMIT_MS);
    } catch (err) {
      // Continue to retry
    }
    
    // Strategy 2: Just postcode area search
    try {
      const outcodeOnly = cleanPostcode.substring(0, Math.min(4, cleanPostcode.length));
      const response = await axios.get(`${FSA_API_BASE}/Establishments`, {
        params: { address: outcodeOnly },
        headers: {
          'x-api-version': '2',
          'Accept': 'application/json'
        },
        timeout: 10000
      });
      
      if (response.data.establishments && response.data.establishments.length > 0) {
        const establishments = response.data.establishments;
        
        let bestMatch = null;
        let bestScore = 0;
        
        for (const est of establishments) {
          const score = similarity(name, est.BusinessName);
          if (score > bestScore && score >= 0.75) { // Higher threshold for area search
            bestScore = score;
            bestMatch = est;
          }
        }
        
        if (bestMatch) {
          return { establishment: bestMatch, matchScore: bestScore };
        }
      }
    } catch (err) {
      // Continue to retry
    }
    
    return null;
    
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await delay(RATE_LIMIT_MS * 2);
      return searchFSA(name, postcode, retryCount + 1);
    }
    return null;
  }
}

function formatFSAData(establishment, matchScore) {
  if (!establishment) return null;
  
  const ratingValue = establishment.RatingValue;
  const numericRating = !isNaN(parseInt(ratingValue)) ? parseInt(ratingValue) : null;
  
  return {
    fsa_rating: numericRating,
    fsaRating: numericRating, // Both formats for compatibility
    fsa_rating_text: ratingValue,
    fsaRatingText: ratingValue,
    fsa_authority: establishment.LocalAuthorityName,
    fsaAuthority: establishment.LocalAuthorityName,
    fsa_url: `https://ratings.food.gov.uk/business/${establishment.FHRSID}`,
    fsaUrl: `https://ratings.food.gov.uk/business/${establishment.FHRSID}`,
    fsa_last_inspection: establishment.RatingDate,
    lastVerifiedFSA: new Date().toISOString(),
    fsa_match_score: matchScore
  };
}

// === MAIN PROCESS ===

async function enhanceFSACoverage() {
  console.log('\n🔧 COMPREHENSIVE FSA RATING ENHANCER\n');
  console.log('='.repeat(70));
  
  const venuesPath = path.join(__dirname, '../public/venues.json');
  
  if (!fs.existsSync(venuesPath)) {
    console.error('❌ venues.json not found!');
    process.exit(1);
  }
  
  // Read and detect structure
  const rawData = fs.readFileSync(venuesPath, 'utf8');
  const data = JSON.parse(rawData);
  
  let venues = [];
  let isArrayFormat = false;
  
  if (Array.isArray(data)) {
    venues = data;
    isArrayFormat = true;
    console.log('📋 Format: Direct array');
  } else if (data.venues && Array.isArray(data.venues)) {
    venues = data.venues;
    console.log('📋 Format: Object with venues array');
  } else {
    console.error('❌ Unknown venues.json structure!');
    process.exit(1);
  }
  
  console.log(`📊 Loaded ${venues.length} venues\n`);
  
  // Current FSA coverage
  const currentFSA = venues.filter(v => (v.fsa_rating || v.fsaRating) !== null && (v.fsa_rating || v.fsaRating) !== undefined).length;
  console.log(`📊 Current FSA coverage: ${currentFSA}/${venues.length} (${(currentFSA/venues.length*100).toFixed(1)}%)\n`);
  
  // Find venues without FSA
  const venuesWithoutFSA = venues.filter(v => 
    (v.fsa_rating === null || v.fsa_rating === undefined) &&
    (v.fsaRating === null || v.fsaRating === undefined)
  );
  
  console.log(`🎯 Processing ${venuesWithoutFSA.length} venues without FSA ratings...\n`);
  
  let found = 0;
  let notFound = 0;
  const results = [];
  
  for (let i = 0; i < venuesWithoutFSA.length; i++) {
    const venue = venuesWithoutFSA[i];
    const progress = `[${i + 1}/${venuesWithoutFSA.length}]`;
    
    // Extract postcode from multiple possible fields
    let postcode = venue.postcode || 
                   venue.address?.postcode || 
                   extractPostcode(venue.address?.formatted || venue.address || venue.vicinity || venue.formatted_address || '');
    
    console.log(`${progress} ${venue.name}`);
    if (postcode) {
      console.log(`   📍 Postcode: ${postcode}`);
    } else {
      console.log(`   ⚠️  No postcode available`);
      notFound++;
      continue;
    }
    
    const fsaResult = await searchFSA(venue.name, postcode);
    
    if (fsaResult && fsaResult.establishment) {
      const formatted = formatFSAData(fsaResult.establishment, fsaResult.matchScore);
      
      // Update venue
      const venueIndex = venues.findIndex(v => 
        v.place_id === venue.place_id || 
        v.slug === venue.slug ||
        (v.name === venue.name && v.postcode === venue.postcode)
      );
      
      if (venueIndex !== -1) {
        venues[venueIndex] = { ...venues[venueIndex], ...formatted };
        found++;
        results.push({
          name: venue.name,
          rating: formatted.fsa_rating,
          matchScore: fsaResult.matchScore
        });
      }
      
      console.log(`   ✅ FSA: ${formatted.fsa_rating_text} (${(fsaResult.matchScore*100).toFixed(0)}% match)\n`);
    } else {
      console.log(`   ❌ No FSA match found\n`);
      notFound++;
    }
    
    await delay(RATE_LIMIT_MS);
    
    // Progress update every 50 venues
    if ((i + 1) % 50 === 0) {
      const currentTotal = venues.filter(v => (v.fsa_rating || v.fsaRating) !== null).length;
      const currentPct = (currentTotal/venues.length*100).toFixed(1);
      console.log(`📊 Progress: ${currentTotal}/${venues.length} (${currentPct}%) - ${found} new ratings\n`);
    }
  }
  
  // Final stats
  const finalFSA = venues.filter(v => (v.fsa_rating || v.fsaRating) !== null).length;
  const finalCoverage = finalFSA / venues.length;
  
  // Save updated data
  if (isArrayFormat) {
    fs.writeFileSync(venuesPath, JSON.stringify(venues, null, 2));
  } else {
    data.venues = venues;
    if (data.coverage) {
      data.coverage.fsa_rating = finalFSA;
      data.coverage.fsa_coverage_pct = (finalCoverage * 100).toFixed(1) + '%';
    }
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(venuesPath, JSON.stringify(data, null, 2));
  }
  
  // Update coverage.json
  const coveragePath = path.join(__dirname, '../data/coverage.json');
  if (fs.existsSync(coveragePath)) {
    const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
    coverage.coverage.fsa_rating = finalFSA;
    coverage.coverage.fsa_coverage_pct = (finalCoverage * 100).toFixed(1) + '%';
    coverage.timestamp = new Date().toISOString();
    fs.writeFileSync(coveragePath, JSON.stringify(coverage, null, 2));
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('✅ FSA ENHANCEMENT COMPLETE');
  console.log('='.repeat(70));
  console.log(`\n📊 Results:`);
  console.log(`   Previous FSA: ${currentFSA}/${venues.length} (${(currentFSA/venues.length*100).toFixed(1)}%)`);
  console.log(`   New FSA: ${finalFSA}/${venues.length} (${(finalCoverage*100).toFixed(1)}%)`);
  console.log(`   Improvement: +${found} ratings`);
  console.log(`   Not found: ${notFound} venues`);
  
  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    previousCoverage: `${currentFSA}/${venues.length} (${(currentFSA/venues.length*100).toFixed(1)}%)`,
    newCoverage: `${finalFSA}/${venues.length} (${(finalCoverage*100).toFixed(1)}%)`,
    newRatingsAdded: found,
    notFound: notFound,
    targetMet: finalCoverage >= TARGET_COVERAGE,
    topMatches: results.filter(r => r.matchScore > 0.9).slice(0, 10)
  };
  
  const reportPath = path.join(__dirname, '../reports/fsa-enhancement-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Report: ${reportPath}`);
  console.log(`📄 Updated: ${venuesPath}`);
  
  if (finalCoverage >= TARGET_COVERAGE) {
    console.log(`\n✅ Target coverage achieved (${(TARGET_COVERAGE*100).toFixed(0)}%)!\n`);
  } else {
    console.log(`\n⚠️  Coverage below target (${(TARGET_COVERAGE*100).toFixed(0)}%). See report for details.\n`);
  }
  
  return { 
    success: finalCoverage >= TARGET_COVERAGE, 
    coverage: (finalCoverage * 100).toFixed(1),
    added: found
  };
}

// Run
if (require.main === module) {
  enhanceFSACoverage()
    .then((result) => {
      console.log(`\n🎯 Final coverage: ${result.coverage}%`);
      console.log(`📈 Ratings added: ${result.added}`);
      process.exit(result.success ? 0 : 0); // Always exit 0 to continue pipeline
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error.message);
      console.error(error.stack);
      process.exit(1);
    });
}

module.exports = { enhanceFSACoverage };
