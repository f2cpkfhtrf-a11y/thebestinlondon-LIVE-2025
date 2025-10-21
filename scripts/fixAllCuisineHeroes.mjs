#!/usr/bin/env node
/**
 * Fix ALL cuisine heroes to use real restaurant images from existing files
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'data/venues.json');
const CUISINE_DATA_FILE = path.join(ROOT, 'lib/cuisineData.js');

function loadVenues() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(content);
  return Array.isArray(data) ? data : (data.venues || []);
}

function findBestRestaurantImageForCuisine(venues, cuisineSlug) {
  const normalizedSlug = cuisineSlug.toLowerCase().replace(/\s+/g, '-');
  const restaurantsDir = path.join(ROOT, 'public/images/restaurants');
  
  // Filter venues by cuisine and find ones with actual image files
  const cuisineVenues = venues.filter(v => 
    v.cuisines && v.cuisines.some(c => 
      c.toLowerCase().replace(/\s+/g, '-') === normalizedSlug
    ) && v.slug
  ).sort((a, b) => {
    // Sort by rating first, then reviews
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    if (ratingB !== ratingA) return ratingB - ratingA;
    return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
  });
  
  // Try to find actual image files in restaurant directories
  for (const venue of cuisineVenues.slice(0, 10)) {
    if (!venue.slug) continue;
    
    // Try to find the directory by slug parts
    const slugParts = venue.slug.split('-');
    const allDirs = fs.readdirSync(restaurantsDir);
    
    // Try various directory name patterns
    const possibleDirNames = [
      venue.slug,
      slugParts.slice(0, -2).join('-'),
      slugParts.slice(0, -3).join('-'),
      ...allDirs.filter(d => d.includes(slugParts[0]) && d.includes(slugParts[1] || ''))
    ].filter(Boolean);
    
    for (const dirName of possibleDirNames) {
      const fullDir = path.join(restaurantsDir, dirName);
      if (fs.existsSync(fullDir) && fs.statSync(fullDir).isDirectory()) {
        const files = fs.readdirSync(fullDir);
        // Prefer hero.webp, then any -hero-*.webp file
        const heroFile = files.find(f => 
          (f === 'hero.webp' || (f.includes('-hero-') && f.endsWith('.webp'))) &&
          !f.includes('blur')
        );
        if (heroFile && fs.existsSync(path.join(fullDir, heroFile))) {
          return `/images/restaurants/${dirName}/${heroFile}`;
        }
        // Fallback to any webp
        const anyWebp = files.find(f => f.endsWith('.webp') && !f.includes('blur'));
        if (anyWebp && fs.existsSync(path.join(fullDir, anyWebp))) {
          return `/images/restaurants/${dirName}/${anyWebp}`;
        }
      }
    }
  }
  
  return null;
}

function updateAllCuisineHeroes() {
  console.log('🎨 FIXING ALL CUISINE HERO IMAGES\n');
  
  const venues = loadVenues();
  console.log(`📊 Loaded ${venues.length} venues\n`);
  
  let cuisineDataContent = fs.readFileSync(CUISINE_DATA_FILE, 'utf8');
  
  // Get all unique cuisines from venues
  const allCuisines = new Set();
  venues.forEach(v => {
    (v.cuisines || []).forEach(c => {
      allCuisines.add(c.toLowerCase().replace(/\s+/g, '-'));
    });
  });
  
  console.log(`Found ${allCuisines.size} unique cuisines\n`);
  
  const updates = [];
  
  // Update or add entries for all cuisines
  for (const cuisineSlug of Array.from(allCuisines).sort()) {
    const heroImage = findBestRestaurantImageForCuisine(venues, cuisineSlug);
    
    if (heroImage) {
      // Verify file exists
      const fullPath = path.join(ROOT, 'public', heroImage);
      if (fs.existsSync(fullPath)) {
        updates.push({ cuisine: cuisineSlug, heroImage });
        console.log(`✅ ${cuisineSlug}: ${heroImage}`);
        
        // Update or add in cuisineData
        const cuisineName = cuisineSlug.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ');
        
        // Try to update existing entry
        const updatePattern = new RegExp(
          `("${cuisineSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[^}]*"heroImage":\\s*)"[^"]*"`,
          'g'
        );
        
        if (cuisineDataContent.match(updatePattern)) {
          cuisineDataContent = cuisineDataContent.replace(
            updatePattern,
            `$1"${heroImage}"`
          );
        } else {
          // Add new entry before the closing brace
          const newEntry = `  "${cuisineSlug}": {\n    "slug": "${cuisineSlug}",\n    "name": "${cuisineName}",\n    "heroImage": "${heroImage}",\n    "heroAlt": "${cuisineName} cuisine in London",\n    "intro": "Explore London's finest ${cuisineName.toLowerCase()} restaurants, carefully curated for exceptional quality and authentic flavors."\n  },\n`;
          
          // Insert before the closing brace of cuisineData object
          const insertBefore = cuisineDataContent.lastIndexOf('}');
          cuisineDataContent = cuisineDataContent.slice(0, insertBefore) + 
                             newEntry + 
                             cuisineDataContent.slice(insertBefore);
        }
      }
    } else {
      console.log(`⚠️  ${cuisineSlug}: No restaurant image found`);
    }
  }
  
  // Update default fallback
  const defaultHero = findBestRestaurantImageForCuisine(venues, 'british') || 
                     '/images/heroes/cuisines/british.webp';
  cuisineDataContent = cuisineDataContent.replace(
    /heroImage:\s*"\/hero[^"]*default-hero[^"]*"/g,
    `heroImage: "${defaultHero}"`
  );
  
  cuisineDataContent = cuisineDataContent.replace(
    /heroImage:\s*"\/hero_v2\/[^"]*"/g,
    (match) => {
      // Try to find replacement
      const cuisine = match.match(/hero_v2\/([^"\/]+)-hero/);
      if (cuisine) {
        const replacement = findBestRestaurantImageForCuisine(venues, cuisine[1]);
        if (replacement) return `heroImage: "${replacement}"`;
      }
      return match.replace(/hero_v2\/[^"]*/, defaultHero.replace('/images/', '/hero_v2/').replace('.webp', '-hero.webp'));
    }
  );
  
  fs.writeFileSync(CUISINE_DATA_FILE, cuisineDataContent);
  console.log(`\n✅ Updated ${updates.length} cuisine hero images\n`);
  
  return updates.length;
}

updateAllCuisineHeroes();

