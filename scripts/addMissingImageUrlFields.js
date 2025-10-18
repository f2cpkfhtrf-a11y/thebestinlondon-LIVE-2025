const fs = require('fs');
const path = require('path');

const venuesFilePath = path.join(process.cwd(), 'public/venues.json');

async function addMissingImageUrlFields() {
  console.log('🖼️ ADDING MISSING IMAGE_URL FIELDS\n');

  const fileContent = fs.readFileSync(venuesFilePath, 'utf8');
  let data = JSON.parse(fileContent);
  const venues = Array.isArray(data) ? data : (data.venues || []);

  console.log(`📊 Processing ${venues.length} venues...\n`);

  let addedCount = 0;

  // Process each venue
  venues.forEach((venue, index) => {
    // Check if venue lacks image_url field
    if (!venue.image_url) {
      // Use the first photo URL as image_url
      if (venue.photos && venue.photos.length > 0) {
        venue.image_url = venue.photos[0].url;
        venue.image_source = venue.photos[0].source || 'curated_food_image';
        venue.image_alt = `${venue.name} — ${venue.cuisines?.[0] || 'restaurant'} cuisine in ${venue.borough || 'London'}, London`;
        venue.image_width = venue.photos[0].width || 1600;
        venue.image_height = venue.photos[0].height || 1200;
        
        addedCount++;
        
        if (addedCount <= 10) {
          console.log(`✅ Added image_url: ${venue.name} (${venue.cuisines?.[0]})`);
        }
      }
    }
  });

  console.log(`\n📊 SUMMARY:`);
  console.log(`   🎯 Total venues processed: ${venues.length}`);
  console.log(`   ➕ image_url fields added: ${addedCount}\n`);

  // Save updated data
  console.log(`💾 Saving updated venues.json...`);
  fs.writeFileSync(venuesFilePath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Missing image_url fields added!`);
  console.log(`📊 Added ${addedCount} image_url fields`);
}

addMissingImageUrlFields();
