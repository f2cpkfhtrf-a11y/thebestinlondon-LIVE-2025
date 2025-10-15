/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: [
      'images.unsplash.com',
      'maps.googleapis.com',
      'res.cloudinary.com',
      'cloudinary.com',
      'lh3.googleusercontent.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
