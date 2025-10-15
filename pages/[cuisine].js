import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import FSABadge from '../components/FSABadge';
import fs from 'fs';
import path from 'path';

export default function CuisinePage({ cuisine, venues, totalVenues }) {
  const [selectedDiet, setSelectedDiet] = useState('all');
  
  const filteredVenues = useMemo(() => {
    if (selectedDiet === 'all') return venues;
    return venues.filter(v => 
      v.dietaryTags?.some(tag => tag.toLowerCase() === selectedDiet.toLowerCase())
    );
  }, [venues, selectedDiet]);

  const cuisineTitle = cuisine.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const dietaryCounts = useMemo(() => ({
    halal: venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'halal')).length,
    vegetarian: venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'vegetarian')).length,
    vegan: venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'vegan')).length,
    'gluten-free': venues.filter(v => v.dietaryTags?.some(t => t.toLowerCase() === 'gluten-free')).length,
  }), [venues]);

  return (
    <>
      <Head>
        <title>{cuisineTitle} Restaurants in London | BestOfLondon</title>
        <meta name="description" content={`Discover the best ${cuisineTitle.toLowerCase()} restaurants in London. Curated, verified, and updated daily.`} />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
        {/* Header */}
        <header className="border-b" style={{ borderColor: '#1F1F1F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="flex items-center space-x-3">
                  <img src="/logo.svg" alt="BestOfLondon" className="h-8" />
                  <span className="text-xl font-bold" style={{ color: '#FAFAFA', fontFamily: 'Playfair Display' }}>
                    BestOfLondon
                  </span>
                </a>
              </Link>
              <nav className="flex items-center space-x-8">
                <Link href="/restaurants">
                  <a style={{ color: '#9AA0A6' }} className="hover:opacity-80">Restaurants</a>
                </Link>
                <Link href="/">
                  <a style={{ color: '#9AA0A6' }} className="hover:opacity-80">Home</a>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="border-b" style={{ borderColor: '#1F1F1F', background: 'linear-gradient(180deg, #0B0B0B 0%, #161616 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#FAFAFA', fontFamily: 'Playfair Display' }}>
              {cuisineTitle} Restaurants
            </h1>
            <p className="text-xl mb-2" style={{ color: '#9AA0A6' }}>
              {totalVenues} curated {cuisineTitle.toLowerCase()} restaurants in London
            </p>
            <p className="text-sm" style={{ color: '#D4AF37' }}>
              Verified • FSA Rated • Updated Daily
            </p>
          </div>
        </div>

        {/* Dietary Filters */}
        {totalVenues > 0 && (
          <div className="border-b" style={{ borderColor: '#1F1F1F', backgroundColor: '#0F0F0F' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDiet('all')}
                  className="px-6 py-2 rounded-full transition-all"
                  style={{
                    backgroundColor: selectedDiet === 'all' ? '#D4AF37' : '#1F1F1F',
                    color: selectedDiet === 'all' ? '#0B0B0B' : '#FAFAFA',
                    fontWeight: selectedDiet === 'all' ? '600' : '400'
                  }}
                >
                  All ({totalVenues})
                </button>
                {dietaryCounts.halal > 0 && (
                  <button
                    onClick={() => setSelectedDiet('halal')}
                    className="px-6 py-2 rounded-full transition-all"
                    style={{
                      backgroundColor: selectedDiet === 'halal' ? '#D4AF37' : '#1F1F1F',
                      color: selectedDiet === 'halal' ? '#0B0B0B' : '#FAFAFA',
                      fontWeight: selectedDiet === 'halal' ? '600' : '400'
                    }}
                  >
                    Halal ({dietaryCounts.halal})
                  </button>
                )}
                {dietaryCounts.vegetarian > 0 && (
                  <button
                    onClick={() => setSelectedDiet('vegetarian')}
                    className="px-6 py-2 rounded-full transition-all"
                    style={{
                      backgroundColor: selectedDiet === 'vegetarian' ? '#D4AF37' : '#1F1F1F',
                      color: selectedDiet === 'vegetarian' ? '#0B0B0B' : '#FAFAFA',
                      fontWeight: selectedDiet === 'vegetarian' ? '600' : '400'
                    }}
                  >
                    Vegetarian ({dietaryCounts.vegetarian})
                  </button>
                )}
                {dietaryCounts.vegan > 0 && (
                  <button
                    onClick={() => setSelectedDiet('vegan')}
                    className="px-6 py-2 rounded-full transition-all"
                    style={{
                      backgroundColor: selectedDiet === 'vegan' ? '#D4AF37' : '#1F1F1F',
                      color: selectedDiet === 'vegan' ? '#0B0B0B' : '#FAFAFA',
                      fontWeight: selectedDiet === 'vegan' ? '600' : '400'
                    }}
                  >
                    Vegan ({dietaryCounts.vegan})
                  </button>
                )}
                {dietaryCounts['gluten-free'] > 0 && (
                  <button
                    onClick={() => setSelectedDiet('gluten-free')}
                    className="px-6 py-2 rounded-full transition-all"
                    style={{
                      backgroundColor: selectedDiet === 'gluten-free' ? '#D4AF37' : '#1F1F1F',
                      color: selectedDiet === 'gluten-free' ? '#0B0B0B' : '#FAFAFA',
                      fontWeight: selectedDiet === 'gluten-free' ? '600' : '400'
                    }}
                  >
                    Gluten-Free ({dietaryCounts['gluten-free']})
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Venues Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredVenues.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl mb-4" style={{ color: '#9AA0A6' }}>
                No {selectedDiet !== 'all' ? selectedDiet : ''} restaurants found
              </p>
              <Link href="/">
                <a className="inline-block px-8 py-3 rounded-full" style={{ backgroundColor: '#D4AF37', color: '#0B0B0B', fontWeight: '600' }}>
                  Back to Homepage
                </a>
              </Link>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
              gap: '1.5rem'
            }}>
              {filteredVenues.map((venue) => (
                <Link 
                  href={`/restaurant/${venue.slug}`} 
                  key={venue.place_id || venue.slug}
                >
                  <a style={{ textDecoration: 'none' }}>
                    <div style={{
                      backgroundColor: '#1A1A1A',
                      border: '1px solid #2A2A2A',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    className="venue-card"
                    >
                      
                      {/* Image */}
                      {venue.photos && venue.photos[0] && (
                        <div style={{
                          position: 'relative',
                          width: '100%',
                          height: '200px',
                          borderRadius: '0.75rem',
                          overflow: 'hidden',
                          marginBottom: '1rem',
                          backgroundColor: '#2A2A2A'
                        }}>
                          <img 
                            src={venue.photos[0].url}
                            alt={venue.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          {venue.fsa_rating && (
                            <div style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px'
                            }}>
                              <FSABadge rating={venue.fsa_rating} size="large" variant="card" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Header */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                          <h3 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: '#FAFAFA',
                            margin: 0,
                            lineHeight: 1.3
                          }}>
                            {venue.name}
                          </h3>
                          {venue.rating && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                              <span style={{ color: '#D4AF37', fontSize: '1.25rem' }}>★</span>
                              <span style={{ color: '#FAFAFA', fontSize: '1.125rem', fontWeight: 700 }}>
                                {venue.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Cuisine & Price */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                          {venue.cuisines && venue.cuisines[0] && (
                            <span style={{
                              color: '#9AA0A6',
                              fontSize: '0.875rem',
                              textTransform: 'capitalize'
                            }}>
                              {venue.cuisines[0]}
                            </span>
                          )}
                          {venue.price_level && (
                            <span style={{ color: '#D4AF37', fontSize: '0.875rem', fontWeight: 600 }}>
                              {'£'.repeat(venue.price_level)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{
                        color: '#9AA0A6',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1
                      }}>
                        {venue.description}
                      </p>

                      {/* Footer */}
                      <div style={{ 
                        paddingTop: '1rem',
                        borderTop: '1px solid #2A2A2A',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.75rem',
                        color: '#666'
                      }}>
                        <span>{venue.user_ratings_total?.toLocaleString() || 0} reviews</span>
                        {venue.fsa_rating && (
                          <span style={{ 
                            color: '#10B981',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <span>✓</span> FSA {venue.fsa_rating}/5
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t mt-16" style={{ borderColor: '#1F1F1F', backgroundColor: '#0F0F0F' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <Link href="/">
                <a className="inline-flex items-center space-x-3 mb-4">
                  <img src="/logo.svg" alt="BestOfLondon" className="h-8" />
                  <span className="text-xl font-bold" style={{ color: '#FAFAFA', fontFamily: 'Playfair Display' }}>
                    BestOfLondon
                  </span>
                </a>
              </Link>
              <p style={{ color: '#9AA0A6' }} className="text-sm">
                Curated • Verified • Updated Daily
              </p>
              <p style={{ color: '#6B7280' }} className="text-xs mt-4">
                © 2025 BestOfLondon. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .venue-card:hover {
          transform: translateY(-4px);
          border-color: #D4AF37 !important;
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.15);
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    
    // Check if file exists
    if (!fs.existsSync(venuesPath)) {
      console.warn('venues.json not found during build - using fallback');
      return { paths: [], fallback: 'blocking' };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(data) ? data : (data.venues || []);

    if (!venues || venues.length === 0) {
      console.warn('No venues found - using fallback');
      return { paths: [], fallback: 'blocking' };
    }

    // Get all unique cuisines
    const cuisines = new Set();
    venues.forEach(venue => {
      if (venue.cuisines && Array.isArray(venue.cuisines)) {
        venue.cuisines.forEach(cuisine => {
          if (cuisine) {
            cuisines.add(cuisine.toLowerCase().trim());
          }
        });
      }
    });

    const paths = Array.from(cuisines).map(cuisine => ({
      params: { cuisine: cuisine.replace(/\s+/g, '-') }
    }));

    console.log(`Generated ${paths.length} cuisine paths during build`);

    // Use blocking fallback so pages can be generated on-demand if not pre-built
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    // Return empty paths with blocking fallback - pages will be generated on-demand
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      console.error('venues.json not found');
      return { notFound: true };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const allVenues = Array.isArray(data) ? data : (data.venues || []);

    if (!allVenues || allVenues.length === 0) {
      console.error('No venues in data');
      return { notFound: true };
    }

    // Convert URL cuisine param back to match data format
    const cuisineParam = params.cuisine.replace(/-/g, ' ').toLowerCase();

    // Filter venues that have this cuisine in ANY of their cuisine tags
    const venues = allVenues.filter(venue => {
      if (!venue.cuisines || !Array.isArray(venue.cuisines)) return false;
      return venue.cuisines.some(c => c && c.toLowerCase().trim() === cuisineParam);
    });

    if (venues.length === 0) {
      console.warn(`No venues found for cuisine: ${cuisineParam}`);
      return { notFound: true };
    }

    return {
      props: {
        cuisine: cuisineParam,
        venues,
        totalVenues: venues.length
      },
      // Revalidate every hour to keep data fresh
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}
