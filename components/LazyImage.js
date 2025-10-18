import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  fill = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  if (!isInView) {
    return (
      <div 
        ref={imgRef}
        className={`bg-grey-dark animate-pulse ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        {...props}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-grey text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : {}}
      onLoad={() => setIsLoaded(true)}
      {...props}
    />
  );
};

export default LazyImage;
