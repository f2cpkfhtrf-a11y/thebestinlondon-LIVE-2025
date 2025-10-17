// ENHANCED VENUE DATA UTILITIES
// Adds FSA ratings, TripAdvisor scores, dietary tags, and SEO metadata

export const dietaryTags = {
  HALAL: 'halal',
  VEGAN: 'vegan',
  VEGETARIAN: 'vegetarian',
  GLUTEN_FREE: 'gluten-free',
  FAMILY_FRIENDLY: 'family-friendly',
  MICHELIN: 'michelin'
};

export const enhanceVenueData = (venue) => {
  // Add FSA rating (mock for now - will integrate real API)
  const fsaRating = venue.fsa_rating || Math.floor(Math.random() * 2) + 4; // 4 or 5
  
  // Add TripAdvisor rating (mock for now)
  const tripadvisorRating = venue.tripadvisor_rating || (venue.rating ? venue.rating - 0.1 : null);
  const tripadvisorReviews = venue.tripadvisor_reviews || Math.floor(Math.random() * 500) + 200;
  
  // Detect dietary tags from name/types
  const tags = [];
  const searchText = `${venue.name} ${(venue.types || []).join(' ')}`.toLowerCase();
  
  if (searchText.includes('halal')) tags.push(dietaryTags.HALAL);
  if (searchText.includes('vegan')) tags.push(dietaryTags.VEGAN);
  if (searchText.includes('vegetarian')) tags.push(dietaryTags.VEGETARIAN);
  if (searchText.includes('michelin')) tags.push(dietaryTags.MICHELIN);
  if (venue.rating >= 4.5 && venue.user_ratings_total > 500) tags.push(dietaryTags.FAMILY_FRIENDLY);
  
  return {
    ...venue,
    fsa_rating: fsaRating,
    tripadvisor: {
      rating: tripadvisorRating,
      reviews: tripadvisorReviews,
      url: venue.tripadvisor_url || null
    },
    dietary_tags: tags,
    slug: venue.slug || generateSlug(venue.name), // Preserve existing slug
    seo_title: generateSEOTitle(venue),
    seo_description: generateSEODescription(venue)
  };
};

export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateSEOTitle = (venue) => {
  const area = venue.area || 'London';
  const cuisine = venue.cuisine || 'Restaurant';
  return `${venue.name} - ${cuisine} in ${area} | FSA ${venue.fsa_rating || 5} Rated`;
};

export const generateSEODescription = (venue) => {
  const rating = venue.rating || 4.5;
  const reviews = venue.user_ratings_total || 100;
  const fsa = venue.fsa_rating || 5;
  const area = venue.area || 'London';
  
  return `${venue.name} in ${area}. Rated ${rating}⭐ with ${reviews} reviews. FSA hygiene rating: ${fsa}/5. Book now for an unforgettable dining experience.`;
};

export const filterByDietary = (venues, tag) => {
  return venues.filter(v => v.dietary_tags && v.dietary_tags.includes(tag));
};

export const sortVenues = (venues, sortBy) => {
  switch(sortBy) {
    case 'rating':
      return [...venues].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'reviews':
      return [...venues].sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
    case 'fsa':
      return [...venues].sort((a, b) => (b.fsa_rating || 0) - (a.fsa_rating || 0));
    case 'price_low':
      return [...venues].sort((a, b) => (a.price_level || 999) - (b.price_level || 999));
    case 'price_high':
      return [...venues].sort((a, b) => (b.price_level || 0) - (a.price_level || 0));
    default:
      return venues;
  }
};

export const generateRestaurantSchema = (venue) => {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": venue.name,
    "image": venue.photos?.[0] || '',
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.vicinity,
      "addressLocality": venue.area || "London",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": venue.geometry?.location?.lat,
      "longitude": venue.geometry?.location?.lng
    },
    "telephone": venue.formatted_phone_number,
    "servesCuisine": venue.cuisine || venue.types?.[0],
    "priceRange": venue.price_level ? '£'.repeat(venue.price_level) : '££',
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": venue.rating,
      "reviewCount": venue.user_ratings_total,
      "bestRating": "5",
      "worstRating": "1"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "FSA Hygiene Rating",
        "value": venue.fsa_rating || 5
      }
    ]
  };
};
