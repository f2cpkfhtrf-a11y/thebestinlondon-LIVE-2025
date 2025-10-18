const fs = require('fs');
const path = require('path');

// Scan for existing assets and analyze current image usage
function scanExistingAssets() {
  console.log('🔍 SCANNING FOR EXISTING ASSETS...\n');
  
  const results = {
    localImages: [],
    venueImages: [],
    totalVenues: 0,
    venuesWithImages: 0,
    imageSources: {
      restaurantWebsite: 0,
      unsplash: 0,
      googlePlaces: 0,
      missing: 0
    },
    imageQuality: {
      highRes: 0,
      lowRes: 0,
      generic: 0,
      logo: 0
    }
  };

  // 1. Scan local image directories
  const imageDirs = [
    'public/images/venues',
    'public/assets',
    'public/static',
    'public/images'
  ];

  imageDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`📁 Scanning ${dir}...`);
      scanDirectory(dir, results.localImages);
    }
  });

  // 2. Analyze venue data
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  results.totalVenues = venuesData.venues.length;
  console.log(`\n📊 ANALYZING ${results.totalVenues} VENUES...\n`);

  venuesData.venues.forEach((venue, index) => {
    if (venue.image_url) {
      results.venuesWithImages++;
      
      // Categorize image sources
      if (venue.image_url.includes('dishoom.com') || 
          venue.image_url.includes('gymkhanalondon.com') ||
          venue.image_url.includes('kricket.co.uk')) {
        results.imageSources.restaurantWebsite++;
      } else if (venue.image_url.includes('unsplash.com')) {
        results.imageSources.unsplash++;
      } else if (venue.image_url.includes('google') || venue.image_url.includes('maps')) {
        results.imageSources.googlePlaces++;
      }

      // Analyze image quality
      if (venue.image_url.includes('w=800&h=600')) {
        results.imageQuality.lowRes++;
      } else if (venue.image_url.includes('w=1600&h=1200')) {
        results.imageQuality.highRes++;
      } else if (venue.image_url.includes('placeholder') || venue.image_url.includes('logo')) {
        results.imageQuality.logo++;
      } else {
        results.imageQuality.generic++;
      }
    } else {
      results.imageSources.missing++;
    }
  });

  // 3. Generate report
  console.log('📋 ASSET SCAN RESULTS:');
  console.log('='.repeat(50));
  console.log(`Total Venues: ${results.totalVenues}`);
  console.log(`Venues with Images: ${results.venuesWithImages} (${Math.round(results.venuesWithImages/results.totalVenues*100)}%)`);
  console.log(`Missing Images: ${results.imageSources.missing} (${Math.round(results.imageSources.missing/results.totalVenues*100)}%)`);
  console.log('\n📸 IMAGE SOURCES:');
  console.log(`Restaurant Websites: ${results.imageSources.restaurantWebsite}`);
  console.log(`Unsplash: ${results.imageSources.unsplash}`);
  console.log(`Google Places: ${results.imageSources.googlePlaces}`);
  console.log(`Missing: ${results.imageSources.missing}`);
  
  console.log('\n🎯 IMAGE QUALITY:');
  console.log(`High Res (≥1600px): ${results.imageQuality.highRes}`);
  console.log(`Low Res (<1000px): ${results.imageQuality.lowRes}`);
  console.log(`Generic/Placeholder: ${results.imageQuality.generic}`);
  console.log(`Logo/White: ${results.imageQuality.logo}`);

  // 4. Calculate API usage estimate
  const needsApiCall = results.imageSources.missing + results.imageQuality.lowRes + results.imageQuality.logo;
  console.log(`\n💰 API USAGE ESTIMATE:`);
  console.log(`Venues needing API calls: ${needsApiCall}`);
  console.log(`Estimated cost: ${needsApiCall} calls × $0.017 = $${(needsApiCall * 0.017).toFixed(2)}`);
  console.log(`Free tier limit: 1000 calls/day`);
  console.log(`Within free tier: ${needsApiCall <= 1000 ? '✅ YES' : '❌ NO'}`);

  // 5. Save results
  const reportPath = path.join(__dirname, '../reports/baseline.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${reportPath}`);

  return results;
}

function scanDirectory(dir, results) {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
      if (file.isDirectory()) {
        scanDirectory(path.join(dir, file.name), results);
      } else if (file.isFile() && /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name)) {
        const filePath = path.join(dir, file.name);
        const stats = fs.statSync(filePath);
        results.push({
          path: filePath,
          filename: file.name,
          size: stats.size,
          modified: stats.mtime
        });
      }
    });
  } catch (error) {
    console.log(`⚠️  Could not scan ${dir}: ${error.message}`);
  }
}

// Run the scan
scanExistingAssets();
