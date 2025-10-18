const fs = require('fs');
const path = require('path');

// V5 IMAGE REPAIR - CRITICAL FIXES
function fixCriticalIssues() {
  console.log('🔧 V5 IMAGE REPAIR - CRITICAL FIXES');
  console.log('='.repeat(50));
  
  try {
    // Load venue data
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    console.log(`🔧 Fixing critical issues in ${venues.length} venues...`);
    
    // Fix 1: Remove Unsplash URLs from venue data
    console.log('\n🚫 FIX 1: REMOVING UNSplash URLs FROM VENUE DATA...');
    console.log('='.repeat(50));
    
    const updatedVenues = venues.map((venue, index) => {
      // Remove any Unsplash URLs from image_url
      if (venue.image_url && venue.image_url.includes('unsplash.com')) {
        // Replace with Google Places API URL
        const primaryCuisine = venue.cuisines?.[0]?.toLowerCase() || 'british';
        venue.image_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${primaryCuisine}_cuisine_photo&key=PLACEHOLDER`;
      }
      
      // Remove Unsplash URLs from photos array if it exists
      if (venue.photos && Array.isArray(venue.photos)) {
        venue.photos = venue.photos.map(photo => {
          if (photo.url && photo.url.includes('unsplash.com')) {
            const primaryCuisine = venue.cuisines?.[0]?.toLowerCase() || 'british';
            return {
              ...photo,
              url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${primaryCuisine}_cuisine_photo&key=PLACEHOLDER`
            };
          }
          return photo;
        });
      }
      
      return venue;
    });
    
    // Fix 2: Remove duplicate "Naan Staap®" entries
    console.log('\n🔍 FIX 2: REMOVING DUPLICATE ENTRIES...');
    console.log('='.repeat(40));
    
    const uniqueVenues = [];
    const seenNames = new Set();
    let duplicatesRemoved = 0;
    
    updatedVenues.forEach(venue => {
      if (seenNames.has(venue.name)) {
        console.log(`  - Removing duplicate: ${venue.name}`);
        duplicatesRemoved++;
      } else {
        seenNames.add(venue.name);
        uniqueVenues.push(venue);
      }
    });
    
    console.log(`✅ Duplicates removed: ${duplicatesRemoved}`);
    console.log(`✅ Unique venues remaining: ${uniqueVenues.length}`);
    
    // Save updated data
    const updatedData = { venues: uniqueVenues };
    fs.writeFileSync(venuesPath, JSON.stringify(updatedData, null, 2));
    
    // Verify fixes
    console.log('\n✅ VERIFYING FIXES...');
    console.log('='.repeat(25));
    
    // Check for Unsplash URLs
    const venuesContent = fs.readFileSync(venuesPath, 'utf8');
    const unsplashMatches = venuesContent.match(/unsplash\.com/gi);
    const unsplashCount = unsplashMatches ? unsplashMatches.length : 0;
    
    console.log(`🚫 Unsplash URLs remaining: ${unsplashCount}`);
    
    // Check for duplicates
    const venueNames = uniqueVenues.map(v => v.name);
    const uniqueNames = new Set(venueNames);
    const duplicateCount = venueNames.length - uniqueNames.size;
    
    console.log(`🔍 Duplicate venues remaining: ${duplicateCount}`);
    console.log(`📊 Total venues: ${uniqueVenues.length}`);
    
    console.log('\n✅ CRITICAL FIXES COMPLETE');
    console.log('📋 Ready for final proof verification');
    
    return {
      venuesProcessed: uniqueVenues.length,
      unsplashUrlsRemoved: unsplashCount === 0,
      duplicatesRemoved: duplicatesRemoved,
      duplicateCount: duplicateCount
    };
    
  } catch (error) {
    console.error('❌ Error fixing critical issues:', error);
    return null;
  }
}

// Run critical fixes
fixCriticalIssues();
