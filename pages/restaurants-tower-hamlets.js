import { useState, useMemo } from 'react';
import Head from 'next/head';

function getVenueImage(venue, idx) {
  if (venue.photos && venue.photos[0] && venue.photos[0].photo_reference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${venue.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}`;
  }
  // Use local default image instead of Unsplash
  return '/images/heroes/site/default-card.webp';
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allVenues = JSON.parse(fileContent);
    
    const keywords = ["Tower Hamlets","Canary Wharf","Whitechapel","Bethnal Green","Spitalfields","Shoreditch","Mile End","Bow"];
    const venues = allVenues
      .filter(v => v && v.formatted_address && keywords.some(k => v.formatted_address.toLowerCase().includes(k.toLowerCase())))
      .map(v => {
        const priceEstimates = { 1: '£12-18', 2: '£18-30', 3: '£30-50', 4: '£50+' };
        return { ...v, priceEstimate: priceEstimates[v.price_level] || '' };
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { 
      props: { 
        venues: venues.slice(0, 50),
        area: 'Tower Hamlets',
        description: 'Discover the best restaurants in Tower Hamlets, from Canary Wharf to vibrant East London communities.'
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return { 
      props: { 
        venues: [],
        area: 'Tower Hamlets',
        description: 'Discover the best restaurants in Tower Hamlets.'
      },
      revalidate: 3600
    };
  }
}

export default function RestaurantsTowerHamlets({ venues, area, description }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredVenues = useMemo(() => {
    let filtered = venues.filter(venue => 
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.formatted_address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'rating':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return filtered.sort((a, b) => (a.price_level || 0) - (b.price_level || 0));
      default:
        return filtered;
    }
  }, [venues, searchTerm, sortBy]);

  return (
    <>
      <Head>
        <title>Best Restaurants in Tower Hamlets | The Best in London</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="restaurants, tower hamlets, canary wharf, whitechapel, bethnal green, east london, dining" />
      </Head>

      <div className="min-h-screen bg-charcoal text-warmWhite">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Best Restaurants in {area}</h1>
            <p className="text-lg text-grey mb-6">{description}</p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg bg-charcoal-light border border-grey-dark text-warmWhite placeholder-grey focus:border-gold focus:outline-none"
              />
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-charcoal-light border border-grey-dark text-warmWhite focus:border-gold focus:outline-none"
              >
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => (
              <div key={venue.place_id} className="bg-charcoal-light rounded-lg overflow-hidden shadow-lg hover:shadow-gold transition-shadow">
                <div className="h-48 relative">
                  <img
                    src={getVenueImage(venue, index)}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gold text-black px-2 py-1 rounded text-sm font-semibold">
                    {venue.rating ? `${venue.rating}/5` : 'N/A'}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                  <p className="text-grey text-sm mb-2">{venue.formatted_address}</p>
                  {venue.priceEstimate && (
                    <p className="text-gold text-sm mb-2">{venue.priceEstimate}</p>
                  )}
                  {venue.user_ratings_total && (
                    <p className="text-grey text-xs">{venue.user_ratings_total} reviews</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredVenues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-grey text-lg">No restaurants found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
