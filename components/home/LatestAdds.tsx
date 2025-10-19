import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LatestAddsProps {
  venues: any[];
}

export default function LatestAdds({ venues }: LatestAddsProps) {
  // Get "recently added" venues by sorting by createdAt timestamp
  const latestVenues = venues
    .filter(v => v.createdAt && v.rating && v.rating >= 3.5) // Filter venues with timestamps and decent ratings
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime(); // Sort by newest first
    })
    .slice(0, 6); // Show 6 most recently added venues

  const getImageUrl = (venue: any) => {
    if (venue.image_card_path) return venue.image_card_path.replace('/public', '');
    if (venue.image_url && !venue.image_url.includes('PLACEHOLDER')) return venue.image_url;
    return '/images/heroes/site/default-list-hero.webp';
  };

  const getTimeSinceAdded = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Added today';
    if (diffInDays === 1) return 'Added yesterday';
    if (diffInDays < 7) return `Added ${diffInDays} days ago`;
    if (diffInDays < 30) return `Added ${Math.floor(diffInDays / 7)} weeks ago`;
    return `Added ${Math.floor(diffInDays / 30)} months ago`;
  };

  if (latestVenues.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Recently Added
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Fresh discoveries and trending restaurants gaining recognition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVenues.map((venue) => {
            const imageUrl = getImageUrl(venue);
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
                        target.src = '/images/heroes/site/default-list-hero.webp';
                      }}
                    />
                    
                    {/* "Recently Added" badge */}
                    {venue.createdAt && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
                          🆕 {getTimeSinceAdded(venue.createdAt)}
                        </span>
                      </div>
                    )}

                    {/* Rating badge */}
                    {venue.rating && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-gold text-black text-xs font-semibold px-2 py-1 rounded">
                          ⭐ {venue.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-white text-lg mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-2">
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
                    
                    {/* Reviews count */}
                    {venue.user_ratings_total && (
                      <p className="text-xs text-gray-400 mt-2">
                        {venue.user_ratings_total.toLocaleString()} reviews
                      </p>
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
