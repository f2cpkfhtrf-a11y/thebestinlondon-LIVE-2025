import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get unique areas with counts
    const areaCounts = {};
    venues.forEach(venue => {
      if (venue.area || venue.borough) {
        const area = venue.area || venue.borough;
        const normalized = area.toLowerCase().replace(/\s+/g, '-');
        areaCounts[normalized] = (areaCounts[normalized] || 0) + 1;
      }
    });
    
    const areas = Object.entries(areaCounts)
      .map(([slug, count]) => ({
        slug,
        name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        count
      }))
      .sort((a, b) => b.count - a.count);

    return {
      props: {
        areas,
        totalVenues: venues.length
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading areas:', error);
    return {
      props: {
        areas: [],
        totalVenues: 0
      }
    };
  }
}

export default function Areas({ areas, totalVenues }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAreas, setFilteredAreas] = useState(areas);

  useEffect(() => {
    if (searchTerm) {
      const filtered = areas.filter(area => 
        area.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas(areas);
    }
  }, [searchTerm, areas]);

  return (
    <>
      <Head>
        <title>Restaurant Areas in London | {areas.length}+ Areas Covered | The Best in London</title>
        <meta name="description" content={`Explore ${areas.length}+ areas across London with our comprehensive restaurant guide. From Soho to Shoreditch, discover the best dining in every neighborhood.`} />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/areas" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Restaurant Areas in London | The Best in London" />
        <meta property="og:description" content={`Explore ${areas.length}+ areas across London with our comprehensive restaurant guide.`} />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/logo.svg" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/areas" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Restaurant Areas in London | The Best in London" />
        <meta name="twitter:description" content={`Explore ${areas.length}+ areas across London with our comprehensive restaurant guide.`} />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-black">
        <TabContainer currentPath="/areas" pageType="areas">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-black to-charcoal opacity-90"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gradient mb-6">
              Explore Areas
            </h1>
            <p className="text-xl sm:text-2xl text-grey font-sans font-medium mb-4">
              Discover London's Neighborhoods
            </p>
            <p className="text-lg text-grey-light max-w-3xl mx-auto leading-relaxed">
              From the bustling streets of Soho to the trendy vibes of Shoreditch, 
              explore London's diverse areas and their culinary treasures.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-grey-light rounded-lg text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Areas Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                All Areas ({filteredAreas.length})
              </h2>
              <p className="text-lg text-grey max-w-2xl mx-auto">
                Browse restaurants by area across London
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAreas.map((area) => (
                <Link 
                  key={area.slug} 
                  href={`/restaurants-${area.slug}`}
                  className="group"
                >
                  <div className="card p-6 text-center hover:border-gold transition-all duration-300 h-full">
                    <h3 className="font-serif font-semibold text-white text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                      {area.name}
                    </h3>
                    <p className="text-grey text-sm">
                      {area.count} restaurants
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  {totalVenues}+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  {areas.length}+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Areas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  50+
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Boroughs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-serif font-bold text-gold mb-2">
                  100%
                </div>
                <div className="text-grey font-nav uppercase tracking-wider">Coverage</div>
              </div>
            </div>
          </div>
        </section>
        </TabContainer>
      </main>

      <Footer />
    </>
  );
}
