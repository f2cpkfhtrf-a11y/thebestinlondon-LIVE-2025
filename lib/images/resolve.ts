import { getPrimaryCuisine, getNormalizedArea } from './venueUtils';

// Cache busting helper
function appendVersion(url: string): string {
  const version = process.env.NEXT_PUBLIC_ASSET_VERSION || process.env.ASSET_VERSION || Date.now().toString();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${version}`;
}

// Reject generic tiles as primary images
function rejectGeneric(path: string): boolean {
  return path.includes('/images/tiles/cuisines/') || path.includes('/images/tiles/areas/');
}

// Check if path is under restaurants directory
function isRestaurantPath(path: string): boolean {
  return path.includes('/images/restaurants/');
}

// Pick first valid path from array
function pickFirstValid(paths: string[]): string | null {
  for (const path of paths) {
    if (path && !rejectGeneric(path)) {
      return path;
    }
  }
  return null;
}

export function resolveVenueCard(venue: any): { src: string; reason: string } {
  const slug = venue.slug;
  const primaryCuisine = getPrimaryCuisine(venue);
  const normalizedArea = getNormalizedArea(venue);

  // Build fallback chain - VENUE-FIRST, REJECT GENERIC AS PRIMARY
  const paths = [
    // FIRST: Venue-specific images
    `/images/restaurants/${slug}/card.webp`,
    `/images/restaurants/${slug}/hero.webp`,
    
    // SECOND: Use venue data paths ONLY if they're under /images/restaurants/** and NOT generic
    ...(venue.image_card_path && !rejectGeneric(venue.image_card_path) && isRestaurantPath(venue.image_card_path) ? [venue.image_card_path] : []),
    ...(venue.image_hero_path && !rejectGeneric(venue.image_hero_path) && isRestaurantPath(venue.image_hero_path) ? [venue.image_hero_path] : []),
    
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
  if (resolvedPath === venue.image_card_path) {
    reason = 'venue.image_card_path';
  } else if (resolvedPath === venue.image_hero_path) {
    reason = 'venue.image_hero_path';
  } else if (venue.photos_local?.includes(resolvedPath)) {
    reason = 'venue.photos_local';
  } else if (resolvedPath.includes(`/venues/${slug}/`)) {
    reason = 'venue-specific';
  } else if (resolvedPath.includes(`/sourced/${slug}/`)) {
    reason = 'sourced';
  } else if (resolvedPath.includes(`/google/${slug}/`)) {
    reason = 'google';
  } else if (resolvedPath.includes('/tiles/cuisines/')) {
    reason = 'cuisine-tile';
  } else if (resolvedPath.includes('/tiles/areas/')) {
    reason = 'area-tile';
  } else if (resolvedPath.includes('site-default')) {
    reason = 'site-default';
  }

  return {
    src: appendVersion(resolvedPath),
    reason
  };
}

export function resolveVenueHero(venue: any): { src: string; reason: string } {
  const slug = venue.slug;
  const primaryCuisine = getPrimaryCuisine(venue);
  const normalizedArea = getNormalizedArea(venue);

  // Build fallback chain - VENUE-FIRST, REJECT GENERIC AS PRIMARY
  const paths = [
    // FIRST: Venue-specific images
    `/images/restaurants/${slug}/hero.webp`,
    `/images/restaurants/${slug}/card.webp`,
    
    // SECOND: Use venue data paths ONLY if they're under /images/restaurants/** and NOT generic
    ...(venue.image_hero_path && !rejectGeneric(venue.image_hero_path) && isRestaurantPath(venue.image_hero_path) ? [venue.image_hero_path] : []),
    ...(venue.image_card_path && !rejectGeneric(venue.image_card_path) && isRestaurantPath(venue.image_card_path) ? [venue.image_card_path] : []),
    
    // THIRD: Local photos array
    ...(venue.photos_local || []),
    ...(venue.photos || []),
    ...(venue.google_photos_local || []),
    
    // FOURTH: Other venue-specific paths
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
  if (resolvedPath === venue.image_hero_path) {
    reason = 'venue.image_hero_path';
  } else if (resolvedPath === venue.image_card_path) {
    reason = 'venue.image_card_path';
  } else if (venue.photos_local?.includes(resolvedPath)) {
    reason = 'venue.photos_local';
  } else if (resolvedPath.includes(`/venues/${slug}/`)) {
    reason = 'venue-specific';
  } else if (resolvedPath.includes(`/sourced/${slug}/`)) {
    reason = 'sourced';
  } else if (resolvedPath.includes(`/google/${slug}/`)) {
    reason = 'google';
  } else if (resolvedPath.includes('/tiles/cuisines/')) {
    reason = 'cuisine-tile';
  } else if (resolvedPath.includes('/tiles/areas/')) {
    reason = 'area-tile';
  } else if (resolvedPath.includes('site-default')) {
    reason = 'site-default';
  }

  return {
    src: appendVersion(resolvedPath),
    reason
  };
}

export function resolveBlogTile(post: any): { src: string; reason: string } {
  // Try blog-specific mapping first
  const blogImageMap = require('../../data/blog-images.json');
  const mappedImage = blogImageMap[post.slug];
  
  if (mappedImage && !rejectGeneric(mappedImage)) {
    return {
      src: appendVersion(mappedImage),
      reason: 'blog-mapping'
    };
  }

  // Try post-specific local image
  const postImage = `/images/blog/${post.slug}.webp`;
  if (!rejectGeneric(postImage)) {
    return {
      src: appendVersion(postImage),
      reason: 'post-specific'
    };
  }

  // Final fallback
  const defaultImage = '/images/heroes/site-default.webp';
  return {
    src: appendVersion(defaultImage),
    reason: 'default'
  };
}
