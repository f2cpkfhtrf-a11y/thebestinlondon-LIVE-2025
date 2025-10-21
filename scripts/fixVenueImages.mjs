import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const VENUES_FILE = path.join(ROOT, "public/venues.json");
const REPORT_FILE = path.join(ROOT, "reports/venue_image_fix.json");

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

function resolveVenueImages(venue) {
  const result = {
    hero: null,
    card: null,
    source: "none"
  };
  
  // Try existing hero image
  if (isValidImagePath(venue.image_hero_path)) {
    result.hero = venue.image_hero_path;
    result.card = venue.image_hero_path;
    result.source = "existing_hero";
    return result;
  }
  
  // Try existing card image
  if (isValidImagePath(venue.image_card_path)) {
    result.hero = venue.image_card_path;
    result.card = venue.image_card_path;
    result.source = "existing_card";
    return result;
  }
  
  // Try first image from images array
  if (venue.images && venue.images.length > 0 && isValidImagePath(venue.images[0])) {
    result.hero = venue.images[0];
    result.card = venue.images[0];
    result.source = "existing_image";
    return result;
  }
  
  // Try cuisine tile
  const cuisineTile = getCuisineTile(venue.cuisines?.[0]);
  if (cuisineTile) {
    result.hero = cuisineTile;
    result.card = cuisineTile;
    result.source = "cuisine_tile";
    return result;
  }
  
  // Try area tile
  const areaTile = getAreaTile(venue.area || venue.borough);
  if (areaTile) {
    result.hero = areaTile;
    result.card = areaTile;
    result.source = "area_tile";
    return result;
  }
  
  // Fallback to site default
  result.hero = "/images/heroes/site-default.webp";
  result.card = "/images/heroes/site-default.webp";
  result.source = "fallback_used";
  
  return result;
}

function fixVenueImages() {
  const venues = loadVenues();
  const report = {
    total: venues.length,
    processed: 0,
    fixed_hero: 0,
    used_cuisine_tile: 0,
    used_area_tile: 0,
    fallback_used: 0,
    coverage: {
      existing_hero: 0,
      existing_card: 0,
      existing_image: 0,
      cuisine_tile: 0,
      area_tile: 0,
      fallback_used: 0
    }
  };
  
  for (const venue of venues) {
    const resolved = resolveVenueImages(venue);
    
    // Update venue if needed
    if (!venue.image_hero_path || !isValidImagePath(venue.image_hero_path)) {
      venue.image_hero_path = resolved.hero;
      if (resolved.source !== "existing_hero") {
        report.fixed_hero++;
      }
    }
    
    if (!venue.image_card_path || !isValidImagePath(venue.image_card_path)) {
      venue.image_card_path = resolved.card;
    }
    
    report.coverage[resolved.source]++;
    report.processed++;
    
    if (resolved.source === "cuisine_tile") report.used_cuisine_tile++;
    if (resolved.source === "area_tile") report.used_area_tile++;
    if (resolved.source === "fallback_used") report.fallback_used++;
  }
  
  // Save changes
  fs.writeFileSync(VENUES_FILE, JSON.stringify(venues, null, 2));
  
  // Save report
  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  
  console.log("✅ Venue images report:", report);
  return report;
}

fixVenueImages();