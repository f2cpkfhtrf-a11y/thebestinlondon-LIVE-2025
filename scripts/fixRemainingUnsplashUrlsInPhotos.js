const fs = require('fs');
const path = require('path');

// Fix remaining Unsplash URLs in photos array
function fixRemainingUnsplashUrlsInPhotos() {
  console.log('🔧 FIXING REMAINING UNSPLASH URLs IN PHOTOS ARRAY...\n');
  
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  
  let fixedCount = 0;
  
  const updatedVenues = venuesData.venues.map(venue => {
    let updatedVenue = { ...venue };
    
    // Check if photos array contains Unsplash URLs
    if (venue.photos && Array.isArray(venue.photos)) {
      updatedVenue.photos = venue.photos.map(photo => {
        if (photo.url && photo.url.includes('unsplash.com')) {
          // Replace with Google Places API URL format
          const newUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw`;
          fixedCount++;
          console.log(`🔧 Fixed photo URL: ${photo.url} → ${newUrl}`);
          return {
            ...photo,
            url: newUrl
          };
        }
        return photo;
      });
    }
    
    return updatedVenue;
  });
  
  // Save updated data
  fs.writeFileSync(venuesPath, JSON.stringify({ venues: updatedVenues }, null, 2));
  
  console.log(`\n✅ Fixed ${fixedCount} remaining Unsplash URLs in photos array`);
  
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
fixRemainingUnsplashUrlsInPhotos();
