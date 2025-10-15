import Layout from '../components/Layout';

const venues = [
  {
    "id": 1,
    "name": "The Ledbury",
    "area": "Notting Hill",
    "rating": 4.8,
    "googleReviews": 1247,
    "address": "127 Ledbury Rd, London W11 2AQ",
    "cuisine": "Modern European",
    "priceRange": "££££",
    "description": "Two Michelin-starred restaurant offering innovative European cuisine in an elegant setting."
  },
  {
    "id": 2,
    "name": "Dishoom",
    "area": "Covent Garden",
    "rating": 4.6,
    "googleReviews": 3241,
    "address": "12 Upper St Martin's Ln, London WC2H 9FB",
    "cuisine": "Indian",
    "priceRange": "££",
    "description": "Bombay-style café serving authentic Indian street food and cocktails."
  },
  {
    "id": 3,
    "name": "The River Café",
    "area": "Hammersmith",
    "rating": 4.7,
    "googleReviews": 892,
    "address": "Thames Wharf, Rainville Rd, London W6 9HA",
    "cuisine": "Italian",
    "priceRange": "££££",
    "description": "Iconic riverside restaurant serving exceptional Italian cuisine with stunning Thames views."
  },
  {
    "id": 4,
    "name": "Hawksmoor Seven Dials",
    "area": "Covent Garden",
    "rating": 4.5,
    "googleReviews": 2156,
    "address": "11 Langley St, London WC2H 9JG",
    "cuisine": "Steakhouse",
    "priceRange": "£££",
    "description": "Premium steakhouse known for exceptional British beef and craft cocktails."
  },
  {
    "id": 5,
    "name": "Clos Maggiore",
    "area": "Covent Garden",
    "rating": 4.4,
    "googleReviews": 1873,
    "address": "33 King St, London WC2E 8JD",
    "cuisine": "French",
    "priceRange": "£££",
    "description": "Romantic French restaurant with a stunning conservatory and exceptional wine list."
  },
  {
    "id": 6,
    "name": "Gymkhana",
    "area": "Mayfair",
    "rating": 4.6,
    "googleReviews": 1456,
    "address": "42 Albemarle St, London W1S 4JH",
    "cuisine": "Indian",
    "priceRange": "£££",
    "description": "Michelin-starred Indian restaurant offering refined regional cuisine in elegant surroundings."
  },
  {
    "id": 7,
    "name": "The Wolseley",
    "area": "Piccadilly",
    "rating": 4.3,
    "googleReviews": 3421,
    "address": "160 Piccadilly, St. James's, London W1J 9EB",
    "cuisine": "European",
    "priceRange": "£££",
    "description": "Grand European café-restaurant in a stunning Art Deco building on Piccadilly."
  },
  {
    "id": 8,
    "name": "Barrafina",
    "area": "Soho",
    "rating": 4.5,
    "googleReviews": 1987,
    "address": "26-27 Dean St, London W1D 3LL",
    "cuisine": "Spanish",
    "priceRange": "£££",
    "description": "Authentic Spanish tapas bar with counter seating and exceptional sherry selection."
  },
  {
    "id": 9,
    "name": "The Clove Club",
    "area": "Shoreditch",
    "rating": 4.7,
    "googleReviews": 756,
    "address": "380 Old St, London EC1V 9LT",
    "cuisine": "Modern British",
    "priceRange": "££££",
    "description": "Michelin-starred restaurant showcasing innovative British cuisine with global influences."
  },
  {
    "id": 10,
    "name": "Franco Manca",
    "area": "Brixton",
    "rating": 4.4,
    "googleReviews": 4567,
    "address": "Unit 4, Market Row, London SW9 8LD",
    "cuisine": "Italian",
    "priceRange": "£",
    "description": "Popular sourdough pizza chain with authentic Neapolitan-style pizzas and fresh ingredients."
  }
];

export default function Restaurants() {
  // Use the venues array directly
  const venueData = venues;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Restaurants in London",
    "description": "Curated list of London's finest restaurants",
    "url": "https://thebestinlondon.com/restaurants",
    "numberOfItems": venueData.length,
    "itemListElement": venueData.map((venue, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Restaurant",
        "name": venue.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": venue.address,
          "addressLocality": venue.area,
          "addressCountry": "GB"
        },
        "aggregateRating": venue.rating ? {
          "@type": "AggregateRating",
          "ratingValue": venue.rating,
          "reviewCount": venue.reviews || venue.googleReviews || 0,
          "bestRating": 5,
          "worstRating": 1
        } : null,
        "servesCuisine": venue.cuisines?.[0],
        "priceRange": venue.priceRange,
        "description": venue.description
      }
    }))
  };

  const getGoogleMapsUrl = (venue) => {
    const address = encodeURIComponent(venue.address);
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  return (
    <Layout title="Best Restaurants in London - The Best in London">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              London's Best Restaurants
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              From Michelin-starred fine dining to authentic local favorites, discover the restaurants that make London a world-class culinary destination
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {venueData.length} venues
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {venueData.filter(v => v.rating >= 4.5).length} highly rated
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {new Set(venueData.map(v => v.area)).size} areas
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {new Set(venueData.map(v => v.cuisine)).size} cuisines
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venueData.map((restaurant) => (
              <div key={restaurant.id} className="card p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                  {restaurant.rating && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-lg font-semibold text-gray-900">{restaurant.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{restaurant.area}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span>{restaurant.cuisine}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>{restaurant.priceRange}</span>
                  </div>
                  
                  {restaurant.openingStatus && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className={`font-medium ${restaurant.openingStatus === 'Open now' ? 'text-green-600' : 'text-red-600'}`}>
                        {restaurant.openingStatus}
                      </span>
                    </div>
                  )}
                  
                  {restaurant.fsaRating && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-green-600">
                        FSA Rating: {restaurant.fsaRating.rating}/5
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {restaurant.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    {(restaurant.reviews || restaurant.googleReviews || 0).toLocaleString()} reviews
                  </div>
                  <div className="text-sm text-gray-500">
                    {restaurant.address}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <a
                    href={getGoogleMapsUrl(restaurant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    View on Maps
                  </a>
                  <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? We're constantly updating our recommendations.
            </p>
            <button className="btn-primary">
              Suggest a Restaurant
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}


