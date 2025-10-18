const fs = require('fs');
const path = require('path');

function auditImages() {
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = data.venues || data;
    console.log(`🔍 Auditing images for ${venues.length} venues...`);
    
    const auditResults = {
      totalVenues: venues.length,
      pageTypes: {
        home: { real_ok: 0, low_res: 0, generic: 0, missing: 0 },
        restaurants: { real_ok: 0, low_res: 0, generic: 0, missing: 0 },
        halal: { real_ok: 0, low_res: 0, generic: 0, missing: 0 },
        cuisine: { real_ok: 0, low_res: 0, generic: 0, missing: 0 },
        area: { real_ok: 0, low_res: 0, generic: 0, missing: 0 },
        detail: { real_ok: 0, low_res: 0, generic: 0, missing: 0 }
      },
      offenders: [],
      samples: []
    };
    
    // Track image usage to identify generics
    const imageUsage = new Map();
    
    venues.forEach(venue => {
      // Check main image
      if (venue.image_url) {
        const count = imageUsage.get(venue.image_url) || 0;
        imageUsage.set(venue.image_url, count + 1);
        
        // Classify image
        const classification = classifyImage(venue.image_url, venue.name);
        
        // Add to all relevant page types
        Object.keys(auditResults.pageTypes).forEach(pageType => {
          auditResults.pageTypes[pageType][classification]++;
        });
        
        // Track offenders
        if (classification !== 'real_ok') {
          auditResults.offenders.push({
            venue: venue.name,
            url: venue.image_url,
            classification,
            usage: count + 1
          });
        }
        
        // Sample for detailed analysis
        if (auditResults.samples.length < 25) {
          auditResults.samples.push({
            venue: venue.name,
            url: venue.image_url,
            classification,
            width: extractWidth(venue.image_url),
            alt: venue.image_alt || `${venue.name} — ${venue.cuisines?.[0] || 'Restaurant'}, ${venue.area || venue.borough || 'London'}, London`
          });
        }
      } else {
        // Missing image
        Object.keys(auditResults.pageTypes).forEach(pageType => {
          auditResults.pageTypes[pageType].missing++;
        });
        
        auditResults.offenders.push({
          venue: venue.name,
          url: 'MISSING',
          classification: 'missing',
          usage: 1
        });
      }
    });
    
    // Identify generic images (used more than 5 times)
    imageUsage.forEach((count, url) => {
      if (count > 5) {
        const offenders = auditResults.offenders.filter(o => o.url === url);
        offenders.forEach(offender => {
          if (offender.classification !== 'generic') {
            offender.classification = 'generic';
          }
        });
      }
    });
    
    // Generate report
    console.log('\n📊 IMAGE AUDIT RESULTS:');
    console.log(`   Total venues: ${auditResults.totalVenues}`);
    
    console.log('\n📄 Page Type Breakdown:');
    Object.entries(auditResults.pageTypes).forEach(([pageType, counts]) => {
      console.log(`   ${pageType.toUpperCase()}:`);
      console.log(`     Real OK: ${counts.real_ok}`);
      console.log(`     Low Res: ${counts.low_res}`);
      console.log(`     Generic: ${counts.generic}`);
      console.log(`     Missing: ${counts.missing}`);
    });
    
    console.log('\n❌ Top Offenders:');
    auditResults.offenders
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 25)
      .forEach((offender, index) => {
        console.log(`   ${index + 1}. ${offender.venue} (${offender.classification}) - Used ${offender.usage} times`);
        console.log(`      URL: ${offender.url}`);
      });
    
    console.log('\n📸 Sample Images:');
    auditResults.samples.forEach((sample, index) => {
      console.log(`   ${index + 1}. ${sample.venue}`);
      console.log(`      Classification: ${sample.classification}`);
      console.log(`      Width: ${sample.width}px`);
      console.log(`      URL: ${sample.url}`);
      console.log(`      Alt: ${sample.alt}`);
      console.log('');
    });
    
    // Save detailed report
    const reportPath = path.join(process.cwd(), 'reports/images.md');
    const reportContent = generateImageReport(auditResults);
    fs.writeFileSync(reportPath, reportContent, 'utf8');
    
    return { success: true, auditResults };
    
  } catch (error) {
    console.error('❌ Error auditing images:', error);
    return { success: false, error: error.message };
  }
}

function classifyImage(url, venueName) {
  if (!url || url === 'MISSING') return 'missing';
  
  // Check for low resolution
  const width = extractWidth(url);
  if (width && width < 1200) return 'low_res';
  
  // Check for generic patterns
  const genericPatterns = [
    'placeholder',
    'default',
    'stock',
    'gradient',
    'abstract',
    'unsplash.com/photo-1551218808', // Common placeholder
    'unsplash.com/photo-1529006557810' // Common placeholder
  ];
  
  const urlLower = url.toLowerCase();
  for (const pattern of genericPatterns) {
    if (urlLower.includes(pattern)) {
      return 'generic';
    }
  }
  
  // Check for food-related keywords (positive indicators)
  const foodKeywords = [
    'food',
    'dish',
    'meal',
    'cuisine',
    'restaurant',
    'dining',
    'plate',
    'chef'
  ];
  
  const hasFoodKeywords = foodKeywords.some(keyword => 
    urlLower.includes(keyword) || venueName.toLowerCase().includes(keyword)
  );
  
  if (hasFoodKeywords && width >= 1600) {
    return 'real_ok';
  }
  
  // Default classification
  return width >= 1200 ? 'real_ok' : 'low_res';
}

function extractWidth(url) {
  const widthMatch = url.match(/[?&]w=(\d+)/);
  return widthMatch ? parseInt(widthMatch[1]) : null;
}

function generateImageReport(auditResults) {
  const timestamp = new Date().toISOString();
  
  return `# IMAGE AUDIT REPORT

## Overview
- **Date**: ${timestamp}
- **Total Venues**: ${auditResults.totalVenues}
- **Status**: PHASE A COMPLETED

## Classification Results

### Page Type Breakdown
| Page Type | Real OK | Low Res | Generic | Missing | Total |
|-----------|---------|---------|---------|---------|-------|
| Home | ${auditResults.pageTypes.home.real_ok} | ${auditResults.pageTypes.home.low_res} | ${auditResults.pageTypes.home.generic} | ${auditResults.pageTypes.home.missing} | ${auditResults.totalVenues} |
| Restaurants | ${auditResults.pageTypes.restaurants.real_ok} | ${auditResults.pageTypes.restaurants.low_res} | ${auditResults.pageTypes.restaurants.generic} | ${auditResults.pageTypes.restaurants.missing} | ${auditResults.totalVenues} |
| Halal | ${auditResults.pageTypes.halal.real_ok} | ${auditResults.pageTypes.halal.low_res} | ${auditResults.pageTypes.halal.generic} | ${auditResults.pageTypes.halal.missing} | ${auditResults.totalVenues} |
| Cuisine | ${auditResults.pageTypes.cuisine.real_ok} | ${auditResults.pageTypes.cuisine.low_res} | ${auditResults.pageTypes.cuisine.generic} | ${auditResults.pageTypes.cuisine.missing} | ${auditResults.totalVenues} |
| Area | ${auditResults.pageTypes.area.real_ok} | ${auditResults.pageTypes.area.low_res} | ${auditResults.pageTypes.area.generic} | ${auditResults.pageTypes.area.missing} | ${auditResults.totalVenues} |
| Detail | ${auditResults.pageTypes.detail.real_ok} | ${auditResults.pageTypes.detail.low_res} | ${auditResults.pageTypes.detail.generic} | ${auditResults.pageTypes.detail.missing} | ${auditResults.totalVenues} |

## Top 25 Offenders

${auditResults.offenders
  .sort((a, b) => b.usage - a.usage)
  .slice(0, 25)
  .map((offender, index) => `${index + 1}. **${offender.venue}** (${offender.classification}) - Used ${offender.usage} times
   - URL: ${offender.url}`)
  .join('\n\n')}

## Sample Images Analysis

${auditResults.samples.map((sample, index) => `${index + 1}. **${sample.venue}**
   - Classification: ${sample.classification}
   - Width: ${sample.width}px
   - URL: ${sample.url}
   - Alt: ${sample.alt}`).join('\n\n')}

## Next Steps
Ready for PHASE B: Replace with authentic, high-res food images
`;
}

// Run the audit
const result = auditImages();

if (result.success) {
  console.log('\n✅ Image audit completed successfully!');
  console.log('📄 Report saved to: reports/images.md');
} else {
  console.log(`\n❌ Audit failed: ${result.error}`);
}