#!/usr/bin/env node

// Auto-fix script for missing/placeholder tile & hero images
// Maintains IMAGE_PIPELINE_MODE=local-only, non-destructive operation
// Only replaces files that are missing, too small (<50KB), or are single-color placeholders

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.dirname(__dirname);

// Configuration
const MIN_FILE_SIZE = 50 * 1024; // 50KB minimum
const DIMENSIONS = {
  tile: { width: 1600, height: 900 },
  hero: { width: 1920, height: 1080 }
};

// Expected directories and file patterns
const TARGET_PATHS = {
  tiles: {
    cuisines: 'public/images/tiles/cuisines',
    areas: 'public/images/tiles/areas', 
    stations: 'public/images/tiles/stations'
  },
  heroes: 'public/images/heroes/pages'
};

// Curated fallback sources
const CURATED_DIR = path.join(root, 'public/images/_curated');
const DEFAULTS = {
  cuisine: path.join(root, 'public/images/heroes/site/default-cuisine.webp'),
  area: path.join(root, 'public/images/heroes/site/default-area.webp'),
  station: path.join(root, 'public/images/heroes/site/default-station.webp'),
  site: path.join(root, 'public/images/heroes/site-default.webp')
};

// Expected slugs for validation
const EXPECTED_SLUGS = {
  cuisines: [
    'british', 'indian', 'italian', 'japanese', 'turkish', 'thai', 'mexican',
    'korean', 'french', 'chinese', 'spanish', 'caribbean', 'mediterranean',
    'modern-european', 'lebanese', 'vegan', 'vegetarian', 'halal', 'bakery',
    'burgers', 'cafe', 'desserts', 'pizza', 'seafood', 'steakhouse'
  ],
  areas: [
    'central-london', 'tower-hamlets', 'redbridge', 'havering', 'newham',
    'camden', 'hackney', 'southwark', 'westminster', 'kensington-and-chelsea',
    'shoreditch', 'soho', 'covent-garden', 'mayfair', 'clerkenwell',
    'fitzrovia', 'holborn', 'london-bridge', 'marylebone', 'spitalfields',
    'whitechapel', 'borough', 'greenwich', 'canary-wharf'
  ],
  stations: [
    'liverpool-street', 'waterloo', 'kings-cross', 'london-bridge'
  ]
};

const HERO_FILES = [
  'restaurants-hero.webp',
  'areas-hero.webp', 
  'cuisines-hero.webp',
  'halal-hero.webp'
];

// Report tracking
let report = {
  timestamp: new Date().toISOString(),
  scanned: { files: 0, directories: 0 },
  problems: { missing: 0, tooSmall: 0, placeholder: 0 },
  fixed: { created: 0, replaced: 0 },
  errors: []
};

// Utility functions
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${path.relative(root, dirPath)}`);
  }
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function isPlaceholder(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size < MIN_FILE_SIZE) return true;
    
    // Try to detect single-color images by checking WebP metadata
    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 100) return true;
    
    return false; // Treat as valid if we can't determine
  } catch {
    return true; // Treat errors as placeholders
  }
}

function findBestFallback(type, slug) {
  // 1. Try curated assets
  if (fs.existsSync(CURATED_DIR)) {
    const curatedFile = path.join(CURATED_DIR, type, `${slug}.webp`);
    if (fs.existsSync(curatedFile)) {
      const size = getFileSize(curatedFile);
      if (size >= MIN_FILE_SIZE) return curatedFile;
    }
  }
  
  // 2. Try category default
  const defaultFile = DEFAULTS[type] || DEFAULTS.site;
  if (fs.existsSync(defaultFile)) {
    const size = getFileSize(defaultFile);
    if (size >= MIN_FILE_SIZE) return defaultFile;
  }
  
  // 3. Generate luxury placeholder
  return generateLuxuryPlaceholder(type, slug);
}

function generateLuxuryPlaceholder(type, slug) {
  try {
    // Create a luxury-themed SVG
    const colors = {
      cuisine: { primary: '#FFD700', secondary: '#8B4513', accent: '#FFFFFF' },
      area: { primary: '#2C3E50', secondary: '#E8E8E8', accent: '#FFD700' },
      station: { primary: '#1A5490', secondary: '#F8F9FA', accent: '#FFA500' },
      hero: { primary: '#2C3E50', secondary: '#34495E', accent: '#FFD700' }
    };
    
    const color = colors[type] || colors.hero;
    const dim = type === 'hero' ? DIMENSIONS.hero : DIMENSIONS.tile;
    
    const svg = `
<svg width="${dim.width}" height="${dim.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color.primary};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${color.secondary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color.accent};stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad1)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" dy=".3em">
    ${slug.toUpperCase().replace(/-/g, ' ')}
  </text>
  <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy=".3em">
    ${type.toUpperCase()}
  </text>
</svg>`;

    // Convert SVG to WebP using sharp
    const tempSvg = path.join(root, 'temp_generator.svg');
    fs.writeFileSync(tempSvg, svg);
    
    const outputPath = path.join(root, `temp_${type}_${slug}.webp`);
    sharp(tempSvg)
      .resize(dim.width, dim.height, { fit: 'cover' })
      .webp({ quality: 85, effort: 6 })
      .toFileSync(outputPath);
    
    // Cleanup temp file
    fs.unlinkSync(tempSvg);
    
    return outputPath;
  } catch (error) {
    console.warn(`⚠️  Could not generate placeholder for ${type}/${slug}: ${error.message}`);
    return null;
  }
}

function fixImageFile(filePath, type, slug, expectedSize = null) {
  const dim = expectedSize || (type === 'hero' ? DIMENSIONS.hero : DIMENSIONS.tile);
  
  const problems = [];
  let shouldReplace = false;
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    problems.push('missing');
    report.problems.missing++;
    shouldReplace = true;
  } else {
    report.scanned.files++;
    
    const size = getFileSize(filePath);
    if (size < MIN_FILE_SIZE) {
      problems.push(`too-small (${size} bytes)`);
      report.problems.tooSmall++;
      shouldReplace = true;
    }
    
    if (isPlaceholder(filePath)) {
      problems.push('placeholder');
      report.problems.placeholder++;
      shouldReplace = true;
    }
  }
  
  if (shouldReplace) {
    const fallbackSource = findBestFallback(type, slug);
    
    if (fallbackSource && fs.existsSync(fallbackSource)) {
      try {
        ensureDir(path.dirname(filePath));
        
        // If source is temporary generated file, move it
        if (fallbackSource.includes('temp_')) {
          fs.copyFileSync(fallbackSource, filePath);
          fs.unlinkSync(fallbackSource);
        } else {
          // Use sharp to ensure proper dimensions and format
          sharp(fallbackSource)
            .resize(dim.width, dim.height, { fit: 'cover' })
            .webp({ quality: 85, effort: 6 })
            .toFile(filePath);
        }
        
        const newSize = getFileSize(filePath);
        console.log(`✅ Fixed ${path.relative(root, filePath)} (${newSize} bytes) - Problems: ${problems.join(', ')}`);
        
        if (problems.includes('missing')) {
          report.fixed.created++;
        } else {
          report.fixed.replaced++;
        }
        
        return true;
      } catch (error) {
        report.errors.push(`${filePath}: ${error.message}`);
        console.error(`❌ Failed to fix ${path.relative(root, filePath)}: ${error.message}`);
        return false;
      }
    } else {
      report.errors.push(`${filePath}: No suitable fallback found`);
      console.warn(`⚠️  No fallback available for ${path.relative(root, filePath)}`);
      return false;
    }
  } else {
    console.log(`✅ ${path.relative(root, filePath)} is valid`);
    return true;
  }
}

// Main execution
async function main() {
  console.log('🔧 Starting comprehensive image fix...\n');
  
  // Ensure reports directory
  ensureDir(path.join(root, 'reports'));
  
  // Fix tile images
  console.log('🏷️  Fixing tile images...');
  for (const [type, typeDir] of Object.entries(TARGET_PATHS.tiles)) {
    const fullDir = path.join(root, typeDir);
    ensureDir(fullDir);
    report.scanned.directories++;
    
    const slugs = EXPECTED_SLUGS[type] || [];
    for (const slug of slugs) {
      const filePath = path.join(fullDir, `${slug}.webp`);
      fixImageFile(filePath, type, slug);
    }
  }
  
  // Fix hero images
  console.log('\n🖼️  Fixing hero images...');
  const heroDir = path.join(root, TARGET_PATHS.heroes);
  ensureDir(heroDir);
  report.scanned.directories++;
  
  for (const heroFile of HERO_FILES) {
    const filePath = path.join(heroDir, heroFile);
    const type = 'hero';
    const slug = heroFile.replace('-hero.webp', '');
    fixImageFile(filePath, type, slug);
  }
  
  // Fix venue heroes (from venues.json if available)
  console.log('\n🏪 Checking venue heroes...');
  const venuesPath = path.join(root, 'public/venues.json');
  if (fs.existsSync(venuesPath)) {
    try {
      const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
      const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues || [];
      
      let venueCount = 0;
      for (const venue of venues.slice(0, 10)) { // Limit to first 10 for performance
        if (venue.slug) {
          const venueDir = path.join(root, 'public/images/restaurants', venue.slug);
          const heroFile = path.join(venueDir, 'hero.webp');
          ensureDir(venueDir);
          
          if (fixImageFile(heroFile, 'venue', venue.slug)) {
            venueCount++;
          }
        }
      }
      console.log(`✅ Checked ${venueCount} venue heroes`);
    } catch (error) {
      report.errors.push(`venues.json parsing: ${error.message}`);
    }
  }
  
  // Generate report
  const reportPath = path.join(root, 'reports/image_fix_summary.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📊 Fix Summary:`);
  console.log(`   Files scanned: ${report.scanned.files}`);
  console.log(`   Problems found: ${Object.values(report.problems).reduce((a, b) => a + b, 0)}`);
  console.log(`   Files created: ${report.fixed.created}`);
  console.log(`   Files replaced: ${report.fixed.replaced}`);
  console.log(`   Errors: ${report.errors.length}`);
  console.log(`   Report saved: ${path.relative(root, reportPath)}`);
  
  if (report.errors.length > 0) {
    console.log('\n⚠️  Errors encountered:');
    report.errors.forEach(error => console.log(`   - ${error}`));
  }
  
  console.log('\n✅ Image auto-fix complete!');
}

// Run the fix
main().catch(console.error);
