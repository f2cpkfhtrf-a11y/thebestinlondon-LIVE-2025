#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Smoke test for JSON-LD SEO coverage
 * Statically inspects page modules to ensure JSON-LD is present
 */

async function smokeSeo() {
  console.log('🔍 Running SEO smoke test...');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  
  // Ensure reports directory exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: 0,
      pagesWithJsonLd: 0,
      pagesWithoutJsonLd: 0,
      restaurantPagesWithCorrectSchema: 0,
      restaurantPagesWithoutCorrectSchema: 0
    },
    pages: [],
    issues: []
  };
  
  // Define required pages and their expected schema types
  const requiredPages = [
    { path: 'pages/index.js', name: 'Home', expectedTypes: ['WebSite', 'Organization'] },
    { path: 'pages/areas.js', name: 'Areas Index', expectedTypes: ['CollectionPage'] },
    { path: 'pages/areas/[slug].js', name: 'Area Detail', expectedTypes: ['CollectionPage'] },
    { path: 'pages/cuisines.js', name: 'Cuisines Index', expectedTypes: ['CollectionPage'] },
    { path: 'pages/[cuisine].js', name: 'Cuisine Detail', expectedTypes: ['CollectionPage'] },
    { path: 'pages/restaurants.js', name: 'Restaurants Index', expectedTypes: ['CollectionPage'] },
    { path: 'pages/restaurant/[slug].js', name: 'Restaurant Detail', expectedTypes: ['Restaurant', 'LocalBusiness'] },
    { path: 'pages/blog.js', name: 'Blog Index', expectedTypes: ['Blog'] },
    { path: 'pages/blog/[slug].js', name: 'Blog Post', expectedTypes: ['BlogPosting'] },
    { path: 'pages/faq.js', name: 'FAQ Index', expectedTypes: ['FAQPage'] },
    { path: 'pages/faq/[slug].js', name: 'FAQ Detail', expectedTypes: ['FAQPage'] }
  ];
  
  function checkPageForJsonLd(pageInfo) {
    const filePath = path.join(process.cwd(), pageInfo.path);
    
    if (!fs.existsSync(filePath)) {
      report.summary.totalPages++;
      report.pages.push({
        page: pageInfo.name,
        path: pageInfo.path,
        hasJsonLd: false,
        status: '⚠️ SKIP (file not found)'
      });
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    report.summary.totalPages++;
    
    // Check for various JSON-LD patterns
    const patterns = [
      /withSEOPage\s*\(/,
      /application\/ld\+json/,
      /asCollectionPage\s*\(/,
      /asWebSite\s*\(/,
      /asOrganization\s*\(/,
      /dangerouslySetInnerHTML.*JSON\.stringify/,
      /generateStructuredData/,
      /@type.*Restaurant/,
      /@type.*LocalBusiness/,
      /@type.*CollectionPage/,
      /@type.*WebSite/,
      /@type.*Blog/,
      /@type.*BlogPosting/,
      /@type.*FAQPage/
    ];
    
    const hasJsonLd = patterns.some(pattern => pattern.test(content));
    
    if (hasJsonLd) {
      report.summary.pagesWithJsonLd++;
      
      // Special check for restaurant pages
      if (pageInfo.name.includes('Restaurant Detail')) {
        const hasRestaurantSchema = /@type.*Restaurant|@type.*LocalBusiness|Restaurant|LocalBusiness/.test(content);
        if (hasRestaurantSchema) {
          report.summary.restaurantPagesWithCorrectSchema++;
        } else {
          report.summary.restaurantPagesWithoutCorrectSchema++;
          report.issues.push({
            page: pageInfo.name,
            issue: 'Missing Restaurant or LocalBusiness schema type',
            severity: 'warning'
          });
        }
      }
      
      report.pages.push({
        page: pageInfo.name,
        path: pageInfo.path,
        hasJsonLd: true,
        status: '✅ PASS'
      });
    } else {
      report.summary.pagesWithoutJsonLd++;
      report.issues.push({
        page: pageInfo.name,
        issue: 'No JSON-LD schema detected',
        severity: 'error'
      });
      
      report.pages.push({
        page: pageInfo.name,
        path: pageInfo.path,
        hasJsonLd: false,
        status: '❌ FAIL'
      });
    }
  }
  
  // Check all required pages
  requiredPages.forEach(checkPageForJsonLd);
  
  // Write JSON report
  const reportPath = path.join(reportsDir, 'seo_smoke.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Write Markdown report
  const markdownPath = path.join(reportsDir, 'seo_smoke.md');
  const markdownContent = `# SEO Smoke Test Report

**Generated:** ${report.timestamp}
**Total Pages:** ${report.summary.totalPages}
**Pages with JSON-LD:** ${report.summary.pagesWithJsonLd}
**Pages without JSON-LD:** ${report.summary.pagesWithoutJsonLd}
**Restaurant Pages with Correct Schema:** ${report.summary.restaurantPagesWithCorrectSchema}
**Restaurant Pages without Correct Schema:** ${report.summary.restaurantPagesWithoutCorrectSchema}

## Page Coverage

| Page | Status | JSON-LD |
|------|--------|---------|
${report.pages.map(page => `| ${page.page} | ${page.status} | ${page.hasJsonLd ? '✅' : '❌'} |`).join('\n')}

## Issues Found

${report.issues.length > 0 ? report.issues.map(issue => 
  `- **${issue.page}**: ${issue.issue} (${issue.severity})`
).join('\n') : 'No issues found'}

---
*This report was generated automatically and is non-blocking.*
`;

  fs.writeFileSync(markdownPath, markdownContent);
  
  // Print summary
  console.log('\n📊 SEO Smoke Test Summary:');
  console.log(`   Total pages: ${report.summary.totalPages}`);
  console.log(`   Pages with JSON-LD: ${report.summary.pagesWithJsonLd}`);
  console.log(`   Pages without JSON-LD: ${report.summary.pagesWithoutJsonLd}`);
  console.log(`   Restaurant pages with correct schema: ${report.summary.restaurantPagesWithCorrectSchema}`);
  console.log(`   Restaurant pages without correct schema: ${report.summary.restaurantPagesWithoutCorrectSchema}`);
  
  if (report.issues.length > 0) {
    console.log('\n⚠️  Issues found:');
    report.issues.forEach(issue => {
      console.log(`   • ${issue.page}: ${issue.issue}`);
    });
  } else {
    console.log('\n✅ No issues found!');
  }
  
  console.log(`\n📄 Full report saved to: ${reportPath}`);
  console.log(`📄 Markdown report saved to: ${markdownPath}`);
  console.log('✅ SEO smoke test complete!');
  
  // Always exit with code 0 (non-blocking)
  process.exit(0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  smokeSeo().catch(console.error);
}

export default smokeSeo;
