import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import FSABadge from '../components/FSABadge';

export default function VeganRestaurants({ venues }) {
  const [filterArea, setFilterArea] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const areas = ['all', ...new Set(venues.map(v => v.area).filter(Boolean))].slice(0, 15);
  let filtered = filterArea === 'all' ? venues : venues.filter(v => v.area === filterArea);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'reviews') return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
    return 0;
  });

  return (
    <>
      <Head>
        <title>Best Vegan Restaurants in London 2025 | Plant-Based Dining | The Best in London</title>
        <meta name="description" content={`Discover ${venues.length} top-rated vegan restaurants in London. Plant-based cuisine at its finest.`} />
        <link rel="canonical" href="https://thebestinlondon.co.uk/vegan-restaurants-london" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary }}>
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
                <div style={{ fontFamily: theme.typography.serif, fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, color: theme.colors.text.primary, letterSpacing: '-0.02em' }}>
                  The Best in London
                </div>
              </Link>
              <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', fontSize: '14px', fontWeight: 500 }}>
                <Link href="/" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Home</Link>
                <Link href="/restaurants" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Restaurants</Link>
              </div>
            </div>
          </div>
        </nav>

        <section style={{
          position: 'relative',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(to bottom, rgba(11,11,11,0.5), rgba(11,11,11,0.75)), url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=2400&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '140px 20px 80px',
          textAlign: 'center'
        }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: `linear-gradient(to bottom, transparent, ${theme.colors.bg.primary})` }} />
          <div style={{ maxWidth: '900px', width: '100%', position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              letterSpacing: '-0.03em',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              Vegan Restaurants in London
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(250, 250, 250, 0.95)', marginBottom: theme.spacing['2xl'], lineHeight: 1.7, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              Plant-based excellence — {venues.length} vegan restaurants
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              <span style={{
                background: 'rgba(11, 11, 11, 0.75)',
                backdropFilter: 'blur(12px)',
                border: `1px solid rgba(212, 175, 55, 0.4)`,
                color: theme.colors.accent.gold,
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600
              }}>{venues.length} Venues</span>
            </div>
          </div>
        </section>

        <section style={{ background: theme.colors.bg.elevated, padding: '20px 0', borderBottom: `1px solid ${theme.colors.border.subtle}`, position: 'sticky', top: '64px', zIndex: 90 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ color: theme.colors.text.secondary, fontSize: '14px' }}>
                Showing <strong style={{ color: theme.colors.text.primary }}>{sorted.length}</strong> vegan restaurants
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)} style={{ background: theme.colors.bg.primary, color: theme.colors.text.primary, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: '8px', padding: '10px 16px', fontSize: '14px', cursor: 'pointer' }}>
                  <option value="all">All Areas</option>
                  {areas.filter(a => a !== 'all').map(area => <option key={area} value={area}>{area}</option>)}
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ background: theme.colors.bg.primary, color: theme.colors.text.primary, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: '8px', padding: '10px 16px', fontSize: '14px', cursor: 'pointer' }}>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="reviews">💬 Most Reviews</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 20px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 'clamp(20px, 3vw, 24px)' }}>
              {sorted.map((venue) => (
                <Link href={`/restaurant/${venue.slug}`} key={venue.place_id} style={{ textDecoration: 'none' }}>
                  <article style={{ background: theme.colors.bg.elevated, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', height: '100%' }} className="venue-card">
                    <div style={{ position: 'relative', width: '100%', height: '220px', background: theme.colors.bg.primary }}>
                      {venue.photos?.[0] ? (
                        <img src={venue.photos[0].url} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="venue-image" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.text.secondary }}>No image</div>
                      )}
                      {venue.fsa_rating && <div style={{ position: 'absolute', top: '12px', right: '12px' }}><FSABadge rating={venue.fsa_rating} size="large" variant="card" showLabel={false} /></div>}
                      {venue.rating >= 4.7 && <div style={{ position: 'absolute', top: '12px', left: '12px', background: theme.colors.accent.gold, color: theme.colors.text.inverse, padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>⭐ Top Rated</div>}
                    </div>
                    <div style={{ padding: 'clamp(16px, 3vw, 20px)' }}>
                      <h3 style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary, marginBottom: '8px', lineHeight: 1.3 }}>{venue.name}</h3>
                      {venue.area && <div style={{ fontSize: '13px', color: theme.colors.text.secondary, marginBottom: '12px' }}>📍 {venue.area}</div>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: `1px solid ${theme.colors.border.subtle}` }}>
                        {venue.rating && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: theme.colors.accent.gold, fontSize: '18px' }}>★</span>
                            <span style={{ color: theme.colors.text.primary, fontSize: '18px', fontWeight: 700 }}>{venue.rating.toFixed(1)}</span>
                          </div>
                        )}
                        {venue.user_ratings_total && <span style={{ color: theme.colors.text.secondary, fontSize: '13px' }}>{venue.user_ratings_total.toLocaleString()} reviews</span>}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['4xl']} 0 ${theme.spacing['2xl']}`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: theme.colors.text.secondary, margin: 0 }}>© 2025 The Best in London. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .venue-card:hover { transform: translateY(-4px); border-color: ${theme.colors.accent.gold} !important; box-shadow: 0 12px 40px rgba(212, 175, 55, 0.2); }
        .venue-card:hover .venue-image { transform: scale(1.05); }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let allVenues = JSON.parse(fileContent);
    if (!Array.isArray(allVenues) && allVenues.venues) allVenues = allVenues.venues;
    const venues = allVenues.filter(v => v && (v.cuisines?.some(c => c.toLowerCase().includes('vegan')) || v.dietaryTags?.some(t => t.toLowerCase().includes('vegan')) || v.name?.toLowerCase().includes('vegan'))).sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return { props: { venues }};
  } catch (error) {
    return { props: { venues: [] } };
  }
}
