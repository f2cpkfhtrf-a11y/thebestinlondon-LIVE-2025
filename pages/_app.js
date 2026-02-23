import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { registerServiceWorker } from '../utils/serviceWorkerRegistration'

// Suppress the fetchPriority React warning caused by Next.js Image internals on React 18
// This fires on both server and client, and through both console.error and console.warn
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

function MyApp({ Component, pageProps }) {
  // Register service worker for performance caching (production only)
  useEffect(() => {
    registerServiceWorker();
  }, []);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="theme-color" content="#D4AF37" />
        
        {/* Global Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The Best in London",
              "url": "https://www.thebestinlondon.co.uk",
              "description": "Discover the best restaurants, cafés and dining spots across London — verified ratings, hygiene scores and real reviews.",
              "publisher": {
                "@type": "Organization",
                "name": "The Best in London",
                "url": "https://www.thebestinlondon.co.uk",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.thebestinlondon.co.uk/logo-compact.svg"
                },
                "sameAs": [
                  "https://www.instagram.com/thebestinlondon",
                  "https://www.facebook.com/thebestinlondon",
                  "https://x.com/thebestinlondon"
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.thebestinlondon.co.uk/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": "London Restaurants",
                "description": "Curated list of London's finest restaurants, cafés and dining establishments",
                "numberOfItems": "760+"
              }
            })
          }}
        />
      </Head>
      <div className="page-transition-wrapper">
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        .page-transition-wrapper {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Page fade transitions */
        @media (prefers-reduced-motion: no-preference) {
          .page-transition-wrapper {
            animation: fadeIn 0.3s ease-in-out;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default MyApp




