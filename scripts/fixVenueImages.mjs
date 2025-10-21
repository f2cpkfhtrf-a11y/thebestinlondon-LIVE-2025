import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const VENUES_FILE = path.join(ROOT, "public/venues.json");
const VENUES_IMG_DIR = path.join(ROOT, "public/images/venues");

const EXTERNAL_FETCH = process.env.EXTERNAL_IMAGE_FETCH === "1";
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT || "50");

function loadVenues() {
  const raw = fs.readFileSync(VENUES_FILE, "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? data : (data.venues || []);
}

function isValidImagePath(path) {
  return path && typeof path === "string" && path.startsWith("/images/") && !path.includes("placeholder");
}

function getCuisineTile(cuisine) {
  if (!cuisine) return null;
  const slug = cuisine.toLowerCase().replace(/[^a-z0-9]/g, "-");
  return `/images/tiles/cuisines/${slug}.webp`;
}

function getAreaTile(area) {
  if (!area) return null;
  const slug = area.toLowerCase().replace(/[^a-z0-9]/g, "-");
  return `/images/tiles/areas/${slug}.webp`;
}

async function fetchVenueImage(venue, outputDir) {
  if (!EXTERNAL_FETCH || !GOOGLE_API_KEY || !venue.google_place_id) return false;
  
  try {
    const placeId = venue.google_place_id;
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`;
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.result?.photos && data.result.photos.length > 0) {
      const photoRef = data.result.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;
      
      const photoResponse = await fetch(photoUrl);
      if (photoResponse.ok) {
        const buffer = await photoResponse.arrayBuffer();
        
        // Create card image (16:10 aspect)
        const cardBuffer = await sharp(Buffer.from(buffer))
          .resize(1600, 1000, { fit: "cover" })
          .webp({ quality: 88 })
          .toBuffer();
        
        // Create hero image (16:9 aspect)  
        const heroBuffer = await sharp(Buffer.from(buffer))
          .resize(1600, 900, { fit: "cover" })
          .webp({ quality: 88 })
          .toBuffer();
        
        if (cardBuffer.length >= 51200 && heroBuffer.length >= 51200) {
          fs.mkdirSync(outputDir, { recursive: true });
          fs.writeFileSync(path.join(outputDir, "card.webp"), cardBuffer);
          fs.writeFileSync(path.join(outputDir, "hero.webp"), heroBuffer);
          
          return {
            card: `/images/venues/${venue.slug}/card.webp`,
            hero: `/images/venues/${venue.slug}/hero.webp`
          };
        }
      }
    }
  } catch (error) {
    console.log(`⚠️ External fetch failed for ${venue.name}:`, error.message);
  }
  
  return false;
}

function resolveVenueImages(venue) {
  const result = {
    card: null,
    hero: null,
    source: "none"
  };
  
  // Try existing card image
  if (isValidImagePath(venue.image_card_path)) {
    result.card = venue.image_card_path;
    result.hero = venue.image_card_path;
    result.source = "existing_card";
    return result;
  }
  
  // Try first image from images array
  if (venue.images && venue.images.length > 0 && isValidImagePath(venue.images[0])) {
    result.card = venue.images[0];
    result.hero = venue.images[0];
    result.source = "existing_image";
    return result;
  }
  
  // Try cuisine tile
  const cuisineTile = getCuisineTile(venue.cuisines?.[0]);
  if (cuisineTile) {
    result.card = cuisineTile;
    result.hero = cuisineTile;
    result.source = "cuisine_tile";
    return result;
  }
  
  // Try area tile
  const areaTile = getAreaTile(venue.area || venue.borough);
  if (areaTile) {
    result.card = areaTile;
    result.hero = areaTile;
    result.source = "area_tile";
    return result;
  }
  
  // Fallback to site default
  result.card = "/images/heroes/site-default.webp";
  result.hero = "/images/heroes/site-default.webp";
  result.source = "site_default";
  
  return result;
}

async function fixVenueImages(writeChanges = false) {
  const venues = loadVenues();
  const report = {
    total: venues.length,
    processed: 0,
    external: 0,
    needsImages: [],
    coverage: {
      existing_card: 0,
      existing_image: 0,
      cuisine_tile: 0,
      area_tile: 0,
      site_default: 0,
      external_fetch: 0
    }
  };
  
  let externalCount = 0;
  
  for (const venue of venues) {
    const resolved = resolveVenueImages(venue);
    
    // Try external fetch if no good image and under rate limit
    if (resolved.source === "site_default" && externalCount < RATE_LIMIT) {
      const outputDir = path.join(VENUES_IMG_DIR, venue.slug);
      const externalResult = await fetchVenueImage(venue, outputDir);
      
      if (externalResult) {
        resolved.card = externalResult.card;
        resolved.hero = externalResult.hero;
        resolved.source = "external_fetch";
        externalCount++;
        report.external++;
      }
    }
    
    // Update venue if writing changes
    if (writeChanges) {
      venue.image_card_path = resolved.card;
      venue.image_hero_path = resolved.hero;
    }
    
    report.coverage[resolved.source]++;
    report.processed++;
    
    if (resolved.source === "site_default") {
      report.needsImages.push(venue.slug);
    }
  }
  
  // Save changes if requested
  if (writeChanges) {
    fs.writeFileSync(VENUES_FILE, JSON.stringify(venues, null, 2));
  }
  
  // Save report
  fs.mkdirSync(path.join(ROOT, "reports"), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, "reports/venue_images_after.json"),
    JSON.stringify(report, null, 2)
  );
  
  console.log("✅ Venue images report:", report);
  return report;
}

// Check for --write flag
const writeChanges = process.argv.includes("--write");

(async () => {
  try {
    await fixVenueImages(writeChanges);
  } catch (error) {
    console.error("❌ Venue images script failed:", error);
    process.exit(1);
  }
})();
