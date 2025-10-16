#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'pages');

const cuisineTemplate = (cuisine, emoji, unsplashUrl) => `import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import { enhanceVenueData, sortVenues } from '../utils/venueData';
import ReviewBadges from '../components/ReviewBadges';
import FSABadge from '../components/FSABadge';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    const venues = (data.venues || data)
      .map(enhanceVenueData)
      .filter(v => {
        if (!v) return false;
        const cuisines = (v.cuisines || []).map(c => c.toLowerCase()).join(' ');
        const types = (v.types || []).map(t => t.toLowerCase()).join(' ');
        return cuisines.includes('${cuisine.toLowerCase()}') || types.includes('${cuisine.toLowerCase()}');
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { props: { venues }};
  } catch (error) {
    console.error('Error loading venues:', error);
    return { props: { venues: [] } };
  }
}

export default function ${cuisine}Restaurants({ venues }) {
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
        <title>Best ${cuisine} Restaurants in London 2025 | Curated ${cuisine} Dining</title>
        <meta name="description" content={\`Discover \${venues.length}+ authentic ${cuisine} restaurants in London. Real reviews, verified ratings.\`} />
        <link rel="canonical" href="https://thebestinlondon.co.uk/${cuisine.toLowerCase()}" />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary }}>
        
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(12px)',
          borderBottom: \`1px solid \${theme.colors.border.subtle}\`, padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>
                The Best in London
              </div>
            </Link>
          </div>
        </nav>

        <header style={{ padding: '80px 20px', background: \`linear-gradient(135deg, \${theme.colors.bg.primary} 0%, \${theme.colors.bg.elevated} 100%)\` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>${emoji}</div>
            <h1 style={{ fontFamily: theme.typography.serif, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, marginBottom: '24px' }}>
              Best ${cuisine} Restaurants in London
            </h1>
            <p style={{ fontSize: '18px', color: theme.colors.text.secondary, maxWidth: '800px' }}>
              {venues.length}+ authentic ${cuisine} restaurants across London. From traditional to modern fusion.
            </p>
          </div>
        </header>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', color: theme.colors.text.secondary }}>
                <p style={{ fontSize: '18px' }}>No ${cuisine} restaurants found. Check back soon!</p>
                <Link href="/" style={{ color: theme.colors.accent.gold, textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
                  ← Back to all restaurants
                </Link>
              </div>
            ) : (
              filtered.map((venue) => (
                <Link key={venue.place_id} href={\`/restaurant/\${venue.slug}\`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    background: theme.colors.bg.elevated,
                    borderRadius: theme.radius.lg,
                    overflow: 'hidden',
                    border: \`1px solid \${theme.colors.border.subtle}\`
                  }}>
                    <div style={{ position: 'relative', height: '200px' }}>
                      <img 
                        src={venue.photos?.[0]?.url || \`${unsplashUrl}\`}
                        alt={venue.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      {venue.fsa_rating && (
                        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                          <FSABadge rating={venue.fsa_rating} size="small" showLabel={false} />
                        </div>
                      )}
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
`;

const cuisines = [
  { name: 'Indian', emoji: '🍛', url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=85' },
  { name: 'Italian', emoji: '🍝', url: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=700&q=85' },
  { name: 'Japanese', emoji: '🍣', url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=700&q=85' }
];

console.log('🔨 Creating missing cuisine pages...\n');

cuisines.forEach(({ name, emoji, url }) => {
  const filename = `${name.toLowerCase()}.js`;
  const filepath = path.join(PAGES_DIR, filename);
  
  if (fs.existsSync(filepath)) {
    console.log(`✓ ${filename} already exists`);
    return;
  }
  
  const content = cuisineTemplate(name, emoji, url);
  fs.writeFileSync(filepath, content);
  console.log(`✅ Created ${filename}`);
});

console.log('\n✅ All cuisine pages created!\n');
