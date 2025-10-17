import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import FSABadge from '../components/FSABadge';
import BestOfLondonBadge from '../components/BestOfLondonBadge';
import { fetchVenuesData, filterVenuesByCuisine, filterVenuesByDietary, sortVenues, getUniqueCuisines, getUniqueAreas, getDietaryTags, calculateVenueStats } from '../utils/venueDataUtils';

export async function getStaticProps() {
  const venues = await fetchVenuesData();
  const stats = calculateVenueStats(venues);
  
  return {
    props: {
      venues,
      stats
    },
    revalidate: 3600 // Revalidate every hour
  };
}

export default function Restaurants({ venues, stats }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get available cuisines from venues
  const availableCuisines = getUniqueCuisines(venues).slice(0, 10);
  const availableAreas = getUniqueAreas(venues).slice(0, 10);
  const availableDietaryTags = getDietaryTags(venues);

  // Filter venues by cuisine OR dietary tag
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
  const sorted = sortVenues(filtered, sortBy);

  // Count dietary options
  const dietaryCounts = {
    halal: venues.filter(v => v.dietary_tags?.halal).length,
    vegan: venues.filter(v => v.dietary_tags?.vegan).length,
    vegetarian: venues.filter(v => v.dietary_tags?.vegetarian).length,
    'gluten-free': venues.filter(v => v.dietary_tags?.gluten_free).length,
  };

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
          "reviewCount": venue.user_ratings_total || 0
        } : null
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Best Restaurants in London | The Best in London</title>
        <meta name="description" content={`Discover ${venues.length} exceptional restaurants in London. Curated, verified, and updated daily with Google ratings and FSA hygiene scores.`} />
        <link rel="canonical" href="https://thebestinlondon.co.uk/restaurants" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary }}>
        
        {/* Navigation */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(11,11,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.colors.border.subtle}` : 'none',
          padding: '16px 0',
          transition: `all ${theme.motion.base} ${theme.motion.ease}`,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  fontFamily: theme.typography.serif, 
                  fontSize: 'clamp(18px, 4vw, 24px)', 
                  fontWeight: 700, 
                  color: theme.colors.text.primary,
                  letterSpacing: '-0.02em'
                }}>
                  The Best in London
                </div>
              </Link>

              <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', fontSize: '14px', fontWeight: 500, alignItems: 'center' }}>
                <Link href="/" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Home</Link>
                <Link href="/restaurants" style={{ color: theme.colors.accent.gold, textDecoration: 'none' }}>Restaurants</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Cinematic Image Background */}
        <section style={{
          position: 'relative',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(to bottom, rgba(11,11,11,0.4), rgba(11,11,11,0.75)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '140px 20px 100px',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* Dark overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.7) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Gradient fade to content below */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: `linear-gradient(to bottom, transparent, ${theme.colors.bg.primary})`,
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              London's Best Restaurants
            </h1>
            
            <p style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'rgba(250, 250, 250, 0.95)',
              marginBottom: theme.spacing['3xl'],
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)'
            }}>
              From Michelin-starred fine dining to hidden neighborhood gems — discover {venues.length} exceptional restaurants, curated and verified daily
            </p>

            {/* Stats Pills */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '12px', 
              marginBottom: theme.spacing['3xl'] 
            }}>
              <span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: `1px solid rgba(212, 175, 55, 0.4)`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                {venues.length} Venues
              </span>
              <span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: `1px solid rgba(212, 175, 55, 0.4)`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                {venues.filter(v => v.rating >= 4.5).length} Highly Rated
              </span>
              <span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: `1px solid rgba(212, 175, 55, 0.4)`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                {stats.fsaCoverage}% FSA Verified
              </span>
              <span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: `1px solid rgba(212, 175, 55, 0.4)`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}>
                Updated Daily
              </span>
            </div>

            {/* USP DIETARY FILTERS - PROMINENT */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.08) 100%)',
              backdropFilter: 'blur(12px)',
              border: `2px solid rgba(212, 175, 55, 0.5)`,
              borderRadius: '24px',
              padding: '24px',
              marginBottom: theme.spacing['2xl'],
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '24px' }}>✨</span>
                <span style={{
                  fontSize: '13px',
                  color: theme.colors.accent.gold,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontWeight: 700
                }}>
                  Our Specialty — Dietary Preferences
                </span>
                <span style={{ fontSize: '24px' }}>✨</span>
              </div>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <button
                  onClick={() => setFilter('halal')}
                  style={{
                    background: filter === 'halal' ? theme.colors.accent.gold : 'rgba(11, 11, 11, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: filter === 'halal' ? theme.colors.text.inverse : theme.colors.text.primary,
                    minHeight: '52px',
                    padding: '14px 30px',
                    borderRadius: '999px',
                    fontSize: '15px',
                    fontWeight: 700,
                    border: filter === 'halal' ? 'none' : '2px solid rgba(212, 175, 55, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit',
                    boxShadow: filter === 'halal' ? '0 4px 20px rgba(212, 175, 55, 0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transform: filter === 'halal' ? 'scale(1.05)' : 'scale(1)',
                    WebkitTapHighlightColor: 'rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>☪️</span>
                  <span>Halal</span>
                  <span style={{
                    background: filter === 'halal' ? 'rgba(0,0,0,0.2)' : 'rgba(212, 175, 55, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {dietaryCounts.halal}
                  </span>
                </button>

                <button
                  onClick={() => setFilter('vegan')}
                  style={{
                    background: filter === 'vegan' ? theme.colors.accent.gold : 'rgba(11, 11, 11, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: filter === 'vegan' ? theme.colors.text.inverse : theme.colors.text.primary,
                    minHeight: '52px',
                    padding: '14px 30px',
                    borderRadius: '999px',
                    fontSize: '15px',
                    fontWeight: 700,
                    border: filter === 'vegan' ? 'none' : '2px solid rgba(212, 175, 55, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit',
                    boxShadow: filter === 'vegan' ? '0 4px 20px rgba(212, 175, 55, 0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transform: filter === 'vegan' ? 'scale(1.05)' : 'scale(1)',
                    WebkitTapHighlightColor: 'rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🌱</span>
                  <span>Vegan</span>
                  <span style={{
                    background: filter === 'vegan' ? 'rgba(0,0,0,0.2)' : 'rgba(212, 175, 55, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {dietaryCounts.vegan}
                  </span>
                </button>

                <button
                  onClick={() => setFilter('vegetarian')}
                  style={{
                    background: filter === 'vegetarian' ? theme.colors.accent.gold : 'rgba(11, 11, 11, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: filter === 'vegetarian' ? theme.colors.text.inverse : theme.colors.text.primary,
                    minHeight: '52px',
                    padding: '14px 30px',
                    borderRadius: '999px',
                    fontSize: '15px',
                    fontWeight: 700,
                    border: filter === 'vegetarian' ? 'none' : '2px solid rgba(212, 175, 55, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit',
                    boxShadow: filter === 'vegetarian' ? '0 4px 20px rgba(212, 175, 55, 0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transform: filter === 'vegetarian' ? 'scale(1.05)' : 'scale(1)',
                    WebkitTapHighlightColor: 'rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🥗</span>
                  <span>Vegetarian</span>
                  <span style={{
                    background: filter === 'vegetarian' ? 'rgba(0,0,0,0.2)' : 'rgba(212, 175, 55, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {dietaryCounts.vegetarian}
                  </span>
                </button>

                <button
                  onClick={() => setFilter('gluten-free')}
                  style={{
                    background: filter === 'gluten-free' ? theme.colors.accent.gold : 'rgba(11, 11, 11, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: filter === 'gluten-free' ? theme.colors.text.inverse : theme.colors.text.primary,
                    minHeight: '52px',
                    padding: '14px 30px',
                    borderRadius: '999px',
                    fontSize: '15px',
                    fontWeight: 700,
                    border: filter === 'gluten-free' ? 'none' : '2px solid rgba(212, 175, 55, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: 'inherit',
                    boxShadow: filter === 'gluten-free' ? '0 4px 20px rgba(212, 175, 55, 0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transform: filter === 'gluten-free' ? 'scale(1.05)' : 'scale(1)',
                    WebkitTapHighlightColor: 'rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🌾</span>
                  <span>Gluten-Free</span>
                  <span style={{
                    background: filter === 'gluten-free' ? 'rgba(0,0,0,0.2)' : 'rgba(212, 175, 55, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {dietaryCounts['gluten-free']}
                  </span>
                </button>
              </div>
            </div>

            {/* Cuisine Filter Pills */}
            <div style={{ marginTop: theme.spacing.lg }}>
              <div style={{ 
                fontSize: '12px', 
                color: 'rgba(250, 250, 250, 0.7)', 
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                textShadow: '0 2px 8px rgba(0,0,0,0.6)'
              }}>
                Or filter by cuisine
              </div>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '10px',
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                <button
                  onClick={() => setFilter('all')}
                  style={{
                    background: filter === 'all' ? theme.colors.accent.gold : 'rgba(11, 11, 11, 0.7)',
                    backdropFilter: 'blur(8px)',
                    color: filter === 'all' ? theme.colors.text.inverse : theme.colors.text.primary,
                    padding: '8px 20px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: filter === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  All
                </button>
                {availableCuisines.slice(0, 10).map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => setFilter(cuisine)}
                    style={{
                      background: filter === cuisine ? theme.colors.accent.gold : 'rgba(11, 11, 11, 0.7)',
                      backdropFilter: 'blur(8px)',
                      color: filter === cuisine ? theme.colors.text.inverse : theme.colors.text.primary,
                      padding: '8px 20px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: 500,
                      border: filter === cuisine ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textTransform: 'capitalize',
                      fontFamily: 'inherit',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Count & Sort Bar - Sticky */}
        <section style={{
          background: `${theme.colors.bg.elevated}f0`,
          padding: '20px 0',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          position: 'sticky',
          top: scrolled ? '72px' : '64px',
          zIndex: 90,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'top 0.3s ease'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              
              <div style={{ color: theme.colors.text.secondary, fontSize: '14px' }}>
                Showing <strong style={{ color: theme.colors.text.primary }}>{sorted.length}</strong> {filter !== 'all' && `${filter} `}restaurants
              </div>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: theme.colors.bg.primary,
                  color: theme.colors.text.primary,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviews</option>
                <option value="name">🔤 Alphabetical</option>
              </select>
            </div>
          </div>
        </section>

        {/* Venues Grid */}
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 20px)' }}>
            
            {sorted.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: theme.colors.text.secondary 
              }}>
                <p style={{ fontSize: '18px', marginBottom: '16px' }}>No restaurants found for "{filter}"</p>
                <button
                  onClick={() => setFilter('all')}
                  style={{
                    background: theme.colors.accent.gold,
                    color: theme.colors.text.inverse,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  View All Restaurants
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(20px, 3vw, 24px)'
              }}>
                {sorted.map((venue) => (
                  <Link 
                    href={`/restaurant/${venue.slug}`} 
                    key={venue.place_id}
                    style={{ textDecoration: 'none' }}
                  >
                    <article style={{
                      background: theme.colors.bg.elevated,
                      border: `1px solid ${theme.colors.border.subtle}`,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      height: '100%'
                    }}
                    className="venue-card"
                    >
                      
                      {/* Image with Badges */}
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '220px',
                        background: theme.colors.bg.primary,
                        overflow: 'hidden'
                      }}>
                        {venue.photos && venue.photos[0] && venue.photos[0].url ? (
                          <img 
                            src={venue.photos[0].url}
                            alt={venue.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.4s ease'
                            }}
                            className="venue-image"
                            onError={(e) => {
                              // Fallback to gradient on image load error
                              e.target.style.display = 'none';
                              e.target.parentElement.style.background = venue.fallback_image?.value || 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(11,11,11,0.9) 100%)';
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            background: venue.fallback_image?.value || 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(11,11,11,0.9) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: '8px',
                            padding: '20px',
                            color: theme.colors.text.secondary
                          }}>
                            <div style={{ fontSize: '32px', opacity: 0.4 }}>🍽️</div>
                            <div style={{ fontSize: '13px', textAlign: 'center', opacity: 0.6 }}>{venue.cuisines?.[0] || 'Restaurant'}</div>
                          </div>
                        )}
                        
                        {/* FSA Badge - Top Right */}
                        {venue.fsa_rating && (
                          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                            <FSABadge rating={venue.fsa_rating} size="large" variant="card" showLabel={false} />
                          </div>
                        )}

                        {/* Rating Badge - Top Left */}
                        {venue.rating >= 4.7 && (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            background: theme.colors.accent.gold,
                            color: theme.colors.text.inverse,
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            ⭐ Top Rated
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: 'clamp(16px, 3vw, 20px)' }}>
                        
                        <h3 style={{
                          fontFamily: theme.typography.serif,
                          fontSize: '20px',
                          fontWeight: 700,
                          color: theme.colors.text.primary,
                          marginBottom: '8px',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {venue.name}
                        </h3>

                        {/* Location */}
                        {venue.area && (
                          <div style={{
                            fontSize: '13px',
                            color: theme.colors.text.secondary,
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            📍 {venue.area}
                          </div>
                        )}

                        {/* Cuisine & Price */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '12px',
                          flexWrap: 'wrap'
                        }}>
                          {venue.cuisines && venue.cuisines[0] && (
                            <span style={{
                              color: theme.colors.text.secondary,
                              fontSize: '14px',
                              textTransform: 'capitalize'
                            }}>
                              🍽️ {venue.cuisines[0]}
                            </span>
                          )}
                          {venue.price_level && (
                            <span style={{
                              color: theme.colors.accent.gold,
                              fontSize: '14px',
                              fontWeight: 700
                            }}>
                              {'£'.repeat(venue.price_level)}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {venue.description && (
                          <p style={{
                            color: theme.colors.text.secondary,
                            fontSize: '14px',
                            lineHeight: 1.6,
                            marginBottom: '16px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {venue.description}
                          </p>
                        )}

                        {/* Footer - Scores & Reviews */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          paddingTop: '16px',
                          borderTop: `1px solid ${theme.colors.border.subtle}`
                        }}>
                          {/* Best of London Score + Google Rating */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '8px'
                          }}>
                            <BestOfLondonBadge venue={venue} size="medium" />
                            {venue.rating && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: theme.colors.accent.gold, fontSize: '16px' }}>★</span>
                                <span style={{
                                  color: theme.colors.text.primary,
                                  fontSize: '16px',
                                  fontWeight: 700
                                }}>
                                  {venue.rating.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Review count */}
                          {venue.user_ratings_total && (
                            <span style={{
                              color: theme.colors.text.secondary,
                              fontSize: '13px'
                            }}>
                              {venue.user_ratings_total.toLocaleString()} reviews
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: theme.colors.bg.primary,
          padding: `${theme.spacing['4xl']} 0 ${theme.spacing['2xl']}`,
          borderTop: `1px solid ${theme.colors.border.subtle}`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: theme.colors.text.secondary, margin: 0 }}>
              © 2025 The Best in London. All rights reserved.
            </p>
          </div>
        </footer>

      </div>

      <style jsx>{`
        .venue-card:hover {
          transform: translateY(-4px);
          border-color: ${theme.colors.accent.gold} !important;
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.2);
        }
        
        .venue-card:hover .venue-image {
          transform: scale(1.05);
        }
        
        button:hover {
          opacity: 0.95;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}

