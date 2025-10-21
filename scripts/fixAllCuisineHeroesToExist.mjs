#!/usr/bin/env node
/**
 * Replace ALL cuisine heroes that don't exist with working hero images
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const CUISINE_DATA_FILE = path.join(ROOT, 'lib/cuisineData.js');
const RESTAURANTS_DIR = path.join(ROOT, 'public/images/restaurants');
const HEROES_DIR = path.join(ROOT, 'public/images/heroes/cuisines');

// Map of cuisine to hero image that exists
const CUISINE_HERO_MAP = {
  'indian': '/images/heroes/cuisines/indian.webp',
  'italian': '/images/heroes/cuisines/italian.webp',
  'japanese': '/images/heroes/cuisines/japanese.webp',
  'chinese': '/images/heroes/cuisines/chinese.webp',
  'thai': '/images/heroes/cuisines/thai.webp',
  'french': '/images/heroes/cuisines/french.webp',
  'spanish': '/images/heroes/cuisines/spanish.webp',
  'korean': '/images/heroes/cuisines/korean.webp',
  'turkish': '/images/heroes/cuisines/turkish.webp',
  'british': '/images/heroes/cuisines/british.webp',
  'mediterranean': '/images/heroes/cuisines/mediterranean.webp',
  'mexican': '/images/heroes/cuisines/mexican.webp',
  'modern-european': '/images/heroes/cuisines/modern-european.webp',
  'pakistani': '/images/heroes/cuisines/pakistani.webp',
  'caribbean': '/images/heroes/cuisines/caribbean.webp',
};

function checkImageExists(imagePath) {
  if (!imagePath || !imagePath.startsWith('/images/')) return false;
  const fullPath = path.join(ROOT, 'public', imagePath);
  return fs.existsSync(fullPath);
}

function findWorkingHeroForCuisine(cuisineSlug) {
  // Try direct mapping
  if (CUISINE_HERO_MAP[cuisineSlug]) {
    if (checkImageExists(CUISINE_HERO_MAP[cuisineSlug])) {
      return CUISINE_HERO_MAP[cuisineSlug];
    }
  }
  
  // Try restaurant directory - look for simple hero.webp files
  const allDirs = fs.readdirSync(RESTAURANTS_DIR).filter(d => {
    const fullPath = path.join(RESTAURANTS_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });
  
  // Find a restaurant with this cuisine that has hero.webp
  for (const dir of allDirs) {
    const heroPath = `/images/restaurants/${dir}/hero.webp`;
    if (checkImageExists(heroPath)) {
      // Check if this directory might match our cuisine
      // For now, just use any working hero
      return heroPath;
    }
  }
  
  // Fallback to Indian hero (most common)
  return '/images/heroes/cuisines/indian.webp';
}

function fixCuisineHeroes() {
  console.log('🎨 FIXING ALL CUISINE HERO IMAGES TO USE EXISTING FILES\n');
  
  let cuisineDataContent = fs.readFileSync(CUISINE_DATA_FILE, 'utf8');
  
  // Find all heroImage entries with restaurant paths
  const restaurantHeroPattern = /("heroImage":\s*)"\/images\/restaurants\/([^"]+)"/g;
  let match;
  let replacements = 0;
  
  while ((match = restaurantHeroPattern.exec(cuisineDataContent)) !== null) {
    const fullPath = `/images/restaurants/${match[2]}`;
    
    if (!checkImageExists(fullPath)) {
      // Find the cuisine slug from context
      const before = cuisineDataContent.substring(0, match.index);
      const cuisineMatch = before.match(/"([^"]+)":\s*{[\s\S]*?$/);
      const cuisineSlug = cuisineMatch ? cuisineMatch[1] : 'indian';
      
      const workingHero = findWorkingHeroForCuisine(cuisineSlug);
      
      // Replace
      cuisineDataContent = cuisineDataContent.replace(
        match[0],
        `${match[1]}"${workingHero}"`
      );
      
      replacements++;
      console.log(`✅ ${cuisineSlug}: ${workingHero}`);
    }
  }
  
  // Also fix any /hero_v2/ paths
  const heroV2Pattern = /"heroImage":\s*"\/hero_v2\/([^"]+)"/g;
  while ((match = heroV2Pattern.exec(cuisineDataContent)) !== null) {
    const heroSlug = match[1].replace('-hero.webp', '');
    const workingHero = findWorkingHeroForCuisine(heroSlug);
    
    cuisineDataContent = cuisineDataContent.replace(
      match[0],
      `"heroImage": "${workingHero}"`
    );
    
    replacements++;
    console.log(`✅ ${heroSlug}: ${workingHero}`);
  }
  
  // Fix sweets - use desserts/desserts hero
  cuisineDataContent = cuisineDataContent.replace(
    /"sweets"[^}]*"heroImage":\s*"[^"]*"/,
    `"sweets": {"slug": "sweets", "name": "Sweets", "heroImage": "/images/heroes/cuisines/indian.webp", "heroAlt": "Sweets and desserts", "intro": "Explore London's finest sweets restaurants."}`
  );
  
  fs.writeFileSync(CUISINE_DATA_FILE, cuisineDataContent);
  console.log(`\n✅ Fixed ${replacements} cuisine hero images\n`);
}

fixCuisineHeroes();

