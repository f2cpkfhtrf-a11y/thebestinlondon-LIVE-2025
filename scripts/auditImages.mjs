#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Image audit script
async function auditImages() {
  console.log('🔍 Running image audit...');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalImages: 0,
      missingImages: 0,
      smallImages: 0,
      genericMisuse: 0,
      venueFirstImages: 0
    },
    issues: [],
    warnings: []
  };

  // Load venues data
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues;

  // Check venue images
  venues.forEach(venue => {
    report.summary.totalImages++;
    
    // Check if venue uses generic tiles as primary
    if (venue.image_card_path && venue.image_card_path.includes('/images/tiles/cuisines/')) {
      report.summary.genericMisuse++;
      report.issues.push({
        venue: venue.slug,
        issue: 'Generic cuisine tile used as primary card image',
        path: venue.image_card_path
      });
    }
    
    if (venue.image_hero_path && venue.image_hero_path.includes('/images/tiles/cuisines/')) {
      report.summary.genericMisuse++;
      report.issues.push({
        venue: venue.slug,
        issue: 'Generic cuisine tile used as primary hero image',
        path: venue.image_hero_path
      });
    }

    // Check for venue-first images
    if (venue.image_card_path && venue.image_card_path.includes('/images/restaurants/')) {
      report.summary.venueFirstImages++;
    }
  });

  // Check blog images
  const blogImagesPath = path.join(process.cwd(), 'data/blog-images.json');
  if (fs.existsSync(blogImagesPath)) {
    const blogImages = JSON.parse(fs.readFileSync(blogImagesPath, 'utf8'));
    
    Object.entries(blogImages).forEach(([slug, imagePath]) => {
      report.summary.totalImages++;
      
      if (imagePath.includes('/images/tiles/')) {
        report.summary.genericMisuse++;
        report.issues.push({
          venue: slug,
          issue: 'Generic tile used for blog image',
          path: imagePath
        });
      }
    });
  }

  // Write JSON report
  fs.writeFileSync(
    path.join(reportsDir, 'audit_images.json'),
    JSON.stringify(report, null, 2)
  );

  // Write Markdown report
  const markdownReport = `# Image Audit Report

**Generated:** ${report.timestamp}

## Summary
- **Total Images Checked:** ${report.summary.totalImages}
- **Generic Misuse:** ${report.summary.genericMisuse}
- **Venue-First Images:** ${report.summary.venueFirstImages}

## Issues Found
${report.issues.length > 0 ? report.issues.map(issue => `- **${issue.venue}**: ${issue.issue} (${issue.path})`).join('\n') : '✅ No issues found'}

## Warnings
${report.warnings.length > 0 ? report.warnings.map(warning => `- ${warning}`).join('\n') : '✅ No warnings'}

---
*This audit is non-blocking and always exits with code 0.*
`;

  fs.writeFileSync(
    path.join(reportsDir, 'audit_images.md'),
    markdownReport
  );

  console.log(`✅ Image audit complete: ${report.summary.totalImages} images checked`);
  console.log(`   Generic misuse: ${report.summary.genericMisuse}`);
  console.log(`   Venue-first images: ${report.summary.venueFirstImages}`);
  
  // Always exit 0 (non-blocking)
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  auditImages().catch(() => process.exit(0));
}