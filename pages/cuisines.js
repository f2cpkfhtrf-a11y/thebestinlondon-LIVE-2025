import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';
import { resolveCuisineImage, resolveHeroImage } from '../lib/resolveHeroImage';
import { getLiveStats } from '../lib/siteStats';
import ImageTile from '../components/tiles/ImageTile';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get unique cuisines with counts
    const cuisineCounts = {};
    venues.forEach(venue => {
      if (venue.cuisines && venue.cuisines.length > 0) {
        venue.cuisines.forEach(cuisine => {
          const normalized = cuisine.toLowerCase().replace(/\s+/g, '-');
          cuisineCounts[normalized] = (cuisineCounts[normalized] || 0) + 1;
        });
      }
    });
    
    const cuisines = Object.entries(cuisineCounts)
      .map(([slug, count]) => ({
        slug,
        name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        count
      }))
      .sort((a, b) => b.count - a.count);
    
    const liveStats = getLiveStats();
    
    return {
      props: {
        cuisines,
        stats: liveStats
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading cuisines:', error);
    return {
      props: {
        cuisines: [],
        stats: { total: 0, areas: 0, cuisines: 0, halal: 0 }
      }
    };
  }
}

export default function Cuisines({ cuisines, stats }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCuisines, setFilteredCuisines] = useState(cuisines);
  
  // Get hero image for cuisines page
  const hero = resolveHeroImage({ type: "list-all" });

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = cuisines.filter(cuisine =>
        cuisine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCuisines(filtered);
    } else {
      setFilteredCuisines(cuisines);
    }
  }, [searchQuery, cuisines]);

  return (
    <>
      <Head>
        <title>Cuisines | The Best in London</title>
        <meta name="description" content={`Explore ${cuisines.length} different cuisines across London. From Indian to Italian, discover the best restaurants for every taste.`} />
        <meta name="keywords" content="London cuisines, restaurants by cuisine, Indian restaurants, Italian restaurants, Chinese restaurants London" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/cuisines" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Cuisines | The Best in London" />
        <meta property="og:description" content={`Explore ${cuisines.length} different cuisines across London. From Indian to Italian, discover the best restaurants for every taste.`} />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/cuisines" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cuisines | The Best in London" />
        <meta name="twitter:description" content={`Explore ${cuisines.length} different cuisines across London. From Indian to Italian, discover the best restaurants for every taste.`} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${hero.src}`} />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black">
        <TabContainer currentPath="/cuisines" pageType="cuisines">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal opacity-90"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gradient mb-6">
              Explore Cuisines
            </h1>
            <p className="text-xl text-grey max-w-3xl mx-auto mb-8">
              Discover London's diverse culinary landscape. From traditional British fare to exotic international flavors, 
              find the perfect cuisine for your next dining adventure.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-charcoal-light border border-grey-dark rounded-xl px-6 py-4 text-warmWhite placeholder-grey focus:border-gold focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
        </section>

        {/* Cuisines Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-warmWhite mb-4">
                {filteredCuisines.length} Cuisines Available
              </h2>
              <p className="text-grey">
                Each cuisine page features the best restaurants, ratings, and reviews
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCuisines.map((cuisine) => {
                const cuisineSlug = cuisine.slug.replace('-restaurants-london', '');
                const imageSrc = resolveCuisineImage(cuisineSlug);
                return (
                  <ImageTile
                    key={cuisine.slug}
                    title={cuisine.name}
                    subtitle={`${cuisine.count} restaurant${cuisine.count !== 1 ? 's' : ''}`}
                    href={`/${cuisine.slug}`}
                    src={imageSrc}
                    alt={`${cuisine.name} cuisine in London`}
                  />
                );
              })}
            </div>

            {filteredCuisines.length === 0 && (
              <div className="text-center py-12">
                <p className="text-grey text-lg">No cuisines found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-serif font-bold text-gold mb-2">{stats.cuisines}</div>
                <div className="text-grey font-nav uppercase tracking-wider">Cuisines</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-gold mb-2">{stats.total}</div>
                <div className="text-grey font-nav uppercase tracking-wider">Restaurants</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-gold mb-2">{stats.areas}+</div>
                <div className="text-grey font-nav uppercase tracking-wider">Areas</div>
              </div>
            </div>
          </div>
        </section>
      </TabContainer>
      </main>

      <Footer stats={stats} />
    </>
  );
}
