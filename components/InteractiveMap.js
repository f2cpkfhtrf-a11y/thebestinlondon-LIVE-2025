import { useEffect, useRef, useState } from 'react';

/**
 * Interactive Google Maps component for venue pages
 * Shows restaurant location with marker and nearby similar restaurants
 * Lazy loads only when visible in viewport for better performance
 */
export default function InteractiveMap({ venue, nearbyVenues = [], height = '400px' }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Start loading 200px before it's visible
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Safety check - only run on client
    if (typeof window === 'undefined') return;
    if (!isVisible || !venue || !venue.lat || !venue.lng) return;
    if (!mapRef.current) return;

    // Initialize Google Maps
    const initMap = () => {
      if (typeof window === 'undefined' || !window.google || !window.google.maps) {
        // Load Google Maps script if not already loaded
        // Try to get API key from environment or use existing script
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 
                      process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY || 
                      '';
        
        if (!apiKey) {
          // Fallback: Use static map or embed Google Maps URL
          if (mapRef.current) {
            try {
              mapRef.current.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #1A1A1A;">
                  <a 
                    href="https://www.google.com/maps?q=${venue.lat},${venue.lng}&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="display: inline-block; padding: 12px 24px; background: #D4AF37; color: #000; text-decoration: none; border-radius: 8px; font-weight: 600;"
                  >
                    View on Google Maps →
                  </a>
                </div>
              `;
            } catch (e) {
              console.warn('Map fallback error:', e);
            }
          }
          return;
        }
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          try {
            createMap();
          } catch (e) {
            console.error('Map creation error:', e);
          }
        };
        script.onerror = () => {
          // Fallback if API key invalid
          if (mapRef.current) {
            try {
              mapRef.current.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #1A1A1A;">
                  <a 
                    href="https://www.google.com/maps?q=${venue.lat},${venue.lng}&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="display: inline-block; padding: 12px 24px; background: #D4AF37; color: #000; text-decoration: none; border-radius: 8px; font-weight: 600;"
                  >
                    View on Google Maps →
                  </a>
                </div>
              `;
            } catch (e) {
              console.warn('Map fallback error:', e);
            }
          }
        };
        
        try {
          document.head.appendChild(script);
        } catch (e) {
          console.error('Script append error:', e);
        }
        return;
      }
      
      try {
        createMap();
      } catch (e) {
        console.error('Map creation error:', e);
      }
    };

    const createMap = () => {
      if (!mapRef.current || typeof window === 'undefined' || !window.google || !window.google.maps) return;

      try {
        const venueLocation = { lat: parseFloat(venue.lat), lng: parseFloat(venue.lng) };
        
        if (isNaN(venueLocation.lat) || isNaN(venueLocation.lng)) {
          console.warn('Invalid lat/lng:', venue.lat, venue.lng);
          return;
        }

        // Create map centered on venue
        const map = new window.google.maps.Map(mapRef.current, {
          center: venueLocation,
          zoom: 15,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Add main venue marker
        if (venue.name) {
          try {
            new window.google.maps.Marker({
              position: venueLocation,
              map: map,
              title: venue.name || 'Restaurant',
              icon: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C10.477 0 6 4.477 6 10c0 6 10 20 10 20s10-14 10-20c0-5.523-4.477-10-10-10z" fill="#D4AF37"/>
                    <circle cx="16" cy="10" r="4" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(32, 40),
                anchor: new window.google.maps.Point(16, 40)
              }
            });
          } catch (e) {
            console.warn('Marker creation error:', e);
          }
        }

        // Add info window for main venue
        if (venue.name) {
          try {
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; max-width: 250px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${venue.name || 'Restaurant'}</h3>
                  <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${venue.address?.formatted || venue.vicinity || ''}</p>
                  ${venue.rating ? `<p style="margin: 0; font-size: 14px; color: #D4AF37;">★ ${parseFloat(venue.rating).toFixed(1)} (${(venue.user_ratings_total || 0).toLocaleString()} reviews)</p>` : ''}
                  ${venue.phone ? `<p style="margin: 4px 0 0 0;"><a href="tel:${venue.phone}" style="color: #D4AF37; text-decoration: none;">${venue.phone}</a></p>` : ''}
                </div>
              `
            });

            // Open info window on marker click
            const mainMarker = new window.google.maps.Marker({
              position: venueLocation,
              map: map,
              title: venue.name || 'Restaurant'
            });
            
            mainMarker.addListener('click', () => {
              infoWindow.open(map, mainMarker);
            });
          } catch (e) {
            console.warn('Info window error:', e);
          }
        }

        // Add nearby restaurant markers (limit to 5 closest)
        if (nearbyVenues && Array.isArray(nearbyVenues) && nearbyVenues.length > 0) {
          try {
            nearbyVenues.slice(0, 5).forEach(nearby => {
              if (nearby && nearby.lat && nearby.lng && !isNaN(parseFloat(nearby.lat)) && !isNaN(parseFloat(nearby.lng))) {
                new window.google.maps.Marker({
                  position: { lat: parseFloat(nearby.lat), lng: parseFloat(nearby.lng) },
                  map: map,
                  title: nearby.name || 'Restaurant',
                  icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: '#666',
                    fillOpacity: 0.7,
                    strokeColor: '#fff',
                    strokeWeight: 2
                  }
                });
              }
            });
          } catch (e) {
            console.warn('Nearby markers error:', e);
          }
        }

        // Add directions link
        try {
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
          
          // Add directions button to map
          const directionsControlDiv = document.createElement('div');
          const directionsControl = createDirectionsButton(directionsUrl, venue.name || 'Restaurant');
          directionsControlDiv.appendChild(directionsControl);
          map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(directionsControlDiv);
        } catch (e) {
          console.warn('Directions button error:', e);
        }
      } catch (e) {
        console.error('Map creation error:', e);
      }
    };

    const createDirectionsButton = (url, venueName) => {
      const controlButton = document.createElement('button');
      controlButton.style.cssText = `
        background-color: #D4AF37;
        color: #000;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        margin: 10px;
      `;
      controlButton.textContent = 'Get Directions';
      controlButton.onclick = () => {
        try {
          window.open(url, '_blank');
        } catch (e) {
          console.warn('Directions link error:', e);
        }
      };
      return controlButton;
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [isVisible, venue, nearbyVenues]);

  // Safety check for missing venue data
  if (!venue || (!venue.lat || !venue.lng)) {
    return (
      <div style={{
        background: '#1A1A1A',
        padding: '32px',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#9AA0A6'
      }}>
        <p>Location information not available.</p>
        {venue?.google_place_url && (
          <a
            href={venue.google_place_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '16px',
              padding: '12px 24px',
              background: '#D4AF37',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 600
            }}
          >
            View on Google Maps →
          </a>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height, borderRadius: '12px', overflow: 'hidden' }}
    >
      {isVisible ? (
        <div
          ref={mapRef}
          style={{ width: '100%', height: '100%', minHeight: '400px' }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          background: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9AA0A6',
          borderRadius: '12px'
        }}>
          Map loading...
        </div>
      )}
      {isVisible && venue && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 10
        }}>
          📍 {venue.address?.formatted || venue.vicinity || 'London'}
        </div>
      )}
    </div>
  );
}
