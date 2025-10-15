import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import FSABadge from '../components/FSABadge';

export default function Restaurants({ venues, stats }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Filter venues
  let filtered = venues;
  if (filter !== 'all') {
    filtered = venues.filter(v => 
      v.categories?.includes(filter) || 
      v.cuisines?.includes(filter)
    );
  }

  // Sort venues
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'reviews') return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Restaurants in London",
    "description": "Curated list of London's finest restaurants, verified and updated daily",
    "url": "https://thebestinlondon.co.uk/restaurants",
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
          "reviewCount": venue.user_ratings_total || 0,
          "bestRating": 5,
          "worstRating": 1
        } : null,
        "servesCuisine": venue.cuisines?.join(', '),
        "priceRange": '£'.repeat(venue.price_level || 2),
        "description": venue.description,
        "image": venue.photos?.[0]?.url
      }
    }))
  };

  return (
    <Layout 
      title="Best Restaurants in London | The Best in London"
      description={`Discover ${venues.length} exceptional restaurants in London. Curated, verified, and updated daily with Google ratings and FSA hygiene scores.`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div style={{ backgroundColor: '#0B0B0B', minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700,
              color: '#FAFAFA',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              London's Best Restaurants
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#9AA0A6',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: 1.6
            }}>
              From Michelin-starred fine dining to hidden neighborhood gems — discover {venues.length} exceptional restaurants, curated and verified daily
            </p>
            
            {/* Stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <span style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#D4AF37',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 600
              }}>
                {venues.length} Venues
              </span>
              <span style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#D4AF37',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 600
              }}>
                {venues.filter(v => v.rating >= 4.5).length} Highly Rated
              </span>
              <span style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#D4AF37',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 600
              }}>
                {stats.fsaCoverage}% FSA Verified
              </span>
              <span style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#D4AF37',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: 600
              }}>
                Updated Daily
              </span>
            </div>
          </div>

          {/* Filters & Sort */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                backgroundColor: '#1A1A1A',
                color: '#FAFAFA',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          {/* Venues Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {sorted.map((venue) => (
              <Link 
                href={`/restaurant/${venue.slug}`} 
                key={venue.place_id}
                style={{ textDecoration: 'none' }}
              >
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
              </Link>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        .venue-card:hover {
          transform: translateY(-4px);
          border-color: #D4AF37 !important;
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.15);
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    const raw = fs.readFileSync(venuesPath, 'utf8');
    let venues = JSON.parse(raw);
    
    // Handle both flat array and wrapped object
    if (!Array.isArray(venues) && venues.venues) {
      venues = venues.venues;
    }
    
    // Filter restaurants only
    const restaurants = venues.filter(v => 
      v.categories?.includes('restaurant') || 
      v.categories?.includes('cafe') ||
      v.categories?.includes('bar')
    );

    // Calculate stats
    const stats = {
      total: restaurants.length,
      fsaCoverage: Math.round((restaurants.filter(v => v.fsa_rating).length / restaurants.length) * 100)
    };

    return {
      props: {
        venues: restaurants,
        stats
      }
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        venues: [],
        stats: { total: 0, fsaCoverage: 0 }
      }
    };
  }
}
