import Head from 'next/head';
import { generateSEOTitle, generateSEODescription, generateStructuredData } from '../utils/seoOptimization';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';
import PageHero from '../components/PageHero';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import PopularAreas from '../components/home/PopularAreas';
import Cuisines from '../components/home/Cuisines';
import LatestAdds from '../components/home/LatestAdds';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import Link from 'next/link';
import { useEffect } from 'react';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get top venues for featured section - data-driven selection by BIL score then reviews
    const topVenues = venues
      .filter(v => v.rating && v.rating >= 4.0) // Basic quality filter
      .sort((a, b) => {
        // Primary: BIL score (if available)
        const aBilScore = a.bil_score || 0;
        const bBilScore = b.bil_score || 0;
        if (aBilScore !== bBilScore) return bBilScore - aBilScore;
        
        // Secondary: Reviews count
        const aReviews = a.reviews_count || a.user_ratings_total || 0;
        const bReviews = b.reviews_count || b.user_ratings_total || 0;
        if (aReviews !== bReviews) return bReviews - aReviews;
        
        // Tertiary: Rating
        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 8); // Top 8 as specified
    
    // Calculate stats
    const stats = {
      totalVenues: venues.length,
      areas: new Set(venues.map(v => v.borough).filter(Boolean)).size,
      cuisines: new Set(venues.flatMap(v => v.cuisines || []).filter(Boolean)).size,
      halalVenues: venues.filter(v => v.dietary_tags?.halal).length
    };
    
    // Get popular cuisines
    const cuisineCounts = {};
    venues.forEach(v => {
      if (v.cuisines && v.cuisines.length > 0) {
        v.cuisines.forEach(cuisine => {
          const lower = cuisine.toLowerCase();
          cuisineCounts[lower] = (cuisineCounts[lower] || 0) + 1;
        });
      }
    });
    
    const popularCuisines = Object.entries(cuisineCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([cuisine, count]) => ({ cuisine, count }));
    
    return {
      props: {
        topVenues,
        stats,
        popularCuisines
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        topVenues: [],
        stats: { totalVenues: 0, areas: 0, cuisines: 0, halalVenues: 0 },
        popularCuisines: []
      }
    };
  }
}

export default function Home({ topVenues, stats, popularCuisines }) {
  // Get hero image for homepage
  const hero = resolveHeroImage({ type: "home" });
  
  useEffect(() => {
    // Optimize font loading
    if (typeof window !== 'undefined') {
      // Preload critical fonts
      const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      ];
      
      criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        link.onload = () => {
          link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      });
      
      // Preload critical images
      const criticalImages = [
        hero.src,
        ...topVenues.slice(0, 3).map(venue => 
          venue.image_card_path?.replace('/public', '') || venue.image_url || venue.photos?.[0]?.url || ''
        ).filter(src => src && !src.includes('PLACEHOLDER'))
      ].map(src => ({ src, type: 'image/webp' })).filter(img => img.src);
      
      criticalImages.forEach(image => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = image.src;
        if (image.type) link.type = image.type;
        document.head.appendChild(link);
      });
    }
  }, [topVenues, hero.src]);

  return (
    <>
      <Head>
        <title>The Best in London | Premium Dining Guide</title>
        <meta name="description" content="Discover London's finest restaurants with our premium dining guide. 760+ verified restaurants across 50+ areas. From street food to fine dining." />
        <meta name="keywords" content="London restaurants, best restaurants London, dining guide, halal restaurants, fine dining London" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk" />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Best in London | Premium Dining Guide" />
        <meta property="og:description" content="Discover London's finest restaurants with our premium dining guide. 760+ verified restaurants across 50+ areas." />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/images/heroes/site/home-hero.webp" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Best in London | Premium Dining Guide" />
        <meta name="twitter:description" content="Discover London's finest restaurants with our premium dining guide. 760+ verified restaurants across 50+ areas." />
        <meta name="twitter:image" content="https://www.thebestinlondon.co.uk/images/heroes/site/home-hero.webp" />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "The Best in London",
              "description": "London's premier dining guide featuring 760+ verified restaurants",
              "url": "https://www.thebestinlondon.co.uk",
          "potentialAction": {
            "@type": "SearchAction",
                "target": "https://www.thebestinlondon.co.uk/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-black">
        <Header />
        <TabContainer currentPath="/" pageType="home">
          {/* Page Hero */}
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <PageHero 
              title="Discover London's Finest"
              subtitle="Curated Excellence in London"
              stats={[
                { label: "Restaurants", value: "760+" },
                { label: "Areas", value: "50+" },
                { label: "Cuisines", value: "25+" },
                { label: "Verified", value: "100%" }
              ]}
              image={hero}
              priority
              center
            />
          </div>
        
          {/* Main Content */}
          <main className="container mx-auto px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16">
            <FeaturedRestaurants venues={topVenues} />
            <PopularAreas venues={topVenues} stats={stats} />
            <Cuisines popularCuisines={popularCuisines} />
            <LatestAdds venues={topVenues} />
          </main>
        </TabContainer>
        <Footer />
      </div>
    </>
  );
}