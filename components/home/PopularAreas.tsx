import React from 'react';
import AreaTile from '../AreaTile';

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
    .slice(0, 5) // Limit to top 5 as requested
    .map(([area, count]) => ({ area, count: count as number }));

  const getAreaSlug = (areaName: string) => {
    return areaName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  // Remove the getAreaImageUrl function as AreaTile handles image resolution

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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popularAreas.map(({ area, count }) => {
            const slug = getAreaSlug(area);
            
            return (
              <AreaTile
                key={area}
                slug={slug}
                name={area}
                count={count}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
