// Detect and fix missing/invalid images in venues.json
// Run with: node scripts/fix-images.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const VENUES_PATH = path.join(__dirname, '../public/venues.json');
const OUTPUT_MANIFEST = path.join(__dirname, '../public/image-manifest.json');

// Fallback gradient patterns by cuisine/category
const FALLBACK_GRADIENTS = {
  'italian': 'linear-gradient(135deg, #1A472A 0%, #2D5F3F 100%)', // Italian flag green
  'japanese': 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)', // Japanese red
  'indian': 'linear-gradient(135deg, #FF9933 0%, #138808 100%)', // Indian flag
  'chinese': 'linear-gradient(135deg, #DE2910 0%, #FFDE00 100%)', // Chinese red-gold
  'french': 'linear-gradient(135deg, #002654 0%, #FFFFFF 30%, #ED2939 70%)', // French tricolor
  'thai': 'linear-gradient(135deg, #A51931 0%, #F4C430 100%)', // Thai colors
  'turkish': 'linear-gradient(135deg, #E30A17 0%, #C9002B 100%)', // Turkish red
  'mediterranean': 'linear-gradient(135deg, #0055A4 0%, #FFFFFF 50%, #009B3A 100%)', // Med blue-white-green
  'middle eastern': 'linear-gradient(135deg, #D4AF37 0%, #8B4513 100%)', // Gold-brown
  'mexican': 'linear-gradient(135deg, #006341 0%, #CE1126 100%)', // Mexican flag
  'korean': 'linear-gradient(135deg, #003478 0%, #CD2E3A 100%)', // Korean colors
  'vietnamese': 'linear-gradient(135deg, #DA251D 0%, #FFCD00 100%)', // Vietnamese red-gold
  'default': 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(11,11,11,0.9) 100%)' // Brand gold gradient
};

// Check if URL is accessible
async function checkImageUrl(url) {
  return new Promise((resolve) => {
    if (!url || typeof url !== 'string') {
      resolve({ valid: false, reason: 'empty_url' });
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      resolve({ valid: false, reason: 'invalid_url' });
      return;
    }

    // For Google Places photos, assume valid if properly formatted
    if (url.includes('maps.googleapis.com/maps/api/place/photo')) {
      resolve({ valid: true, reason: 'google_places' });
      return;
    }

    // For other URLs, do a quick HEAD request
    const urlObj = new URL(url);
    const options = {
      method: 'HEAD',
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      timeout: 3000
    };

    const req = https.request(options, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ valid: true, reason: 'head_check_passed' });
      } else {
        resolve({ valid: false, reason: `status_${res.statusCode}` });
      }
    });

    req.on('error', () => resolve({ valid: false, reason: 'network_error' }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ valid: false, reason: 'timeout' });
    });
    req.end();
  });
}

// Get fallback gradient for venue
function getFallbackGradient(venue) {
  if (!venue.cuisines || venue.cuisines.length === 0) {
    return FALLBACK_GRADIENTS.default;
  }

  const cuisine = venue.cuisines[0].toLowerCase();
  for (const [key, gradient] of Object.entries(FALLBACK_GRADIENTS)) {
    if (cuisine.includes(key)) {
      return gradient;
    }
  }

  return FALLBACK_GRADIENTS.default;
}

async function main() {
  console.log('🔍 Checking venue images...\n');

  // Read venues
  const raw = fs.readFileSync(VENUES_PATH, 'utf8');
  const data = JSON.parse(raw);
  let venues = Array.isArray(data) ? data : data.venues || [];

  const manifest = {
    generated_at: new Date().toISOString(),
    total_venues: venues.length,
    stats: {
      with_images: 0,
      without_images: 0,
      invalid_images: 0,
      fixed: 0
    },
    fixes: []
  };

  // Check each venue
  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i];
    const progress = `[${i + 1}/${venues.length}]`;
    
    // Check if venue has photos
    if (!venue.photos || venue.photos.length === 0) {
      console.log(`${progress} ❌ ${venue.name} - No images`);
      manifest.stats.without_images++;
      
      // Add fallback gradient
      venue.fallback_image = {
        type: 'gradient',
        value: getFallbackGradient(venue),
        reason: 'no_photos'
      };
      manifest.stats.fixed++;
      manifest.fixes.push({
        name: venue.name,
        slug: venue.slug,
        fix: 'Added gradient fallback (no photos)'
      });
      continue;
    }

    // Check first photo URL
    const firstPhoto = venue.photos[0];
    if (!firstPhoto.url) {
      console.log(`${progress} ⚠️  ${venue.name} - Photo missing URL`);
      manifest.stats.invalid_images++;
      
      venue.fallback_image = {
        type: 'gradient',
        value: getFallbackGradient(venue),
        reason: 'missing_url'
      };
      manifest.stats.fixed++;
      manifest.fixes.push({
        name: venue.name,
        slug: venue.slug,
        fix: 'Added gradient fallback (missing URL)'
      });
      continue;
    }

    // Quick validation for Google Places photos
    const check = await checkImageUrl(firstPhoto.url);
    if (!check.valid) {
      console.log(`${progress} ⚠️  ${venue.name} - Invalid image (${check.reason})`);
      manifest.stats.invalid_images++;
      
      venue.fallback_image = {
        type: 'gradient',
        value: getFallbackGradient(venue),
        reason: check.reason
      };
      manifest.stats.fixed++;
      manifest.fixes.push({
        name: venue.name,
        slug: venue.slug,
        fix: `Added gradient fallback (${check.reason})`
      });
    } else {
      console.log(`${progress} ✅ ${venue.name}`);
      manifest.stats.with_images++;
    }

    // Rate limit to avoid API throttling
    if (i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  // Write updated venues
  fs.writeFileSync(
    VENUES_PATH,
    JSON.stringify(Array.isArray(data) ? venues : { ...data, venues }, null, 2)
  );

  // Write manifest
  fs.writeFileSync(OUTPUT_MANIFEST, JSON.stringify(manifest, null, 2));

  console.log('\n✨ Image check complete!\n');
  console.log('📊 Stats:');
  console.log(`   ✅ Valid images: ${manifest.stats.with_images}`);
  console.log(`   ❌ No images: ${manifest.stats.without_images}`);
  console.log(`   ⚠️  Invalid images: ${manifest.stats.invalid_images}`);
  console.log(`   🔧 Fixed: ${manifest.stats.fixed}`);
  console.log(`\n📄 Manifest: ${OUTPUT_MANIFEST}`);
  console.log(`📄 Updated: ${VENUES_PATH}`);
}

main().catch(console.error);
