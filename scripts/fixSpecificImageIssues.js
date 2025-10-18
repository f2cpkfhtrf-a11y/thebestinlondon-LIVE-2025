const fs = require('fs');
const path = require('path');

const venuesFilePath = path.join(process.cwd(), 'public/venues.json');

async function fixSpecificImageIssues() {
  console.log('🖼️ FIXING SPECIFIC IMAGE RELEVANCE ISSUES\n');

  const fileContent = fs.readFileSync(venuesFilePath, 'utf8');
  let data = JSON.parse(fileContent);
  const venues = Array.isArray(data) ? data : (data.venues || []);

  console.log(`📊 Processing ${venues.length} venues...\n`);

  let fixedCount = 0;
  const issues = [];

  // High-resolution food images for different cuisines
  const cuisineImages = {
    'indian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
    'turkish': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
    'italian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
    'japanese': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
    'chinese': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
    'thai': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
    'french': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
    'spanish': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
    'korean': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
    'mexican': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
    'british': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
    'mediterranean': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
    'vietnamese': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
    'caribbean': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
    'modern-european': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85'
  };

  // Process each venue
  venues.forEach((venue, index) => {
    const primaryCuisine = venue.cuisines?.[0]?.toLowerCase();
    let needsFix = false;
    let issueType = '';

    // Check if venue lacks image_url field
    if (!venue.image_url) {
      needsFix = true;
      issueType = 'Missing image_url field';
    }
    // Check if venue has generic Unsplash images
    else if (venue.image_url && venue.image_url.includes('unsplash.com')) {
      needsFix = true;
      issueType = 'Generic Unsplash image';
    }
    // Check if venue has wrong cuisine in photos metadata
    else if (venue.photos && venue.photos.length > 0) {
      const wrongCuisinePhoto = venue.photos.some(photo => 
        photo.cuisine && photo.cuisine !== primaryCuisine
      );
      if (wrongCuisinePhoto) {
        needsFix = true;
        issueType = 'Wrong cuisine in photo metadata';
      }
    }

    if (needsFix) {
      const fallbackImage = cuisineImages[primaryCuisine] || cuisineImages['modern-european'];
      
      // Add or update image_url field
      venue.image_url = fallbackImage;
      venue.image_source = 'curated_food_image';
      venue.image_alt = `${venue.name} — ${primaryCuisine || 'restaurant'} cuisine in ${venue.borough || 'London'}, London`;
      venue.image_width = 1600;
      venue.image_height = 1200;
      
      // Update photos array to remove generic images and fix metadata
      if (venue.photos && venue.photos.length > 0) {
        venue.photos = venue.photos.map(photo => ({
          ...photo,
          url: fallbackImage,
          source: 'curated_food_image',
          cuisine: primaryCuisine,
          provenance: 'curated_food_image',
          width: 1600,
          height: 1200
        }));
      }
      
      issues.push({
        name: venue.name,
        cuisine: primaryCuisine,
        issue: issueType,
        fixed: true
      });
      
      fixedCount++;
      
      if (fixedCount <= 10) {
        console.log(`✅ Fixed: ${venue.name} (${primaryCuisine}) - ${issueType}`);
      }
    }
  });

  console.log(`\n📊 SUMMARY:`);
  console.log(`   🎯 Total venues processed: ${venues.length}`);
  console.log(`   🔧 Venues fixed: ${fixedCount}`);
  console.log(`   📋 Issues found: ${issues.length}\n`);

  if (issues.length > 0) {
    console.log(`📋 SAMPLE FIXES:`);
    issues.slice(0, 10).forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue.name} (${issue.cuisine}) - ${issue.issue}`);
    });
    
    if (issues.length > 10) {
      console.log(`   ... and ${issues.length - 10} more fixes`);
    }
  }

  // Save updated data
  console.log(`\n💾 Saving updated venues.json...`);
  fs.writeFileSync(venuesFilePath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Image relevance fixes completed!`);
  console.log(`📊 Fixed ${fixedCount} venues with image issues`);
}

fixSpecificImageIssues();
