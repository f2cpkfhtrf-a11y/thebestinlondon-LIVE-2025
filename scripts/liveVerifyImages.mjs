import fs from 'fs';
import path from 'path';

const LIVE_URL = 'https://www.thebestinlondon.co.uk';
const TEST_ROUTES = [
  '/',
  '/cuisines', 
  '/areas',
  '/best-halal-restaurants-london',
  '/restaurants'
];

const verificationResults = {
  timestamp: new Date().toISOString(),
  baseUrl: LIVE_URL,
  routes: {},
  summary: {
    totalRoutes: 0,
    successRoutes: 0,
    failedRoutes: 0,
    imageIssues: []
  }
};

async function testRoute(route) {
  const url = `${LIVE_URL}${route}`;
  console.log(`🔍 Testing route: ${route}`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    const status = response.status;
    const html = await response.text();
    
    // Check for external image URLs (should be none)
    const externalImagePatterns = [
      /images\.unsplash\.com/g,
      /googleusercontent\.com/g,
      /http:\/\/(?!.*thebestinlondon\.co\.uk)/g,
      /https:\/\/(?!.*thebestinlondon\.co\.uk)/g
    ];
    
    const externalImages = [];
    externalImagePatterns.forEach(pattern => {
      const matches = html.match(pattern);
      if (matches) {
        externalImages.push(...matches);
      }
    });
    
    // Look for versioned image URLs (cache busting)
    const versionedPattern = /\?v=\d+/g;
    const versionedImages = html.match(versionedPattern) || [];
    
    // Check for image-loading issues
    const imageIssues = [];
    if (externalImages.length > 0) {
      imageIssues.push(`External images found: ${externalImages.join(', ')}`);
    }
    
    const routeResult = {
      url,
      status,
      success: status === 200,
      versionedImages: versionedImages.length,
      externalImages: externalImages.length,
      issues: imageIssues
    };
    
    verificationResults.routes[route] = routeResult;
    
    if (status === 200) {
      console.log(`✅ ${route}: ${status} (${versionedImages.length} versioned images)`);
    } else {
      console.log(`❌ ${route}: ${status}`);
    }
    
    return routeResult;
    
  } catch (error) {
    console.log(`❌ ${route}: Network error - ${error.message}`);
    verificationResults.routes[route] = {
      url,
      success: false,
      error: error.message
    };
    return false;
  }
}

async function main() {
  console.log('🚀 Starting live image verification...\n');
  
  verificationResults.summary.totalRoutes = TEST_ROUTES.length;
  
  for (const route of TEST_ROUTES) {
    const result = await testRoute(route);
    
    if (result && result.success) {
      verificationResults.summary.successRoutes++;
    } else {
      verificationResults.summary.failedRoutes++;
    }
    
    if (result && result.issues && result.issues.length > 0) {
      verificationResults.summary.imageIssues.push({
        route,
        issues: result.issues
      });
    }
  }
  
  // Write verification report
  const reportsDir = path.join(process.cwd(), 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  
  const reportPath = path.join(reportsDir, 'live_image_verification.json');
  fs.writeFileSync(reportPath, JSON.stringify(verificationResults, null, 2));
  
  // Summary
  console.log('\n📊 VERIFICATION SUMMARY');
  console.log('=======================');
  console.log(`✅ Successful routes: ${verificationResults.summary.successRoutes}/${verificationResults.summary.totalRoutes}`);
  console.log(`❌ Failed routes: ${verificationResults.summary.failedRoutes}`);
  
  if (verificationResults.summary.imageIssues.length > 0) {
    console.log('\n⚠️  IMAGE ISSUES:');
    verificationResults.summary.imageIssues.forEach(issue => {
      console.log(`   ${issue.route}: ${issue.issues.join(', ')}`);
    });
  } else {
    console.log('\n✅ No image issues detected');
  }
  
  console.log(`\n📄 Report saved: ${reportPath}`);
  
  // Exit with appropriate code
  if (verificationResults.summary.failedRoutes > 0 || verificationResults.summary.imageIssues.length > 0) {
    console.log('\n❌ Verification failed');
    process.exit(1);
  } else {
    console.log('\n✅ Live verification successful!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('❌ Verification script failed:', error);
  process.exit(1);
});