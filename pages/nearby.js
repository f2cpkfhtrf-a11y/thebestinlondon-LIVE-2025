import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get top-rated venues for featured section
    const topVenues = venues
      .filter(v => v.rating && v.rating >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 12);

    return {
      props: {
        topVenues,
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

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please try again.');
        setIsLoading(false);
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  useEffect(() => {
    if (userLocation) {
      // Calculate distances and sort venues
      const venuesWithDistance = topVenues.map(venue => {
        if (venue.geometry?.location) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            venue.geometry.location.lat,
            venue.geometry.location.lng
          );
          return { ...venue, distance };
        }
        return { ...venue, distance: null };
      });

      const sortedVenues = venuesWithDistance
        .filter(v => v.distance !== null)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 20);

      setNearbyVenues(sortedVenues);
    }
  }, [userLocation, topVenues]);

  return (
    <>
      <Head>
        <title>Restaurants Near Me | Find Nearby Dining | The Best in London</title>
        <meta name="description" content="Discover the best restaurants near your location in London. Use your location to find top-rated dining options within walking distance." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/nearby" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Restaurants Near Me | The Best in London" />
        <meta property="og:description" content="Discover the best restaurants near your location in London." />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/logo.svg" />
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
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal opacity-90"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gradient mb-6">
              Restaurants Near Me
            </h1>
            <p className="text-xl sm:text-2xl text-grey font-sans font-medium mb-4">
              Discover Local Dining
            </p>
            <p className="text-lg text-grey-light max-w-3xl mx-auto leading-relaxed mb-8">
              Find the best restaurants near your current location. 
              Get personalized recommendations based on your proximity to London's finest dining establishments.
            </p>
            
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
        {userLocation && nearbyVenues.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  Closest to You
                </h2>
                <p className="text-lg text-grey max-w-2xl mx-auto">
                  Top-rated restaurants within walking distance
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nearbyVenues.map((venue) => (
                  <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} className="group">
                    <div className="card overflow-hidden h-full">
                      <div className="relative h-48">
                        {venue.image_url ? (
                          <Image
                            src={venue.image_url}
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
                        {venue.image_url ? (
                          <Image
                            src={venue.image_url}
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
