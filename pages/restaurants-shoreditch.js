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
    
    const keywords = ["Shoreditch","Hoxton"];
    const venues = allVenues.filter(v => {
      const address = v.address?.formatted || v.formatted_address || v.address || '';
      const borough = v.borough || (v.address && typeof v.address === 'object' && v.address.borough) || '';
      const combined = (address + ' ' + borough).toLowerCase();
      
      return keywords.some(k => combined.includes(k.toLowerCase()));
    }).sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    const stats = {
      totalVenues: venues.length,
      halalCount: venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.halal === true || (v.dietaryTags && v.dietaryTags.includes('halal'))).length,
      veganCount: venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegan === true || (v.dietaryTags && v.dietaryTags.includes('vegan'))).length,
      vegetarianCount: venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegetarian === true || (v.dietaryTags && v.dietaryTags.includes('vegetarian'))).length,
      avgRating: venues.length > 0 ? (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1) : 0
    };
    
    return {
      props: { venues, stats, lastUpdated: (typeof data === 'object' && !Array.isArray(data) && data.lastUpdated) ? data.lastUpdated : new Date().toISOString() },
      revalidate: 86400
    };
  } catch (error) {
    return { props: { venues: [], stats: { totalVenues: 0, halalCount: 0, veganCount: 0, vegetarianCount: 0, avgRating: 0 }, lastUpdated: new Date().toISOString() } };
  }
}

export default function ShoreditchRestaurants({ venues, stats, lastUpdated }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredVenues = useMemo(() => {
    switch(activeFilter) {
      case 'all': return venues;
      case 'halal': return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.halal === true || (v.dietaryTags && v.dietaryTags.includes('halal')));
      case 'vegan': return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegan === true || (v.dietaryTags && v.dietaryTags.includes('vegan')));
      case 'vegetarian': return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.vegetarian === true || (v.dietaryTags && v.dietaryTags.includes('vegetarian')));
      case 'gluten-free': return venues.filter(v => v.dietary_tags && typeof v.dietary_tags === 'object' && v.dietary_tags.gluten_free === true || (v.dietaryTags && v.dietaryTags.includes('gluten-free')));
      case 'top-rated': return venues.filter(v => v.rating >= 4.5);
      default: return venues;
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
      <title>Best Restaurants in Shoreditch 2025 — {stats.totalVenues}+ Top Rated | The Best in London</title>
      <meta name="description" content={`Discover ${stats.totalVenues}+ best restaurants in Shoreditch. Trendy dining, halal, vegan options. Real reviews, FSA verified.`} />
      <link rel="canonical" href="https://thebestinlondon.co.uk/restaurants-shoreditch" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Restaurants in Shoreditch",
        "description": `Discover ${stats.totalVenues}+ best restaurants in Shoreditch. Trendy dining, halal, vegan options.`,
        "url": "https://thebestinlondon.co.uk/restaurants-shoreditch"
      }) }} />
    </Head>

    <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
      
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(11,11,11,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${theme.colors.border.subtle}`, padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}><div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>The Best in London</div></Link>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link href="/east-london" style={{ fontSize: '14px', color: theme.colors.text.secondary, textDecoration: 'none' }}>East London</Link>
              <Link href="/" style={{ fontSize: '14px', color: theme.colors.text.secondary, textDecoration: 'none' }}>Home</Link>
            </div>
          </div>
        </div>
      </nav>

      <header style={{ position: 'relative', height: '50vh', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: `linear-gradient(to bottom, rgba(11,11,11,0.4), rgba(11,11,11,0.8)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=2400&q=90')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '700px', padding: '0 20px' }}>
          <h1 style={{ fontFamily: theme.typography.serif, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: theme.spacing.lg }}>Restaurants in Shoreditch</h1>
          <p style={{ fontSize: '18px', color: 'rgba(245,245,245,0.9)', marginBottom: theme.spacing.xl }}>{stats.totalVenues}+ curated venues • ⭐ {stats.avgRating} avg rating</p>
          {stats.halalCount > 0 && (<div style={{ display: 'inline-block', padding: `${theme.spacing.sm} ${theme.spacing.lg}`, background: 'rgba(212,175,55,0.15)', backdropFilter: 'blur(8px)', borderRadius: theme.radius.md, border: `1px solid ${theme.colors.accent.gold}50`, fontSize: '14px', fontWeight: 600, color: theme.colors.accent.gold }}>☪️ {stats.halalCount}+ Halal Options Available</div>)}
        </div>
      </header>

      <section style={{ position: 'sticky', top: '64px', zIndex: 90, background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${theme.colors.border.subtle}`, padding: '20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.colors.text.secondary, marginBottom: '12px', fontWeight: 600 }}>Filter by Dietary Preference</div>
          <div style={{ display: 'flex', gap: theme.spacing.md, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {filters.map(filter => (<button key={filter.id} onClick={() => setActiveFilter(filter.id)} style={{ padding: `${theme.spacing.sm} ${theme.spacing.lg}`, border: `2px solid ${activeFilter === filter.id ? theme.colors.accent.gold : theme.colors.border.subtle}`, borderRadius: theme.radius.xl, fontSize: '14px', fontWeight: 600, background: activeFilter === filter.id ? theme.colors.accent.gold : 'transparent', color: activeFilter === filter.id ? theme.colors.text.inverse : theme.colors.text.secondary, whiteSpace: 'nowrap', cursor: 'pointer', transition: `all ${theme.motion.fast}`, display: 'flex', alignItems: 'center', gap: '6px' }}><span>{filter.emoji}</span><span>{filter.label}</span><span style={{ opacity: 0.7, fontSize: '13px' }}>({filter.count})</span></button>))}
          </div>
        </div>
      </section>

      <section style={{ padding: `${theme.spacing['5xl']} 0` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ marginBottom: theme.spacing['3xl'] }}>
            <h2 style={{ fontFamily: theme.typography.serif, fontSize: '32px', fontWeight: 700, marginBottom: theme.spacing.md }}>{activeFilter === 'all' ? 'All Restaurants' : activeFilter === 'halal' ? 'Halal Restaurants' : activeFilter === 'vegan' ? 'Vegan Restaurants' : activeFilter === 'vegetarian' ? 'Vegetarian Restaurants' : activeFilter === 'top-rated' ? 'Top Rated (4.5+)' : 'Restaurants'}</h2>
            <p style={{ fontSize: '16px', color: theme.colors.text.secondary }}>{filteredVenues.length} venues in Shoreditch</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: theme.spacing['2xl'] }}>
            {filteredVenues.map((venue, idx) => (
              <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none' }}>
                <article onMouseEnter={() => setHoveredCard(idx)} onMouseLeave={() => setHoveredCard(null)} style={{ background: theme.colors.bg.elevated, borderRadius: theme.radius.lg, overflow: 'hidden', border: `1px solid ${hoveredCard === idx ? theme.colors.border.prominent : theme.colors.border.subtle}`, transition: `all ${theme.motion.base}`, transform: hoveredCard === idx ? 'translateY(-8px)' : 'translateY(0)', boxShadow: hoveredCard === idx ? theme.shadows.lg : theme.shadows.sm, cursor: 'pointer' }}>
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    {venue.photos && venue.photos[0] ? (<img src={venue.photos[0].url || `https://images.unsplash.com/photo-${['fdlZBWIP0aM', 'MqT0asuoIcU', 'N_Y88TWmGwA'][idx % 3]}?w=800&q=85`} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hoveredCard === idx ? 'scale(1.05)' : 'scale(1)', transition: `transform ${theme.motion.slow}` }} />) : (<div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)' }} />)}
                    {venue.fsa_rating && (<div style={{ position: 'absolute', top: theme.spacing.md, right: theme.spacing.md }}><FSABadge rating={venue.fsa_rating} size="large" showLabel={false} variant="card" /></div>)}
                  </div>
                  <div style={{ padding: theme.spacing.xl }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: theme.spacing.sm }}>{venue.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
                      <span>{venue.cuisines?.[0] || 'Restaurant'}</span>
                      <span>{venue.price_range || venue.price_level ? '£'.repeat(venue.price_level) : '££'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${theme.spacing.md} 0`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                        <span style={{ color: theme.colors.accent.gold, fontSize: '16px' }}>★</span>
                        <span style={{ fontSize: '16px', fontWeight: 600 }}>{venue.rating || 'N/A'}</span>
                      </div>
                      {venue.user_ratings_total && (<span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>{venue.user_ratings_total.toLocaleString()} reviews</span>)}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['4xl']} 0`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <Link href="/" style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary, textDecoration: 'none' }}>The Best in London</Link>
          <p style={{ fontSize: '13px', color: theme.colors.text.secondary, marginTop: theme.spacing.lg }}>© 2025 • Last Updated: {new Date(lastUpdated).toLocaleDateString('en-GB')}</p>
        </div>
      </footer>
    </div>
  </>);
}
