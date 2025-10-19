import React from 'react';
import ImageTile from '../tiles/ImageTile';
import { resolveAreaImage } from '../../lib/resolveHeroImage';

interface PopularAreasProps {
  venues: any[];
  stats?: any;
}

export default function PopularAreas({ venues, stats }: PopularAreasProps) {
  // Get popular areas with venue counts
  const areaCounts = venues.reduce((acc, venue) => {
    const areas = [venue.area, venue.borough].filter(Boolean);
    areas.forEach(area => {
      if (area) {
        acc[area] = (acc[area] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const popularAreas = Object.entries(areaCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 8)
    .map(([area, count]) => ({ area, count: count as number }));

  const getAreaSlug = (areaName: string) => {
    return areaName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const getAreaImageUrl = (areaName: string) => {
    const slug = getAreaSlug(areaName);
    return resolveAreaImage(slug);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Popular Areas
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover London's most vibrant dining neighborhoods
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularAreas.map(({ area, count }) => {
            const imageUrl = getAreaImageUrl(area);
            const slug = getAreaSlug(area);
            
            return (
              <ImageTile
                key={area}
                title={area}
                subtitle={`${count} restaurants`}
                href={`/restaurants-${slug}`}
                src={imageUrl}
                alt={`Popular restaurants in ${area}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
