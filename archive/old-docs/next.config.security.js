// next.config.js - SECURITY HEADERS
// Add to existing config, don't replace

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com;
      style-src 'self' 'unsafe-inline' fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' fonts.gstatic.com;
      connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com;
      frame-src 'self' www.google.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

module.exports = {
  // ... existing config
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'cdn.thebestinlondon.co.uk'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Compression
  compress: true,
  
  // Production source maps (disable for security)
  productionBrowserSourceMaps: false,
  
  // Strict mode
  reactStrictMode: true,
  
  // SWC minification (faster)
  swcMinify: true,
};
