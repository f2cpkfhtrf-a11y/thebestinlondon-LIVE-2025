import React, { useState, useEffect } from 'react';

const LocationTag = ({ area, borough, className = '' }) => {
  const displayArea = area || borough || 'London';
  const displayBorough = borough && borough !== area ? borough : null;
  
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      <span className="text-sm text-grey font-medium">
        {displayArea}
        {displayBorough && (
          <span className="text-grey-light"> — {displayBorough}</span>
        )}
      </span>
    </div>
  );
};

const DistanceTag = ({ distance, className = '' }) => {
  if (!distance) return null;
  
  const formatDistance = (dist) => {
    if (dist < 1) {
      return `${Math.round(dist * 1000)}m`;
    }
    return `${dist.toFixed(1)}km`;
  };
  
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
      </svg>
      <span className="text-sm text-green-400 font-medium">
        {formatDistance(distance)}
      </span>
    </div>
  );
};

const NearMeButton = ({ onLocationRequest, className = '' }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleClick = async () => {
    setIsRequesting(true);
    setError(null);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }
      
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });
      
      onLocationRequest({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRequesting(false);
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        disabled={isRequesting}
        className="flex items-center space-x-2 px-4 py-2 bg-gold text-black font-medium rounded-lg hover:bg-gold/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>{isRequesting ? 'Getting Location...' : 'Use My Location'}</span>
      </button>
      
      {error && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-red-500 text-white text-xs rounded-lg whitespace-nowrap z-50">
          {error}
        </div>
      )}
    </div>
  );
};

const LocationFeatures = ({ venues, onVenuesUpdate }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedVenues, setSortedVenues] = useState(venues);
  
  // Calculate distance using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  // Handle location request
  const handleLocationRequest = (location) => {
    setUserLocation(location);
    
    // Calculate distances for all venues
    const venuesWithDistance = venues.map(venue => {
      if (venue.geometry && venue.geometry.location) {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          venue.geometry.location.lat,
          venue.geometry.location.lng
        );
        return { ...venue, distance };
      }
      return venue;
    });
    
    // Sort by distance
    const sorted = venuesWithDistance.sort((a, b) => {
      if (!a.distance && !b.distance) return 0;
      if (!a.distance) return 1;
      if (!b.distance) return -1;
      return a.distance - b.distance;
    });
    
    setSortedVenues(sorted);
    onVenuesUpdate(sorted);
  };
  
  // Update sorted venues when venues prop changes
  useEffect(() => {
    if (userLocation) {
      handleLocationRequest(userLocation);
    } else {
      setSortedVenues(venues);
    }
  }, [venues]);
  
  return (
    <div className="flex items-center space-x-4">
      <NearMeButton onLocationRequest={handleLocationRequest} />
      
      {userLocation && (
        <div className="text-sm text-grey">
          <span className="text-gold font-medium">Location:</span> 
          <span className="ml-1">
            {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
};

export { LocationTag, DistanceTag, NearMeButton, LocationFeatures };
