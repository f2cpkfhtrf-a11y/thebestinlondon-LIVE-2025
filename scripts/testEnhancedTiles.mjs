#!/usr/bin/env node

// Note: This test requires TypeScript compilation or ts-node
// For now, let's test the file system directly

import fs from 'fs';
import path from 'path';

console.log('🧪 TESTING ENHANCED TILE SYSTEM\n');

// Test data
const testCuisines = ['indian', 'japanese', 'italian', 'mediterranean', 'french', 'turkish'];
const testAreas = ['central-london', 'tower-hamlets', 'redbridge', 'camden', 'hackney'];

console.log('🍽️ Testing Cuisine Tiles:');
console.log('=' .repeat(50));

for (const cuisine of testCuisines) {
  console.log(`\n📋 ${cuisine.toUpperCase()}:`);
  
  // Check if enhanced tile exists
  const enhancedFile = path.join(process.cwd(), 'public', 'tiles_v2', 'cuisines', `${cuisine}-tile.svg`);
  const enhancedExists = fs.existsSync(enhancedFile);
  console.log(`   Enhanced Tile Exists: ${enhancedExists ? '✅' : '❌'}`);
  
  // Check if original tile exists
  const originalFile = path.join(process.cwd(), 'public', 'images', 'tiles', 'cuisines', `${cuisine}.webp`);
  const originalExists = fs.existsSync(originalFile);
  console.log(`   Original Tile Exists: ${originalExists ? '✅' : '❌'}`);
  
  if (enhancedExists) {
    const stats = fs.statSync(enhancedFile);
    console.log(`   Enhanced File Size: ${(stats.size / 1024).toFixed(1)}KB`);
  }
}

console.log('\n🏙️ Testing Area Tiles:');
console.log('=' .repeat(50));

for (const area of testAreas) {
  console.log(`\n📋 ${area.toUpperCase()}:`);
  
  // Check if enhanced tile exists
  const enhancedFile = path.join(process.cwd(), 'public', 'tiles_v2', 'areas', `${area}-tile.svg`);
  const enhancedExists = fs.existsSync(enhancedFile);
  console.log(`   Enhanced Tile Exists: ${enhancedExists ? '✅' : '❌'}`);
  
  // Check if original tile exists
  const originalFile = path.join(process.cwd(), 'public', 'images', 'tiles', 'areas', `${area}.webp`);
  const originalExists = fs.existsSync(originalFile);
  console.log(`   Original Tile Exists: ${originalExists ? '✅' : '❌'}`);
  
  if (enhancedExists) {
    const stats = fs.statSync(enhancedFile);
    console.log(`   Enhanced File Size: ${(stats.size / 1024).toFixed(1)}KB`);
  }
}

console.log('\n📊 Summary:');
console.log('=' .repeat(50));

// Count enhanced tiles
const cuisineDir = path.join(process.cwd(), 'public', 'tiles_v2', 'cuisines');
const areaDir = path.join(process.cwd(), 'public', 'tiles_v2', 'areas');

const cuisineFiles = fs.existsSync(cuisineDir) ? fs.readdirSync(cuisineDir).length : 0;
const areaFiles = fs.existsSync(areaDir) ? fs.readdirSync(areaDir).length : 0;

console.log(`✅ Enhanced Cuisine Tiles: ${cuisineFiles}`);
console.log(`✅ Enhanced Area Tiles: ${areaFiles}`);
console.log(`✅ Total Enhanced Tiles: ${cuisineFiles + areaFiles}`);

console.log('\n🎉 Enhanced Tile System Test Complete!');
console.log('\n📝 Next Steps:');
console.log('1. Verify tiles load correctly in browser');
console.log('2. Test fallback behavior when enhanced tiles are missing');
console.log('3. Monitor performance impact');
console.log('4. Consider adding real WebP images via API integration');
