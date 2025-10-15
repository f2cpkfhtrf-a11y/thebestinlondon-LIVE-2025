// SLUG GENERATION & VENUE UTILITIES
// Generates URL-safe slugs for venue detail pages

export function generateSlug(name, postcode = '') {
  if (!name) return 'unknown';
  
  // Start with name
  let slug = name
    .toLowerCase()
    .trim()
    // Remove special characters but keep spaces and hyphens
    .replace(/[^\w\s-]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Replace multiple hyphens with single hyphen
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
  
  // Add postcode if provided for uniqueness
  if (postcode) {
    const cleanPostcode = postcode
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^\w]/g, '');
    
    if (cleanPostcode) {
      slug = `${slug}-${cleanPostcode}`;
    }
  }
  
  return slug || 'venue';
}

export function ensureUniqueSlug(slug, existingSlugs = []) {
  let uniqueSlug = slug;
  let counter = 1;
  
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

export function getSlugFromVenue(venue) {
  if (venue.slug) return venue.slug;
  
  // Try to extract postcode from address
  let postcode = venue.postcode || '';
  if (!postcode && venue.vicinity) {
    // Try to extract postcode pattern (e.g., "SW1A 1AA")
    const postcodeMatch = venue.vicinity.match(/[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}/i);
    if (postcodeMatch) {
      postcode = postcodeMatch[0];
    }
  }
  
  return generateSlug(venue.name, postcode);
}

// Add slug to venue object (non-destructive)
export function addSlugToVenue(venue) {
  if (venue.slug) return venue;
  
  return {
    ...venue,
    slug: getSlugFromVenue(venue)
  };
}

// Process array of venues and add unique slugs
export function addSlugsToVenues(venues) {
  const slugs = [];
  
  return venues.map(venue => {
    const baseSlug = getSlugFromVenue(venue);
    const uniqueSlug = ensureUniqueSlug(baseSlug, slugs);
    slugs.push(uniqueSlug);
    
    return {
      ...venue,
      slug: uniqueSlug
    };
  });
}

// Example usage:
// const venues = addSlugsToVenues(rawVenues);
// const venueUrl = `/restaurant/${venue.slug}`;
