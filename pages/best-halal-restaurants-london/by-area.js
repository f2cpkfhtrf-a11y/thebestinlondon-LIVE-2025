import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { TabContainer } from '../../components/HeroTabs';
import PageHero from '../../components/PageHero';
import ImageWithFallback from '../../components/ImageWithFallback';
import { resolveHeroImage, resolveCardImageSync } from '../../lib/resolveHeroImage';
import { theme } from '../../utils/theme';
import { enhanceVenueData, filterByDietary, sortVenues } from '../../utils/venueData';
import { isHalalVenue } from '../../utils/halalStations';
import FSABadge from '../../components/FSABadge';
import BestOfLondonBadge from '../../components/BestOfLondonBadge';
import { useRouter } from 'next/router';

const ASSET_VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1';

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

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const venuesData = JSON.parse(fileContent);
    const allVenues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    // Filter halal restaurants
    const halalVenues = allVenues
      .map(enhanceVenueData)
      .filter(v => {
        if (!v) return false;
        const { isHalal } = isHalalVenue(v);
        return isHalal;
      });
    
    // Get unique areas
    const areas = [...new Set(halalVenues.map(v => v.area || v.borough).filter(Boolean))].sort();
    
    // Group venues by area
    const venuesByArea = {};
    areas.forEach(area => {
      venuesByArea[area] = halalVenues.filter(v => 
        (v.area && v.area === area) || (v.borough && v.borough === area)
      ).sort((a, b) => (b.rating || 0) - (a.rating || 0));
    });
    
    return { 
      props: { 
        venuesByArea,
        areas,
        totalHalalVenues: halalVenues.length
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return { props: { venuesByArea: {}, areas: [], totalHalalVenues: 0 } };
  }
}

export default function HalalRestaurantsByArea({ venuesByArea, areas, totalHalalVenues }) {
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState(router.query.area || 'all');
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page) || 1);
  const [itemsPerPage] = useState(50);
  
  // Get hero image
  const hero = resolveHeroImage({ type: "halal", scope: "list" });
  
  // Filter venues by area
  const filteredVenues = useMemo(() => {
    if (selectedArea === 'all') {
      // Combine all areas, sorted by rating
      return Object.values(venuesByArea)
        .flat()
        .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return venuesByArea[selectedArea] || [];
  }, [selectedArea, venuesByArea]);
  
  // Paginate results
  const paginated = useMemo(() => {
    return paginateData(filteredVenues, currentPage, itemsPerPage);
  }, [filteredVenues, currentPage, itemsPerPage]);
  
  // Update URL when filters change
  const handleAreaChange = (area) => {
    setSelectedArea(area);
    setCurrentPage(1);
    router.push(`/best-halal-restaurants-london/by-area?area=${encodeURIComponent(area)}`, undefined, { shallow: true });
  };
  
  return (
    <>
      <Head>
        <title>Best Halal Restaurants in London by Area | {selectedArea !== 'all' ? selectedArea : 'All Areas'} | The Best in London</title>
        <meta name="description" content={`Discover ${filteredVenues.length}+ halal restaurants in ${selectedArea !== 'all' ? selectedArea : 'London'}. Verified halal options with detailed reviews and FSA ratings.`} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/best-halal-restaurants-london/by-area${selectedArea !== 'all' ? `?area=${encodeURIComponent(selectedArea)}` : ''}${currentPage > 1 ? `&page=${currentPage}` : ''}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Best Halal Restaurants in ${selectedArea !== 'all' ? selectedArea : 'London'} | The Best in London`} />
        <meta property="og:description" content={`Discover ${filteredVenues.length}+ halal restaurants in ${selectedArea !== 'all' ? selectedArea : 'London'}.`} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="alternate" hrefLang="en-GB" href={`https://www.thebestinlondon.co.uk/best-halal-restaurants-london/by-area${selectedArea !== 'all' ? `?area=${encodeURIComponent(selectedArea)}` : ''}${currentPage > 1 ? `&page=${currentPage}` : ''}`} />
        <link rel="alternate" hrefLang="en" href={`https://www.thebestinlondon.co.uk/best-halal-restaurants-london/by-area${selectedArea !== 'all' ? `?area=${encodeURIComponent(selectedArea)}` : ''}${currentPage > 1 ? `&page=${currentPage}` : ''}`} />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `Halal Restaurants in ${selectedArea !== 'all' ? selectedArea : 'London'}`,
          "description": `Verified halal restaurants in ${selectedArea !== 'all' ? selectedArea : 'London'}`,
          "url": `https://www.thebestinlondon.co.uk/best-halal-restaurants-london/by-area${selectedArea !== 'all' ? `?area=${encodeURIComponent(selectedArea)}` : ''}`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filteredVenues.length,
            "itemListElement": paginated.data.slice(0, 10).map((venue, index) => ({
              "@type": "ListItem",
              "position": (currentPage - 1) * itemsPerPage + index + 1,
              "item": {
                "@type": "Restaurant",
                "name": venue.name,
                "url": `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`,
                "address": venue.address ? {
                  "@type": "PostalAddress",
                  "addressLocality": venue.area || venue.borough,
                  "addressCountry": "GB"
                } : undefined
              }
            }))
          }
        }) }} />
      </Head>
      
      <div className="min-h-screen" style={{ backgroundColor: theme.colors.bg.primary }}>
        <Header />
        
        <TabContainer currentPath="/best-halal-restaurants-london" pageType="halal">
          <PageHero 
            title="Halal Restaurants by Area"
            subtitle={`${totalHalalVenues}+ verified halal restaurants across London's neighborhoods`}
            image={hero}
            stats={[
              { label: "Total Halal", value: totalHalalVenues },
              { label: "Areas", value: areas.length },
              { label: "Selected Area", value: selectedArea !== 'all' ? filteredVenues.length : totalHalalVenues }
            ]}
          />
          
          {/* Area Filter */}
          <div className="sticky top-16 z-30 bg-black/95 backdrop-blur-sm border-b border-grey-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAreaChange('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedArea === 'all' 
                      ? 'bg-gold text-black' 
                      : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                  }`}
                >
                  All Areas ({totalHalalVenues})
                </button>
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleAreaChange(area)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      selectedArea === area 
                        ? 'bg-gold text-black' 
                        : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                    }`}
                  >
                    {area} ({(venuesByArea[area] || []).length})
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-warmWhite mb-2">
                {selectedArea !== 'all' ? `${selectedArea} Halal Restaurants` : 'All Halal Restaurants'}
              </h2>
              <p className="text-grey">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredVenues.length)} of {filteredVenues.length} restaurants
              </p>
            </div>
            
            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginated.data.map((venue, index) => {
                const imageUrl = resolveCardImageSync({ venue });
                
                return (
                  <Link key={venue.place_id || index} href={`/restaurant/${venue.slug}`}>
                    <article className="group bg-black-light rounded-xl overflow-hidden hover:bg-black-light/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={`${imageUrl}?v=${ASSET_VERSION}`}
                          alt={`${venue.name} - ${venue.cuisines?.join(', ') || 'restaurant'}`}
                          fallbackSrc={`/images/heroes/site/default-card.webp?v=${ASSET_VERSION}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        <div className="absolute top-3 right-3">
                          <BestOfLondonBadge venue={venue} size="small" showTooltip={false} showExplanation={false} />
                        </div>
                        <div className="absolute top-3 left-3">
                          <FSABadge rating={venue.fsa_rating || 5} size="small" showLabel={false} />
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-serif font-bold text-warmWhite mb-2 group-hover:text-gold transition-colors duration-300">
                          {venue.name}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-gold text-lg">★</span>
                          <span className="text-warmWhite font-semibold">{venue.rating?.toFixed(1) || 'N/A'}</span>
                          <span className="text-grey text-sm">({venue.user_ratings_total || venue.review_count || 0} reviews)</span>
                        </div>
                        
                        <div className="text-grey text-sm mb-3">
                          {venue.area || venue.borough}
                          {venue.cuisines && venue.cuisines.length > 0 && (
                            <span className="ml-2">• {venue.cuisines[0]}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-grey">
                            {venue.price_level && '£'.repeat(venue.price_level)}
                          </div>
                          <div className="text-sm text-gold font-medium group-hover:text-gold/80 transition-colors duration-300">
                            View Details →
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
            
            {/* Pagination */}
            {paginated.pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => {
                    const newPage = currentPage - 1;
                    setCurrentPage(newPage);
                    router.push(`/best-halal-restaurants-london/by-area?area=${encodeURIComponent(selectedArea)}&page=${newPage}`, undefined, { shallow: true });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={!paginated.pagination.hasPrev}
                  className="px-4 py-2 bg-warmWhite/10 text-warmWhite rounded-lg hover:bg-warmWhite/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  Previous
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
                          router.push(`/best-halal-restaurants-london/by-area?area=${encodeURIComponent(selectedArea)}&page=${pageNum}`, undefined, { shallow: true });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-gold text-black'
                            : 'bg-warmWhite/10 text-warmWhite hover:bg-warmWhite/20'
                        }`}
                        aria-label={`Page ${pageNum}`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => {
                    const newPage = currentPage + 1;
                    setCurrentPage(newPage);
                    router.push(`/best-halal-restaurants-london/by-area?area=${encodeURIComponent(selectedArea)}&page=${newPage}`, undefined, { shallow: true });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={!paginated.pagination.hasNext}
                  className="px-4 py-2 bg-warmWhite/10 text-warmWhite rounded-lg hover:bg-warmWhite/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </TabContainer>
        
        <Footer />
      </div>
    </>
  );
}

