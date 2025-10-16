import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function SearchModal({ isOpen, onClose, venues }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // 300ms debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Real-time search filtering with debounced term
  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setFilteredVenues([]);
      return;
    }

    const term = debouncedTerm.toLowerCase();
    const results = venues.filter(venue => {
      const matchesName = venue.name?.toLowerCase().includes(term);
      const matchesCuisine = venue.cuisines?.some(c => c.toLowerCase().includes(term));
      const matchesArea = venue.vicinity?.toLowerCase().includes(term);
      const matchesDietary = venue.dietary_tags && Object.keys(venue.dietary_tags).some(key => key.toLowerCase().includes(term) && venue.dietary_tags[key] === true);
      
      return matchesName || matchesCuisine || matchesArea || matchesDietary;
    });

    setFilteredVenues(results.slice(0, 20));
    setSelectedIndex(0);
  }, [debouncedTerm, venues]);

  // Maintain focus on mobile
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Delay to ensure modal is rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        // Prevent iOS zoom on focus
        if (inputRef.current) {
          inputRef.current.style.fontSize = '16px';
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredVenues.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredVenues[selectedIndex]) {
        e.preventDefault();
        navigateToVenue(filteredVenues[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredVenues, selectedIndex, onClose]);

  // Navigate to venue
  const navigateToVenue = (venue) => {
    // Use the venue's existing slug, or create one from the name as fallback
    const slug = venue.slug || venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/restaurant/${slug}`);
    onClose();
  };

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setFilteredVenues([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const suggestions = ['Halal', 'Vegan', 'Italian', 'Soho', 'Michelin', 'Fine Dining', 'Budget', 'Japanese'];

  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        {/* Backdrop */}
        <div 
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        />

        {/* Modal */}
        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '80px',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            animation: 'slideDown 0.3s ease-out'
          }}>
            
            {/* Search Header */}
            <div style={{
              borderBottom: '1px solid #e5e7eb',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                {/* Search Icon */}
                <svg style={{ width: '24px', height: '24px', color: '#9ca3af', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search restaurants, cuisines, areas..."
                  inputMode="search"
                  style={{
                    flex: 1,
                    fontSize: '16px',
                    fontWeight: 500,
                    outline: 'none',
                    border: 'none',
                    background: 'transparent',
                    color: '#111827',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  style={{
                    minWidth: '48px',
                    minHeight: '48px',
                    padding: '12px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <svg style={{ width: '20px', height: '20px', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Suggestions */}
              {!searchTerm && (
                <div style={{ marginTop: '16px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Try searching for:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {suggestions.map(suggestion => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchTerm(suggestion)}
                        style={{
                          minHeight: '44px',
                          padding: '10px 16px',
                          fontSize: '14px',
                          background: '#f3f4f6',
                          color: '#374151',
                          border: 'none',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Results */}
            <div style={{
              maxHeight: '60vh',
              overflowY: 'auto'
            }}>
              {searchTerm && filteredVenues.length === 0 && (
                <div style={{
                  padding: '48px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#f3f4f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>No results found</h3>
                  <p style={{ color: '#6b7280' }}>Try searching for a different restaurant, cuisine, or area</p>
                </div>
              )}

              {filteredVenues.length > 0 && (
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', paddingLeft: '8px', paddingRight: '8px' }}>
                    Found {filteredVenues.length} restaurant{filteredVenues.length !== 1 ? 's' : ''}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredVenues.map((venue, index) => (
                      <button
                        key={venue.place_id}
                        onClick={() => navigateToVenue(venue)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          borderRadius: '12px',
                          textAlign: 'left',
                          border: index === selectedIndex ? '2px solid #f59e0b' : '2px solid transparent',
                          background: index === selectedIndex ? '#fffbeb' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: index === selectedIndex ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '16px' }}>
                          {/* Image */}
                          <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#e5e7eb',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}>
                            {venue.photos?.[0] && (
                              <img
                                src={venue.photos[0].url || venue.photos[0]}
                                alt={venue.name}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{
                              fontWeight: 600,
                              color: '#111827',
                              marginBottom: '4px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {venue.name}
                            </h4>
                            
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              fontSize: '14px',
                              color: '#6b7280',
                              marginBottom: '8px'
                            }}>
                              {venue.rating && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <svg style={{ width: '16px', height: '16px', color: '#f59e0b' }} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span style={{ fontWeight: 500 }}>{venue.rating}</span>
                                </div>
                              )}
                              {venue.cuisines?.[0] && (
                                <span style={{ textTransform: 'capitalize' }}>{venue.cuisines[0]}</span>
                              )}
                            </div>

                            {venue.vicinity && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '14px',
                                color: '#6b7280'
                              }}>
                                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>{venue.vicinity}</span>
                              </div>
                            )}

                            {/* Dietary Tags */}
                            {venue.dietary_tags?.length > 0 && (
                              <div style={{
                                display: 'flex',
                                gap: '4px',
                                marginTop: '8px',
                                flexWrap: 'wrap'
                              }}>
                                {venue.dietary_tags.map(tag => (
                                  <span
                                    key={tag}
                                    style={{
                                      padding: '2px 8px',
                                      fontSize: '12px',
                                      background: '#dcfce7',
                                      color: '#15803d',
                                      borderRadius: '9999px'
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredVenues.length > 0 && (
              <div style={{
                borderTop: '1px solid #e5e7eb',
                padding: '16px',
                background: '#f9fafb'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <kbd style={{
                      padding: '4px 8px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}>↑</kbd>
                    <kbd style={{
                      padding: '4px 8px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}>↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <kbd style={{
                      padding: '4px 8px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}>Enter</kbd>
                    <span>Select</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <kbd style={{
                      padding: '4px 8px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}>Esc</kbd>
                    <span>Close</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
