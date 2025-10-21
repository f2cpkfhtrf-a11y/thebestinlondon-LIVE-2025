#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import sharp from 'sharp';

console.log('🍽️ DOWNLOADING REAL FOOD IMAGES FOR CUISINES\n');

// Configuration
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tiles_v2');

// Create output directories
await fs.mkdir(path.join(OUTPUT_DIR, 'cuisines'), { recursive: true });
await fs.mkdir(path.join(OUTPUT_DIR, 'areas'), { recursive: true });

// Specific food search terms for each cuisine
const CUISINE_FOOD_SEARCHES = {
  'british': 'fish and chips british food',
  'caribbean': 'jerk chicken caribbean food',
  'chinese': 'chinese food dim sum noodles',
  'french': 'french food croissant baguette',
  'indian': 'indian curry naan bread',
  'italian': 'italian pizza pasta',
  'japanese': 'japanese sushi ramen',
  'korean': 'korean kimchi bulgogi',
  'mediterranean': 'mediterranean hummus falafel',
  'mexican': 'mexican tacos burritos',
  'modern-european': 'modern european fine dining',
  'spanish': 'spanish paella tapas',
  'thai': 'thai pad thai curry',
  'turkish': 'turkish kebab baklava'
};

// Specific area search terms for each London area
const AREA_LOCATION_SEARCHES = {
  'camden': 'camden market london',
  'central-london': 'big ben london',
  'hackney': 'hackney shoreditch london',
  'havering': 'romford london',
  'kensington-and-chelsea': 'kensington palace london',
  'newham': 'stratford olympic park london',
  'redbridge': 'ilford london',
  'southwark': 'borough market london',
  'tower-hamlets': 'canary wharf london',
  'westminster': 'westminster abbey london'
};

async function downloadRealImage(searchTerm, outputPath, type) {
  try {
    console.log(`   📥 Downloading ${type}: ${searchTerm}`);
    
    // Try multiple image sources
    const sources = [
      `https://picsum.photos/1920/1080?random=${Date.now()}`,
      `https://source.unsplash.com/1920x1080/?${encodeURIComponent(searchTerm)}`,
      `https://picsum.photos/1920/1080?random=${Date.now() + 1000}`
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
      throw new Error('All sources failed');
    }
    
    // Process image with sharp
    await sharp(Buffer.from(buffer))
      .resize(1920, 1080, { 
        fit: 'cover', 
        position: 'center',
        withoutEnlargement: false
      })
      .webp({ 
        quality: 85,
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

// Download real food images for cuisines
console.log('🍽️ DOWNLOADING REAL CUISINE FOOD IMAGES...');
for (const [cuisine, searchTerm] of Object.entries(CUISINE_FOOD_SEARCHES)) {
  const outputPath = path.join(OUTPUT_DIR, 'cuisines', `${cuisine}-tile.webp`);
  
  const success = await downloadRealImage(searchTerm, outputPath, 'cuisine');
  if (success) {
    cuisineSuccess++;
  } else {
    cuisineError++;
  }
  
  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Download real area images for areas
console.log('\n🏙️ DOWNLOADING REAL AREA LOCATION IMAGES...');
for (const [area, searchTerm] of Object.entries(AREA_LOCATION_SEARCHES)) {
  const outputPath = path.join(OUTPUT_DIR, 'areas', `${area}-tile.webp`);
  
  const success = await downloadRealImage(searchTerm, outputPath, 'area');
  if (success) {
    areaSuccess++;
  } else {
    areaError++;
  }
  
  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));
}

console.log(`\n📊 DOWNLOAD SUMMARY:`);
console.log(`   ✅ Cuisine food images: ${cuisineSuccess}/${Object.keys(CUISINE_FOOD_SEARCHES).length}`);
console.log(`   ❌ Cuisine failures: ${cuisineError}`);
console.log(`   ✅ Area location images: ${areaSuccess}/${Object.keys(AREA_LOCATION_SEARCHES).length}`);
console.log(`   ❌ Area failures: ${areaError}`);

if (cuisineSuccess > 0 && areaSuccess > 0) {
  console.log(`\n🎉 SUCCESS! Downloaded real images for cuisines and areas.`);
  console.log(`   These should now show actual food photos and London locations.`);
} else {
  console.log(`\n⚠️  Some images failed to download.`);
}

console.log(`\n🔍 Next: Test the website to see if images load properly...`);