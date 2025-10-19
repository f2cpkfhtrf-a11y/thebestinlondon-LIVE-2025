import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LatestAddsProps {
  venues: any[];
}

export default function LatestAdds({ venues }: LatestAddsProps) {
  // Get latest venues (assuming they're ordered by addition date or rating)
  const latestVenues = venues
    .filter(v => v.rating && v.rating >= 4.0)
    .slice(-6) // Get last 6 as "latest"
    .reverse(); // Show newest first

  const getImageUrl = (venue: any) => {
    if (venue.image_card_path) return venue.image_card_path.replace('/public', '');
    if (venue.image_url && !venue.image_url.includes('PLACEHOLDER')) return venue.image_url;
    return '/images/heroes/site/default-list-hero.webp';
  };

  if (latestVenues.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Latest Additions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Recently added gems to London's dining scene
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestVenues.map((venue) => {
            const imageUrl = getImageUrl(venue);
            const location = venue.area || venue.borough || venue.vicinity || 'London';
            
            return (
              <Link 
                key={venue.place_id}
                href={`/restaurant/${venue.slug}`}
                className="group block"
              >
                <div className="flex overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-neutral-900/70 backdrop-blur transition-all duration-300 group-hover:shadow-xl group-hover:border-gold/30">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 flex-shrink-0 md:w-32 md:h-32">
                    <Image
                      src={imageUrl}
                      alt={`${venue.name} - ${venue.cuisines?.join(', ') || 'restaurant'}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/heroes/site/default-list-hero.webp';
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h3 className="font-serif font-bold text-white text-lg mb-1 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                      {venue.name}
                    </h3>
                    
                    {/* Cuisine and location */}
                    <div className="space-y-1">
                      {venue.cuisines && venue.cuisines.length > 0 && (
                        <p className="text-sm text-gray-300 capitalize">
                          {venue.cuisines[0]}
                        </p>
                      )}
                      <p className="text-sm text-gray-400 flex items-center">
                        📍 {location}
                      </p>
                    </div>
                    
                    {/* Rating */}
                    {venue.rating && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-gold text-sm font-semibold">
                          ⭐ {venue.rating.toFixed(1)}
                        </span>
                        {venue.user_ratings_total && (
                          <span className="text-xs text-gray-400">
                            ({venue.user_ratings_total.toLocaleString()})
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
