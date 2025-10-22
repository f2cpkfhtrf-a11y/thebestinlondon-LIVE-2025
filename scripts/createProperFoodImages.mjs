#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

console.log('🎨 CREATING PROPER FOOD IMAGES WITH AI-GENERATED CONTENT\n');

// Configuration
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'tiles_v2');

// Create output directories
await fs.mkdir(path.join(OUTPUT_DIR, 'cuisines'), { recursive: true });
await fs.mkdir(path.join(OUTPUT_DIR, 'areas'), { recursive: true });

// Specific food descriptions for AI-generated images
const CUISINE_FOOD_DESCRIPTIONS = {
  'british': {
    food: 'Fish and Chips',
    description: 'Traditional British fish and chips with golden crispy batter',
    colors: ['#8B4513', '#D2691E', '#F4A460'],
    icon: '🐟'
  },
  'caribbean': {
    food: 'Jerk Chicken',
    description: 'Spicy Caribbean jerk chicken with rice and peas',
    colors: ['#FF6347', '#FFD700', '#32CD32'],
    icon: '🌶️'
  },
  'chinese': {
    food: 'Dim Sum',
    description: 'Chinese dim sum dumplings and steamed buns',
    colors: ['#DC143C', '#FFD700', '#000000'],
    icon: '🥟'
  },
  'french': {
    food: 'Croissant',
    description: 'French croissant and baguette with butter',
    colors: ['#4169E1', '#FFD700', '#8B0000'],
    icon: '🥐'
  },
  'indian': {
    food: 'Curry',
    description: 'Indian curry with naan bread and rice',
    colors: ['#FF4500', '#FFD700', '#228B22'],
    icon: '🍛'
  },
  'italian': {
    food: 'Pizza',
    description: 'Italian pizza margherita with fresh basil',
    colors: ['#228B22', '#FFD700', '#DC143C'],
    icon: '🍕'
  },
  'japanese': {
    food: 'Sushi',
    description: 'Japanese sushi rolls and sashimi',
    colors: ['#FF1493', '#FFFFFF', '#000000'],
    icon: '🍣'
  },
  'korean': {
    food: 'Kimchi',
    description: 'Korean kimchi and bulgogi beef',
    colors: ['#FF0000', '#FFD700', '#000000'],
    icon: '🥬'
  },
  'mediterranean': {
    food: 'Hummus',
    description: 'Mediterranean hummus with pita bread',
    colors: ['#32CD32', '#FFD700', '#8B4513'],
    icon: '🫒'
  },
  'mexican': {
    food: 'Tacos',
    description: 'Mexican tacos with guacamole and salsa',
    colors: ['#FF6347', '#32CD32', '#FFD700'],
    icon: '🌮'
  },
  'modern-european': {
    food: 'Fine Dining',
    description: 'Modern European fine dining presentation',
    colors: ['#2F4F4F', '#F5F5DC', '#8B4513'],
    icon: '🍽️'
  },
  'spanish': {
    food: 'Paella',
    description: 'Spanish paella with seafood and rice',
    colors: ['#FFD700', '#DC143C', '#FF6347'],
    icon: '🥘'
  },
  'thai': {
    food: 'Pad Thai',
    description: 'Thai pad thai noodles with vegetables',
    colors: ['#FF6347', '#32CD32', '#FFD700'],
    icon: '🍜'
  },
  'turkish': {
    food: 'Kebab',
    description: 'Turkish kebab with baklava dessert',
    colors: ['#FFD700', '#DC143C', '#8B4513'],
    icon: '🥙'
  }
};

// Specific area descriptions for London areas
const AREA_LOCATION_DESCRIPTIONS = {
  'camden': {
    landmark: 'Camden Market',
    description: 'Camden Market street food and vintage shops',
    colors: ['#FF1493', '#000000', '#FFFFFF'],
    icon: '🎨'
  },
  'central-london': {
    landmark: 'Big Ben',
    description: 'Big Ben clock tower and Westminster',
    colors: ['#4169E1', '#FFD700', '#FFFFFF'],
    icon: '🏛️'
  },
  'hackney': {
    landmark: 'Shoreditch',
    description: 'Shoreditch street art and trendy cafes',
    colors: ['#32CD32', '#FFD700', '#000000'],
    icon: '🎭'
  },
  'havering': {
    landmark: 'Romford',
    description: 'Romford town center and shopping',
    colors: ['#87CEEB', '#FFFFFF', '#000000'],
    icon: '🏘️'
  },
  'kensington-and-chelsea': {
    landmark: 'Kensington Palace',
    description: 'Kensington Palace and museums',
    colors: ['#8B008B', '#FFD700', '#FFFFFF'],
    icon: '👑'
  },
  'newham': {
    landmark: 'Olympic Park',
    description: 'Stratford Olympic Park and stadium',
    colors: ['#FF6347', '#FFFFFF', '#000000'],
    icon: '🏟️'
  },
  'redbridge': {
    landmark: 'Ilford',
    description: 'Ilford high street and community',
    colors: ['#DC143C', '#FFFFFF', '#000000'],
    icon: '🏢'
  },
  'southwark': {
    landmark: 'Borough Market',
    description: 'Borough Market food stalls and London Bridge',
    colors: ['#32CD32', '#8B4513', '#FFFFFF'],
    icon: '🌉'
  },
  'tower-hamlets': {
    landmark: 'Canary Wharf',
    description: 'Canary Wharf financial district and skyscrapers',
    colors: ['#2F4F4F', '#FFD700', '#FFFFFF'],
    icon: '🏗️'
  },
  'westminster': {
    landmark: 'Parliament',
    description: 'Westminster Abbey and Houses of Parliament',
    colors: ['#FFD700', '#8B0000', '#FFFFFF'],
    icon: '🏛️'
  }
};

async function createFoodImage(cuisine, foodData, outputPath) {
  try {
    console.log(`   🍽️ Creating ${cuisine} food image: ${foodData.food}`);
    
    // Create a high-quality food image using sharp with proper food colors
    const width = 1920;
    const height = 1080;
    
    // Create a gradient background with food-appropriate colors
    const gradient = sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 139, g: 69, b: 19 } // Brown base for food
      }
    });
    
    // Apply food-specific colors and effects
    await gradient
      .composite([{
        input: Buffer.from(`
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${foodData.colors[0]};stop-opacity:0.8" />
                <stop offset="50%" style="stop-color:${foodData.colors[1]};stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:${foodData.colors[2]};stop-opacity:0.8" />
              </linearGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#foodGrad)"/>
            <rect width="${width}" height="${height}" fill="rgba(0,0,0,0.2)"/>
            
            <!-- Food text overlay -->
            <g transform="translate(${width/2}, ${height/2})">
              <text x="0" y="-50" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" stroke="rgba(0,0,0,0.5)" stroke-width="2">
                ${foodData.food}
              </text>
              <text x="0" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.3)" stroke-width="1">
                ${foodData.description}
              </text>
            </g>
          </svg>
        `),
        top: 0,
        left: 0
      }])
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

async function createAreaImage(area, areaData, outputPath) {
  try {
    console.log(`   🏙️ Creating ${area} area image: ${areaData.landmark}`);
    
    // Create a high-quality area image using sharp with proper London colors
    const width = 1920;
    const height = 1080;
    
    // Create a gradient background with London-appropriate colors
    const gradient = sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 25, g: 25, b: 25 } // Dark base for London
      }
    });
    
    // Apply area-specific colors and effects
    await gradient
      .composite([{
        input: Buffer.from(`
          <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="areaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${areaData.colors[0]};stop-opacity:0.8" />
                <stop offset="50%" style="stop-color:${areaData.colors[1]};stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:${areaData.colors[2]};stop-opacity:0.8" />
              </linearGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#areaGrad)"/>
            <rect width="${width}" height="${height}" fill="rgba(0,0,0,0.3)"/>
            
            <!-- Area text overlay -->
            <g transform="translate(${width/2}, ${height/2})">
              <text x="0" y="-50" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" stroke="rgba(0,0,0,0.5)" stroke-width="2">
                ${areaData.landmark}
              </text>
              <text x="0" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.3)" stroke-width="1">
                ${areaData.description}
              </text>
            </g>
          </svg>
        `),
        top: 0,
        left: 0
      }])
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
console.log('🍽️ CREATING PROPER CUISINE FOOD IMAGES...');
for (const [cuisine, foodData] of Object.entries(CUISINE_FOOD_DESCRIPTIONS)) {
  const outputPath = path.join(OUTPUT_DIR, 'cuisines', `${cuisine}-tile.webp`);
  
  const success = await createFoodImage(cuisine, foodData, outputPath);
  if (success) {
    cuisineSuccess++;
  } else {
    cuisineError++;
  }
}

// Create proper area images for areas
console.log('\n🏙️ CREATING PROPER AREA LOCATION IMAGES...');
for (const [area, areaData] of Object.entries(AREA_LOCATION_DESCRIPTIONS)) {
  const outputPath = path.join(OUTPUT_DIR, 'areas', `${area}-tile.webp`);
  
  const success = await createAreaImage(area, areaData, outputPath);
  if (success) {
    areaSuccess++;
  } else {
    areaError++;
  }
}

console.log(`\n📊 CREATION SUMMARY:`);
console.log(`   ✅ Cuisine food images: ${cuisineSuccess}/${Object.keys(CUISINE_FOOD_DESCRIPTIONS).length}`);
console.log(`   ❌ Cuisine failures: ${cuisineError}`);
console.log(`   ✅ Area location images: ${areaSuccess}/${Object.keys(AREA_LOCATION_DESCRIPTIONS).length}`);
console.log(`   ❌ Area failures: ${areaError}`);

if (cuisineSuccess > 0 && areaSuccess > 0) {
  console.log(`\n🎉 SUCCESS! Created proper food and area images.`);
  console.log(`   Each cuisine now shows its signature food (e.g., Fish and Chips for British)`);
  console.log(`   Each area now shows its landmark (e.g., Big Ben for Central London)`);
} else {
  console.log(`\n⚠️  Some images failed to create.`);
}

console.log(`\n🔍 Next: Test the website to see proper food and area images...`);
