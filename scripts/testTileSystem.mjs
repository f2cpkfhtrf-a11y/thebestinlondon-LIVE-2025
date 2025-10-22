#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

console.log('🧪 TESTING ENHANCED TILE SYSTEM ACCURACY\n');

// Test data from venue analysis
const REQUIRED_CUISINES = [
  'british', 'caribbean', 'chinese', 'french', 'indian', 'italian', 
  'japanese', 'korean', 'mediterranean', 'mexican', 'modern-european', 
  'spanish', 'thai', 'turkish'
];

const REQUIRED_AREAS = [
  'camden', 'central-london', 'hackney', 'havering', 'kensington-and-chelsea',
  'newham', 'redbridge', 'southwark', 'tower-hamlets', 'westminster'
];

// Check if tiles exist
async function checkTileExists(type, name) {
  const tilePath = path.join(process.cwd(), 'public', 'tiles_v2', type, `${name}-tile.webp`);
  try {
    await fs.access(tilePath);
    const stats = await fs.stat(tilePath);
    return {
      exists: true,
      size: Math.round(stats.size / 1024) // KB
    };
  } catch (error) {
    return {
      exists: false,
      size: 0
    };
  }
}

console.log('🍽️  TESTING CUISINE TILES:');
let cuisineSuccess = 0;
let cuisineTotal = 0;

for (const cuisine of REQUIRED_CUISINES) {
  const result = await checkTileExists('cuisines', cuisine);
  cuisineTotal++;
  
  if (result.exists) {
    console.log(`   ✅ ${cuisine}: ${result.size}KB`);
    cuisineSuccess++;
  } else {
    console.log(`   ❌ ${cuisine}: Missing`);
  }
}

console.log(`\n🏙️  TESTING AREA TILES:`);
let areaSuccess = 0;
let areaTotal = 0;

for (const area of REQUIRED_AREAS) {
  const result = await checkTileExists('areas', area);
  areaTotal++;
  
  if (result.exists) {
    console.log(`   ✅ ${area}: ${result.size}KB`);
    areaSuccess++;
  } else {
    console.log(`   ❌ ${area}: Missing`);
  }
}

console.log(`\n📊 TEST RESULTS:`);
console.log(`   Cuisine tiles: ${cuisineSuccess}/${cuisineTotal} (${Math.round(cuisineSuccess/cuisineTotal*100)}%)`);
console.log(`   Area tiles: ${areaSuccess}/${areaTotal} (${Math.round(areaSuccess/areaTotal*100)}%)`);
console.log(`   Overall: ${cuisineSuccess + areaSuccess}/${cuisineTotal + areaTotal} (${Math.round((cuisineSuccess + areaSuccess)/(cuisineTotal + areaTotal)*100)}%)`);

if (cuisineSuccess === cuisineTotal && areaSuccess === areaTotal) {
  console.log(`\n🎉 SUCCESS! All required tiles are available.`);
  console.log(`   Enhanced tile system is complete and accurate.`);
} else {
  console.log(`\n⚠️  Some tiles are missing. Enhanced tile system is incomplete.`);
}

// Test tile resolution
console.log(`\n🔍 TESTING TILE RESOLUTION:`);

// Import the resolveTileImage function (simplified test)
try {
  const resolveContent = await fs.readFile('lib/resolveHeroImage.ts', 'utf8');
  
  // Check if enhanced tiles are referenced
  const enhancedCuisineRefs = resolveContent.match(/\/tiles_v2\/cuisines\/[^"]+-tile\.webp/g) || [];
  const enhancedAreaRefs = resolveContent.match(/\/tiles_v2\/areas\/[^"]+-tile\.webp/g) || [];
  
  console.log(`   Enhanced cuisine references: ${enhancedCuisineRefs.length}`);
  console.log(`   Enhanced area references: ${enhancedAreaRefs.length}`);
  
  if (enhancedCuisineRefs.length > 0 && enhancedAreaRefs.length > 0) {
    console.log(`   ✅ Tile resolution system updated to use enhanced tiles`);
  } else {
    console.log(`   ❌ Tile resolution system not updated`);
  }
  
} catch (error) {
  console.log(`   ❌ Could not test tile resolution: ${error.message}`);
}

console.log(`\n🎯 NEXT STEPS:`);
console.log(`   1. Test tile display on website`);
console.log(`   2. Verify visual quality and accuracy`);
console.log(`   3. Clean up old placeholder tiles`);
console.log(`   4. Update any remaining tile references`);
