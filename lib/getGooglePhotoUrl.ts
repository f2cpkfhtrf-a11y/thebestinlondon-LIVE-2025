/**
 * Generate Google Places Photo API URL from photo reference
 * This allows us to fetch actual restaurant images from Google
 */

export function getGooglePhotoUrl(
  photoReference: string | undefined,
  maxWidth: number = 800
): string | null {
  if (!photoReference) {
    return null;
  }

  // Try multiple environment variable names for Google API key
  const apiKey = 
    (typeof process !== 'undefined' && process.env) ? (
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      process.env.GOOGLE_PLACES_API_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      // Also check window for client-side access
      (typeof window !== 'undefined' && (window as any).__GOOGLE_API_KEY__)
    ) : null;

  if (!apiKey) {
    // No API key - return null to fall back to other images
    return null;
  }

  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
}

/**
 * Extract photo reference from venue data
 * Handles various data structures
 */
export function extractPhotoReference(venue: {
  photos?: any;
  photo_reference?: string;
  [key: string]: any;
}): string | null {
  // Direct photo_reference
  if (venue.photo_reference) {
    return venue.photo_reference;
  }

  // Photos array - get first photo reference
  if (venue.photos) {
    if (Array.isArray(venue.photos)) {
      // Array of photo objects
      const firstPhoto = venue.photos[0];
      if (firstPhoto) {
        // Could be object with photo_reference, reference, or string (reference itself)
        if (typeof firstPhoto === 'string') {
          return firstPhoto;
        }
        // Try multiple field names
        if (firstPhoto.photo_reference) {
          return firstPhoto.photo_reference;
        }
        if (firstPhoto.reference) {
          return firstPhoto.reference;
        }
        // Sometimes the URL itself contains the reference
        if (firstPhoto.url && typeof firstPhoto.url === 'string') {
          const match = firstPhoto.url.match(/photoreference=([^&]+)/);
          if (match) {
            return match[1];
          }
        }
      }
    } else if (typeof venue.photos === 'string') {
      // Single string reference
      return venue.photos;
    }
  }

  return null;
}

/**
 * Get Google photo URL for a venue
 */
export function getVenueGooglePhotoUrl(venue: {
  photos?: any;
  photo_reference?: string;
  [key: string]: any;
}, maxWidth: number = 800): string | null {
  const photoRef = extractPhotoReference(venue);
  if (!photoRef) {
    return null;
  }
  return getGooglePhotoUrl(photoRef, maxWidth);
}

