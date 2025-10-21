#!/usr/bin/env node
/**
 * Comprehensive verification script for links and images
 * Checks:
 * 1. All restaurant detail page links
 * 2. All image paths resolve correctly
 * 3. Cuisine categorization consistency
 * 4. Hero images on detail pages
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'data/venues.json');
const PUBLIC_IMAGES = path.join(ROOT, 'public/images');

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

function checkImageExists(imagePath) {
  if (!imagePath) return false;
  const cleanPath = imagePath.replace('/public', '').replace(/^\//, '');
  const fullPath = path.join(ROOT, 'public', cleanPath);
  return fs.existsSync(fullPath);
}

function verifyRestaurantLinks(venues) {
  console.log('\n🔗 VERIFYING RESTAURANT LINKS\n');
  
  let validLinks = 0;
  let invalidLinks = 0;
  let missingSlugs = [];
  
  venues.forEach((venue, index) => {
    if (!venue.slug) {
      missingSlugs.push(venue.name || `Venue ${index}`);
      invalidLinks++;
    } else {
      // Check if slug format is valid
      if (venue.slug.length > 3 && venue.slug.match(/^[a-z0-9-]+$/i)) {
        validLinks++;
      } else {
        invalidLinks++;
        console.log(`  ⚠️  Invalid slug format: ${venue.name} -> ${venue.slug}`);
      }
    }
  });
  
  console.log(`  ✅ Valid restaurant links: ${validLinks}`);
  console.log(`  ❌ Invalid/missing slugs: ${invalidLinks}`);
  if (missingSlugs.length > 0 && missingSlugs.length < 10) {
    console.log(`  Missing slugs: ${missingSlugs.slice(0, 5).join(', ')}...`);
  }
  
  return { validLinks, invalidLinks, missingSlugs };
}

function verifyImages(venues) {
  console.log('\n🖼️  VERIFYING RESTAURANT IMAGES\n');
  
  let hasCardImages = 0;
  let hasHeroImages = 0;
  let hasBothImages = 0;
  let missingAllImages = 0;
  let imageFileExists = 0;
  let imageFileMissing = 0;
  
  venues.forEach((venue) => {
    const hasCard = !!venue.image_card_path;
    const hasHero = !!venue.image_hero_path;
    
    if (hasCard) hasCardImages++;
    if (hasHero) hasHeroImages++;
    if (hasCard && hasHero) hasBothImages++;
    if (!hasCard && !hasHero) missingAllImages++;
    
    // Check if card image file actually exists
    if (hasCard) {
      if (checkImageExists(venue.image_card_path)) {
        imageFileExists++;
      } else {
        imageFileMissing++;
      }
    }
  });
  
  console.log(`  ✅ Venues with card images: ${hasCardImages} (${((hasCardImages/venues.length)*100).toFixed(1)}%)`);
  console.log(`  ✅ Venues with hero images: ${hasHeroImages} (${((hasHeroImages/venues.length)*100).toFixed(1)}%)`);
  console.log(`  ✅ Venues with both: ${hasBothImages}`);
  console.log(`  ❌ Venues missing all images: ${missingAllImages}`);
  console.log(`  ✅ Image files that exist: ${imageFileExists}`);
  console.log(`  ⚠️  Image files missing: ${imageFileMissing}`);
  
  return { hasCardImages, hasHeroImages, hasBothImages, missingAllImages };
}

function verifyCuisineConsistency(venues) {
  console.log('\n🍽️  VERIFYING CUISINE CONSISTENCY\n');
  
  const cuisineCounts = {};
  const cuisineMap = {};
  
  venues.forEach(venue => {
    if (venue.cuisines && venue.cuisines.length > 0) {
      venue.cuisines.forEach(cuisine => {
        const normalized = cuisine.toLowerCase().replace(/\s+/g, '-');
        cuisineCounts[normalized] = (cuisineCounts[normalized] || 0) + 1;
        if (!cuisineMap[normalized]) {
          cuisineMap[normalized] = [];
        }
        cuisineMap[normalized].push(venue.name);
      });
    }
  });
  
  console.log(`  ✅ Unique cuisines found: ${Object.keys(cuisineCounts).length}`);
  console.log(`  Top cuisines:`);
  Object.entries(cuisineCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([cuisine, count]) => {
      console.log(`    ${cuisine}: ${count} restaurants`);
    });
  
  // Check for venues with multiple cuisines
  const multiCuisineVenues = venues.filter(v => v.cuisines && v.cuisines.length > 1);
  console.log(`\n  ℹ️  Venues with multiple cuisines: ${multiCuisineVenues.length}`);
  if (multiCuisineVenues.length > 0 && multiCuisineVenues.length < 10) {
    console.log(`  Examples:`);
    multiCuisineVenues.slice(0, 5).forEach(v => {
      console.log(`    ${v.name}: ${v.cuisines.join(', ')}`);
    });
  }
  
  return { cuisineCounts, multiCuisineVenues: multiCuisineVenues.length };
}

function main() {
  console.log('🔍 COMPREHENSIVE LINK & IMAGE VERIFICATION\n');
  console.log('='.repeat(60));
  
  const venues = loadVenues();
  console.log(`\n📊 Total venues loaded: ${venues.length}\n`);
  
  // Run all checks
  const linkResults = verifyRestaurantLinks(venues);
  const imageResults = verifyImages(venues);
  const cuisineResults = verifyCuisineConsistency(venues);
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📈 SUMMARY\n');
  console.log(`  ✅ Restaurant Links: ${linkResults.validLinks}/${venues.length} valid`);
  console.log(`  ✅ Card Images: ${imageResults.hasCardImages}/${venues.length} venues`);
  console.log(`  ✅ Hero Images: ${imageResults.hasHeroImages}/${venues.length} venues`);
  console.log(`  ✅ Cuisines: ${Object.keys(cuisineResults.cuisineCounts).length} unique`);
  
  // Health score
  const healthScore = (
    (linkResults.validLinks / venues.length) * 0.3 +
    (imageResults.hasCardImages / venues.length) * 0.4 +
    (imageResults.hasHeroImages / venues.length) * 0.3
  ) * 100;
  
  console.log(`\n  💚 Overall Health Score: ${healthScore.toFixed(1)}%`);
  
  if (healthScore >= 90) {
    console.log('  ✅ Excellent! All systems working well.');
  } else if (healthScore >= 75) {
    console.log('  ⚠️  Good, but some improvements needed.');
  } else {
    console.log('  ❌ Issues detected. Review the details above.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { verifyRestaurantLinks, verifyImages, verifyCuisineConsistency };

