import Head from 'next/head';
import { generateSEOTitle, generateSEODescription, generateStructuredData } from '../utils/seoOptimization';
import { withSEOPage, asWebSite, asOrganization } from '../lib/factory/pageFactory';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TabContainer } from '../components/HeroTabs';
import PageHero from '../components/PageHero';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import PopularAreas from '../components/home/PopularAreas';
import Cuisines from '../components/home/Cuisines';
import LatestAdds from '../components/home/LatestAdds';
import LatestBlog from '../components/home/LatestBlog';
import NewsletterSignup from '../components/NewsletterSignup';
import { resolveHeroImage } from '../lib/resolveHeroImage';
import Link from 'next/link';
import { useEffect } from 'react';

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data/venues.json');
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
    
    // Load blog data
    let blogs = [];
    try {
      const contentDir = path.join(process.cwd(), 'content');
      const blogDir = path.join(contentDir, 'blog');
      
      if (fs.existsSync(blogDir)) {
        const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
        blogs = blogFiles.map(file => {
          const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
          return JSON.parse(content);
        }).sort((a, b) => new Date(b.publishedAtISO) - new Date(a.publishedAtISO));
      }
    } catch (error) {
      console.log('No blog content found:', error.message);
    }
    
    return {
      props: {
        topVenues,
        stats,
        popularCuisines,
        blogs
      }
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        topVenues: [],
        stats: { totalVenues: 0, areas: 0, cuisines: 0, halalVenues: 0 },
        popularCuisines: [],
        blogs: []
      }
    };
  }
}

export default function Home({ topVenues, stats, popularCuisines, blogs }) {
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
        <title>Best Restaurants London {new Date().getFullYear()} | Top Rated London Restaurants | The Best in London</title>
        <meta name="description" content={`Discover the best restaurants in London ${new Date().getFullYear()}. Find top-rated London restaurants, halal restaurants, vegan restaurants, and fine dining. 760+ verified restaurants with real reviews. Your complete London dining guide.`} />
        <meta name="keywords" content="best restaurants London, London restaurants, best restaurants in London, top restaurants London, halal restaurants London, vegan restaurants London, fine dining London, Indian restaurants London, Italian restaurants London, Japanese restaurants London, restaurant guide London, where to eat London, best food London" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="The Best in London" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.thebestinlondon.co.uk" />
        <link rel="alternate" hrefLang="en" href="https://www.thebestinlondon.co.uk" />
        <link rel="alternate" hrefLang="x-default" href="https://www.thebestinlondon.co.uk" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Best Restaurants London ${new Date().getFullYear()} | Top Rated London Restaurants`} />
        <meta property="og:description" content={`Discover the best restaurants in London ${new Date().getFullYear()}. 760+ verified restaurants with real reviews. Find halal restaurants, vegan restaurants, fine dining and more.`} />
        <meta property="og:image" content="https://www.thebestinlondon.co.uk/images/heroes/site/home-hero.webp" />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Best Restaurants London ${new Date().getFullYear()} | Top Rated London Restaurants`} />
        <meta name="twitter:description" content={`Discover the best restaurants in London ${new Date().getFullYear()}. 760+ verified restaurants with real reviews. Find halal restaurants, vegan restaurants, fine dining and more.`} />
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
              title="Best Restaurants in London {new Date().getFullYear()}"
              subtitle="Discover Top-Rated London Restaurants with Real Reviews | Halal, Vegan & Fine Dining"
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
            {/* SEO Content Block - Keyword Rich Introduction */}
            <section className="max-w-4xl mx-auto text-center py-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-warmWhite mb-6">
                Find the Best Restaurants in London {new Date().getFullYear()}
              </h2>
              <p className="text-lg md:text-xl text-grey leading-relaxed mb-4">
                Discover over <strong className="text-gold">760+ verified restaurants</strong> across London. Whether you're looking for 
                <strong className="text-gold"> halal restaurants London</strong>, 
                <strong className="text-gold"> vegan restaurants London</strong>, or 
                <strong className="text-gold"> fine dining London</strong>, we've curated the top-rated establishments with real reviews and ratings. 
                Find <strong className="text-gold">restaurants near me</strong>, browse by cuisine or area, and discover <strong className="text-gold">where to eat in London</strong>.
              </p>
              <p className="text-base md:text-lg text-grey mb-6">
                From <strong className="text-gold">Indian restaurants London</strong> to 
                <strong className="text-gold"> Italian restaurants London</strong>, 
                <strong className="text-gold"> Japanese restaurants London</strong>, 
                <strong className="text-gold"> Turkish restaurants London</strong>, and more - explore London's diverse culinary scene. 
                Our comprehensive <strong className="text-gold">London restaurant guide</strong> helps you find 
                <strong className="text-gold"> the best restaurants in London</strong> for every occasion, budget, and dietary requirement.
              </p>
            </section>
            
            <FeaturedRestaurants venues={topVenues} />
            <PopularAreas venues={topVenues} stats={stats} />
            <Cuisines popularCuisines={popularCuisines} />
            <LatestAdds venues={topVenues} />
            <LatestBlog blogs={blogs || []} />
            
            {/* SEO Content Block - Additional Keywords */}
            <section className="max-w-4xl mx-auto py-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-warmWhite mb-4">
                Why Choose The Best in London Restaurant Guide?
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-grey">
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Verified Restaurant Reviews</h3>
                  <p>All <strong>London restaurants</strong> featured on our site have verified Google reviews and ratings, ensuring you get accurate information about dining experiences.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Comprehensive Coverage</h3>
                  <p>Browse <strong>restaurants near me</strong> or explore by cuisine type, area, or dietary requirements. Find everything from budget-friendly to Michelin-starred dining.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Specialized Guides</h3>
                  <p>Looking for <strong>halal restaurants London</strong> or <strong>vegan restaurants London</strong>? We have dedicated guides for every dietary need and preference.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gold mb-2">Up-to-Date Information</h3>
                  <p>Our <strong>best restaurants London</strong> guide is regularly updated with new openings, menu changes, and the latest reviews to help you find <strong>where to eat in London</strong>.</p>
                </div>
              </div>
            </section>
            
            {/* Newsletter Signup */}
            <NewsletterSignup 
              location="homepage"
              title="Get Weekly Restaurant Recommendations"
              description="Discover London's newest openings, hidden gems, and weekly dining guides delivered to your inbox."
              variant="inline"
            />
          </main>
        </TabContainer>
        <Footer />
      </div>
    </>
  );
}