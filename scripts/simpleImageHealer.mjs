#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'public');
const VENUES_FILE = path.join(PUB, 'venues.json');
const REPORT_FILE = path.join(ROOT, 'reports', 'simple_image_healing_report.json');

// Configuration
const MIN_FILE_SIZE = 50 * 1024; // 50KB minimum for valid images
const MAX_PLACEHOLDER_SIZE = 5 * 1024; // 5KB max for placeholders

class SimpleImageHealer {
  constructor() {
    this.healedCount = 0;
    this.skippedCount = 0;
    this.errors = [];
    this.report = {
      timestamp: new Date().toISOString(),
      summary: {},
      details: []
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

  // Find the best local replacement image for a venue
  findBestLocalImage(venueSlug) {
    const candidates = [
      // Priority 1: Restaurant-specific images (good quality)
      path.join(PUB, 'images', 'restaurants', venueSlug, 'hero.webp'),
      path.join(PUB, 'images', 'restaurants', venueSlug, 'card.webp'),
      path.join(PUB, 'images', 'restaurants', venueSlug, '1.webp'),
      
      // Priority 2: Venue-specific images
      path.join(PUB, 'images', 'venues', `${venueSlug}.webp`),
      path.join(PUB, 'images', 'venues', `${venueSlug}.jpg`),
      
      // Priority 3: Cached images
      path.join(PUB, 'images', '_cached', `${venueSlug}.webp`),
      path.join(PUB, 'images', '_cached', `${venueSlug}.jpg`),
      
      // Priority 4: Sourced images
      path.join(PUB, 'images', 'sourced', venueSlug, 'hero.webp'),
      path.join(PUB, 'images', 'sourced', venueSlug, 'card.webp'),
      
      // Priority 5: Google photos
      path.join(PUB, 'images', 'google', venueSlug, 'hero.webp'),
      path.join(PUB, 'images', 'google', venueSlug, 'card.webp'),
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && !this.isPlaceholder(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  // Find a good fallback image from cuisine tiles
  findCuisineFallback(venue) {
    if (!venue.cuisines || venue.cuisines.length === 0) return null;
    
    const cuisineSlug = venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cuisineTile = path.join(PUB, 'images', 'tiles', 'cuisines', `${cuisineSlug}.webp`);
    
    if (fs.existsSync(cuisineTile) && !this.isPlaceholder(cuisineTile)) {
      return cuisineTile;
    }
    return null;
  }

  // Find a good fallback image from area tiles
  findAreaFallback(venue) {
    const areaName = venue.area || venue.borough;
    if (!areaName) return null;
    
    const areaSlug = areaName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const areaTile = path.join(PUB, 'images', 'tiles', 'areas', `${areaSlug}.webp`);
    
    if (fs.existsSync(areaTile) && !this.isPlaceholder(areaTile)) {
      return areaTile;
    }
    return null;
  }

  // Find site default fallback
  findSiteDefault() {
    const siteDefault = path.join(PUB, 'images', 'heroes', 'site-default.webp');
    if (fs.existsSync(siteDefault) && !this.isPlaceholder(siteDefault)) {
      return siteDefault;
    }
    return null;
  }

  // Heal a single venue's images
  healVenueImages(venue) {
    const slug = venue.slug || venue.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
    const results = [];

    // Check current image paths - ensure they're strings
    const imagePaths = [
      venue.image_card_path,
      venue.image_hero_path,
      ...(venue.photos_local || []),
      ...(venue.photos || [])
    ].filter(Boolean).filter(path => typeof path === 'string');

    for (const imagePath of imagePaths) {
      const fullPath = path.join(PUB, imagePath.replace(/^\/+/, ''));
      
      if (fs.existsSync(fullPath) && this.isPlaceholder(fullPath)) {
        console.log(`🔧 Healing placeholder: ${imagePath}`);
        
        // Try to find a better image in order of preference
        let replacementImage = null;
        let replacementSource = '';
        
        // 1. Try venue-specific good image
        replacementImage = this.findBestLocalImage(slug);
        if (replacementImage) {
          replacementSource = 'venue_specific';
        }
        
        // 2. Try cuisine tile fallback
        if (!replacementImage) {
          replacementImage = this.findCuisineFallback(venue);
          if (replacementImage) {
            replacementSource = 'cuisine_tile';
          }
        }
        
        // 3. Try area tile fallback
        if (!replacementImage) {
          replacementImage = this.findAreaFallback(venue);
          if (replacementImage) {
            replacementSource = 'area_tile';
          }
        }
        
        // 4. Try site default
        if (!replacementImage) {
          replacementImage = this.findSiteDefault();
          if (replacementImage) {
            replacementSource = 'site_default';
          }
        }
        
        if (replacementImage) {
          // Copy the replacement image
          fs.copyFileSync(replacementImage, fullPath);
          results.push({
            path: imagePath,
            action: 'replaced',
            source: replacementSource,
            replacementPath: replacementImage.replace(PUB, ''),
            originalSize: fs.statSync(fullPath).size,
            newSize: fs.statSync(fullPath).size
          });
          this.healedCount++;
        } else {
          results.push({
            path: imagePath,
            action: 'no_replacement_found',
            reason: 'no_suitable_replacement_available'
          });
          this.skippedCount++;
        }
      } else {
        results.push({
          path: imagePath,
          action: 'no_action_needed',
          reason: fs.existsSync(fullPath) ? 'valid_image' : 'file_not_found'
        });
      }
    }

    return results;
  }

  // Main healing process
  healAllImages() {
    console.log('🚀 Starting Simple Image Healing Process');
    
    if (!fs.existsSync(VENUES_FILE)) {
      throw new Error(`Venues file not found: ${VENUES_FILE}`);
    }

    const venues = JSON.parse(fs.readFileSync(VENUES_FILE, 'utf-8'));
    console.log(`📊 Processing ${venues.length} venues`);

    // Process venues
    for (let i = 0; i < venues.length; i++) {
      const venue = venues[i];
      try {
        const results = this.healVenueImages(venue);
        this.report.details.push({
          slug: venue.slug,
          name: venue.name,
          results
        });
      } catch (error) {
        this.errors.push({
          slug: venue.slug,
          error: error.message
        });
        console.warn(`⚠️ Error healing venue ${venue.slug}:`, error.message);
      }
      
      // Progress update
      if (i % 100 === 0) {
        console.log(`📈 Progress: ${i}/${venues.length} venues processed`);
      }
    }

    // Generate summary
    this.report.summary = {
      totalVenues: venues.length,
      healedImages: this.healedCount,
      skippedImages: this.skippedCount,
      errors: this.errors.length
    };

    // Save report
    fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
    fs.writeFileSync(REPORT_FILE, JSON.stringify(this.report, null, 2));

    console.log('\n✅ Simple Image Healing Complete!');
    console.log(`📸 Images healed: ${this.healedCount}`);
    console.log(`⏭️ Skipped: ${this.skippedCount}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`📊 Report saved: ${REPORT_FILE}`);

    return this.report;
  }
}

// Run the healer
const healer = new SimpleImageHealer();
healer.healAllImages();





