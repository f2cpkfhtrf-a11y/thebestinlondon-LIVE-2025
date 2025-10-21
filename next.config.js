/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization - ENABLED for better performance and SEO
  images: {
    unoptimized: false,
    domains: ['thebestinlondon.co.uk', 'www.thebestinlondon.co.uk', 'lh3.googleusercontent.com', 'maps.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Redirects for duplicate routes
  async redirects() {
    return [      // Halal route consolidation - redirect old /collections/halal to main page
      {
        source: '/collections/halal',
        destination: '/best-halal-restaurants-london',
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
    
      {
        source: '/restaurants-tower-hamlets',
        destination: '/areas/tower-hamlets',
        permanent: true,
      },
      {
        source: '/restaurants-westminster',
        destination: '/areas/westminster',
        permanent: true,
      },
      {
        source: '/restaurants-kensington-and-chelsea',
        destination: '/areas/kensington-and-chelsea',
        permanent: true,
      },
      {
        source: '/restaurants-lambeth',
        destination: '/areas/lambeth',
        permanent: true,
      },
      {
        source: '/restaurants-southwark',
        destination: '/areas/southwark',
        permanent: true,
      },
      {
        source: '/restaurants-holborn',
        destination: '/areas/holborn',
        permanent: true,
      },
      {
        source: '/restaurants-brick-lane',
        destination: '/areas/brick-lane',
        permanent: true,
      },
      {
        source: '/restaurants-london-bridge',
        destination: '/areas/london-bridge',
        permanent: true,
      },
      {
        source: '/british',
        destination: '/british-restaurants-london',
        permanent: true,
      },
      {
        source: '/french',
        destination: '/french-restaurants-london',
        permanent: true,
      },
      {
        source: '/spanish',
        destination: '/spanish-restaurants-london',
        permanent: true,
      },
      {
        source: '/korean',
        destination: '/korean-restaurants-london',
        permanent: true,
      },
      {
        source: '/mexican',
        destination: '/mexican-restaurants-london',
        permanent: true,
      },
      {
        source: '/indian',
        destination: '/indian-restaurants-london',
        permanent: true,
      },
      {
        source: '/italian',
        destination: '/italian-restaurants-london',
        permanent: true,
      },
      {
        source: '/japanese',
        destination: '/japanese-restaurants-london',
        permanent: true,
      },
      {
        source: '/chinese',
        destination: '/chinese-restaurants-london',
        permanent: true,
      },
      {
        source: '/thai',
        destination: '/thai-restaurants-london',
        permanent: true,
      },
      {
        source: '/turkish',
        destination: '/turkish-restaurants-london',
        permanent: true,
      },
      {
        source: '/american',
        destination: '/american-restaurants-london',
        permanent: true,
      },
      {
        source: '/modern-european',
        destination: '/modern-european-restaurants-london',
        permanent: true,
      },
      {
        source: '/mediterranean',
        destination: '/mediterranean-restaurants-london',
        permanent: true,
      },
      {
        source: '/european',
        destination: '/european-restaurants-london',
        permanent: true,
      },
      {
        source: '/australian',
        destination: '/australian-restaurants-london',
        permanent: true,
      },
      {
        source: '/vietnamese',
        destination: '/vietnamese-restaurants-london',
        permanent: true,
      },
      {
        source: '/pan-asian',
        destination: '/pan-asian-restaurants-london',
        permanent: true,
      },
      {
        source: '/pakistani',
        destination: '/pakistani-restaurants-london',
        permanent: true,
      },
      {
        source: '/african',
        destination: '/african-restaurants-london',
        permanent: true,
      },
      {
        source: '/caribbean',
        destination: '/caribbean-restaurants-london',
        permanent: true,
      },
      {
        source: '/vegetarian',
        destination: '/vegetarian-restaurants-london',
        permanent: true,
      },
      {
        source: '/south-indian',
        destination: '/south-indian-restaurants-london',
        permanent: true,
      },
      {
        source: '/punjabi',
        destination: '/punjabi-restaurants-london',
        permanent: true,
      },
      {
        source: '/sweets',
        destination: '/sweets-restaurants-london',
        permanent: true,
      },
      {
        source: '/curry',
        destination: '/curry-restaurants-london',
        permanent: true,
      },
      {
        source: '/afghan',
        destination: '/afghan-restaurants-london',
        permanent: true,
      },
      {
        source: '/bengali',
        destination: '/bengali-restaurants-london',
        permanent: true,
      },
      {
        source: '/nepalese',
        destination: '/nepalese-restaurants-london',
        permanent: true,
      },
      {
        source: '/bangladeshi',
        destination: '/bangladeshi-restaurants-london',
        permanent: true,
      },
      {
        source: '/rajasthani',
        destination: '/rajasthani-restaurants-london',
        permanent: true,
      },
      {
        source: '/gujarati',
        destination: '/gujarati-restaurants-london',
        permanent: true,
      },
      {
        source: '/kashmiri',
        destination: '/kashmiri-restaurants-london',
        permanent: true,
      },
      {
        source: '/seafood',
        destination: '/seafood-restaurants-london',
        permanent: true,
      },
      {
        source: '/vegan',
        destination: '/vegan-restaurants-london',
        permanent: true,
      },
      {
        source: '/restaurants-camden',
        destination: '/areas/camden',
        permanent: true,
      },
      {
        source: '/restaurants-havering',
        destination: '/areas/havering',
        permanent: true,
      },
      {
        source: '/restaurants-newham',
        destination: '/areas/newham',
        permanent: true,
      },
      {
        source: '/restaurants-hackney',
        destination: '/areas/hackney',
        permanent: true,
      },
      {
        source: '/restaurants-southall',
        destination: '/areas/southall',
        permanent: true,
      },
      {
        source: '/restaurants-ealing',
        destination: '/areas/ealing',
        permanent: true,
      },
      {
        source: '/restaurants-slough',
        destination: '/areas/slough',
        permanent: true,
      },
      {
        source: '/burgers',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/burgers-restaurants-london',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/cafe',
        destination: '/best-cafes-london',
        permanent: true,
      },
      {
        source: '/cafe-restaurants-london',
        destination: '/best-cafes-london',
        permanent: true,
      },
      {
        source: '/bakery',
        destination: '/best-cafes-london',
        permanent: true,
      },
      {
        source: '/bakery-restaurants-london',
        destination: '/best-cafes-london',
        permanent: true,
      },
      {
        source: '/desserts',
        destination: '/best-cafes-london',
        permanent: true,
      },
      {
        source: '/desserts-restaurants-london',
        destination: '/best-cafes-london',
        permanent: true,
      },
      {
        source: '/fast-food',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/fast-food-restaurants-london',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/lebanese',
        destination: '/mediterranean-restaurants-london',
        permanent: true,
      },
      {
        source: '/lebanese-restaurants-london',
        destination: '/mediterranean-restaurants-london',
        permanent: true,
      },
      {
        source: '/pakistani-restaurants-london',
        destination: '/indian-restaurants-london',
        permanent: true,
      },
      {
        source: '/bangladeshi-restaurants-london',
        destination: '/indian-restaurants-london',
        permanent: true,
      },
      {
        source: '/iranian',
        destination: '/mediterranean-restaurants-london',
        permanent: true,
      },
      {
        source: '/iranian-restaurants-london',
        destination: '/mediterranean-restaurants-london',
        permanent: true,
      },
      {
        source: '/afghan-restaurants-london',
        destination: '/indian-restaurants-london',
        permanent: true,
      },
      {
        source: '/middle-eastern',
        destination: '/mediterranean-restaurants-london',
        permanent: true,
      },
      {
        source: '/middle-eastern-restaurants-london',
        destination: '/mediterranean-restaurants-london',
        permanent: true,
      },
      {
        source: '/steakhouse',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/steakhouse-restaurants-london',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/seafood-restaurants-london',
        destination: '/restaurants',
        permanent: true,
      },
      {
        source: '/pizza',
        destination: '/italian-restaurants-london',
        permanent: true,
      },
      {
        source: '/pizza-restaurants-london',
        destination: '/italian-restaurants-london',
        permanent: true,
      }
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
    // Remove React development overhead in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    // Remove data-testid in production
    removeTestId: process.env.NODE_ENV === 'production',
  },

  // Compression
  compress: true,

  // SWC Minification (faster than Terser)
  swcMinify: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Optimize module resolution
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = require('crypto').createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module, chunks) {
              return require('crypto').createHash('sha1').update(chunks.reduce((acc, chunk) => acc + chunk.name, '')).digest('hex').substring(0, 8);
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
// Force full rebuild 1761083659
// Enhanced tile system deployment fix - Wed Oct 22 21:06:22 BST 2025
// Build trigger - Fri Oct 24 22:30:44 BST 2025
