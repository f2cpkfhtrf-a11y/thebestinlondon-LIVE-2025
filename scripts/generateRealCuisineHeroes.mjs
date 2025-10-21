#!/usr/bin/env node
/**
 * Generate real cuisine hero images from actual restaurant data
 * Uses the best restaurant image from each cuisine as the hero
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'data/venues.json');
const CUISINE_DATA_FILE = path.join(ROOT, 'lib/cuisineData.js');

function loadVenues() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(content);
    return Array.isArray(data) ? data : (data.venues || []);
  } catch (error) {
    console.error('Error loading venues:', error.message);
    return [];
  }
}

function findBestHeroImageForCuisine(venues, cuisineSlug) {
  const normalizedSlug = cuisineSlug.toLowerCase().replace(/\s+/g, '-');
  
  // Filter venues by cuisine
  const cuisineVenues = venues.filter(v => 
    v.cuisines && v.cuisines.some(c => 
      c.toLowerCase().replace(/\s+/g, '-') === normalizedSlug
    )
  );
  
  if (cuisineVenues.length === 0) {
    return null;
  }
  
  // Find venue with best hero image (prefer high-rated venues)
  const venuesWithHero = cuisineVenues
    .filter(v => v.image_hero_path && !v.image_hero_path.includes('placeholder'))
    .sort((a, b) => {
      // Prefer higher rated venues
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      
      // Then prefer venues with more reviews
      const reviewsA = a.user_ratings_total || 0;
      const reviewsB = b.user_ratings_total || 0;
      return reviewsB - reviewsA;
    });
  
  if (venuesWithHero.length > 0) {
    return venuesWithHero[0].image_hero_path.replace('/public', '');
  }
  
  // Fallback to card image
  const venuesWithCard = cuisineVenues
    .filter(v => v.image_card_path && !v.image_card_path.includes('placeholder'))
    .sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      const reviewsA = a.user_ratings_total || 0;
      const reviewsB = b.user_ratings_total || 0;
      return reviewsB - reviewsA;
    });
  
  if (venuesWithCard.length > 0) {
    return venuesWithCard[0].image_card_path.replace('/public', '');
  }
  
  return null;
}

function updateCuisineData() {
  console.log('🎨 GENERATING REAL CUISINE HERO IMAGES FROM RESTAURANT DATA\n');
  
  const venues = loadVenues();
  console.log(`📊 Loaded ${venues.length} venues\n`);
  
  // Read current cuisine data
  let cuisineDataContent = fs.readFileSync(CUISINE_DATA_FILE, 'utf8');
  
  // Find heroes for all cuisines
  const cuisineMap = {
    'vegetarian': 'vegetarian',
    'vegan': 'vegan',
    'sweets': 'desserts',  // Map sweets to desserts
    'nepalese': 'indian',   // Use Indian hero for Nepalese
    'south-indian': 'indian',
    'punjabi': 'indian',
    'curry': 'indian',
    'bengali': 'indian',
    'gujarati': 'indian',
    'kashmiri': 'indian',
    'rajasthani': 'indian',
    'pan-asian': 'japanese',
    'european': 'modern-european',
    'australian': 'american',
    'caribbean': 'caribbean',
    'african': 'african',
    'british': 'british',
    'chinese': 'chinese',
    'french': 'french',
    'indian': 'indian',
    'italian': 'italian',
    'japanese': 'japanese',
    'korean': 'korean',
    'mediterranean': 'mediterranean',
    'mexican': 'mexican',
    'modern-european': 'modern-european',
    'spanish': 'spanish',
    'thai': 'thai',
    'turkish': 'turkish',
  };
  
  const updates = [];
  
  for (const [cuisineKey, lookupCuisine] of Object.entries(cuisineMap)) {
    const heroImage = findBestHeroImageForCuisine(venues, lookupCuisine);
    
    if (heroImage) {
      // Check if file exists
      const fullPath = path.join(ROOT, 'public', heroImage);
      if (fs.existsSync(fullPath)) {
        updates.push({
          cuisine: cuisineKey,
          heroImage: heroImage,
          exists: true
        });
        console.log(`✅ ${cuisineKey}: ${heroImage}`);
      } else {
        console.log(`⚠️  ${cuisineKey}: Image not found at ${heroImage}`);
      }
    } else {
      console.log(`❌ ${cuisineKey}: No suitable restaurant image found`);
    }
  }
  
  // Update cuisine data file
  console.log('\n📝 Updating cuisine data file...\n');
  
  updates.forEach(({ cuisine, heroImage }) => {
    // Find the cuisine entry in the file
    const pattern = new RegExp(`("${cuisine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[^}]*"heroImage":\\s*)"[^"]*"`, 'g');
    const replacement = `$1"${heroImage}"`;
    
    if (cuisineDataContent.match(pattern)) {
      cuisineDataContent = cuisineDataContent.replace(pattern, replacement);
      console.log(`  ✓ Updated ${cuisine}`);
    } else {
      // Try to add if missing
      const cuisineEntry = `  "${cuisine}": {\n    "slug": "${cuisine}",\n    "name": "${cuisine.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}",\n    "heroImage": "${heroImage}",\n    "heroAlt": "${cuisine} cuisine in London",\n    "intro": "Explore London's finest ${cuisine} restaurants."\n  },\n`;
      
      // Add before the closing brace
      cuisineDataContent = cuisineDataContent.replace(/(};)/, `${cuisineEntry}$1`);
      console.log(`  ➕ Added ${cuisine}`);
    }
  });
  
  // Update fallback to use a real default
  const defaultHero = findBestHeroImageForCuisine(venues, 'british') || '/images/heroes/cuisines/british.webp';
  cuisineDataContent = cuisineDataContent.replace(
    /heroImage:\s*"\/hero-cuisines\/default-hero\.svg"/g,
    `heroImage: "${defaultHero}"`
  );
  
  fs.writeFileSync(CUISINE_DATA_FILE, cuisineDataContent);
  console.log(`\n✅ Updated ${updates.length} cuisine hero images\n`);
  
  return updates.length;
}

updateCuisineData();

