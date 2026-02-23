import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { theme } from '../utils/theme';
import StandardizedCard from '../components/StandardizedCard';
import PageHero from '../components/PageHero';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import { filterVenuesByCuisine, filterVenuesByDietary, sortVenues, getUniqueCuisines, getUniqueAreas, getDietaryTags, calculateVenueStats } from '../utils/venueDataUtils';
import { asCollectionPage } from '../lib/factory/pageFactory';
import BackToHome from '../components/BackToHome';
import Breadcrumbs from '../components/Breadcrumbs';

// Pagination utility
const paginateData = (data, page = 1, limit = 50) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
      hasNext: endIndex < data.length,
      hasPrev: page > 1
    }
  };
};

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    const stats = calculateVenueStats(venues);
    
    return {
      props: {
        venues,
        stats
      } // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        venues: [],
        stats: { totalVenues: 0, areas: 0, cuisines: 0, halalVenues: 0 }
      }
    };
  }
}

export default function Restaurants({ venues, stats }) {
  const router = useRouter();
  const [filter, setFilter] = useState(router.query.filter || 'all');
  const [sortBy, setSortBy] = useState(router.query.sort || 'rating');
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page) || 1);
  const [itemsPerPage] = useState(50);
  
  // Get hero image for restaurants page
  const hero = resolveHeroImage({ type: "list-all" });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    const query = {};
    if (filter !== 'all') query.filter = filter;
    if (sortBy !== 'rating') query.sort = sortBy;
    if (currentPage > 1) query.page = currentPage;
    
    router.push({ pathname: '/restaurants', query }, undefined, { shallow: true });
  }, [filter, sortBy, currentPage]);

  // Get available cuisines from venues
  const availableCuisines = getUniqueCuisines(venues).slice(0, 10);
  const availableAreas = getUniqueAreas(venues).slice(0, 10);
  const availableDietaryTags = getDietaryTags(venues);

  // Filter and sort venues
  const filteredAndSorted = useMemo(() => {
    let filtered = venues;
    if (filter !== 'all') {
      // Check if it's a dietary filter
      if (availableDietaryTags.includes(filter)) {
        filtered = filterVenuesByDietary(venues, filter);
      } else {
        // Filter by cuisine
        filtered = filterVenuesByCuisine(venues, filter);
      }
    }
    // Sort venues
    return sortVenues(filtered, sortBy);
  }, [venues, filter, sortBy, availableDietaryTags]);
  
  // Paginate results
  const paginated = useMemo(() => {
    return paginateData(filteredAndSorted, currentPage, itemsPerPage);
  }, [filteredAndSorted, currentPage, itemsPerPage]);
  
  // Reset to page 1 when filters change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };
  
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Restaurants in London",
    "description": "Discover the finest restaurants across London with our curated selection",
    "numberOfItems": filteredAndSorted.length,
    "itemListElement": paginated.data.slice(0, 20).map((venue, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Restaurant",
        "name": venue.name,
        "url": `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`,
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
        <title>Best Restaurants in London{currentPage > 1 ? ` - Page ${currentPage}` : ''} | The Best in London</title>
        <meta name="description" content={`Discover the finest restaurants across London${currentPage > 1 ? ` (Page ${currentPage})` : ''}. From Michelin-starred dining to hidden gems, find your perfect meal in the capital.`} />
        <meta name="keywords" content="restaurants London, best restaurants, fine dining London, London food, restaurant guide" />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/restaurants${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
        {currentPage > 1 && <link rel="prev" href={`https://www.thebestinlondon.co.uk/restaurants${currentPage > 2 ? `?page=${currentPage - 1}` : ''}`} />}
        {paginated.pagination.hasNext && <link rel="next" href={`https://www.thebestinlondon.co.uk/restaurants?page=${currentPage + 1}`} />}
        <meta property="og:title" content={`Best Restaurants in London${currentPage > 1 ? ` - Page ${currentPage}` : ''} | The Best in London`} />
        <meta property="og:description" content="Discover the finest restaurants across London. From Michelin-starred dining to hidden gems, find your perfect meal in the capital." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.thebestinlondon.co.uk/restaurants${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/images/heroes/site/default-list-hero.webp" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="alternate" hrefLang="en-GB" href={`https://www.thebestinlondon.co.uk/restaurants${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
        <link rel="alternate" hrefLang="en" href={`https://www.thebestinlondon.co.uk/restaurants${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Restaurants in London | The Best in London" />
        <meta name="twitter:description" content="Discover the finest restaurants across London. From Michelin-starred dining to hidden gems, find your perfect meal in the capital." />
        <meta name="twitter:image" content="https://www.thebestinlondon.co.uk/images/heroes/site/default-list-hero.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* JSON-LD via factory */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Restaurants in London',
          url: 'https://www.thebestinlondon.co.uk/restaurants',
          itemCount: venues.length,
          items: venues.slice(0, 10).map(venue => ({ name: venue.name, slug: venue.slug }))
        })) }} />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-6">
          <Breadcrumbs />
        </div>
        
        {/* Page Hero */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <PageHero 
            title="Best Restaurants in London"
            subtitle="Discover the finest restaurants across London. From Michelin-starred dining to hidden gems, find your perfect meal in the capital."
            stats={[
              { label: "Restaurants", value: venues.length },
              { label: "Areas", value: stats.areas },
              { label: "Cuisines", value: stats.cuisines },
              { label: "Halal Options", value: stats.halalVenues }
            ]}
            image={hero}
            priority
            center
          />
              </div>
              
        {/* Filter Controls */}
        <div className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Cuisine Filters */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by cuisine">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-gold text-black' 
                      : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                  }`}
                  aria-pressed={filter === 'all'}
                  aria-label={`Show all ${venues.length} restaurants`}
                >
                  All ({venues.length})
                </button>
                {availableCuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => handleFilterChange(cuisine)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      filter === cuisine 
                        ? 'bg-gold text-black' 
                        : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                    }`}
                    aria-pressed={filter === cuisine}
                    aria-label={`Filter by ${cuisine} cuisine, ${venues.filter(v => v.cuisines?.includes(cuisine)).length} restaurants`}
                  >
                    {cuisine} ({venues.filter(v => v.cuisines?.includes(cuisine)).length})
                  </button>
                ))}
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-warmWhite/70 text-sm">Sort by:</label>
                <select 
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-warmWhite/10 text-warmWhite border border-warmWhite/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
                  aria-label="Sort restaurants by"
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
          {/* Results count */}
          <div className="mb-6">
            <p className="text-grey text-sm">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSorted.length)} of {filteredAndSorted.length} restaurants
              {filter !== 'all' && ` (filtered by ${filter})`}
            </p>
          </div>
          
          {filteredAndSorted.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No restaurants found</h3>
              <p className="text-warmWhite/70 mb-8">Try adjusting your filters to see more results</p>
                <button
                  onClick={() => handleFilterChange('all')}
                  className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
                >
                  View All Restaurants
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginated.data.map((venue) => (
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
                
                {/* Pagination Controls */}
                {paginated.pagination.totalPages > 1 && (
                  <nav className="flex items-center justify-center space-x-2 mt-8" aria-label="Pagination" role="navigation">
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={!paginated.pagination.hasPrev}
                      className="px-4 py-2 bg-warmWhite/10 text-warmWhite rounded-lg hover:bg-warmWhite/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Go to previous page"
                    >
                      ← Previous
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: Math.min(5, paginated.pagination.totalPages) }, (_, i) => {
                        let pageNum;
                        if (paginated.pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= paginated.pagination.totalPages - 2) {
                          pageNum = paginated.pagination.totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'bg-gold text-black'
                                : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                            }`}
                            aria-label={`Go to page ${pageNum}`}
                            aria-current={currentPage === pageNum ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={!paginated.pagination.hasNext}
                      className="px-4 py-2 bg-warmWhite/10 text-warmWhite rounded-lg hover:bg-warmWhite/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Go to next page"
                    >
                      Next →
                    </button>
                  </nav>
                )}
              </>
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
      <BackToHome />
    </>
  );
}
