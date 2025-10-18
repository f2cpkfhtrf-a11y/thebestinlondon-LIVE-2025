const fs = require('fs');
const path = require('path');

// Comprehensive site scan and routing validation
async function performBaselineScan() {
  console.log('🔍 PERFORMING COMPREHENSIVE SITE SCAN...\n');
  
  const scanResults = {
    timestamp: new Date().toISOString(),
    pages: [],
    brokenLinks: [],
    missingImages: [],
    consoleErrors: [],
    performanceMetrics: {},
    totalIssues: 0
  };
  
  // 1. Scan all page files
  const pagesDir = path.join(__dirname, '../pages');
  const pageFiles = fs.readdirSync(pagesDir, { recursive: true })
    .filter(file => file.endsWith('.js') && !file.includes('_app') && !file.includes('_document'))
    .map(file => path.join(pagesDir, file));
  
  console.log(`📄 Found ${pageFiles.length} page files to scan...`);
  
  // 2. Analyze each page
  pageFiles.forEach(pageFile => {
    const content = fs.readFileSync(pageFile, 'utf8');
    const pageName = path.basename(pageFile, '.js');
    
    const pageAnalysis = {
      file: pageFile,
      name: pageName,
      hasImageIssues: false,
      hasLinkIssues: false,
      hasConsoleErrors: false,
      issues: []
    };
    
    // Check for image-related issues
    if (content.includes('Loading...') || content.includes('placeholder')) {
      pageAnalysis.hasImageIssues = true;
      pageAnalysis.issues.push('Contains placeholder images');
    }
    
    // Check for link issues
    if (content.includes('404') || content.includes('broken')) {
      pageAnalysis.hasLinkIssues = true;
      pageAnalysis.issues.push('Contains broken links');
    }
    
    // Check for console errors
    if (content.includes('console.error') || content.includes('Error:')) {
      pageAnalysis.hasConsoleErrors = true;
      pageAnalysis.issues.push('Contains console errors');
    }
    
    scanResults.pages.push(pageAnalysis);
    scanResults.totalIssues += pageAnalysis.issues.length;
  });
  
  // 3. Analyze venue data for routing issues
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  console.log(`🏢 Analyzing ${venuesData.venues.length} venues for routing issues...`);
  
  const routingIssues = [];
  const slugCounts = {};
  
  venuesData.venues.forEach(venue => {
    // Check for duplicate slugs
    if (slugCounts[venue.slug]) {
      routingIssues.push({
        type: 'duplicate_slug',
        venue: venue.name,
        slug: venue.slug,
        issue: 'Duplicate slug detected'
      });
    } else {
      slugCounts[venue.slug] = 1;
    }
    
    // Check for invalid slugs
    if (!venue.slug || venue.slug.length < 3) {
      routingIssues.push({
        type: 'invalid_slug',
        venue: venue.name,
        slug: venue.slug,
        issue: 'Invalid or missing slug'
      });
    }
    
    // Check for missing required fields
    if (!venue.name || !venue.cuisines || !venue.address) {
      routingIssues.push({
        type: 'missing_fields',
        venue: venue.name,
        issue: 'Missing required fields (name, cuisines, or address)'
      });
    }
  });
  
  scanResults.brokenLinks = routingIssues;
  scanResults.totalIssues += routingIssues.length;
  
  // 4. Generate summary
  console.log('\n📊 BASELINE SCAN RESULTS:');
  console.log('='.repeat(50));
  console.log(`Total Pages Scanned: ${scanResults.pages.length}`);
  console.log(`Pages with Issues: ${scanResults.pages.filter(p => p.issues.length > 0).length}`);
  console.log(`Routing Issues: ${routingIssues.length}`);
  console.log(`Total Issues Found: ${scanResults.totalIssues}`);
  
  console.log('\n🔗 ROUTING ISSUES:');
  routingIssues.slice(0, 10).forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.venue} - ${issue.issue}`);
  });
  
  if (routingIssues.length > 10) {
    console.log(`... and ${routingIssues.length - 10} more routing issues`);
  }
  
  console.log('\n📄 PAGE ISSUES:');
  scanResults.pages.filter(p => p.issues.length > 0).forEach((page, index) => {
    console.log(`${index + 1}. ${page.name}: ${page.issues.join(', ')}`);
  });
  
  // 5. Save results
  const reportPath = path.join(__dirname, '../reports/baseline.md');
  const jsonPath = path.join(__dirname, '../reports/baseline.json');
  
  const reportContent = `# Baseline Site Scan Report

## Summary
- **Scan Date**: ${scanResults.timestamp}
- **Total Pages**: ${scanResults.pages.length}
- **Pages with Issues**: ${scanResults.pages.filter(p => p.issues.length > 0).length}
- **Routing Issues**: ${routingIssues.length}
- **Total Issues**: ${scanResults.totalIssues}

## Page Analysis
${scanResults.pages.map(page => `
### ${page.name}
- **File**: ${page.file}
- **Issues**: ${page.issues.length > 0 ? page.issues.join(', ') : 'None'}
- **Image Issues**: ${page.hasImageIssues ? 'Yes' : 'No'}
- **Link Issues**: ${page.hasLinkIssues ? 'Yes' : 'No'}
- **Console Errors**: ${page.hasConsoleErrors ? 'Yes' : 'No'}
`).join('')}

## Routing Issues
${routingIssues.map((issue, index) => `
${index + 1}. **${issue.venue}**
   - Type: ${issue.type}
   - Issue: ${issue.issue}
   - Slug: ${issue.slug || 'N/A'}
`).join('')}

## Recommendations
1. Fix duplicate and invalid slugs
2. Ensure all venues have required fields
3. Update placeholder images with high-quality alternatives
4. Implement proper error handling for broken links
5. Add comprehensive 404 page with navigation

## Next Steps
1. Run routing fixes script
2. Implement image pipeline
3. Add comprehensive error handling
4. Test all internal links
`;
  
  fs.writeFileSync(reportPath, reportContent);
  fs.writeFileSync(jsonPath, JSON.stringify(scanResults, null, 2));
  
  console.log(`\n💾 Results saved to:`);
  console.log(`   📄 ${reportPath}`);
  console.log(`   📊 ${jsonPath}`);
  
  return scanResults;
}

// Run the baseline scan
performBaselineScan().catch(console.error);
