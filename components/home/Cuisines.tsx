import React from 'react';
import CuisineTile from '../CuisineTile';

interface CuisinesProps {
  popularCuisines: Array<{ cuisine: string; count: number }>;
}

export default function Cuisines({ popularCuisines }: CuisinesProps) {
  // Limit to top 5 trending cuisines
  const trendingCuisines = popularCuisines.slice(0, 5);

  const getCuisineSlug = (cuisine: string) => {
    return cuisine.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Trending Cuisines
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the most popular culinary styles across London
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingCuisines.map(({ cuisine, count }) => {
            const slug = getCuisineSlug(cuisine);
            
            return (
              <CuisineTile
                key={cuisine}
                slug={slug}
                name={cuisine}
                count={count}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
