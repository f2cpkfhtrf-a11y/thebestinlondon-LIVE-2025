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
const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
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
