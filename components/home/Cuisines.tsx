import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CuisinesProps {
  popularCuisines: Array<{ cuisine: string; count: number }>;
}

export default function Cuisines({ popularCuisines }: CuisinesProps) {
  const getCuisineImageUrl = (cuisine: string) => {
    const slug = cuisine.toLowerCase().replace(/\s+/g, '-');
    return `/images/heroes/cuisines/${slug}.webp`;
  };

  const getCuisineSlug = (cuisine: string) => {
    return `${cuisine}-restaurants-london`;
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Popular Cuisines
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore London's diverse culinary landscape
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularCuisines.map(({ cuisine, count }) => {
            const imageUrl = getCuisineImageUrl(cuisine);
            const slug = getCuisineSlug(cuisine);
            
            return (
              <Link 
                key={cuisine}
                href={`/${slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-neutral-900/70 backdrop-blur transition-all duration-300 group-hover:shadow-xl group-hover:border-gold/30">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${cuisine} restaurants in London`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/heroes/site/default-list-hero.webp';
                      }}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <h3 className="font-serif font-bold text-white text-lg mb-1 group-hover:text-gold transition-colors duration-300 capitalize">
                        {cuisine}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {count} restaurants
                      </p>
                    </div>
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
