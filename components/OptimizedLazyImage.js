import React, { useState, useRef, useEffect } from 'react';

const OptimizedLazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackSrc = '/images/heroes/site/default-card.webp',
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
      className={`relative overflow-hidden ${className}`}
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
          className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
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
