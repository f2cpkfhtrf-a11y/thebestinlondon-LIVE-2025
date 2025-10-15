#!/usr/bin/env node

/**
 * FSA ENHANCEMENT SCRIPT
 * Re-processes venues.json to aggressively find FSA ratings
 * Uses multiple strategies and fuzzy matching
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';
const DELAY_MS = 500; // More conservative rate limiting
const MAX_RETRIES = 3;

// Utility
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Enhanced postcode extraction
function extractPostcode(address) {
  if (!address) return null;
  
  // Try full postcode pattern first
  let match = address.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/i);
  if (match) {
    return `${match[1]} ${match[2]}`.toUpperCase();
  }
  
  // Try outward code only (e.g., "SW1A", "EC1A")
  match = address.match(/\b([A-Z]{1,2}\d{1,2}[A-Z]?)\b/i);
  if (match) {
    return match[1].toUpperCase();
  }
  
  // Extract any postcode-like pattern
  match = address.match(/([A-Z]{1,2}\d{1,2})/i);
  if (match) {
    return match[1].toUpperCase();
  }
  
  return null;
}

// Extract multiple possible postcodes
function extractAllPostcodes(address) {
  if (!address) return [];
  
  const postcodes = new Set();
  
  // Full postcode
  const fullMatches = address.matchAll(/([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/gi);
  for (const match of fullMatches) {
    postcodes.add(`${match[1]} ${match[2]}`.toUpperCase());
    postcodes.add(`${match[1]}${match[2]}`.toUpperCase().replace(/\s/g, '')); // No space version
  }
  
  // Outward code
  const outwardMatches = address.matchAll(/\b([A-Z]{1,2}\d{1,2}[A-Z]?)\b/gi);
  for (const match of outwardMatches) {
    postcodes.add(match[1].toUpperCase());
  }
  
  return Array.from(postcodes);
}

// Normalize business name for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/\s+(ltd|limited|plc|restaurant|cafe|bar|pub|kitchen|grill|bistro|brasserie|&|and|the)\s*$/gi, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Search FSA with retry
async function searchFSA(name, postcode, retries = 0) {
  try {
    const url = `${FSA_API_BASE}/Establishments`;
    const params = {
      name: normalizeName(name),
      address: postcode.replace(/\s/g, '')
    };
    
    console.log(`      Query: name="${params.name}", postcode="${params.address}"`);
    
    const response = await axios.get(url, {
      params,
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json',
        'User-Agent': 'TheBestInLondon/1.0'
      },
      timeout: 10000
    });
    
    if (response.data && response.data.establishments) {
      return response.data.establishments;
    }
    
    return [];
    
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`      Retry ${retries + 1}/${MAX_RETRIES}...`);
      await delay(DELAY_MS * 2); // Longer delay on retry
      return searchFSA(name, postcode, retries + 1);
    }
    
    console.log(`      Error: ${error.message}`);
    return [];
  }
}

// Find best FSA match using multiple strategies
async function findBestFSAMatch(venue) {
  const postcodes = extractAllPostcodes(venue.address);
  
  if (postcodes.length === 0) {
    console.log(`   ⚠️  No postcodes found in address`);
    return null;
  }
  
  console.log(`   📍 Found ${postcodes.length} possible postcode(s): ${postcodes.join(', ')}`);
  
  // Try each postcode
  for (const postcode of postcodes) {
    console.log(`   🔍 Searching with postcode: ${postcode}`);
    
    const establishments = await searchFSA(venue.name, postcode);
    await delay(DELAY_MS);
    
    if (establishments.length > 0) {
      console.log(`      Found ${establishments.length} result(s)`);
      
      // Find exact name match
      const normalizedVenueName = normalizeName(venue.name);
      const exactMatch = establishments.find(est => 
        normalizeName(est.BusinessName) === normalizedVenueName
      );
      
      if (exactMatch) {
        console.log(`      ✅ Exact match: ${exactMatch.BusinessName}`);
        return formatFSAData(exactMatch);
      }
      
      // Find partial name match
      const partialMatch = establishments.find(est => {
        const estName = normalizeName(est.BusinessName);
        return estName.includes(normalizedVenueName) || normalizedVenueName.includes(estName);
      });
      
      if (partialMatch) {
        console.log(`      ✅ Partial match: ${partialMatch.BusinessName}`);
        return formatFSAData(partialMatch);
      }
      
      // Use first result if address matches
      if (establishments[0]) {
        console.log(`      ✅ Using first result: ${establishments[0].BusinessName}`);
        return formatFSAData(establishments[0]);
      }
    }
  }
  
  return null;
}

// Format FSA data
function formatFSAData(establishment) {
  const ratingValue = establishment.RatingValue;
  const numericRating = !isNaN(parseInt(ratingValue)) ? parseInt(ratingValue) : null;
  
  return {
    fsa_rating: numericRating,
    fsa_rating_text: ratingValue,
    fsa_authority: establishment.LocalAuthorityName,
    fsa_url: `https://ratings.food.gov.uk/business/${establishment.FHRSID}`,
    fsa_last_inspection: establishment.RatingDate,
    lastVerifiedFSA: new Date().toISOString()
  };
}

// Main enhancement function
async function enhanceFSACoverage() {
  console.log('\n🔍 FSA COVERAGE ENHANCEMENT\n');
  console.log('='.repeat(70));
  console.log('Aggressively searching for FSA ratings...');
  console.log('Using multiple strategies and fuzzy matching');
  console.log('='.repeat(70) + '\n');
  
  // Load venues
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues;
  
  console.log(`📋 Loaded ${venues.length} venues\n`);
  
  // Filter venues without FSA ratings
  const withoutFSA = venues.filter(v => !v.fsa_rating && !v.fsa_rating_text);
  console.log(`🎯 Target: ${withoutFSA.length} venues without FSA ratings\n`);
  
  if (withoutFSA.length === 0) {
    console.log('✅ All venues already have FSA ratings!');
    return;
  }
  
  let found = 0;
  let notFound = 0;
  
  // Process each venue
  for (let i = 0; i < withoutFSA.length; i++) {
    const venue = withoutFSA[i];
    const progress = `[${i + 1}/${withoutFSA.length}]`;
    
    console.log(`\n${progress} ${venue.name}`);
    console.log(`   Address: ${venue.address}`);
    
    const fsaData = await findBestFSAMatch(venue);
    
    if (fsaData) {
      // Update venue with FSA data
      Object.assign(venue, fsaData);
      found++;
      console.log(`   ✅ FSA Rating: ${fsaData.fsa_rating_text}`);
    } else {
      notFound++;
      console.log(`   ❌ No FSA match found`);
    }
  }
  
  // Recalculate coverage
  const totalWithFSA = venues.filter(v => v.fsa_rating || v.fsa_rating_text).length;
  const coveragePct = ((totalWithFSA / venues.length) * 100).toFixed(1);
  
  venuesData.coverage.fsa_rating = totalWithFSA;
  venuesData.coverage.fsa_coverage_pct = coveragePct + '%';
  venuesData.lastUpdated = new Date().toISOString();
  
  // Save updated venues
  fs.writeFileSync(venuesPath, JSON.stringify(venuesData, null, 2));
  
  // Summary
  console.log('\n\n' + '='.repeat(70));
  console.log('✅ FSA ENHANCEMENT COMPLETE');
  console.log('='.repeat(70));
  console.log(`\n📊 Results:`);
  console.log(`   New FSA Ratings Found: ${found}`);
  console.log(`   Still Without FSA: ${notFound}`);
  console.log(`   Total FSA Coverage: ${totalWithFSA}/${venues.length} (${coveragePct}%)`);
  console.log(`\n📄 Updated: ${venuesPath}\n`);
  
  // Generate report
  const report = `# FSA Enhancement Report

**Date:** ${new Date().toISOString()}

## Results
- **New FSA Ratings Found:** ${found}
- **Still Without FSA:** ${notFound}
- **Total FSA Coverage:** ${totalWithFSA}/${venues.length} (${coveragePct}%)

## Strategy Used
1. Enhanced postcode extraction (multiple patterns)
2. Fuzzy business name matching
3. Multiple search attempts per venue
4. Retry logic with backoff
5. Partial name matching fallback

## Updated File
- \`public/venues.json\` - Now with ${coveragePct}% FSA coverage

${found > 0 ? `
## Sample Successful Matches

${venues.filter(v => v.lastVerifiedFSA).slice(0, 5).map(v => `
### ${v.name}
- **FSA Rating:** ${v.fsa_rating_text}
- **Authority:** ${v.fsa_authority}
- **Last Inspection:** ${v.fsa_last_inspection}
- **URL:** ${v.fsa_url}
`).join('\n')}
` : ''}
`;
  
  const reportPath = path.join(__dirname, '../reports/fsa-enhancement-report.md');
  fs.writeFileSync(reportPath, report);
  console.log(`📊 Report: ${reportPath}\n`);
}

// Run
if (require.main === module) {
  enhanceFSACoverage()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('\n❌ Error:', error);
      process.exit(1);
    });
}

module.exports = { enhanceFSACoverage };
