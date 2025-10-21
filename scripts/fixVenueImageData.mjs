#!/usr/bin/env node
/**
 * Fix venue image data by matching slugs to actual existing image files
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'data/venues.json');
const RESTAURANTS_DIR = path.join(ROOT, 'public/images/restaurants');

function loadVenues() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(content);
  return Array.isArray(data) ? data : (data.venues || []);
}

function findMatchingImageDirectory(venueSlug) {
  if (!venueSlug) return null;
  
  const slugParts = venueSlug.split('-').filter(Boolean);
  if (slugParts.length < 2) return null;
  
  const allDirs = fs.readdirSync(RESTAURANTS_DIR).filter(d => {
    const fullPath = path.join(RESTAURANTS_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });
  
  // Try to match by slug components
  // Match first 2-3 words of slug with directory names
  for (let i = Math.min(3, slugParts.length); i >= 2; i--) {
    const partialSlug = slugParts.slice(0, i).join('-');
    const matching = allDirs.filter(d => 
      d.toLowerCase().includes(partialSlug.toLowerCase()) ||
      partialSlug.toLowerCase().includes(d.toLowerCase().split('-').slice(0, i).join('-'))
    );
    
    if (matching.length > 0) {
      // Find one with hero image
      for (const dir of matching) {
        const fullDir = path.join(RESTAURANTS_DIR, dir);
        const files = fs.readdirSync(fullDir);
        const heroFile = files.find(f => 
          (f === 'hero.webp' || (f.includes('-hero-') && f.endsWith('.webp'))) &&
          !f.includes('blur')
        );
        if (heroFile) {
          return { dir, hero: heroFile, card: files.find(f => f.includes('-card-') && f.endsWith('.webp') && !f.includes('blur')) || heroFile };
        }
      }
    }
  }
  
  return null;
}

function fixVenueImageData() {
  console.log('🔧 FIXING VENUE IMAGE DATA\n');
  
  const venues = loadVenues();
  console.log(`📊 Processing ${venues.length} venues...\n`);
  
  let fixed = 0;
  let alreadyGood = 0;
  let noMatch = 0;
  
  const updatedVenues = venues.map((venue, index) => {
    // Check if current paths exist
    const currentHeroExists = venue.image_hero_path && 
      fs.existsSync(path.join(ROOT, 'public', venue.image_hero_path.replace('/public', '')));
    const currentCardExists = venue.image_card_path && 
      fs.existsSync(path.join(ROOT, 'public', venue.image_card_path.replace('/public', '')));
    
    if (currentHeroExists && currentCardExists) {
      alreadyGood++;
      return venue;
    }
    
    // Try to find matching directory
    const match = findMatchingImageDirectory(venue.slug);
    
    if (match) {
      if (!currentHeroExists) {
        venue.image_hero_path = `/images/restaurants/${match.dir}/${match.hero}`;
      }
      if (!currentCardExists) {
        venue.image_card_path = `/images/restaurants/${match.dir}/${match.card}`;
      }
      fixed++;
      if (fixed <= 5) {
        console.log(`✅ ${venue.name}: /images/restaurants/${match.dir}/${match.hero}`);
      }
      return venue;
    }
    
    noMatch++;
    return venue;
  });
  
  console.log(`\n📊 Results:`);
  console.log(`  ✅ Already correct: ${alreadyGood}`);
  console.log(`  🔧 Fixed: ${fixed}`);
  console.log(`  ⚠️  No match found: ${noMatch}\n`);
  
  // Write back
  const output = Array.isArray(venues) ? updatedVenues : { ...venues, venues: updatedVenues };
  fs.writeFileSync(DATA_FILE, JSON.stringify(output, null, 2));
  console.log('✅ Updated venues.json\n');
  
  return { fixed, alreadyGood, noMatch };
}

fixVenueImageData();

