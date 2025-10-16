#!/usr/bin/env node

/**
 * Comprehensive Site Health Check
 * Verifies all critical aspects of thebestinlondon.co.uk
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`)
};

// Check results storage
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

function addResult(passed, message, details = '') {
  if (passed) {
    results.passed++;
    log.success(message);
  } else {
    results.failed++;
    log.error(message);
  }
  if (details) results.details.push({ passed, message, details });
}

function addWarning(message) {
  results.warnings++;
  log.warn(message);
}

console.log('\n🔍 BestOfLondon - Comprehensive Health Check\n');
console.log('═'.repeat(60));

// 1. Check venues.json
console.log('\n📊 DATA INTEGRITY CHECKS');
console.log('─'.repeat(60));

try {
  const venuesPath = path.join(__dirname, '../public/venues.json');
  
  if (!fs.existsSync(venuesPath)) {
    addResult(false, 'venues.json exists');
  } else {
    addResult(true, 'venues.json exists');
    
    const stats = fs.statSync(venuesPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    log.info(`  Size: ${sizeMB} MB`);
    
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venueCount = venuesData.length;
    
    addResult(venueCount >= 450, `Venue count: ${venueCount} venues`, 
      venueCount >= 450 ? 'Exceeds 450 target' : 'Below 450 target');
    
    // Check data quality
    const withRatings = venuesData.filter(v => v.rating).length;
    const withPhotos = venuesData.filter(v => v.photos && v.photos.length > 0).length;
    const withWebsite = venuesData.filter(v => v.website).length;
    const withFSA = venuesData.filter(v => v.fsaRating !== null && v.fsaRating !== undefined).length;
    
    log.info(`  With ratings: ${withRatings}/${venueCount} (${((withRatings/venueCount)*100).toFixed(1)}%)`);
    log.info(`  With photos: ${withPhotos}/${venueCount} (${((withPhotos/venueCount)*100).toFixed(1)}%)`);
    log.info(`  With website: ${withWebsite}/${venueCount} (${((withWebsite/venueCount)*100).toFixed(1)}%)`);
    log.info(`  With FSA ratings: ${withFSA}/${venueCount} (${((withFSA/venueCount)*100).toFixed(1)}%)`);
    
    addResult(withRatings >= venueCount * 0.95, 'Rating coverage > 95%');
    addResult(withFSA >= venueCount * 0.40, 'FSA coverage > 40%');
  }
} catch (err) {
  addResult(false, 'venues.json validation', err.message);
}

// 2. Check sitemaps
console.log('\n🗺️  SEO & SITEMAP CHECKS');
console.log('─'.repeat(60));

const sitemaps = [
  'sitemap.xml',
  'sitemap-pages.xml',
  'sitemap-venues.xml',
  'sitemap-images.xml'
];

sitemaps.forEach(sitemap => {
  const filepath = path.join(__dirname, '../public', sitemap);
  if (fs.existsSync(filepath)) {
    addResult(true, `${sitemap} exists`);
    const content = fs.readFileSync(filepath, 'utf8');
    const urlCount = (content.match(/<loc>/g) || []).length;
    if (urlCount > 0) {
      log.info(`  Contains ${urlCount} URLs`);
    }
  } else {
    addResult(false, `${sitemap} exists`);
  }
});

// 3. Check robots.txt
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (fs.existsSync(robotsPath)) {
  addResult(true, 'robots.txt exists');
  const robots = fs.readFileSync(robotsPath, 'utf8');
  addResult(robots.includes('Sitemap:'), 'robots.txt references sitemap');
} else {
  addResult(false, 'robots.txt exists');
}

// 4. Check critical pages
console.log('\n📄 PAGE STRUCTURE CHECKS');
console.log('─'.repeat(60));

const criticalPages = [
  'pages/index.js',
  'pages/restaurants.js',
  'pages/restaurant/[slug].js',
  'pages/_app.js',
  'pages/_document.js'
];

criticalPages.forEach(page => {
  const filepath = path.join(__dirname, '..', page);
  if (fs.existsSync(filepath)) {
    addResult(true, `${page} exists`);
  } else {
    addResult(false, `${page} exists`);
  }
});

// 5. Check components
console.log('\n🧩 COMPONENT CHECKS');
console.log('─'.repeat(60));

const criticalComponents = [
  'components/FSABadge.js',
  'components/VenueCard.js',
  'components/SearchModal.js',
  'components/Layout.js'
];

criticalComponents.forEach(component => {
  const filepath = path.join(__dirname, '..', component);
  if (fs.existsSync(filepath)) {
    addResult(true, `${component} exists`);
  } else {
    addResult(false, `${component} exists`);
  }
});

// 6. Check utilities
console.log('\n⚙️  UTILITY CHECKS');
console.log('─'.repeat(60));

const utilities = [
  'utils/fsaClient.js',
  'utils/venueEnhancer.js',
  'utils/structuredData.js'
];

utilities.forEach(util => {
  const filepath = path.join(__dirname, '..', util);
  if (fs.existsSync(filepath)) {
    addResult(true, `${util} exists`);
  } else {
    addResult(false, `${util} exists`);
  }
});

// 7. Check configuration files
console.log('\n⚙️  CONFIGURATION CHECKS');
console.log('─'.repeat(60));

const configs = [
  { file: 'next.config.js', required: true },
  { file: 'package.json', required: true },
  { file: '.env.local', required: true },
  { file: '.github/workflows/auto-refresh.yml', required: true }
];

configs.forEach(({ file, required }) => {
  const filepath = path.join(__dirname, '..', file);
  if (fs.existsSync(filepath)) {
    addResult(true, `${file} exists`);
  } else {
    if (required) {
      addResult(false, `${file} exists (REQUIRED)`);
    } else {
      addWarning(`${file} missing (optional)`);
    }
  }
});

// 8. Check next.config.js domains
try {
  const nextConfig = require('../next.config.js');
  if (nextConfig.images && nextConfig.images.domains) {
    const domains = nextConfig.images.domains;
    addResult(
      domains.includes('maps.googleapis.com') || 
      domains.includes('lh3.googleusercontent.com'),
      'next.config.js includes Google image domains'
    );
  } else {
    addWarning('next.config.js missing image domains configuration');
  }
} catch (err) {
  addWarning('Could not validate next.config.js image domains');
}

// 9. Check branding assets
console.log('\n🎨 BRANDING ASSETS');
console.log('─'.repeat(60));

const assets = [
  'public/logo.svg',
  'public/manifest.json'
];

assets.forEach(asset => {
  const filepath = path.join(__dirname, '..', asset);
  if (fs.existsSync(filepath)) {
    addResult(true, `${asset} exists`);
  } else {
    addWarning(`${asset} missing`);
  }
});

// 10. Check data scripts
console.log('\n🔄 DATA PIPELINE SCRIPTS');
console.log('─'.repeat(60));

const scripts = [
  'scripts/fetchPlaces.js',
  'scripts/fetchPlaceDetails.js',
  'scripts/buildVenues.js',
  'scripts/run-data-pipeline.js',
  'scripts/generate-sitemaps.js',
  'scripts/auto-refresh.js'
];

scripts.forEach(script => {
  const filepath = path.join(__dirname, '..', script);
  if (fs.existsSync(filepath)) {
    addResult(true, `${script} exists`);
  } else {
    addResult(false, `${script} exists`);
  }
});

// Final Report
console.log('\n' + '═'.repeat(60));
console.log('📊 HEALTH CHECK SUMMARY');
console.log('═'.repeat(60));

const total = results.passed + results.failed;
const passRate = ((results.passed / total) * 100).toFixed(1);

console.log(`\n${COLORS.green}Passed:${COLORS.reset}   ${results.passed}/${total} (${passRate}%)`);
console.log(`${COLORS.red}Failed:${COLORS.reset}   ${results.failed}/${total}`);
console.log(`${COLORS.yellow}Warnings:${COLORS.reset} ${results.warnings}`);

if (results.failed === 0 && results.warnings === 0) {
  console.log(`\n${COLORS.green}🎉 ALL CHECKS PASSED! Site is healthy.${COLORS.reset}`);
} else if (results.failed === 0) {
  console.log(`\n${COLORS.yellow}⚠️  All critical checks passed, but there are ${results.warnings} warnings.${COLORS.reset}`);
} else {
  console.log(`\n${COLORS.red}❌ ${results.failed} critical checks failed. Please review.${COLORS.reset}`);
}

console.log('\n' + '═'.repeat(60));
console.log('🌐 LIVE SITE: https://thebestinlondon.co.uk');
console.log('═'.repeat(60) + '\n');

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);
