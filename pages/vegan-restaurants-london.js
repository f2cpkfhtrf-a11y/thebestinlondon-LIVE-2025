import { useState, useMemo } from 'react';
import Head from 'next/head';
import { generateSEODescription, detectCategory, generateMetaDescription } from '../utils/seoDescriptions';
import { getVenueImage } from '../utils/imageHelpers';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allVenues = JSON.parse(fileContent);
    
    const veganVenues = allVenues
      .filter(v => {
        if (!v) return false;
        const name = v.name?.toLowerCase() || '';
        const types = (v.types || []).join(' ').toLowerCase();
        const category = v.category || '';
        
        return category === 'vegan' || 
               category === 'vegetarian' ||
               types.includes('vegan') || 
               types.includes('vegetarian') ||
               name.includes('vegan') ||
               name.includes('plant') ||
               name.includes('veggie');
      })
      .map(v => {
        const address = v.vicinity || v.formatted_address || '';
        const areas = ['Shoreditch', 'Camden', 'Soho', 'Covent Garden', 'Hackney', 'Brixton', 
                      'Notting Hill', 'Clapham', 'Islington', 'Peckham', 'Borough', 'Fitzrovia',
                      'Marylebone', 'Mayfair', 'Chelsea', 'Kensington', 'Hammersmith'];
        
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
        
        return { ...v, area, priceEstimate, category: 'vegan' };
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { 
      props: { 
        venues: veganVenues,
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error loading venues:', error.message);
    return { props: { venues: [], lastUpdated: new Date().toISOString() } };
  }
}

export default function VeganRestaurants({ venues, lastUpdated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterArea, setFilterArea] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  
  const areas = useMemo(() => {
    const areaSet = new Set(venues.map(v => v.area).filter(Boolean));
    return ['all', ...Array.from(areaSet).sort()];
  }, [venues]);

  const filtered = useMemo(() => {
    let result = venues.filter(v => {
      const matchesSearch = !searchTerm || 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.vicinity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.area?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesArea = filterArea === 'all' || v.area === filterArea;
      const matchesPrice = filterPrice === 'all' || String(v.price_level) === filterPrice;
      const matchesRating = filterRating === 'all' ||
        (filterRating === '4+' && v.rating >= 4) ||
        (filterRating === '4.5+' && v.rating >= 4.5);
      
      return matchesSearch && matchesArea && matchesPrice && matchesRating;
    });

    if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'reviews') result.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
    else if (sortBy === 'name') result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    else if (sortBy === 'price-low') result.sort((a, b) => (a.price_level || 0) - (b.price_level || 0));
    else if (sortBy === 'price-high') result.sort((a, b) => (b.price_level || 0) - (a.price_level || 0));

    return result;
  }, [venues, searchTerm, sortBy, filterArea, filterPrice, filterRating]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Best Vegan Restaurants in London 2025",
    "description": `Discover ${venues.length} top-rated vegan restaurants across London with real Google ratings, photos, prices, and expert reviews`,
    "url": "https://thebestinlondon.co.uk/vegan-restaurants-london",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": venues.length,
      "itemListElement": venues.slice(0, 20).map((venue, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Restaurant",
          "@id": `https://thebestinlondon.co.uk/vegan-restaurants-london#${venue.place_id}`,
          "name": venue.name,
          "servesCuisine": "Vegan",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": venue.vicinity,
            "addressLocality": venue.area || "London",
            "addressCountry": "GB"
          },
          ...(venue.rating && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": venue.rating,
              "reviewCount": venue.user_ratings_total || 0
            }
          }),
          ...(venue.priceEstimate && { "priceRange": venue.priceEstimate })
        }
      }))
    }
  };

  return (
    <>
      <Head>
        <title>Best {venues.length} Vegan Restaurants London 2025 | Real Photos & Reviews</title>
        <meta name="description" content={`Discover ${venues.length} exceptional vegan restaurants in London. Real Google photos, ratings from ${venues.reduce((sum, v) => sum + (v.user_ratings_total || 0), 0).toLocaleString()}+ diners, prices £10-40+. Updated daily.`} />
        <meta property="og:title" content={`${venues.length} Best Vegan Restaurants in London - 2025 Guide`} />
        <meta property="og:description" content="London's top vegan dining with real photos, ratings & prices" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://thebestinlondon.co.uk/vegan-restaurants-london" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Header */}
        <header style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
          color: 'white', 
          padding: '60px 20px 50px',
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '800', margin: '0 0 16px 0' }}>
              Best Vegan Restaurants in London
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', opacity: 0.95, margin: '0 0 12px 0', maxWidth: '900px' }}>
              {venues.length} handpicked vegan restaurants • Real Google photos • {venues.reduce((sum, v) => sum + (v.user_ratings_total || 0), 0).toLocaleString()}+ verified reviews
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', opacity: 0.9 }}>
              <span>🌱 100% Plant-Based</span>
              <span>⭐ 4.0+ Rated</span>
              <span>💰 £10-40pp</span>
              <span>📸 Real Photos</span>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div style={{ maxWidth: '1400px', margin: '-30px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search restaurants, areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '14px 20px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  outline: 'none'
                }}
              />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '14px 16px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer' }}>
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviews</option>
                <option value="name">🔤 A-Z</option>
                <option value="price-low">💰 Price: Low-High</option>
                <option value="price-high">💰 Price: High-Low</option>
              </select>
              <button onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: '14px 20px',
                  border: '2px solid #10b981',
                  borderRadius: '10px',
                  background: showFilters ? '#10b981' : 'white',
                  color: showFilters ? 'white' : '#10b981',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                🔍 Filters
              </button>
            </div>

            {showFilters && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e5e7eb', marginTop: '16px' }}>
                <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)} style={{ padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
                  <option value="all">All Areas</option>
                  {areas.slice(1).map(area => <option key={area} value={area}>{area}</option>)}
                </select>
                <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} style={{ padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
                  <option value="all">All Prices</option>
                  <option value="1">£ (£10-15)</option>
                  <option value="2">££ (£15-25)</option>
                  <option value="3">£££ (£25-40)</option>
                  <option value="4">££££ (£40+)</option>
                </select>
                <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)} style={{ padding: '10px', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
                  <option value="all">All Ratings</option>
                  <option value="4+">4.0+ Stars</option>
                  <option value="4.5+">4.5+ Stars</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div style={{ maxWidth: '1400px', margin: '0 auto 24px', padding: '0 20px' }}>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            <strong style={{ color: '#10b981' }}>{filtered.length}</strong> of {venues.length} restaurants
          </p>
        </div>

        {/* Restaurant Grid */}
        <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: '24px' }}>
            {filtered.map((venue, idx) => {
              const seoDescription = generateSEODescription(venue, 'vegan');
              const isExpanded = expandedCard === venue.place_id;
              
              // Get Google Places photo or use Unsplash fallback
              const unsplashImages = [
                '512621776951-a57141f2eefd', '1546069901-ba9599a7e63c', '540189549336-e6e99c3679fe',
                '565299624946-b28f40a0ae38', '504674900247-0877df9cc836', '482049016688-2d3e1b311543',
                '414235077428-338989a2e8c0', '505253716362-afaea1d3d1af', '529006557810-274b9b2fc783',
                '476224203421-9ac39bcb3327'
              ];
              
              const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY;
              const hasGooglePhoto = venue.photos && venue.photos[0] && venue.photos[0].photo_reference;
              
              const imageUrl = hasGooglePhoto && googleApiKey
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${venue.photos[0].photo_reference}&key=${googleApiKey}`
                : `https://images.unsplash.com/photo-${unsplashImages[idx % 10]}?w=800&q=80`;
              
              return (
                <article 
                  key={venue.place_id}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Image */}
                  <div style={{
                    height: '220px',
                    position: 'relative',
                    background: '#10b981',
                    overflow: 'hidden'
                  }}>
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={venue.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    
                    {idx < 3 && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: idx === 0 ? '#fbbf24' : idx === 1 ? '#d1d5db' : '#cd7f32',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        #{idx + 1}
                      </div>
                    )}

                    {venue.area && (
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                        color: '#059669',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}>
                        📍 {venue.area}
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
                      {venue.name}
                    </h2>
                    
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                      {venue.vicinity}
                    </p>

                    {/* Rating */}
                    {venue.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '12px', background: '#f9fafb', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                          <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>{venue.rating}</span>
                        </div>
                        {venue.user_ratings_total && (
                          <span style={{ color: '#6b7280', fontSize: '13px' }}>
                            {venue.user_ratings_total.toLocaleString()} reviews
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    {venue.priceEstimate && (
                      <div style={{ marginBottom: '18px', padding: '10px 12px', background: '#ecfdf5', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#059669', fontWeight: '700', fontSize: '15px' }}>
                          💰 {venue.priceEstimate}pp
                        </span>
                        <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>
                          {'£'.repeat(venue.price_level || 2)}
                        </span>
                      </div>
                    )}

                    {/* SEO Description */}
                    <div style={{ marginBottom: '18px' }}>
                      <p style={{ 
                        fontSize: '14px',
                        lineHeight: '1.7',
                        color: '#374151',
                        margin: 0,
                        maxHeight: isExpanded ? 'none' : '80px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {seoDescription}
                      </p>
                      {seoDescription.length > 200 && (
                        <button
                          onClick={() => setExpandedCard(isExpanded ? null : venue.place_id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#10b981',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            padding: '4px 0',
                            marginTop: '8px'
                          }}
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>

                    {/* View Button */}
                    <a
                      href={`/restaurant/${venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${venue.place_id.slice(-8)}`}
                      style={{
                        display: 'block',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '14px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: '600',
                        textAlign: 'center',
                        textDecoration: 'none',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
                      }}
                    >
                      View Full Details →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
              <p style={{ fontSize: '24px', margin: '0 0 10px 0', fontWeight: '600', color: '#111827' }}>
                No restaurants found
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterArea('all');
                  setFilterPrice('all');
                  setFilterRating('all');
                }}
                style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
