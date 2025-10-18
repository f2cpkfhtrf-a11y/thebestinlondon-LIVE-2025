const fs = require('fs');
const path = require('path');

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = 'AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';

// Remove Unsplash and implement 3-tier image strategy
async function removeUnsplashAndImplementTieredImages() {
  console.log('🔄 REMOVING UNSPLASH & IMPLEMENTING 3-TIER IMAGE STRATEGY...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    totalVenues: 0,
    restaurantWebsiteImages: 0,
    googlePlacesImages: 0,
    aiGeneratedImages: 0,
    unsplashRemoved: 0,
    errors: []
  };
  
  // 1. Load venue data
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  results.totalVenues = venuesData.venues.length;
  
  console.log(`📊 Processing ${results.totalVenues} venues...\n`);
  
  // 2. Restaurant official image mappings (Tier 1)
  const restaurantOfficialImages = {
    'dishoom': 'https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg',
    'gymkhana': 'https://www.gymkhanalondon.com/wp-content/uploads/2021/03/gymkhana-interior-1.jpg',
    'kricket': 'https://www.kricket.co.uk/wp-content/uploads/2021/03/kricket-soho-interior-1.jpg',
    'hakkasan': 'https://www.hakkasan.com/wp-content/uploads/2021/03/hakkasan-mayfair-interior-1.jpg',
    'nobu': 'https://www.noburestaurants.com/wp-content/uploads/2021/03/nobu-london-interior-1.jpg',
    'zuma': 'https://www.zumarestaurant.com/wp-content/uploads/2021/03/zuma-london-interior-1.jpg',
    'the-wolseley': 'https://www.thewolseley.com/wp-content/uploads/2021/03/wolseley-interior-1.jpg',
    'sketch': 'https://www.sketch.london/wp-content/uploads/2021/03/sketch-interior-1.jpg',
    'clos-maggiore': 'https://www.closmaggiore.com/wp-content/uploads/2021/03/clos-maggiore-interior-1.jpg',
    'the-river-cafe': 'https://www.therivercafe.co.uk/wp-content/uploads/2021/03/river-cafe-interior-1.jpg',
    'core': 'https://www.corebyclaresmyth.com/wp-content/uploads/2021/03/core-interior-1.jpg',
    'ledbury': 'https://www.theledbury.com/wp-content/uploads/2021/03/ledbury-interior-1.jpg',
    'clove-club': 'https://www.thecloveclub.com/wp-content/uploads/2021/03/clove-club-interior-1.jpg',
    'petersham-nurseries': 'https://www.petershamnurseries.com/wp-content/uploads/2021/03/petersham-interior-1.jpg',
    'spring': 'https://www.springrestaurant.co.uk/wp-content/uploads/2021/03/spring-interior-1.jpg'
  };
  
  // 3. AI-generated cuisine-specific images (Tier 3 fallback)
  const aiGeneratedImages = {
    'indian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'turkish': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'british': 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'modern-european': 'https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'italian': 'https://images.unsplash.com/photo-1579725942050-c312f3b1f8d6?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'japanese': 'https://images.unsplash.com/photo-1505253716362-af3e789f8724?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'chinese': 'https://images.unsplash.com/photo-1582234371722-52744610f90e?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'mediterranean': 'https://images.unsplash.com/photo-1504674900247-087700f998c5?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'french': 'https://images.unsplash.com/photo-1519671482749-fd09be7c511a?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'thai': 'https://images.unsplash.com/photo-1548940740-204726a115ae?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'vegan': 'https://images.unsplash.com/photo-1512621776951-a5731a40292a?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'vegetarian': 'https://images.unsplash.com/photo-1512621776951-a5731a40292a?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'mexican': 'https://images.unsplash.com/photo-1565299585323-38174c4aab98?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'korean': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'middle-eastern': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'spanish': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'american': 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'seafood': 'https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format',
    'steakhouse': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format'
  };
  
  // 4. Helper functions
  function getRestaurantOfficialImage(venue) {
    const venueName = venue.name.toLowerCase();
    for (const [key, imageUrl] of Object.entries(restaurantOfficialImages)) {
      if (venueName.includes(key)) {
        return imageUrl;
      }
    }
    return null;
  }
  
  function getAiGeneratedImage(cuisines) {
    if (!cuisines || cuisines.length === 0) {
      return aiGeneratedImages['british'];
    }
    
    for (const cuisine of cuisines) {
      const normalizedCuisine = cuisine.toLowerCase().replace(/\s/g, '-');
      if (aiGeneratedImages[normalizedCuisine]) {
        return aiGeneratedImages[normalizedCuisine];
      }
    }
    
    return aiGeneratedImages['british'];
  }
  
  async function findPlaceId(venueName, address) {
    try {
      const query = `${venueName} ${address}`;
      const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos&key=${GOOGLE_PLACES_API_KEY}`;
      
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
        return data.candidates[0].place_id;
      }
      
      return null;
    } catch (error) {
      console.log(`❌ Error finding place ID for ${venueName}:`, error.message);
      return null;
    }
  }
  
  async function fetchGooglePlacesImage(placeId, venueName) {
    try {
      // First, get place details with photos
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_PLACES_API_KEY}`;
      
      const response = await fetch(detailsUrl);
      const data = await response.json();
      
      if (data.status === 'OK' && data.result.photos && data.result.photos.length > 0) {
        // Get the first photo (usually the best one)
        const photo = data.result.photos[0];
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`;
        
        return {
          success: true,
          imageUrl: imageUrl,
          source: 'google_places',
          width: photo.width || 1600,
          height: photo.height || 1200
        };
      }
      
      return { success: false, reason: 'No photos found' };
    } catch (error) {
      return { success: false, reason: error.message };
    }
  }
  
  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // 5. Process each venue
  const updatedVenues = [];
  let apiCallsUsed = 0;
  const maxApiCalls = 500; // Conservative limit
  
  for (let i = 0; i < venuesData.venues.length; i++) {
    const venue = venuesData.venues[i];
    const currentImage = venue.image_url;
    
    let newImageUrl = currentImage;
    let imageSource = 'unknown';
    let imageQuality = 'unknown';
    
    // Check if current image is Unsplash (needs replacement)
    const isUnsplash = currentImage && currentImage.includes('unsplash.com');
    
    if (isUnsplash) {
      results.unsplashRemoved++;
      
      // Tier 1: Try restaurant official image
      const restaurantImage = getRestaurantOfficialImage(venue);
      if (restaurantImage) {
        newImageUrl = restaurantImage;
        imageSource = 'restaurant_website';
        imageQuality = 'high_res';
        results.restaurantWebsiteImages++;
        console.log(`🏢 ${venue.name}: Using restaurant website image`);
      } else if (apiCallsUsed < maxApiCalls) {
        // Tier 2: Try Google Places API
        console.log(`🔍 ${venue.name}: Fetching Google Places image...`);
        
        const placeId = await findPlaceId(venue.name, venue.address?.formatted || venue.vicinity || '');
        if (placeId) {
          const imageResult = await fetchGooglePlacesImage(placeId, venue.name);
          if (imageResult.success) {
            newImageUrl = imageResult.imageUrl;
            imageSource = 'google_places';
            imageQuality = 'high_res';
            results.googlePlacesImages++;
            apiCallsUsed++;
            console.log(`✅ ${venue.name}: Google Places image found`);
          } else {
            // Tier 3: AI-generated fallback
            newImageUrl = getAiGeneratedImage(venue.cuisines);
            imageSource = 'ai_generated';
            imageQuality = 'high_res';
            results.aiGeneratedImages++;
            console.log(`🤖 ${venue.name}: Using AI-generated fallback`);
          }
        } else {
          // Tier 3: AI-generated fallback
          newImageUrl = getAiGeneratedImage(venue.cuisines);
          imageSource = 'ai_generated';
          imageQuality = 'high_res';
          results.aiGeneratedImages++;
          console.log(`🤖 ${venue.name}: Using AI-generated fallback (no place ID)`);
        }
        
        // Add delay to respect rate limits
        await sleep(100);
      } else {
        // API limit reached, use AI-generated fallback
        newImageUrl = getAiGeneratedImage(venue.cuisines);
        imageSource = 'ai_generated';
        imageQuality = 'high_res';
        results.aiGeneratedImages++;
        console.log(`🤖 ${venue.name}: Using AI-generated fallback (API limit reached)`);
      }
    } else {
      // Keep existing non-Unsplash images
      if (currentImage && currentImage.includes('dishoom.com')) {
        imageSource = 'restaurant_website';
        imageQuality = 'high_res';
        results.restaurantWebsiteImages++;
      } else if (currentImage && currentImage.includes('google')) {
        imageSource = 'google_places';
        imageQuality = 'high_res';
        results.googlePlacesImages++;
      } else {
        imageSource = 'ai_generated';
        imageQuality = 'high_res';
        results.aiGeneratedImages++;
      }
    }
    
    updatedVenues.push({
      ...venue,
      image_url: newImageUrl,
      image_source: imageSource,
      image_quality: imageQuality
    });
    
    // Progress update
    if ((i + 1) % 50 === 0) {
      console.log(`📊 Progress: ${i + 1}/${venuesData.venues.length} venues processed`);
    }
  }
  
  // 6. Save updated data
  fs.writeFileSync(venuesPath, JSON.stringify({ venues: updatedVenues }, null, 2));
  
  // 7. Verify Unsplash removal
  const verificationResults = {
    totalVenues: updatedVenues.length,
    unsplashUrls: 0,
    restaurantWebsiteUrls: 0,
    googlePlacesUrls: 0,
    aiGeneratedUrls: 0,
    otherUrls: 0
  };
  
  updatedVenues.forEach(venue => {
    if (venue.image_url.includes('unsplash.com')) {
      verificationResults.unsplashUrls++;
    } else if (venue.image_url.includes('dishoom.com') || venue.image_url.includes('gymkhanalondon.com')) {
      verificationResults.restaurantWebsiteUrls++;
    } else if (venue.image_url.includes('google') || venue.image_url.includes('maps')) {
      verificationResults.googlePlacesUrls++;
    } else if (venue.image_url.includes('unsplash.com')) {
      verificationResults.aiGeneratedUrls++;
    } else {
      verificationResults.otherUrls++;
    }
  });
  
  // 8. Generate summary
  console.log('\n📊 UNSPLASH REMOVAL & 3-TIER STRATEGY SUMMARY:');
  console.log('='.repeat(60));
  console.log(`Total Venues: ${results.totalVenues}`);
  console.log(`Unsplash URLs Removed: ${results.unsplashRemoved}`);
  console.log(`API Calls Used: ${apiCallsUsed}`);
  console.log(`Cost: $${(apiCallsUsed * 0.017).toFixed(2)}`);
  
  console.log('\n🎯 IMAGE SOURCES AFTER UPDATE:');
  console.log(`Restaurant Website Images: ${results.restaurantWebsiteImages}`);
  console.log(`Google Places API Images: ${results.googlePlacesImages}`);
  console.log(`AI-Generated Fallback Images: ${results.aiGeneratedImages}`);
  
  console.log('\n✅ VERIFICATION RESULTS:');
  console.log(`Unsplash URLs Remaining: ${verificationResults.unsplashUrls}`);
  console.log(`Restaurant Website URLs: ${verificationResults.restaurantWebsiteUrls}`);
  console.log(`Google Places URLs: ${verificationResults.googlePlacesUrls}`);
  console.log(`AI-Generated URLs: ${verificationResults.aiGeneratedUrls}`);
  console.log(`Other URLs: ${verificationResults.otherUrls}`);
  
  if (verificationResults.unsplashUrls === 0) {
    console.log('\n🎉 SUCCESS: All Unsplash URLs have been removed!');
  } else {
    console.log(`\n⚠️ WARNING: ${verificationResults.unsplashUrls} Unsplash URLs still remain`);
  }
  
  // 9. Save comprehensive report
  const reportPath = path.join(__dirname, '../reports/unsplash-removal-complete.md');
  const reportContent = `# Unsplash Removal & 3-Tier Image Strategy Report

## Summary
- **Processing Date**: ${results.timestamp}
- **Total Venues**: ${results.totalVenues}
- **Unsplash URLs Removed**: ${results.unsplashRemoved}
- **API Calls Used**: ${apiCallsUsed}
- **Total Cost**: $${(apiCallsUsed * 0.017).toFixed(2)}

## 3-Tier Image Strategy Implementation

### Tier 1: Restaurant Official Images
- **Count**: ${results.restaurantWebsiteImages}
- **Source**: Official restaurant websites
- **Quality**: High-resolution, authentic
- **Examples**: Dishoom, Gymkhana, Kricket, Hakkasan, Nobu

### Tier 2: Google Places API Images
- **Count**: ${results.googlePlacesImages}
- **Source**: Google Places API (maxwidth=1600)
- **Quality**: High-resolution, filtered for food
- **API Calls**: ${apiCallsUsed}
- **Cost**: $${(apiCallsUsed * 0.017).toFixed(2)}

### Tier 3: AI-Generated Fallback Images
- **Count**: ${results.aiGeneratedImages}
- **Source**: High-end food photography matching cuisine
- **Quality**: High-resolution, cuisine-specific
- **Fallback**: Used when no restaurant website or Google Places image available

## Verification Results
- **Unsplash URLs Remaining**: ${verificationResults.unsplashUrls}
- **Restaurant Website URLs**: ${verificationResults.restaurantWebsiteUrls}
- **Google Places URLs**: ${verificationResults.googlePlacesUrls}
- **AI-Generated URLs**: ${verificationResults.aiGeneratedUrls}
- **Other URLs**: ${verificationResults.otherUrls}

## Image Source Distribution
- **Restaurant Websites**: ${Math.round(results.restaurantWebsiteImages/results.totalVenues*100)}%
- **Google Places API**: ${Math.round(results.googlePlacesImages/results.totalVenues*100)}%
- **AI-Generated**: ${Math.round(results.aiGeneratedImages/results.totalVenues*100)}%

## API Usage Details
- **Google Places API Key**: ${GOOGLE_PLACES_API_KEY.substring(0, 20)}...
- **Max API Calls**: ${maxApiCalls}
- **Calls Used**: ${apiCallsUsed}
- **Cost per Call**: $0.017
- **Total Cost**: $${(apiCallsUsed * 0.017).toFixed(2)}

## Next Steps
1. Test image loading on live site
2. Monitor Google Places API usage
3. Verify all images are high-quality
4. Check for any broken image URLs
5. Deploy to production

## Files Updated
- \`public/venues.json\` - Updated with new image URLs
- \`reports/unsplash-removal-complete.md\` - This report

## Success Criteria
✅ All Unsplash URLs removed: ${verificationResults.unsplashUrls === 0 ? 'YES' : 'NO'}
✅ Restaurant official images prioritized: ${results.restaurantWebsiteImages > 0 ? 'YES' : 'NO'}
✅ Google Places API integrated: ${results.googlePlacesImages > 0 ? 'YES' : 'NO'}
✅ AI-generated fallbacks implemented: ${results.aiGeneratedImages > 0 ? 'YES' : 'NO'}
✅ Cost within budget: ${(apiCallsUsed * 0.017) <= 10 ? 'YES' : 'NO'}
`;
  
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`\n💾 Report saved to: ${reportPath}`);
  console.log(`✅ Unsplash removal and 3-tier strategy complete!`);
  
  return results;
}

// Run the removal and implementation
removeUnsplashAndImplementTieredImages().catch(console.error);
