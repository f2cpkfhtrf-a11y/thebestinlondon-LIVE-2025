// UK FOOD STANDARDS AGENCY API CLIENT
// Fetches hygiene ratings for UK food establishments
// API Docs: https://api.ratings.food.gov.uk/help

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';

/**
 * Normalize venue name for FSA matching
 * Removes common business suffixes and special characters
 */
function normalizeNameForMatching(name) {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .replace(/\s+(ltd|limited|plc|restaurant|cafe|bar|pub|kitchen|grill|bistro|brasserie|&|and)\s*$/gi, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalize UK postcode for matching
 */
function normalizePostcode(postcode) {
  if (!postcode) return '';
  return postcode
    .toUpperCase()
    .replace(/\s+/g, '')
    .trim();
}

/**
 * Search FSA establishments by name and postcode
 * @param {string} name - Venue name
 * @param {string} postcode - UK postcode
 * @returns {Promise<Array>} - Array of matching establishments
 */
export async function searchFSAEstablishments(name, postcode) {
  try {
    const normalizedName = normalizeNameForMatching(name);
    const normalizedPostcode = normalizePostcode(postcode);
    
    if (!normalizedName || !normalizedPostcode) {
      return [];
    }
    
    // Search by name and postcode
    const searchUrl = `${FSA_API_BASE}/Establishments?name=${encodeURIComponent(normalizedName)}&address=${encodeURIComponent(normalizedPostcode)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.warn(`FSA API error: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data.establishments || [];
    
  } catch (error) {
    console.error('FSA search error:', error.message);
    return [];
  }
}

/**
 * Get FSA rating details for a specific establishment
 * @param {string} fhrsid - FSA establishment ID
 * @returns {Promise<Object|null>} - Establishment details
 */
export async function getFSAEstablishment(fhrsid) {
  try {
    const response = await fetch(`${FSA_API_BASE}/Establishments/${fhrsid}`, {
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('FSA fetch error:', error.message);
    return null;
  }
}

/**
 * Find best FSA match for a venue
 * @param {string} name - Venue name
 * @param {string} postcode - UK postcode
 * @param {string} address - Full address for additional matching
 * @returns {Promise<Object|null>} - FSA rating data or null
 */
export async function findFSARating(name, postcode, address = '') {
  try {
    const establishments = await searchFSAEstablishments(name, postcode);
    
    if (!establishments || establishments.length === 0) {
      return null;
    }
    
    // If only one result, use it
    if (establishments.length === 1) {
      return formatFSAData(establishments[0]);
    }
    
    // If multiple results, try to find best match
    const normalizedName = normalizeNameForMatching(name);
    const bestMatch = establishments.find(est => {
      const estName = normalizeNameForMatching(est.BusinessName);
      return estName === normalizedName;
    });
    
    return formatFSAData(bestMatch || establishments[0]);
    
  } catch (error) {
    console.error('FSA rating lookup error:', error.message);
    return null;
  }
}

/**
 * Format FSA establishment data for our schema
 * @param {Object} establishment - Raw FSA establishment data
 * @returns {Object} - Formatted FSA data
 */
function formatFSAData(establishment) {
  if (!establishment) return null;
  
  const ratingValue = establishment.RatingValue;
  
  // Convert rating to numeric (some are "Exempt", "AwaitingInspection", etc.)
  let numericRating = null;
  let ratingText = ratingValue;
  
  if (ratingValue && !isNaN(parseInt(ratingValue))) {
    numericRating = parseInt(ratingValue);
  }
  
  return {
    fsaId: establishment.FHRSID,
    fsaRating: numericRating,
    fsaRatingText: ratingText,
    fsaRatingDate: establishment.RatingDate,
    fsaAuthority: establishment.LocalAuthorityName,
    fsaBusinessType: establishment.BusinessType,
    lastVerifiedFSA: new Date().toISOString(),
    fsaUrl: `https://ratings.food.gov.uk/business/${establishment.FHRSID}`,
    
    // Detailed scores (optional, for advanced display)
    scores: {
      hygiene: establishment.scores?.Hygiene,
      structural: establishment.scores?.Structural,
      confidence: establishment.scores?.ConfidenceInManagement
    },
    
    // Geocode from FSA (as backup)
    geocode: establishment.geocode ? {
      longitude: establishment.geocode.longitude,
      latitude: establishment.geocode.latitude
    } : null
  };
}

/**
 * Batch fetch FSA ratings for multiple venues
 * @param {Array} venues - Array of venue objects with name and postcode
 * @returns {Promise<Map>} - Map of place_id to FSA data
 */
export async function batchFetchFSARatings(venues) {
  const results = new Map();
  
  // Rate limiting: 10 requests per second max
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  for (const venue of venues) {
    if (!venue.place_id) continue;
    
    try {
      const postcode = extractPostcode(venue.address || venue.vicinity || venue.formatted_address);
      
      if (!postcode) {
        console.log(`No postcode for ${venue.name}, skipping FSA lookup`);
        continue;
      }
      
      const fsaData = await findFSARating(venue.name, postcode, venue.address);
      
      if (fsaData) {
        results.set(venue.place_id, fsaData);
        console.log(`✓ FSA rating found for ${venue.name}: ${fsaData.fsaRatingText}`);
      } else {
        console.log(`✗ No FSA rating for ${venue.name}`);
      }
      
      // Rate limiting delay
      await delay(150);
      
    } catch (error) {
      console.error(`Error fetching FSA for ${venue.name}:`, error.message);
    }
  }
  
  return results;
}

/**
 * Extract UK postcode from address string
 * @param {string} address - Full address
 * @returns {string|null} - Extracted postcode
 */
function extractPostcode(address) {
  if (!address) return null;
  
  // UK postcode pattern: SW1A 1AA, EC1A 1BB, etc.
  const postcodeRegex = /([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  
  if (match) {
    return `${match[1]}${match[2]}`.toUpperCase();
  }
  
  // Try simpler pattern (outward code only)
  const simpleRegex = /([A-Z]{1,2}\d{1,2}[A-Z]?)\s/i;
  const simpleMatch = address.match(simpleRegex);
  
  return simpleMatch ? simpleMatch[1].toUpperCase() : null;
}

export default {
  searchFSAEstablishments,
  getFSAEstablishment,
  findFSARating,
  batchFetchFSARatings
};
