#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

console.log('🎨 CREATING PROPER FOOD AND AREA IMAGES\n');

// Configuration
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tiles_v2');

// Create output directories
await fs.mkdir(path.join(OUTPUT_DIR, 'cuisines'), { recursive: true });
await fs.mkdir(path.join(OUTPUT_DIR, 'areas'), { recursive: true });

// Food-specific designs for cuisines
const CUISINE_DESIGNS = {
  'british': {
    colors: ['#8B4513', '#D2691E', '#F4A460'],
    food: 'Fish & Chips',
    icon: '🐟',
    description: 'British Cuisine'
  },
  'caribbean': {
    colors: ['#FF6347', '#FFD700', '#32CD32'],
    food: 'Jerk Chicken',
    icon: '🌶️',
    description: 'Caribbean Cuisine'
  },
  'chinese': {
    colors: ['#DC143C', '#FFD700', '#000000'],
    food: 'Dim Sum',
    icon: '🥟',
    description: 'Chinese Cuisine'
  },
  'french': {
    colors: ['#4169E1', '#FFD700', '#8B0000'],
    food: 'Croissant',
    icon: '🥐',
    description: 'French Cuisine'
  },
  'indian': {
    colors: ['#FF4500', '#FFD700', '#228B22'],
    food: 'Curry',
    icon: '🍛',
    description: 'Indian Cuisine'
  },
  'italian': {
    colors: ['#228B22', '#FFD700', '#DC143C'],
    food: 'Pizza',
    icon: '🍕',
    description: 'Italian Cuisine'
  },
  'japanese': {
    colors: ['#FF1493', '#FFFFFF', '#000000'],
    food: 'Sushi',
    icon: '🍣',
    description: 'Japanese Cuisine'
  },
  'korean': {
    colors: ['#FF0000', '#FFD700', '#000000'],
    food: 'Kimchi',
    icon: '🥬',
    description: 'Korean Cuisine'
  },
  'mediterranean': {
    colors: ['#32CD32', '#FFD700', '#8B4513'],
    food: 'Hummus',
    icon: '🫒',
    description: 'Mediterranean Cuisine'
  },
  'mexican': {
    colors: ['#FF6347', '#32CD32', '#FFD700'],
    food: 'Tacos',
    icon: '🌮',
    description: 'Mexican Cuisine'
  },
  'modern-european': {
    colors: ['#2F4F4F', '#F5F5DC', '#8B4513'],
    food: 'Fine Dining',
    icon: '🍽️',
    description: 'Modern European'
  },
  'spanish': {
    colors: ['#FFD700', '#DC143C', '#FF6347'],
    food: 'Paella',
    icon: '🥘',
    description: 'Spanish Cuisine'
  },
  'thai': {
    colors: ['#FF6347', '#32CD32', '#FFD700'],
    food: 'Pad Thai',
    icon: '🍜',
    description: 'Thai Cuisine'
  },
  'turkish': {
    colors: ['#FFD700', '#DC143C', '#8B4513'],
    food: 'Kebab',
    icon: '🥙',
    description: 'Turkish Cuisine'
  }
};

// Area-specific designs for London areas
const AREA_DESIGNS = {
  'camden': {
    colors: ['#FF1493', '#000000', '#FFFFFF'],
    landmark: 'Camden Market',
    icon: '🎨',
    description: 'Camden'
  },
  'central-london': {
    colors: ['#4169E1', '#FFD700', '#FFFFFF'],
    landmark: 'Big Ben',
    icon: '🏛️',
    description: 'Central London'
  },
  'hackney': {
    colors: ['#32CD32', '#FFD700', '#000000'],
    landmark: 'Shoreditch',
    icon: '🎭',
    description: 'Hackney'
  },
  'havering': {
    colors: ['#87CEEB', '#FFFFFF', '#000000'],
    landmark: 'Romford',
    icon: '🏘️',
    description: 'Havering'
  },
  'kensington-and-chelsea': {
    colors: ['#8B008B', '#FFD700', '#FFFFFF'],
    landmark: 'Kensington Palace',
    icon: '👑',
    description: 'Kensington & Chelsea'
  },
  'newham': {
    colors: ['#FF6347', '#FFFFFF', '#000000'],
    landmark: 'Olympic Park',
    icon: '🏟️',
    description: 'Newham'
  },
  'redbridge': {
    colors: ['#DC143C', '#FFFFFF', '#000000'],
    landmark: 'Ilford',
    icon: '🏢',
    description: 'Redbridge'
  },
  'southwark': {
    colors: ['#32CD32', '#8B4513', '#FFFFFF'],
    landmark: 'Borough Market',
    icon: '🌉',
    description: 'Southwark'
  },
  'tower-hamlets': {
    colors: ['#2F4F4F', '#FFD700', '#FFFFFF'],
    landmark: 'Canary Wharf',
    icon: '🏗️',
    description: 'Tower Hamlets'
  },
  'westminster': {
    colors: ['#FFD700', '#8B0000', '#FFFFFF'],
    landmark: 'Parliament',
    icon: '🏛️',
    description: 'Westminster'
  }
};

async function createFoodImage(cuisine, design, outputPath) {
  try {
    console.log(`   🍽️ Creating ${cuisine} food image...`);
    
    // Create SVG content for food
    const svgContent = `
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-${cuisine}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${design.colors[0]};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${design.colors[1]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${design.colors[2]};stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1920" height="1080" fill="url(#bg-${cuisine})"/>
        
        <!-- Overlay pattern -->
        <rect width="1920" height="1080" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Main content area -->
        <g transform="translate(960, 540)">
          <!-- Food Icon -->
          <text x="0" y="-120" text-anchor="middle" font-size="120" fill="white" filter="url(#shadow)">
            ${design.icon}
          </text>
          
          <!-- Food Name -->
          <text x="0" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" filter="url(#shadow)">
            ${design.food}
          </text>
          
          <!-- Cuisine Description -->
          <text x="0" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" filter="url(#shadow)">
            ${design.description}
          </text>
        </g>
        
        <!-- Decorative food elements -->
        <circle cx="200" cy="200" r="80" fill="rgba(255,255,255,0.1)"/>
        <circle cx="1720" cy="880" r="120" fill="rgba(255,255,255,0.05)"/>
        <circle cx="300" cy="800" r="60" fill="rgba(255,255,255,0.08)"/>
        <circle cx="1600" cy="300" r="100" fill="rgba(255,255,255,0.06)"/>
      </svg>
    `;
    
    // Convert SVG to WebP using sharp
    await sharp(Buffer.from(svgContent))
      .resize(1920, 1080)
      .webp({ 
        quality: 90,
        effort: 6
      })
      .toFile(outputPath);
    
    // Get file size
    const stats = await fs.stat(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);
    
    console.log(`   ✅ Created: ${path.basename(outputPath)} (${fileSizeKB}KB)`);
    return true;
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

async function createAreaImage(area, design, outputPath) {
  try {
    console.log(`   🏙️ Creating ${area} area image...`);
    
    // Create SVG content for area
    const svgContent = `
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-${area}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${design.colors[0]};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${design.colors[1]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${design.colors[2]};stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1920" height="1080" fill="url(#bg-${area})"/>
        
        <!-- Overlay pattern -->
        <rect width="1920" height="1080" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Main content area -->
        <g transform="translate(960, 540)">
          <!-- Area Icon -->
          <text x="0" y="-120" text-anchor="middle" font-size="120" fill="white" filter="url(#shadow)">
            ${design.icon}
          </text>
          
          <!-- Landmark Name -->
          <text x="0" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" filter="url(#shadow)">
            ${design.landmark}
          </text>
          
          <!-- Area Description -->
          <text x="0" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" filter="url(#shadow)">
            ${design.description}
          </text>
        </g>
        
        <!-- Decorative area elements -->
        <circle cx="200" cy="200" r="80" fill="rgba(255,255,255,0.1)"/>
        <circle cx="1720" cy="880" r="120" fill="rgba(255,255,255,0.05)"/>
        <circle cx="300" cy="800" r="60" fill="rgba(255,255,255,0.08)"/>
        <circle cx="1600" cy="300" r="100" fill="rgba(255,255,255,0.06)"/>
      </svg>
    `;
    
    // Convert SVG to WebP using sharp
    await sharp(Buffer.from(svgContent))
      .resize(1920, 1080)
      .webp({ 
        quality: 90,
        effort: 6
      })
      .toFile(outputPath);
    
    // Get file size
    const stats = await fs.stat(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);
    
    console.log(`   ✅ Created: ${path.basename(outputPath)} (${fileSizeKB}KB)`);
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

// Create proper food images for cuisines
console.log('🍽️ CREATING CUISINE FOOD IMAGES...');
for (const [cuisine, design] of Object.entries(CUISINE_DESIGNS)) {
  const outputPath = path.join(OUTPUT_DIR, 'cuisines', `${cuisine}-tile.webp`);
  
  const success = await createFoodImage(cuisine, design, outputPath);
  if (success) {
    cuisineSuccess++;
  } else {
    cuisineError++;
  }
}

// Create proper area images for areas
console.log('\n🏙️ CREATING AREA LOCATION IMAGES...');
for (const [area, design] of Object.entries(AREA_DESIGNS)) {
  const outputPath = path.join(OUTPUT_DIR, 'areas', `${area}-tile.webp`);
  
  const success = await createAreaImage(area, design, outputPath);
  if (success) {
    areaSuccess++;
  } else {
    areaError++;
  }
}

console.log(`\n📊 CREATION SUMMARY:`);
console.log(`   ✅ Cuisine food images: ${cuisineSuccess}/${Object.keys(CUISINE_DESIGNS).length}`);
console.log(`   ❌ Cuisine failures: ${cuisineError}`);
console.log(`   ✅ Area location images: ${areaSuccess}/${Object.keys(AREA_DESIGNS).length}`);
console.log(`   ❌ Area failures: ${areaError}`);

if (cuisineSuccess > 0 && areaSuccess > 0) {
  console.log(`\n🎉 SUCCESS! Created proper food images for cuisines and area images for areas.`);
  console.log(`   Each cuisine now shows its signature food (e.g., Fish & Chips for British)`);
  console.log(`   Each area now shows its landmark (e.g., Big Ben for Central London)`);
} else {
  console.log(`\n⚠️  Some images failed to create.`);
}

console.log(`\n🔍 Next: Test the images to ensure they show proper food and area content...`);
