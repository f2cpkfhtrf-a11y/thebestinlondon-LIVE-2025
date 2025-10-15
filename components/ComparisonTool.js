// RESTAURANT COMPARISON TOOL - Interactive Feature
// Lets users compare 2-3 restaurants side by side

import { useState } from 'react';
import FSABadge from './FSABadge';

export default function ComparisonTool({ venues }) {
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredVenues = venues.filter(v => 
    v.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);
  
  const addVenue = (venue) => {
    if (selectedVenues.length < 3 && !selectedVenues.find(v => v.place_id === venue.place_id)) {
      setSelectedVenues([...selectedVenues, venue]);
      setSearchTerm('');
    }
  };
  
  const removeVenue = (placeId) => {
    setSelectedVenues(selectedVenues.filter(v => v.place_id !== placeId));
  };
  
  if (selectedVenues.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '40px'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>
          🔍 Compare Restaurants
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          Select up to 3 restaurants to compare ratings, prices, and features
        </p>
        
        <input
          type="text"
          placeholder="Search restaurants to compare..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 20px',
            fontSize: '16px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            outline: 'none',
            marginBottom: searchTerm ? '12px' : '0'
          }}
        />
        
        {searchTerm && filteredVenues.length > 0 && (
          <div style={{
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {filteredVenues.map(venue => (
              <button
                key={venue.place_id}
                onClick={() => addVenue(venue)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: 'white',
                  border: 'none',
                  borderBottom: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{venue.name}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    ⭐ {venue.rating} • {venue.area}
                  </div>
                </div>
                <span style={{ color: '#10b981', fontSize: '20px' }}>+</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      marginBottom: '40px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>
          Comparing {selectedVenues.length} Restaurant{selectedVenues.length > 1 ? 's' : ''}
        </h3>
        <button
          onClick={() => setSelectedVenues([])}
          style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Clear All
        </button>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${selectedVenues.length}, 1fr)`,
        gap: '20px'
      }}>
        {selectedVenues.map(venue => (
          <div key={venue.place_id} style={{
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            padding: '20px',
            position: 'relative'
          }}>
            <button
              onClick={() => removeVenue(venue.place_id)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#fee2e2',
                color: '#dc2626',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
            
            <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#111827', paddingRight: '30px' }}>
              {venue.name}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Rating */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px', 
                background: '#fef3c7', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '18px', marginRight: '6px' }}>⭐</span>
                <span style={{ fontWeight: '700', fontSize: '16px', color: '#111827' }}>
                  {venue.rating || 'N/A'}
                </span>
                <span style={{ fontSize: '13px', color: '#6b7280', marginLeft: '6px' }}>
                  ({venue.user_ratings_total || 0})
                </span>
              </div>
              
              {/* Price */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px', 
                background: '#ecfdf5', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '18px', marginRight: '6px' }}>💰</span>
                <span style={{ fontWeight: '700', fontSize: '16px', color: '#059669' }}>
                  {venue.priceEstimate || '£15-25'}
                </span>
              </div>
              
              {/* Area */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px', 
                background: '#f3f4f6', 
                borderRadius: '8px' 
              }}>
                <span style={{ fontSize: '18px', marginRight: '6px' }}>📍</span>
                <span style={{ fontSize: '14px', color: '#374151' }}>
                  {venue.area || 'London'}
                </span>
              </div>
              
              {/* FSA Badge */}
              {venue.fsa_rating && (
                <FSABadge rating={venue.fsa_rating} size="sm" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedVenues.length < 3 && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Add another restaurant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              outline: 'none'
            }}
          />
          
          {searchTerm && filteredVenues.length > 0 && (
            <div style={{
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              overflow: 'hidden',
              marginTop: '8px'
            }}>
              {filteredVenues.map(venue => (
                <button
                  key={venue.place_id}
                  onClick={() => addVenue(venue)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    textAlign: 'left',
                    background: 'white',
                    border: 'none',
                    borderBottom: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  {venue.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
