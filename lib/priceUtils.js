/**
 * Price utilities for calculating price per head from Google price_level
 */

/**
 * Calculate estimated price per head based on Google price_level
 * Google price_level ranges: 0 (Free), 1 (£), 2 (££), 3 (£££), 4 (££££)
 * 
 * @param {number} priceLevel - Google price level (0-4)
 * @param {string} cuisine - Optional cuisine type for more accurate estimates
 * @returns {Object} - Object with min, max, average, and formatted string
 */
export function calculatePricePerHead(priceLevel, cuisine = null) {
  if (!priceLevel || priceLevel === 0) {
    return {
      min: 0,
      max: 15,
      average: 10,
      formatted: 'Free - £15',
      range: 'Budget-friendly'
    };
  }

  // Base ranges by price level
  const baseRanges = {
    1: { min: 10, max: 25, average: 18 },
    2: { min: 25, max: 50, average: 35 },
    3: { min: 50, max: 100, average: 70 },
    4: { min: 100, max: 200, average: 140 }
  };

  const base = baseRanges[priceLevel] || baseRanges[2];

  // Adjust based on cuisine if provided
  const cuisineMultipliers = {
    'fine dining': 1.3,
    'french': 1.2,
    'japanese': 1.15,
    'italian': 1.1,
    'indian': 0.9,
    'chinese': 0.85,
    'street food': 0.7
  };

  const multiplier = cuisine ? 
    (cuisineMultipliers[cuisine.toLowerCase()] || 1.0) : 1.0;

  const min = Math.round(base.min * multiplier);
  const max = Math.round(base.max * multiplier);
  const average = Math.round(base.average * multiplier);

  const ranges = {
    1: 'Budget-friendly',
    2: 'Moderate',
    3: 'Upscale',
    4: 'Fine Dining'
  };

  return {
    min,
    max,
    average,
    formatted: `£${min} - £${max} per person`,
    range: ranges[priceLevel] || 'Moderate'
  };
}

/**
 * Format price per head for display
 * 
 * @param {number} priceLevel - Google price level
 * @param {string} cuisine - Optional cuisine
 * @returns {string} - Formatted price string
 */
export function formatPricePerHead(priceLevel, cuisine = null) {
  const price = calculatePricePerHead(priceLevel, cuisine);
  return price.formatted;
}

