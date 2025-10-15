import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { theme } from '../utils/theme';
import SearchModal from '../components/SearchModal';
import FSABadge from '../components/FSABadge';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    // Handle both flat array and wrapped object
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get ALL venues (sorted by rating)
    const allVenues = venues
      .filter(v => v.rating && v.rating >= 4.0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    // Get top 6 for featured section
    const topVenues = allVenues.slice(0, 6);
    
    // Calculate cuisine counts
    const cuisineCounts = {};
    venues.forEach(v => {
      if (v.cuisines && v.cuisines.length > 0) {
        v.cuisines.forEach(cuisine => {
          const lower = cuisine.toLowerCase();
          cuisineCounts[lower] = (cuisineCounts[lower] || 0) + 1;
        });
      }
    });
    
    // Generate top 12 cuisines dynamically from actual data
    const cuisineImages = {
      'modern european': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85',
      'bar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=85',
      'cafe': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=85',
      'italian': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=85',
      'french': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=85',
      'british': 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=600&q=85',
      'japanese': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=85',
      'indian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85',
      'turkish': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=85',
      'chinese': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&q=85',
      'spanish': 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&q=85',
      'mexican': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=85',
      'korean': 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=85',
      'thai': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=85',
      'steakhouse': 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=85',
    };
    
    const cuisines = Object.entries(cuisineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([cuisine, count]) => ({
        name: cuisine.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        count,
        href: `/${cuisine.replace(/\s+/g, '-')}`,
        image: cuisineImages[cuisine] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=85'
      }));
    
    // Calculate stats
    const totalVenues = venues.length;
    const avgRating = (venues.reduce((sum, v) => sum + (v.rating || 0), 0) / venues.length).toFixed(1);
    const fsaVerified = venues.filter(v => v.fsa_rating).length;
    const fsaPercentage = Math.round((fsaVerified / totalVenues) * 100);
    
    return {
      props: {
        allVenues,
        topVenues,
        cuisines,
        stats: {
          totalVenues,
          avgRating,
          fsaPercentage,
          lastUpdated: (typeof data === 'object' && !Array.isArray(data) && data.lastUpdated) ? data.lastUpdated : new Date().toISOString()
        }
      },
      revalidate: 86400 // Revalidate daily
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        allVenues: [],
        topVenues: [],
        cuisines: [],
        stats: { totalVenues: 0, avgRating: 0, fsaPercentage: 0, lastUpdated: new Date().toISOString() }
      }
    };
  }
}

export default function Home({ allVenues, topVenues, cuisines, stats }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(router.query.tab || 'all');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push({ pathname: '/', query: { ...router.query, tab } }, undefined, { shallow: true });
  };

  // Filter venues based on active tab
  const filteredVenues = useMemo(() => {
    let filtered = [...allVenues];
    
    switch(activeTab) {
      case 'all':
        // Show top 50 for 'All' tab
        return filtered.slice(0, 50);
      case 'top-rated':
        return filtered.filter(v => v.rating >= 4.5);
      case 'budget':
        return filtered.filter(v => v.price_range === '£' || v.price_range === '££');
      case 'fsa-verified':
        return filtered.filter(v => v.fsa_rating && v.fsa_rating >= 4);
      case 'fine-dining':
        return filtered.filter(v => v.rating >= 4.7 && (v.price_range === '££££' || v.price_range === '£££'));
      case 'mid-range':
        return filtered.filter(v => v.price_range === '££');
      // Dietary filters
      case 'halal':
        return filtered.filter(v => v.dietary_tags && v.dietary_tags.includes('halal'));
      case 'vegan':
        return filtered.filter(v => v.dietary_tags && v.dietary_tags.includes('vegan'));
      case 'vegetarian':
        return filtered.filter(v => v.dietary_tags && v.dietary_tags.includes('vegetarian'));
      case 'gluten-free':
        return filtered.filter(v => v.dietary_tags && v.dietary_tags.includes('glutenFree'));
      default:
        return filtered.slice(0, 50);
    }
  }, [activeTab, allVenues]);

  // Primary tabs
  const primaryTabs = [
    { id: 'all', label: 'All', count: allVenues.length },
    { id: 'top-rated', label: 'Top Rated', count: allVenues.filter(v => v.rating >= 4.5).length, emoji: '⭐' },
    { id: 'budget', label: 'Budget Eats', count: allVenues.filter(v => v.price_range === '£' || v.price_range === '££').length, emoji: '£' },
    { id: 'fsa-verified', label: 'FSA Verified', count: allVenues.filter(v => v.fsa_rating && v.fsa_rating >= 4).length, emoji: '✓' },
    { id: 'fine-dining', label: 'Fine Dining', count: allVenues.filter(v => v.rating >= 4.7 && (v.price_range === '££££' || v.price_range === '£££')).length, emoji: '👔' },
  ];

  // Dietary tabs (Your USP!)
  const dietaryTabs = [
    { id: 'halal', label: 'Halal', count: allVenues.filter(v => v.dietary_tags && v.dietary_tags.includes('halal')).length, emoji: '☪️' },
    { id: 'vegan', label: 'Vegan', count: allVenues.filter(v => v.dietary_tags && v.dietary_tags.includes('vegan')).length, emoji: '🌱' },
    { id: 'vegetarian', label: 'Vegetarian', count: allVenues.filter(v => v.dietary_tags && v.dietary_tags.includes('vegetarian')).length, emoji: '🥗' },
    { id: 'gluten-free', label: 'Gluten-Free', count: allVenues.filter(v => v.dietary_tags && v.dietary_tags.includes('glutenFree')).length, emoji: '🌾' },
  ];

  return (
    <>
      <Head>
        <title>The Best in London — London's Finest Restaurants | Curated Dining Guide 2025</title>
        <meta name="description" content={`Discover ${stats.totalVenues}+ of London's best restaurants. Michelin-starred venues, hidden gems, and culinary excellence. Real reviews, ${stats.fsaPercentage}% FSA verified, updated daily.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://thebestinlondon.co.uk" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "The Best in London",
          "description": "Curated guide to London's finest restaurants",
          "url": "https://thebestinlondon.co.uk",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://thebestinlondon.co.uk/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }) }} />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
        
        {/* Navigation - Sticky with Blur */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(11,11,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.colors.border.subtle}` : 'none',
          padding: '20px 0',
          transition: `all ${theme.motion.base} ${theme.motion.ease}`,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  fontFamily: theme.typography.serif, 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: theme.colors.text.primary,
                  letterSpacing: '-0.02em'
                }}>
                  The Best in London
                </div>
              </Link>

              <div style={{ display: 'flex', gap: '40px', fontSize: '15px', fontWeight: 500, alignItems: 'center' }}>
                <a href="#explore" style={{ color: theme.colors.text.secondary, textDecoration: 'none', transition: `color ${theme.motion.fast}` }}>Explore</a>
                <a href="#cuisines" style={{ color: theme.colors.text.secondary, textDecoration: 'none', transition: `color ${theme.motion.fast}` }}>Cuisines</a>
                <a href="#areas" style={{ color: theme.colors.text.secondary, textDecoration: 'none', transition: `color ${theme.motion.fast}` }}>Areas</a>
                <button 
                  onClick={() => setSearchModalOpen(true)}
                  style={{
                  padding: '10px 20px',
                  background: theme.colors.text.primary,
                  color: theme.colors.text.inverse,
                  border: 'none',
                  borderRadius: theme.radius.sm,
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: `all ${theme.motion.fast}`,
                }}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Cinematic Full-Bleed */}
        <header style={{
          position: 'relative',
          height: '85vh',
          minHeight: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `linear-gradient(to bottom, rgba(11,11,11,0.3), rgba(11,11,11,0.7)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2880&q=90')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}>
          
          <div style={{ 
            position: 'relative', 
            zIndex: 2, 
            textAlign: 'center', 
            maxWidth: '900px', 
            padding: '0 20px',
            animation: 'fadeInUp 1s ease-out'
          }}>
            <h1 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: theme.spacing['2xl'],
              textShadow: '0 4px 24px rgba(0,0,0,0.8)'
            }}>
              London's Finest<br />Restaurants
            </h1>
            
            <p style={{
              fontSize: '20px',
              color: 'rgba(245,245,245,0.9)',
              lineHeight: 1.6,
              marginBottom: theme.spacing['4xl'],
              fontWeight: 400,
              maxWidth: '600px',
              margin: `0 auto ${theme.spacing['4xl']} auto`
            }}>
              {stats.totalVenues}+ curated venues • Michelin stars • Hidden gems • Real reviews
            </p>

            <div 
              onClick={() => setSearchModalOpen(true)}
              style={{ 
              maxWidth: '600px', 
              margin: '0 auto', 
              position: 'relative',
              boxShadow: theme.shadows.lg,
              cursor: 'pointer'
            }}>
              <input 
                type="text"
                placeholder="Search restaurants, cuisines, or areas..."
                readOnly
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: theme.radius.md,
                  background: 'rgba(255,255,255,0.95)',
                  color: theme.colors.text.inverse,
                  outline: 'none',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          {/* Gradient Overlay Bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: `linear-gradient(to bottom, transparent, ${theme.colors.bg.primary})`,
            pointerEvents: 'none'
          }} />
        </header>

        {/* Tabs - Two-Tier Premium Design */}
        <section style={{
          position: 'sticky',
          top: '84px',
          zIndex: 90,
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: '20px 0 0',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            {/* Primary Tabs Row */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.colors.text.secondary, marginBottom: '12px', fontWeight: 600 }}>Discover</div>
              <div style={{ display: 'flex', gap: theme.spacing.md, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {primaryTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    style={{
                      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                      border: `1px solid ${activeTab === tab.id ? theme.colors.accent.gold : theme.colors.border.subtle}`,
                      borderRadius: theme.radius.xl,
                      fontSize: '14px',
                      fontWeight: 500,
                      background: activeTab === tab.id ? 'rgba(212,175,55,0.1)' : 'transparent',
                      color: activeTab === tab.id ? theme.colors.accent.gold : theme.colors.text.secondary,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: `all ${theme.motion.fast} ${theme.motion.ease}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {tab.emoji && <span>{tab.emoji}</span>}
                    <span>{tab.label}</span>
                    <span style={{ opacity: 0.6, fontSize: '13px' }}>({tab.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Tabs Row - Highlighted USP */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 100%)',
              padding: '16px',
              borderRadius: theme.radius.lg,
              marginBottom: '16px',
              border: `1px solid ${theme.colors.accent.gold}30`
            }}>
              <div style={{ 
                fontSize: '11px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em', 
                color: theme.colors.accent.gold, 
                marginBottom: '12px', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>✨</span>
                <span>Dietary Preferences</span>
                <span style={{ 
                  background: theme.colors.accent.gold,
                  color: theme.colors.text.inverse,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700
                }}>OUR SPECIALTY</span>
              </div>
              <div style={{ display: 'flex', gap: theme.spacing.md, overflowX: 'auto', scrollbarWidth: 'none', flexWrap: 'wrap' }}>
                {dietaryTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    style={{
                      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                      border: `2px solid ${activeTab === tab.id ? theme.colors.accent.gold : 'rgba(212,175,55,0.3)'}`,
                      borderRadius: theme.radius.xl,
                      fontSize: '14px',
                      fontWeight: 600,
                      background: activeTab === tab.id ? theme.colors.accent.gold : 'rgba(255,255,255,0.03)',
                      color: activeTab === tab.id ? theme.colors.text.inverse : theme.colors.text.primary,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: `all ${theme.motion.fast} ${theme.motion.ease}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: activeTab === tab.id ? '0 4px 12px rgba(212,175,55,0.3)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{tab.emoji}</span>
                    <span>{tab.label}</span>
                    <span style={{ 
                      opacity: activeTab === tab.id ? 0.9 : 0.6, 
                      fontSize: '13px',
                      background: activeTab === tab.id ? 'rgba(0,0,0,0.2)' : 'rgba(212,175,55,0.2)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>({tab.count})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* KPIs Section - Editorial Grid */}
        <section style={{ padding: `${theme.spacing['4xl']} 0`, background: theme.colors.bg.elevated }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing['3xl'] }}>
              {[
                { value: `${stats.totalVenues}+`, label: 'Curated Venues', icon: '🍽️' },
                { value: `⭐ ${stats.avgRating}`, label: 'Average Rating', icon: '⭐' },
                { value: `${stats.fsaPercentage}%`, label: 'FSA Verified', icon: '✓' },
                { value: 'Daily', label: 'Updated', icon: '🔄' }
              ].map((stat, idx) => (
                <div key={idx} style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
                  <div style={{ 
                    fontSize: '52px', 
                    fontFamily: theme.typography.serif, 
                    fontWeight: 700, 
                    color: theme.colors.accent.gold,
                    marginBottom: theme.spacing.sm
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '14px', color: theme.colors.text.secondary, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants - Premium Cards */}
        <section id="explore" style={{ padding: `${theme.spacing['5xl']} 0` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            <div style={{ marginBottom: theme.spacing['3xl'] }}>
              <h2 style={{
                fontFamily: theme.typography.serif,
                fontSize: '48px',
                fontWeight: 700,
                color: theme.colors.text.primary,
                letterSpacing: '-0.03em',
                marginBottom: theme.spacing.md
              }}>
                {activeTab === 'all' ? 'Top Rated This Month' : 
                 activeTab === 'top-rated' ? 'Top Rated Restaurants' :
                 activeTab === 'budget' ? 'Budget-Friendly Restaurants' :
                 activeTab === 'fsa-verified' ? 'FSA Verified Restaurants' :
                 activeTab === 'fine-dining' ? 'Fine Dining Experiences' :
                 activeTab === 'halal' ? 'Halal Restaurants' :
                 activeTab === 'vegan' ? 'Vegan Restaurants' :
                 activeTab === 'vegetarian' ? 'Vegetarian Restaurants' :
                 activeTab === 'gluten-free' ? 'Gluten-Free Options' :
                 'Top Rated This Month'}
              </h2>
              <p style={{ fontSize: '18px', color: theme.colors.text.secondary }}>
                {filteredVenues.length} {activeTab === 'all' ? 'handpicked by our editorial team' : 'venues matching your preferences'}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: theme.spacing['2xl']
            }}>
              {filteredVenues.map((venue, idx) => (
                <Link key={venue.place_id} href={`/restaurant/${venue.slug}`} style={{ textDecoration: 'none' }}>
                  <article 
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: theme.colors.bg.elevated,
                      borderRadius: theme.radius.lg,
                      overflow: 'hidden',
                      border: `1px solid ${hoveredCard === idx ? theme.colors.border.prominent : theme.colors.border.subtle}`,
                      transition: `all ${theme.motion.base} ${theme.motion.ease}`,
                      transform: hoveredCard === idx ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow: hoveredCard === idx ? theme.shadows.lg : theme.shadows.sm,
                      cursor: 'pointer'
                    }}>
                    
                    <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: theme.colors.bg.elevated }}>
                      {venue.photos && venue.photos[0] ? (
                        <img 
                          src={venue.photos[0].url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85'}
                          alt={venue.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            transform: hoveredCard === idx ? 'scale(1.05)' : 'scale(1)',
                            transition: `transform ${theme.motion.slow} ${theme.motion.ease}`
                          }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.text.secondary }}>
                          No image
                        </div>
                      )}
                      
                      {venue.fsa_rating && (
                        <div style={{
                          position: 'absolute',
                          top: theme.spacing.md,
                          right: theme.spacing.md
                        }}>
                          <FSABadge rating={venue.fsa_rating} size="large" showLabel={false} variant="card" />
                        </div>
                      )}

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
                      
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: theme.colors.text.primary,
                        marginBottom: theme.spacing.sm,
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
                        <span>{venue.cuisines?.[0] ? venue.cuisines[0].charAt(0).toUpperCase() + venue.cuisines[0].slice(1) : 'Restaurant'}</span>
                        <span>{venue.price_range || '££'}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: `${theme.spacing.md} 0`,
                        borderTop: `1px solid ${theme.colors.border.subtle}`
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                          <span style={{ color: theme.colors.accent.gold, fontSize: '16px' }}>★</span>
                          <span style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.text.primary }}>{venue.rating}</span>
                        </div>
                        {venue.user_ratings_total && (
                          <span style={{ fontSize: '13px', color: theme.colors.text.secondary }}>
                            {venue.user_ratings_total.toLocaleString()} reviews
                          </span>
                        )}
                      </div>

                      <button style={{
                        width: '100%',
                        padding: theme.spacing.md,
                        background: theme.colors.text.primary,
                        color: theme.colors.text.inverse,
                        border: 'none',
                        borderRadius: theme.radius.sm,
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: theme.spacing.md,
                        transition: `all ${theme.motion.fast}`,
                      }}>
                        View Details
                      </button>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Cuisine - Gallery Style */}
        <section id="cuisines" style={{ background: theme.colors.bg.elevated, padding: `${theme.spacing['5xl']} 0` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            <h2 style={{
              fontFamily: theme.typography.serif,
              fontSize: '48px',
              fontWeight: 700,
              color: theme.colors.text.primary,
              letterSpacing: '-0.03em',
              marginBottom: theme.spacing['3xl']
            }}>
              Explore by Cuisine
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: theme.spacing.xl
            }}>
              {cuisines.map(cuisine => (
                <Link key={cuisine.name} href={cuisine.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative',
                    height: '280px',
                    borderRadius: theme.radius.lg,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: `all ${theme.motion.base} ${theme.motion.ease}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  }}>
                    <img 
                      src={cuisine.image}
                      alt={cuisine.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: `transform ${theme.motion.slow} ${theme.motion.ease}`
                      }}
                    />
                    
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(11,11,11,0.95), transparent)',
                      padding: theme.spacing.xl,
                    }}>
                      <div style={{ fontSize: '22px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '4px' }}>
                        {cuisine.name}
                      </div>
                      <div style={{ fontSize: '13px', color: theme.colors.text.secondary }}>
                        {cuisine.count} restaurants
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: theme.colors.bg.primary, padding: `${theme.spacing['5xl']} 0 ${theme.spacing['3xl']}`, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing['4xl'], marginBottom: theme.spacing['4xl'] }}>
              <div>
                <div style={{ fontFamily: theme.typography.serif, fontSize: '24px', fontWeight: 700, marginBottom: theme.spacing.lg }}>
                  The Best in London
                </div>
                <p style={{ fontSize: '14px', color: theme.colors.text.secondary, lineHeight: 1.6 }}>
                  Curated guide to London's finest restaurants with real reviews, FSA ratings & verified photos.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: theme.spacing.lg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cuisines</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, fontSize: '14px', color: theme.colors.text.secondary }}>
                  <Link href="/indian-restaurants-london" style={{ color: 'inherit', textDecoration: 'none' }}>Indian</Link>
                  <Link href="/italian-restaurants-london" style={{ color: 'inherit', textDecoration: 'none' }}>Italian</Link>
                  <Link href="/japanese-restaurants-london" style={{ color: 'inherit', textDecoration: 'none' }}>Japanese</Link>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: theme.spacing.lg, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, fontSize: '14px', color: theme.colors.text.secondary }}>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${theme.colors.border.subtle}`, paddingTop: theme.spacing['2xl'], textAlign: 'center', fontSize: '13px', color: theme.colors.text.secondary }}>
              <p style={{ margin: 0 }}>© 2025 The Best in London. All rights reserved. • Last Updated: {new Date(stats.lastUpdated).toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        </footer>

        {/* Search Modal */}
        <SearchModal 
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          venues={allVenues}
        />
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        *::-webkit-scrollbar { width: 8px; height: 8px; }
        *::-webkit-scrollbar-track { background: #111111; }
        *::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }
        *::-webkit-scrollbar-thumb:hover { background: #3A3A3A; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
