#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const MIN_FILE_KB = parseInt(process.env.PIPELINE_MIN_FILE_KB || '50');

async function listMissing() {
  console.log('📋 LISTING MISSING IMAGES');
  console.log('==========================');
  
  // Load venues
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues || venuesData;
  
  console.log(`📁 Total venues: ${venues.length}`);
  
  let missingCount = 0;
  const missingVenues = [];
  
  for (const venue of venues) {
    const slug = venue.slug || venue.place_id;
    const hasCardPath = venue.image_card_path;
    const hasHeroPath = venue.image_hero_path;
    
    // Check if both paths exist and are valid
    let hasValidCard = false;
    let hasValidHero = false;
    
    if (hasCardPath) {
      try {
        // Handle paths that start with /public/ or /images/restaurants/
        let cardPath;
        if (hasCardPath.startsWith('/public/')) {
          cardPath = path.join(process.cwd(), hasCardPath.replace(/^\//, ''));
        } else if (hasCardPath.startsWith('/images/')) {
          cardPath = path.join(process.cwd(), 'public', hasCardPath.replace(/^\//, ''));
        } else {
          cardPath = path.join(process.cwd(), 'public', hasCardPath.replace(/^\//, ''));
        }
        
        if (fs.existsSync(cardPath)) {
          const stats = fs.statSync(cardPath);
          if (stats.size >= MIN_FILE_KB * 1024) {
            hasValidCard = true;
          }
        }
      } catch (error) {
        // File doesn't exist or can't be read
      }
    }
    
    if (hasHeroPath) {
      try {
        // Handle paths that start with /public/ or /images/restaurants/
        let heroPath;
        if (hasHeroPath.startsWith('/public/')) {
          heroPath = path.join(process.cwd(), hasHeroPath.replace(/^\//, ''));
        } else if (hasHeroPath.startsWith('/images/')) {
          heroPath = path.join(process.cwd(), 'public', hasHeroPath.replace(/^\//, ''));
        } else {
          heroPath = path.join(process.cwd(), 'public', hasHeroPath.replace(/^\//, ''));
        }
        
        if (fs.existsSync(heroPath)) {
          const stats = fs.statSync(heroPath);
          if (stats.size >= MIN_FILE_KB * 1024) {
            hasValidHero = true;
          }
        }
      } catch (error) {
        // File doesn't exist or can't be read
      }
    }
    
    if (!hasValidCard || !hasValidHero) {
      missingCount++;
      missingVenues.push({
        name: venue.name,
        slug: slug,
        hasCard: hasValidCard,
        hasHero: hasValidHero,
        cardPath: venue.image_card_path,
        heroPath: venue.image_hero_path
      });
    }
  }
  
  console.log(`❌ Venues missing valid images: ${missingCount}`);
  console.log(`✅ Venues with valid images: ${venues.length - missingCount}`);
  
  if (missingVenues.length > 0) {
    console.log('\n🔍 Sample missing venues:');
    missingVenues.slice(0, 10).forEach(venue => {
      console.log(`  ${venue.name} - Card: ${venue.hasCard ? '✓' : '✗'}, Hero: ${venue.hasHero ? '✓' : '✗'}`);
    });
    if (missingVenues.length > 10) {
      console.log(`  ... and ${missingVenues.length - 10} more`);
    }
  }
  
  // Calculate estimated cost
  const costPerVenue = 0.031;
  const bufferFactor = 1.2;
  const estimatedCost = missingCount * costPerVenue * bufferFactor;
  
  console.log(`\n💰 ESTIMATED COST:`);
  console.log(`   ${missingCount} venues × $${costPerVenue} × ${bufferFactor} = $${estimatedCost.toFixed(2)}`);
  
  // Output required format for pipeline
  console.log(`\nremaining_to_process: ${missingCount}`);
  
  return { missingCount, missingVenues, estimatedCost };
}

if (require.main === module) {
  listMissing().catch(console.error);
}

module.exports = { listMissing };
