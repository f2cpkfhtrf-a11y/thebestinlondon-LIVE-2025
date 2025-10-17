import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import FSABadge from '../components/FSABadge';
import BestOfLondonBadge from '../components/BestOfLondonBadge';
import NearMeFeature from '../components/NearMeFeature';
import fs from 'fs';
import path from 'path';

export default function NearMePage({ venues }) {
  const [filteredVenues, setFilteredVenues] = useState(venues);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Haversine formula to calculate distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Format distance for display
  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  // Get walking time estimate
  const getWalkingTime = (distance) => {
    const walkingSpeed = 5; // km/h average walking speed
    const timeInHours = distance / walkingSpeed;
    const timeInMinutes = Math.round(timeInHours * 60);
    
    if (timeInMinutes < 1) return '< 1 min';
    if (timeInMinutes < 60) return `${timeInMinutes} min`;
    
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  return (
    <>
      <Head>
        <title>Restaurants Near Me | The Best in London</title>
        <meta name="description" content="Find the best restaurants near your location in London. Discover top-rated dining options within walking distance with real reviews and FSA ratings." />
        <link rel="canonical" href="https://thebestinlondon.co.uk/near-me" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Restaurants Near Me",
          "description": "Find the best restaurants near your location in London with distance and walking time information",
          "url": "https://thebestinlondon.co.uk/near-me"
        }) }} />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1800&h=1200&q=85&fit=crop"
            alt="London restaurants near you"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 mb-4">
                <span className="text-gold text-sm font-medium uppercase tracking-wide">
                  Location-Based Discovery
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4">
                Restaurants Near Me
              </h1>

              <h2 className="text-xl lg:text-2xl text-gold font-medium mb-4">
                Discover London's Best Dining Within Walking Distance
              </h2>

              <p className="text-lg text-warmWhite/90 max-w-2xl leading-relaxed">
                Find exceptional restaurants near your location with accurate distance calculations, 
                walking times, and verified reviews. Discover hidden gems in your neighborhood.
              </p>

              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-warmWhite/80 text-sm">GPS Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-warmWhite/80 text-sm">Walking Times</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-warmWhite/80 text-sm">Real Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Near Me Feature */}
      <NearMeFeature
        venues={venues}
        onFilteredVenues={setFilteredVenues}
      />

      {/* Main Content */}
      <main style={{ backgroundColor: theme.colors.bg.primary, minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Instructions */}
          <div className="bg-black-light rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-warmWhite mb-2">
                  How It Works
                </h3>
                <div className="space-y-2 text-sm text-grey">
                  <p>1. Click "Use My Location" to enable GPS-based restaurant discovery</p>
                  <p>2. Adjust the distance filter to find restaurants within your preferred range</p>
                  <p>3. View walking times and distances to each restaurant</p>
                  <p>4. Explore detailed reviews, ratings, and FSA hygiene scores</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-warmWhite">
              {filteredVenues.length} Restaurants Found
            </h2>
            <div className="text-sm text-grey">
              {filteredVenues.length === venues.length 
                ? 'All restaurants in London' 
                : 'Filtered by location'
              }
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => {
              // Calculate distance if user location is available
              let distance = null;
              let walkingTime = null;
              
              if (userLocation && venue.latitude && venue.longitude) {
                distance = calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  venue.latitude,
                  venue.longitude
                );
                walkingTime = getWalkingTime(distance);
              }

              return (
                <Link key={venue.id || index} href={`/restaurant/${venue.slug}`}>
                  <article className="group bg-black-light rounded-xl overflow-hidden hover:bg-black-light/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={venue.photos?.[0]?.url || 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85'}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay Badges */}
                      <div className="absolute top-3 right-3">
                        <BestOfLondonBadge venue={venue} size="small" showTooltip={false} showExplanation={false} />
                      </div>
                      <div className="absolute top-3 left-3">
                        <FSABadge rating={venue.fsa_rating || 5} size="small" showLabel={false} />
                      </div>

                      {/* Distance Badge */}
                      {distance && (
                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1">
                          <div className="text-white text-sm font-semibold">
                            {formatDistance(distance)}
                          </div>
                          <div className="text-grey text-xs">
                            {walkingTime} walk
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-warmWhite mb-2 group-hover:text-gold transition-colors duration-300">
                        {venue.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-gold text-lg">★</span>
                        <span className="text-warmWhite font-semibold">{venue.rating?.toFixed(1) || 'N/A'}</span>
                        <span className="text-grey text-sm">({venue.review_count || 0} reviews)</span>
                      </div>

                      <div className="text-grey text-sm mb-3">
                        {venue.borough && <span>{venue.borough}</span>}
                        {venue.cuisines && venue.cuisines.length > 0 && (
                          <span className="ml-2">• {venue.cuisines[0]}</span>
                        )}
                      </div>

                      {/* Distance Info */}
                      {distance && (
                        <div className="flex items-center space-x-2 mb-3 text-sm text-gold">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{formatDistance(distance)} • {walkingTime} walk</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-grey">
                          {venue.price_level && '£'.repeat(venue.price_level)}
                        </div>
                        <div className="text-sm text-gold font-medium group-hover:text-gold/80 transition-colors duration-300">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredVenues.length === 0 && (
            <div className="text-center py-12">
              <div className="text-grey text-lg mb-4">No restaurants found in your area</div>
              <p className="text-grey text-sm mb-6">
                Try increasing the distance range or check if location services are enabled.
              </p>
              <button
                onClick={() => setFilteredVenues(venues)}
                className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors duration-300"
              >
                Show All Restaurants
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      return { notFound: true };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(data) ? data : (data.venues || []);

    // Filter venues that have location data
    const venuesWithLocation = venues.filter(venue => 
      venue.latitude && venue.longitude
    );

    return {
      props: {
        venues: venuesWithLocation
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}
