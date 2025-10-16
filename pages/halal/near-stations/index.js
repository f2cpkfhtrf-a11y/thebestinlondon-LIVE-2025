// /halal/near-stations - Station directory for halal venues
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { LONDON_STATIONS } from '../../../utils/halalStations';
import venuesData from '../../../public/venues.json';
import { isHalalVenue, calculateDistance } from '../../../utils/halalStations';

export default function HalalNearStationsIndex({ stationCounts }) {
  const totalVenues = Object.values(stationCounts).reduce((sum, count) => sum + count, 0);

  return (
    <>
      <Head>
        <title>Halal Restaurants Near London Tube Stations | Best of London</title>
        <meta 
          name="description" 
          content={`Find halal restaurants within walking distance of ${LONDON_STATIONS.length} major London tube stations. ${totalVenues}+ verified halal venues across Zone 1-2.`}
        />
        <meta name="keywords" content="halal restaurants London, halal near station, halal tube station, halal Zone 1, halal central London" />
        <link rel="canonical" href="https://thebestinlondon.co.uk/halal/near-stations" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Halal Restaurants Near London Tube Stations | Best of London" />
        <meta property="og:description" content={`${totalVenues}+ halal venues near ${LONDON_STATIONS.length} major stations`} />
        <meta property="og:url" content="https://thebestinlondon.co.uk/halal/near-stations" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Halal Restaurants Near London Tube Stations",
              "description": `Find halal restaurants within walking distance of ${LONDON_STATIONS.length} major London tube stations`,
              "url": "https://thebestinlondon.co.uk/halal/near-stations",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thebestinlondon.co.uk" },
                  { "@type": "ListItem", "position": 2, "name": "Halal Near Stations", "item": "https://thebestinlondon.co.uk/halal/near-stations" }
                ]
              },
              "numberOfItems": LONDON_STATIONS.length
            })
          }}
        />
      </Head>

      <div style={{ 
        minHeight: '100vh',
        background: '#0B0B0B',
        color: '#FAFAFA'
      }}>
        <Header />

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(180deg, rgba(212,175,55,0.05) 0%, rgba(11,11,11,0) 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          padding: '4rem 1.5rem 3rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '24px',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: '#D4AF37',
              marginBottom: '1.5rem'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Station-Based Directory
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #FAFAFA 0%, #9AA0A6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Halal Restaurants Near<br/>London Tube Stations
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#9AA0A6',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Find authentic halal dining within walking distance of {LONDON_STATIONS.length} major London stations. 
              Each venue verified for proximity, quality, and halal status.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              justifyContent: 'center',
              padding: '1.5rem',
              background: 'rgba(212,175,55,0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(212,175,55,0.1)'
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#D4AF37' }}>{LONDON_STATIONS.length}</div>
                <div style={{ fontSize: '0.875rem', color: '#9AA0A6' }}>Stations Covered</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(212,175,55,0.2)' }}></div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#D4AF37' }}>{totalVenues}+</div>
                <div style={{ fontSize: '0.875rem', color: '#9AA0A6' }}>Halal Venues</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(212,175,55,0.2)' }}></div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#D4AF37' }}>0.6km</div>
                <div style={{ fontSize: '0.875rem', color: '#9AA0A6' }}>Default Radius</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stations Grid */}
        <section style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Browse by Station
            </h2>
            <p style={{ color: '#9AA0A6', fontSize: '0.95rem' }}>
              Select a station to see nearby halal restaurants (0.3–1.0km radius)
            </p>
          </div>

          {/* Zone 1 Central */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#D4AF37',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#D4AF37'
              }}></span>
              Zone 1 – Central London
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {LONDON_STATIONS.filter(s => ['oxford-circus', 'tottenham-court-road', 'piccadilly-circus', 'leicester-square', 'covent-garden', 'bond-street', 'green-park', 'bank'].includes(s.slug)).map(station => (
                <StationCard key={station.slug} station={station} count={stationCounts[station.slug]} />
              ))}
            </div>
          </div>

          {/* Major Stations */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#D4AF37',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#D4AF37'
              }}></span>
              Major Transport Hubs
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {LONDON_STATIONS.filter(s => ['liverpool-street', 'london-bridge', 'waterloo', 'victoria', 'kings-cross', 'paddington', 'euston'].includes(s.slug)).map(station => (
                <StationCard key={station.slug} station={station} count={stationCounts[station.slug]} />
              ))}
            </div>
          </div>

          {/* Zone 2 & Key Areas */}
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#D4AF37',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#D4AF37'
              }}></span>
              Zone 2 & Neighborhood Hubs
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {LONDON_STATIONS.filter(s => !['oxford-circus', 'tottenham-court-road', 'piccadilly-circus', 'leicester-square', 'covent-garden', 'bond-street', 'green-park', 'bank', 'liverpool-street', 'london-bridge', 'waterloo', 'victoria', 'kings-cross', 'paddington', 'euston'].includes(s.slug)).map(station => (
                <StationCard key={station.slug} station={station} count={stationCounts[station.slug]} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(180deg, rgba(11,11,11,0) 0%, rgba(212,175,55,0.05) 100%)',
          borderTop: '1px solid rgba(212,175,55,0.1)',
          padding: '3rem 1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.75rem',
              marginBottom: '1rem'
            }}>
              Can't Find Your Station?
            </h2>
            <p style={{
              color: '#9AA0A6',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Browse our complete collection of halal restaurants across all London areas, 
              or use the search to find venues by cuisine, area, or name.
            </p>
            <Link 
              href="/best-halal-restaurants-london"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)',
                color: '#0B0B0B',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'transform 0.2s ease'
              }}
            >
              View All Halal Restaurants
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

function StationCard({ station, count }) {
  return (
    <Link 
      href={`/halal/near-stations/${station.slug}`}
      style={{
        display: 'block',
        background: 'rgba(250,250,250,0.02)',
        border: '1px solid rgba(250,250,250,0.06)',
        borderRadius: '12px',
        padding: '1.25rem',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(250,250,250,0.02)';
        e.currentTarget.style.borderColor = 'rgba(250,250,250,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          marginBottom: '0.25rem'
        }}>
          {station.name}
        </h3>
        <div style={{
          background: 'rgba(212,175,55,0.15)',
          color: '#D4AF37',
          padding: '0.25rem 0.625rem',
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: '600',
          whiteSpace: 'nowrap'
        }}>
          {count} venues
        </div>
      </div>

      <div style={{
        fontSize: '0.8125rem',
        color: '#9AA0A6',
        marginBottom: '0.75rem'
      }}>
        {station.borough}
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.375rem'
      }}>
        {station.lines.slice(0, 3).map(line => (
          <span
            key={line}
            style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              background: 'rgba(154,160,166,0.15)',
              color: '#9AA0A6',
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
            color: '#9AA0A6'
          }}>
            +{station.lines.length - 3}
          </span>
        )}
      </div>
    </Link>
  );
}

export async function getStaticProps() {
  // Count venues within 0.6km of each station
  const stationCounts = {};
  
  LONDON_STATIONS.forEach(station => {
    const nearbyHalal = venuesData.filter(venue => {
      const halal = isHalalVenue(venue);
      if (!halal.isHalal) return false;
      const distance = calculateDistance(station.lat, station.lng, venue.lat, venue.lng);
      return distance <= 0.6;
    });
    stationCounts[station.slug] = nearbyHalal.length;
  });

  return {
    props: {
      stationCounts
    }
  };
}
