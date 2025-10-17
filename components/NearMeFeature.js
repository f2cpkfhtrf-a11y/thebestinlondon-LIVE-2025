import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const NearMeFeature = ({ venues = [], onFilteredVenues }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [nearbyVenues, setNearbyVenues] = useState([]);
  const [maxDistance, setMaxDistance] = useState(5); // km
  const [showNearMe, setShowNearMe] = useState(false);
  const locationPermissionRef = useRef(false);

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLoadingLocation(false);
        locationPermissionRef.current = true;
        
        // Calculate nearby venues
        calculateNearbyVenues(latitude, longitude);
      },
      (error) => {
        setIsLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Calculate venues within specified distance
  const calculateNearbyVenues = (userLat, userLng) => {
    const venuesWithDistance = venues
      .filter(venue => venue.latitude && venue.longitude)
      .map(venue => {
        const distance = calculateDistance(
          userLat, 
          userLng, 
          venue.latitude, 
          venue.longitude
        );
        return { ...venue, distance };
      })
      .filter(venue => venue.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    setNearbyVenues(venuesWithDistance);
    setShowNearMe(true);
    
    // Update parent component with nearby venues
    if (onFilteredVenues) {
      onFilteredVenues(venuesWithDistance);
    }
  };

  // Handle distance filter change
  const handleDistanceChange = (newDistance) => {
    setMaxDistance(newDistance);
    if (userLocation) {
      calculateNearbyVenues(userLocation.lat, userLocation.lng);
    }
  };

  // Format distance for display
  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  // Clear near me filter
  const clearNearMe = () => {
    setShowNearMe(false);
    setNearbyVenues([]);
    setUserLocation(null);
    if (onFilteredVenues) {
      onFilteredVenues(venues);
    }
  };

  return (
    <div className="bg-charcoal/95 backdrop-blur-md border-b border-grey-dark sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Near Me Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-semibold text-warmWhite">
              Near Me
            </h3>
          </div>

          {showNearMe && (
            <button
              onClick={clearNearMe}
              className="text-sm text-grey hover:text-gold transition-colors duration-300 underline"
            >
              Clear Location
            </button>
          )}
        </div>

        {/* Location Controls */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Use My Location Button */}
          {!showNearMe && (
            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${isLoadingLocation 
                  ? 'bg-grey-dark text-grey cursor-not-allowed' 
                  : 'bg-gold text-black hover:bg-gold/90 hover:shadow-lg'
                }
              `}
            >
              {isLoadingLocation ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Getting Location...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Use My Location</span>
                </>
              )}
            </button>
          )}

          {/* Distance Filter */}
          {showNearMe && (
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-grey">Within:</label>
              <select
                value={maxDistance}
                onChange={(e) => handleDistanceChange(parseFloat(e.target.value))}
                className="bg-black-light border border-grey-dark rounded-lg px-3 py-2 text-warmWhite text-sm focus:border-gold focus:outline-none"
              >
                <option value={1}>1 km</option>
                <option value={2}>2 km</option>
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={20}>20 km</option>
              </select>
            </div>
          )}

          {/* Results Count */}
          {showNearMe && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span className="text-sm text-grey">
                {nearbyVenues.length} restaurants within {maxDistance}km
              </span>
            </div>
          )}
        </div>

        {/* Location Error */}
        {locationError && (
          <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-red-300">{locationError}</span>
            </div>
          </div>
        )}

        {/* Location Success */}
        {showNearMe && userLocation && (
          <div className="mt-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-green-300">
                Location found! Showing restaurants within {maxDistance}km of your position.
              </span>
            </div>
          </div>
        )}

        {/* Nearby Venues Preview */}
        {showNearMe && nearbyVenues.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-grey mb-2">Closest restaurants:</div>
            <div className="flex flex-wrap gap-2">
              {nearbyVenues.slice(0, 3).map((venue, index) => (
                <div key={venue.id || index} className="flex items-center space-x-2 bg-black-light rounded-lg px-3 py-2">
                  <span className="text-xs text-gold font-medium">
                    {formatDistance(venue.distance)}
                  </span>
                  <span className="text-xs text-warmWhite truncate max-w-32">
                    {venue.name}
                  </span>
                </div>
              ))}
              {nearbyVenues.length > 3 && (
                <div className="flex items-center space-x-2 bg-black-light rounded-lg px-3 py-2">
                  <span className="text-xs text-grey">
                    +{nearbyVenues.length - 3} more
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearMeFeature;
