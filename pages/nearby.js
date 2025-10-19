import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';
import RadiusControl from '../components/RadiusControl';
import { filterByRadius, safeUserLocation } from '../lib/geo';
import { getVenueLatLng } from '../lib/venueLocation';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import PageHero from '../components/PageHero';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get top-rated venues for featured section (fallback)
    const topVenues = venues
      .filter(v => v.rating && v.rating >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 12);

    return {
      props: {
        topVenues: venues, // Pass all venues for distance calculations
        totalVenues: venues.length
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        topVenues: [],
        totalVenues: 0
      }
    };
  }
}

export default function Nearby({ topVenues, totalVenues }) {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyVenues, setNearbyVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [radius, setRadius] = useState(2); // Start with 2km
  const [hasExpanded, setHasExpanded] = useState(false);
  const allVenues = topVenues; // Use all venues for distance calculations

  // Central London fallback
  const CENTRAL_LONDON = { lat: 51.5072, lng: -0.1276 };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    
    try {
      const location = await safeUserLocation();
      if (location) {
        setUserLocation(location);
        // Persist location in localStorage
        localStorage.setItem('userLocation', JSON.stringify(location));
        localStorage.setItem('locationTimestamp', Date.now().toString());
      } else {
        // Fallback to Central London
        setUserLocation(CENTRAL_LONDON);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setUserLocation(CENTRAL_LONDON);
    }
    
    setIsLoading(false);
  };

  const refreshNearbyVenues = (currentRadius = radius) => {
    if (userLocation) {
      const venuesInRadius = filterByRadius(
        allVenues,
        userLocation,
        currentRadius,
        getVenueLatLng
      );
      
      setNearbyVenues(venuesInRadius);
      
      // Auto-expand radius if no results and haven't expanded yet
      if (venuesInRadius.length === 0 && !hasExpanded && currentRadius === radius) {
        const expansionRadii = [5, 10, 20];
        const nextRadius = expansionRadii.find(r => r > currentRadius);
        if (nextRadius) {
          setRadius(nextRadius);
          setHasExpanded(true);
          setTimeout(() => refreshNearbyVenues(nextRadius), 100);
        }
      }
    }
  };

  // Load location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    const locationTimestamp = localStorage.getItem('locationTimestamp');
    
    if (savedLocation && locationTimestamp) {
      const age = Date.now() - parseInt(locationTimestamp);
      // Use cached location if less than 30 minutes old
      if (age < 30 * 60 * 1000) {
        setUserLocation(JSON.parse(savedLocation));
      }
    }
  }, []);

  useEffect(() => {
    refreshNearbyVenues();
  }, [userLocation, radius, allVenues]);

  const hero = resolveHeroImage({ type: "search" });

  return (
    <>
      <Head>
        <title>Restaurants Near Me | Find Nearby Dining | The Best in London</title>
        <meta name="description" content="Discover the best restaurants near your location in London. Use your location to find top-rated dining options within walking distance." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/nearby" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Restaurants Near Me | The Best in London" />
        <meta property="og:description" content="Discover the best restaurants near your location in London." />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/nearby" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Restaurants Near Me | The Best in London" />
        <meta name="twitter:description" content="Discover the best restaurants near your location in London." />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black">
        <TabContainer currentPath="/nearby" pageType="nearby">
        {/* Hero Section */}
        <PageHero
          title="Restaurants Near Me"
          subtitle="Find the best restaurants near your current location. Get personalized recommendations based on your proximity to London's finest dining establishments."
          image={hero}
          center={true}
        />

        {/* Location Controls */}
        <section className="py-8 bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {!userLocation ? (
              <button
                onClick={getCurrentLocation}
                disabled={isLoading}
                className="btn-primary text-lg px-8 py-4 disabled:opacity-50"
              >
                {isLoading ? 'Getting Location...' : '📍 Use My Location'}
              </button>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-6 py-4 inline-block">
                <p className="text-green-400 font-medium">
                  ✅ Location found! Showing nearby restaurants
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Nearby Restaurants */}
        {userLocation && (
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  {nearbyVenues.length > 0 ? 'Restaurants Near You' : 'No Restaurants Found'}
                </h2>
                <p className="text-lg text-grey max-w-2xl mx-auto mb-6">
                  {nearbyVenues.length > 0 
                    ? `Showing ${nearbyVenues.length} within ${radius} km`
                    : `Try increasing your search radius to find more restaurants.`
                  }
                </p>
              </div>

              {/* Radius Control */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="bg-grey-dark/50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-semibold mb-2">Search Radius: {radius} km</h3>
                    <div className="flex justify-center gap-2">
                      {[2, 5, 10, 20].map(km => (
                        <button
                          key={km}
                          onClick={() => setRadius(km)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            radius === km 
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
                    value={radius} 
                    onChange={setRadius}
                    min={2}
                    max={20}
                  />
                </div>
              </div>

              {/* Empty State */}
              {nearbyVenues.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-6">🍽️</div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">
                      No restaurants found within {radius} km
                    </h3>
                    <p className="text-grey mb-6">
                      Try increasing your search radius or explore our featured restaurants below.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[2, 5, 10, 20].map(km => (
                        <button
                          key={km}
                          onClick={() => setRadius(km)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            radius === km 
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

              {/* Results Grid */}
              {nearbyVenues.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {nearbyVenues.map((venue) => (
                    <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} className="group">
                      <div className="card overflow-hidden h-full">
                        <div className="relative h-48">
                          {venue.image_card_path || venue.image_url ? (
                            <Image
                              src={venue.image_card_path || venue.image_url}
                              alt={venue.image_alt || `${venue.name} restaurant`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                              <span className="text-grey text-sm">No Image</span>
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            <div className="bg-gold text-black px-2 py-1 rounded-lg text-sm font-semibold">
                              ⭐ {venue.rating?.toFixed(1)}
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                              📍 {venue.distance?.toFixed(1)} km
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif font-semibold text-white text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                            {venue.name}
                          </h3>
                          <p className="text-grey text-sm mb-3">
                            {venue.cuisines?.[0]} • {venue.area || venue.borough} • {venue.distance?.toFixed(1)} km away
                          </p>
                          <p className="text-grey-light text-sm line-clamp-2">
                            {venue.description || 'Experience exceptional dining in the heart of London.'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Featured Restaurants (fallback) */}
        {!userLocation && (
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  Featured Restaurants
                </h2>
                <p className="text-lg text-grey max-w-2xl mx-auto">
                  Top-rated establishments across London
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topVenues.slice(0, 9).map((venue) => (
                  <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} className="group">
                    <div className="card overflow-hidden h-full">
                      <div className="relative h-48">
                        {venue.image_card_path || venue.image_url ? (
                          <Image
                            src={venue.image_card_path || venue.image_url}
                            alt={venue.image_alt || `${venue.name} restaurant`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                            <span className="text-grey text-sm">No Image</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <div className="bg-gold text-black px-2 py-1 rounded-lg text-sm font-semibold">
                            ⭐ {venue.rating?.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif font-semibold text-white text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                          {venue.name}
                        </h3>
                        <p className="text-grey text-sm mb-3">
                          {venue.cuisines?.[0]} • {venue.area || venue.borough}
                        </p>
                        <p className="text-grey-light text-sm line-clamp-2">
                          {venue.description || 'Experience exceptional dining in the heart of London.'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="py-16 bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  {totalVenues}+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  50+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Areas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  100%
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  Live
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Updates</div>
              </div>
            </div>
          </div>
        </section>
        </TabContainer>
      </main>

      <Footer />
    </>
  );
}
