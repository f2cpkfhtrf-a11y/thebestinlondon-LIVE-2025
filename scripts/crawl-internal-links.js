#!/usr/bin/env node
/**
 * INTERNAL LINK CRAWLER
 * Crawls the site locally, verifies all internal links return 200 OK
 * Generates comprehensive link audit report
 */

const http = require('http');
const { parse } = require('node-html-parser');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../logs');
const MAX_RETRIES = 2;
const TIMEOUT = 10000;

// Pages to crawl
const SEED_PAGES = [
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
  '/restaurants-shoreditch',
  '/restaurants-soho',
  '/restaurants-camden',
  '/privacy',
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUrl(url, retries = 0) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: TIMEOUT }, (res) => {
      let data = '';
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          url
        });
      });
    });
    
    req.on('error', (error) => {
      if (retries < MAX_RETRIES) {
        console.log(`   Retry ${retries + 1}/${MAX_RETRIES} for ${url}`);
        delay(1000).then(() => {
          fetchUrl(url, retries + 1).then(resolve).catch(reject);
        });
      } else {
        reject(error);
      }
    });
    
    req.on('timeout', () => {
      req.destroy();
      if (retries < MAX_RETRIES) {
        console.log(`   Timeout, retry ${retries + 1}/${MAX_RETRIES} for ${url}`);
        delay(1000).then(() => {
          fetchUrl(url, retries + 1).then(resolve).catch(reject);
        });
      } else {
        reject(new Error('Request timeout'));
      }
    });
  });
}

function extractLinks(html, baseUrl) {
  const root = parse(html);
  const links = new Set();
  
  // Find all <a> tags
  root.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      // Remove query params and anchors for deduplication
      const cleanPath = href.split('?')[0].split('#')[0];
      if (cleanPath && cleanPath !== '/') {
        links.add(cleanPath);
      } else if (cleanPath === '/') {
        links.add('/');
      }
    }
  });
  
  return Array.from(links);
}

async function crawlSite() {
  console.log('🕷️  Starting internal link crawler\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);
  
  if (BASE_URL.includes('localhost')) {
    console.log('⚠️  Make sure dev server is running: npm run dev\n');
  }
  
  const results = {
    timestamp: new Date().toISOString(),
    base_url: BASE_URL,
    pages: [],
    broken_links: [],
    stats: {
      total_pages: 0,
      total_links: 0,
      unique_links: 0,
      passed: 0,
      failed: 0,
      redirects: 0
    }
  };
  
  const allLinks = new Set(SEED_PAGES);
  const tested = new Map();
  const queue = [...SEED_PAGES];
  const processed = new Set();
  
  // Process queue
  while (queue.length > 0) {
    const pagePath = queue.shift();
    
    if (processed.has(pagePath)) continue;
    processed.add(pagePath);
    
    const url = `${BASE_URL}${pagePath}`;
    console.log(`\n📄 Crawling: ${pagePath}`);
    
    try {
      const response = await fetchUrl(url);
      await delay(100); // Rate limiting
      
      const pageResult = {
        path: pagePath,
        url,
        status: response.status,
        success: response.status === 200,
        links_found: [],
        tested_at: new Date().toISOString()
      };
      
      if (response.status === 200) {
        console.log(`   ✅ OK (${response.status})`);
        results.stats.passed++;
        
        // Extract links from this page
        const links = extractLinks(response.body, BASE_URL);
        pageResult.links_found = links;
        
        console.log(`   Found ${links.length} internal links`);
        
        // Add to queue for crawling
        links.forEach(link => {
          if (!allLinks.has(link)) {
            allLinks.add(link);
            if (!processed.has(link)) {
              queue.push(link);
            }
          }
        });
        
      } else if (response.status >= 300 && response.status < 400) {
        console.log(`   🔄 Redirect (${response.status})`);
        results.stats.redirects++;
        
      } else {
        console.log(`   ❌ Failed (${response.status})`);
        results.stats.failed++;
        results.broken_links.push({
          path: pagePath,
          status: response.status,
          error: `HTTP ${response.status}`
        });
      }
      
      results.pages.push(pageResult);
      results.stats.total_pages++;
      
      // Cache result
      tested.set(pagePath, pageResult);
      
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.stats.failed++;
      results.broken_links.push({
        path: pagePath,
        status: 0,
        error: error.message
      });
      results.stats.total_pages++;
    }
  }
  
  // Now test all discovered links that weren't crawled
  console.log(`\n\n🔗 Testing ${allLinks.size} unique links...\n`);
  
  for (const linkPath of allLinks) {
    if (tested.has(linkPath)) {
      results.stats.total_links++;
      continue;
    }
    
    const url = `${BASE_URL}${linkPath}`;
    
    try {
      const response = await fetchUrl(url);
      await delay(50);
      
      if (response.status === 200) {
        results.stats.passed++;
      } else if (response.status >= 300 && response.status < 400) {
        results.stats.redirects++;
      } else {
        results.stats.failed++;
        results.broken_links.push({
          path: linkPath,
          status: response.status,
          error: `HTTP ${response.status}`
        });
      }
      
      results.stats.total_links++;
      tested.set(linkPath, { status: response.status, success: response.status === 200 });
      
    } catch (error) {
      results.stats.failed++;
      results.broken_links.push({
        path: linkPath,
        status: 0,
        error: error.message
      });
      results.stats.total_links++;
    }
  }
  
  results.stats.unique_links = allLinks.size;
  
  // Save results
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const jsonPath = path.join(OUTPUT_DIR, 'link-crawler-results.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  
  // Generate markdown report
  const successRate = ((results.stats.passed / results.stats.total_links) * 100).toFixed(1);
  
  const report = `# Internal Link Crawler Report

**Date:** ${results.timestamp}  
**Status:** ${results.stats.failed === 0 ? '✅ All links working' : '⚠️ Broken links found'}

## Summary
- **Total Pages Crawled:** ${results.stats.total_pages}
- **Total Links Tested:** ${results.stats.total_links}
- **Unique Links:** ${results.stats.unique_links}
- **Passed:** ${results.stats.passed} ✅
- **Failed:** ${results.stats.failed} ❌
- **Redirects:** ${results.stats.redirects} 🔄
- **Success Rate:** ${successRate}%

## Crawled Pages
${results.pages.map(page => 
  `- ${page.success ? '✅' : '❌'} \`${page.path}\` (${page.status}) - ${page.links_found.length} links found`
).join('\n')}

${results.broken_links.length > 0 ? `
## Broken Links (${results.broken_links.length})
${results.broken_links.map((broken, idx) => 
  `${idx + 1}. ❌ \`${broken.path}\`
   - Status: ${broken.status || 'N/A'}
   - Error: ${broken.error}`
).join('\n\n')}

## Recommendations
${results.broken_links.map(broken => {
  if (broken.status === 404) {
    return `- Create missing page: \`${broken.path}\``;
  } else if (broken.status === 0) {
    return `- Fix server/routing error for: \`${broken.path}\``;
  } else if (broken.status === 500) {
    return `- Fix internal server error for: \`${broken.path}\``;
  } else {
    return `- Investigate ${broken.status} error for: \`${broken.path}\``;
  }
}).join('\n')}
` : ''}

## Next Steps
${results.stats.failed === 0 ? 
  '✅ **All links verified!** Site is ready for production.' : 
  `⚠️  **Fix ${results.stats.failed} broken links** before launching to production.`}

---
*Generated by link-crawler.js*
`;
  
  const reportPath = path.join(OUTPUT_DIR, 'link-crawler-report.md');
  fs.writeFileSync(reportPath, report);
  
  // Print summary
  console.log('\n\n' + '='.repeat(70));
  console.log('LINK CRAWLER COMPLETE');
  console.log('='.repeat(70));
  console.log(`Pages Crawled: ${results.stats.total_pages}`);
  console.log(`Links Tested: ${results.stats.total_links}`);
  console.log(`Unique Links: ${results.stats.unique_links}`);
  console.log(`Passed: ${results.stats.passed} ✅`);
  console.log(`Failed: ${results.stats.failed} ❌`);
  console.log(`Redirects: ${results.stats.redirects} 🔄`);
  console.log(`Success Rate: ${successRate}%`);
  console.log('='.repeat(70));
  console.log(`\nReport saved to: ${reportPath}`);
  console.log(`JSON data saved to: ${jsonPath}\n`);
  
  return results;
}

// Run if called directly
if (require.main === module) {
  crawlSite()
    .then((results) => {
      process.exit(results.stats.failed === 0 ? 0 : 1);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { crawlSite };
