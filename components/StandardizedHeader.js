import React from 'react';

const StandardizedHeader = ({ 
  title, 
  subtitle, 
  backgroundImage,
  className = '',
  showOverlay = true
}) => {
  return (
    <div className={`relative h-64 overflow-hidden ${className}`}>
      {/* Background image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )}
      
      {/* Standardized overlay with 60% opacity */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black/60"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-warmWhite/90 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandardizedHeader;
