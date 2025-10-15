// THAI RESTAURANTS IN LONDON
import { useState, useMemo } from 'react';
import Head from 'next/head';
import ComparisonTool from '../components/ComparisonTool';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allVenues = JSON.parse(fileContent);
    
    const thaiVenues = allVenues
      .filter(v => {
        if (!v) return false;
        const name = v.name?.toLowerCase() || '';
        const types = (v.types || []).join(' ').toLowerCase();
        
        return types.includes('thai') || 
               name.includes('thai') ||
               name.includes('pad thai') ||
               name.includes('tom yum');
      })
      .map(v => {
        const address = v.vicinity || v.formatted_address || '';
        const areas = ['Shoreditch', 'Camden', 'Soho', 'Covent Garden', 'Canary Wharf'];
        
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
    
    return { props: { venues: thaiVenues }};
  } catch (error) {
    return { props: { venues: [] } };
  }
}

export default function ThaiRestaurants({ venues }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterArea, setFilterArea] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  
  const filtered = useMemo(() => {
    let result = venues.filter(v => {
      const matchesSearch = !searchTerm || 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.area?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = filterArea === 'all' || v.area === filterArea;
      return matchesSearch && matchesArea;
    });

    if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'reviews') result.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));

    return result;
  }, [venues, searchTerm, sortBy, filterArea]);

  const areas = useMemo(() => {
    const areaSet = new Set(venues.map(v => v.area).filter(Boolean));
    return ['all', ...Array.from(areaSet).sort()];
  }, [venues]);

  return (
    <>
      <Head>
        <title>Best {venues.length} Thai Restaurants London 2025 | Authentic Pad Thai & Curry</title>
        <meta name="description" content={`Discover ${venues.length} top-rated Thai restaurants in London. Pad Thai, green curry and more. Real photos, ratings & prices.`} />
      </Head>

      <div style={{ minHeight: '100vh', background: '#fafafa' }}>
        <header style={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
          color: 'white', 
          padding: '60px 20px 50px'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🍜</div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '800', margin: '0 0 16px 0' }}>
              Best Thai Restaurants in London
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', opacity: 0.95 }}>
              {venues.length} authentic Thai restaurants • Pad Thai • Green Curry • Tom Yum
            </p>
          </div>
        </header>

        <div style={{ maxWidth: '1400px', margin: '-30px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px' }}>
              <input type="text" placeholder="Search Thai restaurants..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '14px 20px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '10px', outline: 'none' }} />
              <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)}
                style={{ padding: '14px 16px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '10px' }}>
                {areas.map(area => <option key={area} value={area}>{area === 'all' ? 'All Areas' : area}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '14px 16px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '10px' }}>
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviews</option>
              </select>
              <button onClick={() => setShowComparison(!showComparison)}
                style={{ padding: '14px 20px', background: showComparison ? '#f59e0b' : 'white',
                  color: showComparison ? 'white' : '#f59e0b', border: `2px solid #f59e0b`,
                  borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                {showComparison ? '✓ Compare' : '🔍 Compare'}
              </button>
            </div>
          </div>
        </div>

        <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>
          {showComparison && <ComparisonTool venues={filtered} />}
          
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
            <strong style={{ color: '#f59e0b' }}>{filtered.length}</strong> of {venues.length} restaurants
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
            {filtered.map((venue, idx) => (
              <article key={venue.place_id} style={{ background: 'white', borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'all 0.3s' }}>
                <div style={{ height: '220px', position: 'relative', background: '#f59e0b' }}>
                  <img src={`https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80`}
                    alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {idx < 3 && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px',
                      background: idx === 0 ? '#fbbf24' : idx === 1 ? '#d1d5db' : '#cd7f32',
                      color: 'white', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px' }}>
                      #{idx + 1}
                    </div>
                  )}
                  {venue.area && (
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px',
                      background: 'rgba(255,255,255,0.95)', color: '#f59e0b', padding: '6px 12px',
                      borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      📍 {venue.area}
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
                    {venue.name}
                  </h2>
                  <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0' }}>{venue.vicinity}</p>

                  {venue.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      marginBottom: '16px', padding: '12px', background: '#fef3c7', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                        <span style={{ fontSize: '18px', fontWeight: '700' }}>{venue.rating}</span>
                      </div>
                      {venue.user_ratings_total && (
                        <span style={{ color: '#6b7280', fontSize: '13px' }}>
                          {venue.user_ratings_total.toLocaleString()} reviews
                        </span>
                      )}
                    </div>
                  )}

                  {venue.priceEstimate && (
                    <div style={{ marginBottom: '18px', padding: '10px 12px', background: '#fef3c7',
                      borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#d97706', fontWeight: '700', fontSize: '15px' }}>
                        💰 {venue.priceEstimate}pp
                      </span>
                      <span style={{ color: '#f59e0b', fontSize: '14px', fontWeight: '600' }}>
                        {'£'.repeat(venue.price_level || 2)}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.vicinity)}`, '_blank')}
                    style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white', padding: '14px', borderRadius: '12px', fontSize: '15px',
                      fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                    View Details →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
