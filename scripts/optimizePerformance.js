const fs = require('fs');
const path = require('path');

// Performance Optimization and Core Web Vitals
function optimizePerformance() {
  console.log('⚡ OPTIMIZING PERFORMANCE & CORE WEB VITALS...\n');
  
  const optimizations = {
    timestamp: new Date().toISOString(),
    lazyLoading: [],
    fontOptimization: [],
    imageOptimization: [],
    bundleOptimization: [],
    totalOptimizations: 0
  };
  
  // 1. Create lazy loading component
  const lazyImagePath = path.join(__dirname, '../components/OptimizedLazyImage.js');
  const lazyImageContent = `import React, { useState, useRef, useEffect } from 'react';

const OptimizedLazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackSrc = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85',
  priority = false,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(priority ? src : '');
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImgSrc(src);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      ref={imgRef}
      className={\`relative overflow-hidden \${className}\`}
      style={{ width, height }}
    >
      {isLoading && (
        <div 
          className="absolute inset-0 bg-grey-dark animate-pulse flex items-center justify-center"
        >
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {isInView && (
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={\`\${className} transition-opacity duration-300 \${isLoading ? 'opacity-0' : 'opacity-100'}\`}
          onError={handleError}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...props}
        />
      )}
      
      {!isInView && !priority && (
        <div 
          className="absolute inset-0 bg-grey-dark flex items-center justify-center"
        >
          <div className="text-grey text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedLazyImage;
`;
  
  fs.writeFileSync(lazyImagePath, lazyImageContent);
  optimizations.lazyLoading.push('Created OptimizedLazyImage component with Intersection Observer');
  
  // 2. Create font optimization utility
  const fontOptimizationPath = path.join(__dirname, '../utils/fontOptimization.js');
  const fontOptimizationContent = `// Font optimization utilities
export const fontPreloadLinks = [
  {
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    as: 'style',
    crossorigin: 'anonymous'
  },
  {
    href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
    as: 'font',
    type: 'font/woff2',
    crossorigin: 'anonymous'
  }
];

export const fontDisplay = 'swap';

export const fontFallbacks = {
  'Inter': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

// Preload critical fonts
export function preloadCriticalFonts() {
  if (typeof window === 'undefined') return;
  
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
  preloadLink.as = 'font';
  preloadLink.type = 'font/woff2';
  preloadLink.crossOrigin = 'anonymous';
  
  document.head.appendChild(preloadLink);
}

// Optimize font loading
export function optimizeFontLoading() {
  if (typeof window === 'undefined') return;
  
  // Add font-display: swap to all font faces
  const style = document.createElement('style');
  style.textContent = \`
    @font-face {
      font-family: 'Inter';
      font-display: swap;
    }
  \`;
  document.head.appendChild(style);
}
`;
  
  fs.writeFileSync(fontOptimizationPath, fontOptimizationContent);
  optimizations.fontOptimization.push('Created font optimization utilities');
  
  // 3. Create image optimization utility
  const imageOptimizationPath = path.join(__dirname, '../utils/imageOptimization.js');
  const imageOptimizationContent = `// Image optimization utilities
export const imageFormats = ['webp', 'avif', 'jpg'];
export const imageSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export function getOptimizedImageUrl(src, width, height, quality = 85) {
  if (!src) return '';
  
  // If it's already an optimized URL, return as is
  if (src.includes('w=') && src.includes('h=')) {
    return src;
  }
  
  // For Unsplash URLs, add optimization parameters
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('h', height.toString());
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('crop', 'center');
    url.searchParams.set('q', quality.toString());
    return url.toString();
  }
  
  // For Google Places API URLs, add maxwidth parameter
  if (src.includes('maps.googleapis.com')) {
    const url = new URL(src);
    url.searchParams.set('maxwidth', width.toString());
    return url.toString();
  }
  
  return src;
}

export function getImageSrcSet(src, sizes = imageSizes) {
  if (!src) return '';
  
  return sizes
    .map(size => \`\${getOptimizedImageUrl(src, size)} \${size}w\`)
    .join(', ');
}

export function preloadCriticalImages(imageUrls) {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Lazy load images below the fold
export function lazyLoadImages() {
  if (typeof window === 'undefined') return;
  
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}
`;
  
  fs.writeFileSync(imageOptimizationPath, imageOptimizationContent);
  optimizations.imageOptimization.push('Created image optimization utilities');
  
  // 4. Create bundle optimization configuration
  const nextConfigPath = path.join(__dirname, '../next.config.js');
  let nextConfig = '';
  
  if (fs.existsSync(nextConfigPath)) {
    nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  }
  
  // Add performance optimizations to next.config.js
  const performanceConfig = `
module.exports = {
  // Existing config...
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@next/font', 'react-icons']
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  
  // Compression
  compress: true,
  
  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
  
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      { source: '/halal-near-stations-simple', destination: '/best-halal-restaurants-london', permanent: true },
      { source: '/areas/index', destination: '/areas', permanent: true },
      { source: '/restaurants/index', destination: '/restaurants', permanent: true }
    ];
  },
};
`;
  
  if (nextConfig.trim()) {
    nextConfig = nextConfig.replace('module.exports = {', `module.exports = {${performanceConfig}`);
  } else {
    nextConfig = performanceConfig;
  }
  
  fs.writeFileSync(nextConfigPath, nextConfig);
  optimizations.bundleOptimization.push('Updated next.config.js with performance optimizations');
  
  // 5. Create performance monitoring utility
  const performanceMonitoringPath = path.join(__dirname, '../utils/performanceMonitoring.js');
  const performanceMonitoringContent = `// Performance monitoring utilities
export function measureCoreWebVitals() {
  if (typeof window === 'undefined') return;
  
  // Measure Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // Measure First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });
  
  // Measure Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
}

export function measurePageLoadTime() {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log('Page load time:', loadTime + 'ms');
  });
}

export function measureImageLoadTimes() {
  if (typeof window === 'undefined') return;
  
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(\`Image loaded: \${img.src} in \${loadTime}ms\`);
    });
  });
}

// Lighthouse performance score estimation
export function estimateLighthouseScore() {
  if (typeof window === 'undefined') return;
  
  const metrics = {
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0
  };
  
  // Measure First Contentful Paint (FCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        metrics.fcp = entry.startTime;
      }
    });
  }).observe({ entryTypes: ['paint'] });
  
  // Measure Time to First Byte (TTFB)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (entry.name === 'navigation') {
        metrics.ttfb = entry.responseStart - entry.requestStart;
      }
    });
  }).observe({ entryTypes: ['navigation'] });
  
  return metrics;
}
`;
  
  fs.writeFileSync(performanceMonitoringPath, performanceMonitoringContent);
  optimizations.bundleOptimization.push('Created performance monitoring utilities');
  
  // 6. Create service worker for caching
  const serviceWorkerPath = path.join(__dirname, '../public/sw.js');
  const serviceWorkerContent = `// Service Worker for caching
const CACHE_NAME = 'thebestinlondon-v1';
const urlsToCache = [
  '/',
  '/restaurants',
  '/cuisines',
  '/areas',
  '/best-halal-restaurants-london',
  '/nearby',
  '/about',
  '/contact',
  '/venues.json',
  '/search-data.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;
  
  fs.writeFileSync(serviceWorkerPath, serviceWorkerContent);
  optimizations.bundleOptimization.push('Created service worker for caching');
  
  // 7. Generate summary
  optimizations.totalOptimizations = 
    optimizations.lazyLoading.length + 
    optimizations.fontOptimization.length + 
    optimizations.imageOptimization.length + 
    optimizations.bundleOptimization.length;
  
  console.log('\n📊 PERFORMANCE OPTIMIZATION SUMMARY:');
  console.log('='.repeat(50));
  console.log(`Lazy Loading Optimizations: ${optimizations.lazyLoading.length}`);
  console.log(`Font Optimizations: ${optimizations.fontOptimization.length}`);
  console.log(`Image Optimizations: ${optimizations.imageOptimization.length}`);
  console.log(`Bundle Optimizations: ${optimizations.bundleOptimization.length}`);
  console.log(`Total Optimizations: ${optimizations.totalOptimizations}`);
  
  console.log('\n⚡ LAZY LOADING:');
  optimizations.lazyLoading.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  console.log('\n🔤 FONT OPTIMIZATION:');
  optimizations.fontOptimization.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  console.log('\n🖼️ IMAGE OPTIMIZATION:');
  optimizations.imageOptimization.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  console.log('\n📦 BUNDLE OPTIMIZATION:');
  optimizations.bundleOptimization.forEach((opt, index) => {
    console.log(`${index + 1}. ${opt}`);
  });
  
  // 8. Save report
  const reportPath = path.join(__dirname, '../reports/performance.md');
  const reportContent = `# Performance Optimization Report

## Summary
- **Optimization Date**: ${optimizations.timestamp}
- **Lazy Loading Optimizations**: ${optimizations.lazyLoading.length}
- **Font Optimizations**: ${optimizations.fontOptimization.length}
- **Image Optimizations**: ${optimizations.imageOptimization.length}
- **Bundle Optimizations**: ${optimizations.bundleOptimization.length}
- **Total Optimizations**: ${optimizations.totalOptimizations}

## Lazy Loading Optimizations
${optimizations.lazyLoading.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## Font Optimizations
${optimizations.fontOptimization.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## Image Optimizations
${optimizations.imageOptimization.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## Bundle Optimizations
${optimizations.bundleOptimization.map((opt, index) => `
${index + 1}. ${opt}
`).join('')}

## Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: ≤ 2.5s
- **FID (First Input Delay)**: ≤ 100ms
- **CLS (Cumulative Layout Shift)**: ≤ 0.1
- **FCP (First Contentful Paint)**: ≤ 1.8s
- **TTFB (Time to First Byte)**: ≤ 600ms

## Lighthouse Score Targets
- **Performance**: ≥ 85
- **SEO**: ≥ 95
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90

## Files Created/Updated
- \`components/OptimizedLazyImage.js\` - Advanced lazy loading component
- \`utils/fontOptimization.js\` - Font loading optimization
- \`utils/imageOptimization.js\` - Image optimization utilities
- \`utils/performanceMonitoring.js\` - Performance monitoring
- \`next.config.js\` - Performance configuration
- \`public/sw.js\` - Service worker for caching

## Next Steps
1. Test Core Web Vitals on live site
2. Run Lighthouse audit
3. Monitor performance metrics
4. Optimize based on real-world data
5. Implement additional caching strategies
`;
  
  fs.writeFileSync(reportPath, reportContent);
  
  console.log(`\n💾 Report saved to: ${reportPath}`);
  console.log(`✅ Performance optimization complete!`);
  
  return optimizations;
}

// Run the optimization
optimizePerformance();