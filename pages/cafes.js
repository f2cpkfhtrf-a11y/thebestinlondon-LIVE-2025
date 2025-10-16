import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import { enhanceVenueData, sortVenues } from '../utils/venueData';
import ReviewBadges from '../components/ReviewBadges';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    const cafeVenues = (data.venues || data)
      .map(enhanceVenueData)
      .filter(v => {
        if (!v) return false;
        const types = (v.types || []).map(t => t.toLowerCase()).join(' ');
        return types.includes('cafe') || types.includes('coffee') || types.includes('bakery');
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { props: { venues: cafeVenues }};
  } catch (error) {
    console.error('Error loading venues:', error);
    return { props: { venues: [] } };
  }
}

export default function CafesLondon({ venues }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let result = venues.filter(v => {
      const matchesSearch = !searchTerm || 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    return sortVenues(result, sortBy);
  }, [venues, searchTerm, sortBy]);

  return (
    <>
      <Head>
        <title>Best Cafes in London 2025 | {venues.length}+ Coffee Shops & Bakeries</title>
        <meta name="description" content={`Discover ${venues.length}+ top-rated cafes in London. Independent coffee shops, artisan bakeries, brunch spots.`} />
        <link rel="canonical" href="https://thebestinlondon.co.uk/cafes" />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary }}>
        
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`, padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>
                The Best in London
              </div>
            </Link>
          </div>
        </nav>

        <header style={{ padding: '80px 20px', background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.elevated} 100%)` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>☕</div>
            <h1 style={{ fontFamily: theme.typography.serif, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, marginBottom: '24px' }}>
              Best Cafes in London
            </h1>
            <p style={{ fontSize: '18px', color: theme.colors.text.secondary, maxWidth: '800px' }}>
              {venues.length}+ independent coffee shops, artisan bakeries, and brunch spots across London.
            </p>
          </div>
        </header>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', color: theme.colors.text.secondary }}>
                <p style={{ fontSize: '18px' }}>No cafes found. Check back soon!</p>
                <Link href="/" style={{ color: theme.colors.accent.gold, textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
                  ← Back to all restaurants
                </Link>
              </div>
            ) : (
              filtered.map((venue) => (
                <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    background: theme.colors.bg.elevated,
                    borderRadius: theme.radius.lg,
                    overflow: 'hidden',
                    border: `1px solid ${theme.colors.border.subtle}`
                  }}>
                    <div style={{ position: 'relative', height: '200px' }}>
                      <img 
                        src={venue.photos?.[0]?.url || `https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=85`}
                        alt={venue.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '12px' }}>
                        {venue.name}
                      </h3>
                      <ReviewBadges 
                        google={{ rating: venue.rating, reviews: venue.user_ratings_total }}
                        layout="column"
                      />
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </main>

      </div>
    </>
  );
}
