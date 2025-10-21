/**
 * Fetch photo reference from Google Places API for venues without photo data
 * This allows us to get real restaurant images even if not in our data
 */

export async function fetchPhotoFromPlaceId(placeId: string): Promise<string | null> {
  // Skip seed place_ids - they're not real Google Places
  if (!placeId || placeId.startsWith('seed-')) {
    return null;
  }

  const apiKey = 
    (typeof process !== 'undefined' && process.env) ? (
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      process.env.GOOGLE_PLACES_API_KEY ||
      process.env.GOOGLE_MAPS_API_KEY
    ) : null;

  if (!apiKey) {
    return null;
  }

  try {
    // Fetch place details to get photos
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.result?.photos && data.result.photos.length > 0) {
      const photoRef = data.result.photos[0].photo_reference;
      if (photoRef) {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${apiKey}`;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch Google Place photo:', error);
  }

  return null;
}

