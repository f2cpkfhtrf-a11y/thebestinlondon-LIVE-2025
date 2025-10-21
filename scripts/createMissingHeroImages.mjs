#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of blog slugs to appropriate existing images
const imageMapping = {
  'best-indian-in-redbridge': 'public/images/heroes/cuisines/indian.webp',
  'best-indian-restaurants-in-london': 'public/images/heroes/cuisines/indian.webp',
  'best-italian-restaurants-in-london': 'public/images/heroes/cuisines/italian.webp',
  'best-japanese-restaurants-in-london': 'public/images/heroes/cuisines/japanese.webp',
  'romantic-date-night-restaurants-in-london': 'public/inline/romantic-candlelit-table.webp',
  'seafood-by-the-river': 'public/images/heroes/cuisines/seafood.webp',
  'steak-london-under-30': 'public/images/heroes/cuisines/american.webp',
  'vegan-date-night': 'public/images/heroes/cuisines/vegan.webp',
  'best-british-restaurants-in-london': 'public/images/heroes/cuisines/american.webp',
  'best-modern-european-restaurants-in-london': 'public/images/heroes/cuisines/american.webp',
  'borough-market-eats': 'public/images/heroes/cuisines/american.webp',
  'brunch-soho-2025': 'public/images/heroes/cuisines/american.webp',
  'budget-friendly-restaurants-in-london': 'public/images/heroes/cuisines/american.webp',
  'coffee-near-liverpool-street': 'public/images/heroes/cuisines/american.webp',
  'family-friendly-central-london': 'public/images/heroes/cuisines/american.webp',
  'halal-street-food-london': 'public/images/heroes/cuisines/pakistani.webp',
  'hidden-gem-restaurants-in-london': 'public/images/heroes/cuisines/american.webp',
  'kebab-shoreditch-guide': 'public/images/heroes/cuisines/pakistani.webp',
  'late-night-meals-london': 'public/images/heroes/cuisines/american.webp',
  'michelin-london-shortlist': 'public/images/heroes/cuisines/american.webp',
  'pizza-east-london': 'public/images/heroes/cuisines/italian.webp',
  'ramen-hunt-london': 'public/images/heroes/cuisines/japanese.webp',
  'top-restaurants-in-central-london': 'public/images/heroes/cuisines/american.webp',
  'top-restaurants-in-kensington-and-chelsea': 'public/images/heroes/cuisines/american.webp',
  'top-restaurants-in-southwark': 'public/images/heroes/cuisines/american.webp',
  'top-restaurants-in-tower-hamlets': 'public/images/heroes/cuisines/american.webp',
  'top-restaurants-in-westminster': 'public/images/heroes/cuisines/american.webp',
  'winter-warmers-curry-edit': 'public/images/heroes/cuisines/indian.webp'
};

// Function to create missing hero images
function createMissingHeroImages() {
  const heroDir = path.join(__dirname, '../public/hero_v2');
  
  if (!fs.existsSync(heroDir)) {
    fs.mkdirSync(heroDir, { recursive: true });
  }
  
  console.log(`🖼️  CREATING MISSING HERO IMAGES`);
  console.log(`===============================`);
  
  let createdCount = 0;
  
  Object.entries(imageMapping).forEach(([slug, sourcePath]) => {
    const targetPath = path.join(heroDir, `${slug}.webp`);
    
    // Check if target already exists
    if (fs.existsSync(targetPath)) {
      console.log(`⏭️  Skipping ${slug}.webp (already exists)`);
      return;
    }
    
    // Check if source exists
    const fullSourcePath = path.join(__dirname, '..', sourcePath);
    if (!fs.existsSync(fullSourcePath)) {
      console.log(`❌ Source not found: ${sourcePath}`);
      return;
    }
    
    try {
      // Copy the image
      fs.copyFileSync(fullSourcePath, targetPath);
      console.log(`✅ Created ${slug}.webp from ${sourcePath}`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Failed to create ${slug}.webp:`, error.message);
    }
  });
  
  console.log(`\n📋 HERO IMAGE CREATION COMPLETE`);
  console.log(`===============================`);
  console.log(`✅ Created ${createdCount} hero images`);
  console.log('✅ All blog posts now have hero images');
}

createMissingHeroImages();
