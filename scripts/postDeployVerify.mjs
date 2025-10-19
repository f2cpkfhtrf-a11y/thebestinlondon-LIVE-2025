#!/usr/bin/env node

import https from 'https';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

// Parse command line arguments
const args = process.argv.slice(2);
let reportPath = 'reports/post_deploy_verification.json';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thebestinlondon.co.uk';

// Handle --report argument
const reportIndex = args.indexOf('--report');
if (reportIndex !== -1 && args[reportIndex + 1]) {
  reportPath = args[reportIndex + 1];
}

// Ensure reports directory exists
const reportDir = path.dirname(reportPath);
if (!existsSync(reportDir)) {
  mkdirSync(reportDir, { recursive: true });
}

const testUrls = [
  '/',
  '/restaurants',
  '/best-halal-restaurants-london',
  '/areas/whitechapel',
  '/italian'
];

async function fetchUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${siteUrl}${url}`;
    const request = https.request(fullUrl, { method: 'HEAD' }, (response) => {
      resolve({
        url,
        fullUrl,
        status: response.statusCode,
        headers: {
          'cache-control': response.headers['cache-control'] || 'not-set',
          'content-type': response.headers['content-type'] || 'not-set'
        },
        success: response.statusCode >= 200 && response.statusCode < 400
      });
    });
    
    request.on('error', (error) => {
      resolve({
        url,
        fullUrl: `${siteUrl}${url}`,
        status: 0,
        error: error.message,
        success: false,
        headers: {}
      });
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        url,
        fullUrl: `${siteUrl}${url}`,
        status: 0,
        error: 'Timeout',
        success: false,
        headers: {}
      });
    });
    
    request.end();
  });
}

async function checkPageContent(url) {
  return new Promise((resolve) => {
    const fullUrl = `${siteUrl}${url}`;
    let html = '';
    
    const request = https.request(fullUrl, (response) => {
      response.on('data', (chunk) => {
        html += chunk.toString();
      });
      
      response.on('end', () => {
        const hasLocalImages = html.includes('/images/') && 
                               !html.includes('unsplash.com') && 
                               !html.includes('googleusercontent.com') &&
                               !html.includes('lh3.googleusercontent.com');
        const hasOGImage = (html.includes('og:image') && html.includes('/images/')) || 
                          (html.includes('twitter:image') && html.includes('/images/'));
        const hasBreadcrumbs = html.includes('breadcrumb') || html.includes('Breadcrumbs');
        
        resolve({
          url,
          status: response.statusCode,
          hasLocalImages,
          hasOGImage,
          hasBreadcrumbs,
          contentLength: html.length
        });
      });
    });
    
    request.on('error', () => {
      resolve({
        url,
        status: 0,
        hasLocalImages: false,
        hasOGImage: false,
        hasBreadcrumbs: false,
        contentLength: 0
      });
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        url,
        status: 0,
        hasLocalImages: false,
        hasOGImage: false,
        hasBreadcrumbs: false,
        contentLength: 0
      });
    });
    
    request.end();
  });
}

async function runVerification() {
  console.log('🔍 Starting post-deploy verification...\n');
  
  const results = [];
  const contentChecks = [];
  
  // Test URL accessibility
  for (const url of testUrls) {
    console.log(`Testing ${url}...`);
    const result = await fetchUrl(url);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ ${url} - ${result.status}`);
    } else {
      console.log(`❌ ${url} - ${result.status} ${result.error || ''}`);
    }
  }
  
  // Test content for key pages
  const contentTestUrls = testUrls; // Use same URLs for content checks
  for (const url of contentTestUrls) {
    console.log(`\nChecking content for ${url}...`);
    const content = await checkPageContent(url);
    contentChecks.push(content);
    
    console.log(`  Status: ${content.status}`);
    console.log(`  Local Images: ${content.hasLocalImages ? '✅' : '❌'}`);
    console.log(`  OG/Twitter Images: ${content.hasOGImage ? '✅' : '❌'}`);
    console.log(`  Breadcrumbs: ${content.hasBreadcrumbs ? '✅' : '❌'}`);
    console.log(`  Cache Headers: ${results.find(r => r.url === url)?.headers?.['cache-control'] || '❌'}`);
  }
  
  // Generate summary
  const summary = {
    timestamp: new Date().toISOString(),
    productionUrl: siteUrl,
    urlTests: results,
    contentChecks,
    summary: {
      totalUrls: testUrls.length,
      successfulUrls: results.filter(r => r.success).length,
      failedUrls: results.filter(r => !r.success).length,
      pagesWithLocalImages: contentChecks.filter(c => c.hasLocalImages).length,
      pagesWithSEOImages: contentChecks.filter(c => c.hasOGImage).length,
      pagesWithBreadcrumbs: contentChecks.filter(c => c.hasBreadcrumbs).length
    }
  };
  
  // Save results
  writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  
  // Print final summary
  console.log('\n📊 DEPLOYMENT VERIFICATION SUMMARY');
  console.log('====================================');
  console.log(`✅ Successful URLs: ${summary.summary.successfulUrls}/${summary.summary.totalUrls}`);
  console.log(`✅ Pages with Local Images: ${summary.summary.pagesWithLocalImages}/${contentTestUrls.length}`);
  console.log(`✅ Pages with SEO Images: ${summary.summary.pagesWithSEOImages}/${contentTestUrls.length}`);
  console.log(`✅ Pages with Breadcrumbs: ${summary.summary.pagesWithBreadcrumbs}/${contentTestUrls.length}`);
  
  if (summary.summary.failedUrls > 0) {
    console.log('\n❌ Failed URLs:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ${r.url} - ${r.status} ${r.error || ''}`);
    });
  }
  
  console.log(`\n✅ Verification complete! Results saved to ${reportPath}`);
  
  // Print readable summary
  console.log('\n📋 READABLE SUMMARY:');
  console.log(`✅ Working routes: ${summary.summary.successfulUrls}/${summary.summary.totalUrls}`);
  if (summary.summary.failedUrls > 0) {
    console.log(`⚠️ Any 404s: ${summary.summary.failedUrls} failing routes`);
  }
  const missingImages = contentChecks.filter(c => !c.hasLocalImages).length;
  if (missingImages > 0) {
    console.log(`🚫 Missing images: ${missingImages} pages with non-local images`);
  }
  
  // Never fail deployment, only report findings
  // process.exit(0);
}

runVerification().catch(console.error);
