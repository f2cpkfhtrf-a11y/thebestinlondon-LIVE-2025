import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import { enhanceVenueData, filterByDietary, sortVenues } from '../utils/venueData';
import { isHalalVenue } from '../utils/halalStations';
import FSABadge from '../components/FSABadge';
import BestOfLondonBadge from '../components/BestOfLondonBadge';
import ReviewBadges from '../components/ReviewBadges';
import DietaryTags from '../components/DietaryTags';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const venuesData = JSON.parse(fileContent);
    const allVenues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    // Filter halal restaurants using improved filtering
    const halalVenues = allVenues
      .map(enhanceVenueData)
      .filter(v => {
        if (!v) return false;
        const { isHalal } = isHalalVenue(v);
        return isHalal;
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return { 
      props: { 
        venues: halalVenues,
        lastUpdated: (typeof venuesData === 'object' && !Array.isArray(venuesData) && venuesData.lastUpdated) ? venuesData.lastUpdated : new Date().toISOString()
      },
      revalidate: 86400
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return { props: { venues: [], lastUpdated: new Date().toISOString() } };
  }
}

export default function BestHalalRestaurantsLondon({ venues }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterArea, setFilterArea] = useState('all');

  const filtered = useMemo(() => {
    let result = venues.filter(v => {
      const matchesSearch = !searchTerm || 
        v.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = filterArea === 'all' || v.area === filterArea;
      return matchesSearch && matchesArea;
    });

    return sortVenues(result, sortBy);
  }, [venues, searchTerm, sortBy, filterArea]);

  const areas = useMemo(() => {
    const areaSet = new Set(venues.map(v => v.area).filter(Boolean));
    return ['all', ...Array.from(areaSet).sort()];
  }, [venues]);

  return (
    <>
      <Head>
        <title>Best Halal Restaurants in London 2025 | {venues.length}+ FSA Verified Venues</title>
        <meta name="description" content={`Discover ${venues.length}+ halal-certified restaurants in London. From Turkish kebabs to Indian curries. Real reviews, FSA verified, Google & TripAdvisor ratings. Updated daily.`} />
        <link rel="canonical" href="https://thebestinlondon.co.uk/best-halal-restaurants-london" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Halal Restaurants in London",
          "description": "Curated collection of halal-certified restaurants in London with real reviews and FSA ratings",
          "url": "https://thebestinlondon.co.uk/best-halal-restaurants-london",
          "about": {
            "@type": "Thing",
            "name": "Halal Food",
            "description": "Islamic dietary law compliant restaurants"
          }
        }) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
        
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>
                  The Best in London
                </div>
              </Link>
              <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500 }}>
                <Link href="/#cuisines" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Cuisines</Link>
                <Link href="/#areas" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Areas</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <nav style={{ background: theme.colors.bg.elevated, borderBottom: `1px solid ${theme.colors.border.subtle}`, padding: '12px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ fontSize: '13px', color: theme.colors.text.secondary }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 8px', color: theme.colors.border.prominent }}>/</span>
              <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>Best Halal Restaurants</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header style={{
          position: 'relative',
          padding: '80px 20px',
          background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.elevated} 100%)`,
          borderBottom: `1px solid ${theme.colors.border.subtle}`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              background: 'rgba(5, 150, 105, 0.1)',
              padding: '8px 16px',
              borderRadius: theme.radius.sm,
              marginBottom: theme.spacing.lg,
              border: '1px solid rgba(5, 150, 105, 0.2)'
            }}>
              <span style={{ fontSize: '20px' }}>☪️</span>
              <span style={{ color: '#059669', fontWeight: 600, fontSize: '14px' }}>HALAL CERTIFIED</span>
            </div>

            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: theme.spacing.lg,
              color: theme.colors.text.primary
            }}>
              Best Halal Restaurants<br />in London
            </h1>

            <div style={{ 
              fontSize: '18px', 
              color: theme.colors.text.secondary, 
              lineHeight: 1.6, 
              maxWidth: '800px',
              marginBottom: theme.spacing['2xl']
            }}>
              <p style={{ marginBottom: theme.spacing.base }}>
                Discover {venues.length}+ halal-certified restaurants across London. From authentic Turkish kebabs and Middle Eastern mezze to Indian curries and Mediterranean cuisine.
              </p>
              <p style={{ margin: 0 }}>
                All venues verified with FSA hygiene ratings, real Google & TripAdvisor reviews. Whether you're looking for fine dining or casual eats, find the perfect halal restaurant for your next meal.
              </p>
            </div>

            {/* Key Features */}
            <div style={{ display: 'flex', gap: theme.spacing.lg, flexWrap: 'wrap', fontSize: '14px', color: theme.colors.text.secondary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: theme.colors.accent.gold }}>✓</span>
                <span>Halal Certified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: theme.colors.accent.gold }}>✓</span>
                <span>FSA Verified</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: theme.colors.accent.gold }}>✓</span>
                <span>Real Reviews</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: theme.colors.accent.gold }}>✓</span>
                <span>Updated Daily</span>
              </div>
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <div style={{
          position: 'sticky',
          top: '68px',
          zIndex: 80,
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
              <input 
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '12px 16px',
                  background: theme.colors.bg.elevated,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  borderRadius: theme.radius.sm,
                  color: theme.colors.text.primary,
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <select 
                value={filterArea} 
                onChange={(e) => setFilterArea(e.target.value)}
                style={{ 
                  padding: '12px 16px', 
                  background: theme.colors.bg.elevated,
                  border: `1px solid ${theme.colors.border.subtle}`, 
                  borderRadius: theme.radius.sm, 
                  color: theme.colors.text.primary,
                  fontSize: '14px', 
                  fontFamily: 'inherit', 
                  cursor: 'pointer' 
                }}>
                <option value="all">All Areas</option>
                {areas.filter(a => a !== 'all').map(area => <option key={area} value={area}>{area}</option>)}
              </select>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ 
                  padding: '12px 16px', 
                  background: theme.colors.bg.elevated,
                  border: `1px solid ${theme.colors.border.subtle}`, 
                  borderRadius: theme.radius.sm, 
                  color: theme.colors.text.primary,
                  fontSize: '14px', 
                  fontFamily: 'inherit', 
                  cursor: 'pointer' 
                }}>
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviews</option>
                <option value="fsa">🏥 FSA Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 0' }}>
          <p style={{ fontSize: '14px', color: theme.colors.text.secondary }}>
            Showing <strong style={{ color: theme.colors.text.primary, fontWeight: 600 }}>{filtered.length}</strong> halal-certified restaurants
          </p>
        </div>

        {/* Restaurant Grid */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: theme.spacing['2xl']
          }}>
            {filtered.map((venue, idx) => (
              <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  background: theme.colors.bg.elevated,
                  borderRadius: theme.radius.lg,
                  overflow: 'hidden',
                  border: `1px solid ${theme.colors.border.subtle}`,
                  transition: `all ${theme.motion.base} ${theme.motion.ease}`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = theme.shadows.lg;
                  e.currentTarget.style.borderColor = theme.colors.border.prominent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.sm;
                  e.currentTarget.style.borderColor = theme.colors.border.subtle;
                }}>
                
                <div style={{ position: 'relative', height: '240px' }}>
                  {venue.photos && venue.photos[0] && venue.photos[0].url ? (
                    <img 
                      src={venue.photos[0].url}
                      alt={`${venue.name} - Halal restaurant in ${venue.area || 'London'}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=85`;
                      }}
                    />
                  ) : (
                    <img 
                      src={`https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=85`}
                      alt={`${venue.name} - Halal restaurant in ${venue.area || 'London'}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  )}
                  
                  <div style={{ position: 'absolute', top: theme.spacing.base, right: theme.spacing.base }}>
                    <FSABadge rating={venue.fsa_rating || 5} size="small" showLabel={false} />
                  </div>

                  <div style={{ position: 'absolute', top: theme.spacing.base, left: theme.spacing.base }}>
                    <BestOfLondonBadge venue={venue} size="small" showTooltip={false} />
                  </div>

                  {venue.area && (
                    <div style={{
                      position: 'absolute',
                      bottom: theme.spacing.base,
                      left: theme.spacing.base,
                      background: 'rgba(11,11,11,0.85)',
                      backdropFilter: 'blur(8px)',
                      color: theme.colors.text.primary,
                      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                      borderRadius: theme.radius.sm,
                      fontSize: '13px',
                      fontWeight: 500
                    }}>
                      {venue.area}
                    </div>
                  )}
                </div>

                <div style={{ padding: theme.spacing.xl }}>
                  
                  <DietaryTags tags={venue.dietary_tags} size="small" />

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: theme.colors.text.primary,
                    margin: `${theme.spacing.md} 0 ${theme.spacing.sm} 0`,
                    lineHeight: 1.3
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
                    <span>{venue.price_level ? '£'.repeat(venue.price_level) : '££'}</span>
                  </div>

                  <ReviewBadges 
                    google={{ rating: venue.rating, reviews: venue.user_ratings_total }}
                    tripadvisor={venue.tripadvisor}
                    layout="column"
                  />

                  <div style={{
                    width: '100%',
                    padding: theme.spacing.md,
                    background: `linear-gradient(135deg, ${theme.colors.accent.gold} 0%, #F4D03F 100%)`,
                    color: theme.colors.text.inverse,
                    border: 'none',
                    borderRadius: theme.radius.sm,
                    fontSize: '14px',
                    fontWeight: 700,
                    textAlign: 'center',
                    marginTop: theme.spacing.lg,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    View Details →
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </main>

        {/* Related Links */}
        <section style={{ background: theme.colors.bg.elevated, padding: `${theme.spacing['4xl']} 0`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontFamily: theme.typography.serif, fontSize: '32px', fontWeight: 700, marginBottom: theme.spacing['2xl'] }}>
              Explore More
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: theme.spacing.lg }}>
              <Link href="/indian-restaurants-london" style={{ color: theme.colors.text.secondary, textDecoration: 'none', fontSize: '15px' }}>
                Indian Restaurants →
              </Link>
              <Link href="/turkish-restaurants-london" style={{ color: theme.colors.text.secondary, textDecoration: 'none', fontSize: '15px' }}>
                Turkish Restaurants →
              </Link>
              <Link href="/vegan-restaurants-london" style={{ color: theme.colors.text.secondary, textDecoration: 'none', fontSize: '15px' }}>
                Vegan Restaurants →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['4xl']} 0 ${theme.spacing['2xl']}`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', fontSize: '13px', color: theme.colors.text.secondary }}>
            <p style={{ margin: 0 }}>© 2025 The Best in London. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
