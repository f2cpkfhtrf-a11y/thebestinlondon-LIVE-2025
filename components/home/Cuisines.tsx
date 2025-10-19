import React from 'react';
import ImageTile from '../tiles/ImageTile';
import { resolveTileImage } from '../../lib/resolveHeroImage';

interface CuisinesProps {
  popularCuisines: Array<{ cuisine: string; count: number }>;
}

export default function Cuisines({ popularCuisines }: CuisinesProps) {
  const getCuisineImageUrl = (cuisine: string) => {
    const slug = cuisine.toLowerCase().replace(/\s+/g, '-');
    return resolveTileImage({ type: "cuisine", slug });
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
              <ImageTile
                key={cuisine}
                title={cuisine}
                subtitle={`${count} restaurants`}
                href={`/${slug}`}
                src={imageUrl}
                alt={`${cuisine} cuisine in London`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
