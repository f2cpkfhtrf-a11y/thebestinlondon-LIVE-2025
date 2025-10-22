#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Verify image integrity and flag issues
 */
async function verifyImages() {
  console.log('🔍 Verifying image integrity...');
  
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
      venuesWithFallbacks: 0,
      categoryTileMisuse: 0,
      smallImages: 0,
      missingImages: 0
    },
    issues: [],
    warnings: []
  };
  
  // Load venue data
  const venuesPath = path.join(publicDir, 'venues.json');
  if (!fs.existsSync(venuesPath)) {
    console.error('❌ venues.json not found');
    return;
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues || venuesData;
  
  report.summary.totalVenues = venues.length;
  console.log(`📊 Checking ${venues.length} venues...`);
  
  // Check each venue
  for (const venue of venues) {
    const slug = venue.slug;
    const issues = [];
    const warnings = [];
    
    // Check if venue-specific images exist
    const venueImageDir = path.join(publicDir, 'images', 'restaurants', slug);
    const hasVenueImages = fs.existsSync(venueImageDir);
    
    if (hasVenueImages) {
      const files = fs.readdirSync(venueImageDir);
      const imageFiles = files.filter(f => f.endsWith('.webp'));
      
      if (imageFiles.length > 0) {
        report.summary.venuesWithImages++;
        
        // Check for small images
        for (const file of imageFiles) {
          const filePath = path.join(venueImageDir, file);
          const stats = fs.statSync(filePath);
          const sizeKB = stats.size / 1024;
          
          if (sizeKB < 50) {
            warnings.push(`Small image: ${file} (${sizeKB.toFixed(1)}KB)`);
            report.summary.smallImages++;
          }
        }
      } else {
        issues.push('No image files in venue directory');
        report.summary.missingImages++;
      }
    } else {
      issues.push('No venue-specific image directory');
      report.summary.missingImages++;
    }
    
    // Check venue data paths for category tile misuse
    if (venue.image_card_path && venue.image_card_path.includes('/tiles/cuisines/')) {
      issues.push('image_card_path points to cuisine tile (category tile misuse)');
      report.summary.categoryTileMisuse++;
    }
    
    if (venue.image_hero_path && venue.image_hero_path.includes('/tiles/cuisines/')) {
      issues.push('image_hero_path points to cuisine tile (category tile misuse)');
      report.summary.categoryTileMisuse++;
    }
    
    if (venue.image_card_path && venue.image_card_path.includes('/tiles/areas/')) {
      issues.push('image_card_path points to area tile (category tile misuse)');
      report.summary.categoryTileMisuse++;
    }
    
    if (venue.image_hero_path && venue.image_hero_path.includes('/tiles/areas/')) {
      issues.push('image_hero_path points to area tile (category tile misuse)');
      report.summary.categoryTileMisuse++;
    }
    
    // Check if venue data paths exist
    if (venue.image_card_path) {
      const cardPath = path.join(publicDir, venue.image_card_path.replace('/images/', 'images/'));
      if (!fs.existsSync(cardPath)) {
        warnings.push(`image_card_path does not exist: ${venue.image_card_path}`);
      }
    }
    
    if (venue.image_hero_path) {
      const heroPath = path.join(publicDir, venue.image_hero_path.replace('/images/', 'images/'));
      if (!fs.existsSync(heroPath)) {
        warnings.push(`image_hero_path does not exist: ${venue.image_hero_path}`);
      }
    }
    
    // Check if venue has valid fallbacks
    const hasValidFallback = hasVenueImages || 
      (venue.image_card_path && !venue.image_card_path.includes('/tiles/')) ||
      (venue.image_hero_path && !venue.image_hero_path.includes('/tiles/')) ||
      (venue.photos && venue.photos.length > 0);
    
    if (hasValidFallback) {
      report.summary.venuesWithFallbacks++;
    } else {
      issues.push('No valid image fallbacks available');
    }
    
    // Add to report if there are issues or warnings
    if (issues.length > 0 || warnings.length > 0) {
      report.issues.push({
        venue: venue.name,
        slug: slug,
        issues: issues,
        warnings: warnings
      });
    }
  }
  
  // Check blog images
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
    console.log(`📝 Checking ${blogFiles.length} blog posts...`);
    
    for (const file of blogFiles) {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
      const blog = JSON.parse(content);
      
      // Check if blog tile exists
      const blogTilePath = path.join(publicDir, 'images', 'blog', `${blog.slug}.webp`);
      if (!fs.existsSync(blogTilePath)) {
        report.warnings.push(`Blog tile missing: ${blog.slug}`);
      }
    }
  }
  
  // Write report
  const reportPath = path.join(reportsDir, 'image_verification.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Print summary
  console.log('\n📊 Image Verification Summary:');
  console.log(`   Total venues: ${report.summary.totalVenues}`);
  console.log(`   Venues with images: ${report.summary.venuesWithImages}`);
  console.log(`   Venues with fallbacks: ${report.summary.venuesWithFallbacks}`);
  console.log(`   Category tile misuse: ${report.summary.categoryTileMisuse}`);
  console.log(`   Small images (<50KB): ${report.summary.smallImages}`);
  console.log(`   Missing images: ${report.summary.missingImages}`);
  console.log(`   Issues found: ${report.issues.length}`);
  console.log(`   Warnings: ${report.warnings.length}`);
  
  if (report.summary.categoryTileMisuse > 0) {
    console.log('\n⚠️  Category tile misuse detected!');
    console.log('   These venues have image paths pointing to cuisine/area tiles instead of unique images.');
  }
  
  if (report.issues.length > 0) {
    console.log('\n❌ Issues found:');
    report.issues.slice(0, 5).forEach(issue => {
      console.log(`   ${issue.venue}: ${issue.issues.join(', ')}`);
    });
    if (report.issues.length > 5) {
      console.log(`   ... and ${report.issues.length - 5} more`);
    }
  }
  
  // Write Markdown report
  const markdownPath = path.join(reportsDir, 'image_verification.md');
  const markdownContent = `# Image Verification Report

**Generated:** ${report.timestamp}
**Total Venues:** ${report.summary.totalVenues}
**Venues with Images:** ${report.summary.venuesWithImages}
**Category Tile Misuse:** ${report.summary.categoryTileMisuse}
**Missing Images:** ${report.summary.missingImages}
**Small Images:** ${report.summary.smallImages}

## Issues Found
${report.issues.length > 0 ? report.issues.slice(0, 10).map(issue => 
  `- **${issue.venue}**: ${issue.issues.join(', ')}`
).join('\n') : 'No issues found'}

## Warnings
${report.warnings.length > 0 ? report.warnings.slice(0, 10).map(warning => 
  `- ${warning}`
).join('\n') : 'No warnings'}

---
*This report was generated automatically and is non-blocking.*
`;

  fs.writeFileSync(markdownPath, markdownContent);

  console.log(`\n📄 Full report saved to: ${reportPath}`);
  console.log(`📄 Markdown report saved to: ${markdownPath}`);
  console.log('✅ Image verification complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyImages().catch(console.error);
}

export default verifyImages;