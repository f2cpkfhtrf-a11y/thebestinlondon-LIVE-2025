import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import FSABadge from '../components/FSABadge';
import fs from 'fs';
import path from 'path';

export default function CuisinePage({ cuisine, venues, totalVenues }) {
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const filteredVenues = useMemo(() => {
    if (selectedDiet === 'all') return venues;
    return venues.filter(v => 
      v.dietaryTags?.some(tag => tag.toLowerCase() === selectedDiet.toLowerCase())
    );
  }, [venues, selectedDiet]);

  const cuisineTitle = cuisine.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const dietaryCounts = useMemo(() => ({
    halal: venues.filter(v => v.dietary_tags?.halal === true).length,
    vegetarian: venues.filter(v => v.dietary_tags?.vegetarian === true).length,
    vegan: venues.filter(v => v.dietary_tags?.vegan === true).length,
    'gluten-free': venues.filter(v => v.dietary_tags?.gluten_free === true).length,
  }), [venues]);

  // Calculate stats
  const avgRating = venues.length > 0 ? (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1) : '0.0';
  const fsaVerified = venues.filter(v => v.fsa_rating && v.fsa_rating >= 4).length;

  return (
    <>
      <Head>
        <title>{cuisineTitle} Restaurants in London | The Best in London</title>
        <meta name="description" content={`Discover ${totalVenues} exceptional ${cuisineTitle.toLowerCase()} restaurants in London. Curated, verified, and updated daily with real reviews and FSA ratings.`} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/${cuisine.replace(/\s+/g, '-')}`} />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
        
        {/* Navigation - PREMIUM STICKY WITH BLUR (MATCHES HOMEPAGE) */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: '20px 0',
          transition: `all ${theme.motion.base} ${theme.motion.ease}`,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  fontFamily: theme.typography.serif, 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: theme.colors.text.primary,
                  letterSpacing: '-0.02em'
                }}>
                  The Best in London
                </div>
              </Link>

              <div style={{ display: 'flex', gap: '40px', fontSize: '15px', fontWeight: 500, alignItems: 'center' }}>
                <Link href="/#explore" style={{ color: theme.colors.text.secondary, textDecoration: 'none', transition: `color ${theme.motion.fast}` }}>Explore</Link>
                <Link href="/#cuisines" style={{ color: theme.colors.text.secondary, textDecoration: 'none', transition: `color ${theme.motion.fast}` }}>Cuisines</Link>
                <Link href="/restaurants" style={{ color: theme.colors.text.secondary, textDecoration: 'none', transition: `color ${theme.motion.fast}` }}>All Restaurants</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - CINEMATIC (MATCHES HOMEPAGE) */}
        <header style={{
          position: 'relative',
          height: '60vh',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `linear-gradient(to bottom, rgba(11,11,11,0.4), rgba(11,11,11,0.8)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2880&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          
          <div style={{ 
            position: 'relative', 
            zIndex: 2, 
            textAlign: 'center', 
            maxWidth: '900px', 
            padding: '0 20px',
          }}>
            <div style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: theme.colors.accent.gold,
              fontWeight: 600,
              marginBottom: theme.spacing.lg
            }}>
              Cuisine Collection
            </div>
            
            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: theme.spacing.xl,
              textShadow: '0 4px 24px rgba(0,0,0,0.8)'
            }}>
              {cuisineTitle}<br />Restaurants
            </h1>
            
            <p style={{
              fontSize: '18px',
              color: 'rgba(245,245,245,0.9)',
              lineHeight: 1.6,
              marginBottom: theme.spacing['2xl'],
              fontWeight: 400,
            }}>
              {totalVenues} exceptional venues • Avg rating {avgRating} ★ • {fsaVerified} FSA verified
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: `${totalVenues} Venues`, icon: '🍽️' },
                { label: `${avgRating} ★ Avg`, icon: '⭐' },
                { label: `${fsaVerified} FSA`, icon: '✓' },
              ].map((stat, idx) => (
                <div key={idx} style={{
                  background: 'rgba(11,11,11,0.85)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 24px',
                  borderRadius: theme.radius.xl,
                  fontSize: '14px',
                  fontWeight: 600,
                  border: `1px solid ${theme.colors.border.subtle}`
                }}>
                  {stat.icon} {stat.label}
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: `linear-gradient(to bottom, transparent, ${theme.colors.bg.primary})`,
            pointerEvents: 'none'
          }} />
        </header>

        {/* Dietary Filters - PREMIUM DESIGN */}
        {totalVenues > 0 && (
          <section style={{
            position: 'sticky',
            top: '84px',
            zIndex: 89,
            background: 'rgba(17,17,17,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${theme.colors.border.subtle}`,
            padding: '20px 0',
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 100%)',
                padding: '16px',
                borderRadius: theme.radius.lg,
                border: `1px solid ${theme.colors.accent.gold}30`
              }}>
                <div style={{ 
                  fontSize: '11px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  color: theme.colors.accent.gold, 
                  marginBottom: '12px', 
                  fontWeight: 600,
                }}>
                  Filter by Dietary Preference
                </div>
                <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedDiet('all')}
                    style={{
                      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                      border: `2px solid ${selectedDiet === 'all' ? theme.colors.accent.gold : 'rgba(212,175,55,0.3)'}`,
                      borderRadius: theme.radius.xl,
                      fontSize: '14px',
                      fontWeight: 600,
                      background: selectedDiet === 'all' ? theme.colors.accent.gold : 'rgba(255,255,255,0.03)',
                      color: selectedDiet === 'all' ? theme.colors.text.inverse : theme.colors.text.primary,
                      cursor: 'pointer',
                      transition: `all ${theme.motion.fast}`,
                      boxShadow: selectedDiet === 'all' ? '0 4px 12px rgba(212,175,55,0.3)' : 'none'
                    }}
                  >
                    All ({totalVenues})
                  </button>
                  
                  {dietaryCounts.halal > 0 && (
                    <button
                      onClick={() => setSelectedDiet('halal')}
                      style={{
                        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                        border: `2px solid ${selectedDiet === 'halal' ? theme.colors.accent.gold : 'rgba(212,175,55,0.3)'}`,
                        borderRadius: theme.radius.xl,
                        fontSize: '14px',
                        fontWeight: 600,
                        background: selectedDiet === 'halal' ? theme.colors.accent.gold : 'rgba(255,255,255,0.03)',
                        color: selectedDiet === 'halal' ? theme.colors.text.inverse : theme.colors.text.primary,
                        cursor: 'pointer',
                        transition: `all ${theme.motion.fast}`,
                      }}
                    >
                      ☪️ Halal ({dietaryCounts.halal})
                    </button>
                  )}
                  
                  {dietaryCounts.vegetarian > 0 && (
                    <button
                      onClick={() => setSelectedDiet('vegetarian')}
                      style={{
                        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                        border: `2px solid ${selectedDiet === 'vegetarian' ? theme.colors.accent.gold : 'rgba(212,175,55,0.3)'}`,
                        borderRadius: theme.radius.xl,
                        fontSize: '14px',
                        fontWeight: 600,
                        background: selectedDiet === 'vegetarian' ? theme.colors.accent.gold : 'rgba(255,255,255,0.03)',
                        color: selectedDiet === 'vegetarian' ? theme.colors.text.inverse : theme.colors.text.primary,
                        cursor: 'pointer',
                        transition: `all ${theme.motion.fast}`,
                      }}
                    >
                      🥗 Vegetarian ({dietaryCounts.vegetarian})
                    </button>
                  )}
                  
                  {dietaryCounts.vegan > 0 && (
                    <button
                      onClick={() => setSelectedDiet('vegan')}
                      style={{
                        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                        border: `2px solid ${selectedDiet === 'vegan' ? theme.colors.accent.gold : 'rgba(212,175,55,0.3)'}`,
                        borderRadius: theme.radius.xl,
                        fontSize: '14px',
                        fontWeight: 600,
                        background: selectedDiet === 'vegan' ? theme.colors.accent.gold : 'rgba(255,255,255,0.03)',
                        color: selectedDiet === 'vegan' ? theme.colors.text.inverse : theme.colors.text.primary,
                        cursor: 'pointer',
                        transition: `all ${theme.motion.fast}`,
                      }}
                    >
                      🌱 Vegan ({dietaryCounts.vegan})
                    </button>
                  )}
                  
                  {dietaryCounts['gluten-free'] > 0 && (
                    <button
                      onClick={() => setSelectedDiet('gluten-free')}
                      style={{
                        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                        border: `2px solid ${selectedDiet === 'gluten-free' ? theme.colors.accent.gold : 'rgba(212,175,55,0.3)'}`,
                        borderRadius: theme.radius.xl,
                        fontSize: '14px',
                        fontWeight: 600,
                        background: selectedDiet === 'gluten-free' ? theme.colors.accent.gold : 'rgba(255,255,255,0.03)',
                        color: selectedDiet === 'gluten-free' ? theme.colors.text.inverse : theme.colors.text.primary,
                        cursor: 'pointer',
                        transition: `all ${theme.motion.fast}`,
                      }}
                    >
                      🌾 Gluten-Free ({dietaryCounts['gluten-free']})
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Venues Grid - PREMIUM CARDS (MATCHES HOMEPAGE EXACTLY) */}
        <main style={{ padding: `${theme.spacing['5xl']} 0` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            <div style={{ marginBottom: theme.spacing['3xl'] }}>
              <h2 style={{
                fontFamily: theme.typography.serif,
                fontSize: '48px',
                fontWeight: 700,
                color: theme.colors.text.primary,
                letterSpacing: '-0.03em',
                marginBottom: theme.spacing.md
              }}>
                {filteredVenues.length} {selectedDiet !== 'all' ? `${selectedDiet} ` : ''}Restaurants
              </h2>
              <p style={{ fontSize: '18px', color: theme.colors.text.secondary }}>
                {selectedDiet === 'all' ? 'All curated venues in this cuisine' : `Filtered for ${selectedDiet} options`}
              </p>
            </div>

            {filteredVenues.length === 0 ? (
              <div style={{ textAlign: 'center', padding: `${theme.spacing['5xl']} 0` }}>
                <p style={{ fontSize: '24px', color: theme.colors.text.secondary, marginBottom: theme.spacing.xl }}>
                  No {selectedDiet !== 'all' ? selectedDiet : ''} restaurants found
                </p>
                <button
                  onClick={() => setSelectedDiet('all')}
                  style={{
                    padding: `${theme.spacing.md} ${theme.spacing['2xl']}`,
                    background: theme.colors.accent.gold,
                    color: theme.colors.text.inverse,
                    border: 'none',
                    borderRadius: theme.radius.sm,
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  View All {totalVenues} Restaurants
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: theme.spacing['2xl']
              }}>
                {filteredVenues.map((venue, idx) => (
                  <Link key={venue.place_id || venue.slug} href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none' }}>
                    <article 
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        background: theme.colors.bg.elevated,
                        borderRadius: theme.radius.lg,
                        overflow: 'hidden',
                        border: `1px solid ${hoveredCard === idx ? theme.colors.border.prominent : theme.colors.border.subtle}`,
                        transition: `all ${theme.motion.base} ${theme.motion.ease}`,
                        transform: hoveredCard === idx ? 'translateY(-8px)' : 'translateY(0)',
                        boxShadow: hoveredCard === idx ? theme.shadows.lg : theme.shadows.sm,
                        cursor: 'pointer'
                      }}>
                      
                      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: theme.colors.bg.elevated }}>
                        {venue.photos && venue.photos[0] ? (
                          <img 
                            src={venue.photos[0].url}
                            alt={venue.name}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              transform: hoveredCard === idx ? 'scale(1.05)' : 'scale(1)',
                              transition: `transform ${theme.motion.slow} ${theme.motion.ease}`
                            }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.text.secondary }}>
                            No image
                          </div>
                        )}
                        
                        {venue.fsa_rating && (
                          <div style={{
                            position: 'absolute',
                            top: theme.spacing.md,
                            right: theme.spacing.md
                          }}>
                            <FSABadge rating={venue.fsa_rating} size="large" showLabel={false} variant="card" />
                          </div>
                        )}
                      </div>

                      <div style={{ padding: theme.spacing.xl }}>
                        
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 600,
                          color: theme.colors.text.primary,
                          marginBottom: theme.spacing.sm,
                          lineHeight: 1.3
                        }}>
                          {venue.name}
                        </h3>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '14px',
                          color: theme.colors.text.secondary,
                          marginBottom: theme.spacing.lg
                        }}>
                          <span>{venue.cuisines?.[0] ? venue.cuisines[0].charAt(0).toUpperCase() + venue.cuisines[0].slice(1) : 'Restaurant'}</span>
                          <span>{venue.price_range || '££'}</span>
                        </div>

                        {/* REVIEWS SECTION - ADDED */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: `${theme.spacing.md} 0`,
                          borderTop: `1px solid ${theme.colors.border.subtle}`,
                          marginBottom: theme.spacing.md
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                            <span style={{ color: theme.colors.accent.gold, fontSize: '16px' }}>★</span>
                            <span style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.text.primary }}>{venue.rating ? venue.rating.toFixed(1) : 'N/A'}</span>
                          </div>
                          {venue.user_ratings_total && (
                            <span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>
                              {venue.user_ratings_total.toLocaleString()} reviews
                            </span>
                          )}
                        </div>

                        {venue.fsa_rating && (
                          <div style={{
                            fontSize: '12px',
                            color: '#10B981',
                            fontWeight: 600,
                            marginBottom: theme.spacing.sm
                          }}>
                            ✓ FSA {venue.fsa_rating}/5 Verified
                          </div>
                        )}

                        <button style={{
                          width: '100%',
                          padding: theme.spacing.md,
                          background: theme.colors.text.primary,
                          color: theme.colors.text.inverse,
                          border: 'none',
                          borderRadius: theme.radius.sm,
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: `all ${theme.motion.fast}`,
                        }}>
                          View Details
                        </button>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Footer - PREMIUM (MATCHES HOMEPAGE) */}
        <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['5xl']} 0 ${theme.spacing['3xl']}`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing['4xl'], marginBottom: theme.spacing['4xl'] }}>
              <div>
                <div style={{ fontFamily: theme.typography.serif, fontSize: '24px', fontWeight: 700, marginBottom: theme.spacing.lg }}>
                  The Best in London
                </div>
                <p style={{ fontSize: '14px', color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                  Curated guide to London's finest restaurants with real reviews, FSA ratings & verified photos.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: theme.spacing.lg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cuisines</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, fontSize: '14px', color: theme.colors.text.secondary }}>
                  <Link href="/indian" style={{ color: 'inherit', textDecoration: 'none' }}>Indian</Link>
                  <Link href="/italian" style={{ color: 'inherit', textDecoration: 'none' }}>Italian</Link>
                  <Link href="/japanese" style={{ color: 'inherit', textDecoration: 'none' }}>Japanese</Link>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: theme.spacing.lg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, fontSize: '14px', color: theme.colors.text.secondary }}>
                  <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                  <Link href="/restaurants" style={{ color: 'inherit', textDecoration: 'none' }}>All Restaurants</Link>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${theme.colors.border.subtle}`, paddingTop: theme.spacing['2xl'], textAlign: 'center', fontSize: '13px', color: theme.colors.text.secondary }}>
              <p style={{ margin: 0 }}>© 2025 The Best in London. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        *::-webkit-scrollbar { width: 8px; height: 8px; }
        *::-webkit-scrollbar-track { background: #111111; }
        *::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }
        *::-webkit-scrollbar-thumb:hover { background: #3A3A3A; }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      return { paths: [], fallback: 'blocking' };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(data) ? data : (data.venues || []);

    if (!venues || venues.length === 0) {
      return { paths: [], fallback: 'blocking' };
    }

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

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      return { notFound: true };
    }

    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const allVenues = Array.isArray(data) ? data : (data.venues || []);

    if (!allVenues || allVenues.length === 0) {
      return { notFound: true };
    }

    const cuisineParam = params.cuisine.replace(/-/g, ' ').toLowerCase();

    const venues = allVenues.filter(venue => {
      if (!venue.cuisines || !Array.isArray(venue.cuisines)) return false;
      return venue.cuisines.some(c => c && c.toLowerCase().trim() === cuisineParam);
    });

    if (venues.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        cuisine: cuisineParam,
        venues,
        totalVenues: venues.length
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}
