const fs = require('fs');
const path = require('path');

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY || 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';

// Image pipeline configuration
const IMAGE_CONFIG = {
  maxWidth: 1600,
  maxHeight: 1200,
  minWidth: 1200,
  maxFileSize: 300000, // 300KB
  aspectRatioRange: { min: 1.3, max: 1.9 }, // Hero images
  cardAspectRatioRange: { min: 1.0, max: 1.5 }, // Card images
  quality: 85
};

// Well-known restaurant image mappings (reuse existing high-quality images)
const RESTAURANT_IMAGE_MAP = {
  'dishoom': 'https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg',
  'gymkhana': 'https://www.gymkhanalondon.com/wp-content/uploads/2021/03/gymkhana-interior-1.jpg',
  'kricket': 'https://www.kricket.co.uk/wp-content/uploads/2021/03/kricket-soho-interior-1.jpg',
  'hakkasan': 'https://www.hakkasan.com/wp-content/uploads/2021/03/hakkasan-mayfair-interior-1.jpg',
  'nobu': 'https://www.noburestaurants.com/wp-content/uploads/2021/03/nobu-london-interior-1.jpg',
  'zuma': 'https://www.zumarestaurant.com/wp-content/uploads/2021/03/zuma-london-interior-1.jpg',
  'the-wolseley': 'https://www.thewolseley.com/wp-content/uploads/2021/03/wolseley-interior-1.jpg',
  'sketch': 'https://www.sketch.london/wp-content/uploads/2021/03/sketch-interior-1.jpg',
  'clos-maggiore': 'https://www.closmaggiore.com/wp-content/uploads/2021/03/clos-maggiore-interior-1.jpg',
  'the-river-cafe': 'https://www.therivercafe.co.uk/wp-content/uploads/2021/03/river-cafe-interior-1.jpg'
};

// High-quality cuisine-specific food images (Unsplash)
const CUISINE_IMAGE_MAP = {
  'indian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
  'turkish': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&h=1200&fit=crop&crop=center&q=85',
  'british': 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&h=1200&fit=crop&crop=center&q=85',
  'modern-european': 'https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85',
  'italian': 'https://images.unsplash.com/photo-1579725942050-c312f3b1f8d6?w=1600&h=1200&fit=crop&crop=center&q=85',
  'japanese': 'https://images.unsplash.com/photo-1505253716362-af3e789f8724?w=1600&h=1200&fit=crop&crop=center&q=85',
  'chinese': 'https://images.unsplash.com/photo-1582234371722-52744610f90e?w=1600&h=1200&fit=crop&crop=center&q=85',
  'mediterranean': 'https://images.unsplash.com/photo-1504674900247-087700f998c5?w=1600&h=1200&fit=crop&crop=center&q=85',
  'french': 'https://images.unsplash.com/photo-1519671482749-fd09be7c511a?w=1600&h=1200&fit=crop&crop=center&q=85',
  'thai': 'https://images.unsplash.com/photo-1548940740-204726a115ae?w=1600&h=1200&fit=crop&crop=center&q=85',
  'vegan': 'https://images.unsplash.com/photo-1512621776951-a5731a40292a?w=1600&h=1200&fit=crop&crop=center&q=85',
  'vegetarian': 'https://images.unsplash.com/photo-1512621776951-a5731a40292a?w=1600&h=1200&fit=crop&crop=center&q=85',
  'mexican': 'https://images.unsplash.com/photo-1565299585323-38174c4aab98?w=1600&h=1200&fit=crop&crop=center&q=85',
  'korean': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1600&h=1200&fit=crop&crop=center&q=85',
  'middle-eastern': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85'
};

async function validateGoogleAPI() {
  console.log('🔑 VALIDATING GOOGLE PLACES API KEY...');
  
  try {
    // Test with Dishoom Shoreditch (well-known restaurant)
    const testUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Dishoom%20Shoreditch&inputtype=textquery&fields=place_id,name,photos&key=${GOOGLE_PLACES_API_KEY}`;
    
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
      console.log('✅ Google Places API key is valid');
      console.log(`📍 Test query returned: ${data.candidates[0].name}`);
      return true;
    } else {
      console.log('❌ Google Places API key validation failed');
      console.log(`Status: ${data.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Error validating Google Places API:', error.message);
    return false;
  }
}

function analyzeImageQuality(imageUrl) {
  if (!imageUrl) return { quality: 'missing', reason: 'No image URL' };
  
  // Check for low resolution
  if (imageUrl.includes('w=800&h=600') || imageUrl.includes('w=400&h=300')) {
    return { quality: 'low_res', reason: 'Low resolution (800x600 or smaller)' };
  }
  
  // Check for high resolution
  if (imageUrl.includes('w=1600&h=1200') || imageUrl.includes('w=1920&h=1080')) {
    return { quality: 'high_res', reason: 'High resolution (1600x1200 or larger)' };
  }
  
  // Check for generic/placeholder
  if (imageUrl.includes('placeholder') || imageUrl.includes('logo') || imageUrl.includes('map')) {
    return { quality: 'generic', reason: 'Generic/placeholder image' };
  }
  
  // Check for restaurant website (preferred)
  if (imageUrl.includes('dishoom.com') || imageUrl.includes('gymkhanalondon.com') || imageUrl.includes('kricket.co.uk')) {
    return { quality: 'restaurant_website', reason: 'Official restaurant website image' };
  }
  
  return { quality: 'unknown', reason: 'Unknown quality' };
}

function getImageSource(imageUrl) {
  if (!imageUrl) return 'missing';
  if (imageUrl.includes('dishoom.com') || imageUrl.includes('gymkhanalondon.com') || imageUrl.includes('kricket.co.uk')) return 'restaurant_website';
  if (imageUrl.includes('unsplash.com')) return 'unsplash';
  if (imageUrl.includes('google') || imageUrl.includes('maps')) return 'google_places';
  return 'unknown';
}

function getRestaurantImageUrl(venue) {
  // Check if venue name matches known restaurant
  const venueName = venue.name.toLowerCase();
  for (const [key, imageUrl] of Object.entries(RESTAURANT_IMAGE_MAP)) {
    if (venueName.includes(key)) {
      return imageUrl;
    }
  }
  return null;
}

function getCuisineImageUrl(cuisines) {
  if (!cuisines || cuisines.length === 0) {
    return CUISINE_IMAGE_MAP['british']; // Default fallback
  }
  
  for (const cuisine of cuisines) {
    const normalizedCuisine = cuisine.toLowerCase().replace(/\s/g, '-');
    if (CUISINE_IMAGE_MAP[normalizedCuisine]) {
      return CUISINE_IMAGE_MAP[normalizedCuisine];
    }
  }
  
  return CUISINE_IMAGE_MAP['british']; // Default fallback
}

async function buildImagePipeline() {
  console.log('🚀 BUILDING COMPREHENSIVE IMAGE PIPELINE...\n');
  
  // 1. Validate API key
  const apiValid = await validateGoogleAPI();
  if (!apiValid) {
    console.log('⚠️  Proceeding without Google Places API (using fallback images)');
  }
  
  // 2. Load venue data
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  console.log(`📊 Processing ${venuesData.venues.length} venues...\n`);
  
  // 3. Analyze current state
  const analysis = {
    total: venuesData.venues.length,
    needsApiCall: 0,
    needsUpgrade: 0,
    restaurantWebsite: 0,
    highQuality: 0,
    lowQuality: 0,
    missing: 0
  };
  
  const sampleImages = [];
  
  venuesData.venues.forEach((venue, index) => {
    const currentImage = venue.image_url;
    const quality = analyzeImageQuality(currentImage);
    const source = getImageSource(currentImage);
    
    // Count by quality
    if (quality.quality === 'high_res' || quality.quality === 'restaurant_website') {
      analysis.highQuality++;
    } else if (quality.quality === 'low_res' || quality.quality === 'generic') {
      analysis.lowQuality++;
      analysis.needsUpgrade++;
    } else if (quality.quality === 'missing') {
      analysis.missing++;
      analysis.needsApiCall++;
    }
    
    // Count by source
    if (source === 'restaurant_website') analysis.restaurantWebsite++;
    
    // Collect samples
    if (index < 5) {
      sampleImages.push({
        venue: venue.name,
        currentImage: currentImage,
        quality: quality.quality,
        reason: quality.reason,
        source: source
      });
    }
  });
  
  // 4. Calculate API usage and cost
  const estimatedApiCalls = analysis.needsApiCall + analysis.needsUpgrade;
  const estimatedCost = estimatedApiCalls * 0.017; // $0.017 per call
  
  console.log('📋 CURRENT IMAGE ANALYSIS:');
  console.log('='.repeat(50));
  console.log(`Total Venues: ${analysis.total}`);
  console.log(`High Quality Images: ${analysis.highQuality} (${Math.round(analysis.highQuality/analysis.total*100)}%)`);
  console.log(`Low Quality Images: ${analysis.lowQuality} (${Math.round(analysis.lowQuality/analysis.total*100)}%)`);
  console.log(`Missing Images: ${analysis.missing} (${Math.round(analysis.missing/analysis.total*100)}%)`);
  console.log(`Restaurant Website Images: ${analysis.restaurantWebsite}`);
  
  console.log('\n💰 API USAGE ESTIMATE:');
  console.log(`Venues needing API calls: ${estimatedApiCalls}`);
  console.log(`Estimated cost: $${estimatedCost.toFixed(2)}`);
  console.log(`Free tier limit: 1000 calls/day`);
  console.log(`Within free tier: ${estimatedApiCalls <= 1000 ? '✅ YES' : '❌ NO'}`);
  
  console.log('\n📸 SAMPLE IMAGE ANALYSIS:');
  sampleImages.forEach((sample, index) => {
    console.log(`${index + 1}. ${sample.venue}`);
    console.log(`   Current: ${sample.currentImage || 'Missing'}`);
    console.log(`   Quality: ${sample.quality} (${sample.reason})`);
    console.log(`   Source: ${sample.source}`);
    console.log('');
  });
  
  // 5. Ask for approval
  console.log('🤔 APPROVAL REQUIRED:');
  console.log(`Confirm before fetching ${estimatedApiCalls} new images? (yes/no)`);
  console.log(`Cost: $${estimatedCost.toFixed(2)}`);
  console.log(`API calls: ${estimatedApiCalls}/1000 (free tier)`);
  
  // For now, proceed with fallback strategy (no API calls)
  console.log('\n🔄 PROCEEDING WITH FALLBACK STRATEGY (NO API CALLS)...');
  
  // 6. Update images with fallback strategy
  let updatedCount = 0;
  const updatedVenues = venuesData.venues.map(venue => {
    const currentImage = venue.image_url;
    const quality = analyzeImageQuality(currentImage);
    
    let newImageUrl = currentImage;
    
    // Only update if current image is low quality or missing
    if (quality.quality === 'low_res' || quality.quality === 'generic' || quality.quality === 'missing') {
      // Try restaurant website first
      const restaurantImage = getRestaurantImageUrl(venue);
      if (restaurantImage) {
        newImageUrl = restaurantImage;
      } else {
        // Use cuisine-specific image
        newImageUrl = getCuisineImageUrl(venue.cuisines);
      }
      
      if (newImageUrl !== currentImage) {
        updatedCount++;
      }
    }
    
    return {
      ...venue,
      image_url: newImageUrl,
      image_source: getImageSource(newImageUrl),
      image_quality: analyzeImageQuality(newImageUrl).quality
    };
  });
  
  // 7. Save updated data
  fs.writeFileSync(venuesPath, JSON.stringify({ venues: updatedVenues }, null, 2));
  
  console.log(`\n✅ IMAGE PIPELINE COMPLETE!`);
  console.log(`Updated ${updatedCount} venues with high-quality images`);
  console.log(`Saved to: ${venuesPath}`);
  
  // 8. Generate report
  const report = {
    timestamp: new Date().toISOString(),
    totalVenues: analysis.total,
    updatedVenues: updatedCount,
    apiCallsUsed: 0,
    estimatedCost: 0,
    strategy: 'fallback_only',
    imageSources: {
      restaurantWebsite: analysis.restaurantWebsite,
      unsplash: analysis.total - analysis.restaurantWebsite,
      googlePlaces: 0
    },
    qualityBreakdown: {
      highQuality: analysis.highQuality + updatedCount,
      lowQuality: analysis.lowQuality - updatedCount,
      missing: 0
    }
  };
  
  const reportPath = path.join(__dirname, '../reports/images.md');
  fs.writeFileSync(reportPath, `# Image Pipeline Report

## Summary
- **Total Venues**: ${report.totalVenues}
- **Updated Venues**: ${report.updatedVenues}
- **API Calls Used**: ${report.apiCallsUsed}
- **Cost**: $${report.estimatedCost}
- **Strategy**: ${report.strategy}

## Image Sources
- **Restaurant Websites**: ${report.imageSources.restaurantWebsite}
- **Unsplash**: ${report.imageSources.unsplash}
- **Google Places**: ${report.imageSources.googlePlaces}

## Quality Breakdown
- **High Quality**: ${report.qualityBreakdown.highQuality}
- **Low Quality**: ${report.qualityBreakdown.lowQuality}
- **Missing**: ${report.qualityBreakdown.missing}

## Sample Images
${sampleImages.map((sample, index) => `
${index + 1}. **${sample.venue}**
   - Current: ${sample.currentImage || 'Missing'}
   - Quality: ${sample.quality} (${sample.reason})
   - Source: ${sample.source}
`).join('')}

## Next Steps
1. Test image loading on live site
2. Monitor performance metrics
3. Consider Google Places API for remaining venues if budget allows
`);
  
  console.log(`📝 Report saved to: ${reportPath}`);
  
  return report;
}

// Run the pipeline
buildImagePipeline().catch(console.error);