// UK FOOD STANDARDS AGENCY API CLIENT
// Fetches hygiene ratings for UK food establishments
// API Docs: https://api.ratings.food.gov.uk/help

const axios = require('axios');

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';

/**
 * Search FSA establishments by name and postcode
 * @param {string} name - Venue name
 * @param {string} postcode - UK postcode
 * @returns {Promise<Array>} - Array of matching establishments
 */
async function searchEstablishment(name, postcode) {
  try {
    const response = await axios.get(`${FSA_API_BASE}/Establishments`, {
      params: {
        name: name,
        address: postcode
      },
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json'
      },
      timeout: 10000
    });
    
    return response.data.establishments || [];
    
  } catch (error) {
    console.error(`FSA search error: ${error.message}`);
    return [];
  }
}

/**
 * Get FSA rating details for a specific establishment
 * @param {string} fhrsid - FSA establishment ID
 * @returns {Promise<Object|null>} - Establishment details
 */
async function getRatingByEstablishmentId(fhrsid) {
  try {
    const response = await axios.get(`${FSA_API_BASE}/Establishments/${fhrsid}`, {
      headers: {
        'x-api-version': '2',
        'Accept': 'application/json'
      },
      timeout: 10000
    });
    
    return response.data;
    
  } catch (error) {
    console.error(`FSA fetch error: ${error.message}`);
    return null;
  }
}

/**
 * Find best FSA match for a venue
 * @param {string} name - Venue name
 * @param {string} postcode - UK postcode
 * @returns {Promise<Object|null>} - FSA rating data or null
 */
async function findFSARating(name, postcode) {
  try {
    const establishments = await searchEstablishment(name, postcode);
    
    if (!establishments || establishments.length === 0) {
      return null;
    }
    
    // Get details for best match
    const bestMatch = establishments[0];
    const details = await getRatingByEstablishmentId(bestMatch.FHRSID);
    
    if (!details) return null;
    
    const ratingValue = details.RatingValue;
    let numericRating = null;
    
    if (ratingValue && !isNaN(parseInt(ratingValue))) {
      numericRating = parseInt(ratingValue);
    }
    
    return {
      fsaId: details.FHRSID,
      fsaRating: numericRating,
      fsaRatingText: ratingValue,
      fsaRatingDate: details.RatingDate,
      fsaAuthority: details.LocalAuthorityName,
      fsaBusinessType: details.BusinessType,
      lastVerifiedFSA: new Date().toISOString(),
      fsaUrl: `https://ratings.food.gov.uk/business/${details.FHRSID}`
    };
    
  } catch (error) {
    console.error('FSA rating lookup error:', error.message);
    return null;
  }
}

module.exports = {
  searchEstablishment,
  getRatingByEstablishmentId,
  findFSARating
};
