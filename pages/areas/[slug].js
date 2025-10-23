import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToHome from '../../components/BackToHome';
import { TabContainer } from '../../components/HeroTabs';
import PageHero from '../../components/PageHero';
import { resolveHeroImage } from '../../lib/resolveHeroImage';
import BestOfLondonBadge from '../../components/BestOfLondonBadge';
import FSABadge from '../../components/FSABadge';
import StandardizedCard from '../../components/StandardizedCard';
const { areaList, normaliseArea } = require('../../lib/areas');

export async function getStaticPaths() {
  try {
    // Use our normalized area list
    const areas = areaList();
    return {
      paths: areas.map(area => ({
        params: { slug: area.slug }
      })),
      fallback: "blocking"
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: "blocking"
    };
  }
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const allVenues = Array.isArray(data) ? data : (data.venues || []);
    
    // Find area by slug
    const areaSlug = params.slug;
    const areas = areaList();
    const areaData = areas.find(a => a.slug === areaSlug);
    const areaName = areaData ? areaData.name : areaSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    // Filter venues for this area using normalized matching
    const venues = allVenues.filter(venue => {
      const venueArea = venue.borough || venue.area || venue.address?.borough || '';
      const normalizedVenueArea = normaliseArea(venueArea);
      return normalizedVenueArea === areaSlug || normaliseArea(venue.area) === areaSlug;
    });
    
    if (venues.length === 0) {
      return {
        notFound: true
      };
    }
    
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
    
    return {
      props: {
        areaName,
        areaSlug,
        venues: venues.sort((a, b) => (b.rating || 0) - (a.rating || 0)),
        stats,
        topCuisines
      }
    };
  } catch (error) {
    console.error('Error loading area data:', error);
    return {
      notFound: true
    };
  }
}

export default function AreaPage({ areaName, areaSlug, venues, stats, topCuisines }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  
  // Get hero image for area page
  const hero = resolveHeroImage({ type: "list-area", areaSlug });

  const filteredVenues = useMemo(() => {
    let filtered = venues;
    
    // Apply filters
    switch (activeFilter) {
      case 'halal':
        filtered = venues.filter(v => v.dietary_tags?.halal || v.dietaryTags?.includes('halal'));
        break;
      case 'vegan':
        filtered = venues.filter(v => v.dietary_tags?.vegan || v.dietaryTags?.includes('vegan'));
        break;
      case 'top-rated':
        filtered = venues.filter(v => v.rating >= 4.5);
        break;
      case 'budget':
        filtered = venues.filter(v => v.price_level <= 2);
        break;
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered = filtered.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return filtered;
  }, [venues, activeFilter, sortBy]);

  const filters = [
    { id: 'all', label: 'All', count: venues.length, emoji: '🍽️' },
    { id: 'halal', label: 'Halal', count: stats.halalCount, emoji: '☪️' },
    { id: 'vegan', label: 'Vegan', count: stats.veganCount, emoji: '🌱' },
    { id: 'top-rated', label: 'Top Rated', count: venues.filter(v => v.rating >= 4.5).length, emoji: '⭐' },
    { id: 'budget', label: 'Budget', count: venues.filter(v => v.price_level <= 2).length, emoji: '💰' }];

  return (
    <>
      <Head>
        <title>Best Restaurants in {areaName} | The Best in London</title>
        <meta name="description" content={`Discover ${stats.totalVenues}+ best restaurants in ${areaName}. Halal, vegan, and top-rated options with detailed reviews and ratings.`} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/areas/${areaSlug}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`Best Restaurants in ${areaName} | The Best in London`} />
        <meta property="og:description" content={`Discover ${stats.totalVenues}+ best restaurants in ${areaName}. Halal, vegan, and top-rated options with detailed reviews and ratings.`} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        <meta property="og:url" content={`https://www.thebestinlondon.co.uk/areas/${areaSlug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Best Restaurants in ${areaName} | The Best in London`} />
        <meta name="twitter:description" content={`Discover ${stats.totalVenues}+ best restaurants in ${areaName}. Halal, vegan, and top-rated options with detailed reviews and ratings.`} />
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

      <Header />
      
      <main className="min-h-screen bg-black text-warmWhite">
        <TabContainer currentPath={`/areas/${areaSlug}`} pageType="list-area">
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

          {/* Filters */}
          <section className="py-8 bg-charcoal-light border-b border-grey-dark sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === filter.id
                          ? 'bg-gold text-black'
                          : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                      }`}
                    >
                      <span className="mr-2">{filter.emoji}</span>
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-grey text-sm">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-charcoal border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="rating">Rating</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Top Cuisines */}
          {topCuisines.length > 0 && (
            <section className="py-12 bg-charcoal">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-serif font-semibold text-warmWhite mb-6">
                  Popular Cuisines in {areaName}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {topCuisines.map((cuisine, index) => (
                    <Link
                      key={cuisine.name}
                      href={`/${cuisine.name.toLowerCase()}-restaurants-london`}
                      className="px-4 py-2 bg-charcoal-light border border-grey-dark rounded-lg text-grey hover:text-gold hover:border-gold transition-colors duration-300"
                    >
                      {cuisine.name} ({cuisine.count})
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Restaurants Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-semibold text-warmWhite">
                  {activeFilter === 'all' ? 'All Restaurants' :
                   activeFilter === 'halal' ? 'Halal Restaurants' :
                   activeFilter === 'vegan' ? 'Vegan Restaurants' :
                   activeFilter === 'top-rated' ? 'Top Rated (4.5+)' :
                   activeFilter === 'budget' ? 'Budget Options' :
                   'Restaurants'}
                </h2>
                <span className="text-grey">
                  {filteredVenues.length} restaurants
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                  <StandardizedCard 
                    key={venue.place_id} 
                    venue={venue} 
                  />
                ))}
              </div>
            </div>
          </section>
        </TabContainer>
      </main>

      <Footer />
      <BackToHome />
    </>
  );
}
