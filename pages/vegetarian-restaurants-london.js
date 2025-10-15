import { useState, useMemo } from 'react';
import Head from 'next/head';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allVenues = JSON.parse(fileContent);
    
    const vegetarianVenues = allVenues
      .filter(v => {
        if (!v) return false;
        const name = v.name?.toLowerCase() || '';
        const types = (v.types || []).join(' ').toLowerCase();
        const category = v.category || '';
        
        return category === 'vegetarian' || 
               types.includes('vegetarian') ||
               name.includes('vegetarian');
      })
      .map(v => {
        const address = v.vicinity || v.formatted_address || '';
        const areas = ['Shoreditch', 'Camden', 'Soho', 'Covent Garden', 'Hackney', 'Brixton', 
                      'Notting Hill', 'Clapham', 'Islington', 'Peckham', 'Borough', 'Fitzrovia',
                      'Marylebone', 'Mayfair', 'Chelsea', 'Kensington', 'Hammersmith', 'Dalston'];
        
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
    
    return { 
      props: { 
        venues: vegetarianVenues,
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    return { props: { venues: [], lastUpdated: new Date().toISOString() } };
  }
}

export default function VegetarianRestaurants({ venues, lastUpdated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterArea, setFilterArea] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const areas = useMemo(() => {
    const areaSet = new Set(venues.map(v => v.area).filter(Boolean));
    return ['all', ...Array.from(areaSet).sort()];
  }, [venues]);

  const filtered = useMemo(() => {
    let result = venues.filter(v => {
      const matchesSearch = !searchTerm || 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.vicinity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.formatted_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.area?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesArea = filterArea === 'all' || v.area === filterArea;
      const matchesPrice = filterPrice === 'all' || 
        (filterPrice === '1' && v.price_level === 1) ||
        (filterPrice === '2' && v.price_level === 2) ||
        (filterPrice === '3' && v.price_level === 3) ||
        (filterPrice === '4' && v.price_level === 4);
      
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
    "name": "Best Vegetarian Restaurants in London 2025",
    "description": "Comprehensive directory of the top-rated vegetarian restaurants in London with real reviews, prices, and locations",
    "url": "https://thebestinlondon.co.uk/vegetarian-restaurants-london",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Top Vegetarian Restaurants in London",
      "description": `${venues.length} carefully curated vegetarian dining options across London`,
      "numberOfItems": venues.length,
      "itemListElement": venues.slice(0, 20).map((venue, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Restaurant",
          "@id": `https://thebestinlondon.co.uk/vegetarian-restaurants-london#${venue.place_id}`,
          "name": venue.name,
          "servesCuisine": "Vegetarian",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": venue.vicinity || venue.formatted_address,
            "addressLocality": venue.area || "London",
            "addressRegion": "Greater London",
            "addressCountry": "GB"
          },
          ...(venue.rating && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": venue.rating,
              "bestRating": 5,
              "worstRating": 1,
              ...(venue.user_ratings_total && { "reviewCount": venue.user_ratings_total })
            }
          }),
          ...(venue.priceEstimate && { "priceRange": venue.priceEstimate })
        }
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the best vegetarian restaurants in London?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `London has over ${venues.length} excellent vegetarian restaurants. Top-rated options include establishments in Camden, Shoreditch, and Soho, with ratings consistently above 4.5 stars.`
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to eat at vegetarian restaurants in London?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vegetarian restaurants in London range from £10-15 per person for casual spots to £40+ for fine dining. Most mid-range vegetarian restaurants cost around £15-25 per person."
        }
      },
      {
        "@type": "Question",
        "name": "Which areas have the most vegetarian restaurants in London?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Camden, Shoreditch, Hackney, and Islington have the highest concentration of vegetarian and plant-based restaurants in London."
        }
      },
      {
        "@type": "Question",
        "name": "Do vegetarian restaurants in London serve vegan food?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most vegetarian restaurants in London offer extensive vegan options. Many modern vegetarian restaurants are fully plant-based or vegan-friendly with clear menu labeling."
        }
      },
      {
        "@type": "Question",
        "name": "Are vegetarian restaurants in London child-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, most vegetarian restaurants in London are family-friendly with children's menus available. Many also offer high chairs and changing facilities."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thebestinlondon.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "Vegetarian Restaurants London", "item": "https://thebestinlondon.co.uk/vegetarian-restaurants-london" }
    ]
  };

  return (<>
    <Head>
      <title>Best Vegetarian Restaurants in London 2025 - {venues.length} Top Rated Options | The Best in London</title>
      <meta name="description" content={`Discover ${venues.length} of the best vegetarian restaurants in London. Expert-curated list with real Google ratings, prices £10-40+, and locations. Updated ${new Date(lastUpdated).toLocaleDateString()}.`} />
      <meta name="keywords" content="vegetarian restaurants london, best veggie food london, vegetarian dining london, plant based restaurants, meat free restaurants london" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://thebestinlondon.co.uk/vegetarian-restaurants-london" />
      <meta property="og:title" content={`${venues.length} Best Vegetarian Restaurants in London 2025`} />
      <meta property="og:description" content="Comprehensive guide to London's top vegetarian restaurants" />
      <link rel="canonical" href="https://thebestinlondon.co.uk/vegetarian-restaurants-london" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </Head>

    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '12px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <nav style={{ fontSize: '14px', color: '#6b7280' }}>
            <a href="/" style={{ color: '#16a34a', textDecoration: 'none' }}>Home</a>
            <span style={{ margin: '0 8px' }}>›</span>
            <span>Vegetarian Restaurants London</span>
          </nav>
        </div>
      </div>

      <header style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: 'white', padding: '60px 20px 50px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.2' }}>
            Best Vegetarian Restaurants in London
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', opacity: 0.95, margin: '0 0 12px 0', lineHeight: '1.6', maxWidth: '900px' }}>
            {venues.length} expertly curated vegetarian restaurants across London, ranked by real Google ratings
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', opacity: 0.9, marginTop: '16px' }}>
            <span>🥗 100% Vegetarian</span>
            <span>⭐ Real Google Ratings</span>
            <span>💰 Prices from £10-40+</span>
            <span>📍 All London Areas</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '-30px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
            <input type="text" placeholder="Search by name or area..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '14px 20px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '10px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#16a34a'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '14px 16px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer', background: 'white', minWidth: '160px' }}>
              <option value="rating">⭐ Highest Rated</option>
              <option value="reviews">💬 Most Reviews</option>
              <option value="name">🔤 Alphabetical</option>
              <option value="price-low">💰 Price: Low-High</option>
              <option value="price-high">💰 Price: High-Low</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)}
              style={{ padding: '14px 20px', fontSize: '16px', border: '2px solid #16a34a', borderRadius: '10px', 
                      background: showFilters ? '#16a34a' : 'white', color: showFilters ? 'white' : '#16a34a', 
                      cursor: 'pointer', fontWeight: '600', minWidth: '120px' }}>
              🔍 Filters
            </button>
          </div>

          {showFilters && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>📍 Area</label>
                <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                  <option value="all">All Areas</option>
                  {areas.slice(1).map(area => <option key={area} value={area}>{area}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>💰 Price</label>
                <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                  <option value="all">All Prices</option>
                  <option value="1">£ (£10-15)</option>
                  <option value="2">££ (£15-25)</option>
                  <option value="3">£££ (£25-40)</option>
                  <option value="4">££££ (£40+)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>⭐ Rating</label>
                <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                  <option value="all">All Ratings</option>
                  <option value="4+">4.0+ Stars</option>
                  <option value="4.5+">4.5+ Stars</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 24px', padding: '0 20px' }}>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
          Showing <strong style={{ color: '#16a34a' }}>{filtered.length}</strong> of <strong>{venues.length}</strong> restaurants
        </p>
      </div>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: '24px' }}>
            {filtered.map((venue, idx) => {
              // Get Google Places photo or use Unsplash fallback
              const unsplashImages = [
                '1414235077428-338989a2e8c0', '1565299624946-b28f40a0ae38', '1512621776951-a57141f2eefd',
                '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe', '1504674900247-0877df9cc836',
                '1482049016688-2d3e1b311543', '1529006557810-274b9b2fc783', '1476224203421-9ac39bcb3327',
                '1505253716362-afaea1d3d1af'
              ];
              
              const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY;
              const hasGooglePhoto = venue.photos && venue.photos[0] && venue.photos[0].photo_reference;
              
              const imageUrl = hasGooglePhoto && googleApiKey
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${venue.photos[0].photo_reference}&key=${googleApiKey}`
                : `https://images.unsplash.com/photo-${unsplashImages[idx % 10]}?w=800&q=80`;
              
              const imageInfo = { url: imageUrl, alt: venue.name };
              
              return (
              <article key={venue.place_id || idx} itemScope itemType="https://schema.org/Restaurant"
                style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s', cursor: 'pointer', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}>
                
                <div style={{
                  height: '220px',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={imageInfo.url} 
                    alt={imageInfo.alt}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 64px;">🥗</div>';
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  {idx < 3 && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: idx === 0 ? '#fbbf24' : idx === 1 ? '#d1d5db' : '#cd7f32',
                                color: 'white', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                      #{idx + 1} Top Rated
                    </div>
                  )}
                  {venue.area && (
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(255,255,255,0.95)', color: '#15803d',
                                padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      📍 {venue.area}
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 itemProp="name" style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827', lineHeight: '1.3' }}>
                    {venue.name}
                  </h2>
                  <p itemProp="address" style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0', lineHeight: '1.5', flex: 1 }}>
                    {venue.vicinity || venue.formatted_address}
                  </p>

                  {venue.rating && (
                    <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', padding: '12px', background: '#f9fafb', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                        <span itemProp="ratingValue" style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>{venue.rating}</span>
                        <meta itemProp="bestRating" content="5" />
                        <meta itemProp="worstRating" content="1" />
                      </div>
                      {venue.user_ratings_total && (
                        <span itemProp="reviewCount" style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>
                          {venue.user_ratings_total.toLocaleString()} reviews
                        </span>
                      )}
                    </div>
                  )}

                  {venue.priceEstimate && (
                    <div style={{ marginBottom: '18px', padding: '10px 12px', background: '#f0fdf4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#15803d', fontWeight: '700', fontSize: '15px' }}>💰 {venue.priceEstimate} per person</span>
                      <span style={{ color: '#16a34a', fontSize: '14px', fontWeight: '600' }}>{'£'.repeat(venue.price_level || 2)}</span>
                    </div>
                  )}

                  <a href={`/restaurant/${venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${venue.place_id.slice(-8)}`}
                    style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: 'white', padding: '14px 24px', border: 'none', borderRadius: '12px',
                            fontSize: '15px', fontWeight: '600', cursor: 'pointer', width: '100%', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)',
                            display: 'block', textAlign: 'center', textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(22, 163, 74, 0.3)'; }}>
                    View Full Details →
                  </a>
                </div>
              </article>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '24px', margin: '0 0 10px 0', fontWeight: '600', color: '#111827' }}>No restaurants found</p>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 20px 0' }}>Try adjusting your filters</p>
            <button onClick={() => { setSearchTerm(''); setFilterArea('all'); setFilterPrice('all'); setFilterRating('all'); }}
              style={{ background: '#16a34a', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      <section style={{ maxWidth: '1400px', margin: '0 auto 60px', padding: '0 20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '32px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              { q: "What are the best vegetarian restaurants in London?", a: `London has over ${venues.length} excellent vegetarian restaurants. Top-rated options include establishments in Camden, Shoreditch, and Soho, with ratings consistently above 4.5 stars.` },
              { q: "How much does it cost to eat at vegetarian restaurants in London?", a: "Vegetarian restaurants in London range from £10-15 per person for casual spots to £40+ for fine dining. Most mid-range vegetarian restaurants cost around £15-25 per person." },
              { q: "Which areas have the most vegetarian restaurants in London?", a: "Camden, Shoreditch, Hackney, and Islington have the highest concentration of vegetarian and plant-based restaurants in London." },
              { q: "Do vegetarian restaurants in London serve vegan food?", a: "Most vegetarian restaurants in London offer extensive vegan options. Many modern vegetarian restaurants are fully plant-based or vegan-friendly with clear menu labeling." },
              { q: "Are vegetarian restaurants in London child-friendly?", a: "Yes, most vegetarian restaurants in London are family-friendly with children's menus available. Many also offer high chairs and changing facilities." }
            ].map((faq, idx) => (
              <div key={idx} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: idx < 4 ? '1px solid #f3f4f6' : 'none' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>{faq.q}</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.7', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#111827', color: '#9ca3af', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', margin: '0 0 12px 0' }}>© 2025 The Best in London. Restaurant data from Google Places API.</p>
          <p style={{ fontSize: '13px', margin: 0 }}>Updated {new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </footer>
    </div>
  </>);
}
