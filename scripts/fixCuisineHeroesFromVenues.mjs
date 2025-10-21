#!/usr/bin/env node
/**
 * Fix cuisine heroes using BEST restaurant images from each cuisine
 * Only uses images that actually exist on disk
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'data/venues.json');
const CUISINE_DATA_FILE = path.join(ROOT, 'lib/cuisineData.js');
const RESTAURANTS_DIR = path.join(ROOT, 'public/images/restaurants');

function loadVenues() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(content);
  return Array.isArray(data) ? data : (data.venues || []);
}

function findBestImageForCuisine(venues, cuisineSlug) {
  const normalizedSlug = cuisineSlug.toLowerCase().replace(/\s+/g, '-');
  
  // Get venues with this cuisine, sorted by rating
  const cuisineVenues = venues
    .filter(v => 
      v.cuisines && v.cuisines.some(c => 
        c.toLowerCase().replace(/\s+/g, '-') === normalizedSlug
      ) && v.slug
    )
    .sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
    });
  
  // Try each venue's images until we find one that exists
  for (const venue of cuisineVenues.slice(0, 20)) {
    // Try hero path first
    if (venue.image_hero_path) {
      const heroPath = venue.image_hero_path.replace('/public', '');
      const fullPath = path.join(ROOT, 'public', heroPath);
      if (fs.existsSync(fullPath)) {
        return heroPath;
      }
    }
    
    // Try card path
    if (venue.image_card_path) {
      const cardPath = venue.image_card_path.replace('/public', '');
      const fullPath = path.join(ROOT, 'public', cardPath);
      if (fs.existsSync(fullPath)) {
        return cardPath;
      }
    }
    
    // Try to find by slug in restaurant directories
    if (venue.slug) {
      const slugParts = venue.slug.split('-');
      const allDirs = fs.readdirSync(RESTAURANTS_DIR).filter(d => {
        const fullPath = path.join(RESTAURANTS_DIR, d);
        return fs.statSync(fullPath).isDirectory();
      });
      
      // Match directory
      const matchingDir = allDirs.find(d => {
        const dirParts = d.toLowerCase().split('-');
        return slugParts.length >= 2 && 
               dirParts.includes(slugParts[0].toLowerCase()) &&
               (slugParts.length < 2 || dirParts.includes(slugParts[1]?.toLowerCase() || ''));
      });
      
      if (matchingDir) {
        const dirPath = path.join(RESTAURANTS_DIR, matchingDir);
        const files = fs.readdirSync(dirPath);
        const heroFile = files.find(f => 
          (f === 'hero.webp' || (f.includes('-hero-') && f.endsWith('.webp'))) &&
          !f.includes('blur')
        );
        if (heroFile) {
          const imagePath = `/images/restaurants/${matchingDir}/${heroFile}`;
          if (fs.existsSync(path.join(ROOT, 'public', imagePath))) {
            return imagePath;
          }
        }
      }
    }
  }
  
  return null;
}

function updateCuisineHeroes() {
  console.log('🎨 FIXING CUISINE HERO IMAGES WITH REAL RESTAURANT PHOTOS\n');
  
  const venues = loadVenues();
  console.log(`📊 Loaded ${venues.length} venues\n`);
  
  let cuisineDataContent = fs.readFileSync(CUISINE_DATA_FILE, 'utf8');
  
  // Get all cuisines that need heroes
  const cuisinesToFix = [
    'vegetarian', 'vegan', 'sweets', 'nepalese', 'south-indian', 'punjabi',
    'curry', 'bengali', 'gujarati', 'kashmiri', 'rajasthani', 'bangladeshi',
    'afghan'
  ];
  
  const updates = [];
  
  for (const cuisineSlug of cuisinesToFix) {
    const bestImage = findBestImageForCuisine(venues, cuisineSlug);
    
    if (bestImage) {
      const fullPath = path.join(ROOT, 'public', bestImage);
      if (fs.existsSync(fullPath)) {
        updates.push({ cuisine: cuisineSlug, image: bestImage });
        console.log(`✅ ${cuisineSlug}: ${bestImage}`);
        
        // Update in cuisineData
        const cuisineName = cuisineSlug.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ');
        
        // Update existing entry
        const updatePattern = new RegExp(
          `("${cuisineSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[^}]*"heroImage":\\s*)"[^"]*"`,
          'g'
        );
        
        if (cuisineDataContent.match(updatePattern)) {
          cuisineDataContent = cuisineDataContent.replace(
            updatePattern,
            `$1"${bestImage}"`
          );
        } else {
          // Add new entry
          const newEntry = `  "${cuisineSlug}": {\n    "slug": "${cuisineSlug}",\n    "name": "${cuisineName}",\n    "heroImage": "${bestImage}",\n    "heroAlt": "${cuisineName} cuisine in London",\n    "intro": "Explore London's finest ${cuisineName.toLowerCase()} restaurants, carefully curated for exceptional quality and authentic flavors."\n  },\n`;
          
          // Find last entry before closing brace
          const lastComma = cuisineDataContent.lastIndexOf(',\n  "');
          if (lastComma > 0) {
            cuisineDataContent = cuisineDataContent.slice(0, lastComma + 2) + 
                                 newEntry + 
                                 cuisineDataContent.slice(lastComma + 2);
          }
        }
      }
    } else {
      console.log(`⚠️  ${cuisineSlug}: No suitable image found`);
    }
  }
  
  // Also update vegetarian from actual data
  const vegVenues = venues.filter(v => 
    v.cuisines && v.cuisines.includes('vegetarian')
  ).sort((a, b) => (b.rating || 0) - (a.rating || 0));
  
  if (vegVenues.length > 0) {
    for (const v of vegVenues.slice(0, 10)) {
      if (v.image_hero_path) {
        const heroPath = v.image_hero_path.replace('/public', '');
        const fullPath = path.join(ROOT, 'public', heroPath);
        if (fs.existsSync(fullPath)) {
          cuisineDataContent = cuisineDataContent.replace(
            /"vegetarian":\s*{[^}]*"heroImage":\s*"[^"]*"/,
            `"vegetarian": {"slug": "vegetarian", "name": "Vegetarian", "heroImage": "${heroPath}", "heroAlt": "Creative vegetarian dishes", "intro": "Vegetarian cuisine proves vegetables can be the star."`
          );
          console.log(`✅ vegetarian: ${heroPath}`);
          break;
        }
      }
    }
  }
  
  fs.writeFileSync(CUISINE_DATA_FILE, cuisineDataContent);
  console.log(`\n✅ Updated ${updates.length} cuisine hero images\n`);
}

updateCuisineHeroes();

