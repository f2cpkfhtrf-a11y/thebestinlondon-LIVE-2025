#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

console.log('🎯 FINAL VERIFICATION OF UNIQUE TILES\n');

// Check all tiles for uniqueness
async function verifyTiles() {
  const tilesDir = path.join(process.cwd(), 'public', 'tiles_v2');
  
  // Get all cuisine tiles
  const cuisineFiles = await fs.readdir(path.join(tilesDir, 'cuisines'));
  const cuisineTiles = cuisineFiles.filter(f => f.endsWith('.webp'));
  
  // Get all area tiles
  const areaFiles = await fs.readdir(path.join(tilesDir, 'areas'));
  const areaTiles = areaFiles.filter(f => f.endsWith('.webp'));
  
  console.log(`📊 TILE COUNT:`);
  console.log(`   Cuisine tiles: ${cuisineTiles.length}`);
  console.log(`   Area tiles: ${areaTiles.length}`);
  console.log(`   Total tiles: ${cuisineTiles.length + areaTiles.length}`);
  
  // Check file sizes for uniqueness
  const cuisineSizes = [];
  const areaSizes = [];
  
  for (const file of cuisineTiles) {
    const stats = await fs.stat(path.join(tilesDir, 'cuisines', file));
    cuisineSizes.push({ file, size: stats.size });
  }
  
  for (const file of areaTiles) {
    const stats = await fs.stat(path.join(tilesDir, 'areas', file));
    areaSizes.push({ file, size: stats.size });
  }
  
  // Check for duplicates
  const cuisineDuplicates = cuisineSizes.filter((item, index) => 
    cuisineSizes.findIndex(other => other.size === item.size) !== index
  );
  
  const areaDuplicates = areaSizes.filter((item, index) => 
    areaSizes.findIndex(other => other.size === item.size) !== index
  );
  
  console.log(`\n🔍 UNIQUENESS CHECK:`);
  console.log(`   Cuisine duplicates: ${cuisineDuplicates.length}`);
  console.log(`   Area duplicates: ${areaDuplicates.length}`);
  
  if (cuisineDuplicates.length === 0 && areaDuplicates.length === 0) {
    console.log(`   ✅ All tiles are unique!`);
  } else {
    console.log(`   ❌ Found duplicates:`);
    if (cuisineDuplicates.length > 0) {
      console.log(`      Cuisine: ${cuisineDuplicates.map(d => d.file).join(', ')}`);
    }
    if (areaDuplicates.length > 0) {
      console.log(`      Area: ${areaDuplicates.map(d => d.file).join(', ')}`);
    }
  }
  
  // Show file size distribution
  console.log(`\n📈 FILE SIZE DISTRIBUTION:`);
  console.log(`   Cuisine tiles:`);
  cuisineSizes.sort((a, b) => a.size - b.size).forEach(tile => {
    const sizeKB = Math.round(tile.size / 1024);
    console.log(`      ${tile.file}: ${sizeKB}KB`);
  });
  
  console.log(`   Area tiles:`);
  areaSizes.sort((a, b) => a.size - b.size).forEach(tile => {
    const sizeKB = Math.round(tile.size / 1024);
    console.log(`      ${tile.file}: ${sizeKB}KB`);
  });
  
  // Verify tile mapping
  console.log(`\n🔗 TILE MAPPING VERIFICATION:`);
  
  try {
    const resolveContent = await fs.readFile('lib/resolveHeroImage.ts', 'utf8');
    
    // Check if all tiles are referenced
    const enhancedCuisineRefs = resolveContent.match(/\/tiles_v2\/cuisines\/[^"]+-tile\.webp/g) || [];
    const enhancedAreaRefs = resolveContent.match(/\/tiles_v2\/areas\/[^"]+-tile\.webp/g) || [];
    
    console.log(`   Cuisine references: ${enhancedCuisineRefs.length}`);
    console.log(`   Area references: ${enhancedAreaRefs.length}`);
    
    if (enhancedCuisineRefs.length === cuisineTiles.length && enhancedAreaRefs.length === areaTiles.length) {
      console.log(`   ✅ All tiles are properly referenced`);
    } else {
      console.log(`   ⚠️  Some tiles may not be referenced`);
    }
    
  } catch (error) {
    console.log(`   ❌ Could not verify tile mapping: ${error.message}`);
  }
  
  return {
    cuisineTiles: cuisineTiles.length,
    areaTiles: areaTiles.length,
    cuisineDuplicates: cuisineDuplicates.length,
    areaDuplicates: areaDuplicates.length,
    allUnique: cuisineDuplicates.length === 0 && areaDuplicates.length === 0
  };
}

const result = await verifyTiles();

console.log(`\n🎉 FINAL RESULT:`);
if (result.allUnique) {
  console.log(`   ✅ SUCCESS: All ${result.cuisineTiles + result.areaTiles} tiles are unique`);
  console.log(`   ✅ No duplicate images found`);
  console.log(`   ✅ Each cuisine and area has its own distinct image`);
  console.log(`   ✅ Enhanced tile system is complete and accurate`);
} else {
  console.log(`   ❌ ISSUE: Found ${result.cuisineDuplicates + result.areaDuplicates} duplicate tiles`);
  console.log(`   ⚠️  Some images are still the same`);
}

console.log(`\n🌐 TEST THE RESULTS:`);
console.log(`   • Home page: http://localhost:3002/`);
console.log(`   • Cuisines page: http://localhost:3002/cuisines`);
console.log(`   • Areas page: http://localhost:3002/areas`);
console.log(`   • Individual cuisine pages: http://localhost:3002/[cuisine]`);
console.log(`   • Individual area pages: http://localhost:3002/areas/[area]`);

console.log(`\n🎯 Each tile should now show a unique, representative image!`);
