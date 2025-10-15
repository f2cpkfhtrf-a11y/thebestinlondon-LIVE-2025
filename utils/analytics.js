// ANALYTICS CONFIGURATION
// Google Analytics 4 + Privacy-friendly alternative

// GA4 Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Initialize GA4 with consent mode
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // Default consent (denied until user accepts)
  window.gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'wait_for_update': 500
  });
  
  // Initialize GA4
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
};

// Track page view
export const trackPageView = (url) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url
    });
  }
};

// Track custom events
export const trackEvent = ({ action, category, label, value }) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Predefined event trackers
export const analytics = {
  // Filter interactions
  filterUsed: (filterType, filterValue) => {
    trackEvent({
      action: 'filter_used',
      category: 'User Interaction',
      label: `${filterType}: ${filterValue}`
    });
  },
  
  // Search
  searchPerformed: (query) => {
    trackEvent({
      action: 'search',
      category: 'User Interaction',
      label: query
    });
  },
  
  // Venue interactions
  venueViewed: (venueName, venueId) => {
    trackEvent({
      action: 'venue_view',
      category: 'Venue Interaction',
      label: venueName,
      value: venueId
    });
  },
  
  venueWebsiteClick: (venueName, venueId) => {
    trackEvent({
      action: 'outbound_click',
      category: 'Venue Interaction',
      label: `Website: ${venueName}`,
      value: venueId
    });
  },
  
  venueReservationClick: (venueName, venueId, platform) => {
    trackEvent({
      action: 'reservation_click',
      category: 'Conversion',
      label: `${platform}: ${venueName}`,
      value: venueId
    });
  },
  
  // Issue reporting
  issueReported: (venueId, issueType) => {
    trackEvent({
      action: 'issue_reported',
      category: 'Content Quality',
      label: issueType,
      value: venueId
    });
  },
  
  // Newsletter
  newsletterSignup: (location) => {
    trackEvent({
      action: 'newsletter_signup',
      category: 'Conversion',
      label: location
    });
  },
  
  // Social shares
  socialShare: (platform, contentType, contentId) => {
    trackEvent({
      action: 'share',
      category: 'Social',
      label: `${platform}: ${contentType}`,
      value: contentId
    });
  }
};

// UTM parameter builder
export const buildUTMUrl = (baseUrl, params) => {
  const {
    source = 'thebestinlondon',
    medium = 'referral',
    campaign,
    content,
    term
  } = params;
  
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  if (campaign) url.searchParams.set('utm_campaign', campaign);
  if (content) url.searchParams.set('utm_content', content);
  if (term) url.searchParams.set('utm_term', term);
  
  return url.toString();
};

// Privacy-friendly alternative: Plausible Analytics
export const PLAUSIBLE_DOMAIN = 'thebestinlondon.co.uk';

export const initPlausible = () => {
  if (typeof window === 'undefined') return;
  
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://plausible.io/js/script.js';
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
  document.head.appendChild(script);
};

export const trackPlausibleEvent = (eventName, props = {}) => {
  if (typeof window.plausible !== 'undefined') {
    window.plausible(eventName, { props });
  }
};
