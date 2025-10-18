import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import StandardizedCard from '../components/StandardizedCard';
import StandardizedHeader from '../components/StandardizedHeader';
import { filterVenuesByCuisine, filterVenuesByDietary, sortVenues, getUniqueCuisines, getUniqueAreas, getDietaryTags, calculateVenueStats } from '../utils/venueDataUtils';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    const stats = calculateVenueStats(venues);
    
    return {
      props: {
        venues,
        stats
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        venues: [],
        stats: { totalVenues: 0, areas: 0, cuisines: 0, halalVenues: 0 }
      },
      revalidate: 3600
    };
  }
}

export default function Restaurants({ venues, stats }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [scrolled, setScrolled] = useState(false);
  const [filteredVenues, setFilteredVenues] = useState(venues);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get available cuisines from venues
  const availableCuisines = getUniqueCuisines(venues).slice(0, 10);
  const availableAreas = getUniqueAreas(venues).slice(0, 10);
  const availableDietaryTags = getDietaryTags(venues);

  // Filter venues by cuisine OR dietary tag
  let filtered = filteredVenues;
  if (filter !== 'all') {
    // Check if it's a dietary filter
    if (availableDietaryTags.includes(filter)) {
      filtered = filterVenuesByDietary(filteredVenues, filter);
    } else {
      // Filter by cuisine
      filtered = filterVenuesByCuisine(filteredVenues, filter);
    }
  }

  // Sort venues
  const sorted = sortVenues(filtered, sortBy);

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Restaurants in London",
    "description": "Discover the finest restaurants across London with our curated selection",
    "numberOfItems": venues.length,
    "itemListElement": venues.slice(0, 20).map((venue, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Restaurant",
        "name": venue.name,
        "url": `https://thebestinlondon.co.uk/restaurant/${venue.slug}`,
        "address": venue.address ? {
          "@type": "PostalAddress",
          "streetAddress": venue.address.formatted,
          "postalCode": venue.address.postcode,
          "addressCountry": "GB"
        } : null,
        "aggregateRating": venue.rating ? {
          "@type": "AggregateRating",
          "ratingValue": venue.rating,
          "reviewCount": venue.user_ratings_total || 0
        } : null
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Best Restaurants in London | The Best in London</title>
        <meta name="description" content="Discover the finest restaurants across London. From Michelin-starred dining to hidden gems, find your perfect meal in the capital." />
        <meta name="keywords" content="restaurants London, best restaurants, fine dining London, London food, restaurant guide" />
        <meta property="og:title" content="Best Restaurants in London | The Best in London" />
        <meta property="og:description" content="Discover the finest restaurants across London. From Michelin-starred dining to hidden gems, find your perfect meal in the capital." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thebestinlondon.co.uk/restaurants" />
        <meta property="og:image" content="https://thebestinlondon.co.uk/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Restaurants in London | The Best in London" />
        <meta name="twitter:description" content="Discover the finest restaurants across London. From Michelin-starred dining to hidden gems, find your perfect meal in the capital." />
        <meta name="twitter:image" content="https://thebestinlondon.co.uk/og-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Standardized Header */}
        <StandardizedHeader 
          title="Best Restaurants in London"
          subtitle="Discover the finest restaurants across London. From Michelin-starred dining to hidden gems, find your perfect meal in the capital."
          backgroundImage=""
        />

        {/* Filter Controls */}
        <div className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Cuisine Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-gold text-black' 
                      : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                  }`}
                >
                  All ({venues.length})
                </button>
                {availableCuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setFilter(cuisine)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      filter === cuisine 
                        ? 'bg-gold text-black' 
                        : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                    }`}
                  >
                    {cuisine} ({filteredVenues.filter(v => v.cuisines?.includes(cuisine)).length})
                  </button>
                ))}
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <span className="text-warmWhite/70 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-warmWhite/10 text-warmWhite border border-warmWhite/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
                >
                  <option value="rating">Rating</option>
                  <option value="reviews">Reviews</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {sorted.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No restaurants found</h3>
              <p className="text-warmWhite/70 mb-8">Try adjusting your filters to see more results</p>
              <button
                onClick={() => setFilter('all')}
                className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
              >
                View All Restaurants
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sorted.map((venue) => (
                <Link 
                  href={`/restaurant/${venue.slug}`} 
                  key={venue.place_id}
                  className="group"
                >
                  <StandardizedCard 
                    venue={venue}
                    className="h-full group-hover:scale-105 transition-transform duration-300"
                    showBadges={true}
                    showRating={true}
                    showLocation={true}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-black-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gold mb-2">{stats.totalVenues}</div>
                <div className="text-warmWhite/70">Restaurants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">{stats.areas}</div>
                <div className="text-warmWhite/70">Areas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">{stats.cuisines}</div>
                <div className="text-warmWhite/70">Cuisines</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">{stats.halalVenues}</div>
                <div className="text-warmWhite/70">Halal Options</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
