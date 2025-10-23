/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Force static export for all pages
  output: 'export',
  trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: true,
    domains: ['thebestinlondon.co.uk', 'www.thebestinlondon.co.uk', 'lh3.googleusercontent.com', 'maps.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
// Force full rebuild 1761083659
// Enhanced tile system deployment fix - Wed Oct 22 21:06:22 BST 2025
