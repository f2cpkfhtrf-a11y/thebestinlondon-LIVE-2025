import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme } from '../utils/theme';
import { enhanceVenueData, filterByDietary, sortVenues } from '../utils/venueData';
import { isHalalVenue } from '../utils/halalStations';
import FSABadge from '../components/FSABadge';
import BestOfLondonBadge from '../components/BestOfLondonBadge';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const venuesData = JSON.parse(fileContent);
    const allVenues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    // Filter halal restaurants using improved filtering
    const halalVenues = allVenues
      .map(enhanceVenueData)
      .filter(v => {
        if (!v) return false;
        const { isHalal } = isHalalVenue(v);
        return isHalal;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { 
      props: { 
        venues: halalVenues,
        lastUpdated: (typeof venuesData === 'object' && !Array.isArray(venuesData) && venuesData.lastUpdated) ? venuesData.lastUpdated : new Date().toISOString()
      },
      revalidate: 86400
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return { props: { venues: [], lastUpdated: new Date().toISOString() } };
  }
}

export default function BestHalalRestaurantsLondon({ venues, lastUpdated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterArea, setFilterArea] = useState('all');

  const filtered = useMemo(() => {
    let result = venues;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(term) ||
        v.cuisines?.some(c => c.toLowerCase().includes(term)) ||
        v.area?.toLowerCase().includes(term) ||
        v.borough?.toLowerCase().includes(term)
      );
    }

    // Filter by area
    if (filterArea !== 'all') {
      result = result.filter(v => 
        v.area?.toLowerCase().includes(filterArea.toLowerCase()) ||
        v.borough?.toLowerCase().includes(filterArea.toLowerCase())
      );
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        result = result.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
        break;
      case 'fsa':
        result = result.sort((a, b) => (b.fsa_rating || 0) - (a.fsa_rating || 0));
        break;
      default:
        break;
    }

    return result;
  }, [venues, searchTerm, sortBy, filterArea]);

  // Get unique areas for filter
  const areas = ['all', ...new Set(venues.map(v => v.area || v.borough).filter(Boolean))];

  return (
    <>
      <Head>
        <title>Best Halal Restaurants in London 2025 — {venues.length}+ Verified Venues | The Best in London</title>
        <meta name="description" content={`Discover ${venues.length}+ best halal restaurants in London. Verified halal options with detailed reviews, FSA ratings, and authentic cuisine across all areas.`} />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-halal-restaurants-london" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Halal Restaurants in London",
          "description": `Directory of ${venues.length} verified halal restaurants in London`,
          "url": "https://www.thebestinlondon.co.uk/best-halal-restaurants-london",
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

      <div className="min-h-screen bg-charcoal">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20 mb-6">
                  <span className="text-2xl">☪️</span>
                  <span className="text-green-400 font-semibold">Halal Verified</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-warmWhite mb-6">
                  Best Halal Restaurants in London
                </h1>
                <p className="text-xl text-grey max-w-3xl mx-auto mb-8">
                  Discover {venues.length}+ verified halal restaurants across London. 
                  From authentic Middle Eastern cuisine to modern halal dining experiences.
                </p>
                
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-semibold text-lg">{venues.length}</span>
                    <span className="text-grey">Halal Restaurants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-semibold text-lg">{areas.length - 1}</span>
                    <span className="text-grey">Areas Covered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-semibold text-lg">100%</span>
                    <span className="text-grey">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <section className="py-8 bg-charcoal-light border-b border-grey-dark sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  type="text"
                  placeholder="Search halal restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-charcoal border border-grey-dark rounded-lg px-4 py-3 text-warmWhite placeholder-grey focus:border-gold focus:outline-none transition-colors duration-300"
                />
                <select 
                  value={filterArea} 
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="bg-charcoal border border-grey-dark rounded-lg px-4 py-3 text-warmWhite focus:border-gold focus:outline-none transition-colors duration-300"
                >
                  <option value="all">All Areas</option>
                  {areas.filter(a => a !== 'all').map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-charcoal border border-grey-dark rounded-lg px-4 py-3 text-warmWhite focus:border-gold focus:outline-none transition-colors duration-300"
                >
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="reviews">💬 Most Reviews</option>
                  <option value="fsa">🏥 FSA Rating</option>
                </select>
              </div>
            </div>
          </section>

          {/* Results Count */}
          <section className="py-6 bg-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-grey">
                Showing <span className="text-gold font-semibold">{filtered.length}</span> halal-certified restaurants
              </p>
            </div>
          </section>

          {/* Restaurant Grid */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((venue) => (
                  <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} className="group">
                    <div className="card overflow-hidden h-full group-hover:border-gold transition-all duration-300">
                      <div className="relative h-48">
                        {venue.photos && venue.photos[0] ? (
                          <Image
                            src={venue.photos[0].url}
                            alt={`${venue.name} - Halal restaurant in ${venue.area || 'London'}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=85';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-grey-dark flex items-center justify-center">
                            <span className="text-grey text-sm">No Image</span>
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4">
                          <FSABadge rating={venue.fsa_rating || 5} size="small" showLabel={false} />
                        </div>

                        <div className="absolute top-4 left-4">
                          <BestOfLondonBadge venue={venue} size="small" showTooltip={false} showExplanation={false} />
                        </div>

                        {venue.area && (
                          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-warmWhite px-3 py-1 rounded text-sm font-medium">
                            {venue.area}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-400 text-sm font-medium">☪️ Halal Verified</span>
                        </div>
                        
                        <h3 className="font-serif font-semibold text-warmWhite text-xl mb-2 group-hover:text-gold transition-colors duration-300">
                          {venue.name}
                        </h3>
                        
                        <div className="flex items-center justify-between text-sm text-grey mb-3">
                          <span>{venue.cuisines?.[0] || 'Restaurant'}</span>
                          <span>{venue.price_level ? '£'.repeat(venue.price_level) : '££'}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-grey-dark">
                          <div className="flex items-center gap-1">
                            <span className="text-gold">★</span>
                            <span className="text-warmWhite font-medium">{venue.rating || 'N/A'}</span>
                          </div>
                          {venue.user_ratings_total && (
                            <span className="text-grey text-sm">
                              {venue.user_ratings_total.toLocaleString()} reviews
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-4 p-3 bg-gradient-to-r from-gold to-yellow-400 text-black text-center font-semibold text-sm uppercase tracking-wide rounded">
                          View Details →
                        </div>
                      </div>
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
