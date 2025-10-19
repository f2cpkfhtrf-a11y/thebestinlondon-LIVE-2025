#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load venue data
const venuesPath = path.join(process.cwd(), 'public/venues.json');
const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = venuesData.venues || venuesData;

console.log('🔍 Generating baseline report...');

// Initialize counters
const baseline = {
  timestamp: new Date().toISOString(),
  venueCount: venues.length,
  venuesWithCard: 0,
  venuesWithHero: 0,
  venuesWithBoth: 0,
  externalUrls: 0,
  placeholderFiles: 0,
  smallFiles: 0,
  duplicateImages: new Map(),
  totalImageSize: 0,
  imageSources: {
    local: 0,
    google_places: 0,
    unsplash: 0,
    other_external: 0
  },
  venuesNeedingImages: [],
  fileAnalysis: []
};

// Analyze each venue
venues.forEach((venue, index) => {
  const venueAnalysis = {
    slug: venue.slug || venue.place_id,
    name: venue.name,
    hasCard: false,
    hasHero: false,
    cardPath: venue.image_card_path,
    heroPath: venue.image_hero_path,
    externalUrls: [],
    issues: []
  };

  // Check card image
  if (venue.image_card_path) {
    baseline.venuesWithCard++;
    venueAnalysis.hasCard = true;
    
    if (venue.image_card_path.startsWith('http')) {
      baseline.externalUrls++;
      venueAnalysis.externalUrls.push(venue.image_card_path);
      if (venue.image_card_path.includes('unsplash')) {
        baseline.imageSources.unsplash++;
      } else if (venue.image_card_path.includes('googleapis')) {
        baseline.imageSources.google_places++;
      } else {
        baseline.imageSources.other_external++;
      }
    } else {
      baseline.imageSources.local++;
      // Check if local file exists and analyze it
      const localPath = path.join(process.cwd(), 'public', venue.image_card_path);
      if (fs.existsSync(localPath)) {
        const stats = fs.statSync(localPath);
        baseline.totalImageSize += stats.size;
        
        if (stats.size < 5000) {
          baseline.smallFiles++;
          venueAnalysis.issues.push(`Card image too small: ${stats.size} bytes`);
        }
        
        // Check if it's a text file (placeholder)
        const content = fs.readFileSync(localPath, 'utf8');
        if (content.includes('Placeholder') || content.includes('Loading')) {
          baseline.placeholderFiles++;
          venueAnalysis.issues.push('Card image is placeholder text');
        }
        
        // Generate hash for duplicate detection
        const hash = crypto.createHash('md5').update(content).digest('hex');
        if (baseline.duplicateImages.has(hash)) {
          baseline.duplicateImages.get(hash).push(venue.slug);
        } else {
          baseline.duplicateImages.set(hash, [venue.slug]);
        }
        
        baseline.fileAnalysis.push({
          path: venue.image_card_path,
          size: stats.size,
          hash: hash,
          isText: content.includes('Placeholder'),
          venue: venue.slug
        });
      } else {
        venueAnalysis.issues.push('Card image file missing');
      }
    }
  }

  // Check hero image
  if (venue.image_hero_path) {
    baseline.venuesWithHero++;
    venueAnalysis.hasHero = true;
    
    if (venue.image_hero_path.startsWith('http')) {
      baseline.externalUrls++;
      venueAnalysis.externalUrls.push(venue.image_hero_path);
    } else {
      // Check if local file exists and analyze it
      const localPath = path.join(process.cwd(), 'public', venue.image_hero_path);
      if (fs.existsSync(localPath)) {
        const stats = fs.statSync(localPath);
        baseline.totalImageSize += stats.size;
        
        if (stats.size < 5000) {
          baseline.smallFiles++;
          venueAnalysis.issues.push(`Hero image too small: ${stats.size} bytes`);
        }
        
        // Check if it's a text file (placeholder)
        const content = fs.readFileSync(localPath, 'utf8');
        if (content.includes('Placeholder') || content.includes('Loading')) {
          baseline.placeholderFiles++;
          venueAnalysis.issues.push('Hero image is placeholder text');
        }
        
        // Generate hash for duplicate detection
        const hash = crypto.createHash('md5').update(content).digest('hex');
        if (baseline.duplicateImages.has(hash)) {
          baseline.duplicateImages.get(hash).push(venue.slug);
        } else {
          baseline.duplicateImages.set(hash, [venue.slug]);
        }
        
        baseline.fileAnalysis.push({
          path: venue.image_hero_path,
          size: stats.size,
          hash: hash,
          isText: content.includes('Placeholder'),
          venue: venue.slug
        });
      } else {
        venueAnalysis.issues.push('Hero image file missing');
      }
    }
  }

  // Check if venue has both images
  if (venueAnalysis.hasCard && venueAnalysis.hasHero) {
    baseline.venuesWithBoth++;
  }

  // If venue has issues or missing images, add to needs images list
  if (venueAnalysis.issues.length > 0 || !venueAnalysis.hasCard || !venueAnalysis.hasHero) {
    baseline.venuesNeedingImages.push(venueAnalysis);
  }
});

// Convert duplicate map to array
baseline.duplicateGroups = Array.from(baseline.duplicateImages.entries())
  .filter(([hash, venues]) => venues.length > 1)
  .map(([hash, venues]) => ({ hash, venues, count: venues.length }));

// Calculate percentages
baseline.percentages = {
  venuesWithCard: (baseline.venuesWithCard / baseline.venueCount * 100).toFixed(1),
  venuesWithHero: (baseline.venuesWithHero / baseline.venueCount * 100).toFixed(1),
  venuesWithBoth: (baseline.venuesWithBoth / baseline.venueCount * 100).toFixed(1)
};

// Write baseline report
const reportPath = path.join(process.cwd(), 'reports/pipeline-baseline.json');
fs.writeFileSync(reportPath, JSON.stringify(baseline, null, 2));

console.log('📊 BASELINE REPORT GENERATED');
console.log(`📁 Report saved to: ${reportPath}`);
console.log('');
console.log('📈 SUMMARY:');
console.log(`   Total venues: ${baseline.venueCount}`);
console.log(`   Venues with card images: ${baseline.venuesWithCard} (${baseline.percentages.venuesWithCard}%)`);
console.log(`   Venues with hero images: ${baseline.venuesWithHero} (${baseline.percentages.venuesWithHero}%)`);
console.log(`   Venues with both: ${baseline.venuesWithBoth} (${baseline.percentages.venuesWithBoth}%)`);
console.log(`   External URLs: ${baseline.externalUrls}`);
console.log(`   Placeholder files: ${baseline.placeholderFiles}`);
console.log(`   Small files (<5KB): ${baseline.smallFiles}`);
console.log(`   Duplicate groups: ${baseline.duplicateGroups.length}`);
console.log(`   Total image size: ${(baseline.totalImageSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Venues needing images: ${baseline.venuesNeedingImages.length}`);
console.log('');
console.log('🚨 CRITICAL ISSUES:');
if (baseline.externalUrls > 0) console.log(`   ❌ ${baseline.externalUrls} external image URLs`);
if (baseline.placeholderFiles > 0) console.log(`   ❌ ${baseline.placeholderFiles} placeholder text files`);
if (baseline.smallFiles > 0) console.log(`   ❌ ${baseline.smallFiles} files smaller than 5KB`);
if (baseline.duplicateGroups.length > 0) console.log(`   ❌ ${baseline.duplicateGroups.length} duplicate image groups`);
if (baseline.venuesNeedingImages.length > 0) console.log(`   ❌ ${baseline.venuesNeedingImages.length} venues need image fixes`);
