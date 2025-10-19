import { assertLocalImage } from './assertLocalImage';

export function resolveHeroImage(ctx: {
  type: "home" | "list-cuisine" | "list-area" | "list-all" | "list-halal" | "search" | "venue";
  cuisineSlug?: string;
  areaSlug?: string;
  venue?: any;
}): { src: string; alt: string } {
  const { type, cuisineSlug, areaSlug, venue } = ctx;

  let imageSrc: string;

  // Home page hero
  if (type === "home") {
    imageSrc = "/images/heroes/site/home-hero.webp";
  }
  // Venue-specific hero
  else if (type === "venue" && venue) {
    const venueName = venue.name || "Restaurant";
    const cuisine = venue.cuisines?.[0] || "restaurant";
    const area = venue.area || venue.borough || "London";
    
    // Prioritize local hero path, fallback to local default
    imageSrc = venue.image_hero_path?.replace('/public', '') || "/images/heroes/site/default-list-hero.webp";
    
    return {
      src: imageSrc,
      alt: `${venueName} — ${cuisine} restaurant in ${area}, London`
    };
  }
  // Cuisine page hero
  else if (type === "list-cuisine" && cuisineSlug) {
    imageSrc = `/images/heroes/cuisines/${cuisineSlug}.webp`;
  }
  // Area page hero
  else if (type === "list-area" && areaSlug) {
    imageSrc = `/images/heroes/areas/${areaSlug}.webp`;
  }
  // List pages (all restaurants, halal, search)
  else if (type === "list-all" || type === "list-halal" || type === "search") {
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
    alt: type === "home" ? "London's finest restaurants and dining scene" :
         type === "list-cuisine" ? `${cuisineSlug} restaurants in London` :
         type === "list-area" ? `Restaurants in ${areaSlug}, London` :
         "London restaurants and dining guide"
  };
}
