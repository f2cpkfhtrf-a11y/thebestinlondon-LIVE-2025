import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Group venues by area/borough
    const areaStats = {};
    venues.forEach(venue => {
      const area = venue.borough || venue.address?.borough || 'Other';
      if (!areaStats[area]) {
        areaStats[area] = {
          name: area,
          count: 0,
          halalCount: 0,
          avgRating: 0,
          topCuisines: {}
        };
      }
      
      areaStats[area].count++;
      if (venue.dietary_tags?.halal || venue.dietaryTags?.includes('halal')) {
        areaStats[area].halalCount++;
      }
      areaStats[area].avgRating += venue.rating || 0;
      
      // Track cuisines
      if (venue.cuisines && venue.cuisines.length > 0) {
        venue.cuisines.forEach(cuisine => {
          areaStats[area].topCuisines[cuisine] = (areaStats[area].topCuisines[cuisine] || 0) + 1;
        });
      }
    });
    
    // Calculate averages and sort
    const areas = Object.values(areaStats)
      .map(area => ({
        ...area,
        avgRating: area.count > 0 ? (area.avgRating / area.count).toFixed(1) : 0,
        topCuisine: Object.entries(area.topCuisines)
          .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Restaurant',
        slug: area.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30); // Top 30 areas
    
    // Group by regions
    const regions = {
      'Central London': ['Soho', 'Covent Garden', 'Mayfair', 'Marylebone', 'Fitzrovia', 'Bloomsbury', 'Kings Cross'],
      'East London': ['Shoreditch', 'Whitechapel', 'Spitalfields', 'Bethnal Green', 'Hackney', 'Stratford', 'Canary Wharf'],
      'North London': ['Islington', 'Camden', 'Kensington', 'Notting Hill'],
      'South London': ['Borough', 'Clapham', 'Brixton', 'Greenwich', 'Wimbledon'],
      'West London': ['Chelsea', 'Richmond', 'Hammersmith']
    };
    
    const groupedAreas = {};
    Object.entries(regions).forEach(([region, areaNames]) => {
      groupedAreas[region] = areas.filter(area => 
        areaNames.some(name => area.name.toLowerCase().includes(name.toLowerCase()))
      );
    });
    
    return {
      props: {
        areas,
        groupedAreas,
        totalVenues: venues.length
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        areas: [],
        groupedAreas: {},
        totalVenues: 0
      }
    };
  }
}

export default function Areas({ areas, groupedAreas, totalVenues }) {
  const [selectedRegion, setSelectedRegion] = useState('All');

  return (
    <>
      <Head>
        <title>Restaurant Areas in London | The Best in London</title>
        <meta name="description" content={`Discover restaurants in ${areas.length}+ London areas. From Soho to Shoreditch, find the best dining spots across the capital.`} />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/areas" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Restaurant Areas in London",
          "description": `Directory of restaurants across ${areas.length} London areas`,
          "url": "https://www.thebestinlondon.co.uk/areas",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": areas.length,
            "itemListElement": areas.slice(0, 20).map((area, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Place",
                "name": area.name,
                "description": `${area.count} restaurants in ${area.name}`
              }
            }))
          }
        }) }} />
      </Head>

      <div className="min-h-screen bg-charcoal">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-warmWhite mb-6">
                  London Areas
                </h1>
                <p className="text-xl text-grey max-w-3xl mx-auto mb-8">
                  Discover the best restaurants across London's diverse neighborhoods. 
                  From trendy Shoreditch to elegant Mayfair, find your perfect dining destination.
                </p>
                
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-semibold">{areas.length}+</span>
                    <span className="text-grey">Areas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-semibold">{totalVenues}+</span>
                    <span className="text-grey">Restaurants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-semibold">5</span>
                    <span className="text-grey">Regions</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Region Filter */}
          <section className="py-8 bg-charcoal-light border-b border-grey-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedRegion('All')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    selectedRegion === 'All'
                      ? 'bg-gold text-black'
                      : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                  }`}
                >
                  All Areas
                </button>
                {Object.keys(groupedAreas).map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      selectedRegion === region
                        ? 'bg-gold text-black'
                        : 'bg-charcoal text-grey hover:text-warmWhite border border-grey-dark'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Areas Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedRegion === 'All' ? areas : groupedAreas[selectedRegion] || [])
                  .map((area) => (
                    <Link key={area.slug} href={`/areas/${area.slug}`} className="group">
                      <div className="card p-6 h-full hover:border-gold transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-serif font-semibold text-warmWhite text-xl group-hover:text-gold transition-colors duration-300">
                            {area.name}
                          </h3>
                          <div className="text-right">
                            <div className="text-gold font-semibold text-lg">{area.count}</div>
                            <div className="text-grey text-sm">restaurants</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-grey">Avg Rating</span>
                            <div className="flex items-center gap-1">
                              <span className="text-gold">★</span>
                              <span className="text-warmWhite font-medium">{area.avgRating}</span>
                            </div>
                          </div>
                          
                          {area.halalCount > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-grey">Halal Options</span>
                              <span className="text-warmWhite font-medium">{area.halalCount}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-grey">Top Cuisine</span>
                            <span className="text-warmWhite font-medium">{area.topCuisine}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-grey-dark">
                          <div className="flex items-center text-gold text-sm font-medium group-hover:gap-2 transition-all duration-300">
                            Explore Area
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>

          {/* Special Areas */}
          <section className="py-16 bg-charcoal-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-warmWhite mb-4">
                  Featured Areas
                </h2>
                <p className="text-grey max-w-2xl mx-auto">
                  Discover London's most popular dining destinations
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'East London', href: '/east-london', description: 'Trendy & Diverse', count: groupedAreas['East London']?.length || 0 },
                  { name: 'Central London', href: '/areas/central-london', description: 'Classic & Elegant', count: groupedAreas['Central London']?.length || 0 },
                  { name: 'Halal Near Stations', href: '/halal/near-stations', description: 'Tube Station Access', count: '10+' },
                  { name: 'Near London Eye', href: '/restaurants-near-london-eye', description: 'Tourist Hotspot', count: '50+' }
                ].map((featured) => (
                  <Link key={featured.name} href={featured.href} className="group">
                    <div className="card p-6 text-center hover:border-gold transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                      <h3 className="font-serif font-semibold text-warmWhite text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                        {featured.name}
                      </h3>
                      <p className="text-grey text-sm mb-3">{featured.description}</p>
                      <div className="text-gold font-semibold">{featured.count} venues</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
