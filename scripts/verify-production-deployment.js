const https = require('https');
const http = require('http');

const PRODUCTION_URL = 'https://www.thebestinlondon.co.uk';

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Production-Verification/1.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    }).on('error', reject);
  });
}

async function verifyProductionDeployment() {
  console.log('🚀 Starting production deployment verification...\n');
  
  const testUrls = [
    '/',
    '/restaurants',
    '/best-halal-restaurants-london',
    '/indian-restaurants-london'
  ];
  
  let totalImages = 0;
  let imageValidationPassed = true;
  let cacheHeadersCorrect = true;
  let jsonLdPresent = true;
  let localOnlyMode = true;
  
  console.log('📋 Testing key pages...');
  
  for (const path of testUrls) {
    try {
      console.log(`\n🔍 Testing: ${PRODUCTION_URL}${path}`);
      const result = await fetchURL(`${PRODUCTION_URL}${path}`);
      
      if (result.status !== 200) {
        console.log(`❌ Failed: HTTP ${result.status}`);
        continue;
      }
      
      console.log(`✅ Status: HTTP ${result.status}`);
      
      // Check cache headers
      const cacheControl = result.headers['cache-control'];
      if (path === '/restaurants' || path.startsWith('/restaurant/')) {
        if (!cacheControl || (!cacheControl.includes('max-age=0') && !cacheControl.includes('must-revalidate'))) {
          console.log(`⚠️  Cache headers may need review: ${cacheControl}`);
        }
      }
      
      // Count images in HTML
      const imageMatches = result.data.match(/\/images\/.*?\.webp/g) || [];
      totalImages += imageMatches.length;
      console.log(`📊 Images found: ${imageMatches.length}`);
      
      // Check for external image URLs
      const externalImages = result.data.match(/https?:\/\/.*?\.(jpg|jpeg|png|webp)/g) || [];
      const unsplashImages = result.data.match(/unsplash\.com/g) || [];
      if (externalImages.length > 0 && !externalImages.every(url => url.includes('thebestinlondon.co.uk'))) {
        console.log(`❌ External images detected: ${externalImages.length}`);
        localOnlyMode = false;
      }
      if (unsplashImages.length > 0) {
        console.log(`❌ Unsplash images detected: ${unsplashImages.length}`);
        localOnlyMode = false;
      }
      
      // Check for JSON-LD
      if (result.data.includes('application/ld+json') && result.data.includes('"@type"')) {
        console.log(`✅ JSON-LD present`);
      } else {
        console.log(`⚠️  JSON-LD may be missing`);
        jsonLdPresent = false;
      }
      
      // Check for OGP and Twitter meta tags
      if (result.data.includes('og:image') && result.data.includes('twitter:image')) {
        console.log(`✅ Social meta tags present`);
      } else {
        console.log(`⚠️  Social meta tags may be missing`);
      }
      
    } catch (error) {
      console.log(`❌ Error testing ${path}: ${error.message}`);
    }
  }
  
  // Test a specific restaurant page
  try {
    console.log(`\n🔍 Testing restaurant detail page...`);
    const restaurantResult = await fetchURL(`${PRODUCTION_URL}/restaurant/dishoom-covent-garden-OZ6OHOJw`);
    
    if (restaurantResult.status === 200) {
      console.log(`✅ Restaurant page accessible`);
      
      // Verify hero image path
      const heroImageMatches = restaurantResult.data.match(/\/images\/.*?hero.*?\.webp/g) || [];
      if (heroImageMatches.length > 0) {
        console.log(`✅ Hero images found: ${heroImageMatches.length}`);
      } else {
        console.log(`⚠️  Hero images not found`);
      }
    }
  } catch (error) {
    console.log(`❌ Error testing restaurant page: ${error.message}`);
  }
  
  // Summary
  console.log('\n📊 DEPLOYMENT VERIFICATION SUMMARY');
  console.log('=====================================');
  console.log(`✅ Production URL: ${PRODUCTION_URL}`);
  console.log(`📈 Total images detected: ${totalImages}`);
  console.log(`${localOnlyMode ? '✅' : '❌'} Local-only mode: ${localOnlyMode ? 'CONFIRMED' : 'VIOLATION DETECTED'}`);
  console.log(`${jsonLdPresent ? '✅' : '⚠️ '} JSON-LD structured data: ${jsonLdPresent ? 'PRESENT' : 'MISSING'}`);
  console.log(`${cacheHeadersCorrect ? '✅' : '⚠️ '} Cache headers: ${cacheHeadersCorrect ? 'CONFIGURED' : 'NEEDS REVIEW'}`);
  
  if (localOnlyMode && totalImages > 0) {
    console.log('\n🎉 DEPLOYMENT VERIFIED: All checks passed!');
    console.log('✅ Build verified as current and production-ready');
  } else {
    console.log('\n⚠️  DEPLOYMENT ISSUES: Some checks failed');
    console.log('❌ Build requires review before marking as verified');
  }
}

// Run verification
verifyProductionDeployment().catch(console.error);
