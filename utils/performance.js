// PERFORMANCE OPTIMIZATION UTILITIES

// Font preloading snippet (add to _document.js)
export const fontPreloadLinks = `
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link 
  rel="preload" 
  as="style"
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap"
/>
<link 
  rel="stylesheet" 
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap"
  media="print"
  onLoad="this.media='all'"
/>
`;

// Image aspect ratio preserver
export const imageAspectRatio = (width, height) => ({
  aspectRatio: `${width} / ${height}`,
  width: '100%',
  height: 'auto'
});

// Lazy load images with Intersection Observer
export const lazyLoadImage = (ref, src) => {
  if (!ref.current || !('IntersectionObserver' in window)) {
    if (ref.current) ref.current.src = src;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = src;
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '50px' }
  );

  observer.observe(ref.current);
};

// Resource hints for critical domains
export const resourceHints = [
  { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
  { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
  { rel: 'dns-prefetch', href: 'https://maps.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
];

// WebP conversion check
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

// Get optimized image URL
export const getOptimizedImageUrl = (url, width = 800, quality = 85) => {
  // For Unsplash
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&q=${quality}&fm=webp&fit=crop`;
  }
  
  // For CDN
  if (url.includes('cdn.thebestinlondon.co.uk')) {
    return `${url}?w=${width}&q=${quality}&format=webp`;
  }
  
  return url;
};

// Performance budget checker
export const performanceBudget = {
  maxLCP: 2500, // 2.5s
  maxCLS: 0.1,
  maxTTI: 4000, // 4s
  maxJSSize: 180 * 1024, // 180KB gzipped
  maxImageSizePerPage: 1.2 * 1024 * 1024 // 1.2MB total
};

// Report Web Vitals
export const reportWebVitals = (metric) => {
  const { name, value, id } = metric;
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${name}:`, value, 'ms', `(id: ${id})`);
  }
  
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true
    });
  }
  
  // Check against budget
  if (name === 'LCP' && value > performanceBudget.maxLCP) {
    console.warn(`⚠️ LCP exceeded budget: ${value}ms > ${performanceBudget.maxLCP}ms`);
  }
  if (name === 'CLS' && value > performanceBudget.maxCLS) {
    console.warn(`⚠️ CLS exceeded budget: ${value} > ${performanceBudget.maxCLS}`);
  }
  if (name === 'TTI' && value > performanceBudget.maxTTI) {
    console.warn(`⚠️ TTI exceeded budget: ${value}ms > ${performanceBudget.maxTTI}ms`);
  }
};

// Critical CSS extraction (inline critical path CSS)
export const criticalCSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #0B0B0B;
    color: #F5F5F5;
    line-height: 1.6;
  }
  .hero { min-height: 85vh; }
  .nav { position: sticky; top: 0; z-index: 100; }
`;
