// Internal linking modules for enhanced SEO
export function getRelatedAreas(currentArea: string, venues: any[]): any[] {
  // Get areas with most venues, excluding current area
  const areaCounts = venues.reduce((acc, venue) => {
    const area = venue.area || venue.borough;
    if (area && area !== currentArea) {
      acc[area] = (acc[area] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(areaCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 6)
    .map(([area, count]) => ({
      name: area,
      slug: area.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      count: count as number
    }));
}

export function getRelatedCuisines(currentCuisine: string, venues: any[]): any[] {
  // Get cuisines with most venues, excluding current cuisine
  const cuisineCounts = venues.reduce((acc, venue) => {
    if (venue.cuisines) {
      venue.cuisines.forEach((cuisine: string) => {
        if (cuisine !== currentCuisine) {
          acc[cuisine] = (acc[cuisine] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});

  return Object.entries(cuisineCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 6)
    .map(([cuisine, count]) => ({
      name: cuisine,
      slug: cuisine.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      count: count as number
    }));
}

export function getNearbyVenues(currentVenue: any, venues: any[]): any[] {
  // Get venues in same area or cuisine, excluding current venue
  const nearby = venues.filter(venue => 
    venue.slug !== currentVenue.slug &&
    (venue.area === currentVenue.area || 
     venue.borough === currentVenue.borough ||
     (venue.cuisines && venue.cuisines.some((c: string) => 
       currentVenue.cuisines?.includes(c)
     )))
  );

  // Sort by rating and return top 5
  return nearby
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)
    .map(venue => ({
      name: venue.name,
      slug: venue.slug,
      rating: venue.rating,
      cuisine: venue.cuisines?.[0],
      area: venue.area || venue.borough
    }));
}

export function getBlogPosts(limit: number = 5): any[] {
  // This would typically fetch from a blog data source
  // For now, return mock data structure
  return [
    {
      title: "London Restaurant Trends 2025",
      slug: "london-restaurant-trends-2025",
      excerpt: "Discover the latest dining trends shaping London's restaurant scene",
      date: "2025-01-15"
    },
    {
      title: "Best Halal Restaurants in Central London",
      slug: "best-halal-restaurants-central-london",
      excerpt: "A comprehensive guide to halal dining in Central London",
      date: "2025-01-10"
    },
    {
      title: "Michelin Starred Restaurants London",
      slug: "michelin-starred-restaurants-london",
      excerpt: "Explore London's finest Michelin-starred dining experiences",
      date: "2025-01-05"
    }
  ].slice(0, limit);
}

export function getRelatedBlogPosts(topic: string, limit: number = 3): any[] {
  // Filter blog posts by topic relevance
  const allPosts = getBlogPosts(10);
  
  // Simple keyword matching for now
  const relevantPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(topic.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(topic.toLowerCase())
  );

  return relevantPosts.slice(0, limit);
}




