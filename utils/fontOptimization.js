// Font optimization utilities
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
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}
