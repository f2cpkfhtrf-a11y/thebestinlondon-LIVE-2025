import { assertLocalImage } from './assertLocalImage';
import areaImageMap from '../data/areaImageMap';
import cuisineImageMap from '../data/cuisineImageMap';
import { logImageFallback } from './logImageIssue';

// --- New: curated tile maps (purely local paths). Do NOT reference external URLs.
const CUISINE_TILE_MAP: Record<string, string> = {
  british: "/images/tiles/cuisines/british.webp",
  mediterranean: "/images/tiles/cuisines/mediterranean.webp",
  "modern-european": "/images/tiles/cuisines/modern-european.webp",
  indian: "/images/tiles/cuisines/indian.webp",
  turkish: "/images/tiles/cuisines/turkish.webp",
  japanese: "/images/tiles/cuisines/japanese.webp",
  italian: "/images/tiles/cuisines/italian.webp",
  french: "/images/tiles/cuisines/french.webp",
  thai: "/images/tiles/cuisines/thai.webp",
  mexican: "/images/tiles/cuisines/mexican.webp",
  korean: "/images/tiles/cuisines/korean.webp",
  spanish: "/images/tiles/cuisines/spanish.webp",
  chinese: "/images/tiles/cuisines/chinese.webp",
  caribbean: "/images/tiles/cuisines/caribbean.webp",
};

const AREA_TILE_MAP: Record<string, string> = {
  "central-london": "/images/tiles/areas/central-london.webp",
  "tower-hamlets": "/images/tiles/areas/tower-hamlets.webp",
  redbridge: "/images/tiles/areas/redbridge.webp",
  havering: "/images/tiles/areas/havering.webp",
  newham: "/images/tiles/areas/newham.webp",
  camden: "/images/tiles/areas/camden.webp",
  hackney: "/images/tiles/areas/hackney.webp",
  southwark: "/images/tiles/areas/southwark.webp",
  westminster: "/images/tiles/areas/westminster.webp",
  "kensington-and-chelsea": "/images/tiles/areas/kensington-and-chelsea.webp",
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

export function resolveTileImage(opts: { type: "cuisine"|"area"|"station"; slug: string }): string {
  const slug = (opts.slug || "").toLowerCase();
  let candidate: string | undefined;
  if (opts.type === "cuisine") candidate = CUISINE_TILE_MAP[slug] || DEFAULTS.cuisine;
  if (opts.type === "area") candidate = AREA_TILE_MAP[slug] || DEFAULTS.area;
  if (opts.type === "station") candidate = STATION_TILE_MAP[slug] || DEFAULTS.station;
  // Last resort (still local)
  const finalPath = candidate || DEFAULTS.site;
  assertLocalImage(finalPath);
  return finalPath;
}

// --- Venue hero: prefer venue hero > first gallery > cuisine tile > area tile > site default
export function resolveVenueHero(opts: {
  venue?: { slug?: string; images?: string[]; hero?: string; cuisine?: string; areaSlug?: string };
}): string {
  const v = opts.venue || {};
  
  if (v.hero) {
    assertLocalImage(v.hero);
    return v.hero;
  }
  
  if (Array.isArray(v.images) && v.images.length) {
    const imageUrl = v.images[0]!;
    assertLocalImage(imageUrl);
    return imageUrl;
  }
  
  if (v.cuisine) return resolveTileImage({ type: "cuisine", slug: v.cuisine });
  if (v.areaSlug) return resolveTileImage({ type: "area", slug: v.areaSlug });
  
  const defaultPath = DEFAULTS.site;
  assertLocalImage(defaultPath);
  return defaultPath;
}

export function resolveHeroImage(ctx: {
  type: "home" | "list-cuisine" | "list-area" | "list-all" | "list-halal" | "search" | "venue" | "tile-area" | "tile-cuisine" | "halal";
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
    imageSrc = "/images/heroes/site/default-list-hero.webp";
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
      if (ctx.cuisineSlug) {
        imageSrc = cuisineImageMap[ctx.cuisineSlug] || "/images/halal/halal-default-hero.webp";
      } else {
        imageSrc = "/images/halal/halal-default-hero.webp";
      }
    } else if (ctx.scope === "venue" && ctx.cuisineSlug) {
      imageSrc = cuisineImageMap[ctx.cuisineSlug] || "/images/halal/halal-default-hero.webp";
    } else {
      imageSrc = "/images/halal/halal-default-hero.webp";
    }
  }
  // List pages (all restaurants, search)
  else if (ctx.type === "list-all" || ctx.type === "search") {
    imageSrc = "/images/heroes/site/default-list-hero.webp";
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
    src: imageSrc,
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
  cuisines?: string[];
  area?: string;
  borough?: string;
  slug?: string;
  name?: string;
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
      return cardPath;
    }
    
    // Secondary: Try venue-specific card
    const venueSlug = venue.slug || venue.name?.toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (venueSlug) {
      const venueCardPath = `/images/restaurants/${venueSlug}/${venueSlug}-card.webp`;
      assertLocalImage(venueCardPath);
      return venueCardPath;
    }
    
    // Tertiary: Try cuisine-based card/hero fallback
    if (venue.cuisines && venue.cuisines[0]) {
      const cuisineSlug = venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
      const cuisineCardPath = `/images/cuisines/${cuisineSlug}-card.webp`;
      // Note: We don't check existence client-side, but this will fallback gracefully
      assertLocalImage(cuisineCardPath);
      return cuisineCardPath;
    }
    
    // Quaternary: Try area-based fallback
    const areaName = venue.area || venue.borough;
    if (areaName) {
      const areaSlug = areaName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const areaCardPath = `/images/areas/${areaSlug}-card.webp`;
      assertLocalImage(areaCardPath);
      return areaCardPath;
    }
  }
  
  // Final fallbacks
  const defaultCardPath = "/images/heroes/site/default-card.webp";
  assertLocalImage(defaultCardPath);
  return defaultCardPath;
}

// Synchronous version of resolveCardImage for use in components
export function resolveCardImageSync(opts: { venue?: Venue }): string {
  const { venue } = opts;
  
  if (!venue) {
    const defaultCardPath = "/images/heroes/site/default-card.webp";
    assertLocalImage(defaultCardPath);
    return defaultCardPath;
  }
  
  // Primary: Use provided venue card path if available
  if (venue.image_card_path && !venue.image_card_path.includes('placeholder')) {
    const cardPath = venue.image_card_path.replace('/public', '');
    assertLocalImage(cardPath);
    return cardPath;
  }
  
  // Secondary: Try venue-specific card
  const venueSlug = venue.slug || venue.name?.toLowerCase().replace(/[^a-z0-9]/g, '-');
  if (venueSlug) {
    const venueCardPath = `/images/restaurants/${venueSlug}/${venueSlug}-card.webp`;
    assertLocalImage(venueCardPath);
    return venueCardPath;
  }
  
  // Tertiary: Try cuisine-based fallback using new tile resolver
  if (venue.cuisines && venue.cuisines[0]) {
    const cuisineSlug = venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    return resolveTileImage({ type: "cuisine", slug: cuisineSlug });
  }
  
  // Quaternary: Try area-based fallback using new tile resolver
  const areaName = venue.area || venue.borough;
  if (areaName) {
    const areaSlug = areaName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return resolveTileImage({ type: "area", slug: areaSlug });
  }
  
  // Final fallback
  const defaultCardPath = "/images/heroes/site/default-card.webp";
  assertLocalImage(defaultCardPath);
  return defaultCardPath;
}

// Helper functions for area and cuisine images
export function resolveAreaImage(areaSlug: string): string {
  const path = areaImageMap[areaSlug] || "/images/heroes/site/default-area.webp";
  assertLocalImage(path);
  return path;
}

export function resolveCuisineImage(cuisineSlug: string): string {
  const path = cuisineImageMap[cuisineSlug] || "/images/heroes/site/default-cuisine.webp";
  assertLocalImage(path);
  return path;
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
  return path;
}
