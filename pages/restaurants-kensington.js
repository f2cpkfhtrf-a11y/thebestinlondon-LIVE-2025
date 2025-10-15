import { useState, useMemo } from 'react';
import Head from 'next/head';

function getVenueImage(venue, idx) {
  if (venue.photos && venue.photos[0] && venue.photos[0].photo_reference) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${venue.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}`;
  }
  const unsplashIds = ['fdlZBWIP0aM', 'MqT0asuoIcU', 'N_Y88TWmGwA', 'jpkfc5_d-DI', 'bpPTlXWTOvg'];
  return `https://images.unsplash.com/photo-${unsplashIds[idx % unsplashIds.length]}?w=800&q=80`;
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allVenues = JSON.parse(fileContent);
    
    const keywords = ["Kensington","South Kensington","High Street Kensington"];
    const venues = allVenues
      .filter(v => v && v.formatted_address && keywords.some(k => v.formatted_address.toLowerCase().includes(k.toLowerCase())))
      .map(v => {
        const priceEstimates = { 1: '£12-18', 2: '£18-30', 3: '£30-50', 4: '£50+' };
        return { ...v, priceEstimate: priceEstimates[v.price_level] || '' };
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { 
      props: { 
        venues,
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    return { props: { venues: [], lastUpdated: new Date().toISOString() } };
  }
}

export default function KensingtonRestaurants({ venues, lastUpdated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const filtered = useMemo(() => {
    let result = venues.filter(v => {
      const matchesSearch = !searchTerm || 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.vicinity?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = filterPrice === 'all' || String(v.price_level) === filterPrice;
      const matchesRating = filterRating === 'all' ||
        (filterRating === '4+' && v.rating >= 4) ||
        (filterRating === '4.5+' && v.rating >= 4.5);
      
      return matchesSearch && matchesPrice && matchesRating;
    });

    if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'reviews') result.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));

    return result;
  }, [venues, searchTerm, sortBy, filterPrice, filterRating]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Best Restaurants in Kensington 2025",
    "description": "Directory of top-rated restaurants in Kensington",
    "url": "https://thebestinlondon.co.uk/restaurants-kensington",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": venues.length,
      "itemListElement": venues.slice(0, 20).map((venue, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Restaurant",
          "name": venue.name,
          "address": venue.vicinity || venue.formatted_address,
          ...(venue.rating && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": venue.rating } })
        }
      }))
    }
  };

  return (<>
    <Head>
      <title>Best Restaurants in Kensington 2025 - {venues.length} Top Rated | The Best in London</title>
      <meta name="description" content={`Discover ${venues.length} best restaurants in Kensington with real Google ratings.`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
    </Head>

    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'system-ui' }}>
      <header style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0' }}>
            Best Restaurants in Kensington
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.95, margin: 0 }}>
            {venues.length} expertly curated restaurants
          </p>
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '32px', display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '14px 20px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '10px' }} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '14px', border: '2px solid #e5e7eb', borderRadius: '10px' }}>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filtered.map((venue, idx) => (
            <article key={venue.place_id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ background: `url('${getVenueImage(venue, idx)}') center/cover`, height: '200px', backgroundColor: '#10b981' }} />
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0' }}>{venue.name}</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0' }}>{venue.vicinity}</p>
                {venue.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                    <span style={{ fontSize: '18px', fontWeight: '700' }}>{venue.rating}</span>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>({venue.user_ratings_total} reviews)</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  </>);
}
