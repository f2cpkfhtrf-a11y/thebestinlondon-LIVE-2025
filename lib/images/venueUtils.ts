// Helper functions for venue data
export function getPrimaryCuisine(venue: any): string | null {
  if (venue.cuisines && venue.cuisines.length > 0) {
    return venue.cuisines[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
  }
  return null;
}

export function getNormalizedArea(venue: any): string | null {
  const area = venue.area || venue.borough;
  if (area) {
    return area.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }
  return null;
}



