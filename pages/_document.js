import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="JXlXLBYM0IKbIxKjsGtl2p5YG3vguJ2Nuxie2muNDIY" />
        
        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Favicon & Web App Manifest */}
        <link rel="icon" href="/favicon.ico" />
        
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
