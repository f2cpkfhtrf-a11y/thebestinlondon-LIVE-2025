#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const heroDir = path.join(__dirname, '..', 'public', 'hero-cuisines');

// Create optimized WebP-compatible placeholder images for each cuisine
const cuisines = [
  'turkish', 'italian', 'indian', 'japanese', 'french', 
  'mediterranean', 'british', 'chinese', 'thai', 'korean',
  'spanish', 'mexican', 'vietnamese', 'american', 'caribbean',
  'african', 'seafood', 'vegetarian', 'vegan', 'modern-european'
];

console.log('🎨 Creating optimized WebP-compatible hero images...\n');

// Create a more sophisticated SVG that will convert well to WebP
const createOptimizedSVG = (cuisine) => {
  const cuisineName = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
  const cuisineColors = {
    'turkish': { primary: '#E53E3E', secondary: '#F6AD55' },
    'italian': { primary: '#38A169', secondary: '#F6E05E' },
    'indian': { primary: '#D69E2E', secondary: '#F6AD55' },
    'japanese': { primary: '#2B6CB0', secondary: '#E53E3E' },
    'french': { primary: '#553C9A', secondary: '#F6AD55' },
    'mediterranean': { primary: '#2C7A7B', secondary: '#F6E05E' },
    'british': { primary: '#1A202C', secondary: '#E53E3E' },
    'chinese': { primary: '#C53030', secondary: '#F6E05E' },
    'thai': { primary: '#D69E2E', secondary: '#E53E3E' },
    'korean': { primary: '#2B6CB0', secondary: '#F6AD55' },
    'spanish': { primary: '#C53030', secondary: '#F6E05E' },
    'mexican': { primary: '#D69E2E', secondary: '#E53E3E' },
    'vietnamese': { primary: '#38A169', secondary: '#F6AD55' },
    'american': { primary: '#2B6CB0', secondary: '#E53E3E' },
    'caribbean': { primary: '#D69E2E', secondary: '#38A169' },
    'african': { primary: '#2D3748', secondary: '#F6AD55' },
    'seafood': { primary: '#2C7A7B', secondary: '#BEE3F8' },
    'vegetarian': { primary: '#38A169', secondary: '#F6E05E' },
    'vegan': { primary: '#2D3748', secondary: '#38A169' },
    'modern-european': { primary: '#553C9A', secondary: '#F6AD55' }
  };

  const colors = cuisineColors[cuisine] || { primary: '#2D3748', secondary: '#F6AD55' };

  return `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${cuisine}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A202C;stop-opacity:1" />
      <stop offset="30%" style="stop-color:#2D3748;stop-opacity:1" />
      <stop offset="70%" style="stop-color:#4A5568;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A202C;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent-${cuisine}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:0.8" />
      <stop offset="50%" style="stop-color:${colors.secondary};stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:${colors.primary};stop-opacity:0.8" />
    </linearGradient>
    <filter id="glow-${cuisine}">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1920" height="1080" fill="url(#bg-${cuisine})"/>
  
  <!-- Accent overlay -->
  <rect width="1920" height="200" y="440" fill="url(#accent-${cuisine})" opacity="0.3"/>
  
  <!-- Main title -->
  <text x="960" y="420" font-family="Georgia, serif" font-size="84" font-weight="700" 
        fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle" 
        filter="url(#glow-${cuisine})">${cuisineName}</text>
  
  <!-- Subtitle -->
  <text x="960" y="520" font-family="Arial, sans-serif" font-size="32" font-weight="500" 
        fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Cuisine Hero</text>
  
  <!-- Decorative elements -->
  <circle cx="200" cy="200" r="80" fill="${colors.primary}" opacity="0.1"/>
  <circle cx="1720" cy="880" r="120" fill="${colors.secondary}" opacity="0.1"/>
  <circle cx="400" cy="800" r="60" fill="${colors.primary}" opacity="0.15"/>
  <circle cx="1520" cy="300" r="90" fill="${colors.secondary}" opacity="0.1"/>
  
  <!-- Bottom accent line -->
  <rect x="0" y="1070" width="1920" height="10" fill="url(#accent-${cuisine})" opacity="0.6"/>
</svg>`;
};

cuisines.forEach(cuisine => {
  const svgContent = createOptimizedSVG(cuisine);
  const filePath = path.join(heroDir, `${cuisine}-hero.webp`);
  
  try {
    // For now, create as SVG but with .webp extension for testing
    // In production, these should be converted to actual WebP format
    fs.writeFileSync(filePath.replace('.webp', '.svg'), svgContent);
    console.log(`✓ Created: ${cuisine}-hero.svg (ready for WebP conversion)`);
  } catch (error) {
    console.error(`✗ Error creating ${cuisine}-hero.svg:`, error.message);
  }
});

// Create default hero
const defaultSvg = `<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-default" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A202C;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2D3748;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg-default)"/>
  <text x="960" y="500" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">Cuisine Hero</text>
  <text x="960" y="580" font-family="Arial, sans-serif" font-size="28" fill="#D4AF37" text-anchor="middle" dominant-baseline="middle">Default Placeholder</text>
</svg>`;

try {
  fs.writeFileSync(path.join(heroDir, 'default-hero.webp').replace('.webp', '.svg'), defaultSvg);
  console.log('✓ Created: default-hero.svg (ready for WebP conversion)');
} catch (error) {
  console.error('✗ Error creating default-hero.svg:', error.message);
}

console.log('\n✅ Optimized hero images created!');
console.log('📝 Note: These SVG files are optimized for WebP conversion.');
console.log('🔧 To convert to WebP: Use tools like ImageMagick, Sharp, or online converters');
console.log('📏 Target specs: 1920×1080, <400KB, WebP format');
console.log('🎨 Each image has cuisine-specific colors and styling for better visual appeal');
