// Station dataset for Halal near stations feature
// Zone 1-2 + key hubs with exact coordinates

export const LONDON_STATIONS = [
  // Zone 1 - Central
  { slug: 'oxford-circus', name: 'Oxford Circus', lines: ['Central', 'Victoria', 'Bakerloo'], lat: 51.5152, lng: -0.1419, borough: 'Westminster' },
  { slug: 'tottenham-court-road', name: 'Tottenham Court Road', lines: ['Central', 'Northern'], lat: 51.5165, lng: -0.1308, borough: 'Camden' },
  { slug: 'piccadilly-circus', name: 'Piccadilly Circus', lines: ['Piccadilly', 'Bakerloo'], lat: 51.5098, lng: -0.1342, borough: 'Westminster' },
  { slug: 'leicester-square', name: 'Leicester Square', lines: ['Northern', 'Piccadilly'], lat: 51.5113, lng: -0.1281, borough: 'Westminster' },
  { slug: 'covent-garden', name: 'Covent Garden', lines: ['Piccadilly'], lat: 51.5129, lng: -0.1243, borough: 'Westminster' },
  { slug: 'bond-street', name: 'Bond Street', lines: ['Central', 'Jubilee'], lat: 51.5142, lng: -0.1494, borough: 'Westminster' },
  { slug: 'green-park', name: 'Green Park', lines: ['Piccadilly', 'Victoria', 'Jubilee'], lat: 51.5067, lng: -0.1428, borough: 'Westminster' },
  { slug: 'bank', name: 'Bank', lines: ['Central', 'Northern', 'Waterloo & City', 'DLR'], lat: 51.5133, lng: -0.0886, borough: 'City of London' },
  
  // Major Stations
  { slug: 'liverpool-street', name: 'Liverpool Street', lines: ['Central', 'Circle', 'Metropolitan', 'Hammersmith & City', 'Elizabeth'], lat: 51.5179, lng: -0.0813, borough: 'City of London' },
  { slug: 'london-bridge', name: 'London Bridge', lines: ['Northern', 'Jubilee'], lat: 51.5048, lng: -0.0863, borough: 'Southwark' },
  { slug: 'waterloo', name: 'Waterloo', lines: ['Northern', 'Bakerloo', 'Jubilee', 'Waterloo & City'], lat: 51.5031, lng: -0.1132, borough: 'Lambeth' },
  { slug: 'victoria', name: 'Victoria', lines: ['Victoria', 'District', 'Circle'], lat: 51.4952, lng: -0.1441, borough: 'Westminster' },
  { slug: 'kings-cross', name: "King's Cross St Pancras", lines: ['Northern', 'Piccadilly', 'Victoria', 'Circle', 'Metropolitan', 'Hammersmith & City'], lat: 51.5308, lng: -0.1238, borough: 'Camden' },
  { slug: 'paddington', name: 'Paddington', lines: ['Circle', 'District', 'Hammersmith & City', 'Bakerloo', 'Elizabeth'], lat: 51.5154, lng: -0.1755, borough: 'Westminster' },
  { slug: 'euston', name: 'Euston', lines: ['Northern', 'Victoria'], lat: 51.5282, lng: -0.1337, borough: 'Camden' },
  
  // Zone 2 & Key Areas
  { slug: 'canary-wharf', name: 'Canary Wharf', lines: ['Jubilee', 'DLR', 'Elizabeth'], lat: 51.5054, lng: -0.0193, borough: 'Tower Hamlets' },
  { slug: 'stratford', name: 'Stratford', lines: ['Central', 'Jubilee', 'DLR', 'Elizabeth'], lat: 51.5416, lng: -0.0042, borough: 'Newham' },
  { slug: 'notting-hill-gate', name: 'Notting Hill Gate', lines: ['Central', 'Circle', 'District'], lat: 51.5094, lng: -0.1967, borough: 'Kensington and Chelsea' },
  { slug: 'south-kensington', name: 'South Kensington', lines: ['District', 'Circle', 'Piccadilly'], lat: 51.4941, lng: -0.1738, borough: 'Kensington and Chelsea' },
  { slug: 'shepherds-bush', name: "Shepherd's Bush", lines: ['Central'], lat: 51.5045, lng: -0.2182, borough: 'Hammersmith and Fulham' },
  { slug: 'whitechapel', name: 'Whitechapel', lines: ['District', 'Hammersmith & City', 'Elizabeth'], lat: 51.5196, lng: -0.0632, borough: 'Tower Hamlets' },
  { slug: 'baker-street', name: 'Baker Street', lines: ['Bakerloo', 'Circle', 'Hammersmith & City', 'Jubilee', 'Metropolitan'], lat: 51.5224, lng: -0.1566, borough: 'Westminster' },
  { slug: 'angel', name: 'Angel', lines: ['Northern'], lat: 51.5322, lng: -0.1058, borough: 'Islington' },
  { slug: 'old-street', name: 'Old Street', lines: ['Northern'], lat: 51.5259, lng: -0.0876, borough: 'Islington' },
  { slug: 'shoreditch-high-street', name: 'Shoreditch High Street', lines: ['Overground'], lat: 51.5244, lng: -0.0751, borough: 'Tower Hamlets' },
  { slug: 'aldgate-east', name: 'Aldgate East', lines: ['District', 'Hammersmith & City'], lat: 51.5154, lng: -0.0726, borough: 'Tower Hamlets' }
];

// Haversine distance calculation (km)
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Calculate "Best of London" score
// Weighting: Google rating 60%, review quality 20%, FSA 20% (if available)
export function calculateBestOfLondonScore(venue) {
  let score = 0;
  let weights = { rating: 0, reviews: 0, fsa: 0 };
  
  // Google rating component (60%)
  if (venue.rating) {
    score += (venue.rating / 5) * 0.6 * 5;
    weights.rating = 0.6;
  }
  
  // Review quality component (20%)
  // More reviews = higher quality signal
  if (venue.user_ratings_total) {
    const reviewScore = Math.min(venue.user_ratings_total / 1000, 1); // Cap at 1000 reviews = max score
    score += reviewScore * 0.2 * 5;
    weights.reviews = 0.2;
  }
  
  // FSA component (20% if available, otherwise redistribute to rating)
  if (venue.fsa_rating && venue.fsa_rating > 0) {
    score += (venue.fsa_rating / 5) * 0.2 * 5;
    weights.fsa = 0.2;
  } else if (venue.rating) {
    // No FSA: give rating component full 80%
    const totalWeight = weights.rating + weights.reviews;
    if (totalWeight > 0) {
      score = (score / totalWeight) * 0.8;
      if (venue.rating) score += (venue.rating / 5) * 0.2 * 5;
    }
  }
  
  return Math.min(score, 5).toFixed(1);
}

// Detect halal venues (strict + fuzzy)
export function isHalalVenue(venue, mode = 'all') {
  const strict = venue.dietary_tags?.halal === true ||
                 venue.name?.toLowerCase().includes('halal') ||
                 venue.description?.toLowerCase().includes('halal') ||
                 (venue.types || []).some(t => t.toLowerCase().includes('halal'));
  
  if (mode === 'strict') return { isHalal: strict, type: 'verified' };
  
  // Fuzzy match for cuisines commonly halal
  const halalCuisines = ['middle eastern', 'turkish', 'pakistani', 'bangladeshi', 'indonesian', 'malaysian', 'afghan', 'lebanese', 'moroccan', 'iranian', 'persian'];
  const cuisineMatch = (venue.cuisines || []).some(c => 
    halalCuisines.some(hc => c.toLowerCase().includes(hc))
  );
  
  // Exclude non-halal signals
  const excludeTerms = ['pork', 'bacon', 'ham', 'charcuterie', 'prosciutto'];
  const hasExclusion = excludeTerms.some(term => 
    venue.description?.toLowerCase().includes(term) ||
    venue.name?.toLowerCase().includes(term)
  );
  
  const communityVerified = cuisineMatch && !hasExclusion && !strict;
  
  if (strict) return { isHalal: true, type: 'verified' };
  if (communityVerified) return { isHalal: true, type: 'community' };
  return { isHalal: false, type: null };
}

// Get venues near station
export function getVenuesNearStation(station, allVenues, radiusKm = 0.6) {
  const venuesWithDistance = allVenues
    .map(v => {
      const halal = isHalalVenue(v);
      if (!halal.isHalal) return null;
      
      const distance = calculateDistance(station.lat, station.lng, v.lat, v.lng);
      if (distance > radiusKm) return null;
      
      return {
        ...v,
        distanceKm: Math.round(distance * 100) / 100, // 2 decimal places
        halalType: halal.type,
        bestOfLondonScore: calculateBestOfLondonScore(v)
      };
    })
    .filter(Boolean);
  
  // Sort by: 1) distance asc, 2) best score desc, 3) Google rating desc, 4) reviews desc
  return venuesWithDistance.sort((a, b) => {
    if (a.distanceKm !== b.distanceKm) return a.distanceKm - b.distanceKm;
    if (a.bestOfLondonScore !== b.bestOfLondonScore) return b.bestOfLondonScore - a.bestOfLondonScore;
    if ((a.rating || 0) !== (b.rating || 0)) return (b.rating || 0) - (a.rating || 0);
    return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
  });
}

// Find nearest stations to a venue
export function findNearestStations(venue, count = 3) {
  return LONDON_STATIONS
    .map(station => ({
      ...station,
      distance: calculateDistance(venue.lat, venue.lng, station.lat, station.lng)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}
