import { Html, Head, Main, NextScript } from 'next/document';

// Suppress the fetchPriority React 18 warning from Next.js Image internals (fires during SSR)
const _origError = console.error;
const _origWarn = console.warn;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('fetchPriority')) return;
  _origError.apply(console, args);
};
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('fetchPriority')) return;
  _origWarn.apply(console, args);
};

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        {/* Critical CSS - Inline for instant render, prevents FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `*{box-sizing:border-box;margin:0;padding:0}html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;scroll-behavior:smooth}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background-color:#0E0E0E;color:#F9F9F9;line-height:1.6;font-size:16px}header{position:sticky;top:0;z-index:50;background-color:rgba(14,14,14,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,175,55,0.2)}.logo-text{font-family:Georgia,serif;font-weight:700;color:#D4AF37;font-size:1.5rem}nav a{color:#F9F9F9;text-decoration:none;transition:color 0.3s}nav a:hover{color:#D4AF37}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.sr-only:focus{position:fixed;width:auto;height:auto;padding:1rem;margin:0;overflow:visible;clip:auto;white-space:normal;z-index:9999;background-color:#D4AF37;color:#0B0B0B;font-weight:600;border-radius:0.5rem}`
        }} />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="JXlXLBYM0IKbIxKjsGtl2p5YG3vguJ2Nuxie2muNDIY" />
        
        {/* Google Analytics 4 - Optimized with defer and minimal impact */}
        <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-9XD4NQSM99"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9XD4NQSM99', {
                page_path: window.location.pathname,
                send_page_view: false,
                anonymize_ip: true
              });
              
              // Delay tracking until after page interactive
              if (document.readyState === 'complete') {
                gtag('event', 'page_view');
              } else {
                window.addEventListener('load', function() {
                  gtag('event', 'page_view');
                });
              }
            `,
          }}
        />
        
        {/* DNS Prefetch & Preconnect for Performance - Optimized priority */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.postcodes.io" />
        
        {/* Optimized Font Loading - Critical fonts only, swap display for instant text */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap&text=TheBestinLondonRestaurantsHalalNearMeCuisinesAreasBlogFAQAboutContact0123456789"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link 
            rel="stylesheet" 
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" 
          />
        </noscript>
        
        {/* Favicon & Web App Manifest */}
        <link rel="icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#0B0B0B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Best in London" />
        
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
