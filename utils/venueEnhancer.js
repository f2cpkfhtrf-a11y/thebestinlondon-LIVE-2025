// VENUE DATA ENHANCEMENT
// Combines Google Places + FSA data with proper attributions

import { findFSARating } from './fsaClient';
import { generateSlug, ensureUniqueSlug } from './slugUtils';

/**
 * Enhance a single venue with FSA data and proper structure
 * @param {Object} googleVenue - Raw Google Places venue
 * @param {Object} options - Enhancement options
 * @returns {Promise<Object>} - Enhanced venue object
 */
export async function enhanceVenueData(googleVenue, options = {}) {
  const { fetchFSA = true, existingSlugs = [] } = options;
  
  try {
    // Base venue structure
    const enhanced = {
      // Core identifiers
      place_id: googleVenue.place_id,
      slug: googleVenue.slug || generateSlug(googleVenue.name, extractPostcode(googleVenue.formatted_address || googleVenue.vicinity)),
      name: googleVenue.name,
      
      // Google data
      rating: googleVenue.rating || null,
      user_ratings_total: googleVenue.user_ratings_total || 0,
      price_level: googleVenue.price_level || null,
      
      // Types and categories
      types: googleVenue.types || [],
      category: inferCategory(googleVenue),
      cuisines: inferCuisines(googleVenue),
      
      // Address
      address: {
        formatted: googleVenue.formatted_address || googleVenue.vicinity || '',
        postcode: extractPostcode(googleVenue.formatted_address || googleVenue.vicinity),
        borough: inferBorough(googleVenue.formatted_address || googleVenue.vicinity),
        lat: googleVenue.geometry?.location?.lat || null,
        lng: googleVenue.geometry?.location?.lng || null
      },
      
      // Contact
      phone: googleVenue.formatted_phone_number || googleVenue.international_phone_number || null,
      website: googleVenue.website || null,
      
      // Hours
      opening_hours: googleVenue.opening_hours ? {
        periods: googleVenue.opening_hours.periods || [],
        weekday_text: googleVenue.opening_hours.weekday_text || [],
        open_now: googleVenue.opening_hours.open_now || null
      } : null,
      
      // Images with attributions
      images: formatImages(googleVenue.photos || []),
      
      // Dietary tags
      dietaryTags: inferDietaryTags(googleVenue),
      
      // Verification timestamps
      lastVerifiedGoogle: new Date().toISOString(),
      lastVerifiedFSA: null,
      
      // FSA data (to be populated)
      fsaRating: null,
      fsaRatingText: null,
      fsaAuthority: null,
      fsaUrl: null,
      
      // Metadata
      createdAt: googleVenue.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Ensure unique slug
    if (existingSlugs.length > 0) {
      enhanced.slug = ensureUniqueSlug(enhanced.slug, existingSlugs);
    }
    
    // Fetch FSA data if enabled
    if (fetchFSA && enhanced.address.postcode) {
      try {
        const fsaData = await findFSARating(
          enhanced.name,
          enhanced.address.postcode,
          enhanced.address.formatted
        );
        
        if (fsaData) {
          enhanced.fsaRating = fsaData.fsaRating;
          enhanced.fsaRatingText = fsaData.fsaRatingText;
          enhanced.fsaAuthority = fsaData.fsaAuthority;
          enhanced.fsaUrl = fsaData.fsaUrl;
          enhanced.lastVerifiedFSA = fsaData.lastVerifiedFSA;
        }
      } catch (error) {
        console.warn(`FSA lookup failed for ${enhanced.name}:`, error.message);
      }
    }
    
    return enhanced;
    
  } catch (error) {
    console.error('Venue enhancement error:', error);
    throw error;
  }
}

/**
 * Enhance multiple venues in batch
 */
export async function enhanceVenueBatch(googleVenues, options = {}) {
  const { fetchFSA = true, rateLimit = 150 } = options;
  
  const enhanced = [];
  const slugs = [];
  
  for (const venue of googleVenues) {
    try {
      const enhancedVenue = await enhanceVenueData(venue, { 
        fetchFSA, 
        existingSlugs: slugs 
      });
      
      enhanced.push(enhancedVenue);
      slugs.push(enhancedVenue.slug);
      
      // Rate limiting for FSA API
      if (fetchFSA) {
        await new Promise(resolve => setTimeout(resolve, rateLimit));
      }
      
    } catch (error) {
      console.error(`Failed to enhance ${venue.name}:`, error.message);
    }
  }
  
  return enhanced;
}

/**
 * Extract UK postcode from address
 */
function extractPostcode(address) {
  if (!address) return null;
  
  const postcodeRegex = /([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  
  return match ? `${match[1]} ${match[2]}`.toUpperCase() : null;
}

/**
 * Infer London borough from address
 */
function inferBorough(address) {
  if (!address) return 'Central London';
  
  const areas = {
    'Shoreditch': 'Hackney',
    'Hoxton': 'Hackney',
    'Bethnal Green': 'Tower Hamlets',
    'Whitechapel': 'Tower Hamlets',
    'Spitalfields': 'Tower Hamlets',
    'Camden': 'Camden',
    'Kings Cross': 'Camden',
    'Kentish Town': 'Camden',
    'Soho': 'Westminster',
    'Covent Garden': 'Westminster',
    'Mayfair': 'Westminster',
    'Westminster': 'Westminster',
    'Brixton': 'Lambeth',
    'Clapham': 'Lambeth',
    'Islington': 'Islington',
    'Angel': 'Islington',
    'Hackney': 'Hackney',
    'Dalston': 'Hackney',
    'Notting Hill': 'Kensington and Chelsea',
    'Chelsea': 'Kensington and Chelsea',
    'Kensington': 'Kensington and Chelsea',
    'Borough': 'Southwark',
    'Southwark': 'Southwark',
    'Canary Wharf': 'Tower Hamlets',
    'Greenwich': 'Greenwich',
    'Stratford': 'Newham'
  };
  
  for (const [area, borough] of Object.entries(areas)) {
    if (address.toLowerCase().includes(area.toLowerCase())) {
      return borough;
    }
  }
  
  return 'Central London';
}

/**
 * Infer category from Google types
 */
function inferCategory(venue) {
  const types = (venue.types || []).join(' ').toLowerCase();
  const name = (venue.name || '').toLowerCase();
  
  if (types.includes('bar') || types.includes('night_club')) return 'bar';
  if (types.includes('cafe') || types.includes('coffee')) return 'cafe';
  if (types.includes('bakery')) return 'bakery';
  if (name.includes('brunch') || name.includes('breakfast')) return 'brunch';
  
  return 'restaurant';
}

/**
 * Infer cuisines from Google data
 */
function inferCuisines(venue) {
  const types = (venue.types || []).join(' ').toLowerCase();
  const name = (venue.name || '').toLowerCase();
  const cuisines = [];
  
  const cuisineMap = {
    'indian': 'Indian',
    'italian': 'Italian',
    'japanese': 'Japanese',
    'chinese': 'Chinese',
    'thai': 'Thai',
    'turkish': 'Turkish',
    'french': 'French',
    'spanish': 'Spanish',
    'mexican': 'Mexican',
    'greek': 'Greek',
    'vietnamese': 'Vietnamese',
    'korean': 'Korean',
    'mediterranean': 'Mediterranean',
    'middle_eastern': 'Middle Eastern',
    'british': 'British',
    'american': 'American'
  };
  
  for (const [key, value] of Object.entries(cuisineMap)) {
    if (types.includes(key) || name.includes(key)) {
      cuisines.push(value);
    }
  }
  
  return cuisines.length > 0 ? cuisines : ['International'];
}

/**
 * Infer dietary tags
 */
function inferDietaryTags(venue) {
  const types = (venue.types || []).join(' ').toLowerCase();
  const name = (venue.name || '').toLowerCase();
  
  return {
    halal: types.includes('halal') || name.includes('halal'),
    vegan: types.includes('vegan') || name.includes('vegan'),
    vegetarian: types.includes('vegetarian') || name.includes('vegetarian'),
    glutenFree: types.includes('gluten') || name.includes('gluten free')
  };
}

/**
 * Format Google Photos with proper attributions
 */
function formatImages(photos) {
  if (!photos || photos.length === 0) return [];
  
  return photos.slice(0, 5).map(photo => ({
    photo_reference: photo.photo_reference,
    width: photo.width,
    height: photo.height,
    attributions: photo.html_attributions || [],
    imageCredit: extractCredit(photo.html_attributions),
    imageSourceUrl: null, // Will be populated when photo is fetched
    licenseType: 'GooglePlacePhoto',
    isIllustrative: false
  }));
}

/**
 * Extract photographer credit from Google attributions
 */
function extractCredit(attributions) {
  if (!attributions || attributions.length === 0) return 'Google Places User';
  
  // Parse HTML attribution to get name
  const firstAttr = attributions[0];
  const match = firstAttr.match(/>([^<]+)</);
  
  return match ? match[1] : 'Google Places User';
}

/**
 * Calculate data coverage statistics
 */
export function calculateDataCoverage(venues) {
  const total = venues.length;
  
  if (total === 0) {
    return {
      total: 0,
      coverage: {}
    };
  }
  
  return {
    total,
    coverage: {
      rating: (venues.filter(v => v.rating).length / total * 100).toFixed(1) + '%',
      reviewCount: (venues.filter(v => v.user_ratings_total > 0).length / total * 100).toFixed(1) + '%',
      priceLevel: (venues.filter(v => v.price_level).length / total * 100).toFixed(1) + '%',
      openingHours: (venues.filter(v => v.opening_hours).length / total * 100).toFixed(1) + '%',
      photos: (venues.filter(v => v.images && v.images.length > 0).length / total * 100).toFixed(1) + '%',
      fsaRating: (venues.filter(v => v.fsaRating !== null).length / total * 100).toFixed(1) + '%',
      website: (venues.filter(v => v.website).length / total * 100).toFixed(1) + '%',
      phone: (venues.filter(v => v.phone).length / total * 100).toFixed(1) + '%'
    }
  };
}

export default {
  enhanceVenueData,
  enhanceVenueBatch,
  calculateDataCoverage
};
