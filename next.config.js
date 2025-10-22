/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    unoptimized: true,
    domains: ['thebestinlondon.co.uk', 'www.thebestinlondon.co.uk', 'lh3.googleusercontent.com', 'maps.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Redirects for duplicate routes
  async redirects() {
    return [
      // Halal route consolidation
      {
        source: '/best-halal-restaurants-london',
        destination: '/collections/halal',
        permanent: true,
      },
      // Area route consolidation
      {
        source: '/restaurants-central-london',
        destination: '/areas/central-london',
        permanent: true,
      },
      {
        source: '/restaurants-redbridge',
        destination: '/areas/redbridge',
        permanent: true,
      },
      // Old restaurant pages redirect to new structure
      {
        source: '/restaurants-old',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/indian-restaurants-london-old',
        destination: '/indian-restaurants-london',
        permanent: true,
      },
      {
        source: '/best-halal-restaurants-london-old',
        destination: '/best-halal-restaurants-london',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/tiles_v2/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/api/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
// Force full rebuild 1761083659
