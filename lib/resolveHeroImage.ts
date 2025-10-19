import { assertLocalImage } from './assertLocalImage';

export function resolveHeroImage(ctx: {
  type: "home" | "list-cuisine" | "list-area" | "list-all" | "list-halal" | "search" | "venue";
  cuisineSlug?: string;
  areaSlug?: string;
  venue?: any;
}): { src: string; alt: string } {
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
  }
  // Area page hero
  else if (ctx.type === "list-area" && ctx.areaSlug) {
    imageSrc = `/images/heroes/areas/${ctx.areaSlug}.webp`;
  }
  // Halal restaurants page
  else if (ctx.type === "list-halal") {
    imageSrc = "/images/heroes/site/default-list-hero.webp";
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

  return {
    src: imageSrc,
    alt: `Hero image for ${ctx.cuisineSlug || ctx.areaSlug || ctx.venue?.name || "The Best in London"}`,
  };
}
