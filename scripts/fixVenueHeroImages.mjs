import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const VENUES_FILE = path.join(ROOT, 'public', 'venues.json');
const VENUE_IMG_DIR = path.join(ROOT, 'public', 'images', 'venues');
const SOURCED_DIR = path.join(ROOT, 'public', 'images', 'sourced');
const GOOGLE_DIR = path.join(ROOT, 'public', 'images', 'google');
const CUISINE_TILES_DIR = path.join(ROOT, 'public', 'images', 'tiles', 'cuisines');
const AREA_TILES_DIR = path.join(ROOT, 'public', 'images', 'tiles', 'areas');
const REPORT_FILE = path.join(ROOT, 'reports', 'venue_image_health.json');

const venues = JSON.parse(fs.readFileSync(VENUES_FILE, 'utf-8'));
const results = [];

function findLocalImage(slug) {
  const exts = ['.webp', '.jpg', '.jpeg', '.png'];
  const searchPaths = [
    path.join(VENUE_IMG_DIR, slug),
    path.join(SOURCED_DIR, slug),
    path.join(GOOGLE_DIR, slug)
  ];

  for (const searchPath of searchPaths) {
    if (fs.existsSync(searchPath)) {
      // Check for numbered images (1.webp, 2.webp, etc.)
      for (const ext of exts) {
        for (let i = 1; i <= 5; i++) {
          const candidate = path.join(searchPath, `${i}${ext}`);
          if (fs.existsSync(candidate) && fs.statSync(candidate).size > 50000) {
            return candidate.replace(ROOT + '/public', '');
          }
        }
        // Check for card.webp, hero.webp
        const cardPath = path.join(searchPath, `card${ext}`);
        const heroPath = path.join(searchPath, `hero${ext}`);
        if (fs.existsSync(cardPath) && fs.statSync(cardPath).size > 50000) {
          return cardPath.replace(ROOT + '/public', '');
        }
        if (fs.existsSync(heroPath) && fs.statSync(heroPath).size > 50000) {
          return heroPath.replace(ROOT + '/public', '');
        }
      }
    }
  }

  // Check for direct file in venue directory
  for (const ext of exts) {
    const candidate = path.join(VENUE_IMG_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate) && fs.statSync(candidate).size > 50000) {
      return candidate.replace(ROOT + '/public', '');
    }
  }

  return null;
}

function findCuisineTile(cuisine) {
  if (!cuisine) return null;
  const normalizedCuisine = cuisine.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const tilePath = path.join(CUISINE_TILES_DIR, `${normalizedCuisine}.webp`);
  if (fs.existsSync(tilePath) && fs.statSync(tilePath).size > 50000) {
    return tilePath.replace(ROOT + '/public', '');
  }
  return null;
}

function findAreaTile(area) {
  if (!area) return null;
  const normalizedArea = area.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const tilePath = path.join(AREA_TILES_DIR, `${normalizedArea}.webp`);
  if (fs.existsSync(tilePath) && fs.statSync(tilePath).size > 50000) {
    return tilePath.replace(ROOT + '/public', '');
  }
  return null;
}

function getBestImage(venue) {
  const slug = venue.slug || venue.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
  
  // 1. Try to find local venue-specific image
  const localImage = findLocalImage(slug);
  if (localImage) {
    return { path: localImage, reason: 'venue-specific', priority: 1 };
  }

  // 2. Try cuisine tile
  const primaryCuisine = venue.cuisines?.[0] || venue.cuisine;
  const cuisineTile = findCuisineTile(primaryCuisine);
  if (cuisineTile) {
    return { path: cuisineTile, reason: 'cuisine-tile', priority: 2 };
  }

  // 3. Try area tile
  const area = venue.area || venue.borough;
  const areaTile = findAreaTile(area);
  if (areaTile) {
    return { path: areaTile, reason: 'area-tile', priority: 3 };
  }

  // 4. Fall back to site default
  return { path: '/images/heroes/site-default.webp', reason: 'site-default', priority: 4 };
}

(async () => {
  let localImages = 0;
  let cuisineTiles = 0;
  let areaTiles = 0;
  let siteDefaults = 0;

  console.log(`🔍 Processing ${venues.length} venues...`);

  for (const venue of venues) {
    const slug = venue.slug || venue.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
    const bestImage = getBestImage(venue);
    
    // Update venue with best available image
    venue.image_card_path = bestImage.path;
    venue.image_hero_path = bestImage.path;
    
    // Track statistics
    switch (bestImage.priority) {
      case 1: localImages++; break;
      case 2: cuisineTiles++; break;
      case 3: areaTiles++; break;
      case 4: siteDefaults++; break;
    }

    results.push({
      slug,
      status: `✅ ${bestImage.reason.toUpperCase()}`,
      path: bestImage.path,
      priority: bestImage.priority,
      cuisine: venue.cuisines?.[0] || venue.cuisine,
      area: venue.area || venue.borough
    });
  }

  // Write updated venues file
  fs.writeFileSync(VENUES_FILE, JSON.stringify(venues, null, 2));
  fs.writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2));

  console.log(`✅ Processed ${venues.length} venues:`);
  console.log(`📸 Venue-specific images: ${localImages}`);
  console.log(`🍽️ Cuisine tiles: ${cuisineTiles}`);
  console.log(`📍 Area tiles: ${areaTiles}`);
  console.log(`🏠 Site defaults: ${siteDefaults}`);
  console.log(`📊 Report saved to ${REPORT_FILE}`);
})();
