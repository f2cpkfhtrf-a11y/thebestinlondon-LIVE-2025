import { assertLocalImage } from './assertLocalImage';
import { withVersion } from './resolveAssets';
import { getVenueGooglePhotoUrl } from './getGooglePhotoUrl';

import areaImageMap from '../data/areaImageMap';
import cuisineImageMap from '../data/cuisineImageMap';
import { logImageFallback } from './logImageIssue';

// Omar's enhanced tile system with simple fallback and cache-busting
function getEnhancedTilePath(slug: string, type: 'cuisine' | 'area'): string {
  // Try enhanced tile first, fallback to original
  const enhancedPath = `/images/tiles/${type}s-enhanced/${slug}-tile.webp`;
  const originalPath = `/images/tiles/${type}s/${slug}.webp`;
  
  // Use enhanced path for all available enhanced tiles
  const enhancedTiles = [
    // Cuisine tiles
    'british', 'caribbean', 'chinese', 'french', 'indian', 'italian', 'japanese', 
    'korean', 'mediterranean', 'mexican', 'modern-european', 'spanish', 'thai', 'turkish',
    // Area tiles
    'camden', 'central-london', 'hackney', 'havering', 'kensington-and-chelsea', 
    'newham', 'redbridge', 'southwark', 'tower-hamlets', 'westminster', 'whitechapel'
  ];
  
  if (enhancedTiles.includes(slug)) {
    // Use stable version for enhanced tiles to ensure proper caching and loading
    return `${enhancedPath}?v=enhanced`;
  }
  
  return originalPath;
}

// --- Enhanced tile maps using Omar's workflow
const CUISINE_TILE_MAP: Record<string, string> = {
  // Main cuisines with enhanced tiles from Omar's workflow
  british: getEnhancedTilePath('british', 'cuisine'),
  mediterranean: getEnhancedTilePath('mediterranean', 'cuisine'),
  "modern-european": getEnhancedTilePath('modern-european', 'cuisine'),
  indian: getEnhancedTilePath('indian', 'cuisine'),
  turkish: getEnhancedTilePath('turkish', 'cuisine'),
  japanese: getEnhancedTilePath('japanese', 'cuisine'),
  italian: getEnhancedTilePath('italian', 'cuisine'),
  french: getEnhancedTilePath('french', 'cuisine'),
  thai: getEnhancedTilePath('thai', 'cuisine'),
  mexican: getEnhancedTilePath('mexican', 'cuisine'),
  korean: getEnhancedTilePath('korean', 'cuisine'),
  spanish: getEnhancedTilePath('spanish', 'cuisine'),
  chinese: getEnhancedTilePath('chinese', 'cuisine'),
  caribbean: getEnhancedTilePath('caribbean', 'cuisine'),
  
  // Additional cuisines (fallback to original tiles)
  vietnamese: "/images/tiles/cuisines/vietnamese.webp",
  american: "/images/tiles/cuisines/american.webp",
  african: "/images/tiles/cuisines/african.webp",
  seafood: "/images/tiles/cuisines/seafood.webp",
  vegetarian: "/images/tiles/cuisines/vegetarian.webp",
  vegan: "/images/tiles/cuisines/vegan.webp",
  afghan: "/images/tiles/cuisines/afghan.webp",
  bakery: "/images/tiles/cuisines/bakery.webp",
  bangladeshi: "/images/tiles/cuisines/bangladeshi.webp",
  burgers: "/images/tiles/cuisines/burgers.webp",
  cafe: "/images/tiles/cuisines/cafe.webp",
  desserts: "/images/tiles/cuisines/desserts.webp",
  halal: "/images/tiles/cuisines/halal.webp",
  iranian: "/images/tiles/cuisines/iranian.webp",
  lebanese: "/images/tiles/cuisines/lebanese.webp",
  "middle-eastern": "/images/tiles/cuisines/middle-eastern.webp",
  pakistani: "/images/tiles/cuisines/pakistani.webp",
  pizza: "/images/tiles/cuisines/pizza.webp",
  steakhouse: "/images/tiles/cuisines/steakhouse.webp",
  
  // Regional Indian cuisines - map to Indian tile
  "south-indian": getEnhancedTilePath('indian', 'cuisine'),
  punjabi: getEnhancedTilePath('indian', 'cuisine'),
  bengali: "/images/tiles/cuisines/bangladeshi.webp", // Bengali is close to Bangladeshi
  gujarati: getEnhancedTilePath('indian', 'cuisine'),
  kashmiri: getEnhancedTilePath('indian', 'cuisine'),
  rajasthani: getEnhancedTilePath('indian', 'cuisine'),
  curry: getEnhancedTilePath('indian', 'cuisine'), // Curry is Indian cuisine
  nepalese: getEnhancedTilePath('indian', 'cuisine'), // Similar region/flavors
  
  // Other regional cuisines with smart fallbacks
  "pan-asian": getEnhancedTilePath('japanese', 'cuisine'), // Pan-Asian often Japanese-focused
  european: getEnhancedTilePath('modern-european', 'cuisine'), // European -> Modern European
  australian: "/images/tiles/cuisines/american.webp", // Similar Western cuisine
  sweets: "/images/tiles/cuisines/desserts.webp", // Sweets -> Desserts
};

const AREA_TILE_MAP: Record<string, string> = {
  // Areas with enhanced tiles from Omar's workflow
  "central-london": getEnhancedTilePath('central-london', 'area'),
  "tower-hamlets": getEnhancedTilePath('tower-hamlets', 'area'),
  redbridge: getEnhancedTilePath('redbridge', 'area'),
  camden: getEnhancedTilePath('camden', 'area'),
  hackney: getEnhancedTilePath('hackney', 'area'),
  havering: getEnhancedTilePath('havering', 'area'),
  newham: getEnhancedTilePath('newham', 'area'),
  southwark: getEnhancedTilePath('southwark', 'area'),
  westminster: getEnhancedTilePath('westminster', 'area'),
  "kensington-and-chelsea": getEnhancedTilePath('kensington-and-chelsea', 'area'),
  // Additional areas with tiles
  slough: "/images/tiles/areas/slough.webp",
  southall: "/images/tiles/areas/southall.webp",
  ilford: "/images/tiles/areas/ilford.webp",
  soho: "/images/tiles/areas/soho.webp",
  "covent-garden": "/images/tiles/areas/covent-garden.webp",
};

const STATION_TILE_MAP: Record<string, string> = {
  "liverpool-street": "/images/tiles/stations/liverpool-street.webp",
  waterloo: "/images/tiles/stations/waterloo.webp",
  "kings-cross": "/images/tiles/stations/kings-cross.webp",
  "london-bridge": "/images/tiles/stations/london-bridge.webp",
};

const DEFAULTS = {
  cuisine: "/images/tiles/cuisines/default.webp",
  area: "/images/tiles/areas/default.webp",
  station: "/images/tiles/stations/default.webp",
  site: "/images/heroes/site-default.webp",
};

// Enhanced tiles are now integrated into the main CUISINE_TILE_MAP and AREA_TILE_MAP above

export function resolveTileImage(opts: { type: "cuisine"|"area"|"station"; slug: string }): string {
  const slug = (opts.slug || "").toLowerCase().trim();
  let candidate: string | undefined;
  
  // Use updated tile maps with enhanced tiles integrated
  if (opts.type === "cuisine") {
    // First, try direct lookup in map
    candidate = CUISINE_TILE_MAP[slug];
    
    // If not in map, try checking if file exists in standard location
    if (!candidate || candidate === DEFAULTS.cuisine) {
      const standardPath = `/images/tiles/cuisines/${slug}.webp`;
      // Note: We can't check file existence client-side, but we'll use it if slug is valid
      // For cuisines, try the standard path if it's a simple slug
      if (slug && !slug.includes(' ') && slug.length > 0) {
        candidate = standardPath;
      }
    }
    
    // Still no match? Use default
    if (!candidate || candidate === DEFAULTS.cuisine) {
      candidate = DEFAULTS.cuisine;
    }
  } else if (opts.type === "area") {
    candidate = AREA_TILE_MAP[slug] || DEFAULTS.area;
  } else if (opts.type === "station") {
    candidate = STATION_TILE_MAP[slug] || DEFAULTS.station;
  }
  
  // Final safety check - ensure we have a valid path
  const finalPath = candidate || (opts.type === "cuisine" ? DEFAULTS.cuisine : opts.type === "area" ? DEFAULTS.area : DEFAULTS.station);
  assertLocalImage(finalPath);
  return withVersion(finalPath);
}

// --- Venue hero: prefer REAL VENUE PHOTOS > venue hero > first gallery > cuisine tile > area tile > site default
export function resolveVenueHero(opts: {
  venue?: { 
    slug?: string; 
    images?: string[]; 
    hero?: string; 
    cuisine?: string; 
    areaSlug?: string;
    image_hero_path?: string;
    image_card_path?: string;
    cuisines?: string[];
    borough?: string;
    name?: string;
  };
}): string {
  const v = opts.venue || {};
  
  // Primary: Use provided venue hero path if available (REAL PHOTOS)
  if (v.image_hero_path && !v.image_hero_path.includes('placeholder')) {
    const imageUrl = v.image_hero_path.replace('/public', '');
    try {
      assertLocalImage(imageUrl);
      return withVersion(imageUrl);
    } catch {
      // Image doesn't exist, try alternative paths
    }
  }
  
  // Try finding hero.webp in restaurant directory
  if (v.slug) {
    const slugParts = v.slug.split('-');
    const possibleDirs = [
      v.slug,
      slugParts.slice(0, -2).join('-'),
      slugParts.slice(0, -3).join('-'),
    ].filter(Boolean);
    
    for (const dirName of possibleDirs) {
      const heroPath = `/images/restaurants/${dirName}/hero.webp`;
      try {
        assertLocalImage(heroPath);
        return withVersion(heroPath);
      } catch {
        // Continue
      }
    }
  }
  
  // Secondary: Try card image as hero fallback
  if (v.image_card_path && !v.image_card_path.includes('placeholder')) {
    const cardPath = v.image_card_path.replace('/public', '');
    try {
      assertLocalImage(cardPath);
      return withVersion(cardPath);
    } catch {
      // Continue
    }
  }
  
  // Tertiary: Try legacy hero field
  if (v.hero) {
    try {
      assertLocalImage(v.hero);
      return withVersion(v.hero);
    } catch {
      // Continue
    }
  }
  
  // Quaternary: Try first gallery image
  if (Array.isArray(v.images) && v.images.length) {
    const imageUrl = v.images[0]!;
    try {
      assertLocalImage(imageUrl);
      return withVersion(imageUrl);
    } catch {
      // Continue
    }
  }
  
  // Quaternary: Try cuisine-based hero (GENERIC FALLBACK)
  if (v.cuisines && v.cuisines[0]) {
    return resolveTileImage({ type: "cuisine", slug: v.cuisines[0] });
  }
  if (v.cuisine) {
    return resolveTileImage({ type: "cuisine", slug: v.cuisine });
  }
  
  // Quinary: Try area-based hero
  if (v.areaSlug) {
    return resolveTileImage({ type: "area", slug: v.areaSlug });
  }
  
  const defaultPath = DEFAULTS.site;
  assertLocalImage(defaultPath);
  return withVersion(defaultPath);
}

export function resolveHeroImage(ctx: {
  type: "home" | "list-cuisine" | "list-area" | "list-areas" | "list-cuisines" | "list-all" | "list-halal" | "search" | "venue" | "tile-area" | "tile-cuisine" | "halal";
  cuisineSlug?: string;
  areaSlug?: string;
  venue?: any;
  scope?: "list" | "venue" | "guideSection";
}): { src: string; alt: string; srcMd?: string; srcLg?: string } {
  // Define known good image paths in order of preference
  // This avoids fs operations during client-side rendering
  
  let imageSrc: string | null = null;
  
  // Venue-specific hero selection with smart fallbacks
  if (ctx.type === "venue" && ctx.venue) {
    const v = ctx.venue;
    
    // Primary: Use provided venue hero path if available
    if (v.image_hero_path && !v.image_hero_path.includes('placeholder')) {
      imageSrc = v.image_hero_path.replace('/public', '');
    }
    
    // Secondary: Try venue-specific hero
    if (!imageSrc) {
      const venueSlug = v.slug || v.name?.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (venueSlug) {
        imageSrc = `/images/restaurants/${venueSlug}/${venueSlug}-hero.webp`;
      }
    }
    
    // Tertiary: Try cuisine-based hero
    if (!imageSrc && v.cuisines && v.cuisines[0]) {
      const cuisineSlug = v.cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
      imageSrc = `/images/heroes/cuisines/${cuisineSlug}.webp`;
    }
    
    // Quaternary: Try area-based hero
    if (!imageSrc && (v.area || v.borough)) {
      const areaSlug = (v.area || v.borough).toLowerCase().replace(/[^a-z0-9]/g, '-');
      imageSrc = `/images/heroes/areas/${areaSlug}.webp`;
    }
    
    // Venue fallback
    if (!imageSrc) {
      imageSrc = "/images/heroes/site/default-list-hero.webp";
    }
  }
  // Home page hero
  else if (ctx.type === "home") {
    imageSrc = "/images/heroes/site/home-hero.webp";
  }
  // Cuisine page hero
  else if (ctx.type === "list-cuisine" && ctx.cuisineSlug) {
    imageSrc = `/images/heroes/cuisines/${ctx.cuisineSlug}.webp`;
    // Fallback chain: specific cuisine -> default list hero
    if (!imageSrc || imageSrc.includes('undefined')) {
      imageSrc = "/images/heroes/site/default-list-hero.webp";
    }
  }
  // Area page hero
  else if (ctx.type === "list-area" && ctx.areaSlug) {
    imageSrc = `/images/heroes/areas/${ctx.areaSlug}.webp`;
    // Fallback chain: specific area -> default list hero
    if (!imageSrc || imageSrc.includes('undefined')) {
      imageSrc = "/images/heroes/site/default-list-hero.webp";
    }
  }
  // Halal restaurants page
  else if (ctx.type === "list-halal") {
    imageSrc = "/images/heroes/pages/halal-hero.webp";
  }
  // Tile for areas
  else if (ctx.type === "tile-area" && ctx.areaSlug) {
    imageSrc = areaImageMap[ctx.areaSlug] || "/images/heroes/site/default-area.webp";
    if (!areaImageMap[ctx.areaSlug]) {
      logImageFallback('area-tile', 3, {
        originalPath: `/images/areas/${ctx.areaSlug}-hero.webp`,
        fallbackPath: imageSrc,
        reason: 'Area not found in areaImageMap'
      });
    }
  }
  // Tile for cuisines
  else if (ctx.type === "tile-cuisine" && ctx.cuisineSlug) {
    imageSrc = cuisineImageMap[ctx.cuisineSlug] || "/images/heroes/site/default-cuisine.webp";
    if (!cuisineImageMap[ctx.cuisineSlug]) {
      logImageFallback('cuisine-tile', 3, {
        originalPath: `/images/cuisines/${ctx.cuisineSlug}-hero.webp`,
        fallbackPath: imageSrc,
        reason: 'Cuisine not found in cuisineImageMap'
      });
    }
  }
  // Halal specific logic
  else if (ctx.type === "halal") {
    if (ctx.scope === "list") {
      imageSrc = "/images/heroes/pages/halal-hero.webp";
    } else if (ctx.scope === "venue" && ctx.cuisineSlug) {
      imageSrc = cuisineImageMap[ctx.cuisineSlug] || "/images/heroes/pages/halal-hero.webp";
    } else {
      imageSrc = "/images/heroes/pages/halal-hero.webp";
    }
  }
  // Main page heroes - restaurants page
  else if (ctx.type === "list-all") {
    imageSrc = "/images/heroes/pages/restaurants-hero.webp";
  }
  // Areas page hero
  else if (ctx.type === "list-areas") {
    imageSrc = "/images/heroes/pages/areas-hero.webp";
  }
  // Cuisines page hero  
  else if (ctx.type === "list-cuisines") {
    imageSrc = "/images/heroes/pages/cuisines-hero.webp";
  }
  // Search results
  else if (ctx.type === "search") {
    imageSrc = "/images/heroes/pages/restaurants-hero.webp";
  }
  // Default fallback
  else {
    imageSrc = "/images/heroes/site/default-list-hero.webp";
  }

  // Assert local-only for development
  assertLocalImage(imageSrc);

  // Generate responsive variants if they exist (don't create files, just check naming pattern)
  const basePath = imageSrc.replace(/\.webp$/, '');
  const srcMd = imageSrc; // For now, just use the main src as md variant
  const srcLg = basePath.includes('-hero') ? imageSrc.replace('-hero.webp', '-hero-xl.webp') : imageSrc;

  const result: { src: string; alt: string; srcMd?: string; srcLg?: string } = {
    src: withVersion(imageSrc),
    alt: `Hero image for ${ctx.cuisineSlug || ctx.areaSlug || ctx.venue?.name || "The Best in London"}`,
  };

  // Only include variants if they differ from src (client-side safe)
  if (srcMd !== imageSrc) {
    result.srcMd = srcMd;
  }
  if (srcLg !== imageSrc && srcLg !== srcMd) {
    result.srcLg = srcLg;
  }

  return result;
}

interface Venue {
  image_card_path?: string;
  image_hero_path?: string;
  cuisines?: string[];
  area?: string;
  borough?: string;
  slug?: string;
  name?: string;
  gallery_images?: Array<{
    filename: string;
    path: string;
    attribution?: string;
  }>;
}

export async function resolveCardImage(opts: { 
  venue?: Venue; 
  cuisineSlug?: string; 
  areaSlug?: string;
  type?: "tile-area" | "tile-cuisine";
}): Promise<string> {
  const { venue, type, areaSlug, cuisineSlug } = opts;
  
  // Handle tile types using the maps
  if (type === "tile-area" && areaSlug) {
    return resolveAreaImage(areaSlug);
  }
  if (type === "tile-cuisine" && cuisineSlug) {
    return resolveCuisineImage(cuisineSlug);
  }
  
  // Mirror the PageHero chain for card images (client-side safe)
  if (venue) {
    // Primary: Use provided venue card path if available
    if (venue.image_card_path && !venue.image_card_path.includes('placeholder')) {
      const cardPath = venue.image_card_path.replace('/public', '');
      assertLocalImage(cardPath);
      return withVersion(cardPath);
    }
    
    // Secondary: Try venue-specific card
    const venueSlug = venue.slug || venue.name?.toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (venueSlug) {
      const venueCardPath = `/images/restaurants/${venueSlug}/${venueSlug}-card.webp`;
      assertLocalImage(venueCardPath);
      return withVersion(venueCardPath);
    }
    
    // Tertiary: Try cuisine-based card/hero fallback
    if (venue.cuisines && venue.cuisines[0]) {
      const cuisineSlug = venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
      const cuisineCardPath = `/images/cuisines/${cuisineSlug}-card.webp`;
      // Note: We don't check existence client-side, but this will fallback gracefully
      assertLocalImage(cuisineCardPath);
      return withVersion(cuisineCardPath);
    }
    
    // Quaternary: Try area-based fallback
    const areaName = venue.area || venue.borough;
    if (areaName) {
      const areaSlug = areaName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const areaCardPath = `/images/areas/${areaSlug}-card.webp`;
      assertLocalImage(areaCardPath);
      return withVersion(areaCardPath);
    }
  }
  
  // Final fallbacks
  const defaultCardPath = "/images/heroes/site/default-card.webp";
  assertLocalImage(defaultCardPath);
  return withVersion(defaultCardPath);
}

// Synchronous version of resolveCardImage for use in components
export function resolveCardImageSync(opts: { venue?: Venue }): string {
  const { venue } = opts;
  
  if (!venue) {
    const defaultCardPath = "/images/heroes/site/default-card.webp";
    assertLocalImage(defaultCardPath);
    return withVersion(defaultCardPath);
  }
  
  // Primary: Use provided venue card path if available
  // Note: We'll let the browser onError handler handle missing files
  // This prevents client-side build errors from Node.js modules
  if (venue.image_card_path && !venue.image_card_path.includes('placeholder')) {
    const cardPath = venue.image_card_path.replace('/public', '');
    // Return path - browser will handle 404 with onError fallback in StandardizedCard
    return withVersion(cardPath);
  }
  
  // Secondary: Try hero image as card fallback (for better quality)
  if (venue.image_hero_path && !venue.image_hero_path.includes('placeholder')) {
    const heroPath = venue.image_hero_path.replace('/public', '');
    // Return path - browser will handle 404 with onError fallback
    return withVersion(heroPath);
  }
  
  // Tertiary: Try Google Places Photo API (REAL restaurant images!)
  // This gives us actual restaurant photos from Google
  const googlePhotoUrl = getVenueGooglePhotoUrl(venue, 800);
  if (googlePhotoUrl) {
    // Return Google photo URL directly - no version needed for external URLs
    return googlePhotoUrl;
  }
  
  // Quaternary: Try cuisine-based fallback using new tile resolver
  if (venue.cuisines && venue.cuisines[0]) {
    const cuisineSlug = venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    try {
      return resolveTileImage({ type: "cuisine", slug: cuisineSlug });
    } catch {
      // Continue to area fallback
    }
  }
  
  // Quinary: Try area-based fallback using new tile resolver
  const areaName = venue.area || venue.borough;
  if (areaName) {
    const areaSlug = areaName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    try {
      return resolveTileImage({ type: "area", slug: areaSlug });
    } catch {
      // Continue to default
    }
  }
  
  // Final fallback
  const defaultCardPath = "/images/heroes/site/default-card.webp";
  try {
    assertLocalImage(defaultCardPath);
    return withVersion(defaultCardPath);
  } catch {
    // Ultimate fallback
    return "/images/tiles/cuisines/default.webp?v=1";
  }
}

// Helper functions for area and cuisine images
export function resolveAreaImage(areaSlug: string): string {
  // Use the tile resolution which already handles enhanced tiles
  return resolveTileImage({ type: "area", slug: areaSlug });
}

export function resolveCuisineImage(cuisineSlug: string): string {
  // Use the tile resolution which already handles enhanced tiles
  return resolveTileImage({ type: "cuisine", slug: cuisineSlug });
}

export function resolveAreaHero(slug: string): string {
  // Try area-specific hero first
  const areaHero = `/images/areas/${slug}-hero.webp`;
  const areaCard = `/images/areas/${slug}-card.webp`;
  const cuisineDefault = `/images/cuisines/default-hero.webp`;
  const siteDefault = `/images/site/hero-default.webp`;
  
  // Return the most specific available (we can't check existence client-side)
  // but this provides the proper fallback chain
  const path = areaImageMap[slug] || areaHero || areaCard || cuisineDefault || siteDefault;
  assertLocalImage(path);
  return withVersion(path);
}
