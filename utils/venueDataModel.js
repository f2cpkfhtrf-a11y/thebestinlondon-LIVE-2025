// ENHANCED VENUE DATA MODEL WITH TRUST & PROVENANCE
// Non-destructive addition to existing venueData.js

export const venueDataModel = {
  // Core identifiers
  id: String,
  place_id: String,
  slug: String,
  
  // NAP (Name, Address, Phone) - normalized
  name: String,
  address: {
    street: String,
    locality: String,
    postcode: String,
    borough: String, // Auto-derived from geocode
    area: String, // Display area (Shoreditch, Soho, etc.)
    formatted: String
  },
  phone: {
    raw: String,
    formatted: String, // +44 20 XXXX XXXX
    countryCode: String
  },
  
  // Geocoding
  location: {
    lat: Number,
    lng: Number,
    accuracy: String, // 'rooftop', 'approximate', etc.
    lastVerified: Date
  },
  
  // Trust signals with provenance
  ratings: {
    google: {
      rating: Number,
      reviews: Number,
      sourceUrl: String,
      lastUpdated: Date,
      verified: Boolean
    },
    tripadvisor: {
      rating: Number,
      reviews: Number,
      sourceUrl: String,
      lastUpdated: Date,
      verified: Boolean,
      attribution: "Reviews sourced from TripAdvisor" // Required by TripAdvisor
    },
    fsa: {
      rating: Number, // 0-5
      ratingDate: Date,
      inspectionDate: Date,
      sourceUrl: String, // Link to FSA API result
      lastUpdated: Date,
      businessName: String, // May differ from display name
      verified: Boolean
    }
  },
  
  // Image provenance
  images: [{
    url: String,
    width: Number,
    height: Number,
    aspectRatio: String, // '4:3', '16:9', etc.
    credit: String, // Photographer name or "Venue provided"
    sourceUrl: String, // Original source
    licenseType: String, // 'venue-provided', 'unsplash', 'pexels', 'licensed'
    isHero: Boolean,
    alt: String // Descriptive alt text
  }],
  
  // Moderation
  moderation: {
    status: String, // 'approved', 'pending', 'flagged'
    curatedBy: String,
    curatedDate: Date,
    lastReviewed: Date,
    issues: [{
      type: String, // 'closed', 'wrong-info', 'inappropriate', etc.
      reportedBy: String,
      reportedDate: Date,
      reason: String,
      status: String, // 'open', 'resolved', 'dismissed'
      resolvedDate: Date
    }]
  },
  
  // SEO
  seo: {
    title: String,
    description: String,
    canonicalUrl: String,
    indexable: Boolean,
    lastModified: Date
  }
};

// Data validation utilities
export const validateNAP = (venue) => {
  const issues = [];
  
  if (!venue.name || venue.name.length < 2) {
    issues.push('Invalid name');
  }
  
  if (!venue.address?.postcode || !/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(venue.address.postcode)) {
    issues.push('Invalid UK postcode');
  }
  
  if (venue.phone?.raw && !/^(\+44|0)/.test(venue.phone.raw)) {
    issues.push('Invalid UK phone number');
  }
  
  if (!venue.location?.lat || !venue.location?.lng) {
    issues.push('Missing geocode');
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
};

// Borough mapping from postcode
export const getBoroughFromPostcode = (postcode) => {
  const boroughMap = {
    'E1': 'Tower Hamlets',
    'E2': 'Tower Hamlets',
    'EC1': 'Islington',
    'EC2': 'City of London',
    'N1': 'Islington',
    'NW1': 'Camden',
    'SW1': 'Westminster',
    'SW3': 'Kensington and Chelsea',
    'W1': 'Westminster',
    'WC1': 'Camden',
    'WC2': 'Westminster',
    // Add all 32 boroughs + City of London
  };
  
  const prefix = postcode.substring(0, postcode.indexOf(' ') || 3).toUpperCase();
  return boroughMap[prefix] || 'London';
};

// Data freshness checker
export const isDataStale = (lastUpdated, maxAgeDays = 30) => {
  if (!lastUpdated) return true;
  const daysSinceUpdate = (Date.now() - new Date(lastUpdated)) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > maxAgeDays;
};

// Format last updated display
export const formatLastUpdated = (date) => {
  if (!date) return 'Not verified';
  const days = Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Updated today';
  if (days === 1) return 'Updated yesterday';
  if (days < 7) return `Updated ${days} days ago`;
  if (days < 30) return `Updated ${Math.floor(days / 7)} weeks ago`;
  return `Updated ${new Date(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
};
