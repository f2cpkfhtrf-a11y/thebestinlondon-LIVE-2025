#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

console.log('🎨 CREATING MISSING ENHANCED TILES\n');

// Missing tiles we need to create
const MISSING_CUISINES = ['caribbean', 'modern-european'];
const MISSING_AREAS = ['havering', 'kensington-and-chelsea', 'newham', 'southwark', 'westminster'];

// Create output directories
const tilesDir = path.join(process.cwd(), 'public', 'tiles_v2');
await fs.mkdir(path.join(tilesDir, 'cuisines'), { recursive: true });
await fs.mkdir(path.join(tilesDir, 'areas'), { recursive: true });

// Cuisine color schemes and descriptions
const CUISINE_DESIGNS = {
  'caribbean': {
    colors: ['#FF6B35', '#F7931E', '#FFD23F'],
    description: 'Caribbean Cuisine',
    icon: 'CARIBBEAN'
  },
  'modern-european': {
    colors: ['#2C3E50', '#34495E', '#7F8C8D'],
    description: 'Modern European',
    icon: 'EUROPEAN'
  }
};

// Area color schemes and descriptions
const AREA_DESIGNS = {
  'havering': {
    colors: ['#3498DB', '#5DADE2', '#85C1E9'],
    description: 'Havering',
    icon: 'HAVERING'
  },
  'kensington-and-chelsea': {
    colors: ['#8E44AD', '#A569BD', '#BB8FCE'],
    description: 'Kensington &amp; Chelsea',
    icon: 'K&C'
  },
  'newham': {
    colors: ['#E74C3C', '#EC7063', '#F1948A'],
    description: 'Newham',
    icon: 'NEWHAM'
  },
  'southwark': {
    colors: ['#27AE60', '#58D68D', '#82E0AA'],
    description: 'Southwark',
    icon: 'SOUTHWARK'
  },
  'westminster': {
    colors: ['#F39C12', '#F7DC6F', '#F9E79F'],
    description: 'Westminster',
    icon: 'WESTMINSTER'
  }
};

async function createTile(type, name, design, outputPath) {
  try {
    console.log(`   🎨 Creating ${type} tile: ${name}`);
    
    // Create SVG content
    const svgContent = `
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${design.colors[0]};stop-opacity:1" />
            <stop offset="50%" style="stop-color:${design.colors[1]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${design.colors[2]};stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1920" height="1080" fill="url(#bg-${name})"/>
        
        <!-- Overlay pattern -->
        <rect width="1920" height="1080" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Main content area -->
        <g transform="translate(960, 540)">
          <!-- Icon -->
          <text x="0" y="-100" text-anchor="middle" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white" filter="url(#shadow)">
            ${design.icon}
          </text>
          
          <!-- Title -->
          <text x="0" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" filter="url(#shadow)">
            ${design.description}
          </text>
          
          <!-- Subtitle -->
          <text x="0" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.8)" filter="url(#shadow)">
            ${type === 'cuisine' ? 'Restaurant Cuisine' : 'London Area'}
          </text>
        </g>
        
        <!-- Decorative elements -->
        <circle cx="200" cy="200" r="100" fill="rgba(255,255,255,0.1)"/>
        <circle cx="1720" cy="880" r="150" fill="rgba(255,255,255,0.05)"/>
        <circle cx="300" cy="800" r="80" fill="rgba(255,255,255,0.08)"/>
        <circle cx="1600" cy="300" r="120" fill="rgba(255,255,255,0.06)"/>
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

let successCount = 0;
let errorCount = 0;

// Create missing cuisine tiles
if (MISSING_CUISINES.length > 0) {
  console.log('🍽️  CREATING MISSING CUISINE TILES...');
  
  for (const cuisine of MISSING_CUISINES) {
    const design = CUISINE_DESIGNS[cuisine];
    const outputPath = path.join(tilesDir, 'cuisines', `${cuisine}-tile.webp`);
    
    const success = await createTile('cuisine', cuisine, design, outputPath);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
}

// Create missing area tiles
if (MISSING_AREAS.length > 0) {
  console.log('\n🏙️  CREATING MISSING AREA TILES...');
  
  for (const area of MISSING_AREAS) {
    const design = AREA_DESIGNS[area];
    const outputPath = path.join(tilesDir, 'areas', `${area}-tile.webp`);
    
    const success = await createTile('area', area, design, outputPath);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
}

console.log(`\n📊 CREATION SUMMARY:`);
console.log(`   ✅ Successfully created: ${successCount} tiles`);
console.log(`   ❌ Failed: ${errorCount} tiles`);

if (successCount > 0) {
  console.log(`\n🎉 SUCCESS! Enhanced tile system is now complete.`);
  console.log(`   All required cuisine and area tiles are now available.`);
  
  // Update the resolveHeroImage.ts file to use the new tiles
  console.log(`\n🔄 Next: Update tile references to use all enhanced tiles...`);
} else {
  console.log(`\n⚠️  No tiles were created.`);
}
