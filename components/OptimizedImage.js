import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600, 
  className = '',
  priority = false,
  quality = 85,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback image for errors
  const fallbackSrc = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-grey-dark animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Main image */}
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
        {...props}
      />
      
      {/* Error overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-sm opacity-75">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
}
