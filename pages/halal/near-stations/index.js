// Halal Near Stations - Dynamic Counts
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LONDON_STATIONS, getVenuesNearStation, isHalalVenue } from '../../../utils/halalStations';

const theme = {
  colors: {
    bg: { primary: '#0B0B0B', elevated: '#1A1A1A' },
    text: { primary: '#FAFAFA', secondary: '#B0B0B0', inverse: '#0B0B0B' },
    accent: { gold: '#D4AF37' },
    border: { subtle: '#2A2A2A', prominent: '#404040' }
  },
  spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', xxl: '3rem' },
  typography: { 
    serif: "'Playfair Display', serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  radius: { sm: '4px', md: '8px', lg: '12px', xl: '16px' },
  shadows: { sm: '0 1px 3px rgba(0,0,0,0.3)', lg: '0 8px 25px rgba(0,0,0,0.4)' }
};

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const venuesData = JSON.parse(fileContent);
    const allVenues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    // Filter to halal venues only
    const halalOnly = allVenues.filter(v => {
      const { isHalal } = isHalalVenue(v);
      return isHalal;
    });
    
    // Calculate actual counts for each station
    const stationsWithCounts = LONDON_STATIONS.map(station => ({
      ...station,
      count: getVenuesNearStation(station, halalOnly, 0.6).length
    }));
    
    const totalVenues = stationsWithCounts.reduce((sum, s) => sum + s.count, 0);
    
    return {
      props: { 
        stations: stationsWithCounts,
        totalVenues,
        lastUpdated: (typeof venuesData === 'object' && !Array.isArray(venuesData) && venuesData.lastUpdated) ? venuesData.lastUpdated : new Date().toISOString()
      },
      revalidate: 86400
    };
  } catch (error) {
    console.error('Error loading venues data:', error);
    return {
      props: { 
        stations: LONDON_STATIONS.map(s => ({ ...s, count: 0 })),
        totalVenues: 0,
        lastUpdated: new Date().toISOString()
      },
      revalidate: 86400
    };
  }
}

export default function HalalNearStationsIndex({ stations, totalVenues, lastUpdated }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = searchQuery 
    ? stations.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.borough.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stations;

  return (
    <>
      <Head>
        <title>Halal Restaurants Near London Tube Stations | Best of London</title>
        <meta 
          name="description" 
          content={`Find halal restaurants within walking distance of ${stations.length} major London tube stations. ${totalVenues} verified halal venues across Zone 1-2.`}
        />
        <link rel="canonical" href="https://thebestinlondon.co.uk/halal/near-stations" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Halal Restaurants Near London Tube Stations",
          "description": `Find halal restaurants within walking distance of ${stations.length} major London tube stations`,
          "url": "https://thebestinlondon.co.uk/halal/near-stations"
        }) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: theme.colors.bg.primary,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: theme.spacing.md
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ 
                fontFamily: theme.typography.serif,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: theme.colors.text.primary 
              }}>
                BestOfLondon
              </span>
            </Link>
            <Link href="/" style={{
              color: theme.colors.text.secondary,
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              ← Home
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section style={{
          background: `linear-gradient(180deg, ${theme.colors.accent.gold}10 0%, transparent 100%)`,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: `${theme.spacing.xxl} ${theme.spacing.lg} ${theme.spacing.xl}`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              background: `${theme.colors.accent.gold}20`,
              border: `1px solid ${theme.colors.accent.gold}40`,
              borderRadius: '24px',
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              color: theme.colors.accent.gold,
              fontSize: '0.875rem',
              marginBottom: theme.spacing.lg
            }}>
              🏛️ Station-Based Directory
            </div>

            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: theme.spacing.lg,
              background: `linear-gradient(135deg, ${theme.colors.text.primary} 0%, ${theme.colors.text.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Halal Restaurants Near<br/>London Tube Stations
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: theme.colors.text.secondary,
              maxWidth: '700px',
              margin: `0 auto ${theme.spacing.xl}`,
              lineHeight: 1.6
            }}>
              Find authentic halal dining within walking distance of {stations.length} major London stations.
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacing.xl,
              justifyContent: 'center',
              padding: theme.spacing.lg,
              background: `${theme.colors.accent.gold}10`,
              borderRadius: theme.radius.lg,
              border: `1px solid ${theme.colors.border.subtle}`,
              marginBottom: theme.spacing.xl
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.colors.accent.gold }}>
                  {stations.length}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>Stations</div>
              </div>
              <div style={{ width: '1px', background: theme.colors.border.prominent }}></div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.colors.accent.gold }}>
                  {totalVenues}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>Halal Venues</div>
              </div>
              <div style={{ width: '1px', background: theme.colors.border.prominent }}></div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.colors.accent.gold }}>
                  0.6km
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>Default Radius</div>
              </div>
            </div>

            {/* Search */}
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Search stations by name or borough..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: theme.spacing.md,
                  background: `${theme.colors.text.primary}08`,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  borderRadius: '8px',
                  color: theme.colors.text.primary,
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </section>

        {/* Stations Grid */}
        <section style={{ padding: `${theme.spacing.xl} ${theme.spacing.lg}`, maxWidth: '1200px', margin: '0 auto' }}>
          {filteredStations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: theme.spacing.xxl }}>
              <h3 style={{ 
                fontFamily: theme.typography.serif,
                fontSize: '1.5rem',
                marginBottom: theme.spacing.md,
                color: theme.colors.text.primary
              }}>
                No stations found
              </h3>
              <p style={{ color: theme.colors.text.secondary }}>
                Try a different search term or{' '}
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme.colors.accent.gold,
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  view all stations
                </button>
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: theme.spacing.lg
            }}>
              {filteredStations.map(station => (
                <div
                  key={station.slug}
                  style={{
                    display: 'block',
                    background: theme.colors.bg.elevated,
                    border: `1px solid ${theme.colors.border.subtle}`,
                    borderRadius: theme.radius.lg,
                    padding: theme.spacing.lg,
                    transition: 'all 0.3s ease',
                    boxShadow: theme.shadows.sm
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: theme.spacing.sm 
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: theme.colors.text.primary,
                      lineHeight: 1.3
                    }}>
                      {station.name}
                    </h3>
                    <div style={{
                      background: station.count > 0 ? theme.colors.accent.gold : '#666',
                      color: station.count > 0 ? theme.colors.text.inverse : theme.colors.text.primary,
                      padding: '0.375rem 0.75rem',
                      borderRadius: theme.radius.md,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      minWidth: '60px',
                      textAlign: 'center'
                    }}>
                      {station.count} venues
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.875rem',
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing.sm,
                    fontWeight: 500
                  }}>
                    {station.borough}
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.spacing.sm,
                    marginBottom: theme.spacing.lg
                  }}>
                    {station.lines.slice(0, 3).map(line => (
                      <span
                        key={line}
                        style={{
                          fontSize: '0.75rem',
                          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                          background: theme.colors.border.prominent,
                          color: theme.colors.text.primary,
                          borderRadius: theme.radius.sm,
                          fontWeight: 500,
                          border: `1px solid ${theme.colors.border.subtle}`
                        }}
                      >
                        {line}
                      </span>
                    ))}
                    {station.lines.length > 3 && (
                      <span style={{
                        fontSize: '0.75rem',
                        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                        background: theme.colors.border.prominent,
                        color: theme.colors.text.secondary,
                        borderRadius: theme.radius.sm,
                        fontWeight: 500,
                        border: `1px solid ${theme.colors.border.subtle}`
                      }}>
                        +{station.lines.length - 3}
                      </span>
                    )}
                  </div>

                  <Link 
                    href={`/halal/near-stations/${station.slug}`}
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      color: theme.colors.accent.gold,
                      textAlign: 'center',
                      padding: theme.spacing.sm,
                      background: `${theme.colors.accent.gold}10`,
                      borderRadius: '6px',
                      marginTop: theme.spacing.sm,
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `${theme.colors.accent.gold}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `${theme.colors.accent.gold}10`;
                    }}
                  >
                    View {station.count} Restaurants →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section style={{
          background: `linear-gradient(180deg, transparent 0%, ${theme.colors.accent.gold}10 100%)`,
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: theme.typography.serif,
              fontSize: '1.75rem',
              marginBottom: theme.spacing.md
            }}>
              Can't Find Your Station?
            </h2>
            <p style={{
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.lg,
              lineHeight: 1.6
            }}>
              Browse our complete collection of halal restaurants across all London areas.
            </p>
            <Link 
              href="/best-halal-restaurants-london"
              style={{
                display: 'inline-block',
                background: `linear-gradient(135deg, ${theme.colors.accent.gold} 0%, #F4D03F 100%)`,
                color: theme.colors.background.primary,
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              View All Halal Restaurants
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
          textAlign: 'center',
          color: theme.colors.text.secondary
        }}>
          <Link href="/" style={{ color: theme.colors.accent.gold, textDecoration: 'none', fontWeight: 600 }}>
            BestOfLondon
          </Link>
          <p style={{ marginTop: theme.spacing.sm, fontSize: '0.875rem' }}>
            © 2025 Best of London. Curated • Verified • Updated Daily
          </p>
        </footer>
      </div>
    </>
  );
}
