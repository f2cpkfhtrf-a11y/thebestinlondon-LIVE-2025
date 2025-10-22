// Test script to debug tile resolution
import { resolveTileImage } from './lib/resolveHeroImage.js';

console.log('🔍 TESTING TILE RESOLUTION:');
console.log('============================');

const testCases = [
  { type: 'cuisine', slug: 'indian' },
  { type: 'cuisine', slug: 'italian' },
  { type: 'cuisine', slug: 'japanese' },
  { type: 'area', slug: 'central-london' },
  { type: 'area', slug: 'redbridge' }
];

testCases.forEach(test => {
  try {
    const result = resolveTileImage(test);
    console.log(`${test.type}: ${test.slug} → ${result}`);
  } catch (error) {
    console.log(`${test.type}: ${test.slug} → ERROR: ${error.message}`);
  }
});
