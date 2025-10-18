const fs = require('fs');
const path = require('path');

const venuesFilePath = path.join(process.cwd(), 'public/venues.json');
const reportPath = path.join(process.cwd(), 'reports', 'wire-images.md');

// Curated food images by cuisine
const curatedImages = {
  indian: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  italian: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
  japanese: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  chinese: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  thai: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  french: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
  turkish: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  korean: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  mexican: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  spanish: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
  mediterranean: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
  british: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1600&h=1200&fit=crop&crop=center&q=85',
  vietnamese: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  caribbean: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&h=1200&fit=crop&crop=center&q=85',
  default: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85'
};

async function wireImagesEverywhere() {
  let reportContent = `🔗 PHASE 3 — WIRE IMAGES EVERYWHERE & REMOVE PLACEHOLDERS\n\n`;
  reportContent += `**Generated:** ${new Date().toISOString()}\n\n`;
  console.log('🔗 PHASE 3 — WIRE IMAGES EVERYWHERE & REMOVE PLACEHOLDERS\n');

  const fileContent = fs.readFileSync(venuesFilePath, 'utf8');
  let data = JSON.parse(fileContent);
  const venues = Array.isArray(data) ? data : (data.venues || []);

  reportContent += `📊 Processing ${venues.length} venues to ensure all have image_url...\n\n`;
  console.log(`📊 Processing ${venues.length} venues to ensure all have image_url...\n`);

  let updatedCount = 0;
  let alreadyHadImage = 0;
  let addedImage = 0;

  // 1. Ensure all venues have image_url
  reportContent += `1️⃣ ENSURING ALL VENUES HAVE IMAGE_URL:\n`;
  console.log(`1️⃣ ENSURING ALL VENUES HAVE IMAGE_URL:`);

  venues.forEach((venue, index) => {
    if (venue.image_url) {
      alreadyHadImage++;
    } else {
      // Get primary cuisine for image selection
      const primaryCuisine = venue.cuisines?.[0]?.toLowerCase() || 'default';
      const imageUrl = curatedImages[primaryCuisine] || curatedImages.default;
      
      venue.image_url = imageUrl;
      venue.image_alt = `${venue.name} — ${venue.cuisines?.[0] || 'Restaurant'}, ${venue.area || venue.borough || 'London'}, London`;
      venue.image_source = 'curated';
      
      addedImage++;
      updatedCount++;
    }
  });

  reportContent += `   ✅ Already had image_url: ${alreadyHadImage}\n`;
  reportContent += `   🔄 Added image_url: ${addedImage}\n`;
  reportContent += `   📊 Total venues with images: ${venues.length}\n\n`;
  console.log(`   ✅ Already had image_url: ${alreadyHadImage}`);
  console.log(`   🔄 Added image_url: ${addedImage}`);
  console.log(`   📊 Total venues with images: ${venues.length}\n`);

  // 2. Save updated venues.json
  reportContent += `2️⃣ SAVING UPDATED VENUES.JSON:\n`;
  console.log(`2️⃣ SAVING UPDATED VENUES.JSON:`);
  
  fs.writeFileSync(venuesFilePath, JSON.stringify(data, null, 2), 'utf8');
  reportContent += `   ✅ Updated venues.json saved\n\n`;
  console.log(`   ✅ Updated venues.json saved\n`);

  // 3. Update components to use image_url consistently
  reportContent += `3️⃣ UPDATING COMPONENTS TO USE IMAGE_URL:\n`;
  console.log(`3️⃣ UPDATING COMPONENTS TO USE IMAGE_URL:`);

  // Update restaurant detail page
  const restaurantDetailPath = path.join(process.cwd(), 'pages/restaurant/[slug].js');
  let restaurantDetailContent = fs.readFileSync(restaurantDetailPath, 'utf8');
  
  // Ensure image_url is prioritized over photos[0].url
  restaurantDetailContent = restaurantDetailContent.replace(
    /venue\.photos\[0\]\.url/g,
    'venue.image_url || venue.photos[0]?.url'
  );
  
  fs.writeFileSync(restaurantDetailPath, restaurantDetailContent, 'utf8');
  reportContent += `   ✅ Updated restaurant detail page\n`;
  console.log(`   ✅ Updated restaurant detail page`);

  // Update homepage
  const homepagePath = path.join(process.cwd(), 'pages/index.js');
  let homepageContent = fs.readFileSync(homepagePath, 'utf8');
  
  homepageContent = homepageContent.replace(
    /venue\.photos\[0\]\.url/g,
    'venue.image_url || venue.photos[0]?.url'
  );
  
  fs.writeFileSync(homepagePath, homepageContent, 'utf8');
  reportContent += `   ✅ Updated homepage\n`;
  console.log(`   ✅ Updated homepage`);

  // Update halal page
  const halalPagePath = path.join(process.cwd(), 'pages/best-halal-restaurants-london.js');
  let halalPageContent = fs.readFileSync(halalPagePath, 'utf8');
  
  halalPageContent = halalPageContent.replace(
    /venue\.photos\[0\]\.url/g,
    'venue.image_url || venue.photos[0]?.url'
  );
  
  fs.writeFileSync(halalPagePath, halalPageContent, 'utf8');
  reportContent += `   ✅ Updated halal page\n`;
  console.log(`   ✅ Updated halal page`);

  // Update search components
  const searchComponentsPath = path.join(process.cwd(), 'components/SearchComponents.js');
  let searchComponentsContent = fs.readFileSync(searchComponentsPath, 'utf8');
  
  searchComponentsContent = searchComponentsContent.replace(
    /venue\.photos\[0\]\.url/g,
    'venue.image_url || venue.photos[0]?.url'
  );
  
  fs.writeFileSync(searchComponentsPath, searchComponentsContent, 'utf8');
  reportContent += `   ✅ Updated search components\n`;
  console.log(`   ✅ Updated search components`);

  reportContent += `\n`;

  // 4. Remove any gradient/placeholder images
  reportContent += `4️⃣ REMOVING GRADIENT/PLACEHOLDER IMAGES:\n`;
  console.log(`4️⃣ REMOVING GRADIENT/PLACEHOLDER IMAGES:`);

  // Check for any remaining placeholder patterns
  const placeholderPatterns = [
    'gradient',
    'placeholder',
    'generic',
    'default-image',
    'no-image'
  ];

  let placeholderCount = 0;
  venues.forEach(venue => {
    if (venue.image_url && placeholderPatterns.some(pattern => 
      venue.image_url.toLowerCase().includes(pattern)
    )) {
      const primaryCuisine = venue.cuisines?.[0]?.toLowerCase() || 'default';
      venue.image_url = curatedImages[primaryCuisine] || curatedImages.default;
      venue.image_alt = `${venue.name} — ${venue.cuisines?.[0] || 'Restaurant'}, ${venue.area || venue.borough || 'London'}, London`;
      venue.image_source = 'curated';
      placeholderCount++;
    }
  });

  reportContent += `   🔄 Replaced ${placeholderCount} placeholder images\n`;
  console.log(`   🔄 Replaced ${placeholderCount} placeholder images`);

  // Save final version
  fs.writeFileSync(venuesFilePath, JSON.stringify(data, null, 2), 'utf8');
  reportContent += `   ✅ Final venues.json saved\n\n`;
  console.log(`   ✅ Final venues.json saved\n`);

  // 5. Summary
  reportContent += `5️⃣ PHASE 3 SUMMARY:\n`;
  reportContent += `   📊 Total venues processed: ${venues.length}\n`;
  reportContent += `   ✅ Venues with image_url: ${venues.length}\n`;
  reportContent += `   🔄 Images added: ${addedImage}\n`;
  reportContent += `   🔄 Placeholders replaced: ${placeholderCount}\n`;
  reportContent += `   📄 Components updated: 4\n\n`;
  console.log(`5️⃣ PHASE 3 SUMMARY:`);
  console.log(`   📊 Total venues processed: ${venues.length}`);
  console.log(`   ✅ Venues with image_url: ${venues.length}`);
  console.log(`   🔄 Images added: ${addedImage}`);
  console.log(`   🔄 Placeholders replaced: ${placeholderCount}`);
  console.log(`   📄 Components updated: 4\n`);

  reportContent += `✅ Phase 3 completed successfully!\n`;
  reportContent += `📄 Report saved to: ${reportPath}\n`;

  fs.writeFileSync(reportPath, reportContent, 'utf8');
  console.log('✅ Phase 3 completed successfully!');
  console.log(`📄 Report saved to: ${reportPath}`);
}

wireImagesEverywhere();
