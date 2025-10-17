// /halal/near-stations/[stationSlug] - Individual station page with radius filter
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../../../utils/theme';
import FSABadge from '../../../components/FSABadge';
import BestOfLondonBadge from '../../../components/BestOfLondonBadge';
import { LONDON_STATIONS, getVenuesNearStation, isHalalVenue } from '../../../utils/halalStations';

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
        <title>Halal Restaurants Near {station.name} Station | The Best in London</title>
        <meta 
          name="description" 
          content={`${venues.length} halal restaurants within ${selectedRadius}km of ${station.name} tube station. Verified halal venues with ratings, reviews, and walking directions.`}
        />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/halal/near-stations/${station.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `Halal Restaurants Near ${station.name} Station`,
          "description": `${venues.length} halal restaurants within ${selectedRadius}km of ${station.name} tube station`,
          "url": `https://thebestinlondon.co.uk/halal/near-stations/${station.slug}`
        }) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary }}>
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(11,11,11,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ 
                fontFamily: theme.typography.serif,
                fontSize: '1.5rem',
                fontWeight: 700,
                color: theme.colors.text.primary 
              }}>
                The Best in London
              </span>
            </Link>
            <Link href="/halal/near-stations" style={{
              color: theme.colors.accent.gold,
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              ← All Stations
            </Link>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `${theme.spacing.md} 20px` }}>
          <nav style={{ fontSize: '0.875rem', color: theme.colors.text.secondary }}>
            <Link href="/" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>›</span>
            <Link href="/halal/near-stations" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>Halal Near Stations</Link>
            <span style={{ margin: '0 0.5rem' }}>›</span>
            <span style={{ color: theme.colors.text.primary }}>{station.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section style={{
          background: `linear-gradient(180deg, ${theme.colors.accent.gold}10 0%, transparent 100%)`,
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: `${theme.spacing.xl} 20px`
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              background: `${theme.colors.accent.gold}20`,
              border: `1px solid ${theme.colors.accent.gold}40`,
              borderRadius: '24px',
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              color: theme.colors.accent.gold,
              fontSize: '0.875rem',
              marginBottom: theme.spacing.md
            }}>
              📍 {station.borough}
            </div>

            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: theme.spacing.md,
              background: `linear-gradient(135deg, ${theme.colors.text.primary} 0%, ${theme.colors.text.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Halal Restaurants Near<br/>{station.name} Station
            </h1>

            <p style={{
              fontSize: '1rem',
              color: theme.colors.text.secondary,
              maxWidth: '700px',
              marginBottom: theme.spacing.lg
            }}>
              {venues.length} halal-friendly dining options within {selectedRadius}km. Please verify halal status directly with restaurants.
            </p>

            {/* Transport Lines */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.sm, marginBottom: theme.spacing.lg }}>
              {station.lines.map(line => (
                <span key={line} style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  background: `${theme.colors.text.secondary}20`,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  color: theme.colors.text.secondary
                }}>
                  🚇 {line}
                </span>
              ))}
            </div>

            {/* Radius Filter */}
            <div style={{
              background: `${theme.colors.text.primary}05`,
              border: `1px solid ${theme.colors.border.subtle}`,
              borderRadius: '12px',
              padding: theme.spacing.lg
            }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: theme.colors.accent.gold,
                marginBottom: theme.spacing.sm
              }}>
                Walking Distance
              </label>
              <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
                {radiusOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedRadius(option.value)}
                    style={{
                      flex: 1,
                      minWidth: '140px',
                      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                      background: selectedRadius === option.value 
                        ? `linear-gradient(135deg, ${theme.colors.accent.gold} 0%, #F4D03F 100%)`
                        : `${theme.colors.text.primary}08`,
                      border: selectedRadius === option.value ? 'none' : `1px solid ${theme.colors.border.subtle}`,
                      borderRadius: '8px',
                      color: selectedRadius === option.value ? theme.colors.bg.primary : theme.colors.text.primary,
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{option.label}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ padding: `${theme.spacing.xl} 20px`, maxWidth: '1200px', margin: '0 auto' }}>
          {venues.length > 0 ? (
            <>
              <h2 style={{
                fontFamily: theme.typography.serif,
                fontSize: '1.75rem',
                marginBottom: theme.spacing.lg
              }}>
                {venues.length} Halal Restaurant{venues.length !== 1 ? 's' : ''} Found
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: theme.spacing.lg
              }}>
                {venues.map(venue => (
                  <article key={venue.place_id} style={{
                    background: theme.colors.bg.elevated,
                    border: `1px solid ${theme.colors.border.subtle}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    cursor: 'pointer'
                  }}>
                    <Link href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {venue.photos?.[0] && (
                        <div style={{ position: 'relative', height: '200px' }}>
                          <img src={venue.photos[0].url} alt={venue.name} style={{
                            width: '100%', height: '100%', objectFit: 'cover'
                          }}/>
                          {/* Halal Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            background: venue.halalType === 'verified' ? '#10B981' : '#3B82F6',
                            color: 'white',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            ✓ {venue.halalType === 'verified' ? 'Verified Halal' : 'Halal-Friendly'}
                          </div>
                          {/* Distance Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: 'rgba(11,11,11,0.8)',
                            color: theme.colors.accent.gold,
                            padding: '0.375rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            border: `1px solid ${theme.colors.accent.gold}50`
                          }}>
                            {venue.distanceKm}km
                          </div>
                        </div>
                      )}

                      <div style={{ padding: theme.spacing.lg }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: theme.spacing.sm }}>
                          {venue.name}
                        </h3>

                        {/* Scores */}
                        <div style={{ display: 'flex', gap: theme.spacing.sm, marginBottom: theme.spacing.sm, flexWrap: 'wrap' }}>
                          <BestOfLondonBadge venue={venue} />
                          {venue.rating && (
                            <div style={{
                              padding: '0.375rem 0.625rem',
                              background: `${theme.colors.text.primary}10`,
                              borderRadius: '6px',
                              fontSize: '0.875rem',
                              color: theme.colors.text.secondary
                            }}>
                              ⭐ {venue.rating} ({venue.user_ratings_total})
                            </div>
                          )}
                        </div>

                        {/* Cuisines */}
                        {venue.cuisines?.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: theme.spacing.sm }}>
                            {venue.cuisines.slice(0, 3).map(cuisine => (
                              <span key={cuisine} style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                background: `${theme.colors.text.secondary}20`,
                                color: theme.colors.text.secondary,
                                borderRadius: '4px'
                              }}>
                                {cuisine}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Walking Time */}
                        <div style={{
                          fontSize: '0.875rem',
                          color: theme.colors.text.secondary,
                          padding: theme.spacing.sm,
                          background: `${theme.colors.text.primary}05`,
                          borderRadius: '6px'
                        }}>
                          🚶 {venue.distanceKm < 0.4 ? '3-5 min walk' : venue.distanceKm < 0.7 ? '7-10 min walk' : '12-15 min walk'}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
              background: `${theme.colors.text.primary}05`,
              border: `1px solid ${theme.colors.border.subtle}`,
              borderRadius: '12px'
            }}>
              <h3 style={{
                fontFamily: theme.typography.serif,
                fontSize: '1.5rem',
                marginBottom: theme.spacing.md
              }}>
                No halal venues found at {selectedRadius}km
              </h3>
              <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
                Try expanding your search radius above
              </p>
              <Link href="/halal/near-stations" style={{
                display: 'inline-block',
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                background: `${theme.colors.accent.gold}20`,
                border: `1px solid ${theme.colors.accent.gold}50`,
                borderRadius: '8px',
                color: theme.colors.accent.gold,
                textDecoration: 'none',
                fontWeight: 600
              }}>
                View All Stations
              </Link>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          padding: `${theme.spacing.xl} 20px`,
          marginTop: theme.spacing.xl,
          textAlign: 'center',
          color: theme.colors.text.secondary
        }}>
          <Link href="/" style={{ color: theme.colors.accent.gold, textDecoration: 'none', fontWeight: 600 }}>
            The Best in London
          </Link>
          <p style={{ marginTop: theme.spacing.sm, fontSize: '0.875rem' }}>
            © 2025 The Best in London. Curated • Verified • Updated Daily
          </p>
        </footer>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Generate only top 10 stations initially, rest on-demand
  const topStations = [
    'kings-cross', 'oxford-circus', 'liverpool-street', 'london-bridge',
    'victoria', 'waterloo', 'paddington', 'bank', 'tottenham-court-road', 'euston'
  ];
  const paths = LONDON_STATIONS
    .filter(s => topStations.includes(s.slug))
    .map(station => ({
      params: { stationSlug: station.slug }
    }));
  return { 
    paths, 
    fallback: 'blocking' // Generate other stations on first request
  };
}

export async function getStaticProps({ params }) {
  const station = LONDON_STATIONS.find(s => s.slug === params.stationSlug);
  if (!station) return { notFound: true };

  // Load venues data
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'public/venues.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const venuesData = JSON.parse(fileContent);
  const allVenues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);

  // Pre-filter to reduce memory usage during build
  const halalOnly = allVenues.filter(v => {
    const { isHalal } = isHalalVenue(v);
    return isHalal;
  });
  
  const venuesByRadius = {};
  [0.3, 0.6, 1.0].forEach(radius => {
    venuesByRadius[radius] = getVenuesNearStation(station, halalOnly, radius);
  });

  return {
    props: {
      station,
      venuesByRadius
    },
    revalidate: 86400 // Revalidate daily
  };
}
