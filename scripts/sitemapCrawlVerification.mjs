#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract URLs from XML sitemap
function extractUrlsFromSitemap(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const urls = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    
    while ((match = locRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    return urls;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

// Function to make HTTP request
function makeRequest(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD' }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        headers: res.headers
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout'
      });
    });
    
    req.end();
  });
}

// Main function
async function main() {
  console.log('🔍 FULL SITEMAP CRAWL & VERIFICATION');
  console.log('=====================================');
  console.log('');
  
  const sitemapFiles = [
    'public/sitemap-pages.xml',
    'public/sitemap-venues.xml', 
    'public/sitemap-cuisines.xml',
    'public/sitemap-areas.xml',
    'public/sitemap-blog.xml',
    'public/sitemap-faq.xml',
    'public/sitemap-collections.xml'
  ];
  
  let allUrls = [];
  const urlTypes = {};
  
  // Extract URLs from each sitemap
  for (const file of sitemapFiles) {
    const urls = extractUrlsFromSitemap(file);
    const type = path.basename(file, '.xml').replace('sitemap-', '');
    urlTypes[type] = urls.length;
    allUrls = allUrls.concat(urls.map(url => ({ url, type })));
  }
  
  console.log('📊 URL BREAKDOWN:');
  Object.entries(urlTypes).forEach(([type, count]) => {
    console.log(`- ${type}: ${count} URLs`);
  });
  console.log(`- Total: ${allUrls.length} URLs`);
  console.log('');
  
  console.log('🔍 TESTING ALL URLs...');
  console.log('');
  
  const results = [];
  const errors = [];
  let processed = 0;
  
  // Test URLs in batches to avoid overwhelming the server
  const batchSize = 10;
  for (let i = 0; i < allUrls.length; i += batchSize) {
    const batch = allUrls.slice(i, i + batchSize);
    const promises = batch.map(async ({ url, type }) => {
      const result = await makeRequest(url);
      return { ...result, type };
    });
    
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    
    processed += batch.length;
    console.log(`Processed ${processed}/${allUrls.length} URLs...`);
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('');
  console.log('📊 RESULTS SUMMARY:');
  console.log('');
  
  // Count status codes
  const statusCounts = {};
  results.forEach(result => {
    const status = result.status;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    
    if (status !== 200) {
      errors.push(result);
    }
  });
  
  Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`- ${status}: ${count} URLs`);
  });
  
  console.log('');
  console.log('❌ ERRORS FOUND:');
  if (errors.length === 0) {
    console.log('✅ No errors found! All URLs return HTTP 200.');
  } else {
    console.log(`Found ${errors.length} URLs with errors:`);
    console.log('');
    errors.forEach(error => {
      console.log(`- ${error.url} (${error.type}): ${error.status} ${error.error || ''}`);
    });
  }
  
  // Save detailed results
  const reportData = {
    timestamp: new Date().toISOString(),
    totalUrls: allUrls.length,
    urlTypes,
    statusCounts,
    errors,
    results: results.map(r => ({
      url: r.url,
      status: r.status,
      type: r.type,
      error: r.error || null
    }))
  };
  
  const reportPath = `seo/reports/sitemap-crawl-results-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  
  console.log('');
  console.log(`📋 Detailed results saved to: ${reportPath}`);
  
  return {
    totalUrls: allUrls.length,
    errors: errors.length,
    statusCounts,
    errors
  };
}

// Run the script
main().catch(console.error);
