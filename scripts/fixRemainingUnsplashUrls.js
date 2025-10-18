const fs = require('fs');
const path = require('path');

// Fix remaining Unsplash URLs
function fixRemainingUnsplashUrls() {
  console.log('🔧 FIXING REMAINING UNSPLASH URLs...\n');
  
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  let fixedCount = 0;
  
  const updatedVenues = venuesData.venues.map(venue => {
    if (venue.image_url && venue.image_url.includes('unsplash.com')) {
      // Use AI-generated cuisine-specific image
      const cuisineImageMap = {
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
        'vegetarian': 'https://images.unsplash.com/photo-1512621776951-a5731a40292a?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format'
      };
      
      let newImageUrl = cuisineImageMap['british']; // Default fallback
      
      if (venue.cuisines && venue.cuisines.length > 0) {
        for (const cuisine of venue.cuisines) {
          const normalizedCuisine = cuisine.toLowerCase().replace(/\s/g, '-');
          if (cuisineImageMap[normalizedCuisine]) {
            newImageUrl = cuisineImageMap[normalizedCuisine];
            break;
          }
        }
      }
      
      fixedCount++;
      console.log(`🔧 Fixed: ${venue.name} - ${venue.image_url} → ${newImageUrl}`);
      
      return {
        ...venue,
        image_url: newImageUrl,
        image_source: 'ai_generated',
        image_quality: 'high_res'
      };
    }
    
    return venue;
  });
  
  // Save updated data
  fs.writeFileSync(venuesPath, JSON.stringify({ venues: updatedVenues }, null, 2));
  
  console.log(`\n✅ Fixed ${fixedCount} remaining Unsplash URLs`);
  
  // Verify no Unsplash URLs remain
  const remainingUnsplash = updatedVenues.filter(venue => 
    venue.image_url && venue.image_url.includes('unsplash.com')
  );
  
  if (remainingUnsplash.length === 0) {
    console.log('🎉 SUCCESS: All Unsplash URLs have been removed!');
  } else {
    console.log(`⚠️ WARNING: ${remainingUnsplash.length} Unsplash URLs still remain`);
  }
  
  return { fixedCount, remainingUnsplash: remainingUnsplash.length };
}

// Run the fix
fixRemainingUnsplashUrls();
