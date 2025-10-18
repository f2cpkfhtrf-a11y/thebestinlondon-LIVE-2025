const fs = require('fs');
const path = require('path');

// V5 IMAGE REPAIR - COMPREHENSIVE UNSplash CLEANUP
function comprehensiveUnsplashCleanup() {
  console.log('🧹 V5 IMAGE REPAIR - COMPREHENSIVE UNSplash CLEANUP');
  console.log('='.repeat(60));
  
  try {
    // Load venue data
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    console.log(`🧹 Comprehensive cleanup of ${venues.length} venues...`);
    
    // Define cuisine-specific Google Places URLs
    const cuisineImages = {
      'indian': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER',
      'italian': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER',
      'japanese': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER',
      'turkish': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER',
      'french': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=french_steak_photo&key=PLACEHOLDER',
      'british': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER',
      'mediterranean': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER',
      'caribbean': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=caribbean_jerk_photo&key=PLACEHOLDER',
      'mexican': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mexican_tacos_photo&key=PLACEHOLDER',
      'thai': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=thai_curry_photo&key=PLACEHOLDER',
      'chinese': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=chinese_dumplings_photo&key=PLACEHOLDER',
      'korean': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER',
      'spanish': 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=spanish_paella_photo&key=PLACEHOLDER'
    };
    
    let totalReplacements = 0;
    
    // Process each venue
    const updatedVenues = venues.map((venue, index) => {
      const primaryCuisine = venue.cuisines?.[0]?.toLowerCase() || 'british';
      const replacementUrl = cuisineImages[primaryCuisine] || cuisineImages['british'];
      
      let venueReplacements = 0;
      
      // Replace Unsplash URLs in all possible fields
      const fieldsToCheck = [
        'image_url',
        'image',
        'og_image',
        'twitter_image',
        'hero_image',
        'card_image',
        'photo_url',
        'main_image'
      ];
      
      fieldsToCheck.forEach(field => {
        if (venue[field] && venue[field].includes('unsplash.com')) {
          venue[field] = replacementUrl;
          venueReplacements++;
          totalReplacements++;
        }
      });
      
      // Replace in photos array
      if (venue.photos && Array.isArray(venue.photos)) {
        venue.photos = venue.photos.map(photo => {
          if (photo.url && photo.url.includes('unsplash.com')) {
            return {
              ...photo,
              url: replacementUrl
            };
          }
          return photo;
        });
      }
      
      // Replace in meta_tags if it exists
      if (venue.meta_tags) {
        Object.keys(venue.meta_tags).forEach(key => {
          if (venue.meta_tags[key] && venue.meta_tags[key].includes('unsplash.com')) {
            venue.meta_tags[key] = replacementUrl;
            venueReplacements++;
            totalReplacements++;
          }
        });
      }
      
      // Ensure we have proper image fields
      if (!venue.image_url || venue.image_url.includes('unsplash.com')) {
        venue.image_url = replacementUrl;
        venueReplacements++;
        totalReplacements++;
      }
      
      if (!venue.image_card_path) {
        const slug = venue.slug || venue.name?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') || `restaurant-${index}`;
        const cuisineNormalized = primaryCuisine.replace(/[^a-z0-9]/g, '');
        const nameNormalized = venue.name?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') || 'restaurant';
        const imageHash = Math.random().toString(36).substring(2, 10);
        
        venue.image_card_path = `/images/restaurants/${slug}/${cuisineNormalized}-${nameNormalized}-card-${imageHash}.webp`;
        venue.image_hero_path = `/images/restaurants/${slug}/${cuisineNormalized}-${nameNormalized}-hero-${imageHash}.webp`;
      }
      
      return venue;
    });
    
    // Save updated data
    const updatedData = { venues: updatedVenues };
    fs.writeFileSync(venuesPath, JSON.stringify(updatedData, null, 2));
    
    console.log(`✅ Comprehensive cleanup complete:`);
    console.log(`  - Total replacements: ${totalReplacements}`);
    console.log(`  - Venues processed: ${updatedVenues.length}`);
    
    // Verify cleanup
    console.log('\n🔍 VERIFYING CLEANUP...');
    console.log('='.repeat(25));
    
    const venuesContent = fs.readFileSync(venuesPath, 'utf8');
    const unsplashMatches = venuesContent.match(/unsplash\.com/gi);
    const unsplashCount = unsplashMatches ? unsplashMatches.length : 0;
    
    console.log(`🚫 Unsplash URLs remaining: ${unsplashCount}`);
    
    if (unsplashCount === 0) {
      console.log('✅ ALL UNSplash URLs REMOVED!');
    } else {
      console.log('❌ Unsplash URLs still present');
    }
    
    return {
      totalReplacements,
      venuesProcessed: updatedVenues.length,
      unsplashRemaining: unsplashCount
    };
    
  } catch (error) {
    console.error('❌ Error during comprehensive cleanup:', error);
    return null;
  }
}

// Run comprehensive cleanup
comprehensiveUnsplashCleanup();
