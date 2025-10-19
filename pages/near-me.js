import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StandardizedCard from '../components/StandardizedCard';
import PageHero from '../components/PageHero';
import RadiusControl from '../components/RadiusControl';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import { filterByRadius, safeUserLocation, distanceKm } from '../lib/geo';
import { getVenueLatLng } from '../lib/venueLocation';
import { getLiveStats } from '../lib/siteStats';
import fs from 'fs';
import path from 'path';

export default function NearMePage({ venues, stats }) {
  const router = useRouter();
  const { lat, lng, radius } = router.query;
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyVenues, setNearbyVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRadius, setCurrentRadius] = useState(parseFloat(radius) || 5);
  const [originalRadius, setOriginalRadius] = useState(parseFloat(radius) || 5);
  const [hasExpanded, setHasExpanded] = useState(false);

  // Central London fallback
  const CENTRAL_LONDON = { lat: 51.5072, lng: -0.1276 };

  // Format distance for display
  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)} km`;
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

  // Initialize location from query params or get user location
  useEffect(() => {
    const initializeLocation = async () => {
      // Try query params first
      if (lat && lng) {
        setUserLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
        return;
      }

      // Try localStorage
      const savedLocation = localStorage.getItem('userLocation');
      const locationTimestamp = localStorage.getItem('locationTimestamp');
      
      if (savedLocation && locationTimestamp) {
        const age = Date.now() - parseInt(locationTimestamp);
        if (age < 30 * 60 * 1000) { // 30 minutes
          setUserLocation(JSON.parse(savedLocation));
          return;
        }
      }

      // Try to get current location
      try {
        const location = await safeUserLocation();
        if (location) {
          setUserLocation(location);
          localStorage.setItem('userLocation', JSON.stringify(location));
          localStorage.setItem('locationTimestamp', Date.now().toString());
        } else {
          setUserLocation(CENTRAL_LONDON);
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setUserLocation(CENTRAL_LONDON);
      }
    };

    initializeLocation();
  }, [lat, lng]);

  // Update venues when location or radius changes
  useEffect(() => {
    if (userLocation && venues) {
      const venuesInRadius = filterByRadius(
        venues,
        userLocation,
        currentRadius,
        getVenueLatLng
      );
      
      setNearbyVenues(venuesInRadius);
      
      // Auto-expand radius if no results and haven't expanded yet
      if (venuesInRadius.length === 0 && !hasExpanded && currentRadius === originalRadius) {
        const expansionRadii = [5, 10, 20, 50];
        const nextRadius = expansionRadii.find(r => r > currentRadius);
        if (nextRadius) {
          setCurrentRadius(nextRadius);
          setHasExpanded(true);
        }
      }
    }
  }, [userLocation, currentRadius, venues, hasExpanded, originalRadius]);

  const hero = resolveHeroImage({ type: "search" });

  return (
    <>
      <Head>
        <title>Restaurants Near Me | Find Nearby Dining | The Best in London</title>
        <meta name="description" content="Discover the best restaurants near your location in London. Use your location to find top-rated dining options within walking distance." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/near-me" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Restaurants Near Me | The Best in London" />
        <meta property="og:description" content="Discover the best restaurants near your location in London." />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/near-me" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Restaurants Near Me | The Best in London" />
        <meta name="twitter:description" content="Discover the best restaurants near your location in London." />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Restaurants Near Me",
          "description": "Find the best restaurants near your location in London with distance and walking time information",
          "url": "https://www.thebestinlondon.co.uk/near-me"
        }) }} />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black">
        {/* PageHero */}
        <PageHero
          title="Restaurants Near Me"
          subtitle="Find the best restaurants near your current location. Get personalized recommendations based on your proximity to London's finest dining establishments."
          image={hero}
          center={true}
        />

        {/* Location Status & Auto-expansion notification */}
        {userLocation && nearbyVenues.length > 0 && hasExpanded && (
          <section className="py-4 bg-gold/10 border-b border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gold text-sm">
                Showing results within {currentRadius} km (auto-expanded from {originalRadius} km to ensure you see restaurants)
              </p>
            </div>
          </section>
        )}

        {/* Location Controls */}
        {userLocation && (
          <section className="py-8 bg-charcoal-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto">
                <div className="bg-grey-dark/50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-semibold mb-2">Search Radius: {currentRadius} km</h3>
                    <div className="flex justify-center gap-2">
                      {[2, 5, 10, 20].map(km => (
                        <button
                          key={km}
                          onClick={() => setCurrentRadius(km)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentRadius === km 
                              ? 'bg-gold text-black' 
                              : 'bg-grey text-white hover:bg-grey/80'
                          }`}
                        >
                          {km} km
                        </button>
                      ))}
                    </div>
                  </div>
                  <RadiusControl 
                    value={currentRadius} 
                    onChange={setCurrentRadius}
                    min={1}
                    max={50}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        {userLocation && (
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  {nearbyVenues.length > 0 ? 'Restaurants Near You' : 'No Restaurants Found'}
                </h2>
                <p className="text-lg text-grey max-w-2xl mx-auto mb-6">
                  {nearbyVenues.length > 0 
                    ? `Showing ${nearbyVenues.length} within ${currentRadius} km`
                    : `Try increasing your search radius to find more restaurants.`
                  }
                </p>
              </div>

              {/* Results Grid */}
              {nearbyVenues.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {nearbyVenues.map((venue) => (
                    <div key={venue.place_id || venue.slug} className="group">
                      <StandardizedCard
                        venue={venue}
                        showDistance={true}
                        distance={venue.distance}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State with Auto-expansion */}
              {nearbyVenues.length === 0 && hasExpanded && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-6">🍽️</div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">
                      No restaurants found within {currentRadius} km
                    </h3>
                    <p className="text-grey mb-6">
                      We've expanded the search radius automatically but still can't find restaurants in this area. Try a larger radius or explore our featured restaurants.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[5, 10, 20, 50].map(km => (
                        <button
                          key={km}
                          onClick={() => setCurrentRadius(km)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentRadius === km 
                              ? 'bg-gold text-black' 
                              : 'bg-grey-dark text-white hover:bg-grey'
                          }`}
                        >
                          {km} km
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Fallback for no location */}
        {!userLocation && (
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-6">📍</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  Enable Location Services
                </h3>
                <p className="text-grey mb-6">
                  To find restaurants near you, we need access to your location. This allows us to show you the closest dining options with accurate distances and walking times.
                </p>
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      const location = await safeUserLocation();
                      if (location) {
                        setUserLocation(location);
                        localStorage.setItem('userLocation', JSON.stringify(location));
                        localStorage.setItem('locationTimestamp', Date.now().toString());
                      } else {
                        setUserLocation(CENTRAL_LONDON);
                      }
                    } catch (error) {
                      console.error('Error getting location:', error);
                      setUserLocation(CENTRAL_LONDON);
                    }
                    setIsLoading(false);
                  }}
                  disabled={isLoading}
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50"
                >
                  {isLoading ? 'Getting Location...' : '📍 Use My Location'}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer stats={stats} />
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
    const venuesWithLocation = venues.filter(venue => {
      const coords = getVenueLatLng(venue);
      return coords !== null;
    });

    // Get live stats
    const stats = getLiveStats();

    return {
      props: {
        venues: venuesWithLocation,
        stats
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}
