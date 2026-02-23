import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToHome from '../../components/BackToHome';
import Breadcrumbs from '../../components/Breadcrumbs';
import { TabContainer } from '../../components/HeroTabs';
import PageHero from '../../components/PageHero';
import { resolveHeroImage, resolveCardImageSync } from '../../lib/resolveHeroImage';
import BestOfLondonBadge from '../../components/BestOfLondonBadge';
import FSABadge from '../../components/FSABadge';
import StandardizedCard from '../../components/StandardizedCard';
import FilterBar from '../../components/FilterBar';
import NewsletterSignup from '../../components/NewsletterSignup';

// Server-side areas data loading
function getAreaList() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const areasPath = path.join(process.cwd(), 'data/areas.json');
    const areasData = JSON.parse(fs.readFileSync(areasPath, 'utf8'));
    return areasData.areas || [];
  } catch (error) {
    console.error('Error loading areas data:', error);
    return [];
  }
}

export async function getServerSideProps({ params }) {
  try {
    const areaSlug = params.slug;
    
    // Get area name from slug and aliases
    const areas = getAreaList();
    const areaData = areas.find(a => a.slug === areaSlug);
    const areaName = areaData ? areaData.name : areaSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    const areaAliases = areaData?.aliases || [];
    
    // Read venues directly from file instead of API call to avoid deployment issues
    const fs = require('fs');
    const path = require('path');
    const venuesPath = path.join(process.cwd(), 'data/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const allVenues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    // Normalize area slug and name for matching
    const areaSlugLower = areaSlug.toLowerCase().trim();
    const areaNameLower = areaName.toLowerCase().trim();
    const areaSlugNormalized = areaSlugLower.replace(/\s+/g, '-');
    
    // Create search terms including aliases
    const searchTerms = [
      areaNameLower,
      areaSlugLower,
      areaSlugNormalized,
      ...areaAliases.map(a => a.toLowerCase())
    ].filter(Boolean);
    
    // Special handling for specific areas
    if (areaSlug === 'chelsea') {
      searchTerms.push('chelsea');
      // Also search for venues with "Chelsea" in name or address even if borough is "Kensington and Chelsea"
    }
    
    // Filter venues by area - try multiple matching strategies
    const venues = allVenues.filter(v => {
      if (!v) return false;
      
      // Try area field (exact match first, then partial)
      if (v.area) {
        const vAreaLower = v.area.toLowerCase().trim();
        const vAreaSlug = vAreaLower.replace(/\s+/g, '-');
        
        // Exact match with area name (case-insensitive)
        if (vAreaLower === areaNameLower) {
          return true;
        }
        
        // Check against all search terms
        for (const term of searchTerms) {
          if (vAreaLower === term || vAreaSlug === term || 
              vAreaLower.includes(term) || term.includes(vAreaLower) ||
              vAreaSlug.includes(term) || term.includes(vAreaSlug)) {
            return true;
          }
        }
      }
      
      // Try borough field
      if (v.borough) {
        const vBoroughLower = v.borough.toLowerCase().trim();
        const vBoroughSlug = vBoroughLower.replace(/\s+/g, '-');
        
        // Special case: Chelsea in "Kensington and Chelsea"
        if (areaSlug === 'chelsea' && (vBoroughLower.includes('chelsea') || vBoroughLower.includes('kensington and chelsea'))) {
          // Also check if venue name or address mentions Chelsea
          const vNameLower = (v.name || '').toLowerCase();
          const vAddrLower = (v.address?.formatted || v.vicinity || '').toLowerCase();
          if (vNameLower.includes('chelsea') || vAddrLower.includes('chelsea')) {
            return true;
          }
        }
        
        // Check against all search terms
        for (const term of searchTerms) {
          if (vBoroughLower === term || vBoroughSlug === term ||
              vBoroughLower.includes(term) || term.includes(vBoroughLower) ||
              vBoroughSlug.includes(term) || term.includes(vBoroughSlug)) {
            return true;
          }
        }
      }
      
      // Try areaSlug field
      if (v.areaSlug && v.areaSlug.toLowerCase() === areaSlugLower) {
        return true;
      }
      
      // Try address/vicinity with all search terms
      if (v.address?.formatted) {
        const addrLower = v.address.formatted.toLowerCase();
        for (const term of searchTerms) {
          if (addrLower.includes(term)) {
            return true;
          }
        }
      }
      
      if (v.vicinity) {
        const vicLower = v.vicinity.toLowerCase();
        for (const term of searchTerms) {
          if (vicLower.includes(term)) {
            return true;
          }
        }
      }
      
      // Special: Check venue name and address for area-specific venues (e.g., "Mestizo Chelsea", "Bluebird Chelsea")
      if (areaSlug === 'chelsea') {
        const vNameLower = (v.name || '').toLowerCase();
        const vAddrLower = (v.address?.formatted || v.vicinity || '').toLowerCase();
        if (vNameLower.includes('chelsea') || vAddrLower.includes('chelsea')) {
          return true;
        }
      }
      
      // Special: Check venue name and address for other areas too (catch restaurants named after area)
      const vNameLower = (v.name || '').toLowerCase();
      const vAddrLower = (v.address?.formatted || v.vicinity || '').toLowerCase();
      for (const term of searchTerms) {
        if (vNameLower.includes(term) || vAddrLower.includes(term)) {
          return true;
        }
      }
      
      return false;
    });
    
    // Don't return 404 if no venues - show empty state instead
    // This ensures all area pages work (zero 404s goal)
    
    // Calculate stats
    const stats = {
      totalVenues: venues.length,
      halalCount: venues.filter(v => v.dietary_tags?.halal || v.dietaryTags?.includes('halal')).length,
      veganCount: venues.filter(v => v.dietary_tags?.vegan || v.dietaryTags?.includes('vegan')).length,
      avgRating: venues.length > 0 ? (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1) : 0,
      topCuisines: {}
    };
    
    // Count cuisines
    venues.forEach(venue => {
      if (venue.cuisines && venue.cuisines.length > 0) {
        venue.cuisines.forEach(cuisine => {
          stats.topCuisines[cuisine] = (stats.topCuisines[cuisine] || 0) + 1;
        });
      }
    });
    
    const topCuisines = Object.entries(stats.topCuisines)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
    
    // Get related areas (other areas with similar venue counts)
    const allAreasWithCounts = {};
    allVenues.forEach(v => {
      const vArea = v.area || v.borough;
      if (vArea && vArea.toLowerCase() !== areaNameLower) {
        allAreasWithCounts[vArea] = (allAreasWithCounts[vArea] || 0) + 1;
      }
    });
    
    const relatedAreas = Object.entries(allAreasWithCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name]) => ({
        name,
        href: `/areas/${name.toLowerCase().replace(/\s+/g, '-')}`
      }));
    
    return {
      props: {
        areaName,
        areaSlug,
        venues: venues.sort((a, b) => (b.rating || 0) - (a.rating || 0)),
        stats,
        topCuisines,
        relatedAreas
      }
    };
  } catch (error) {
    console.error('Error loading area data:', error);
    // Return empty state instead of 404
    return {
      props: {
        areaName: areaSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        areaSlug,
        venues: [],
        stats: { totalVenues: 0, halalCount: 0, veganCount: 0, avgRating: 0 },
        topCuisines: [],
        relatedAreas: []
      }
    };
  }
}

export default function AreaPage({ areaName, areaSlug, venues = [], stats = { totalVenues: 0, halalCount: 0, veganCount: 0, avgRating: 0 }, topCuisines = [], relatedAreas = [] }) {
  const [filteredVenues, setFilteredVenues] = useState(venues);
  
  // Update filteredVenues when venues prop changes
  useEffect(() => {
    setFilteredVenues(venues);
  }, [venues]);
  
  // Safety check - if no venues, show empty state
  if (!venues || venues.length === 0) {
    return (
      <>
        <Head>
          <title>Restaurants in {areaName} | The Best in London</title>
          <meta name="description" content={`Discover restaurants in ${areaName}, London.`} />
          <link rel="canonical" href={`https://www.thebestinlondon.co.uk/areas/${areaSlug}`} />
        </Head>
        <Header />
        <main className="min-h-screen bg-black text-warmWhite">
          <TabContainer currentPath={`/areas/${areaSlug}`} pageType="list-area">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h1 className="text-3xl font-serif font-bold text-white mb-4">Restaurants in {areaName}</h1>
              <p className="text-lg text-grey mb-8">No restaurants found in this area yet. Check back soon!</p>
              <Link href="/areas" className="inline-block px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors">
                Browse All Areas
              </Link>
            </div>
          </TabContainer>
          <Footer />
          <BackToHome />
        </main>
      </>
    );
  }
  
  // Get hero image for area page
  const hero = resolveHeroImage({ type: "list-area", areaSlug });

  return (
    <>
      <Head>
        <title>Best Restaurants in {areaName} London {new Date().getFullYear()} | Top Rated {areaName} Restaurants | The Best in London</title>
        <meta name="description" content={`Discover the best restaurants in ${areaName}, London ${new Date().getFullYear()}. Find ${stats.totalVenues}+ top-rated ${areaName} restaurants with verified Google reviews, FSA ratings, and authentic cuisine. Complete guide to dining in ${areaName}, London.`} />
        <meta name="keywords" content={`best restaurants ${areaName}, restaurants ${areaName} London, ${areaName} restaurants, best restaurants near me ${areaName}, where to eat ${areaName}, ${areaName} dining guide, top restaurants ${areaName} ${new Date().getFullYear()}, London restaurants ${areaName}`} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/areas/${areaSlug}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`Best Restaurants in ${areaName} London ${new Date().getFullYear()} | Top Rated ${areaName} Restaurants`} />
        <meta property="og:description" content={`Discover the best restaurants in ${areaName}, London ${new Date().getFullYear()}. ${stats.totalVenues}+ top-rated ${areaName} restaurants with verified reviews and FSA ratings.`} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        <meta property="og:url" content={`https://www.thebestinlondon.co.uk/areas/${areaSlug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Best Restaurants in ${areaName} London ${new Date().getFullYear()} | Top Rated ${areaName} Restaurants`} />
        <meta name="twitter:description" content={`Discover the best restaurants in ${areaName}, London ${new Date().getFullYear()}. ${stats.totalVenues}+ top-rated ${areaName} restaurants with verified reviews and FSA ratings.`} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `Best Restaurants in ${areaName}`,
          "description": `Directory of ${stats.totalVenues} top-rated restaurants in ${areaName}`,
          "url": `https://www.thebestinlondon.co.uk/areas/${areaSlug}`,
          "image": `https://www.thebestinlondon.co.uk${hero.src}`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": venues.length,
            "itemListElement": venues.slice(0, 20).map((venue, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Restaurant",
                "name": venue.name,
                "address": venue.address?.formatted || venue.formatted_address,
                ...(venue.rating && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": venue.rating } })
              }
            }))
          }
        }) }} />
      </Head>

      <div className="min-h-screen bg-black text-warmWhite">
        <Header />
        <TabContainer currentPath={`/areas/${areaSlug}`} pageType="list-area">
          {/* Breadcrumbs */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <Breadcrumbs />
          </div>
          
          {/* Page Hero */}
          <PageHero 
            title={`${areaName} Restaurants`}
            subtitle={`Discover the best dining experiences in ${areaName}. From casual eateries to fine dining, find your perfect meal.`}
            stats={[
              { label: "Restaurants", value: stats.totalVenues },
              { label: "Halal Options", value: stats.halalCount },
              { label: "Avg Rating", value: stats.avgRating }]}
            image={hero}
            center={true}
          />

          {/* Filter Bar */}
          <FilterBar
            venues={venues}
            onFilteredVenues={setFilteredVenues}
            area={areaName}
            showAreaFilter={false}
            showCuisineFilter={true}
            showDietaryFilter={true}
            showRatingFilter={true}
            showOpenNowFilter={true}
          />

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-warmWhite">
                Best Restaurants in {areaName}, London {new Date().getFullYear()}
              </h2>
              <div className="text-sm text-grey">
                Showing {filteredVenues.length} of {stats.totalVenues} restaurants
              </div>
            </div>

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue, index) => (
                <Link key={venue.id || venue.place_id || index} href={`/restaurant/${venue.slug}`}>
                  <article className="group bg-black-light rounded-xl overflow-hidden hover:bg-black-light/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <StandardizedCard 
                      venue={venue}
                      className="h-full"
                      showBadges={true}
                      showRating={true}
                      showLocation={true}
                    />
                  </article>
                </Link>
              ))}
            </div>

            {/* SEO Content Block - Keyword Rich */}
            <section className="max-w-4xl mx-auto mt-12 py-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-warmWhite mb-6">
                Discover the Best Restaurants in {areaName}, London {new Date().getFullYear()}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-grey mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Wide Range of Options</h3>
                  <p>Explore <strong className="text-gold">{stats.totalVenues}+ restaurants in {areaName}</strong>, from casual dining to fine dining establishments. Whether you're looking for <strong className="text-gold">restaurants near me</strong> or exploring new areas, we have you covered.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Verified Reviews</h3>
                  <p>All <strong className="text-gold">restaurants in {areaName}</strong> have verified Google reviews and ratings. Find the best-rated restaurants based on real customer experiences.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Diverse Cuisines</h3>
                  <p>From <strong className="text-gold">Indian restaurants {areaName}</strong> to <strong className="text-gold">Italian restaurants {areaName}</strong>, discover diverse dining options. Find halal, vegan, and vegetarian-friendly venues too.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Easy Booking</h3>
                  <p>Many <strong className="text-gold">restaurants {areaName} London</strong> offer online booking. Book a table directly through our site or call the restaurant to make a reservation.</p>
                </div>
              </div>
            </section>

            {/* Empty State - Filtered */}
            {filteredVenues.length === 0 && venues.length > 0 && (
              <div className="text-center py-12">
                <div className="text-grey text-lg mb-4">No restaurants found matching your filters</div>
                <button 
                  onClick={() => setFilteredVenues(venues)} 
                  className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Newsletter Signup */}
            <NewsletterSignup 
              location={`area:${areaSlug}`}
              title={`Stay Updated on ${areaName} Restaurants`}
              description={`Get notified about new restaurant openings and special offers in ${areaName}.`}
              variant="inline"
            />

            {/* Related Linking Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {/* Popular Cuisines in Area */}
              {topCuisines.length > 0 && (
                <div className="bg-black-light rounded-lg p-6">
                  <h3 className="text-xl font-serif font-bold text-warmWhite mb-4">Popular Cuisines in {areaName}</h3>
                  <div className="flex flex-wrap gap-3">
                    {topCuisines.map((cuisine) => (
                      <Link 
                        key={cuisine.name}
                        href={`/${cuisine.name.toLowerCase().replace(/\s+/g, '-')}-restaurants-london`}
                        className="inline-block px-4 py-2 bg-charcoal text-warmWhite rounded-lg border border-grey-dark hover:border-gold hover:text-gold transition-colors"
                      >
                        {cuisine.name} ({cuisine.count})
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Similar Areas */}
              {relatedAreas.length > 0 && (
                <div className="bg-black-light rounded-lg p-6">
                  <h3 className="text-xl font-serif font-bold text-warmWhite mb-4">Similar Areas</h3>
                  <div className="flex flex-wrap gap-3">
                    {relatedAreas.map((area) => (
                      <Link 
                        key={area.href}
                        href={area.href}
                        className="inline-block px-4 py-2 bg-charcoal text-warmWhite rounded-lg border border-grey-dark hover:border-gold hover:text-gold transition-colors"
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabContainer>
      </div>
      <Footer />
      <BackToHome />
    </>
  );
}
