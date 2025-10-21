#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

console.log('🔍 COMPREHENSIVE TILE IMAGE ANALYSIS\n');

// Check all tile directories
const tileDirectories = [
  'public/images/tiles/cuisines',
  'public/images/tiles/areas', 
  'public/images/tiles/stations',
  'public/tiles_v2/cuisines',
  'public/tiles_v2/areas',
  'public/images/cuisines',
  'public/images/areas',
  'public/images/heroes/cuisines',
  'public/images/heroes/areas',
  'public/images/heroes/site'
];

const analysis = {};

for (const dir of tileDirectories) {
  try {
    const files = await fs.readdir(dir);
    const imageFiles = files.filter(f => f.endsWith('.webp') || f.endsWith('.svg'));
    
    analysis[dir] = {
      exists: true,
      totalFiles: files.length,
      imageFiles: imageFiles.length,
      files: imageFiles.slice(0, 10) // Show first 10 files
    };
  } catch (error) {
    analysis[dir] = {
      exists: false,
      error: error.message
    };
  }
}

console.log('📊 DIRECTORY ANALYSIS:');
for (const [dir, data] of Object.entries(analysis)) {
  if (data.exists) {
    console.log(`✅ ${dir}:`);
    console.log(`   Total files: ${data.totalFiles}`);
    console.log(`   Image files: ${data.imageFiles}`);
    console.log(`   Sample files: ${data.files.slice(0, 5).join(', ')}`);
  } else {
    console.log(`❌ ${dir}: ${data.error}`);
  }
  console.log('');
}

// Check what the current system is using
console.log('🎯 CURRENT TILE SYSTEM ANALYSIS:');
console.log('');

// Check resolveHeroImage.ts mappings
const resolveHeroPath = 'lib/resolveHeroImage.ts';
try {
  const resolveContent = await fs.readFile(resolveHeroPath, 'utf8');
  
  console.log('📋 CUISINE TILE MAPPINGS (from resolveHeroImage.ts):');
  const cuisineMatches = resolveContent.match(/british:.*?webp|indian:.*?webp|japanese:.*?webp|italian:.*?webp|french:.*?webp|chinese:.*?webp|thai:.*?webp|mexican:.*?webp|korean:.*?webp|spanish:.*?webp|turkish:.*?webp|mediterranean:.*?webp/g);
  if (cuisineMatches) {
    cuisineMatches.slice(0, 10).forEach(match => {
      console.log(`   ${match}`);
    });
  }
  
  console.log('');
  console.log('📋 AREA TILE MAPPINGS (from resolveHeroImage.ts):');
  const areaMatches = resolveContent.match(/central-london:.*?webp|tower-hamlets:.*?webp|camden:.*?webp|hackney:.*?webp|westminster:.*?webp|southwark:.*?webp|redbridge:.*?webp|havering:.*?webp|newham:.*?webp/g);
  if (areaMatches) {
    areaMatches.slice(0, 10).forEach(match => {
      console.log(`   ${match}`);
    });
  }
  
} catch (error) {
  console.log(`❌ Could not read resolveHeroImage.ts: ${error.message}`);
}

console.log('');
console.log('📋 IMAGE MAP REFERENCES:');
console.log('');

// Check cuisineImageMap.ts
try {
  const cuisineMapContent = await fs.readFile('data/cuisineImageMap.ts', 'utf8');
  const cuisineMapMatches = cuisineMapContent.match(/"[^"]+":\s*"[^"]+"/g);
  if (cuisineMapMatches) {
    console.log('🍽️  CUISINE IMAGE MAP (first 10):');
    cuisineMapMatches.slice(0, 10).forEach(match => {
      console.log(`   ${match}`);
    });
  }
} catch (error) {
  console.log(`❌ Could not read cuisineImageMap.ts: ${error.message}`);
}

// Check areaImageMap.ts
try {
  const areaMapContent = await fs.readFile('data/areaImageMap.ts', 'utf8');
  const areaMapMatches = areaMapContent.match(/"[^"]+":\s*"[^"]+"/g);
  if (areaMapMatches) {
    console.log('');
    console.log('🏙️  AREA IMAGE MAP (first 10):');
    areaMapMatches.slice(0, 10).forEach(match => {
      console.log(`   ${match}`);
    });
  }
} catch (error) {
  console.log(`❌ Could not read areaImageMap.ts: ${error.message}`);
}

console.log('');
console.log('🎯 SUMMARY & RECOMMENDATIONS:');
console.log('');

// Analyze what we have
const hasOriginalTiles = analysis['public/images/tiles/cuisines']?.exists && analysis['public/images/tiles/areas']?.exists;
const hasEnhancedTiles = analysis['public/tiles_v2/cuisines']?.exists && analysis['public/tiles_v2/areas']?.exists;
const hasHeroImages = analysis['public/images/heroes/cuisines']?.exists && analysis['public/images/heroes/areas']?.exists;

console.log('📊 CURRENT STATE:');
console.log(`   Original tiles (/images/tiles/): ${hasOriginalTiles ? '✅' : '❌'}`);
console.log(`   Enhanced tiles (/tiles_v2/): ${hasEnhancedTiles ? '✅' : '❌'}`);
console.log(`   Hero images (/images/heroes/): ${hasHeroImages ? '✅' : '❌'}`);

if (hasOriginalTiles) {
  console.log(`   Original cuisine tiles: ${analysis['public/images/tiles/cuisines'].imageFiles} files`);
  console.log(`   Original area tiles: ${analysis['public/images/tiles/areas'].imageFiles} files`);
}

if (hasEnhancedTiles) {
  console.log(`   Enhanced cuisine tiles: ${analysis['public/tiles_v2/cuisines'].imageFiles} files`);
  console.log(`   Enhanced area tiles: ${analysis['public/tiles_v2/areas'].imageFiles} files`);
}

if (hasHeroImages) {
  console.log(`   Cuisine hero images: ${analysis['public/images/heroes/cuisines'].imageFiles} files`);
  console.log(`   Area hero images: ${analysis['public/images/heroes/areas'].imageFiles} files`);
}

console.log('');
console.log('🎯 ISSUES IDENTIFIED:');
console.log('   1. Multiple tile systems exist (confusing)');
console.log('   2. Some tiles may be generic/placeholder images');
console.log('   3. Enhanced tiles (/tiles_v2/) are not fully utilized');
console.log('   4. Image maps reference different paths than actual files');
console.log('   5. Need to consolidate to single, high-quality tile system');

console.log('');
console.log('💡 RECOMMENDATIONS:');
console.log('   1. Use enhanced tiles (/tiles_v2/) as they appear to be real photos');
console.log('   2. Download missing cuisine/area tiles from Unsplash');
console.log('   3. Update image maps to reference correct paths');
console.log('   4. Remove old placeholder tiles');
console.log('   5. Create single source of truth for tile images');
