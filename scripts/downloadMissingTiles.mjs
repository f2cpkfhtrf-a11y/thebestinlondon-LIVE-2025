#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import sharp from 'sharp';

console.log('🚀 DOWNLOADING MISSING ENHANCED TILES FROM UNSPLASH\n');

// Configuration
const UNSPLASH_BASE_URL = 'https://source.unsplash.com/featured/1920x1080/?';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tiles_v2');

// Required tiles based on venue data analysis
const REQUIRED_CUISINES = [
  'british', 'caribbean', 'chinese', 'french', 'indian', 'italian', 
  'japanese', 'korean', 'mediterranean', 'mexican', 'modern-european', 
  'spanish', 'thai', 'turkish'
];

const REQUIRED_AREAS = [
  'camden', 'central-london', 'hackney', 'havering', 'kensington-and-chelsea',
  'newham', 'redbridge', 'southwark', 'tower-hamlets', 'westminster'
];

// Current tiles we already have
const EXISTING_CUISINES = [
  'british', 'chinese', 'french', 'indian', 'italian', 'japanese', 
  'korean', 'mediterranean', 'mexican', 'spanish', 'thai', 'turkish'
];

const EXISTING_AREAS = [
  'camden', 'central-london', 'hackney', 'redbridge', 'tower-hamlets'
];

// Calculate missing tiles
const MISSING_CUISINES = REQUIRED_CUISINES.filter(cuisine => !EXISTING_CUISINES.includes(cuisine));
const MISSING_AREAS = REQUIRED_AREAS.filter(area => !EXISTING_AREAS.includes(area));

console.log(`📊 ANALYSIS:`);
console.log(`   Required cuisines: ${REQUIRED_CUISINES.length}`);
console.log(`   Existing cuisine tiles: ${EXISTING_CUISINES.length}`);
console.log(`   Missing cuisine tiles: ${MISSING_CUISINES.length}`);
console.log(`   Required areas: ${REQUIRED_AREAS.length}`);
console.log(`   Existing area tiles: ${EXISTING_AREAS.length}`);
console.log(`   Missing area tiles: ${MISSING_AREAS.length}`);

if (MISSING_CUISINES.length > 0) {
  console.log(`\n🍽️  MISSING CUISINE TILES:`);
  MISSING_CUISINES.forEach(cuisine => console.log(`   - ${cuisine}`));
}

if (MISSING_AREAS.length > 0) {
  console.log(`\n🏙️  MISSING AREA TILES:`);
  MISSING_AREAS.forEach(area => console.log(`   - ${area}`));
}

// Cuisine search queries for Unsplash
const CUISINE_QUERIES = {
  'caribbean': 'caribbean food restaurant cuisine',
  'modern-european': 'modern european restaurant cuisine fine dining'
};

// Area search queries for Unsplash
const AREA_QUERIES = {
  'havering': 'havering london borough area',
  'kensington-and-chelsea': 'kensington chelsea london area',
  'newham': 'newham london borough area',
  'southwark': 'southwark london borough area',
  'westminster': 'westminster london area'
};

async function downloadImage(query, outputPath, type) {
  try {
    const url = `${UNSPLASH_BASE_URL}${encodeURIComponent(query)}`;
    console.log(`   📥 Downloading ${type}: ${query}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const buffer = await response.buffer();
    
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

// Create output directories
await fs.mkdir(path.join(OUTPUT_DIR, 'cuisines'), { recursive: true });
await fs.mkdir(path.join(OUTPUT_DIR, 'areas'), { recursive: true });

let successCount = 0;
let errorCount = 0;

// Download missing cuisine tiles
if (MISSING_CUISINES.length > 0) {
  console.log(`\n🍽️  DOWNLOADING MISSING CUISINE TILES...`);
  
  for (const cuisine of MISSING_CUISINES) {
    const query = CUISINE_QUERIES[cuisine] || `${cuisine} food restaurant cuisine`;
    const outputPath = path.join(OUTPUT_DIR, 'cuisines', `${cuisine}-tile.webp`);
    
    const success = await downloadImage(query, outputPath, 'cuisine');
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Download missing area tiles
if (MISSING_AREAS.length > 0) {
  console.log(`\n🏙️  DOWNLOADING MISSING AREA TILES...`);
  
  for (const area of MISSING_AREAS) {
    const query = AREA_QUERIES[area] || `${area} london area borough`;
    const outputPath = path.join(OUTPUT_DIR, 'areas', `${area}-tile.webp`);
    
    const success = await downloadImage(query, outputPath, 'area');
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

console.log(`\n📊 DOWNLOAD SUMMARY:`);
console.log(`   ✅ Successfully downloaded: ${successCount} tiles`);
console.log(`   ❌ Failed: ${errorCount} tiles`);
console.log(`   📁 Total tiles now: ${EXISTING_CUISINES.length + MISSING_CUISINES.length} cuisines, ${EXISTING_AREAS.length + MISSING_AREAS.length} areas`);

if (successCount > 0) {
  console.log(`\n🎉 SUCCESS! Enhanced tile system is now complete.`);
  console.log(`   All required cuisine and area tiles are now available.`);
} else {
  console.log(`\n⚠️  No new tiles were downloaded.`);
}

console.log(`\n🔍 Next steps:`);
console.log(`   1. Update tile references to use /tiles_v2/`);
console.log(`   2. Test tile system accuracy`);
console.log(`   3. Clean up old placeholder tiles`);
