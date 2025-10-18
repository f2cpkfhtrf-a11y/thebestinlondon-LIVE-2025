// Data fetching utility with caching and ISR support
export async function fetchVenuesData() {
  try {
    // Fetch from the public JSON file via HTTP
    const response = await fetch('/venues.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return Array.isArray(data) ? data : (data.venues || []);
  } catch (error) {
    console.error('Error fetching venues data:', error);
    return [];
  }
}

// Venue filtering utilities
export function filterVenuesByCuisine(venues, cuisine) {
  if (!cuisine || cuisine === 'all') return venues;
  
  return venues.filter(venue => 
    venue.cuisines && 
    venue.cuisines.some(c => 
      c.toLowerCase().includes(cuisine.toLowerCase())
    )
  );
}

export function filterVenuesByDietary(venues, dietaryTag) {
  if (!dietaryTag || dietaryTag === 'all') return venues;
  
  return venues.filter(venue => 
    venue.dietary_tags && 
    venue.dietary_tags[dietaryTag] === true
  );
}

export function filterVenuesByArea(venues, area) {
  if (!area || area === 'all') return venues;
  
  return venues.filter(venue => 
    venue.borough && 
    venue.borough.toLowerCase().includes(area.toLowerCase())
  );
}

export function sortVenues(venues, sortBy) {
  const sorted = [...venues];
  
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'reviews':
      return sorted.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
    case 'name':
      return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    case 'price':
      return sorted.sort((a, b) => (a.price_level || 0) - (b.price_level || 0));
    default:
      return sorted;
  }
}

// Get unique values for filters
export function getUniqueCuisines(venues) {
  const cuisines = new Set();
  venues.forEach(venue => {
    if (venue.cuisines) {
      venue.cuisines.forEach(cuisine => cuisines.add(cuisine));
    }
  });
  return Array.from(cuisines).sort();
}

export function getUniqueAreas(venues) {
  const areas = new Set();
  venues.forEach(venue => {
    if (venue.borough) {
      areas.add(venue.borough);
    }
  });
  return Array.from(areas).sort();
}

export function getDietaryTags(venues) {
  const tags = new Set();
  venues.forEach(venue => {
    if (venue.dietary_tags) {
      Object.keys(venue.dietary_tags).forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

// Calculate venue statistics
export function calculateVenueStats(venues) {
  const stats = {
    total: venues.length,
    averageRating: 0,
    totalReviews: 0,
    cuisineCount: 0,
    areaCount: 0,
    dietaryCount: 0
  };
  
  if (venues.length === 0) return stats;
  
  // Calculate averages
  const totalRating = venues.reduce((sum, v) => sum + (v.rating || 0), 0);
  stats.averageRating = (totalRating / venues.length).toFixed(1);
  
  const totalReviews = venues.reduce((sum, v) => sum + (v.user_ratings_total || 0), 0);
  stats.totalReviews = totalReviews;
  
  // Count unique values
  const cuisines = new Set();
  const areas = new Set();
  const dietaryTags = new Set();
  
  venues.forEach(venue => {
    if (venue.cuisines) {
      venue.cuisines.forEach(c => cuisines.add(c));
    }
    if (venue.borough) {
      areas.add(venue.borough);
    }
    if (venue.dietary_tags) {
      Object.keys(venue.dietary_tags).forEach(tag => dietaryTags.add(tag));
    }
  });
  
  stats.cuisineCount = cuisines.size;
  stats.areaCount = areas.size;
  stats.dietaryCount = dietaryTags.size;
  
  return stats;
}
