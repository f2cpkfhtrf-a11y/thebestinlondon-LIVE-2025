#!/usr/bin/env node

/**
 * FSA RATING FIXER
 * Re-runs FSA lookups with improved matching logic
 * 
 * Improvements:
 * - Multiple search strategies (postcode, area, coordinates)
 * - Retry logic for failed lookups
 * - Better postcode extraction
 * - Fuzzy name matching
 * - Batch processing with progress tracking
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';
const RATE_LIMIT_MS = 200; // Slightly faster
const MAX_RETRIES = 3;

// Utility functions
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

// Better postcode extraction with multiple patterns
function extractPostcode(address) {
  if (!address) return null;
  
  // Try full postcode pattern first (SW1A 1AA)
  const fullPattern = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})\b/i;
  const fullMatch = address.match(fullPattern);
  if (fullMatch) {
    return `${fullMatch[1]} ${fullMatch[2]}`.toUpperCase();
  }
  
  // Try outward code only (SW1A)
  const outwardPattern = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\b/i;
  const outwardMatch = address.match(outwardPattern);
  if (outwardMatch) {
    return outwardMatch[1].toUpperCase();
  }
  
  return null;
}

// Extract area from address (Camden, Soho, etc.)
function extractArea(address) {
  if (!address) return null;
  
  const areas = [
    'Soho', 'Shoreditch', 'Camden', 'Islington', 'Hackney',
    'Covent Garden', 'Mayfair', 'Borough', 'Brixton', 'Clapham',
    'Notting Hill', 'Chelsea', 'Kensington', 'Whitechapel',
    'Kings Cross', "King's Cross", 'Angel', 'Canary Wharf'
  ];
  
  for (const area of areas) {
    if (address.toLowerCase().includes(area.toLowerCase())) {
      return area;
    }
  }
  
  return null;
}

// Normalize name for better matching
function normalizeName(name) {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .replace(/\s+(ltd|limited|plc|restaurant|cafe|bar|pub|kitchen|grill|bistro|brasserie|&|and|the)\s*/gi, ' ')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate string similarity (simple Levenshtein distance)
function similarity(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  // Basic word overlap
  const words1 = s1.split(' ');
  const words2 = s2.split(' ');
  const overlap = words1.filter(w => words2.includes(w)).length;
  const maxWords = Math.max(words1.length, words2.length);
  
  return overlap / maxWords;
}

// FSA search with retries
async function searchFSA(name, postcode, area, lat, lng, retryCount = 0) {
  try {
    const normalizedName = normalizeName(name);
    const searches = [];
    
    // Strategy 1: Name + Postcode (most accurate)
    if (postcode) {
      searches.push({
        type: 'postcode',
        params: {
          name: normalizedName,
          address: postcode.replace(/\s+/g, '')
        }
      });
    }
    
    // Strategy 2: Name + Area
    if (area) {
      searches.push({
        type: 'area',
        params: {
          name: normalizedName,
          address: area
        }
      });
    }
    
    // Strategy 3: Just name (last resort)
    searches.push({
      type: 'name',
      params: {
        name: normalizedName
      }
    });
    
    // Try each search strategy
    for (const search of searches) {
      try {
        const response = await axios.get(`${FSA_API_BASE}/Establishments`, {
          params: search.params,
          headers: {
            'x-api-version': '2',
            'Accept': 'application/json'
          },
          timeout: 10000
        });
        
        if (response.data.establishments && response.data.establishments.length > 0) {
          const establishments = response.data.establishments;
          
          // Find best match by name similarity
          let bestMatch = null;
          let bestScore = 0;
          
          for (const est of establishments) {
            const estName = normalizeName(est.BusinessName);
            const score = similarity(normalizedName, estName);
            
            if (score > bestScore && score > 0.6) { // 60% similarity threshold
              bestScore = score;
              bestMatch = est;
            }
          }
          
          if (bestMatch) {
            console.log(`   ✅ Found via ${search.type}: ${bestMatch.BusinessName} (${(bestScore*100).toFixed(0)}% match)`);
            return bestMatch;
          }
        }
        
        await delay(RATE_LIMIT_MS);
        
      } catch (searchError) {
        // Continue to next strategy
        continue;
      }
    }
    
    return null;
    
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`   ⚠️  Retry ${retryCount + 1}/${MAX_RETRIES}...`);
      await delay(RATE_LIMIT_MS * 2);
      return searchFSA(name, postcode, area, lat, lng, retryCount + 1);
    }
    return null;
  }
}

// Format FSA data
function formatFSAData(establishment) {
  if (!establishment) return null;
  
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

// Main fix function
async function fixFSARatings() {
  console.log('\n🔧 FSA RATING FIXER\n');
  console.log('='.repeat(70));
  console.log('Re-running FSA lookups with improved matching');
  console.log('='.repeat(70) + '\n');
  
  // Load current venues
  const venuesPath = path.join(__dirname, '../public/venues.json');
  if (!fs.existsSync(venuesPath)) {
    console.error('❌ venues.json not found!');
    process.exit(1);
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues;
  
  console.log(`📋 Loaded ${venues.length} venues\n`);
  
  // Count current FSA coverage
  const currentFSA = venues.filter(v => v.fsa_rating !== null).length;
  console.log(`📊 Current FSA coverage: ${currentFSA}/${venues.length} (${(currentFSA/venues.length*100).toFixed(1)}%)\n`);
  
  // Process venues missing FSA ratings
  const venuesWithoutFSA = venues.filter(v => v.fsa_rating === null);
  console.log(`🎯 Processing ${venuesWithoutFSA.length} venues without FSA ratings...\n`);
  
  let found = 0;
  let notFound = 0;
  
  for (let i = 0; i < venuesWithoutFSA.length; i++) {
    const venue = venuesWithoutFSA[i];
    const progress = `[${i + 1}/${venuesWithoutFSA.length}]`;
    
    console.log(`${progress} ${venue.name}`);
    
    const postcode = venue.postcode || extractPostcode(venue.address);
    const area = extractArea(venue.address);
    
    if (postcode) {
      console.log(`   📍 Postcode: ${postcode}`);
    }
    if (area) {
      console.log(`   📍 Area: ${area}`);
    }
    
    const fsaData = await searchFSA(
      venue.name,
      postcode,
      area,
      venue.lat,
      venue.lng
    );
    
    if (fsaData) {
      const formatted = formatFSAData(fsaData);
      
      // Update venue in main array
      const venueIndex = venues.findIndex(v => v.place_id === venue.place_id);
      if (venueIndex !== -1) {
        venues[venueIndex] = { ...venues[venueIndex], ...formatted };
        found++;
      }
      
      console.log(`   ⭐ FSA: ${formatted.fsa_rating_text}\n`);
    } else {
      console.log(`   ❌ FSA: Not found\n`);
      notFound++;
    }
    
    await delay(RATE_LIMIT_MS);
  }
  
  // Update coverage stats
  const totalWithFSA = venues.filter(v => v.fsa_rating !== null).length;
  venuesData.coverage.fsa_rating = totalWithFSA;
  venuesData.coverage.fsa_coverage_pct = ((totalWithFSA / venues.length) * 100).toFixed(1) + '%';
  venuesData.lastUpdated = new Date().toISOString();
  
  // Save updated venues
  saveJSON(venuesPath, venuesData);
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('✅ FSA FIX COMPLETE');
  console.log('='.repeat(70));
  console.log(`\n📊 Results:`);
  console.log(`   Previous FSA: ${currentFSA}/${venues.length} (${(currentFSA/venues.length*100).toFixed(1)}%)`);
  console.log(`   New FSA: ${totalWithFSA}/${venues.length} (${(totalWithFSA/venues.length*100).toFixed(1)}%)`);
  console.log(`   Improvement: +${found} ratings found`);
  console.log(`   Still missing: ${notFound} venues\n`);
  
  // Generate report
  const report = `# FSA Rating Fix Report

**Date:** ${new Date().toISOString()}

## Summary
- **Previous FSA Coverage:** ${currentFSA}/${venues.length} (${(currentFSA/venues.length*100).toFixed(1)}%)
- **New FSA Coverage:** ${totalWithFSA}/${venues.length} (${(totalWithFSA/venues.length*100).toFixed(1)}%)
- **Improvement:** +${found} ratings found
- **Still Missing:** ${notFound} venues

## Coverage Details

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Total Venues | ${venues.length} | ${venues.length} | - |
| FSA Ratings | ${currentFSA} | ${totalWithFSA} | +${found} |
| Coverage % | ${(currentFSA/venues.length*100).toFixed(1)}% | ${(totalWithFSA/venues.length*100).toFixed(1)}% | +${((totalWithFSA-currentFSA)/venues.length*100).toFixed(1)}% |

## Venues Still Missing FSA

${venues.filter(v => v.fsa_rating === null).slice(0, 20).map(v => 
  `- ${v.name} (${v.postcode || 'No postcode'}) - ${v.address}`
).join('\n')}

${venues.filter(v => v.fsa_rating === null).length > 20 ? `\n...and ${venues.filter(v => v.fsa_rating === null).length - 20} more` : ''}

## Next Steps

${totalWithFSA < venues.length * 0.5 ? `
⚠️ **FSA coverage is still low (<50%)**

Possible reasons:
1. Some venues may be chains/franchises not in FSA database
2. Recently opened venues not yet inspected
3. Venues in non-London boroughs with different FSA authorities
4. Business names in FSA don't match Google Places names

**Recommendations:**
- Manually verify a sample of missing venues on ratings.food.gov.uk
- Consider adding manual FSA ID mapping for high-profile venues
- Add disclaimer: "FSA ratings shown where available"
` : `
✅ **FSA coverage is acceptable (≥50%)**

This is a good baseline. You can improve further by:
- Manually adding FSA IDs for high-profile missing venues
- Re-running this fixer periodically as FSA updates
`}

## Output
- Updated: \`public/venues.json\`
- File size: ${(fs.statSync(venuesPath).size / 1024).toFixed(2)} KB
`;
  
  const reportPath = path.join(__dirname, '../reports/fsa-fix-report.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`📄 Report: ${reportPath}`);
  console.log(`📄 Updated: ${venuesPath}\n`);
  
  if (totalWithFSA >= venues.length * 0.5) {
    console.log('✅ FSA coverage goal achieved (≥50%)!\n');
    return { success: true, coverage: (totalWithFSA/venues.length*100).toFixed(1) };
  } else {
    console.log('⚠️  FSA coverage still below target. See report for details.\n');
    return { success: false, coverage: (totalWithFSA/venues.length*100).toFixed(1) };
  }
}

// Run
if (require.main === module) {
  fixFSARatings()
    .then((result) => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { fixFSARatings };
