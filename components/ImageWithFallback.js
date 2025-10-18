import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackSrc = '',
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={`bg-grey-dark animate-pulse ${className}`}
          style={{ width, height }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-grey text-sm">Loading...</span>
          </div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;