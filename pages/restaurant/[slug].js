import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { theme } from '../../utils/theme';
import { generateSEOTitle, generateSEODescription, generateStructuredData, generateBreadcrumbData } from '../../utils/seoOptimization';
import FSABadge from '../../components/FSABadge';
import BestOfLondonBadge from '../../components/BestOfLondonBadge';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let venues = JSON.parse(fileContent);
    
    // Handle both flat array and wrapped object
    if (!Array.isArray(venues) && venues.venues) {
      venues = venues.venues;
    }
    
    const paths = venues.map(venue => ({
      params: { slug: venue.slug }
    }));
    
    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('getStaticPaths error:', error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let venues = JSON.parse(fileContent);
    
    // Handle both flat array and wrapped object
    if (!Array.isArray(venues) && venues.venues) {
      venues = venues.venues;
    }
    
    const venue = venues.find(v => v.slug === params.slug);
    
    if (!venue) {
      return { notFound: true };
    }
    
    return { props: { venue }, revalidate: 86400 };
  } catch (error) {
    console.error('getStaticProps error:', error);
    return { notFound: true };
  }
}

export default function VenueDetailPage({ venue }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div style={{ padding: '100px', textAlign: 'center', background: '#0B0B0B', minHeight: '100vh' }}>
      <p style={{ color: '#FAFAFA' }}>Loading...</p>
    </div>;
  }
  
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": venue.name,
    "image": venue.photos?.[0]?.url || '',
    "address": venue.address ? {
      "@type": "PostalAddress",
      "streetAddress": venue.address.formatted,
      "postalCode": venue.address.postcode,
      "addressCountry": "GB"
    } : null,
    "geo": venue.address?.lat && venue.address?.lng ? {
      "@type": "GeoCoordinates",
      "latitude": venue.address.lat,
      "longitude": venue.address.lng
    } : null,
    "url": venue.website || `https://thebestinlondon.co.uk/restaurant/${venue.slug}`,
    "telephone": venue.phone || '',
    "servesCuisine": venue.cuisines?.[0] || '',
    "priceRange": '£'.repeat(venue.price_level || 2),
    "aggregateRating": venue.rating ? {
      "@type": "AggregateRating",
      "ratingValue": venue.rating,
      "reviewCount": venue.user_ratings_total || 0,
      "bestRating": 5,
      "worstRating": 1
    } : null
  };
  
  return (
    <>
      <Head>
        <title>{generateSEOTitle('restaurant', venue)}</title>
        <meta name="description" content={generateSEODescription('restaurant', venue)} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/restaurant/${venue.slug}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={generateSEOTitle('restaurant', venue)} />
        <meta property="og:description" content={generateSEODescription('restaurant', venue)} />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content={`https://thebestinlondon.co.uk/restaurant/${venue.slug}`} />
        <meta property="og:image" content={venue.photos?.[0]?.url || 'https://thebestinlondon.co.uk/logo.svg'} />
        <meta property="og:image:alt" content={`${venue.name} restaurant in ${venue.borough || 'London'}`} />
        <meta property="og:site_name" content="The Best in London" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateSEOTitle('restaurant', venue)} />
        <meta name="twitter:description" content={generateSEODescription('restaurant', venue)} />
        <meta name="twitter:image" content={venue.photos?.[0]?.url || 'https://thebestinlondon.co.uk/logo.svg'} />
        <meta name="twitter:image:alt" content={`${venue.name} restaurant in ${venue.borough || 'London'}`} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="keywords" content={`${venue.name}, ${venue.cuisines?.join(', ') || 'restaurant'}, ${venue.borough || 'London'}, restaurant reviews, FSA rating, halal restaurant`} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="The Best in London" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData('restaurant', venue)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbData([
          { name: 'Home', url: 'https://thebestinlondon.co.uk' },
          { name: 'Restaurants', url: 'https://thebestinlondon.co.uk/restaurants' },
          { name: venue.cuisines?.[0] || 'Restaurants', url: `https://thebestinlondon.co.uk/${venue.cuisines?.[0]?.toLowerCase().replace(/\s+/g, '-')}` },
          { name: venue.name, url: `https://thebestinlondon.co.uk/restaurant/${venue.slug}` }
        ])) }} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0B0B0B', color: '#FAFAFA' }}>
        
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #2A2A2A',
          padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none', fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#FAFAFA' }}>
                The Best in London
              </Link>
              <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500 }}>
                <Link href="/restaurants" style={{ color: '#9AA0A6', textDecoration: 'none' }}>Restaurants</Link>
                <Link href="/bars" style={{ color: '#9AA0A6', textDecoration: 'none' }}>Bars</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Image */}
        <div style={{ 
          position: 'relative', 
          height: 'clamp(300px, 50vh, 500px)', 
          background: 'linear-gradient(135deg, rgba(11,11,11,0.8) 0%, rgba(11,11,11,0.4) 100%)'
        }}>
          {venue.photos && venue.photos[0] && venue.photos[0].url ? (
            <img 
              src={venue.photos[0].url}
              alt={`${venue.name} restaurant in London`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: 'brightness(0.9)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '16px',
              color: '#9AA0A6',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(11,11,11,0.9) 100%)'
            }}>
              <div style={{ fontSize: '64px', opacity: 0.6 }}>🍽️</div>
              <p style={{ fontSize: '18px', opacity: 0.8 }}>{venue.cuisines?.[0] || 'Restaurant'}</p>
            </div>
          )}
          
          {/* Overlay with restaurant name */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(11,11,11,0.9))',
            padding: '40px 20px 20px',
            color: '#FAFAFA'
          }}>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              {venue.name}
            </h1>
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              fontSize: '16px', 
              color: '#D4AF37', 
              marginTop: '8px',
              flexWrap: 'wrap'
            }}>
              {venue.cuisines?.[0] && <span style={{ textTransform: 'capitalize' }}>{venue.cuisines[0]}</span>}
              {venue.price_level && <span>{'£'.repeat(venue.price_level)}</span>}
              {venue.dietary_tags?.halal && <span>☪️ Halal</span>}
            </div>
          </div>
          
          {/* FSA Badge */}
          {venue.fsa_rating && (
            <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
              <FSABadge rating={venue.fsa_rating} size="hero" variant="card" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 3vw, 20px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(24px, 5vw, 48px)' }}>
            
            {/* Left Column */}
            <div>
              <div style={{ marginBottom: '32px' }}>
                
                {/* Dietary Tags */}
                {venue.dietary_tags && venue.dietary_tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {venue.dietary_tags.map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: '#D4AF37',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Ratings Section */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {/* Best of London Score */}
                    <BestOfLondonBadge venue={venue} size="large" showExplanation={true} showSubScores={true} />
                    {/* Google Rating */}
                    {venue.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#D4AF37', fontSize: '28px' }}>★</span>
                        <span style={{ fontSize: '28px', fontWeight: 700 }}>{venue.rating.toFixed(1)}</span>
                        <span style={{ color: '#9AA0A6', fontSize: '14px' }}>Google</span>
                      </div>
                    )}
                  </div>
                  {venue.user_ratings_total && (
                    <div style={{ color: '#9AA0A6', fontSize: '15px', marginBottom: '16px' }}>
                      {venue.user_ratings_total.toLocaleString()} Google reviews
                    </div>
                  )}
                  
                  {/* Additional Photo Gallery */}
                  {venue.photos && venue.photos.length > 1 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', marginTop: '16px' }}>
                      {venue.photos.slice(1, 5).map((photo, index) => (
                        <img
                          key={index}
                          src={photo.url}
                          alt={`${venue.name} interior ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {venue.description && (
                <div style={{ 
                  background: '#1A1A1A', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  marginBottom: '32px',
                  border: '1px solid #2A2A2A' 
                }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', fontFamily: 'Playfair Display, serif' }}>About</h2>
                  <p style={{ 
                    fontSize: '16px', 
                    lineHeight: 1.7, 
                    color: '#9AA0A6',
                    margin: 0 
                  }}>
                    {venue.description}
                  </p>
                </div>
              )}

              {/* Reviews Section */}
              <div style={{ background: '#1A1A1A', padding: '32px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #2A2A2A' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>What People Say</h2>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  {/* Google Reviews Summary */}
                  {venue.rating && venue.user_ratings_total && (
                    <div style={{ 
                      background: 'rgba(212, 175, 55, 0.05)', 
                      padding: '20px', 
                      borderRadius: '8px',
                      border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ color: '#D4AF37', fontSize: '24px' }}>★</span>
                        <span style={{ fontSize: '24px', fontWeight: 700 }}>{venue.rating.toFixed(1)}</span>
                        <span style={{ color: '#9AA0A6', fontSize: '14px' }}>Google Reviews</span>
                      </div>
                      <div style={{ color: '#9AA0A6', fontSize: '14px' }}>
                        Based on {venue.user_ratings_total.toLocaleString()} reviews
                      </div>
                    </div>
                  )}
                  
                  {/* FSA Rating */}
                  {venue.fsa_rating && (
                    <div style={{ 
                      background: 'rgba(16, 185, 129, 0.05)', 
                      padding: '20px', 
                      borderRadius: '8px',
                      border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ color: '#10B981', fontSize: '24px' }}>🏥</span>
                        <span style={{ fontSize: '24px', fontWeight: 700 }}>{venue.fsa_rating}/5</span>
                        <span style={{ color: '#9AA0A6', fontSize: '14px' }}>FSA Hygiene Rating</span>
                      </div>
                      <div style={{ color: '#9AA0A6', fontSize: '14px' }}>
                        Food Standards Agency hygiene inspection
                      </div>
                    </div>
                  )}
                  
                  {/* Best of London Score Explanation */}
                  <div style={{ 
                    background: 'rgba(212, 175, 55, 0.05)', 
                    padding: '20px', 
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ color: '#D4AF37', fontSize: '24px' }}>⭐</span>
                      <span style={{ fontSize: '20px', fontWeight: 700 }}>Best of London Score</span>
                    </div>
                    <div style={{ color: '#9AA0A6', fontSize: '14px', lineHeight: 1.5 }}>
                      Our proprietary rating combines Google reviews (60%), review quality (20%), and FSA hygiene (20%) to give you the most comprehensive assessment of London's dining scene.
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Contact */}
              <div style={{ background: '#1A1A1A', padding: '32px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #2A2A2A' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>Location & Contact</h2>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  {venue.address && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#9AA0A6', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Address</div>
                      <div style={{ fontSize: '16px' }}>{venue.address.formatted || venue.address}</div>
                    </div>
                  )}
                  
                  {venue.phone && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#9AA0A6', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Phone</div>
                      <a href={`tel:${venue.phone}`} style={{ fontSize: '16px', color: '#D4AF37', textDecoration: 'none' }}>
                        {venue.phone}
                      </a>
                    </div>
                  )}
                  
                  {venue.website && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#9AA0A6', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Website</div>
                      <a href={venue.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#D4AF37', textDecoration: 'none' }}>
                        Visit Website →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Opening Hours */}
              {venue.opening_hours?.weekday_text && venue.opening_hours.weekday_text.length > 0 && (
                <div style={{ background: '#1A1A1A', padding: '32px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #2A2A2A' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>Opening Hours</h2>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {venue.opening_hours.weekday_text.map((day, idx) => (
                      <div key={idx} style={{ fontSize: '15px', display: 'grid', gridTemplateColumns: '120px 1fr' }}>
                        <span style={{ color: '#9AA0A6', fontWeight: 600 }}>{day.split(':')[0]}</span>
                        <span>{day.split(':').slice(1).join(':').trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              {venue.reviews && venue.reviews.length > 0 && (
                <div style={{ background: "#1A1A1A", padding: "32px", borderRadius: "12px", border: "1px solid #2A2A2A" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "24px", fontFamily: "Playfair Display, serif" }}>What People Say</h2>
                  <div style={{ display: "grid", gap: "24px" }}>
                    {venue.reviews.map((review, idx) => (
                      <div key={idx} style={{ padding: "20px", background: "#0B0B0B", borderRadius: "8px", border: "1px solid #2A2A2A" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                          <div>
                            <div style={{ fontWeight: 600, marginBottom: "4px" }}>{review.author_name}</div>
                            <div style={{ fontSize: "13px", color: "#9AA0A6" }}>{review.relative_time_description || "Recently"}</div>
                          </div>
                          <div style={{ display: "flex", color: "#D4AF37" }}>
                            {[...Array(5)].map((_, i) => (<span key={i}>{i < review.rating ? "★" : "☆"}</span>))}
                          </div>
                        </div>
                        {review.text && (<p style={{ fontSize: "15px", lineHeight: 1.6, color: "#E0E0E0", margin: 0 }}>{review.text}</p>)}
                      </div>
                    ))}
                  </div>
                  {venue.user_ratings_total > venue.reviews.length && (
                    <div style={{ marginTop: "24px", textAlign: "center" }}>
                      <a href={`https://www.google.com/maps/place/?q=place_id:${venue.place_id}`} target="_blank" rel="noopener noreferrer" style={{ color: "#D4AF37", fontSize: "14px", textDecoration: "none", display: "inline-block", padding: "12px 24px", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "8px" }}>
                        Read all {venue.user_ratings_total.toLocaleString()} reviews on Google →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - CTAs */}
            <div>
              <div style={{ position: 'relative' }} className="sidebar-sticky">
                <div style={{ background: '#1A1A1A', padding: '24px', borderRadius: '12px', border: '1px solid #2A2A2A', marginBottom: '16px' }}>
                  
                  <a href={`https://www.google.com/maps/place/?q=place_id:${venue.place_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      padding: '16px',
                      background: '#D4AF37',
                      color: '#0B0B0B',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginBottom: '12px',
                      transition: 'all 0.3s'
                    }}>
                      View on Google Maps
                    </button>
                  </a>
                  
                  {venue.website && (
                    <a href={venue.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <button style={{
                        width: '100%',
                        padding: '16px',
                        background: 'transparent',
                        color: '#FAFAFA',
                        border: '1px solid #D4AF37',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}>
                        Visit Website
                      </button>
                    </a>
                  )}
                </div>
                
                {venue.fsa_rating && venue.fsa_url && (
                  <div style={{ 
                    background: '#1A1A1A', 
                    padding: '24px', 
                    borderRadius: '12px', 
                    border: '1px solid #2A2A2A',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      marginBottom: '16px',
                      color: '#FAFAFA'
                    }}>
                      Food Hygiene Rating
                    </h3>
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                      <FSABadge rating={venue.fsa_rating} size="large" />
                    </div>
                    <a href={venue.fsa_url} target="_blank" rel="noopener noreferrer" style={{ 
                      fontSize: '13px', 
                      color: '#D4AF37', 
                      textDecoration: 'none',
                      display: 'inline-block',
                      marginTop: '8px'
                    }}>
                      View full FSA report →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ background: '#0B0B0B', padding: '48px 0 24px', borderTop: '1px solid #2A2A2A', marginTop: '80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', fontSize: '13px', color: '#666' }}>
            <p style={{ margin: 0 }}>© 2025 The Best in London. All rights reserved.</p>
          </div>
        </footer>

      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .sidebar-sticky {
            position: sticky !important;
            top: 100px;
          }
        }
      `}</style>
    </>
  );
}
