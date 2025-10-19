export function resolveHeroImage(ctx: {
  type: "home" | "list-cuisine" | "list-area" | "list-all" | "list-halal" | "search" | "venue";
  cuisineSlug?: string;
  areaSlug?: string;
  venue?: any;
}): { src: string; alt: string } {
  const { type, cuisineSlug, areaSlug, venue } = ctx;

  // Home page hero
  if (type === "home") {
    return {
      src: "/images/heroes/site/home-hero.webp",
      alt: "London's finest restaurants and dining scene"
    };
  }

  // Venue-specific hero
  if (type === "venue" && venue) {
    const venueName = venue.name || "Restaurant";
    const cuisine = venue.cuisines?.[0] || "restaurant";
    const area = venue.area || venue.borough || "London";
    
    return {
      src: venue.image_hero_path || venue.image_url || "/images/heroes/site/default-list-hero.webp",
      alt: `${venueName} — ${cuisine} restaurant in ${area}, London`
    };
  }

  // Cuisine page hero
  if (type === "list-cuisine" && cuisineSlug) {
    return {
      src: `/images/heroes/cuisines/${cuisineSlug}.webp`,
      alt: `${cuisineSlug} restaurants in London`
    };
  }

  // Area page hero
  if (type === "list-area" && areaSlug) {
    return {
      src: `/images/heroes/areas/${areaSlug}.webp`,
      alt: `Restaurants in ${areaSlug}, London`
    };
  }

  // Default fallback for any list page
  return {
    src: "/images/heroes/site/default-list-hero.webp",
    alt: "London restaurants and dining guide"
  };
}
