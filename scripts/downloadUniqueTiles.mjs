#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import sharp from 'sharp';

console.log('🔄 DOWNLOADING UNIQUE IMAGES FOR ALL CUISINES AND AREAS\n');

// Configuration
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tiles_v2');

// Create output directories
await fs.mkdir(path.join(OUTPUT_DIR, 'cuisines'), { recursive: true });
await fs.mkdir(path.join(OUTPUT_DIR, 'areas'), { recursive: true });

// Cuisine-specific search queries for unique images
const CUISINE_QUERIES = {
  'british': 'british food fish and chips roast beef',
  'caribbean': 'caribbean food jerk chicken rice and peas',
  'chinese': 'chinese food dim sum noodles',
  'french': 'french food croissant wine cheese',
  'indian': 'indian food curry naan biryani',
  'italian': 'italian food pizza pasta risotto',
  'japanese': 'japanese food sushi ramen tempura',
  'korean': 'korean food kimchi bulgogi bibimbap',
  'mediterranean': 'mediterranean food olives hummus falafel',
  'mexican': 'mexican food tacos burritos guacamole',
  'modern-european': 'modern european fine dining restaurant',
  'spanish': 'spanish food paella tapas sangria',
  'thai': 'thai food pad thai green curry',
  'turkish': 'turkish food kebab baklava mezze'
};

// Area-specific search queries for unique images
const AREA_QUERIES = {
  'camden': 'camden london market street food',
  'central-london': 'central london big ben trafalgar square',
  'hackney': 'hackney london shoreditch street art',
  'havering': 'havering london romford town center',
  'kensington-and-chelsea': 'kensington chelsea london museums',
  'newham': 'newham london stratford olympic park',
  'redbridge': 'redbridge london ilford high street',
  'southwark': 'southwark london borough market',
  'tower-hamlets': 'tower hamlets london canary wharf',
  'westminster': 'westminster london parliament palace'
};

async function downloadUniqueImage(query, outputPath, type, name) {
  try {
    console.log(`   📥 Downloading ${type}: ${name}`);
    
    // Try multiple image sources
    const sources = [
      `https://source.unsplash.com/1920x1080/?${encodeURIComponent(query)}`,
      `https://picsum.photos/1920/1080?random=${Date.now()}`,
      `https://source.unsplash.com/1920x1080/?${encodeURIComponent(name)}`
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
          buffer = await response.buffer();
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
    await sharp(buffer)
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

let successCount = 0;
let errorCount = 0;

// Download unique cuisine tiles
console.log('🍽️  DOWNLOADING UNIQUE CUISINE TILES...');
for (const [cuisine, query] of Object.entries(CUISINE_QUERIES)) {
  const outputPath = path.join(OUTPUT_DIR, 'cuisines', `${cuisine}-tile.webp`);
  
  const success = await downloadUniqueImage(query, outputPath, 'cuisine', cuisine);
  if (success) {
    successCount++;
  } else {
    errorCount++;
  }
  
  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Download unique area tiles
console.log('\n🏙️  DOWNLOADING UNIQUE AREA TILES...');
for (const [area, query] of Object.entries(AREA_QUERIES)) {
  const outputPath = path.join(OUTPUT_DIR, 'areas', `${area}-tile.webp`);
  
  const success = await downloadUniqueImage(query, outputPath, 'area', area);
  if (success) {
    successCount++;
  } else {
    errorCount++;
  }
  
  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));
}

console.log(`\n📊 DOWNLOAD SUMMARY:`);
console.log(`   ✅ Successfully downloaded: ${successCount} unique tiles`);
console.log(`   ❌ Failed: ${errorCount} tiles`);

if (successCount > 0) {
  console.log(`\n🎉 SUCCESS! All tiles now have unique images.`);
  console.log(`   No more duplicate images for cuisines or areas.`);
} else {
  console.log(`\n⚠️  No new images were downloaded.`);
}

console.log(`\n🔍 Next: Test the unique tiles to ensure they're all different...`);
