#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const heroDir = path.join(__dirname, '..', 'public', 'hero-cuisines');

// Create placeholder WebP images for each cuisine
const cuisines = [
  'turkish', 'italian', 'indian', 'japanese', 'french', 
  'mediterranean', 'british', 'chinese', 'thai', 'korean',
  'spanish', 'mexican', 'vietnamese', 'american', 'caribbean',
  'african', 'seafood', 'vegetarian', 'vegan', 'modern-european'
];

console.log('🎨 Creating placeholder hero images...\n');

cuisines.forEach(cuisine => {
  const svgContent = `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${cuisine}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#2a2a2a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad-${cuisine})"/>
  <text x="960" y="400" font-family="Arial, sans-serif" font-size="72" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}</text>
  <text x="960" y="500" font-family="Arial, sans-serif" font-size="36" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Cuisine Hero</text>
  <text x="960" y="600" font-family="Arial, sans-serif" font-size="24" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">1920×1080 WebP</text>
</svg>`;

  const filePath = path.join(heroDir, `${cuisine}-hero.svg`);
  
  try {
    fs.writeFileSync(filePath, svgContent);
    console.log(`✓ Created: ${cuisine}-hero.svg`);
  } catch (error) {
    console.error(`✗ Error creating ${cuisine}-hero.svg:`, error.message);
  }
});

// Create default hero
const defaultSvg = `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-default" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad-default)"/>
  <text x="960" y="500" font-family="Arial, sans-serif" font-size="48" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Cuisine Hero</text>
  <text x="960" y="580" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Default Placeholder</text>
</svg>`;

try {
  fs.writeFileSync(path.join(heroDir, 'default-hero.svg'), defaultSvg);
  console.log('✓ Created: default-hero.svg');
} catch (error) {
  console.error('✗ Error creating default-hero.svg:', error.message);
}

console.log('\n✅ Placeholder hero images created!');
console.log('📝 Note: Replace these SVG files with actual WebP images (1920×1080, <400KB) for production.');
