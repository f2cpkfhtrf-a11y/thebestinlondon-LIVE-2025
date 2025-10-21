#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');
const REPORT_FILE = path.join(ROOT, 'reports', 'placeholder_detection_report.json');

// Configuration
const MIN_FILE_SIZE = 50 * 1024; // 50KB minimum for valid images
const MAX_PLACEHOLDER_SIZE = 5 * 1024; // 5KB max for placeholders

class PlaceholderDetector {
  constructor() {
    this.placeholders = [];
    this.warnings = [];
    this.report = {
      timestamp: new Date().toISOString(),
      summary: {},
      placeholders: [],
      warnings: []
    };
  }

  // Check if an image is a placeholder
  isPlaceholder(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return stats.size < MIN_FILE_SIZE;
    } catch {
      return true;
    }
  }

  // Analyze image quality (basic entropy check)
  analyzeImageQuality(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const size = stats.size;
      
      // Very small files are likely placeholders
      if (size < MAX_PLACEHOLDER_SIZE) {
        return { quality: 'placeholder', reason: 'file_too_small', size };
      }
      
      // Files between 5KB and 50KB are suspicious
      if (size < MIN_FILE_SIZE) {
        return { quality: 'suspicious', reason: 'file_small', size };
      }
      
      // Files 50KB+ are likely valid
      return { quality: 'valid', reason: 'file_size_ok', size };
    } catch (error) {
      return { quality: 'error', reason: 'file_not_found', error: error.message };
    }
  }

  // Scan a directory for placeholder images
  scanDirectory(dirPath, relativePath = '') {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relPath = path.join(relativePath, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        this.scanDirectory(fullPath, relPath);
      } else if (/\.(webp|jpg|jpeg|png)$/i.test(item)) {
        const quality = this.analyzeImageQuality(fullPath);
        
        if (quality.quality === 'placeholder') {
          this.placeholders.push({
            path: `/${relPath}`,
            size: quality.size,
            reason: quality.reason
          });
        } else if (quality.quality === 'suspicious') {
          this.warnings.push({
            path: `/${relPath}`,
            size: quality.size,
            reason: quality.reason
          });
        }
      }
    }
  }

  // Check venue data for placeholder references
  checkVenueData() {
    const venuesFile = path.join(PUB, 'venues.json');
    if (!fs.existsSync(venuesFile)) return;

    const venues = JSON.parse(fs.readFileSync(venuesFile, 'utf-8'));
    
    for (const venue of venues) {
      const imagePaths = [
        venue.image_card_path,
        venue.image_hero_path,
        ...(venue.photos_local || []),
        ...(venue.photos || [])
      ].filter(Boolean);

      for (const imagePath of imagePaths) {
        if (typeof imagePath !== 'string') continue;
        const fullPath = path.join(PUB, imagePath.replace(/^\/+/, ''));
        const quality = this.analyzeImageQuality(fullPath);
        
        if (quality.quality === 'placeholder') {
          this.placeholders.push({
            path: imagePath,
            size: quality.size,
            reason: quality.reason,
            venue: venue.slug,
            venueName: venue.name
          });
        }
      }
    }
  }

  // Main detection process
  detectPlaceholders() {
    console.log('🔍 Scanning for placeholder images...');
    
    // Scan image directories
    const imageDirs = [
      'images/restaurants',
      'images/venues', 
      'images/heroes',
      'images/tiles',
      'images/_cached',
      'images/sourced',
      'images/google'
    ];

    for (const dir of imageDirs) {
      const fullPath = path.join(PUB, dir);
      if (fs.existsSync(fullPath)) {
        console.log(`📁 Scanning ${dir}...`);
        this.scanDirectory(fullPath, dir);
      }
    }

    // Check venue data references
    console.log('📊 Checking venue data references...');
    this.checkVenueData();

    // Generate report
    this.report.placeholders = this.placeholders;
    this.report.warnings = this.warnings;
    this.report.summary = {
      totalPlaceholders: this.placeholders.length,
      totalWarnings: this.warnings.length,
      criticalIssues: this.placeholders.filter(p => p.size < 1000).length
    };

    // Save report
    fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
    fs.writeFileSync(REPORT_FILE, JSON.stringify(this.report, null, 2));

    // Output results
    console.log('\n📊 Placeholder Detection Results:');
    console.log(`🔴 Critical placeholders (<1KB): ${this.report.summary.criticalIssues}`);
    console.log(`🟡 Total placeholders (<50KB): ${this.report.summary.totalPlaceholders}`);
    console.log(`⚠️ Suspicious images: ${this.report.summary.totalWarnings}`);
    console.log(`📁 Report saved: ${REPORT_FILE}`);

    // Show critical issues
    if (this.placeholders.length > 0) {
      console.log('\n🚨 Critical Placeholder Images Found:');
      this.placeholders.slice(0, 10).forEach(p => {
        console.log(`  - ${p.path} (${p.size} bytes) ${p.venue ? `[${p.venue}]` : ''}`);
      });
      if (this.placeholders.length > 10) {
        console.log(`  ... and ${this.placeholders.length - 10} more`);
      }
    }

    return this.report;
  }
}

// Run detection
const detector = new PlaceholderDetector();
const report = detector.detectPlaceholders();

// Exit with appropriate code
if (report.summary.totalPlaceholders > 0) {
  console.log('\n⚠️ WARNING: Placeholder images detected! Run smartImageHealer.mjs to fix them.');
  process.exit(1); // Fail the build if placeholders found
} else {
  console.log('\n✅ No placeholder images detected. Build can proceed.');
  process.exit(0);
}
