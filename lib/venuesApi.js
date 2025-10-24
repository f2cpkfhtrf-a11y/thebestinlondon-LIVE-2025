// Helper function for dynamic venue data fetching
export async function fetchVenuesData(params = {}) {
  try {
    const { slug, area, cuisine, type, limit } = params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.thebestinlondon.co.uk';
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (slug) queryParams.append('slug', slug);
    if (area) queryParams.append('area', area);
    if (cuisine) queryParams.append('cuisine', cuisine);
    if (type) queryParams.append('type', type);
    if (limit) queryParams.append('limit', limit);
    
    const queryString = queryParams.toString();
    const url = `${baseUrl}/api/venues${queryString ? `?${queryString}` : ''}`;
    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch venues: ${res.status}`);
    }
    
    const venues = await res.json();
    return Array.isArray(venues) ? venues : [];
  } catch (error) {
    console.error('Error fetching venues data:', error);
    return [];
  }
}

// Helper function for getServerSideProps with venues data
export async function getVenuesServerSideProps(params = {}) {
  const venues = await fetchVenuesData(params);
  
  return {
    props: {
      venues: venues || []
    }
  };
}
