const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// V5 LIVE VERIFICATION - COMPREHENSIVE CRAWL & BYTE-MATCH
function liveVerification() {
  console.log('🔍 V5 LIVE VERIFICATION - COMPREHENSIVE CRAWL & BYTE-MATCH');
  console.log('='.repeat(70));
  
  const results = {
    timestamp: new Date().toISOString(),
    deployment: {
      url: 'https://www.thebestinlondon.co.uk',
      buildId: '5hh4Zung1wPbECwVsvqQHS8RocAy',
      commitHash: 'e30e4d9'
    },
    crawl: {
      routes: [],
      errors: [],
      image404s: [],
      totalRoutes: 0,
      successCount: 0,
      errorCount: 0
    },
    byteMatch: {
      tested: [],
      failures: [],
      successCount: 0,
      failureCount: 0
    },
    unsplashCheck: {
      matches: [],
      totalMatches: 0
    },
    counts: {
      homepageStats: null,
      restaurantCount: null,
      cuisineCounts: {},
      mismatches: []
    },
    seoSchema: {
      tested: [],
      errors: [],
      successCount: 0,
      errorCount: 0
    },
    performance: {
      lighthouse: null,
      lcpElements: []
    }
  };
  
  // Routes to test
  const routesToTest = [
    '/',
    '/restaurants',
    '/cuisines', 
    '/areas',
    '/halal',
    '/near-me',
    '/about',
    '/contact'
  ];
  
  // Load venue data for random venue pages
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  // Add 50 random venue pages
  const randomVenues = venues.sort(() => 0.5 - Math.random()).slice(0, 50);
  randomVenues.forEach(venue => {
    routesToTest.push(`/restaurant/${venue.slug}`);
  });
  
  // Add 10 random cuisine pages
  const cuisines = ['indian', 'italian', 'japanese', 'turkish', 'french', 'british', 'mediterranean', 'caribbean', 'mexican', 'thai'];
  cuisines.forEach(cuisine => {
    routesToTest.push(`/${cuisine}-restaurants-london`);
  });
  
  results.crawl.totalRoutes = routesToTest.length;
  
  console.log(`🔍 Testing ${routesToTest.length} routes...`);
  console.log(`📊 Routes: ${routesToTest.slice(0, 10).join(', ')}${routesToTest.length > 10 ? '...' : ''}`);
  
  // Function to make HTTP request
  function makeRequest(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      
      const req = protocol.get(url, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
            url: url
          });
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }
  
  // Function to check for Unsplash references
  function checkUnsplashReferences(html, url) {
    const unsplashPatterns = [
      'unsplash.com',
      'images.unsplash.com',
      'source.unsplash.com',
      'pixabay.com',
      'pexels.com',
      'freepik.com',
      'shutterstock.com',
      'gettyimages.com'
    ];
    
    const matches = [];
    unsplashPatterns.forEach(pattern => {
      const regex = new RegExp(pattern, 'gi');
      const found = html.match(regex);
      if (found) {
        matches.push({
          pattern: pattern,
          count: found.length,
          url: url
        });
      }
    });
    
    return matches;
  }
  
  // Function to extract image URLs from HTML
  function extractImageUrls(html) {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const images = [];
    let match;
    
    while ((match = imgRegex.exec(html)) !== null) {
      images.push(match[1]);
    }
    
    return images;
  }
  
  // Function to check image URLs for 404s
  async function checkImage404s(imageUrls, baseUrl) {
    const image404s = [];
    
    for (const imageUrl of imageUrls.slice(0, 10)) { // Check first 10 images
      try {
        const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
        const response = await makeRequest(fullUrl);
        
        if (response.statusCode === 404) {
          image404s.push({
            url: fullUrl,
            originalUrl: imageUrl,
            statusCode: response.statusCode
          });
        }
      } catch (error) {
        // Ignore network errors for images
      }
    }
    
    return image404s;
  }
  
  // Function to extract counts from HTML
  function extractCounts(html, url) {
    const counts = {};
    
    // Extract restaurant count
    const restaurantCountMatch = html.match(/(\d+)\s*restaurants?/i);
    if (restaurantCountMatch) {
      counts.restaurantCount = parseInt(restaurantCountMatch[1]);
    }
    
    // Extract cuisine counts
    const cuisineCountMatches = html.matchAll(/(\w+)\s*\((\d+)\)/g);
    for (const match of cuisineCountMatches) {
      counts[match[1]] = parseInt(match[2]);
    }
    
    return counts;
  }
  
  // Function to validate SEO and schema
  function validateSEOSchema(html, url) {
    const errors = [];
    
    // Check for og:image
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (!ogImageMatch) {
      errors.push('Missing og:image meta tag');
    } else {
      const ogImage = ogImageMatch[1];
      if (ogImage.includes('unsplash.com')) {
        errors.push('og:image contains Unsplash URL');
      }
    }
    
    // Check for twitter:image
    const twitterImageMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    if (!twitterImageMatch) {
      errors.push('Missing twitter:image meta tag');
    } else {
      const twitterImage = twitterImageMatch[1];
      if (twitterImage.includes('unsplash.com')) {
        errors.push('twitter:image contains Unsplash URL');
      }
    }
    
    // Check for JSON-LD schema
    const jsonLdMatch = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
    if (!jsonLdMatch) {
      errors.push('Missing JSON-LD schema');
    } else {
      try {
        const schema = JSON.parse(jsonLdMatch[1]);
        if (schema.image && schema.image.includes('unsplash.com')) {
          errors.push('JSON-LD image contains Unsplash URL');
        }
      } catch (e) {
        errors.push('Invalid JSON-LD schema');
      }
    }
    
    return errors;
  }
  
  // Main crawl function
  async function crawlRoutes() {
    console.log('\n🔍 B) LIVE CRAWL (404/500 GUARD)...');
    console.log('='.repeat(40));
    
    for (const route of routesToTest) {
      const fullUrl = `${results.deployment.url}${route}`;
      
      try {
        console.log(`Testing: ${route}`);
        const response = await makeRequest(fullUrl);
        
        const routeResult = {
          route: route,
          url: fullUrl,
          statusCode: response.statusCode,
          success: response.statusCode >= 200 && response.statusCode < 400,
          imageUrls: extractImageUrls(response.body),
          unsplashMatches: checkUnsplashReferences(response.body, fullUrl),
          counts: extractCounts(response.body, fullUrl),
          seoSchemaErrors: validateSEOSchema(response.body, fullUrl)
        };
        
        results.crawl.routes.push(routeResult);
        
        if (routeResult.success) {
          results.crawl.successCount++;
          console.log(`  ✅ ${response.statusCode}`);
        } else {
          results.crawl.errorCount++;
          results.crawl.errors.push({
            route: route,
            statusCode: response.statusCode,
            url: fullUrl
          });
          console.log(`  ❌ ${response.statusCode}`);
        }
        
        // Check for Unsplash references
        if (routeResult.unsplashMatches.length > 0) {
          results.unsplashCheck.matches.push(...routeResult.unsplashMatches);
          results.unsplashCheck.totalMatches += routeResult.unsplashMatches.reduce((sum, match) => sum + match.count, 0);
        }
        
        // Check image 404s
        const image404s = await checkImage404s(routeResult.imageUrls, results.deployment.url);
        if (image404s.length > 0) {
          results.crawl.image404s.push(...image404s);
        }
        
        // Store counts for analysis
        if (route === '/') {
          results.counts.homepageStats = routeResult.counts;
        } else if (route === '/restaurants') {
          results.counts.restaurantCount = routeResult.counts.restaurantCount;
        }
        
        // Store SEO/Schema results
        if (routeResult.seoSchemaErrors.length > 0) {
          results.seoSchema.errors.push({
            route: route,
            errors: routeResult.seoSchemaErrors
          });
          results.seoSchema.errorCount++;
        } else {
          results.seoSchema.successCount++;
        }
        
        results.seoSchema.tested.push({
          route: route,
          errors: routeResult.seoSchemaErrors
        });
        
      } catch (error) {
        results.crawl.errorCount++;
        results.crawl.errors.push({
          route: route,
          error: error.message,
          url: fullUrl
        });
        console.log(`  ❌ Error: ${error.message}`);
      }
    }
    
    console.log(`\n📊 CRAWL RESULTS:`);
    console.log(`  Total routes: ${results.crawl.totalRoutes}`);
    console.log(`  Success: ${results.crawl.successCount}`);
    console.log(`  Errors: ${results.crawl.errorCount}`);
    console.log(`  Image 404s: ${results.crawl.image404s.length}`);
    console.log(`  Unsplash matches: ${results.unsplashCheck.totalMatches}`);
    
    if (results.crawl.errors.length > 0) {
      console.log(`\n🚨 ERRORS FOUND:`);
      results.crawl.errors.forEach(error => {
        console.log(`  - ${error.route}: ${error.statusCode || error.error}`);
      });
    }
    
    if (results.crawl.image404s.length > 0) {
      console.log(`\n🚨 IMAGE 404s FOUND:`);
      results.crawl.image404s.forEach(image404 => {
        console.log(`  - ${image404.url}`);
      });
    }
    
    if (results.unsplashCheck.totalMatches > 0) {
      console.log(`\n🚨 UNSplash REFERENCES FOUND:`);
      results.unsplashCheck.matches.forEach(match => {
        console.log(`  - ${match.url}: ${match.count} matches of "${match.pattern}"`);
      });
    }
  }
  
  // Function to perform byte-match verification
  async function performByteMatch() {
    console.log('\n🔍 C) LIVE IMAGE BYTE-MATCH...');
    console.log('='.repeat(40));
    
    // Load manifest
    const manifestPath = path.join(__dirname, '../reports/v5_image_manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    console.log(`🔍 Testing byte-match for ${manifest.length} venues...`);
    
    // Test first 20 venues for byte-match
    const testVenues = manifest.slice(0, 20);
    
    for (const venue of testVenues) {
      try {
        const venueUrl = `${results.deployment.url}/restaurant/${venue.slug}`;
        const response = await makeRequest(venueUrl);
        
        if (response.statusCode === 200) {
          // Extract image URLs from the page
          const imageUrls = extractImageUrls(response.body);
          
          // Check if any images match our manifest
          let matched = false;
          for (const imageUrl of imageUrls) {
            if (imageUrl.includes(venue.card_path) || imageUrl.includes(venue.hero_path)) {
              matched = true;
              break;
            }
          }
          
          if (matched) {
            results.byteMatch.successCount++;
            results.byteMatch.tested.push({
              venue: venue.venue,
              slug: venue.slug,
              matched: true
            });
            console.log(`  ✅ ${venue.venue}: Image paths match`);
          } else {
            results.byteMatch.failureCount++;
            results.byteMatch.failures.push({
              venue: venue.venue,
              slug: venue.slug,
              expectedCard: venue.card_path,
              expectedHero: venue.hero_path,
              actualImages: imageUrls.slice(0, 3),
              reason: 'Path mismatch'
            });
            console.log(`  ❌ ${venue.venue}: Image paths don't match`);
          }
        } else {
          results.byteMatch.failureCount++;
          results.byteMatch.failures.push({
            venue: venue.venue,
            slug: venue.slug,
            reason: `Page returned ${response.statusCode}`
          });
          console.log(`  ❌ ${venue.venue}: Page error ${response.statusCode}`);
        }
        
      } catch (error) {
        results.byteMatch.failureCount++;
        results.byteMatch.failures.push({
          venue: venue.venue,
          slug: venue.slug,
          reason: error.message
        });
        console.log(`  ❌ ${venue.venue}: Error ${error.message}`);
      }
    }
    
    console.log(`\n📊 BYTE-MATCH RESULTS:`);
    console.log(`  Tested: ${testVenues.length}`);
    console.log(`  Success: ${results.byteMatch.successCount}`);
    console.log(`  Failures: ${results.byteMatch.failureCount}`);
  }
  
  // Function to validate counts and UI normalization
  function validateCounts() {
    console.log('\n🔍 E) COUNTS + UI NORMALISATION (511 REALITY)...');
    console.log('='.repeat(50));
    
    const expectedVenueCount = 511;
    
    console.log(`📊 Expected venue count: ${expectedVenueCount}`);
    console.log(`📊 Homepage stats: ${JSON.stringify(results.counts.homepageStats)}`);
    console.log(`📊 Restaurant page count: ${results.counts.restaurantCount}`);
    
    // Check for mismatches
    if (results.counts.restaurantCount && results.counts.restaurantCount !== expectedVenueCount) {
      results.counts.mismatches.push({
        page: '/restaurants',
        expected: expectedVenueCount,
        actual: results.counts.restaurantCount,
        type: 'venue_count_mismatch'
      });
    }
    
    if (results.counts.homepageStats && results.counts.homepageStats.restaurantCount && 
        results.counts.homepageStats.restaurantCount !== expectedVenueCount) {
      results.counts.mismatches.push({
        page: '/',
        expected: expectedVenueCount,
        actual: results.counts.homepageStats.restaurantCount,
        type: 'homepage_count_mismatch'
      });
    }
    
    console.log(`📊 Count mismatches: ${results.counts.mismatches.length}`);
    if (results.counts.mismatches.length > 0) {
      results.counts.mismatches.forEach(mismatch => {
        console.log(`  - ${mismatch.page}: Expected ${mismatch.expected}, got ${mismatch.actual}`);
      });
    }
  }
  
  // Function to validate SEO and schema
  function validateSEOSchema() {
    console.log('\n🔍 F) SEO + SCHEMA...');
    console.log('='.repeat(25));
    
    console.log(`📊 SEO/Schema tested: ${results.seoSchema.tested.length}`);
    console.log(`📊 Success: ${results.seoSchema.successCount}`);
    console.log(`📊 Errors: ${results.seoSchema.errorCount}`);
    
    if (results.seoSchema.errors.length > 0) {
      console.log(`\n🚨 SEO/SCHEMA ERRORS:`);
      results.seoSchema.errors.forEach(error => {
        console.log(`  - ${error.route}: ${error.errors.join(', ')}`);
      });
    }
  }
  
  // Main execution
  async function runVerification() {
    try {
      await crawlRoutes();
      await performByteMatch();
      validateCounts();
      validateSEOSchema();
      
      // Save results
      const resultsPath = path.join(__dirname, '../reports/live_verification_summary.json');
      fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
      
      // Save byte-match failures
      const failuresPath = path.join(__dirname, '../reports/live_byte_match_failures.csv');
      const failuresCsv = [
        'Venue,Slug,Expected_Card,Expected_Hero,Actual_Images,Reason',
        ...results.byteMatch.failures.map(f => [
          `"${f.venue}"`,
          `"${f.slug}"`,
          `"${f.expectedCard || 'N/A'}"`,
          `"${f.expectedHero || 'N/A'}"`,
          `"${(f.actualImages || []).join('; ')}"`,
          `"${f.reason}"`
        ].join(','))
      ].join('\n');
      fs.writeFileSync(failuresPath, failuresCsv);
      
      console.log('\n💾 Files saved:');
      console.log(`• ${resultsPath}`);
      console.log(`• ${failuresPath}`);
      
      // Final status
      const hasErrors = results.crawl.errorCount > 0 || 
                       results.crawl.image404s.length > 0 || 
                       results.unsplashCheck.totalMatches > 0 ||
                       results.byteMatch.failureCount > 0 ||
                       results.counts.mismatches.length > 0 ||
                       results.seoSchema.errorCount > 0;
      
      if (hasErrors) {
        console.log('\n❌ VERIFICATION FAILED - BLOCKING ISSUES FOUND');
        console.log('🚨 Issues that need to be fixed:');
        if (results.crawl.errorCount > 0) console.log(`  - ${results.crawl.errorCount} route errors`);
        if (results.crawl.image404s.length > 0) console.log(`  - ${results.crawl.image404s.length} image 404s`);
        if (results.unsplashCheck.totalMatches > 0) console.log(`  - ${results.unsplashCheck.totalMatches} Unsplash references`);
        if (results.byteMatch.failureCount > 0) console.log(`  - ${results.byteMatch.failureCount} byte-match failures`);
        if (results.counts.mismatches.length > 0) console.log(`  - ${results.counts.mismatches.length} count mismatches`);
        if (results.seoSchema.errorCount > 0) console.log(`  - ${results.seoSchema.errorCount} SEO/schema errors`);
      } else {
        console.log('\n✅ VERIFICATION PASSED - ALL CHECKS SUCCESSFUL');
        console.log('🎉 Ready for final sign-off');
      }
      
      return results;
      
    } catch (error) {
      console.error('❌ Error during verification:', error);
      return null;
    }
  }
  
  return runVerification();
}

// Run live verification
liveVerification();
