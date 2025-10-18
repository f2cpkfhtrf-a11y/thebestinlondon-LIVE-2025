const fs = require('fs');
const path = require('path');

const venuesFilePath = path.join(process.cwd(), 'public/venues.json');

async function fixHalalStreetKitchenImage() {
  console.log('🖼️ FIXING HALAL STREET KITCHEN IMAGE\n');

  const fileContent = fs.readFileSync(venuesFilePath, 'utf8');
  let data = JSON.parse(fileContent);
  const venues = Array.isArray(data) ? data : (data.venues || []);

  console.log(`📊 Processing ${venues.length} venues...\n`);

  let fixedCount = 0;

  // Find and fix Halal Street Kitchen specifically
  const halalStreetKitchen = venues.find(venue => venue.slug === 'halal-street-kitchen-5e3zUyL0');
  
  if (halalStreetKitchen) {
    console.log(`🎯 Found Halal Street Kitchen: ${halalStreetKitchen.name}`);
    console.log(`   Current cuisine: ${halalStreetKitchen.cuisines?.[0]}`);
    console.log(`   Has image_url: ${!!halalStreetKitchen.image_url}`);
    
    if (!halalStreetKitchen.image_url) {
      // Add image_url field using the first photo
      if (halalStreetKitchen.photos && halalStreetKitchen.photos.length > 0) {
        halalStreetKitchen.image_url = halalStreetKitchen.photos[0].url;
        halalStreetKitchen.image_source = halalStreetKitchen.photos[0].source || 'curated_food_image';
        halalStreetKitchen.image_alt = `${halalStreetKitchen.name} — ${halalStreetKitchen.cuisines?.[0] || 'restaurant'} cuisine in ${halalStreetKitchen.borough || 'London'}, London`;
        halalStreetKitchen.image_width = halalStreetKitchen.photos[0].width || 1600;
        halalStreetKitchen.image_height = halalStreetKitchen.photos[0].height || 1200;
        
        console.log(`✅ Added image_url: ${halalStreetKitchen.image_url}`);
        console.log(`   Image source: ${halalStreetKitchen.image_source}`);
        console.log(`   Image alt: ${halalStreetKitchen.image_alt}`);
        
        fixedCount++;
      }
    } else {
      console.log(`ℹ️  Halal Street Kitchen already has image_url: ${halalStreetKitchen.image_url}`);
    }
  } else {
    console.log(`❌ Halal Street Kitchen not found!`);
  }

  // Also check for any other venues missing image_url
  venues.forEach(venue => {
    if (!venue.image_url && venue.photos && venue.photos.length > 0) {
      venue.image_url = venue.photos[0].url;
      venue.image_source = venue.photos[0].source || 'curated_food_image';
      venue.image_alt = `${venue.name} — ${venue.cuisines?.[0] || 'restaurant'} cuisine in ${venue.borough || 'London'}, London`;
      venue.image_width = venue.photos[0].width || 1600;
      venue.image_height = venue.photos[0].height || 1200;
      
      fixedCount++;
      
      if (fixedCount <= 10) {
        console.log(`✅ Fixed: ${venue.name} (${venue.cuisines?.[0]})`);
      }
    }
  });

  console.log(`\n📊 SUMMARY:`);
  console.log(`   🎯 Total venues processed: ${venues.length}`);
  console.log(`   🔧 Venues fixed: ${fixedCount}\n`);

  // Save updated data
  console.log(`💾 Saving updated venues.json...`);
  fs.writeFileSync(venuesFilePath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Image fixes completed!`);
  console.log(`📊 Fixed ${fixedCount} venues with missing image_url fields`);
}

fixHalalStreetKitchenImage();
