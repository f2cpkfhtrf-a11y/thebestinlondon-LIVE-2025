import { assertLocalImage } from './assertLocalImage';
import areaImageMap from '../data/areaImageMap';
import cuisineImageMap from '../data/cuisineImageMap';
import { logImageFallback } from './logImageIssue';

const base = "/images/heroes";
const fallbacks = {
  default: `${base}/site-default.webp`,
  halal: `${base}/halal/halal-hero.webp`,
  cuisines: `${base}/cuisines-default.webp`,
  areas: `${base}/areas-default.webp`,
  station: `${base}/station-default.webp`,
};

function safe(path?: string){ return path?.startsWith("/images/") ? path : undefined; }

export type HeroContext =
  | { type: "home" }
  | { type: "list-halal" }
  | { type: "list-cuisine"; cuisineSlug: string }
  | { type: "list-area"; areaSlug: string }
  | { type: "station"; stationSlug: string }
  | { type: "venue"; venue: any }
  | { type: "search" }
  | { type: "list-all" };

export function resolveHeroImage(ctx: HeroContext | {
  type: "home" | "list-cuisine" | "list-area" | "list-all" | "list-halal" | "search" | "venue" | "tile-area" | "tile-cuisine" | "halal" | "station";
  cuisineSlug?: string;
  areaSlug?: string;
  stationSlug?: string;
  venue?: any;
  scope?: "list" | "venue" | "guideSection";
}): { src: string; alt: string; srcMd?: string; srcLg?: string } {
  
  let imageSrc: string;
  
  // Handle the new simplified pattern with proper fallback chains
  if (ctx.type === "list-halal") {
    // Specific halal hero → halal generic → site default
    imageSrc = safe(`${base}/halal/halal.webp`) || 
               safe(`${base}/halal/halal-default.webp`) ||
               fallbacks.halal;
  } else if (ctx.type === "list-cuisine") {
    // Specific cuisine hero → cuisine generic → site default
    imageSrc = safe(`${base}/cuisines/${ctx.cuisineSlug}.webp`) || 
               safe(`${base}/cuisines/cuisine-generic.webp`) ||
               fallbacks.cuisines ||
               fallbacks.default;
  } else if (ctx.type === "list-area") {
    // Specific area hero → area generic → site default
    imageSrc = safe(`${base}/areas/${ctx.areaSlug}.webp`) || 
               safe(`${base}/areas/area-generic.webp`) ||
               fallbacks.areas ||
               fallbacks.default;
  } else if (ctx.type === "station") {
    // Specific station hero → station generic → site default
    imageSrc = safe(`${base}/stations/${ctx.stationSlug}.webp`) || 
               safe(`${base}/stations/station-generic.webp`) ||
               fallbacks.station ||
               fallbacks.default;
  } else if (ctx.type === "home" || ctx.type === "search" || ctx.type === "list-all") {
    imageSrc = fallbacks.default;
  } else if (ctx.type === "venue") {
    const v = ctx.venue;
    // Venue-specific → cuisine → area → halal (if applicable) → site default
    const isHalalVenue = v?.halal_verified || v?.dietary_tags?.halal;
    imageSrc = safe(v.image_hero_path)
        || (v.cuisine_slug && safe(`${base}/cuisines/${v.cuisine_slug}.webp`))
        || (v.area_slug && safe(`${base}/areas/${v.area_slug}.webp`))
        || (isHalalVenue && fallbacks.halal)
        || (v.cuisine_slug && fallbacks.cuisines)
        || (v.area_slug && fallbacks.areas)
        || fallbacks.default;
  } else {
    // Handle legacy types and other cases for backward compatibility
    if (ctx.type === "tile-area" && ctx.areaSlug) {
      imageSrc = areaImageMap[ctx.areaSlug] || "/images/heroes/site/default-area.webp";
      if (!areaImageMap[ctx.areaSlug]) {
        logImageFallback('area-tile', 3, {
          originalPath: `/images/areas/${ctx.areaSlug}-hero.webp`,
          fallbackPath: imageSrc,
          reason: 'Area not found in areaImageMap'
        });
      }
    } else if (ctx.type === "tile-cuisine" && ctx.cuisineSlug) {
      imageSrc = cuisineImageMap[ctx.cuisineSlug] || "/images/heroes/site/default-cuisine.webp";
      if (!cuisineImageMap[ctx.cuisineSlug]) {
        logImageFallback('cuisine-tile', 3, {
          originalPath: `/images/cuisines/${ctx.cuisineSlug}-hero.webp`,
          fallbackPath: imageSrc,
          reason: 'Cuisine not found in cuisineImageMap'
        });
      }
    } else if (ctx.type === "halal") {
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
    } else {
      // Default fallback for all other cases
      imageSrc = fallbacks.default;
    }
  }

  // Assert local-only for development
  assertLocalImage(imageSrc);

  // Generate responsive variants if they exist (don't create files, just check naming pattern)
  const basePath = imageSrc.replace(/\.webp$/, '');
  const srcMd = imageSrc; // For now, just use the main src as md variant
  const srcLg = basePath.includes('-hero') ? imageSrc.replace('-hero.webp', '-hero-xl.webp') : imageSrc;

  // Generate appropriate alt text based on context type
  let altText = "The Best in London";
  if (ctx.type === "list-cuisine" && 'cuisineSlug' in ctx) {
    altText = `Hero image for ${ctx.cuisineSlug} restaurants in London`;
  } else if (ctx.type === "list-area" && 'areaSlug' in ctx) {
    altText = `Hero image for ${ctx.areaSlug} dining in London`;
  } else if (ctx.type === "station" && 'stationSlug' in ctx) {
    altText = `Hero image for restaurants near ${ctx.stationSlug} Station`;
  } else if (ctx.type === "venue" && 'venue' in ctx) {
    altText = `Hero image for ${ctx.venue?.name || "Restaurant"} in London`;
  } else if (ctx.type === "list-halal") {
    altText = "Hero image for best halal restaurants in London";
  } else if (ctx.type === "home") {
    altText = "Hero image for London's finest restaurants";
  } else if (ctx.type === "search") {
    altText = "Hero image for restaurant search in London";
  }

  const result: { src: string; alt: string; srcMd?: string; srcLg?: string } = {
    src: imageSrc,
    alt: altText,
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

export function resolveCardImageSync(opts: { 
  venue?: Venue; 
  cuisineSlug?: string; 
  areaSlug?: string;
  type?: "tile-area" | "tile-cuisine";
}): string {
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

export async function resolveCardImage(opts: { 
  venue?: Venue; 
  cuisineSlug?: string; 
  areaSlug?: string;
  type?: "tile-area" | "tile-cuisine";
}): Promise<string> {
  return resolveCardImageSync(opts);
}

// Helper functions for area and cuisine images
export function resolveAreaImage(areaSlug: string): string {
  const path = areaImageMap[areaSlug] || "/images/heroes/site/default-area.webp";
  assertLocalImage(path);
  return path;
}

export function resolveCuisineImage(cuisineSlug: string): string {
  // Fallback chain for cuisine tiles: cuisine-specific → cuisine hero → site default
  const path = cuisineImageMap[cuisineSlug] || 
               safe(`/images/cuisines/${cuisineSlug}-tile.webp`) ||
               safe(`/images/heroes/cuisines/${cuisineSlug}.webp`) ||
               safe(`/images/cuisines/${cuisineSlug}-hero.webp`) ||
               fallbacks.cuisines ||
               "/images/heroes/site/default-cuisine.webp";
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
