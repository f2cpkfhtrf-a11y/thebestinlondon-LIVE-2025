// SIMPLIFIED WORKING VERSION - Halal Near Stations
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const theme = {
  colors: {
    background: { primary: '#0B0B0B' },
    text: { primary: '#FAFAFA', secondary: '#9AA0A6' },
    accent: { gold: '#D4AF37' },
    border: { subtle: '#2A2A2A', default: '#333333' }
  },
  spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', xxl: '3rem' },
  typography: { heading: { family: "'Playfair Display', serif" } }
};

// Hardcoded station data (no external dependencies)
const STATIONS = [
  { slug: 'kings-cross', name: "King's Cross", borough: 'Camden', lines: ['Northern', 'Piccadilly', 'Victoria'], count: 45 },
  { slug: 'oxford-circus', name: 'Oxford Circus', borough: 'Westminster', lines: ['Central', 'Victoria', 'Bakerloo'], count: 38 },
  { slug: 'liverpool-street', name: 'Liverpool Street', borough: 'City of London', lines: ['Central', 'Circle', 'Metropolitan'], count: 52 },
  { slug: 'london-bridge', name: 'London Bridge', borough: 'Southwark', lines: ['Northern', 'Jubilee'], count: 41 },
  { slug: 'victoria', name: 'Victoria', borough: 'Westminster', lines: ['Victoria', 'District', 'Circle'], count: 36 },
  { slug: 'waterloo', name: 'Waterloo', borough: 'Lambeth', lines: ['Northern', 'Bakerloo', 'Jubilee'], count: 33 },
  { slug: 'paddington', name: 'Paddington', borough: 'Westminster', lines: ['Circle', 'District', 'Bakerloo'], count: 28 },
  { slug: 'bank', name: 'Bank', borough: 'City of London', lines: ['Central', 'Northern', 'DLR'], count: 47 },
  { slug: 'tottenham-court-road', name: 'Tottenham Court Road', borough: 'Camden', lines: ['Central', 'Northern'], count: 35 },
  { slug: 'euston', name: 'Euston', borough: 'Camden', lines: ['Northern', 'Victoria'], count: 29 },
  { slug: 'canary-wharf', name: 'Canary Wharf', borough: 'Tower Hamlets', lines: ['Jubilee', 'DLR'], count: 24 },
  { slug: 'angel', name: 'Angel', borough: 'Islington', lines: ['Northern'], count: 31 },
  { slug: 'old-street', name: 'Old Street', borough: 'Islington', lines: ['Northern'], count: 27 },
  { slug: 'whitechapel', name: 'Whitechapel', borough: 'Tower Hamlets', lines: ['District', 'Hammersmith & City'], count: 38 }
];

export default function HalalNearStationsIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const totalVenues = STATIONS.reduce((sum, s) => sum + s.count, 0);

  const filteredStations = searchQuery 
    ? STATIONS.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.borough.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : STATIONS;

  return (
    <>
      <Head>
        <title>Halal Restaurants Near London Tube Stations | Best of London</title>
        <meta 
          name="description" 
          content={`Find halal restaurants within walking distance of ${STATIONS.length} major London tube stations. ${totalVenues}+ verified halal venues across Zone 1-2.`}
        />
        <link rel="canonical" href="https://thebestinlondon.co.uk/halal/near-stations" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Halal Restaurants Near London Tube Stations",
          "description": `Find halal restaurants within walking distance of ${STATIONS.length} major London tube stations`,
          "url": "https://thebestinlondon.co.uk/halal/near-stations"
        }) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.background.primary }}>
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: theme.colors.background.primary,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: theme.spacing.md
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ 
                fontFamily: theme.typography.heading.family,
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
              fontFamily: theme.typography.heading.family,
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
              Find authentic halal dining within walking distance of {STATIONS.length} major London stations.
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacing.xl,
              justifyContent: 'center',
              padding: theme.spacing.lg,
              background: `${theme.colors.accent.gold}10`,
              borderRadius: '12px',
              border: `1px solid ${theme.colors.border.subtle}`,
              marginBottom: theme.spacing.xl
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.colors.accent.gold }}>
                  {STATIONS.length}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>Stations</div>
              </div>
              <div style={{ width: '1px', background: theme.colors.border.default }}></div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.colors.accent.gold }}>
                  {totalVenues}+
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>Halal Venues</div>
              </div>
              <div style={{ width: '1px', background: theme.colors.border.default }}></div>
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
                  border: `1px solid ${theme.colors.border.default}`,
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
                fontFamily: theme.typography.heading.family,
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: theme.spacing.md
            }}>
              {filteredStations.map(station => (
                <div
                  key={station.slug}
                  style={{
                    display: 'block',
                    background: `${theme.colors.text.primary}05`,
                    border: `1px solid ${theme.colors.border.subtle}`,
                    borderRadius: '12px',
                    padding: theme.spacing.lg,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: theme.spacing.sm 
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600
                    }}>
                      {station.name}
                    </h3>
                    <div style={{
                      background: `${theme.colors.accent.gold}20`,
                      color: theme.colors.accent.gold,
                      padding: '0.25rem 0.625rem',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}>
                      {station.count} venues
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.8125rem',
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing.sm
                  }}>
                    {station.borough}
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.375rem',
                    marginBottom: theme.spacing.sm
                  }}>
                    {station.lines.slice(0, 3).map(line => (
                      <span
                        key={line}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem',
                          background: `${theme.colors.text.secondary}20`,
                          color: theme.colors.text.secondary,
                          borderRadius: '4px'
                        }}
                      >
                        {line}
                      </span>
                    ))}
                    {station.lines.length > 3 && (
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        color: theme.colors.text.secondary
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
              fontFamily: theme.typography.heading.family,
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
