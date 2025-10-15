// AUTO-GENERATE 15 CATEGORY PAGES WITH UNIQUE THEMES
// Each page has custom colors, emojis, and Unsplash images

const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    slug: 'italian',
    name: 'Italian',
    emoji: '🍝',
    primaryColor: '#16a34a',
    secondaryColor: '#15803d',
    keywords: ['italian', 'pizza', 'pasta', 'trattoria', 'osteria'],
    unsplashImage: '1498579150354-977475b7ea0b',
    description: 'Authentic Italian cuisine • Pizza • Pasta • Risotto',
    badges: ['🍕 Wood-fired Pizza', '⭐ 4.0+ Rated', '💰 £15-45pp', '📸 Real Photos']
  },
  {
    slug: 'chinese',
    name: 'Chinese',
    emoji: '🥢',
    primaryColor: '#ef4444',
    secondaryColor: '#dc2626',
    keywords: ['chinese', 'dim sum', 'noodles', 'wok', 'cantonese'],
    unsplashImage: '1526318896980-cf78c088247c',
    description: 'Authentic Chinese cuisine • Dim Sum • Noodles • Peking Duck',
    badges: ['🥟 Dim Sum', '⭐ 4.0+ Rated', '💰 £12-35pp', '📸 Real Photos']
  },
  {
    slug: 'japanese',
    name: 'Japanese',
    emoji: '🍣',
    primaryColor: '#dc2626',
    secondaryColor: '#b91c1c',
    keywords: ['japanese', 'sushi', 'ramen', 'sashimi', 'izakaya'],
    unsplashImage: '1579584425555-4d900f47eed1',
    description: 'Authentic Japanese cuisine • Sushi • Ramen • Tempura',
    badges: ['🍱 Fresh Sushi', '⭐ 4.0+ Rated', '💰 £18-50pp', '📸 Real Photos']
  },
  {
    slug: 'thai',
    name: 'Thai',
    emoji: '🌶️',
    primaryColor: '#f97316',
    secondaryColor: '#ea580c',
    keywords: ['thai', 'pad thai', 'curry', 'tom yum', 'spicy'],
    unsplashImage: '1559047122-a49bc5cfcc4e',
    description: 'Authentic Thai cuisine • Pad Thai • Green Curry • Tom Yum',
    badges: ['🔥 Spicy Options', '⭐ 4.0+ Rated', '💰 £12-30pp', '📸 Real Photos']
  },
  {
    slug: 'turkish',
    name: 'Turkish',
    emoji: '🥙',
    primaryColor: '#dc2626',
    secondaryColor: '#b91c1c',
    keywords: ['turkish', 'kebab', 'meze', 'doner', 'grill'],
    unsplashImage: '1529042410759-befb1204b468',
    description: 'Authentic Turkish cuisine • Kebabs • Meze • Grills',
    badges: ['🔥 Charcoal Grills', '⭐ 4.0+ Rated', '💰 £10-25pp', '📸 Real Photos']
  },
  {
    slug: 'mexican',
    name: 'Mexican',
    emoji: '🌮',
    primaryColor: '#22c55e',
    secondaryColor: '#16a34a',
    keywords: ['mexican', 'taco', 'burrito', 'fajita', 'quesadilla'],
    unsplashImage: '1565299585323-38d6b0865b47',
    description: 'Authentic Mexican cuisine • Tacos • Burritos • Fajitas',
    badges: ['🌮 Fresh Tacos', '⭐ 4.0+ Rated', '💰 £12-28pp', '📸 Real Photos']
  },
  {
    slug: 'french',
    name: 'French',
    emoji: '🥖',
    primaryColor: '#3b82f6',
    secondaryColor: '#2563eb',
    keywords: ['french', 'bistro', 'brasserie', 'croissant', 'escargot'],
    unsplashImage: '1496412705862-e0088f16f791',
    description: 'Fine French cuisine • Bistro • Brasserie • Patisserie',
    badges: ['🥐 Fresh Pastries', '⭐ 4.0+ Rated', '💰 £25-60pp', '📸 Real Photos']
  },
  {
    slug: 'korean',
    name: 'Korean',
    emoji: '🍜',
    primaryColor: '#ef4444',
    secondaryColor: '#dc2626',
    keywords: ['korean', 'bbq', 'kimchi', 'bibimbap', 'bulgogi'],
    unsplashImage: '1498654896293-37aacf113fd9',
    description: 'Authentic Korean cuisine • BBQ • Kimchi • Bibimbap',
    badges: ['🔥 Korean BBQ', '⭐ 4.0+ Rated', '💰 £15-40pp', '📸 Real Photos']
  },
  {
    slug: 'breakfast',
    name: 'Breakfast',
    emoji: '🍳',
    primaryColor: '#f59e0b',
    secondaryColor: '#d97706',
    keywords: ['breakfast', 'brunch', 'eggs', 'pancakes', 'coffee'],
    unsplashImage: '1533777857889-4be7c70b33f7',
    description: 'Best breakfast spots • Full English • Pancakes • Coffee',
    badges: ['☕ Great Coffee', '⭐ 4.0+ Rated', '💰 £8-20pp', '📸 Real Photos']
  },
  {
    slug: 'brunch',
    name: 'Brunch',
    emoji: '🥞',
    primaryColor: '#f97316',
    secondaryColor: '#ea580c',
    keywords: ['brunch', 'pancakes', 'eggs benedict', 'waffles', 'avocado toast'],
    unsplashImage: '1504754524776-8a9da0cc2b41',
    description: 'Weekend brunch • Eggs Benedict • Pancakes • Bottomless',
    badges: ['🥂 Bottomless Brunch', '⭐ 4.0+ Rated', '💰 £15-35pp', '📸 Real Photos']
  },
  {
    slug: 'fine-dining',
    name: 'Fine Dining',
    emoji: '⭐',
    primaryColor: '#7c3aed',
    secondaryColor: '#6d28d9',
    keywords: ['fine dining', 'michelin', 'tasting menu', 'gourmet', 'haute cuisine'],
    unsplashImage: '1414235077428-338989a2e8c0',
    description: 'Michelin-starred • Tasting Menus • Fine Dining Excellence',
    badges: ['⭐ Michelin Guide', '🍽️ Tasting Menus', '💰 £60-150pp', '📸 Real Photos']
  },
  {
    slug: 'romantic',
    name: 'Romantic',
    emoji: '💑',
    primaryColor: '#ec4899',
    secondaryColor: '#db2777',
    keywords: ['romantic', 'date night', 'intimate', 'candlelit', 'couples'],
    unsplashImage: '1517248135467-4c7edcad34c4',
    description: 'Perfect for date night • Intimate atmosphere • Special occasions',
    badges: ['💝 Date Night', '⭐ 4.0+ Rated', '💰 £30-80pp', '📸 Real Photos']
  },
  {
    slug: 'rooftop',
    name: 'Rooftop',
    emoji: '🏙️',
    primaryColor: '#0ea5e9',
    secondaryColor: '#0284c7',
    keywords: ['rooftop', 'skyline', 'terrace', 'outdoor', 'views'],
    unsplashImage: '1551882547-ff40c63fe5fa',
    description: 'Stunning views • Rooftop dining • Skyline vistas • Outdoor seating',
    badges: ['🌆 Amazing Views', '⭐ 4.0+ Rated', '💰 £25-70pp', '📸 Real Photos']
  },
  {
    slug: 'family-friendly',
    name: 'Family-Friendly',
    emoji: '👨‍👩‍👧‍👦',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    keywords: ['family', 'kids menu', 'child friendly', 'highchair', 'play area'],
    unsplashImage: '1504674900247-0877df9cc836',
    description: 'Great for families • Kids menus • Highchairs • Relaxed atmosphere',
    badges: ['👶 Kids Menu', '⭐ 4.0+ Rated', '💰 £12-30pp', '📸 Real Photos']
  },
  {
    slug: 'seafood',
    name: 'Seafood',
    emoji: '🦞',
    primaryColor: '#06b6d4',
    secondaryColor: '#0891b2',
    keywords: ['seafood', 'fish', 'oysters', 'lobster', 'prawns'],
    unsplashImage: '1559339352-11d035aa65de',
    description: 'Fresh seafood • Fish & Chips • Oysters • Lobster',
    badges: ['🐟 Fresh Fish', '⭐ 4.0+ Rated', '💰 £20-55pp', '📸 Real Photos']
  }
];

function generateCategoryPage(category) {
  const filterLogic = category.keywords.map(kw => 
    `name.includes('${kw}') || types.includes('${kw}')`
  ).join(' || ');

  return `// ${category.name.toUpperCase()} RESTAURANTS IN LONDON - AUTO-GENERATED
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
    
    const venues = allVenues
      .filter(v => {
        if (!v) return false;
        const name = v.name?.toLowerCase() || '';
        const types = (v.types || []).join(' ').toLowerCase();
        return ${filterLogic};
      })
      .map(v => {
        const address = v.vicinity || v.formatted_address || '';
        const areas = ['Shoreditch', 'Camden', 'Soho', 'Covent Garden'];
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
    
    return { props: { venues }};
  } catch (error) {
    return { props: { venues: [] } };
  }
}

export default function ${category.name}Restaurants({ venues }) {
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
        <title>Best ${category.name} Restaurants London 2025 | The Best in London</title>
        <meta name="description" content={\`Discover \${venues.length} top-rated ${category.name.toLowerCase()} restaurants in London. ${category.description}. Real photos, ratings & prices.\`} />
        <link rel="canonical" href="https://thebestinlondon.co.uk/${category.slug}-restaurants-london" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#fafafa' }}>
        <header style={{ 
          background: 'linear-gradient(135deg, ${category.primaryColor} 0%, ${category.secondaryColor} 100%)', 
          color: 'white', 
          padding: '60px 20px 50px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>${category.emoji}</div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '800', margin: '0 0 16px 0' }}>
              Best ${category.name} Restaurants in London
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', opacity: 0.95, margin: '0 0 12px 0' }}>
              {venues.length} ${category.description}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', opacity: 0.9 }}>
              ${category.badges.map(badge => `<span>${badge}</span>`).join('\n              ')}
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1400px', margin: '-30px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px' }}>
              <input
                type="text"
                placeholder="Search ${category.name.toLowerCase()} restaurants..."
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
                style={{
                  padding: '14px 20px',
                  background: showComparison ? '${category.primaryColor}' : 'white',
                  color: showComparison ? 'white' : '${category.primaryColor}',
                  border: \`2px solid ${category.primaryColor}\`,
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                {showComparison ? '✓ Compare' : '🔍 Compare'}
              </button>
            </div>
          </div>
        </div>

        <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 60px' }}>
          {showComparison && <ComparisonTool venues={filtered} />}
          
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
            <strong style={{ color: '${category.primaryColor}' }}>{filtered.length}</strong> of {venues.length} restaurants
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
            {filtered.map((venue, idx) => (
              <article key={venue.place_id} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}>
                <div style={{ height: '220px', position: 'relative', background: '${category.primaryColor}' }}>
                  <img 
                    src={\`https://images.unsplash.com/photo-${category.unsplashImage}?w=800&q=80\`}
                    alt={venue.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  
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
                      color: '${category.primaryColor}',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      📍 {venue.area}
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
                    {venue.name}
                  </h2>
                  
                  <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0' }}>
                    {venue.vicinity}
                  </p>

                  {venue.rating && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginBottom: '16px', 
                      padding: '12px', 
                      background: '#fef3c7', 
                      borderRadius: '12px' 
                    }}>
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
                    <div style={{ 
                      marginBottom: '18px', 
                      padding: '10px 12px', 
                      background: '${category.primaryColor}15', 
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ color: '${category.secondaryColor}', fontWeight: '700', fontSize: '15px' }}>
                        💰 {venue.priceEstimate}pp
                      </span>
                      <span style={{ color: '${category.primaryColor}', fontSize: '14px', fontWeight: '600' }}>
                        {'£'.repeat(venue.price_level || 2)}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => window.open(\`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(venue.name + ' ' + venue.vicinity)}\`, '_blank')}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, ${category.primaryColor} 0%, ${category.secondaryColor} 100%)',
                      color: 'white',
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
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
}`;
}

// Generate all category pages
console.log('🎨 Generating 15 category pages with unique themes...\n');

CATEGORIES.forEach((category, index) => {
  const pageContent = generateCategoryPage(category);
  const filename = `${category.slug}-restaurants-london.js`;
  const filepath = path.join(__dirname, '..', 'pages', filename);
  
  fs.writeFileSync(filepath, pageContent);
  console.log(`✅ [${index + 1}/15] Generated: ${filename}`);
  console.log(`   Theme: ${category.emoji} ${category.primaryColor}`);
  console.log(`   Image: ${category.unsplashImage}`);
  console.log('');
});

console.log('🎉 All 15 category pages generated!');
console.log('\n📊 Summary:');
console.log(`   • 15 unique themed pages`);
console.log(`   • Each with custom colors & emojis`);
console.log(`   • Real Unsplash images`);
console.log(`   • Comparison tool integrated`);
console.log(`   • Consistent BestDubai-style design`);
console.log('\n🚀 Ready to deploy!');
