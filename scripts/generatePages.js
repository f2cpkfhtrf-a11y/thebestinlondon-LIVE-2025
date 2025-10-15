const fs = require('fs');
const path = require('path');

const pages = [
  // Location pages
  { slug: 'restaurants-shoreditch', title: 'Best Restaurants in Shoreditch', filter: (v) => v.formatted_address?.includes('Shoreditch') },
  { slug: 'restaurants-soho', title: 'Best Restaurants in Soho', filter: (v) => v.formatted_address?.includes('Soho') },
  { slug: 'restaurants-camden', title: 'Best Restaurants in Camden', filter: (v) => v.formatted_address?.includes('Camden') },
  { slug: 'restaurants-brixton', title: 'Best Restaurants in Brixton', filter: (v) => v.formatted_address?.includes('Brixton') },
  { slug: 'restaurants-hackney', title: 'Best Restaurants in Hackney', filter: (v) => v.formatted_address?.includes('Hackney') },
  { slug: 'restaurants-islington', title: 'Best Restaurants in Islington', filter: (v) => v.formatted_address?.includes('Islington') },
  { slug: 'restaurants-clapham', title: 'Best Restaurants in Clapham', filter: (v) => v.formatted_address?.includes('Clapham') },
  { slug: 'restaurants-covent-garden', title: 'Best Restaurants in Covent Garden', filter: (v) => v.formatted_address?.includes('Covent Garden') },
  { slug: 'restaurants-borough', title: 'Best Restaurants in Borough', filter: (v) => v.formatted_address?.includes('Borough') },
  
  // Cuisine pages
  { slug: 'indian-restaurants-london', title: 'Best Indian Restaurants in London', filter: (v) => v.types?.includes('indian_restaurant') || v.name?.match(/indian|curry|tandoori/i) },
  { slug: 'italian-restaurants-london', title: 'Best Italian Restaurants in London', filter: (v) => v.types?.includes('italian_restaurant') || v.name?.match(/italian|pizza|pasta/i) },
  { slug: 'chinese-restaurants-london', title: 'Best Chinese Restaurants in London', filter: (v) => v.types?.includes('chinese_restaurant') || v.name?.match(/chinese|dim sum/i) },
  { slug: 'japanese-restaurants-london', title: 'Best Japanese Restaurants in London', filter: (v) => v.types?.includes('japanese_restaurant') || v.name?.match(/japanese|sushi|ramen/i) },
  
  // Experience pages
  { slug: 'fine-dining-london', title: 'Fine Dining Restaurants in London', filter: (v) => v.price_level >= 3 || v.rating >= 4.7 },
  { slug: 'cheap-eats-london', title: 'Best Cheap Eats in London', filter: (v) => v.price_level <= 2 },
  { slug: 'brunch-london', title: 'Best Brunch Spots in London', filter: (v) => v.name?.match(/brunch|breakfast|cafe/i) },
  { slug: 'date-night-restaurants-london', title: 'Best Date Night Restaurants in London', filter: (v) => v.price_level >= 2 && v.rating >= 4.5 },
];

const template = (page, venues) => `import Head from 'next/head';
import { useState } from 'react';

export default function ${page.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}() {
  const allVenues = ${JSON.stringify(venues, null, 2)};
  
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  
  const filtered = allVenues
    .filter(v => 
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.formatted_address?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'reviews') return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
      return 0;
    });

  return (
    <>
      <Head>
        <title>${page.title} | The Best in London</title>
        <meta name="description" content="Discover the ${page.title.toLowerCase()} with real Google reviews, ratings, and photos. Updated daily." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>
            ${page.title}
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9 }}>
            {allVenues.length} restaurants with verified Google ratings
          </p>
        </header>

        {/* Filters */}
        <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: '300px',
                padding: '16px',
                fontSize: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none'
              }}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '16px',
                fontSize: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {filtered.map((venue) => (
              <div
                key={venue.place_id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  height: '200px',
                  background: \`linear-gradient(135deg, #\${Math.floor(Math.random()*16777215).toString(16)} 0%, #10b981 100%)\`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}>
                  🍽️
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>
                    {venue.name}
                  </h3>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                    {venue.formatted_address}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#fbbf24', fontSize: '18px' }}>⭐</span>
                      <span style={{ fontWeight: '600' }}>{venue.rating || 'N/A'}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      ({venue.user_ratings_total || 0} reviews)
                    </div>
                  </div>
                  {venue.price_level && (
                    <div style={{ fontSize: '18px', color: '#10b981', marginBottom: '12px' }}>
                      {'£'.repeat(venue.price_level)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
`;

async function generatePages() {
  console.log('📄 Generating landing pages...\n');
  
  // Load venues
  const venuesPath = path.join(__dirname, '../public/venues.json');
  if (!fs.existsSync(venuesPath)) {
    console.error('❌ venues.json not found. Run bulkScraper.js first.');
    process.exit(1);
  }
  
  const allVenues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  console.log(`✅ Loaded ${allVenues.length} venues\n`);
  
  const pagesDir = path.join(__dirname, '../pages');
  
  for (const page of pages) {
    const venues = allVenues.filter(page.filter).slice(0, 50); // Limit to 50 per page
    
    if (venues.length === 0) {
      console.log(`⚠️  Skipping ${page.slug} - no venues found`);
      continue;
    }
    
    const content = template(page, venues);
    const filename = path.join(pagesDir, `${page.slug}.js`);
    
    fs.writeFileSync(filename, content);
    console.log(`✅ ${page.slug}.js - ${venues.length} venues`);
  }
  
  console.log(`\n🎉 Generated ${pages.length} landing pages!`);
}

generatePages().catch(console.error);
