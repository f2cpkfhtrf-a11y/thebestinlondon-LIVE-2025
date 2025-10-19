#!/usr/bin/env node

import https from 'https';
import { writeFileSync } from 'fs';

const PROD_URL = process.argv[2] || 'https://www.thebestinlondon.co.uk';

const testUrls = [
  '/',
  '/restaurants',
  '/best-halal-restaurants-london',
  '/areas',
  '/cuisines',
  '/areas/whitechapel',
  '/italian',
  '/restaurant/dishoom-covent-garden-OZ6OHOJw',
  '/restaurant/halal-street-kitchen-5e3zUyL0'
];

async function fetchUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${PROD_URL}${url}`;
    const request = https.request(fullUrl, { method: 'HEAD' }, (response) => {
      resolve({
        url,
        fullUrl,
        status: response.statusCode,
        headers: response.headers,
        success: response.statusCode >= 200 && response.statusCode < 400
      });
    });
    
    request.on('error', (error) => {
      resolve({
        url,
        fullUrl,
        status: 0,
        error: error.message,
        success: false
      });
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      resolve({
        url,
        fullUrl,
        status: 0,
        error: 'Timeout',
        success: false
      });
    });
    
    request.end();
  });
}

async function checkPageContent(url) {
  return new Promise((resolve) => {
    const fullUrl = `${PROD_URL}${url}`;
    let html = '';
    
    const request = https.request(fullUrl, (response) => {
      response.on('data', (chunk) => {
        html += chunk.toString();
      });
      
      response.on('end', () => {
        const hasLocalImages = html.includes('/images/') && !html.includes('unsplash.com') && !html.includes('googleusercontent.com');
        const hasOGImage = html.includes('og:image') || html.includes('twitter:image');
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
  const contentTestUrls = ['/', '/areas/whitechapel', '/cuisines/italian'];
  for (const url of contentTestUrls) {
    console.log(`\nChecking content for ${url}...`);
    const content = await checkPageContent(url);
    contentChecks.push(content);
    
    console.log(`  Status: ${content.status}`);
    console.log(`  Local Images: ${content.hasLocalImages ? '✅' : '❌'}`);
    console.log(`  OG/Twitter Images: ${content.hasOGImage ? '✅' : '❌'}`);
    console.log(`  Breadcrumbs: ${content.hasBreadcrumbs ? '✅' : '❌'}`);
  }
  
  // Generate summary
  const summary = {
    timestamp: new Date().toISOString(),
    productionUrl: PROD_URL,
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
  writeFileSync('reports/post_deploy_verification.json', JSON.stringify(summary, null, 2));
  
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
  
  console.log('\n✅ Verification complete! Results saved to reports/post_deploy_verification.json');
  
  // Return exit code based on results
  process.exit(summary.summary.failedUrls > 0 ? 1 : 0);
}

runVerification().catch(console.error);
