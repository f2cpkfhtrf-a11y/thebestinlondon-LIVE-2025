import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { theme } from '../../utils/theme';
import { generateSEOTitle, generateSEODescription, generateStructuredData, generateBreadcrumbData } from '../../utils/seoOptimization';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BackToHome from '../../components/BackToHome';
import Breadcrumbs from '../../components/Breadcrumbs';
import FSABadge from '../../components/FSABadge';
import BestOfLondonBadge from '../../components/BestOfLondonBadge';
import { TabContainer } from '../../components/HeroTabs';
import PageHero from '../../components/PageHero';
import { generateAboutText } from '../../lib/content/aboutGenerator';
import ImageWithFallback from '../../components/ImageWithFallback';
import { isValidFsaScore, getFsaDisplayValue } from '../../lib/fsa';
import { resolveVenueHero } from '../../lib/resolveHeroImage';
// Lazy load image gallery (only loads when needed)
const EnhancedImageGallery = dynamic(() => import('../../components/EnhancedImageGallery'), {
  ssr: false
});
import BookingButton from '../../components/BookingButton';
import ErrorBoundary from '../../components/ErrorBoundary';

// Lazy load heavy components for better performance - with error boundaries
const InteractiveMap = dynamic(() => import('../../components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '400px',
      background: '#1A1A1A',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9AA0A6'
    }}>
      Loading map...
    </div>
  )
});

const SocialShareButtons = dynamic(() => import('../../components/SocialShareButtons'), {
  ssr: false,
  loading: () => null
});

export async function getServerSideProps({ params }) {
  try {
    const fs = require('fs');
    const path = require('path');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.thebestinlondon.co.uk';
    
    // Fetch the specific venue
    const res = await fetch(`${baseUrl}/api/venues?slug=${params.slug}`);
    
    if (!res.ok) {
      return { notFound: true };
    }
    
    const venues = await res.json();
    
    if (!venues || venues.length === 0) {
      return { notFound: true };
    }
    
    const venue = venues[0]; // API returns filtered results
    
    // Find nearby similar restaurants (same cuisine, within 5km)
    let nearbyVenues = [];
    if (venue.lat && venue.lng && venue.cuisines && venue.cuisines.length > 0) {
      try {
        const venuesPath = path.join(process.cwd(), 'data/venues.json');
        const allVenuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
        const allVenues = Array.isArray(allVenuesData) ? allVenuesData : (allVenuesData.venues || []);
        
        // Calculate distance and find nearby restaurants
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
          const R = 6371; // Earth's radius in km
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          return R * c;
        };
        
        nearbyVenues = allVenues
          .filter(v => 
            v.slug !== venue.slug && 
            v.lat && 
            v.lng && 
            v.cuisines && 
            v.cuisines.some(c => venue.cuisines.includes(c))
          )
          .map(v => {
            const distance = calculateDistance(venue.lat, venue.lng, v.lat, v.lng);
            return { ...v, distance };
          })
          .filter(v => v.distance <= 5) // Within 5km
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5); // Top 5 nearby
      } catch (error) {
        console.warn('Error finding nearby venues:', error);
      }
    }
    
    return {
      props: {
        venue,
        nearbyVenues
      }
    };
  } catch (error) {
    console.error('getServerSideProps error:', error);
    return { notFound: true };
  }
}

export default function VenueDetailPage({ venue, nearbyVenues = [] }) {
  const router = useRouter();
  
  // Safety check - if venue is missing critical data, show 404
  if (!venue || !venue.slug || !venue.name) {
    return null; // Will trigger Next.js 404
  }
  
  // Get hero image for venue detail page using new resolver
            const heroImageSrc = (() => {
              try {
                const resolved = resolveVenueHero({ venue });
                return resolved;
              } catch (error) {
                console.warn(`Failed to resolve hero image for venue ${venue.slug}:`, error);
                // Fallback chain
                if (venue.image_hero_path && !venue.image_hero_path.includes('placeholder')) {
                  return venue.image_hero_path.replace('/public', '') + (venue.image_hero_path.includes('?') ? '&' : '?') + 'v=' + (process.env.NEXT_PUBLIC_ASSET_VERSION || '1');
                }
                if (venue.image_card_path && !venue.image_card_path.includes('placeholder')) {
                  return venue.image_card_path.replace('/public', '') + (venue.image_card_path.includes('?') ? '&' : '?') + 'v=' + (process.env.NEXT_PUBLIC_ASSET_VERSION || '1');
                }
                return '/images/heroes/site/default-list-hero.webp?v=' + (process.env.NEXT_PUBLIC_ASSET_VERSION || '1');
              }
            })();
  
  const hero = {
    src: heroImageSrc,
    alt: `Hero image for ${venue.name}`,
    srcMd: heroImageSrc,
    srcLg: heroImageSrc
  };
  
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": venue.name,
    "image": venue.image_hero_path?.replace('/public', '') ? `https://www.thebestinlondon.co.uk${venue.image_hero_path.replace('/public', '')}` : `https://www.thebestinlondon.co.uk/images/heroes/site/default-list-hero.webp`,
    "description": (venue?.about?.text && venue.about.text.length > 60) ? venue.about.text : undefined,
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
    <ErrorBoundary>
      <Head>
        <title>{generateSEOTitle('restaurant', venue)}</title>
        <meta name="description" content={venue?.about?.text?.slice(0,155) || generateSEODescription('restaurant', venue)} />
        <link rel="canonical" href={`https://thebestinlondon.co.uk/restaurant/${venue.slug}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={generateSEOTitle('restaurant', venue)} />
        <meta property="og:description" content={generateSEODescription('restaurant', venue)} />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content={`https://thebestinlondon.co.uk/restaurant/${venue.slug}`} />
        <meta property="og:image" content={venue.image_hero_path?.replace('/public', '') ? `https://www.thebestinlondon.co.uk${venue.image_hero_path.replace('/public', '')}` : 'https://www.thebestinlondon.co.uk/images/heroes/site/default-list-hero.webp'} />
        <meta property="og:image:alt" content={venue.image_alt || `${venue.name} restaurant in ${venue.borough || 'London'}`} />
        <meta property="og:site_name" content="The Best in London" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateSEOTitle('restaurant', venue)} />
        <meta name="twitter:description" content={generateSEODescription('restaurant', venue)} />
        <meta name="twitter:image" content={venue.image_hero_path?.replace('/public', '') ? `https://www.thebestinlondon.co.uk${venue.image_hero_path.replace('/public', '')}` : 'https://www.thebestinlondon.co.uk/images/heroes/site/default-list-hero.webp'} />
        <meta name="twitter:image:alt" content={venue.image_alt || `${venue.name} restaurant in ${venue.borough || 'London'}`} />
        
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

      <div className="min-h-screen bg-black">
        <Header />

        <TabContainer currentPath={`/restaurant/${venue.slug}`} pageType="restaurant" venue={venue}>
        
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Restaurants', href: '/restaurants' },
            venue.cuisines?.[0] ? { 
              label: `${venue.cuisines[0]} Restaurants`, 
              href: `/${venue.cuisines[0].toLowerCase().replace(/\s+/g, '-')}-restaurants-london` 
            } : null,
            { label: venue.name, href: `/restaurant/${venue.slug}`, isLast: true }
          ].filter(Boolean)} />
        </div>
        
        {/* Page Hero */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative">
            <PageHero 
              title={venue.name}
              subtitle={`${venue.cuisines?.[0] || 'Restaurant'} ${venue.price_level ? '• ' + '£'.repeat(venue.price_level) : ''} ${venue.dietary_tags?.halal ? '• Halal' : ''}`}
              stats={[
                venue.rating && typeof venue.rating === 'number' ? { label: "Rating", value: venue.rating.toFixed(1) } : null,
                venue.user_ratings_total && typeof venue.user_ratings_total === 'number' ? { label: "Reviews", value: venue.user_ratings_total.toLocaleString() } : null,
                isValidFsaScore(venue.fsa_rating) ? { label: "FSA Rating", value: getFsaDisplayValue(venue.fsa_rating) } : null
              ].filter(Boolean)}
              image={hero}
              priority
              center={false}
            />
            
            {/* FSA Badge Overlay on Hero */}
            {isValidFsaScore(venue.fsa_rating) && (
              <div className="absolute top-4 right-4 z-20">
                <FSABadge 
                  rating={venue.fsa_rating} 
                  variant="hero" 
                  size="default"
                  showTooltip={true}
                />
              </div>
            )}
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 px-4 border-b border-gray-800">
            <a href="#overview" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-yellow-600 transition-colors">
              Overview
            </a>
            <a href="#menu" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-yellow-600 transition-colors">
              Menu
            </a>
            <a href="#reviews" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-yellow-600 transition-colors">
              Reviews
            </a>
            <a href="#location" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-yellow-600 transition-colors">
              Location
            </a>
            <a href="#similar" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-yellow-600 transition-colors">
              Similar
            </a>
          </div>

          {/* Social Share & Booking Row */}
          <div className="flex flex-wrap gap-4 mt-6 px-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <BookingButton venue={venue} />
              {venue.google_place_url && (
                <a
                  href={venue.google_place_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  View Google Reviews
                </a>
              )}
              {venue.fsa_report_url && (
                <a
                  href={venue.fsa_report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  View FSA Report
                </a>
              )}
            </div>
            {typeof window !== 'undefined' && (
              <ErrorBoundary>
                <SocialShareButtons 
                  url={`https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`}
                  title={`${venue.name || 'Restaurant'} - ${venue.cuisines?.[0] || 'Restaurant'} in ${venue.borough || 'London'}`}
                  description={venue?.about?.text?.slice(0, 155) || `Check out ${venue.name || 'this restaurant'}, rated ${venue.rating || 'N/A'} stars with ${venue.user_ratings_total || 0} reviews.`}
                  image={venue.image_hero_path?.replace('/public', '') ? `https://www.thebestinlondon.co.uk${venue.image_hero_path.replace('/public', '')}` : undefined}
                />
              </ErrorBoundary>
            )}
          </div>
        </div>
        
        <main>

        {/* Main Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 3vw, 20px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(24px, 5vw, 48px)' }}>
            
            {/* Left Column */}
            <div id="overview">
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
                  
                  {/* Enhanced Photo Gallery */}
                  {venue.gallery_images && venue.gallery_images.length > 0 && typeof window !== 'undefined' && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">More Photos</h3>
                      <ErrorBoundary>
                        <EnhancedImageGallery 
                          images={venue.gallery_images} 
                          venueName={venue.name || 'Restaurant'}
                          className="mt-4"
                        />
                      </ErrorBoundary>
                    </div>
                  )}
                </div>
              </div>

              {/* About Section */}
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
                  {generateAboutText(venue)}
                </p>
              </div>

              {/* Reviews Section */}
              <div id="reviews" style={{ background: '#1A1A1A', padding: '32px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #2A2A2A' }}>
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
              <div id="location" style={{ background: '#1A1A1A', padding: '32px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #2A2A2A' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>Location & Contact</h2>
                
                {/* Interactive Map */}
                {venue.lat && venue.lng && typeof window !== 'undefined' && (
                  <div style={{ marginBottom: '32px' }}>
                    <ErrorBoundary>
                      <InteractiveMap venue={venue} nearbyVenues={nearbyVenues || []} height="400px" />
                    </ErrorBoundary>
                  </div>
                )}
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  {venue.address && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#9AA0A6', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Address</div>
                      <div style={{ fontSize: '16px' }}>{venue.address.formatted || venue.address}</div>
                      {venue.lat && venue.lng && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            marginTop: '8px',
                            padding: '8px 16px',
                            background: '#D4AF37',
                            color: '#000',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: 600
                          }}
                        >
                          Get Directions →
                        </a>
                      )}
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
                
                {nearbyVenues.length > 0 && (
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #2A2A2A' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', fontFamily: 'Playfair Display, serif' }}>Nearby Similar Restaurants</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {nearbyVenues.slice(0, 5).map((nearby) => (
                        <a
                          key={nearby.slug}
                          href={`/restaurant/${nearby.slug}`}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            background: '#0B0B0B',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            transition: 'background 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = '#1A1A1A'}
                          onMouseOut={(e) => e.currentTarget.style.background = '#0B0B0B'}
                        >
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{nearby.name}</div>
                            <div style={{ fontSize: '13px', color: '#9AA0A6' }}>
                              {nearby.distance ? `${nearby.distance.toFixed(1)} km away` : ''} • {nearby.cuisines?.[0] || 'Restaurant'}
                            </div>
                          </div>
                          {nearby.rating && (
                            <div style={{ fontSize: '14px', color: '#D4AF37', fontWeight: 600 }}>
                              ★ {nearby.rating.toFixed(1)}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
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

              {/* Price Per Head Section - ALWAYS SHOW */}
              <div style={{ background: '#1A1A1A', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #2A2A2A' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', fontFamily: 'Playfair Display, serif' }}>Price Per Person</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#D4AF37' }}>
                    {(() => {
                      // Use actual price_level if available, otherwise estimate based on cuisine/rating
                      const priceLevel = venue.price_level || (() => {
                        // Estimate based on rating and cuisine type
                        const highEndCuisines = ['french', 'japanese', 'fine dining', 'modern european'];
                        const cuisine = venue.cuisines?.[0]?.toLowerCase() || '';
                        const isHighEnd = highEndCuisines.some(c => cuisine.includes(c));
                        const hasHighRating = venue.rating >= 4.5;
                        
                        if (isHighEnd || hasHighRating) return 3; // Upscale
                        if (venue.rating >= 4.0) return 2; // Moderate
                        return 2; // Default to moderate
                      })();
                      
                      const levels = {
                        1: '£10 - £25',
                        2: '£25 - £50',
                        3: '£50 - £100',
                        4: '£100 - £200'
                      };
                      return levels[priceLevel] || levels[2];
                    })()}
                  </span>
                  <span style={{ color: '#9AA0A6', fontSize: '14px' }}>
                    {(() => {
                      const priceLevel = venue.price_level || 2;
                      return priceLevel === 1 ? 'Budget-friendly' :
                             priceLevel === 2 ? 'Moderate' :
                             priceLevel === 3 ? 'Upscale' :
                             priceLevel === 4 ? 'Fine Dining' : 'Moderate';
                    })()}
                  </span>
                </div>
                <p style={{ color: '#9AA0A6', fontSize: '14px', marginTop: '8px', fontStyle: 'italic' }}>
                  {venue.price_level ? 
                    'Estimated price per person for a typical meal including starter, main, and drink' :
                    'Estimated price range based on restaurant type and location. Actual prices may vary.'}
                </p>
              </div>

              {/* Menu Section */}
              <div id="menu" style={{ background: '#1A1A1A', padding: '32px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #2A2A2A' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>Menu</h2>
                {venue.menu_url ? (
                  <div>
                    <p style={{ color: '#9AA0A6', marginBottom: '16px' }}>View the full menu online:</p>
                    <a 
                      href={venue.menu_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'inline-block', 
                        padding: '12px 24px', 
                        background: '#D4AF37', 
                        color: '#000', 
                        textDecoration: 'none', 
                        borderRadius: '8px', 
                        fontWeight: 600 
                      }}
                    >
                      View Menu →
                    </a>
                  </div>
                ) : venue.website ? (
                  <div>
                    <p style={{ color: '#9AA0A6', marginBottom: '16px' }}>
                      Menu information may be available on the restaurant's website. Visit their site to view current menus and pricing.
                    </p>
                    <a 
                      href={venue.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'inline-block', 
                        padding: '12px 24px', 
                        background: '#D4AF37', 
                        color: '#000', 
                        textDecoration: 'none', 
                        borderRadius: '8px', 
                        fontWeight: 600 
                      }}
                    >
                      Visit Restaurant Website →
                    </a>
                    <p style={{ color: '#9AA0A6', fontSize: '14px', marginTop: '12px', fontStyle: 'italic' }}>
                      Tip: Many restaurants have menus available on their official website. For the most up-to-date menu and prices, please contact the restaurant directly.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{ color: '#9AA0A6', marginBottom: '16px' }}>Menu information not currently available online.</p>
                    {venue.phone && (
                      <p style={{ color: '#9AA0A6', fontSize: '14px' }}>
                        For menu information, please contact: <a href={`tel:${venue.phone}`} style={{ color: '#D4AF37' }}>{venue.phone}</a>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Similar Restaurants Section */}
              <div id="similar" style={{ background: '#1A1A1A', padding: '32px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #2A2A2A' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>Similar Restaurants</h2>
                <p style={{ color: '#9AA0A6', fontStyle: 'italic' }}>Discover more great restaurants in the area.</p>
                <div style={{ marginTop: '16px' }}>
                  <a 
                    href={`/cuisines/${venue.cuisines?.[0]?.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    style={{ 
                      display: 'inline-block', 
                      padding: '12px 24px', 
                      background: 'rgba(212, 175, 55, 0.1)', 
                      color: '#D4AF37', 
                      textDecoration: 'none', 
                      borderRadius: '8px', 
                      fontWeight: 600,
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    More {venue.cuisines?.[0]} Restaurants →
                  </a>
                </div>
              </div>

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
        </div>
        </main>
        </TabContainer>
        <Footer />
        <BackToHome />
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .sidebar-sticky {
            position: sticky !important;
            top: 100px;
          }
        }
      `}</style>
    </ErrorBoundary>
  );
}
