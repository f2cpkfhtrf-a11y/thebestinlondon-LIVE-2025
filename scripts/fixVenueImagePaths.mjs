#!/usr/bin/env node
/**
 * Fix venue image paths to use actual existing files
 * Checks for hero.webp and card webp files in restaurant directories
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'data/venues.json');

function loadVenues() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(content);
  return Array.isArray(data) ? data : (data.venues || []);
}

function findActualImagePath(venue, type = 'hero') {
  if (!venue.slug) return null;
  
  // Try to find the restaurant directory by slug
  const slugParts = venue.slug.split('-');
  
  // Try various directory name patterns
  const possibleDirs = [
    venue.slug,
    slugParts.slice(0, -2).join('-'), // Remove last 2 parts (ID)
    slugParts.slice(0, -3).join('-'), // Remove last 3 parts
    venue.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  ].filter(Boolean);
  
  const restaurantsDir = path.join(ROOT, 'public/images/restaurants');
  
  for (const dirName of possibleDirs) {
    const fullDir = path.join(restaurantsDir, dirName);
    if (fs.existsSync(fullDir) && fs.statSync(fullDir).isDirectory()) {
      // Look for hero.webp or card.webp files
      const files = fs.readdirSync(fullDir);
      
      if (type === 'hero') {
        // Prefer hero.webp, then any -hero-*.webp
        const heroFile = files.find(f => f === 'hero.webp' || f.includes('-hero-') && f.endsWith('.webp'));
        if (heroFile) {
          return `/images/restaurants/${dirName}/${heroFile}`;
        }
      } else {
        // For card, prefer card.webp, then any -card-*.webp
        const cardFile = files.find(f => f === 'card.webp' || (f.includes('-card-') && f.endsWith('.webp')));
        if (cardFile) {
          return `/images/restaurants/${dirName}/${cardFile}`;
        }
      }
      
      // Fallback: any webp file
      const anyWebp = files.find(f => f.endsWith('.webp'));
      if (anyWebp) {
        return `/images/restaurants/${dirName}/${anyWebp}`;
      }
    }
  }
  
  return null;
}

function updateVenueImagePaths() {
  console.log('🔍 FIXING VENUE IMAGE PATHS\n');
  
  const venues = loadVenues();
  console.log(`📊 Processing ${venues.length} venues...\n`);
  
  let updated = 0;
  let fixed = 0;
  
  const updatedVenues = venues.map(venue => {
    let changed = false;
    
    // Fix hero image
    if (!venue.image_hero_path || !fs.existsSync(path.join(ROOT, 'public', venue.image_hero_path.replace('/public', '')))) {
      const actualHero = findActualImagePath(venue, 'hero');
      if (actualHero && fs.existsSync(path.join(ROOT, 'public', actualHero))) {
        venue.image_hero_path = actualHero;
        changed = true;
        fixed++;
      }
    } else {
      updated++;
    }
    
    // Fix card image
    if (!venue.image_card_path || !fs.existsSync(path.join(ROOT, 'public', venue.image_card_path.replace('/public', '')))) {
      const actualCard = findActualImagePath(venue, 'card');
      if (actualCard && fs.existsSync(path.join(ROOT, 'public', actualCard))) {
        venue.image_card_path = actualCard;
        changed = true;
        fixed++;
      }
    } else {
      updated++;
    }
    
    return venue;
  });
  
  console.log(`✅ Verified ${updated} existing image paths`);
  console.log(`🔧 Fixed ${fixed} missing image paths`);
  console.log(`📝 Total venues: ${updatedVenues.length}\n`);
  
  // Write back
  const output = Array.isArray(venues) ? updatedVenues : { ...venues, venues: updatedVenues };
  fs.writeFileSync(DATA_FILE, JSON.stringify(output, null, 2));
  console.log('✅ Updated venues.json with corrected image paths\n');
  
  return { updated, fixed, total: updatedVenues.length };
}

updateVenueImagePaths();

