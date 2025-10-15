// AUTOMATED LINK VERIFICATION CRAWLER
// Crawls all pages and verifies internal links return 200 OK

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../logs');

// Pages to crawl
const PAGES_TO_CRAWL = [
  '/',
  '/restaurants',
  '/indian-restaurants-london',
  '/italian-restaurants-london',
  '/japanese-restaurants-london',
  '/chinese-restaurants-london',
  '/thai-restaurants-london',
  '/turkish-restaurants-london',
  '/best-halal-restaurants-london',
  '/vegan-restaurants-london',
  '/vegetarian-restaurants-london',
  '/best-cafes-london',
  '/best-coffee-shops-london',
  '/best-bakeries-london',
  '/best-brunch-london',
  '/best-bars-london',
  '/restaurants-shoreditch',
  '/restaurants-soho',
  '/restaurants-camden',
  '/search',
  '/about',
  '/contact',
  '/guides',
  '/privacy',
];

// Utility to fetch a URL
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Extract links from HTML
function extractLinks(html, baseUrl) {
  const root = parse(html);
  const links = new Set();
  
  // Find all <a> tags
  root.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      links.add(href);
    }
  });
  
  return Array.from(links);
}

// Main crawler function
async function crawlAndVerifyLinks() {
  console.log('🕷️  Starting link verification crawler...\n');
  
  const results = {
    tested: 0,
    passed: 0,
    failed: 0,
    links: [],
    broken: [],
    summary: {}
  };
  
  const allLinks = new Set(PAGES_TO_CRAWL);
  const testedLinks = new Set();
  
  // Crawl each page
  for (const pagePath of PAGES_TO_CRAWL) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`\n📄 Crawling: ${pagePath}`);
    
    try {
      const response = await fetchUrl(url);
      
      const pageResult = {
        url: pagePath,
        status: response.status,
        success: response.status === 200,
        linksFound: [],
        timestamp: new Date().toISOString()
      };
      
      if (response.status === 200) {
        console.log(`   ✅ Page OK (${response.status})`);
        results.passed++;
        
        // Extract links from this page
        const links = extractLinks(response.body, BASE_URL);
        pageResult.linksFound = links;
        
        console.log(`   Found ${links.length} internal links`);
        
        // Add to set for testing
        links.forEach(link => {
          if (!testedLinks.has(link)) {
            allLinks.add(link);
          }
        });
        
      } else {
        console.log(`   ❌ Page failed (${response.status})`);
        results.failed++;
        results.broken.push({
          url: pagePath,
          status: response.status,
          error: 'Non-200 response'
        });
      }
      
      results.links.push(pageResult);
      results.tested++;
      testedLinks.add(pagePath);
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.failed++;
      results.broken.push({
        url: pagePath,
        status: 0,
        error: error.message
      });
      results.tested++;
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Test discovered links that weren't in initial list
  console.log(`\n\n🔗 Testing ${allLinks.size - PAGES_TO_CRAWL.length} additional discovered links...`);
  
  for (const linkPath of allLinks) {
    if (testedLinks.has(linkPath)) continue;
    
    const url = `${BASE_URL}${linkPath}`;
    
    try {
      const response = await fetchUrl(url);
      
      if (response.status === 200) {
        results.passed++;
      } else {
        results.failed++;
        results.broken.push({
          url: linkPath,
          status: response.status,
          error: 'Non-200 response'
        });
      }
      
      results.tested++;
      testedLinks.add(linkPath);
      
    } catch (error) {
      results.failed++;
      results.broken.push({
        url: linkPath,
        status: 0,
        error: error.message
      });
      results.tested++;
    }
    
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  // Generate summary
  results.summary = {
    totalTested: results.tested,
    passed: results.passed,
    failed: results.failed,
    successRate: ((results.passed / results.tested) * 100).toFixed(1) + '%',
    timestamp: new Date().toISOString()
  };
  
  // Save results
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const jsonPath = path.join(OUTPUT_DIR, 'link-audit-results.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  
  // Generate markdown report
  const report = `# Link Audit Report

**Date:** ${results.summary.timestamp}
**Status:** ${results.failed === 0 ? '✅ All links working' : '⚠️ Some links broken'}

## Summary
- **Total Links Tested:** ${results.summary.totalTested}
- **Passed:** ${results.summary.passed} ✅
- **Failed:** ${results.summary.failed} ❌
- **Success Rate:** ${results.summary.successRate}

## Core Pages Status
${results.links.map(link => 
  `- ${link.success ? '✅' : '❌'} ${link.url} (${link.status}) ${link.linksFound.length ? `- ${link.linksFound.length} links found` : ''}`
).join('\n')}

${results.broken.length > 0 ? `
## Broken Links
${results.broken.map(broken => 
  `- ❌ ${broken.url} - Status: ${broken.status} - ${broken.error}`
).join('\n')}

## Recommendations
${results.broken.map(broken => {
  if (broken.status === 404) {
    return `- Create missing page: ${broken.url}`;
  } else if (broken.status === 0) {
    return `- Fix server/routing error for: ${broken.url}`;
  } else {
    return `- Investigate ${broken.status} error for: ${broken.url}`;
  }
}).join('\n')}
` : ''}

## Next Steps
${results.failed === 0 ? 
  '✅ All links verified! Ready for production.' : 
  `⚠️ Fix ${results.failed} broken links before launch.`}
`;
  
  const reportPath = path.join(OUTPUT_DIR, 'link-audit-report.md');
  fs.writeFileSync(reportPath, report);
  
  // Print summary
  console.log('\n\n' + '='.repeat(70));
  console.log('LINK VERIFICATION COMPLETE');
  console.log('='.repeat(70));
  console.log(`Total Links Tested: ${results.summary.totalTested}`);
  console.log(`Passed: ${results.summary.passed} ✅`);
  console.log(`Failed: ${results.summary.failed} ❌`);
  console.log(`Success Rate: ${results.summary.successRate}`);
  console.log('='.repeat(70));
  console.log(`\nReport saved to: ${reportPath}`);
  console.log(`JSON data saved to: ${jsonPath}\n`);
  
  return results;
}

// Run if called directly
if (require.main === module) {
  crawlAndVerifyLinks()
    .then((results) => {
      process.exit(results.failed === 0 ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { crawlAndVerifyLinks };
