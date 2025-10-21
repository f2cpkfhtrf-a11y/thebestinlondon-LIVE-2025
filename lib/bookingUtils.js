/**
 * Booking utilities for restaurant reservations
 * Supports multiple booking platforms: OpenTable, Resy, SevenRooms, and direct booking
 */

/**
 * Detect booking platform from URL or restaurant name
 * @param {string} bookingUrl - Booking URL or website
 * @param {string} restaurantName - Restaurant name for matching
 * @returns {Object} - Booking platform info
 */
export function detectBookingPlatform(bookingUrl, restaurantName = '') {
  if (!bookingUrl) return null;

  const url = bookingUrl.toLowerCase();
  const name = restaurantName.toLowerCase();

  // OpenTable detection
  if (url.includes('opentable.com') || url.includes('opentable.co.uk')) {
    return {
      platform: 'opentable',
      name: 'OpenTable',
      url: bookingUrl,
      icon: '🍽️',
      widgetSupported: true
    };
  }

  // Resy detection
  if (url.includes('resy.com') || url.includes('resy.com/cities')) {
    return {
      platform: 'resy',
      name: 'Resy',
      url: bookingUrl,
      icon: '📅',
      widgetSupported: true
    };
  }

  // SevenRooms detection
  if (url.includes('sevenrooms.com') || url.includes('7rooms.com')) {
    return {
      platform: 'sevenrooms',
      name: 'SevenRooms',
      url: bookingUrl,
      icon: '📋',
      widgetSupported: true
    };
  }

  // Tock detection
  if (url.includes('exploretock.com')) {
    return {
      platform: 'tock',
      name: 'Tock',
      url: bookingUrl,
      icon: '🎫',
      widgetSupported: false
    };
  }

  // DesignMyNight / Free To Book
  if (url.includes('designmynight.com') || url.includes('freetobook.com')) {
    return {
      platform: 'other',
      name: 'Online Booking',
      url: bookingUrl,
      icon: '🔗',
      widgetSupported: false
    };
  }

  // Direct booking on restaurant website
  if (url.includes('/book') || url.includes('/reservation') || url.includes('/booking')) {
    return {
      platform: 'direct',
      name: 'Book Directly',
      url: bookingUrl,
      icon: '📞',
      widgetSupported: false
    };
  }

  return null;
}

/**
 * Generate OpenTable widget URL
 * @param {string} restaurantId - OpenTable restaurant ID
 * @param {string} restaurantName - Restaurant name
 * @returns {string} - Widget URL
 */
export function generateOpenTableWidget(restaurantId, restaurantName) {
  if (!restaurantId) return null;
  return `https://www.opentable.com/widget/reservation/preview?rid=${restaurantId}&restref=${restaurantId}&name=${encodeURIComponent(restaurantName)}`;
}

/**
 * Generate Resy widget URL
 * @param {string} venueId - Resy venue ID
 * @returns {string} - Widget URL
 */
export function generateResyWidget(venueId) {
  if (!venueId) return null;
  return `https://resy.com/widget/venues/${venueId}/embed`;
}

/**
 * Get booking button configuration
 * @param {Object} venue - Venue object
 * @returns {Object|null} - Booking button config
 */
export function getBookingButton(venue) {
  // Priority: 1. booking_url, 2. reservation_url, 3. website with /book
  const bookingUrl = venue.booking_url || venue.reservation_url;
  
  if (bookingUrl) {
    const platform = detectBookingPlatform(bookingUrl, venue.name);
    return {
      url: bookingUrl,
      platform: platform?.platform || 'direct',
      label: platform?.name || 'Book a Table',
      icon: platform?.icon || '📅',
      widgetSupported: platform?.widgetSupported || false,
      widgetUrl: null // Can be generated if needed
    };
  }

  // Try to find booking link in website
  if (venue.website) {
    const website = venue.website.toLowerCase();
    if (website.includes('/book') || website.includes('/reservation')) {
      return {
        url: venue.website,
        platform: 'direct',
        label: 'Book on Website',
        icon: '🔗',
        widgetSupported: false
      };
    }
  }

  // Fallback: Phone booking
  if (venue.phone) {
    return {
      url: `tel:${venue.phone}`,
      platform: 'phone',
      label: 'Call to Book',
      icon: '📞',
      widgetSupported: false
    };
  }

  return null;
}

/**
 * Track booking click (for analytics)
 * @param {Object} venue - Venue object
 * @param {string} platform - Booking platform
 */
export function trackBookingClick(venue, platform) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'booking_click', {
      event_category: 'Conversion',
      event_label: `${platform}: ${venue.name}`,
      value: venue.slug,
      venue_name: venue.name,
      booking_platform: platform
    });
  }
}

