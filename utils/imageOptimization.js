// Image optimization utilities
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
    .map(size => `${getOptimizedImageUrl(src, size)} ${size}w`)
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
