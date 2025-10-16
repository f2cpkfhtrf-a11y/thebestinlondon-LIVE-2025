// /halal/near-stations/[stationSlug] - Individual station page with radius filter
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import VenueCard from '../../../components/VenueCard';
import { LONDON_STATIONS, getVenuesNearStation, calculateBestOfLondonScore } from '../../../utils/halalStations';
import venuesData from '../../../public/venues.json';

export default function HalalNearStation({ station, venuesByRadius }) {
  const [selectedRadius, setSelectedRadius] = useState(0.6);
  const venues = venuesByRadius[selectedRadius] || [];

  const radiusOptions = [
    { value: 0.3, label: '300m', desc: 'Very close' },
    { value: 0.6, label: '600m', desc: 'Short walk' },
    { value: 1.0, label: '1km', desc: 'Medium walk' }
  ];

  return (
    <>
      <Head>
        <title>Halal Restaurants Near {station.name} Station | Best of London</title>
        <meta 
          name="description" 
          content={`${venues.length} halal restaurants within ${selectedRadius}km of ${station.name} tube station. Verified halal venues with ratings, reviews, and walking directions.`}
        />
        <meta name="keywords" content={`halal ${station.name}, halal near ${station.name}, halal ${station.borough}, halal ${station.lines[0]} line`} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/halal/near-stations/${station.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Halal Restaurants Near ${station.name} Station`} />
        <meta property="og:description" content={`${venues.length} halal venues within walking distance`} />
        <meta property="og:url" content={`https://thebestinlondon.co.uk/halal/near-stations/${station.slug}`} />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": `Halal Restaurants Near ${station.name} Station`,
              "description": `${venues.length} halal restaurants within ${selectedRadius}km of ${station.name} tube station`,
              "numberOfItems": venues.length,
              "itemListElement": venues.slice(0, 10).map((venue, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "item": {
                  "@type": "Restaurant",
                  "name": venue.name,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": venue.address?.formatted || venue.vicinity,
                    "addressLocality": "London",
                    "addressCountry": "GB"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": venue.lat,
                    "longitude": venue.lng
                  },
                  "servesCuisine": venue.cuisines || [],
                  "priceRange": "£".repeat(venue.price_level || 2)
                }
              })),
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thebestinlondon.co.uk" },
                  { "@type": "ListItem", "position": 2, "name": "Halal Near Stations", "item": "https://thebestinlondon.co.uk/halal/near-stations" },
                  { "@type": "ListItem", "position": 3, "name": station.name, "item": `https://thebestinlondon.co.uk/halal/near-stations/${station.slug}` }
                ]
              }
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
          padding: '3rem 1.5rem 2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <Link href="/" style={{ color: '#9AA0A6', textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 0.5rem', color: '#9AA0A6' }}>›</span>
              <Link href="/halal/near-stations" style={{ color: '#9AA0A6', textDecoration: 'none' }}>Halal Near Stations</Link>
              <span style={{ margin: '0 0.5rem', color: '#9AA0A6' }}>›</span>
              <span style={{ color: '#FAFAFA' }}>{station.name}</span>
            </nav>

            {/* Station Header */}
            <div style={{ marginBottom: '2rem' }}>
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
                marginBottom: '1rem'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/>
                </svg>
                {station.borough}
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #FAFAFA 0%, #9AA0A6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Halal Restaurants Near<br/>{station.name} Station
              </h1>

              <p style={{
                fontSize: '1rem',
                color: '#9AA0A6',
                maxWidth: '700px',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {venues.length} halal dining options within {selectedRadius}km walking distance. 
                All venues verified for halal status and rated by our community.
              </p>

              {/* Transport Lines */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {station.lines.map(line => (
                  <span
                    key={line}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.5rem 0.875rem',
                      background: 'rgba(154,160,166,0.15)',
                      border: '1px solid rgba(154,160,166,0.2)',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: '#9AA0A6'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    </svg>
                    {line}
                  </span>
                ))}
              </div>
            </div>

            {/* Radius Filter */}
            <div style={{
              background: 'rgba(250,250,250,0.02)',
              border: '1px solid rgba(250,250,250,0.06)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#D4AF37',
                    marginBottom: '0.5rem'
                  }}>
                    Walking Distance
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap'
                  }}>
                    {radiusOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedRadius(option.value)}
                        style={{
                          flex: '1',
                          minWidth: '140px',
                          padding: '0.875rem 1.25rem',
                          background: selectedRadius === option.value 
                            ? 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)'
                            : 'rgba(250,250,250,0.03)',
                          border: selectedRadius === option.value
                            ? 'none'
                            : '1px solid rgba(250,250,250,0.08)',
                          borderRadius: '8px',
                          color: selectedRadius === option.value ? '#0B0B0B' : '#FAFAFA',
                          fontSize: '0.9375rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                          {option.label}
                        </div>
                        <div style={{ 
                          fontSize: '0.75rem',
                          opacity: selectedRadius === option.value ? 0.8 : 0.6,
                          fontWeight: '400'
                        }}>
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(212,175,55,0.05)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '8px'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span style={{ fontSize: '0.875rem', color: '#9AA0A6' }}>
                    {selectedRadius === 0.3 && 'Approximately 3-5 minute walk'}
                    {selectedRadius === 0.6 && 'Approximately 7-10 minute walk'}
                    {selectedRadius === 1.0 && 'Approximately 12-15 minute walk'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {venues.length > 0 ? (
            <>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.75rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {venues.length} Halal Restaurant{venues.length !== 1 ? 's' : ''} Found
                  </h2>
                  <p style={{ color: '#9AA0A6', fontSize: '0.95rem' }}>
                    Sorted by proximity, then by Best of London score
                  </p>
                </div>

                {/* Legend */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  fontSize: '0.8125rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#10B981'
                    }}></span>
                    <span style={{ color: '#9AA0A6' }}>Verified Halal</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#3B82F6'
                    }}></span>
                    <span style={{ color: '#9AA0A6' }}>Community Verified</span>
                  </div>
                </div>
              </div>

              {/* Venue Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}>
                {venues.map(venue => (
                  <VenueCardWithDistance 
                    key={venue.place_id} 
                    venue={venue}
                    station={station}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              background: 'rgba(250,250,250,0.02)',
              border: '1px solid rgba(250,250,250,0.06)',
              borderRadius: '12px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.5rem',
                background: 'rgba(212,175,55,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                marginBottom: '0.75rem'
              }}>
                No halal venues found at {selectedRadius}km
              </h3>
              <p style={{
                color: '#9AA0A6',
                marginBottom: '1.5rem',
                maxWidth: '500px',
                margin: '0 auto 1.5rem'
              }}>
                Try expanding your search radius above, or browse nearby stations
              </p>
              <Link
                href="/halal/near-stations"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '8px',
                  color: '#D4AF37',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                View All Stations
              </Link>
            </div>
          )}
        </section>

        {/* Nearby Stations */}
        {station.nearbyStations && station.nearbyStations.length > 0 && (
          <section style={{
            background: 'linear-gradient(180deg, rgba(11,11,11,0) 0%, rgba(212,175,55,0.03) 100%)',
            borderTop: '1px solid rgba(212,175,55,0.1)',
            padding: '3rem 1.5rem'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.75rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Nearby Stations
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                {station.nearbyStations.map(nearby => (
                  <Link
                    key={nearby.slug}
                    href={`/halal/near-stations/${nearby.slug}`}
                    style={{
                      display: 'block',
                      padding: '1.25rem',
                      background: 'rgba(250,250,250,0.02)',
                      border: '1px solid rgba(250,250,250,0.06)',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {nearby.name}
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: '#9AA0A6' }}>
                      {nearby.distance.toFixed(1)}km away • {nearby.count} halal venues
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}

function VenueCardWithDistance({ venue, station }) {
  const halalBadgeColor = venue.halalType === 'verified' ? '#10B981' : '#3B82F6';
  const halalBadgeText = venue.halalType === 'verified' ? 'Verified Halal' : 'Community Verified';

  return (
    <div style={{
      background: 'rgba(250,250,250,0.02)',
      border: '1px solid rgba(250,250,250,0.06)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    }}>
      <Link href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Image */}
        {venue.photos && venue.photos[0] && (
          <div style={{
            position: 'relative',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(11,11,11,0.8) 100%)',
            overflow: 'hidden'
          }}>
            <img
              src={venue.photos[0].url}
              alt={venue.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {/* Halal Badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: halalBadgeColor,
              color: 'white',
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {halalBadgeText}
            </div>

            {/* Distance Badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(11,11,11,0.8)',
              backdropFilter: 'blur(8px)',
              color: '#D4AF37',
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '600',
              border: '1px solid rgba(212,175,55,0.3)'
            }}>
              {venue.distanceKm}km
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '1.25rem' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#FAFAFA'
          }}>
            {venue.name}
          </h3>

          {/* Scores */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            flexWrap: 'wrap'
          }}>
            {/* Best of London Score */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.375rem 0.625rem',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(244,208,63,0.15) 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '6px'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#D4AF37' }}>
                {venue.bestOfLondonScore}
              </span>
            </div>

            {/* Google Rating */}
            {venue.rating && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.375rem 0.625rem',
                background: 'rgba(250,250,250,0.05)',
                borderRadius: '6px'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ fontSize: '0.875rem', color: '#9AA0A6' }}>
                  {venue.rating} ({venue.user_ratings_total})
                </span>
              </div>
            )}
          </div>

          {/* Cuisines */}
          {venue.cuisines && venue.cuisines.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.375rem',
              marginBottom: '0.75rem'
            }}>
              {venue.cuisines.slice(0, 3).map(cuisine => (
                <span
                  key={cuisine}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(154,160,166,0.15)',
                    color: '#9AA0A6',
                    borderRadius: '4px'
                  }}
                >
                  {cuisine}
                </span>
              ))}
            </div>
          )}

          {/* Walking Time */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#9AA0A6',
            padding: '0.625rem',
            background: 'rgba(250,250,250,0.02)',
            borderRadius: '6px',
            border: '1px solid rgba(250,250,250,0.04)'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <span>
              {venue.distanceKm < 0.4 ? '3-5 min walk' : venue.distanceKm < 0.7 ? '7-10 min walk' : '12-15 min walk'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = LONDON_STATIONS.map(station => ({
    params: { stationSlug: station.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const station = LONDON_STATIONS.find(s => s.slug === params.stationSlug);
  
  if (!station) {
    return { notFound: true };
  }

  // Pre-calculate venues for all 3 radius options
  const venuesByRadius = {};
  [0.3, 0.6, 1.0].forEach(radius => {
    venuesByRadius[radius] = getVenuesNearStation(station, venuesData, radius);
  });

  // Find 3 nearest stations (excluding current)
  const nearbyStations = LONDON_STATIONS
    .filter(s => s.slug !== station.slug)
    .map(s => {
      const distance = Math.sqrt(
        Math.pow(s.lat - station.lat, 2) + Math.pow(s.lng - station.lng, 2)
      ) * 111; // Rough km conversion
      return { 
        ...s, 
        distance,
        count: venuesByRadius[0.6].length // Use 0.6km count as reference
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  return {
    props: {
      station: {
        ...station,
        nearbyStations
      },
      venuesByRadius
    }
  };
}
