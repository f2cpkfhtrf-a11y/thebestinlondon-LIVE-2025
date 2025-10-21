// Client-side image resolver - no fs access
// For server-side operations, use the scripts instead

/**
 * Helper to pick the first non-null path from a list
 */
function pickFirstValid(paths: (string | null | undefined)[]): string | null {
  for (const p of paths) {
    if (p && typeof p === 'string' && p.trim()) {
      return p;
    }
  }
  return null;
}

/**
 * Append version query parameter to image URL (only once)
 */
export function version(src: string): string {
  if (src.includes('?v=')) {
    return src;
  }
  const versionParam = process.env.NEXT_PUBLIC_ASSET_VERSION || '1';
  return `${src}?v=${versionParam}`;
}

/**
 * Normalize area slug for consistent lookups
 */
function normalizeArea(area: string): string {
  return area.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get primary cuisine slug from venue
 */
function getPrimaryCuisine(venue: any): string | null {
  if (venue.cuisines && Array.isArray(venue.cuisines) && venue.cuisines.length > 0) {
    return venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  if (venue.cuisine) {
    return venue.cuisine.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  return null;
}

/**
 * Get normalized area slug from venue
 */
function getNormalizedArea(venue: any): string | null {
  if (venue.area) {
    return normalizeArea(venue.area);
  }
  if (venue.borough) {
    return normalizeArea(venue.borough);
  }
  if (venue.areaSlug) {
    return venue.areaSlug;
  }
  return null;
}

/**
 * Resolve venue card image with comprehensive fallback chain
 * This is a client-side version that doesn't check file existence
 */
export function resolveVenueCard(venue: any): { src: string; reason: string } {
  const slug = venue.slug;
  const primaryCuisine = getPrimaryCuisine(venue);
  const normalizedArea = getNormalizedArea(venue);

  // Build fallback chain - PRIORITIZE VENUE DATA PATHS (they have the real images)
  const paths = [
    // FIRST: Use venue data paths (these have the correct, unique images)
    ...(venue.image_card_path && !venue.image_card_path.includes('/tiles/cuisines/') ? [venue.image_card_path] : []),
    ...(venue.image_hero_path && !venue.image_hero_path.includes('/tiles/cuisines/') ? [venue.image_hero_path] : []),
    
    // SECOND: Try actual restaurant-specific images (but these might be placeholders)
    `/images/restaurants/${slug}/hero.webp`,
    `/images/restaurants/${slug}/card.webp`,
    
    // THIRD: Local photos array
    ...(venue.photos_local || []),
    ...(venue.photos || []),
    ...(venue.google_photos_local || []),
    
    // FOURTH: Other venue-specific paths
    `/images/venues/${slug}/card.webp`,
    `/images/venues/${slug}/hero.webp`,
    `/images/venues/${slug}/1.webp`,
    `/images/venues/${slug}/2.webp`,
    
    // FIFTH: Sourced paths
    `/images/sourced/${slug}/card.webp`,
    `/images/sourced/${slug}/hero.webp`,
    `/images/sourced/${slug}/1.webp`,
    `/images/sourced/${slug}/2.webp`,
    
    // SIXTH: Google photos
    `/images/google/${slug}/card.webp`,
    `/images/google/${slug}/hero.webp`,
    `/images/google/${slug}/1.webp`,
    `/images/google/${slug}/2.webp`,
  ];

  // LAST RESORT: Add cuisine tile if available
  if (primaryCuisine) {
    paths.push(`/images/tiles/cuisines/${primaryCuisine}.webp`);
  }

  // LAST RESORT: Add area tile if available
  if (normalizedArea) {
    paths.push(`/images/tiles/areas/${normalizedArea}.webp`);
  }

  // Final fallback
  paths.push('/images/heroes/site-default.webp');

  const resolvedPath = pickFirstValid(paths);
  
  if (!resolvedPath) {
    throw new Error(`No image found for venue ${slug}`);
  }

  // Determine reason for logging
  let reason = 'unknown';
  if (resolvedPath === venue.image_card_path) reason = 'venue.image_card_path';
  else if (resolvedPath === venue.image_hero_path) reason = 'venue.image_hero_path';
  else if (venue.photos_local?.includes(resolvedPath)) reason = 'venue.photos_local';
  else if (resolvedPath.includes(`/venues/${slug}/`)) reason = 'venue-specific';
  else if (resolvedPath.includes(`/sourced/${slug}/`)) reason = 'sourced';
  else if (resolvedPath.includes(`/google/${slug}/`)) reason = 'google';
  else if (resolvedPath.includes('/tiles/cuisines/')) reason = 'cuisine-tile';
  else if (resolvedPath.includes('/tiles/areas/')) reason = 'area-tile';
  else if (resolvedPath.includes('site-default')) reason = 'site-default';

  return {
    src: version(resolvedPath),
    reason
  };
}

/**
 * Resolve venue hero image with comprehensive fallback chain
 * This is a client-side version that doesn't check file existence
 */
export function resolveVenueHero(venue: any): { src: string; reason: string } {
  const slug = venue.slug;
  const primaryCuisine = getPrimaryCuisine(venue);
  const normalizedArea = getNormalizedArea(venue);

  // Build fallback chain - PRIORITIZE VENUE DATA PATHS (they have the real images)
  const paths = [
    // FIRST: Use venue data paths (these have the correct, unique images)
    ...(venue.image_hero_path && !venue.image_hero_path.includes('/tiles/cuisines/') ? [venue.image_hero_path] : []),
    ...(venue.image_card_path && !venue.image_card_path.includes('/tiles/cuisines/') ? [venue.image_card_path] : []),
    
    // SECOND: Try actual restaurant-specific images (but these might be placeholders)
    `/images/restaurants/${slug}/hero.webp`,
    `/images/restaurants/${slug}/card.webp`,
    
    // THIRD: Local photos array
    ...(venue.photos_local || []),
    ...(venue.photos || []),
    ...(venue.google_photos_local || []),
    
    // FOURTH: Other venue-specific paths (hero first)
    `/images/venues/${slug}/hero.webp`,
    `/images/venues/${slug}/card.webp`,
    `/images/venues/${slug}/1.webp`,
    `/images/venues/${slug}/2.webp`,
    
    // FIFTH: Sourced paths
    `/images/sourced/${slug}/hero.webp`,
    `/images/sourced/${slug}/card.webp`,
    `/images/sourced/${slug}/1.webp`,
    `/images/sourced/${slug}/2.webp`,
    
    // SIXTH: Google photos
    `/images/google/${slug}/hero.webp`,
    `/images/google/${slug}/card.webp`,
    `/images/google/${slug}/1.webp`,
    `/images/google/${slug}/2.webp`,
  ];

  // LAST RESORT: Add cuisine tile if available
  if (primaryCuisine) {
    paths.push(`/images/tiles/cuisines/${primaryCuisine}.webp`);
  }

  // LAST RESORT: Add area tile if available
  if (normalizedArea) {
    paths.push(`/images/tiles/areas/${normalizedArea}.webp`);
  }

  // Final fallback
  paths.push('/images/heroes/site-default.webp');

  const resolvedPath = pickFirstValid(paths);
  
  if (!resolvedPath) {
    throw new Error(`No image found for venue ${slug}`);
  }

  // Determine reason for logging
  let reason = 'unknown';
  if (resolvedPath === venue.image_hero_path) reason = 'venue.image_hero_path';
  else if (resolvedPath === venue.image_card_path) reason = 'venue.image_card_path';
  else if (venue.photos_local?.includes(resolvedPath)) reason = 'venue.photos_local';
  else if (resolvedPath.includes(`/venues/${slug}/`)) reason = 'venue-specific';
  else if (resolvedPath.includes(`/sourced/${slug}/`)) reason = 'sourced';
  else if (resolvedPath.includes(`/google/${slug}/`)) reason = 'google';
  else if (resolvedPath.includes('/tiles/cuisines/')) reason = 'cuisine-tile';
  else if (resolvedPath.includes('/tiles/areas/')) reason = 'area-tile';
  else if (resolvedPath.includes('site-default')) reason = 'site-default';

  return {
    src: version(resolvedPath),
    reason
  };
}

/**
 * Resolve blog tile image - client-side version that reads from pre-built mapping
 */
export function resolveBlogTile(slug: string): { src: string; reason: string } {
  // For client-side, we'll use a simple fallback since we can't read files
  // The blog:unique script should have already created the mapping
  
  // Try common blog image paths
  const blogSpecificPath = `/images/blog/${slug}.webp`;
  
  // For now, return the blog-specific path and let the browser handle 404s
  // The ImageWithFallback component will handle fallbacks
  return {
    src: version(blogSpecificPath),
    reason: 'blog-specific'
  };
}// Image fix deployed Tue Oct 21 22:28:31 BST 2025
