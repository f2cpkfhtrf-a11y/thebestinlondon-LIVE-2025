import Head from 'next/head';
import { generateSEOTitle, generateSEODescription, generateStructuredData } from '../utils/seoOptimization';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';
import PageHero from '../components/PageHero';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import FeaturedNearYou from '../components/home/FeaturedNearYou';
import PopularAreas from '../components/home/PopularAreas';
import Cuisines from '../components/home/Cuisines';
import LatestAdds from '../components/home/LatestAdds';
import ExploreByDiet from '../components/home/ExploreByDiet';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import { getLiveStats } from '../lib/siteStats';
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
    
    // Get top venues for featured section - prioritize venues with real photos
    const topVenues = venues
      .filter(v => v.rating && v.rating >= 4.0) // Lower threshold to get more options
      .sort((a, b) => {
        // Prioritize venues with real photos
        const aHasRealPhoto = a.photos?.[0]?.url && !a.photos[0].url.includes('photoreference=placeholder');
        const bHasRealPhoto = b.photos?.[0]?.url && !b.photos[0].url.includes('photoreference=placeholder');
        
        if (aHasRealPhoto && !bHasRealPhoto) return -1;
        if (!aHasRealPhoto && bHasRealPhoto) return 1;
        
        // If both have same photo status, sort by rating
        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 6);
    
    // Get live stats from centralized function
    const liveStats = getLiveStats();
    const stats = {
      totalVenues: liveStats.total,
      areas: liveStats.areas,
      cuisines: liveStats.cuisines,
      halalVenues: liveStats.halal
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
        allVenues: venues, // Add all venues for FeaturedNearYou
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
        allVenues: [],
        stats: { totalVenues: 0, areas: 0, cuisines: 0, halalVenues: 0 },
        popularCuisines: []
      }
    };
  }
}

export default function Home({ topVenues, allVenues, stats, popularCuisines }) {
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
        <meta name="description" content={`Discover London's finest restaurants with our premium dining guide. ${stats.totalVenues}+ verified restaurants across ${stats.areas}+ areas. From street food to fine dining.`} />
        <meta name="keywords" content="London restaurants, best restaurants London, dining guide, halal restaurants, fine dining London" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk" />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Best in London | Premium Dining Guide" />
        <meta property="og:description" content={`Discover London's finest restaurants with our premium dining guide. ${stats.totalVenues}+ verified restaurants across ${stats.areas}+ areas.`} />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/images/heroes/site/home-hero.webp" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Best in London | Premium Dining Guide" />
        <meta name="twitter:description" content={`Discover London's finest restaurants with our premium dining guide. ${stats.totalVenues}+ verified restaurants across ${stats.areas}+ areas.`} />
        <meta name="twitter:image" content="https://www.thebestinlondon.co.uk/images/heroes/site/home-hero.webp" />
        
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "The Best in London",
              "description": `London's premier dining guide featuring ${stats.totalVenues}+ verified restaurants`,
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
                { label: "Restaurants", value: `${stats.totalVenues}+`, testId: "stats-restaurants" },
                { label: "Areas", value: `${stats.areas}+`, testId: "stats-areas" },
                { label: "Cuisines", value: `${stats.cuisines}+`, testId: "stats-cuisines" },
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
            <FeaturedNearYou venues={allVenues} />
            <PopularAreas venues={topVenues} stats={stats} />
            <Cuisines popularCuisines={popularCuisines} />
            <ExploreByDiet venues={allVenues} />
            <LatestAdds venues={allVenues} />
          </main>
        </TabContainer>
        <Footer stats={stats} />
      </div>
    </>
  );
}