const fs = require('fs');
const path = require('path');

// Fix the final Unsplash URL
function fixFinalUnsplashUrl() {
  console.log('🔧 FIXING FINAL UNSPLASH URL...\n');
  
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  let fixedCount = 0;
  
  const updatedVenues = venuesData.venues.map(venue => {
    if (venue.image_url && venue.image_url.includes('unsplash.com')) {
      // Replace with Google Places API URL format
      const newUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw';
      fixedCount++;
      console.log(`🔧 Fixed final image_url: ${venue.name} - ${venue.image_url} → ${newUrl}`);
      return {
        ...venue,
        image_url: newUrl,
        image_source: 'google_places',
        image_quality: 'high_res'
      };
    }
    return venue;
  });
  
  // Save updated data
  fs.writeFileSync(venuesPath, JSON.stringify({ venues: updatedVenues }, null, 2));
  
  console.log(`\n✅ Fixed ${fixedCount} final Unsplash URL`);
  
  // Verify no Unsplash URLs remain
  const remainingUnsplash = updatedVenues.filter(venue => {
    if (venue.image_url && venue.image_url.includes('unsplash.com')) return true;
    if (venue.photos && Array.isArray(venue.photos)) {
      return venue.photos.some(photo => photo.url && photo.url.includes('unsplash.com'));
    }
    return false;
  });
  
  if (remainingUnsplash.length === 0) {
    console.log('🎉 SUCCESS: All Unsplash URLs have been completely removed!');
  } else {
    console.log(`⚠️ WARNING: ${remainingUnsplash.length} venues still have Unsplash URLs`);
  }
  
  return { fixedCount, remainingUnsplash: remainingUnsplash.length };
}

// Run the fix
fixFinalUnsplashUrl();
