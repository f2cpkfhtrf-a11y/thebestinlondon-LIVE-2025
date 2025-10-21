/**
 * SIMPLE & BULLETPROOF IMAGE SYSTEM
 * Direct URLs, no complex logic, just works
 */

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY || '';

/**
 * Get real Google photo URL
 */
export function getGooglePlacePhotoUrl(photoReference, maxWidth = 800) {
  if (!photoReference || !GOOGLE_PLACES_API_KEY) {
    return null;
  }
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
}

/**
 * DIRECT HIGH-QUALITY FOOD IMAGES
 * Simple array, no complex category logic
 */
// Local food images instead of Unsplash
const FOOD_IMAGES = [
  '/images/heroes/site/default-card.webp',
  '/images/tiles/cuisines/default.webp',
  '/images/heroes/site/default-list-hero.webp',
];

/**
 * MAIN FUNCTION - Keep it simple!
 */
export function getVenueImage(venue) {
  // Try Google photo first
  if (GOOGLE_PLACES_API_KEY && venue.photos && venue.photos[0]) {
    const photoRef = venue.photos[0].photo_reference;
    if (photoRef) {
      return {
        url: getGooglePlacePhotoUrl(photoRef, 800),
        alt: venue.name || 'Restaurant',
        type: 'google'
      };
    }
  }
  
  // Simple fallback - hash to consistent image
  const name = venue.name || 'Restaurant';
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % FOOD_IMAGES.length;
  
  return {
    url: FOOD_IMAGES[index],
    alt: name,
    type: 'unsplash'
  };
}
