// Performance optimization utilities

// Preload critical images
export const preloadCriticalImages = (images) => {
  if (typeof window === 'undefined') return;
  
  images.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image.src;
    if (image.type) link.type = image.type;
    document.head.appendChild(link);
  });
};

// Font loading optimization
export const optimizeFontLoading = () => {
  if (typeof window === 'undefined') return;
  
  // Preload critical fonts
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];
  
  criticalFonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = fontUrl;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
};

// Image optimization utilities
export const optimizeImageUrl = (url, options = {}) => {
  if (!url) return '';
  
  const {
    width = 1600,
    height = 1200,
    quality = 85,
    format = 'webp'
  } = options;
  
  // If it's already a Google Places API URL, optimize it
  if (url.includes('maps.googleapis.com')) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('maxwidth', width.toString());
    urlObj.searchParams.set('maxheight', height.toString());
    return urlObj.toString();
  }
  
  // If it's an Unsplash URL, optimize it
  if (url.includes('unsplash.com')) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('h', height.toString());
    urlObj.searchParams.set('q', quality.toString());
    urlObj.searchParams.set('fit', 'crop');
    urlObj.searchParams.set('crop', 'center');
    urlObj.searchParams.set('auto', 'format');
    return urlObj.toString();
  }
  
  return url;
};

// Bundle size optimization
export const optimizeBundleSize = () => {
  if (typeof window === 'undefined') return;
  
  // Implement code splitting for non-critical components
  const loadComponent = (componentPath) => {
    return import(componentPath);
  };
  
  return { loadComponent };
};

// Service Worker registration
export const registerServiceWorker = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
};

// Performance monitoring
export const monitorPerformance = () => {
  if (typeof window === 'undefined') return;
  
  // Monitor Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.processingStart - entry.startTime);
      }
      if (entry.entryType === 'layout-shift') {
        console.log('CLS:', entry.value);
      }
    });
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
};

// Memory optimization
export const optimizeMemory = () => {
  if (typeof window === 'undefined') return;
  
  // Clean up unused event listeners
  const cleanup = () => {
    // Remove any global event listeners that might be causing memory leaks
    window.removeEventListener('scroll', () => {});
    window.removeEventListener('resize', () => {});
  };
  
  // Run cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
  
  return cleanup;
};

// Compression utilities
export const compressData = (data) => {
  // Simple compression for large datasets
  if (typeof data === 'string') {
    return data.replace(/\s+/g, ' ').trim();
  }
  
  if (Array.isArray(data)) {
    return data.map(item => {
      if (typeof item === 'object') {
        const compressed = {};
        Object.keys(item).forEach(key => {
          if (item[key] !== null && item[key] !== undefined && item[key] !== '') {
            compressed[key] = item[key];
          }
        });
        return compressed;
      }
      return item;
    });
  }
  
  return data;
};

// Pagination utility for large datasets
export const paginateData = (data, page = 1, limit = 20) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
      hasNext: endIndex < data.length,
      hasPrev: page > 1
    }
  };
};

export default {
  optimizeFontLoading,
  optimizeImageUrl,
  optimizeBundleSize,
  registerServiceWorker,
  monitorPerformance,
  optimizeMemory,
  compressData,
  paginateData
};