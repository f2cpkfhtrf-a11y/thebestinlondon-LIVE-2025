import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { theme } from '../../utils/theme';
import FSABadge from '../../components/FSABadge';
import ReviewBadges from '../../components/ReviewBadges';
import DietaryTags from '../../components/DietaryTags';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    const paths = data.venues.map(venue => ({
      params: { slug: venue.slug }
    }));
    
    return { paths, fallback: 'blocking' };
  } catch (error) {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    const venue = data.venues.find(v => v.slug === params.slug);
    
    if (!venue) {
      return { notFound: true };
    }
    
    return { props: { venue }, revalidate: 86400 };
  } catch (error) {
    return { notFound: true };
  }
}

export default function VenueDetailPage({ venue }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div style={{ padding: '100px', textAlign: 'center', background: theme.colors.bg.primary, minHeight: '100vh' }}>
      <p style={{ color: theme.colors.text.primary }}>Loading...</p>
    </div>;
  }
  
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: venue.category === 'restaurant' && venue.cuisines?.[0] ? `${venue.cuisines?.[0].charAt(0).toUpperCase() + venue.cuisines?.[0].slice(1)} Restaurants` : 'Restaurants', href: venue.cuisines?.[0] ? `/${venue.cuisines?.[0]}-restaurants-london` : '/restaurants' },
    { name: venue.name, href: null }
  ];
  
  return (
    <>
      <Head>
        <title>{venue.name} - {venue.area || 'London'} | The Best in London</title>
        <meta name="description" content={`${venue.name} in ${venue.area || 'London'}. ${venue.cuisines?.[0] ? venue.cuisines?.[0].charAt(0).toUpperCase() + venue.cuisines?.[0].slice(1) + ' restaurant' : 'Restaurant'} with ${venue.rating || 'great'} rating${venue.fsa_rating ? `, FSA ${venue.fsa_rating}/5` : ''}. ${venue.address}`} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/restaurant/${venue.slug}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": venue.name,
          "image": venue.photos?.[0]?.url || '',
          "address": {
            "@type": "PostalAddress",
            "streetAddress": venue.address,
            "addressLocality": venue.area || 'London',
            "addressRegion": venue.borough || 'London',
            "postalCode": venue.postcode || '',
            "addressCountry": "GB"
          },
          "geo": venue.lat && venue.lng ? {
            "@type": "GeoCoordinates",
            "latitude": venue.lat,
            "longitude": venue.lng
          } : undefined,
          "url": venue.website || `https://thebestinlondon.co.uk/restaurant/${venue.slug}`,
          "telephone": venue.phone || '',
          "servesCuisine": venue.cuisines?.[0] || '',
          "priceRange": venue.price_range || '££',
          "aggregateRating": venue.rating ? {
            "@type": "AggregateRating",
            "ratingValue": venue.rating,
            "reviewCount": venue.user_ratings_total,
            "bestRating": 5,
            "worstRating": 1
          } : undefined,
          "openingHoursSpecification": venue.opening_hours?.weekday_text ? venue.opening_hours.weekday_text.map(day => {
            const [dayName, hours] = day.split(': ');
            return {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": dayName
            };
          }) : undefined
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
            <div style={{ fontSize: '13px', color: theme.colors.text.secondary, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {crumb.href ? (
                    <Link href={crumb.href} style={{ color: 'inherit', textDecoration: 'none' }}>{crumb.name}</Link>
                  ) : (
                    <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>{crumb.name}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && <span style={{ color: theme.colors.border.prominent }}>/</span>}
                </span>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Image Gallery */}
        <div style={{ position: 'relative', height: '400px', background: theme.colors.bg.elevated }}>
          {venue.photos && venue.photos.length > 0 ? (
            <img 
              src={venue.photos[0].url}
              alt={`${venue.name} - ${venue.area || 'London'}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.text.secondary }}>
              <p>No image available</p>
            </div>
          )}
          
          {venue.fsa_rating && (
            <div style={{ position: 'absolute', top: theme.spacing.xl, right: theme.spacing.xl }}>
              <FSABadge rating={venue.fsa_rating} size="large" showLabel={true} />
            </div>
          )}
        </div>

        {/* Main Content */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
            
            {/* Left Column */}
            <div>
              <div style={{ marginBottom: theme.spacing['2xl'] }}>
                <DietaryTags tags={venue.dietary_tags} size="medium" />
                
                <h1 style={{
                  fontFamily: theme.typography.serif,
                  fontSize: '48px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  marginTop: theme.spacing.lg,
                  marginBottom: theme.spacing.base,
                  color: theme.colors.text.primary
                }}>
                  {venue.name}
                </h1>
                
                <div style={{ display: 'flex', gap: theme.spacing.lg, fontSize: '16px', color: theme.colors.text.secondary, marginBottom: theme.spacing.xl }}>
                  {venue.cuisines?.[0] && <span>{venue.cuisines?.[0].charAt(0).toUpperCase() + venue.cuisines?.[0].slice(1)}</span>}
                  {venue.price_range && <span>{venue.price_range}</span>}
                  {venue.area && <span>{venue.area}</span>}
                </div>
                
                <ReviewBadges 
                  google={{ rating: venue.rating, reviews: venue.user_ratings_total }}
                  tripadvisor={venue.tripadvisor}
                  layout="row"
                />
              </div>

              {/* Description */}
              {venue.description && (
                <div style={{ 
                  background: theme.colors.bg.elevated, 
                  padding: theme.spacing['2xl'], 
                  borderRadius: theme.radius.lg, 
                  marginBottom: theme.spacing['2xl'],
                  border: `1px solid ${theme.colors.border.subtle}` 
                }}>
                  <p style={{ 
                    fontSize: '16px', 
                    lineHeight: 1.7, 
                    color: theme.colors.text.secondary,
                    margin: 0 
                  }}>
                    {venue.description}
                  </p>
                </div>
              )}

              {/* Address & Contact */}
              <div style={{ background: theme.colors.bg.elevated, padding: theme.spacing['2xl'], borderRadius: theme.radius.lg, marginBottom: theme.spacing['2xl'], border: `1px solid ${theme.colors.border.subtle}` }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: theme.spacing.lg }}>Location & Contact</h2>
                
                <div style={{ display: 'grid', gap: theme.spacing.lg }}>
                  <div>
                    <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '4px' }}>Address</div>
                    <div style={{ fontSize: '16px' }}>{venue.address}</div>
                  </div>
                  
                  {venue.phone && (
                    <div>
                      <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '4px' }}>Phone</div>
                      <a href={`tel:${venue.phone}`} style={{ fontSize: '16px', color: theme.colors.accent.gold, textDecoration: 'none' }}>
                        {venue.phone}
                      </a>
                    </div>
                  )}
                  
                  {venue.website && (
                    <div>
                      <div style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: '4px' }}>Website</div>
                      <a href={venue.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: theme.colors.accent.gold, textDecoration: 'none' }}>
                        Visit Website →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Opening Hours */}
              {venue.opening_hours?.weekday_text && venue.opening_hours.weekday_text.length > 0 && (
                <div style={{ background: theme.colors.bg.elevated, padding: theme.spacing['2xl'], borderRadius: theme.radius.lg, marginBottom: theme.spacing['2xl'], border: `1px solid ${theme.colors.border.subtle}` }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: theme.spacing.lg }}>Opening Hours</h2>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {venue.opening_hours.weekday_text.map((day, idx) => (
                      <div key={idx} style={{ fontSize: '15px', display: 'grid', gridTemplateColumns: '120px 1fr' }}>
                        <span style={{ color: theme.colors.text.secondary }}>{day.split(':')[0]}</span>
                        <span>{day.split(':').slice(1).join(':').trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {venue.reviews && venue.reviews.length > 0 && (
                <div style={{ background: theme.colors.bg.elevated, padding: theme.spacing['2xl'], borderRadius: theme.radius.lg, border: `1px solid ${theme.colors.border.subtle}` }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: theme.spacing.lg }}>Recent Reviews</h2>
                  <div style={{ display: 'grid', gap: theme.spacing.xl }}>
                    {venue.reviews.map((review, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ fontWeight: 600 }}>{review.author}</div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} style={{ color: i < review.rating ? theme.colors.accent.gold : theme.colors.border.prominent }}>★</span>
                            ))}
                          </div>
                        </div>
                        <p style={{ fontSize: '15px', color: theme.colors.text.secondary, lineHeight: 1.6 }}>{review.text}</p>
                        {review.relative_time && (
                          <div style={{ fontSize: '13px', color: theme.colors.text.secondary, marginTop: '8px' }}>{review.relative_time}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - CTAs */}
            <div>
              <div style={{ position: 'sticky', top: '100px' }}>
                <div style={{ background: theme.colors.bg.elevated, padding: theme.spacing['2xl'], borderRadius: theme.radius.lg, border: `1px solid ${theme.colors.border.subtle}`, marginBottom: theme.spacing.lg }}>
                  
                  <a href={venue.google?.url || `https://www.google.com/maps/place/?q=place_id:${venue.place_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      padding: theme.spacing.lg,
                      background: theme.colors.text.primary,
                      color: theme.colors.text.inverse,
                      border: 'none',
                      borderRadius: theme.radius.sm,
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginBottom: theme.spacing.base,
                      transition: `all ${theme.motion.fast}`
                    }}>
                      View on Google Maps
                    </button>
                  </a>
                  
                  {venue.website && (
                    <a href={venue.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <button style={{
                        width: '100%',
                        padding: theme.spacing.lg,
                        background: 'transparent',
                        color: theme.colors.text.primary,
                        border: `1px solid ${theme.colors.border.prominent}`,
                        borderRadius: theme.radius.sm,
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: `all ${theme.motion.fast}`
                      }}>
                        Visit Website
                      </button>
                    </a>
                  )}
                </div>
                
                {venue.fsa && (
                  <div style={{ background: theme.colors.bg.elevated, padding: theme.spacing['2xl'], borderRadius: theme.radius.lg, border: `1px solid ${theme.colors.border.subtle}` }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: theme.spacing.base }}>Food Hygiene Rating</h3>
                    <div style={{ marginBottom: theme.spacing.lg }}>
                      <FSABadge rating={venue.fsa_rating} size="large" showLabel={true} />
                    </div>
                    <p style={{ fontSize: '13px', color: theme.colors.text.secondary, marginBottom: theme.spacing.base }}>
                      Inspected by {venue.fsa_authority}
                    </p>
                    {venue.fsa_url && (
                      <a href={venue.fsa_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: theme.colors.accent.gold, textDecoration: 'none' }}>
                        View full FSA report →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['4xl']} 0 ${theme.spacing['2xl']}`, borderTop: `1px solid ${theme.colors.border.subtle}`, marginTop: '80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', fontSize: '13px', color: theme.colors.text.secondary }}>
            <p style={{ margin: 0 }}>© 2025 The Best in London. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
