import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { theme } from '../utils/theme';

export async function getServerSideProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Extract cuisine from URL (e.g., "international-restaurants-london" -> "international")
    const cuisineSlug = params.cuisine.replace('-restaurants-london', '');
    
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Filter venues by cuisine
    const venues = data.venues.filter(v => {
      if (!v.cuisines || v.cuisines.length === 0) return false;
      return v.cuisines[0].toLowerCase() === cuisineSlug.toLowerCase();
    });
    
    // Sort by rating
    venues.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return {
      props: {
        venues,
        cuisine: cuisineSlug,
        totalCount: venues.length
      }
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        venues: [],
        cuisine: params.cuisine.replace('-restaurants-london', ''),
        totalCount: 0
      }
    };
  }
}

export default function CuisinePage({ venues, cuisine, totalCount }) {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const cuisineName = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
  
  return (
    <>
      <Head>
        <title>{cuisineName} Restaurants in London | The Best in London</title>
        <meta name="description" content={`Discover the best ${cuisineName} restaurants in London. ${totalCount} curated venues with verified ratings, FSA hygiene scores & real reviews.`} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/${cuisine}-restaurants-london`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
        
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>
                  The Best in London
                </div>
              </Link>
              <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500 }}>
                <Link href="/#cuisines" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Cuisines</Link>
                <Link href="/#areas" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Areas</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <nav style={{ background: theme.colors.bg.elevated, borderBottom: `1px solid ${theme.colors.border.subtle}`, padding: '12px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ fontSize: '13px', color: theme.colors.text.secondary, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: theme.colors.border.prominent }}>/</span>
              <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>{cuisineName} Restaurants</span>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header style={{ background: theme.colors.bg.elevated, padding: `${theme.spacing['5xl']} 0 ${theme.spacing['4xl']}`, borderBottom: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: '56px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: theme.spacing.lg,
              color: theme.colors.text.primary
            }}>
              {cuisineName} Restaurants in London
            </h1>
            <p style={{ fontSize: '18px', color: theme.colors.text.secondary, maxWidth: '700px' }}>
              {totalCount} curated {cuisineName.toLowerCase()} restaurants • Expert reviews • FSA verified
            </p>
          </div>
        </header>

        {/* Venues Grid */}
        <main style={{ padding: `${theme.spacing['5xl']} 0` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            {venues.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <p style={{ fontSize: '18px', color: theme.colors.text.secondary }}>
                  No {cuisineName.toLowerCase()} restaurants found. <Link href="/" style={{ color: theme.colors.accent.gold }}>Browse all restaurants</Link>
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: theme.spacing['2xl']
              }}>
                {venues.map((venue, idx) => (
                  <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none' }}>
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
                        cursor: 'pointer',
                        height: '100%'
                      }}>
                      
                      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: theme.colors.bg.elevated }}>
                        {venue.photos && venue.photos[0] ? (
                          <img 
                            src={venue.photos[0].url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85'}
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
                            top: theme.spacing.base,
                            right: theme.spacing.base,
                            background: theme.colors.accent.success,
                            color: theme.colors.text.inverse,
                            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                            borderRadius: theme.radius.sm,
                            fontSize: '12px',
                            fontWeight: 600
                          }}>
                            FSA {venue.fsa_rating}
                          </div>
                        )}

                        {venue.area && (
                          <div style={{
                            position: 'absolute',
                            bottom: theme.spacing.base,
                            left: theme.spacing.base,
                            background: 'rgba(11,11,11,0.85)',
                            backdropFilter: 'blur(8px)',
                            color: theme.colors.text.primary,
                            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                            borderRadius: theme.radius.sm,
                            fontSize: '13px',
                            fontWeight: 500
                          }}>
                            {venue.area}
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
                          <span>{cuisineName}</span>
                          <span>{venue.price_range || '££'}</span>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: `${theme.spacing.md} 0`,
                          borderTop: `1px solid ${theme.colors.border.subtle}`
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                            <span style={{ color: theme.colors.accent.gold, fontSize: '16px' }}>★</span>
                            <span style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.text.primary }}>{venue.rating}</span>
                          </div>
                          {venue.user_ratings_total && (
                            <span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>
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
        </main>

        {/* Footer */}
        <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['4xl']} 0 ${theme.spacing['2xl']}`, borderTop: `1px solid ${theme.colors.border.subtle}`, marginTop: '80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', fontSize: '13px', color: theme.colors.text.secondary }}>
            <p style={{ margin: 0 }}>© 2025 The Best in London. All rights reserved.</p>
          </div>
        </footer>

      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>
    </>
  );
}
