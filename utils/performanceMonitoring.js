// Performance monitoring utilities
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
      console.log(`Image loaded: ${img.src} in ${loadTime}ms`);
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
