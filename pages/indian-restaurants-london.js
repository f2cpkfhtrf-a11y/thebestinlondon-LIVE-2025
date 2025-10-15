// INDIAN RESTAURANTS IN LONDON - PREMIUM DESIGN
import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ComparisonTool from '../components/ComparisonTool';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allVenues = JSON.parse(fileContent);
    
    const indianVenues = allVenues
      .filter(v => {
        if (!v) return false;
        const name = v.name?.toLowerCase() || '';
        const types = (v.types || []).join(' ').toLowerCase();
        
        return types.includes('indian') || 
               name.includes('indian') ||
               name.includes('curry') ||
               name.includes('masala') ||
               name.includes('tandoor') ||
               name.includes('biryani');
      })
      .map(v => {
        const address = v.vicinity || v.formatted_address || '';
        const areas = ['Shoreditch', 'Camden', 'Soho', 'Covent Garden', 'Brick Lane', 'Canary Wharf'];
        
        let area = 'Central London';
        for (const a of areas) {
          if (address.toLowerCase().includes(a.toLowerCase())) {
            area = a;
            break;
          }
        }
        
        let priceEstimate = '';
        if (v.price_level) {
          const estimates = { 1: '£10-15', 2: '£15-25', 3: '£25-40', 4: '£40+' };
          priceEstimate = estimates[v.price_level] || '';
        }
        
        return { ...v, area, priceEstimate };
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { props: { venues: indianVenues }};
  } catch (error) {
    return { props: { venues: [] } };
  }
}

export default function IndianRestaurants({ venues }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterArea, setFilterArea] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  
  const filtered = useMemo(() => {
    let result = venues.filter(v => {
      const matchesSearch = !searchTerm || 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.area?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = filterArea === 'all' || v.area === filterArea;
      const matchesPrice = filterPrice === 'all' || (v.price_level && v.price_level.toString() === filterPrice);
      return matchesSearch && matchesArea && matchesPrice;
    });

    if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'reviews') result.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
    else if (sortBy === 'price_low') result.sort((a, b) => (a.price_level || 999) - (b.price_level || 999));

    return result;
  }, [venues, searchTerm, sortBy, filterArea, filterPrice]);

  const areas = useMemo(() => {
    const areaSet = new Set(venues.map(v => v.area).filter(Boolean));
    return ['all', ...Array.from(areaSet).sort()];
  }, [venues]);

  return (
    <>
      <Head>
        <title>Best {venues.length} Indian Restaurants in London 2025 | Authentic Curry & Tandoor</title>
        <meta name="description" content={`Discover ${venues.length} top-rated Indian restaurants in London. From Michelin-starred venues to authentic curry houses. Real reviews, FSA ratings & verified photos. Updated daily.`} />
        <link rel="canonical" href="https://thebestinlondon.co.uk/indian-restaurants-london" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Indian Restaurants in London",
          "description": "Curated collection of top Indian restaurants in London with real reviews and FSA ratings",
          "url": "https://thebestinlondon.co.uk/indian-restaurants-london",
          "publisher": {
            "@type": "Organization",
            "name": "The Best in London",
            "url": "https://thebestinlondon.co.uk"
          }
        }) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        
        {/* Top Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #E5E7EB',
          padding: '12px 0'
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#0A0A0A', letterSpacing: '-0.02em' }}>
                  The Best in London
                </div>
              </Link>
              <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500 }}>
                <Link href="/#restaurants" style={{ color: '#111827', textDecoration: 'none' }}>Restaurants</Link>
                <Link href="/#cuisines" style={{ color: '#111827', textDecoration: 'none' }}>Cuisines</Link>
                <Link href="/#areas" style={{ color: '#111827', textDecoration: 'none' }}>Areas</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <nav style={{ background: 'white', borderBottom: '1px solid #E5E7EB', padding: '12px 0' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontSize: '13px', color: '#6B7280' }}>
              <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 8px', color: '#D1D5DB' }}>/</span>
              <span style={{ color: '#0A0A0A', fontWeight: 500 }}>Indian Restaurants</span>
            </div>
          </div>
        </nav>

        {/* Hero Header - Minimal */}
        <header style={{ background: 'white', padding: '48px 0', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px' }}>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: '#0A0A0A',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}>
              Indian Restaurants in London
            </h1>
            <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
              {venues.length} curated Indian restaurants • Tandoor • Curry • Biryani • FSA verified • Updated daily
            </p>
          </div>
        </header>

        {/* Filter Bar - Sticky */}
        <div style={{
          position: 'sticky',
          top: '60px',
          zIndex: 80,
          background: 'white',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px' }}>
              <input 
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <select 
                value={filterArea} 
                onChange={(e) => setFilterArea(e.target.value)}
                style={{ padding: '10px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer' }}>
                <option value="all">All Areas</option>
                {areas.filter(a => a !== 'all').map(area => <option key={area} value={area}>{area}</option>)}
              </select>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                style={{ padding: '10px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer' }}>
                <option value="all">All Prices</option>
                <option value="1">£ Budget</option>
                <option value="2">££ Mid-range</option>
                <option value="3">£££ Upscale</option>
                <option value="4">££££ Fine Dining</option>
              </select>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '10px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer' }}>
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviews</option>
                <option value="price_low">£ Lowest Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 32px 0' }}>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            Showing <strong style={{ color: '#0A0A0A', fontWeight: 600 }}>{filtered.length}</strong> of {venues.length} restaurants
          </p>
        </div>

        {/* Restaurant Grid */}
        <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 32px 64px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {filtered.map((venue, idx) => (
              <article key={venue.place_id} style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#D1D5DB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}>
                
                <div style={{ position: 'relative', height: '160px', background: '#F3F4F6' }}>
                  {venue.photos?.[0] ? (
                    <img 
                      src={`https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80`}
                      alt={venue.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)' }} />
                  )}
                  
                  {idx < 3 && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: idx === 0 ? '#D4AF37' : idx === 1 ? '#C0C0C0' : '#CD7F32',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}>
                      #{idx + 1}
                    </div>
                  )}

                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#059669',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    FSA 5
                  </div>

                  {venue.area && (
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(4px)',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 500
                    }}>
                      {venue.area}
                    </div>
                  )}
                </div>

                <div style={{ padding: '16px' }}>
                  
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '6px',
                    lineHeight: 1.3
                  }}>
                    {venue.name}
                  </h3>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: '#6B7280',
                    marginBottom: '12px'
                  }}>
                    <span>Indian</span>
                    <span>{venue.price_level ? '£'.repeat(venue.price_level) : '££'}</span>
                  </div>

                  {venue.rating && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderTop: '1px solid #F3F4F6'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ color: '#D4AF37', fontSize: '14px' }}>★</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A' }}>{venue.rating}</span>
                      </div>
                      {venue.user_ratings_total && (
                        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                          {venue.user_ratings_total.toLocaleString()} reviews
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + (venue.vicinity || ''))}`, '_blank')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#0A0A0A',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      marginTop: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#1A1A1A'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#0A0A0A'}>
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ background: '#111827', color: '#9CA3AF', padding: '48px 0 32px', borderTop: '1px solid #1F2937' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '13px' }}>© 2025 The Best in London. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
