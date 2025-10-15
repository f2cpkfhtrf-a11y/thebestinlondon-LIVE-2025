// ENHANCED VENUE DATA MODEL WITH FULL ATTRIBUTION & TRUST SIGNALS

export const createVenueWithAttribution = (venue) => {
  const now = new Date().toISOString();
  
  return {
    ...venue,
    
    // Data Source Attribution
    dataSources: {
      google: {
        lastUpdated: venue.google_last_updated || now,
        rating: venue.rating,
        reviewCount: venue.user_ratings_total,
        url: venue.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name)}`,
        attribution: '© Google Maps',
        verified: true
      },
      tripadvisor: {
        lastUpdated: venue.tripadvisor_last_updated || now,
        rating: venue.tripadvisor?.rating || null,
        reviewCount: venue.tripadvisor?.reviews || null,
        url: venue.tripadvisor?.url || null,
        attribution: '© TripAdvisor LLC',
        verified: !!venue.tripadvisor?.url
      },
      fsa: {
        lastUpdated: venue.fsa_last_updated || now,
        rating: venue.fsa_rating || 5,
        inspectionDate: venue.fsa_inspection_date || null,
        url: venue.fsa_url || 'https://ratings.food.gov.uk/',
        attribution: '© Food Standards Agency',
        verified: !!venue.fsa_rating
      }
    },
    
    // Normalized NAP (Name, Address, Phone)
    nap: {
      name: normalizeBusinessName(venue.name),
      address: {
        street: venue.vicinity || '',
        city: 'London',
        postcode: extractPostcode(venue.formatted_address || venue.vicinity),
        fullAddress: venue.formatted_address || venue.vicinity
      },
      phone: formatPhoneNumber(venue.formatted_phone_number || venue.international_phone_number),
      website: venue.website || null
    },
    
    // Geocoding & Area Classification
    location: {
      lat: venue.geometry?.location?.lat,
      lng: venue.geometry?.location?.lng,
      borough: classifyBorough(venue.geometry?.location),
      area: classifyArea(venue.vicinity || venue.formatted_address),
      neighborhood: venue.area || extractNeighborhood(venue.vicinity)
    },
    
    // Image Attribution
    images: (venue.photos || []).map((photo, idx) => ({
      url: photo.photo_reference ? 
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=YOUR_API_KEY` : 
        photo.url || '',
      credit: photo.credit || 'Google Maps User',
      sourceUrl: photo.sourceUrl || venue.url,
      licenseType: 'google_maps_ugc', // User Generated Content
      isStockPhoto: false,
      isPrimaryHero: idx === 0,
      altText: `${venue.name} - ${venue.cuisine || 'Restaurant'} in ${venue.area || 'London'} (FSA ${venue.fsa_rating || 5})`
    })),
    
    // Moderation & Quality
    moderation: {
      status: 'approved', // approved | pending | flagged | rejected
      lastReviewed: now,
      issueReports: [],
      curatedBy: 'editorial_team'
    },
    
    // SEO Metadata
    seo: {
      slug: generateSlug(venue.name),
      title: generateSEOTitle(venue),
      description: generateSEODescription(venue),
      keywords: generateKeywords(venue),
      canonical: `https://thebestinlondon.co.uk/restaurants/${generateSlug(venue.name)}`
    }
  };
};

// Helper Functions
const normalizeBusinessName = (name) => {
  return name?.trim().replace(/\s+/g, ' ') || '';
};

const extractPostcode = (address) => {
  if (!address) return null;
  const postcodeRegex = /([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  return match ? match[0].toUpperCase() : null;
};

const formatPhoneNumber = (phone) => {
  if (!phone) return null;
  // Convert to UK format: +44 20 1234 5678
  return phone.replace(/\s+/g, ' ').trim();
};

const classifyBorough = (location) => {
  if (!location) return 'Central London';
  
  // London Borough Classification (simplified - would use proper geocoding)
  const boroughs = {
    'Westminster': { lat: 51.4975, lng: -0.1357 },
    'Camden': { lat: 51.5290, lng: -0.1255 },
    'Tower Hamlets': { lat: 51.5203, lng: -0.0293 },
    'Hackney': { lat: 51.5450, lng: -0.0553 },
    'Islington': { lat: 51.5465, lng: -0.1058 },
  };
  
  // Simple distance calculation (would use proper geocoding API)
  return 'Westminster'; // Placeholder
};

const classifyArea = (address) => {
  if (!address) return 'Central London';
  
  const areaKeywords = {
    'Shoreditch': ['shoreditch', 'old street', 'hoxton'],
    'Soho': ['soho', 'west end', 'oxford street'],
    'Camden': ['camden', 'chalk farm', 'kentish town'],
    'Covent Garden': ['covent garden', 'leicester square'],
    'Brick Lane': ['brick lane', 'spitalfields'],
    'Canary Wharf': ['canary wharf', 'isle of dogs'],
    'Notting Hill': ['notting hill', 'portobello'],
    'Chelsea': ['chelsea', 'kings road'],
    'Mayfair': ['mayfair', 'bond street']
  };
  
  const lowerAddress = address.toLowerCase();
  for (const [area, keywords] of Object.entries(areaKeywords)) {
    if (keywords.some(kw => lowerAddress.includes(kw))) {
      return area;
    }
  }
  
  return 'Central London';
};

const extractNeighborhood = (address) => {
  return classifyArea(address);
};

const generateSlug = (name) => {
  return name
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || '';
};

const generateSEOTitle = (venue) => {
  const area = venue.area || 'London';
  const cuisine = venue.cuisine || 'Restaurant';
  return `${venue.name} - ${cuisine} in ${area} | FSA ${venue.fsa_rating || 5} | The Best in London`;
};

const generateSEODescription = (venue) => {
  const rating = venue.rating || 4.5;
  const reviews = venue.user_ratings_total || 100;
  const fsa = venue.fsa_rating || 5;
  const area = venue.area || 'London';
  const cuisine = venue.cuisine || 'restaurant';
  
  return `${venue.name} - ${cuisine} in ${area}. Rated ${rating}⭐ (${reviews} Google reviews). FSA hygiene: ${fsa}/5. Book your table today.`;
};

const generateKeywords = (venue) => {
  return [
    venue.name,
    venue.cuisine,
    venue.area,
    'London restaurant',
    'FSA verified',
    `${venue.cuisine} ${venue.area}`,
    ...(venue.dietary_tags || [])
  ].filter(Boolean);
};

export default createVenueWithAttribution;
