import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { theme } from '../../utils/theme';
import FSABadge from '../../components/FSABadge';

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
        <title>{venue.name} | The Best in London</title>
        <meta name="description" content={venue.description || `${venue.name} in London. ${venue.cuisines?.[0] || 'Restaurant'} with ${venue.rating || 'great'} rating.`} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/restaurant/${venue.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
        <div style={{ position: 'relative', height: '400px', background: '#1A1A1A' }}>
          {venue.photos && venue.photos[0] ? (
            <img 
              src={venue.photos[0].url}
              alt={venue.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <p>No image available</p>
            </div>
          )}
          
          {venue.fsa_rating && (
            <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
              <FSABadge rating={venue.fsa_rating} size="hero" variant="card" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
            
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
                
                <h1 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '48px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  marginTop: '16px',
                  marginBottom: '16px',
                  color: '#FAFAFA'
                }}>
                  {venue.name}
                </h1>
                
                {/* Meta Info */}
                <div style={{ display: 'flex', gap: '16px', fontSize: '16px', color: '#9AA0A6', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {venue.cuisines?.[0] && <span style={{ textTransform: 'capitalize' }}>{venue.cuisines[0]}</span>}
                  {venue.price_level && <span>{'£'.repeat(venue.price_level)}</span>}
                </div>
                
                {/* Rating */}
                {venue.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#D4AF37', fontSize: '32px' }}>★</span>
                      <span style={{ fontSize: '32px', fontWeight: 700 }}>{venue.rating.toFixed(1)}</span>
                    </div>
                    {venue.user_ratings_total && (
                      <span style={{ color: '#9AA0A6', fontSize: '16px' }}>
                        ({venue.user_ratings_total.toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                )}
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
              <div style={{ position: 'sticky', top: '100px' }}>
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
    </>
  );
}
