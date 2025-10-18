import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="JXlXLBYM0IKbIxKjsGtl2p5YG3vguJ2Nuxie2muNDIY" />
        
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9XD4NQSM99"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9XD4NQSM99', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Optimized Font Loading */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link 
            rel="stylesheet" 
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" 
          />
        </noscript>
        
        {/* Favicon & Web App Manifest */}
        <link rel="icon" href="/logo.svg" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#0B0B0B" />
        
        {/* Open Graph Protocol - Site-wide Defaults */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Best in London" />
        
        {/* Robots & Crawling Directives */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
