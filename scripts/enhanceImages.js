const fs = require('fs');
const path = require('path');

// High-quality cuisine-specific images from Unsplash
const CUISINE_IMAGES = {
  'modern european': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85',
  'british': 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=800&q=85',
  'italian': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=85',
  'french': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=85',
  'spanish': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'indian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'turkish': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=85',
  'japanese': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=85',
  'korean': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'chinese': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'thai': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'vietnamese': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'mexican': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'american': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'caribbean': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'african': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'mediterranean': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'seafood': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'vegetarian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'vegan': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'cafe': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85',
  'bar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=85',
  'healthy': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85',
  'organic': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85'
};

// Premium food photography for different areas
const AREA_IMAGES = {
  'soho': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'covent garden': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'mayfair': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'kensington': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'chelsea': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'shoreditch': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'camden': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'islington': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'hackney': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'greenwich': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'richmond': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85',
  'wimbledon': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85'
};

function enhanceVenueImages(venue) {
  const enhanced = { ...venue };
  
  // Check if venue has Google Places photos
  const hasGooglePhotos = enhanced.photos && enhanced.photos.some(photo => 
    photo.url && photo.url.includes('google')
  );
  
  if (!hasGooglePhotos) {
    // Find the best image based on cuisine and area
    let bestImage = null;
    
    // First try cuisine-specific image
    if (enhanced.cuisines && enhanced.cuisines.length > 0) {
      const primaryCuisine = enhanced.cuisines[0].toLowerCase();
      bestImage = CUISINE_IMAGES[primaryCuisine];
    }
    
    // If no cuisine image, try area-specific image
    if (!bestImage && enhanced.borough) {
      const area = enhanced.borough.toLowerCase();
      bestImage = AREA_IMAGES[area];
    }
    
    // Fallback to premium food photography
    if (!bestImage) {
      bestImage = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85';
    }
    
    // Replace photos with enhanced image
    enhanced.photos = [{
      url: bestImage,
      width: 800,
      height: 600,
      source: 'enhanced',
      cuisine: enhanced.cuisines?.[0] || 'general',
      area: enhanced.borough || 'london'
    }];
  }
  
  return enhanced;
}

async function enhanceAllImages() {
  console.log('🖼️ Starting image enhancement...');
  
  try {
    // Read current data
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    console.log(`📊 Processing ${venues.length} venues...`);
    
    // Enhance images for each venue
    const enhancedVenues = venues.map(enhanceVenueImages);
    
    // Create backup
    const backupPath = path.join(process.cwd(), `backups/venues-pre-image-enhancement-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    console.log(`💾 Backup created: ${backupPath}`);
    
    // Create enhanced data structure
    const enhancedData = {
      venues: enhancedVenues,
      lastUpdated: new Date().toISOString(),
      version: '2.1',
      metadata: {
        totalVenues: enhancedVenues.length,
        imageEnhancementDate: new Date().toISOString(),
        imageStats: {
          googlePhotos: enhancedVenues.filter(v => 
            v.photos && v.photos.some(p => p.url && p.url.includes('google'))
          ).length,
          enhancedPhotos: enhancedVenues.filter(v => 
            v.photos && v.photos.some(p => p.source === 'enhanced')
          ).length
        }
      }
    };
    
    // Write enhanced data
    fs.writeFileSync(filePath, JSON.stringify(enhancedData, null, 2));
    console.log('✅ Image enhancement complete!');
    
    // Generate report
    const googlePhotos = enhancedVenues.filter(v => 
      v.photos && v.photos.some(p => p.url && p.url.includes('google'))
    ).length;
    
    const enhancedPhotos = enhancedVenues.filter(v => 
      v.photos && v.photos.some(p => p.source === 'enhanced')
    ).length;
    
    console.log('\\n📈 IMAGE ENHANCEMENT REPORT:');
    console.log(`Google Places photos: ${googlePhotos}`);
    console.log(`Enhanced photos: ${enhancedPhotos}`);
    console.log(`Total venues: ${enhancedVenues.length}`);
    console.log(`Coverage: ${Math.round(((googlePhotos + enhancedPhotos) / enhancedVenues.length) * 100)}%`);
    
    return enhancedData;
    
  } catch (error) {
    console.error('❌ Error during image enhancement:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  enhanceAllImages().catch(console.error);
}

module.exports = { enhanceVenueImages, enhanceAllImages };
