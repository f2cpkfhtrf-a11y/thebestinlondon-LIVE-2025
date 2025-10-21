#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Heal missing venue images by copying from existing local image pools
 * Only uses existing files in /public/images/restaurants/** - no downloads
 */
async function healLocalImages() {
  console.log('🔧 Healing missing venue images from local pool...');
  
  const publicDir = path.join(process.cwd(), 'public');
  const reportsDir = path.join(process.cwd(), 'reports');
  
  // Ensure reports directory exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalVenues: 0,
      venuesWithImages: 0,
      venuesNeedingHealing: 0,
      imagesCopied: 0,
      imagesCreated: 0
    },
    operations: [],
    errors: []
  };
  
  // Load venue data
  const venuesPath = path.join(publicDir, 'venues.json');
  if (!fs.existsSync(venuesPath)) {
    throw new Error('venues.json not found');
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues || venuesData;
  
  report.summary.totalVenues = venues.length;
  console.log(`📊 Checking ${venues.length} venues for missing images...`);
  
  // Get all available images in the restaurant pool
  const restaurantImagesDir = path.join(publicDir, 'images', 'restaurants');
  const availableImages = new Map();
  
  if (fs.existsSync(restaurantImagesDir)) {
    const venueDirs = fs.readdirSync(restaurantImagesDir);
    
    for (const venueDir of venueDirs) {
      const venueDirPath = path.join(restaurantImagesDir, venueDir);
      if (fs.statSync(venueDirPath).isDirectory()) {
        const files = fs.readdirSync(venueDirPath);
        const imageFiles = files.filter(f => f.endsWith('.webp'));
        
        for (const file of imageFiles) {
          const filePath = path.join(venueDirPath, file);
          const stats = fs.statSync(filePath);
          const sizeKB = stats.size / 1024;
          
          // Only use images that are reasonably sized (>10KB)
          if (sizeKB > 10) {
            availableImages.set(file, filePath);
          }
        }
      }
    }
  }
  
  console.log(`🖼️  Found ${availableImages.size} available images in local pool`);
  
  // Check each venue for missing images
  for (const venue of venues) {
    const slug = venue.slug;
    const venueImageDir = path.join(publicDir, 'images', 'restaurants', slug);
    
    let needsHealing = false;
    const operations = [];
    
    // Check if venue directory exists
    if (!fs.existsSync(venueImageDir)) {
      needsHealing = true;
      operations.push('Missing venue directory');
    } else {
      // Check for missing card/hero images
      const cardPath = path.join(venueImageDir, 'card.webp');
      const heroPath = path.join(venueImageDir, 'hero.webp');
      
      if (!fs.existsSync(cardPath)) {
        needsHealing = true;
        operations.push('Missing card.webp');
      }
      
      if (!fs.existsSync(heroPath)) {
        needsHealing = true;
        operations.push('Missing hero.webp');
      }
    }
    
    if (needsHealing) {
      report.summary.venuesNeedingHealing++;
      
      // Try to find suitable images from the pool
      const suitableImages = Array.from(availableImages.keys()).filter(filename => {
        // Prefer images that might be similar (same cuisine, area, etc.)
        const filenameLower = filename.toLowerCase();
        const venueNameLower = venue.name.toLowerCase();
        const cuisineLower = venue.cuisines?.[0]?.toLowerCase() || '';
        
        return filenameLower.includes(cuisineLower) || 
               filenameLower.includes(venueNameLower.split(' ')[0]) ||
               filenameLower.includes('card') ||
               filenameLower.includes('hero');
      });
      
      if (suitableImages.length > 0) {
        // Create venue directory if it doesn't exist
        if (!fs.existsSync(venueImageDir)) {
          fs.mkdirSync(venueImageDir, { recursive: true });
          operations.push('Created venue directory');
        }
        
        // Copy suitable images
        for (const imageFile of suitableImages.slice(0, 2)) { // Max 2 images per venue
          const sourcePath = availableImages.get(imageFile);
          const targetPath = path.join(venueImageDir, imageFile);
          
          if (!fs.existsSync(targetPath)) {
            try {
              fs.copyFileSync(sourcePath, targetPath);
              operations.push(`Copied ${imageFile}`);
              report.summary.imagesCopied++;
            } catch (error) {
              report.errors.push(`Failed to copy ${imageFile} for ${venue.name}: ${error.message}`);
            }
          }
        }
      } else {
        operations.push('No suitable images found in pool');
      }
      
      report.operations.push({
        venue: venue.name,
        slug: slug,
        operations: operations
      });
    } else {
      report.summary.venuesWithImages++;
    }
  }
  
  // Write report
  const reportPath = path.join(reportsDir, 'image_healing.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Print summary
  console.log('\n📊 Image Healing Summary:');
  console.log(`   Total venues: ${report.summary.totalVenues}`);
  console.log(`   Venues with images: ${report.summary.venuesWithImages}`);
  console.log(`   Venues needing healing: ${report.summary.venuesNeedingHealing}`);
  console.log(`   Images copied: ${report.summary.imagesCopied}`);
  console.log(`   Operations performed: ${report.operations.length}`);
  
  if (report.errors.length > 0) {
    console.log(`   Errors: ${report.errors.length}`);
    report.errors.forEach(error => console.log(`   ⚠️  ${error}`));
  }
  
  console.log(`\n📄 Full report saved to: ${reportPath}`);
  console.log('✅ Image healing complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  healLocalImages().catch(console.error);
}

export default healLocalImages;








