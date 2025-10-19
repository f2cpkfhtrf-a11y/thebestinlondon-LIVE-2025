import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { haversineKm } from '../../lib/geo';
import { getVenueLatLng } from '../../lib/venueLocation';

interface FeaturedNearYouProps {
  venues: any[];
}

export default function FeaturedNearYou({ venues }: FeaturedNearYouProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyVenues, setNearbyVenues] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedLocation, setHasAttemptedLocation] = useState(false);

  // Central London coordinates as fallback
  const centralLondon = { lat: 51.5074, lng: -0.1278 };

  const getCurrentLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      // Fallback to Central London coordinates
      setUserLocation(centralLondon);
      setIsLoading(false);
      setHasAttemptedLocation(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLoading(false);
        setHasAttemptedLocation(true);
      },
      (error) => {
        console.error('Error getting location:', error);
        // Fallback to Central London coordinates
        setUserLocation(centralLondon);
        setIsLoading(false);
        setHasAttemptedLocation(true);
      }
    );
  };

  useEffect(() => {
    if (userLocation) {
      // Calculate distances for all venues and find nearby ones
      const venuesWithDistance = venues.map(venue => {
        const venueCoords = getVenueLatLng(venue);
        if (venueCoords) {
          const distance = haversineKm(userLocation, venueCoords);
          return { ...venue, distance };
        }
        return null;
      }).filter(Boolean);

      // Sort by distance and take top 8
      const nearby = venuesWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 8);

      setNearbyVenues(nearby);
    }
  }, [userLocation, venues]);

  const getImageUrl = (venue: any) => {
    if (venue.image_card_path) return venue.image_card_path.replace('/public', '');
    if (venue.image_url && !venue.image_url.includes('PLACEHOLDER')) return venue.image_url;
    return '/images/heroes/site/default-list-hero.webp';
  };

  const getFallbackUrl = (venue: any) => {
    const cuisine = venue.cuisines?.[0];
    if (cuisine) return `/images/heroes/cuisines/${cuisine}.webp`;
    return '/images/heroes/site/default-list-hero.webp';
  };

  // Show fallback venues if no location or failed to get location
  const displayVenues = nearbyVenues.length > 0 ? nearbyVenues : venues.slice(0, 8);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Featured Near You
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            {userLocation && nearbyVenues.length > 0 
              ? `Discover exceptional dining within walking distance`
              : `Handpicked restaurants in central London`
            }
          </p>
          
          {!hasAttemptedLocation && (
            <button
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 bg-gold/90 text-black font-semibold rounded-lg hover:bg-gold transition-colors duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Getting Location...
                </>
              ) : (
                <>
                  📍 Use My Location
                </>
              )}
            </button>
          )}
          
          {hasAttemptedLocation && nearbyVenues.length === 0 && (
            <p className="text-sm text-gray-400">
              Using Central London as reference point
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayVenues.map((venue) => {
            const imageUrl = getImageUrl(venue);
            const fallbackUrl = getFallbackUrl(venue);
            const location = venue.area || venue.borough || venue.vicinity || 'London';
            
            return (
              <Link 
                key={venue.place_id} 
                href={`/restaurant/${venue.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-neutral-900/70 backdrop-blur transition-all duration-300 group-hover:shadow-xl group-hover:border-gold/30 group-hover:scale-105">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${venue.name} - ${venue.cuisines?.join(', ') || 'restaurant'} in ${location}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = fallbackUrl;
                      }}
                    />
                    
                    {/* Rating badge */}
                    {venue.rating && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
                          ⭐ {venue.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Distance badge */}
                    {venue.distance && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                          📍 {venue.distance.toFixed(1)} km
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                      {venue.name}
                    </h3>
                    
                    {/* Cuisine tags */}
                    {venue.cuisines && venue.cuisines.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {venue.cuisines.slice(0, 2).map((cuisine: string, index: number) => (
                          <span 
                            key={index}
                            className="text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded"
                          >
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Location */}
                    <p className="text-sm text-gray-300 mb-2">
                      📍 {location}
                      {venue.distance && ` • ${venue.distance.toFixed(1)} km away`}
                    </p>
                    
                    {/* Reviews count */}
                    {venue.user_ratings_total && (
                      <p className="text-xs text-gray-400">
                        {venue.user_ratings_total.toLocaleString()} reviews
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/nearby" 
            className="inline-flex items-center px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300"
          >
            Find More Near Me
          </Link>
        </div>
      </div>
    </section>
  );
}
