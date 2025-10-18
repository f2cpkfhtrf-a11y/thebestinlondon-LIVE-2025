import Head from 'next/head';

const SEOHead = ({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  venue = null,
  structuredData = null
}) => {
  // Ensure title is under 60 characters
  const optimizedTitle = title && title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Ensure description is under 155 characters
  const optimizedDescription = description && description.length > 155 ? description.substring(0, 152) + '...' : description;
  
  // Default values
  const defaultTitle = 'The Best in London - Discover London\'s Finest Restaurants';
  const defaultDescription = 'Find the best restaurants, cafes, and dining experiences in London. From Michelin-starred fine dining to hidden gems, discover London\'s culinary scene.';
  const defaultImage = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=630&fit=crop&crop=center&q=85';
  const defaultUrl = 'https://www.thebestinlondon.co.uk';
  
  const finalTitle = optimizedTitle || defaultTitle;
  const finalDescription = optimizedDescription || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  
  // Generate keywords
  const defaultKeywords = [
    'London restaurants',
    'best restaurants London',
    'fine dining London',
    'restaurant guide London',
    'London food',
    'restaurant reviews London',
    'London dining',
    'restaurant recommendations London'
  ];
  
  const finalKeywords = [...defaultKeywords, ...keywords].join(', ');
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="The Best in London" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="The Best in London" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#D4AF37" />
      <meta name="msapplication-TileColor" content="#D4AF37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://maps.googleapis.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEOHead;
