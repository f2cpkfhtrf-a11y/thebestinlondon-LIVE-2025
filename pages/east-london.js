import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import FSABadge from '../components/FSABadge';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const allVenues = Array.isArray(data) ? data : (data.venues || []);
    
    // East London boroughs
    const eastLondonBoroughs = [
      'Tower Hamlets', 'Hackney', 'Newham', 'Redbridge', 'Havering',
      'Waltham Forest', 'Barking and Dagenham'
    ];
    
    // East London keywords for fallback
    const eastLondonKeywords = [
      'whitechapel', 'bethnal green', 'canary wharf', 'bow', 'mile end',
      'stratford', 'ilford', 'romford', 'hackney', 'shoreditch', 'hoxton',
      'poplar', 'limehouse', 'stepney', 'wapping', 'shadwell', 'aldgate',
      'spitalfields', 'brick lane', 'columbia road', 'victoria park',
      'hackney wick', 'dalston', 'stoke newington', 'clapton',
      'west ham', 'plaistow', 'east ham', 'barking', 'dagenham',
      'leyton', 'leytonstone', 'walthamstow', 'chingford',
      'woodford', 'redbridge', 'gants hill', 'seven kings',
      'chadwell heath', 'harold hill', 'rainham', 'upminster'
    ];
    
    const venues = allVenues.filter(v => {
      const borough = v.borough || (v.address && typeof v.address === 'object' && v.address.borough);
      const address = v.address?.formatted || v.formatted_address || v.address || '';
      
      // Check borough match
      if (borough && eastLondonBoroughs.some(b => borough.toLowerCase().includes(b.toLowerCase()))) {
        return true;
      }
      
      // Check address keywords
      if (address && eastLondonKeywords.some(k => address.toLowerCase().includes(k))) {
        return true;
      }
      
      return false;
    });
    
    // Calculate stats
    const totalVenues = venues.length;
    const halalCount = venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.halal === true || (v.dietaryTags && v.dietaryTags.includes('halal'))).length;
    const veganCount = venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegan === true || (v.dietaryTags && v.dietaryTags.includes('vegan'))).length;
    const vegetarianCount = venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegetarian === true || (v.dietaryTags && v.dietaryTags.includes('vegetarian'))).length;
    const avgRating = venues.length > 0 ? (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1) : 0;
    
    // Group by area
    const byArea = {};
    venues.forEach(v => {
      const address = v.address?.formatted || v.formatted_address || v.address || '';
      let area = 'Other';
      
      for (const keyword of eastLondonKeywords) {
        if (address.toLowerCase().includes(keyword)) {
          area = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          break;
        }
      }
      
      if (!byArea[area]) byArea[area] = 0;
      byArea[area]++;
    });
    
    const areas = Object.entries(byArea)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([name, count]) => ({ name, count }));
    
    return {
      props: {
        venues: venues.sort((a, b) => (b.rating || 0) - (a.rating || 0)),
        stats: {
          totalVenues,
          halalCount,
          veganCount,
          vegetarianCount,
          avgRating
        },
        areas,
        lastUpdated: (typeof data === 'object' && !Array.isArray(data) && data.lastUpdated) ? data.lastUpdated : new Date().toISOString()
      },
      revalidate: 86400
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        venues: [],
        stats: { totalVenues: 0, halalCount: 0, veganCount: 0, vegetarianCount: 0, avgRating: 0 },
        areas: [],
        lastUpdated: new Date().toISOString()
      }
    };
  }
}

export default function EastLondon({ venues, stats, areas, lastUpdated }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredVenues = useMemo(() => {
    switch(activeFilter) {
      case 'all':
        return venues;
      case 'halal':
        return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.halal === true || (v.dietaryTags && v.dietaryTags.includes('halal')));
      case 'vegan':
        return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegan === true || (v.dietaryTags && v.dietaryTags.includes('vegan')));
      case 'vegetarian':
        return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegetarian === true || (v.dietaryTags && v.dietaryTags.includes('vegetarian')));
      case 'gluten-free':
        return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.gluten_free === true || (v.dietaryTags && v.dietaryTags.includes('gluten-free')));
      case 'top-rated':
        return venues.filter(v => v.rating >= 4.5);
      default:
        return venues;
    }
  }, [activeFilter, venues]);

  const filters = [
    { id: 'all', label: 'All', count: venues.length, emoji: '🍽️' },
    { id: 'halal', label: 'Halal', count: stats.halalCount, emoji: '☪️' },
    { id: 'vegan', label: 'Vegan', count: stats.veganCount, emoji: '🌱' },
    { id: 'vegetarian', label: 'Vegetarian', count: stats.vegetarianCount, emoji: '🥗' },
    { id: 'top-rated', label: 'Top Rated', count: venues.filter(v => v.rating >= 4.5).length, emoji: '⭐' },
  ];

  return (<>
    <Head>
      <title>Best Restaurants in East London 2025 — {stats.totalVenues}+ Curated Venues | The Best in London</title>
      <meta name="description" content={`Discover ${stats.totalVenues}+ best restaurants in East London. Halal, vegan, vegetarian options. Whitechapel, Stratford, Canary Wharf & more.`} />
      <link rel="canonical" href="https://thebestinlondon.co.uk/east-london" />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Best Restaurants in East London",
        "description": `Directory of ${stats.totalVenues} top-rated restaurants in East London`,
        "url": "https://thebestinlondon.co.uk/east-london",
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

    <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
      
      {/* Nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(11,11,11,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.colors.border.subtle}`,
        padding: '16px 0',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>
                The Best in London
              </div>
            </Link>
            <Link href="/" style={{ fontSize: '14px', color: theme.colors.text.secondary, textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header style={{
        position: 'relative',
        height: '60vh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: `linear-gradient(to bottom, rgba(11,11,11,0.4), rgba(11,11,11,0.8)), url('https://images.unsplash.com/photo-1513267048331-5611cad62662?w=2400&q=90')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <h1 style={{
            fontFamily: theme.typography.serif,
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: theme.spacing.xl
          }}>
            East London Restaurants
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'rgba(245,245,245,0.9)',
            marginBottom: theme.spacing['2xl']
          }}>
            From Whitechapel to Stratford • {stats.totalVenues}+ curated venues
          </p>

          <div style={{ display: 'flex', gap: theme.spacing.lg, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: `${stats.halalCount}+ Halal`, emoji: '☪️' },
              { label: `${stats.veganCount}+ Vegan`, emoji: '🌱' },
              { label: `⭐ ${stats.avgRating} Avg Rating`, emoji: '⭐' },
            ].map((stat, idx) => (
              <div key={idx} style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: theme.radius.md,
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '14px',
                fontWeight: 600
              }}>
                {stat.emoji} {stat.label}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Filters - Sticky */}
      <section style={{
        position: 'sticky',
        top: '64px',
        zIndex: 90,
        background: 'rgba(17,17,17,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.colors.border.subtle}`,
        padding: '20px 0',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.colors.text.secondary, marginBottom: '12px', fontWeight: 600 }}>
            Filter by Dietary Preference
          </div>
          <div style={{ display: 'flex', gap: theme.spacing.md, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                  border: `2px solid ${activeFilter === filter.id ? theme.colors.accent.gold : theme.colors.border.subtle}`,
                  borderRadius: theme.radius.xl,
                  fontSize: '14px',
                  fontWeight: 600,
                  background: activeFilter === filter.id ? theme.colors.accent.gold : 'transparent',
                  color: activeFilter === filter.id ? theme.colors.text.inverse : theme.colors.text.secondary,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: `all ${theme.motion.fast}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{filter.emoji}</span>
                <span>{filter.label}</span>
                <span style={{ opacity: 0.7, fontSize: '13px' }}>({filter.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section style={{ padding: `${theme.spacing['4xl']} 0`, background: theme.colors.bg.elevated }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{
            fontFamily: theme.typography.serif,
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: theme.spacing['2xl']
          }}>
            Explore by Area
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: theme.spacing.xl }}>
            {areas.map(area => (
              <Link key={area.name} href={`/restaurants-${area.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: theme.spacing.xl,
                  background: theme.colors.bg.primary,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  borderRadius: theme.radius.lg,
                  transition: `all ${theme.motion.base}`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.accent.gold;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.colors.border.subtle;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.xs }}>
                    {area.name}
                  </div>
                  <div style={{ fontSize: '14px', color: theme.colors.text.secondary }}>
                    {area.count} restaurants
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Cards */}
      <section style={{ padding: `${theme.spacing['5xl']} 0` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{
              fontFamily: theme.typography.serif,
              fontSize: '36px',
              fontWeight: 700,
              marginBottom: theme.spacing.md
            }}>
              {activeFilter === 'all' ? 'All Restaurants' :
               activeFilter === 'halal' ? 'Halal Restaurants' :
               activeFilter === 'vegan' ? 'Vegan Restaurants' :
               activeFilter === 'vegetarian' ? 'Vegetarian Restaurants' :
               activeFilter === 'top-rated' ? 'Top Rated (4.5+)' :
               'Restaurants'}
            </h2>
            <p style={{ fontSize: '16px', color: theme.colors.text.secondary }}>
              {filteredVenues.length} venues matching your preferences
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: theme.spacing['2xl']
          }}>
            {filteredVenues.map((venue, idx) => (
              <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none' }}>
                <article 
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: theme.colors.bg.elevated,
                    borderRadius: theme.radius.lg,
                    overflow: 'hidden',
                    border: `1px solid ${hoveredCard === idx ? theme.colors.border.prominent : theme.colors.border.subtle}`,
                    transition: `all ${theme.motion.base}`,
                    transform: hoveredCard === idx ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredCard === idx ? theme.shadows.lg : theme.shadows.sm,
                    cursor: 'pointer'
                  }}>
                  
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    {venue.photos && venue.photos[0] ? (
                      <img 
                        src={venue.photos[0].url || `https://images.unsplash.com/photo-${['fdlZBWIP0aM', 'MqT0asuoIcU', 'N_Y88TWmGwA'][idx % 3]}?w=800&q=85`}
                        alt={venue.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transform: hoveredCard === idx ? 'scale(1.05)' : 'scale(1)',
                          transition: `transform ${theme.motion.slow}`
                        }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)' }} />
                    )}
                    
                    {venue.fsa_rating && (
                      <div style={{ position: 'absolute', top: theme.spacing.md, right: theme.spacing.md }}>
                        <FSABadge rating={venue.fsa_rating} size="large" showLabel={false} variant="card" />
                      </div>
                    )}
                  </div>

                  <div style={{ padding: theme.spacing.xl }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing.sm
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
                      <span>{venue.cuisines?.[0] || 'Restaurant'}</span>
                      <span>{venue.price_range || venue.price_level ? '£'.repeat(venue.price_level) : '££'}</span>
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
                        <span style={{ fontSize: '16px', fontWeight: 600 }}>{venue.rating || 'N/A'}</span>
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
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['4xl']} 0`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <Link href="/" style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary, textDecoration: 'none' }}>
            The Best in London
          </Link>
          <p style={{ fontSize: '13px', color: theme.colors.text.secondary, marginTop: theme.spacing.lg }}>
            © 2025 • Last Updated: {new Date(lastUpdated).toLocaleDateString('en-GB')}
          </p>
        </div>
      </footer>
    </div>
  </>);
}
