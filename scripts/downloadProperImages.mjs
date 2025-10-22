#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import sharp from 'sharp';

console.log('🍽️ DOWNLOADING PROPER FOOD IMAGES FOR CUISINES\n');

// Configuration
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tiles_v2');

// Create output directories
await fs.mkdir(path.join(OUTPUT_DIR, 'cuisines'), { recursive: true });
await fs.mkdir(path.join(OUTPUT_DIR, 'areas'), { recursive: true });

// Specific food images for each cuisine
const CUISINE_FOOD_IMAGES = {
  'british': 'fish and chips roast beef shepherd pie',
  'caribbean': 'jerk chicken rice and peas plantain',
  'chinese': 'dim sum noodles dumplings fried rice',
  'french': 'croissant baguette cheese wine',
  'indian': 'curry naan biryani samosa',
  'italian': 'pizza pasta risotto gelato',
  'japanese': 'sushi ramen tempura miso soup',
  'korean': 'kimchi bulgogi bibimbap korean bbq',
  'mediterranean': 'hummus falafel olives pita bread',
  'mexican': 'tacos burritos guacamole nachos',
  'modern-european': 'fine dining european cuisine',
  'spanish': 'paella tapas sangria jamon',
  'thai': 'pad thai green curry tom yum',
  'turkish': 'kebab baklava mezze turkish delight'
};

// Specific area images for each London area
const AREA_LOCATION_IMAGES = {
  'camden': 'camden market london street art',
  'central-london': 'big ben trafalgar square london eye',
  'hackney': 'hackney london shoreditch street art',
  'havering': 'romford london town center',
  'kensington-and-chelsea': 'kensington palace chelsea london museums',
  'newham': 'stratford olympic park london',
  'redbridge': 'ilford london high street',
  'southwark': 'borough market london bridge',
  'tower-hamlets': 'canary wharf tower bridge',
  'westminster': 'westminster abbey parliament london'
};

async function downloadFoodImage(cuisine, query, outputPath) {
  try {
    console.log(`   🍽️ Downloading ${cuisine} food image...`);
    
    // Try multiple food-specific sources
    const sources = [
      `https://source.unsplash.com/1920x1080/?food,${encodeURIComponent(query)}`,
      `https://source.unsplash.com/1920x1080/?cuisine,${encodeURIComponent(query)}`,
      `https://source.unsplash.com/1920x1080/?restaurant,${encodeURIComponent(query)}`,
      `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query)}`
    ];
    
    let success = false;
    let buffer;
    
    for (const url of sources) {
      try {
        console.log(`      Trying: ${url}`);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          buffer = await response.arrayBuffer();
          success = true;
          break;
        }
      } catch (error) {
        console.log(`      Failed: ${error.message}`);
        continue;
      }
    }
    
    if (!success) {
      throw new Error('All food sources failed');
    }
    
    // Process image with sharp
    await sharp(Buffer.from(buffer))
      .resize(1920, 1080, { 
        fit: 'cover', 
        position: 'center',
        withoutEnlargement: false
      })
      .webp({ 
        quality: 90,
        effort: 6
      })
      .toFile(outputPath);
    
    // Get file size
    const stats = await fs.stat(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);
    
    console.log(`   ✅ Saved: ${path.basename(outputPath)} (${fileSizeKB}KB)`);
    return true;
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

async function downloadAreaImage(area, query, outputPath) {
  try {
    console.log(`   🏙️ Downloading ${area} area image...`);
    
    // Try multiple area-specific sources
    const sources = [
      `https://source.unsplash.com/1920x1080/?london,${encodeURIComponent(query)}`,
      `https://source.unsplash.com/1920x1080/?uk,${encodeURIComponent(query)}`,
      `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query)}`,
      `https://source.unsplash.com/1920x1080/?city,${encodeURIComponent(query)}`
    ];
    
    let success = false;
    let buffer;
    
    for (const url of sources) {
      try {
        console.log(`      Trying: ${url}`);
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          buffer = await response.arrayBuffer();
          success = true;
          break;
        }
      } catch (error) {
        console.log(`      Failed: ${error.message}`);
        continue;
      }
    }
    
    if (!success) {
      throw new Error('All area sources failed');
    }
    
    // Process image with sharp
    await sharp(Buffer.from(buffer))
      .resize(1920, 1080, { 
        fit: 'cover', 
        position: 'center',
        withoutEnlargement: false
      })
      .webp({ 
        quality: 90,
        effort: 6
      })
      .toFile(outputPath);
    
    // Get file size
    const stats = await fs.stat(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);
    
    console.log(`   ✅ Saved: ${path.basename(outputPath)} (${fileSizeKB}KB)`);
    return true;
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

let cuisineSuccess = 0;
let cuisineError = 0;
let areaSuccess = 0;
let areaError = 0;

// Download proper food images for cuisines
console.log('🍽️ DOWNLOADING CUISINE FOOD IMAGES...');
for (const [cuisine, query] of Object.entries(CUISINE_FOOD_IMAGES)) {
  const outputPath = path.join(OUTPUT_DIR, 'cuisines', `${cuisine}-tile.webp`);
  
  const success = await downloadFoodImage(cuisine, query, outputPath);
  if (success) {
    cuisineSuccess++;
  } else {
    cuisineError++;
  }
  
  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 3000));
}

// Download proper area images for areas
console.log('\n🏙️ DOWNLOADING AREA LOCATION IMAGES...');
for (const [area, query] of Object.entries(AREA_LOCATION_IMAGES)) {
  const outputPath = path.join(OUTPUT_DIR, 'areas', `${area}-tile.webp`);
  
  const success = await downloadAreaImage(area, query, outputPath);
  if (success) {
    areaSuccess++;
  } else {
    areaError++;
  }
  
  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 3000));
}

console.log(`\n📊 DOWNLOAD SUMMARY:`);
console.log(`   ✅ Cuisine food images: ${cuisineSuccess}/${Object.keys(CUISINE_FOOD_IMAGES).length}`);
console.log(`   ❌ Cuisine failures: ${cuisineError}`);
console.log(`   ✅ Area location images: ${areaSuccess}/${Object.keys(AREA_LOCATION_IMAGES).length}`);
console.log(`   ❌ Area failures: ${areaError}`);

if (cuisineSuccess > 0 && areaSuccess > 0) {
  console.log(`\n🎉 SUCCESS! Now have proper food images for cuisines and area images for areas.`);
} else {
  console.log(`\n⚠️  Some images failed to download.`);
}

console.log(`\n🔍 Next: Verify the images show proper food and area content...`);
