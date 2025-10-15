import { useState, useEffect } from 'react';
import { theme } from '../utils/theme';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    
    // Enable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
    
    setShow(false);
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    
    // Deny Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
    
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.colors.bg.elevated,
        borderTop: `2px solid ${theme.colors.border.prominent}`,
        padding: theme.spacing.xl,
        zIndex: 9999,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: theme.spacing.xl, flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm
            }}>
              🍪 We use cookies
            </h3>
            <p style={{
              fontSize: '14px',
              color: theme.colors.text.secondary,
              lineHeight: 1.5,
              margin: 0
            }}>
              We use necessary cookies to make our site work. We'd also like to set optional analytics cookies 
              to help us improve it. We won't set optional cookies unless you enable them.{' '}
              <a href="/cookies" style={{ color: theme.colors.accent.gold, textDecoration: 'underline' }}>
                Learn more
              </a>
            </p>
          </div>

          <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }}>
            <button
              onClick={acceptNecessary}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: `1px solid ${theme.colors.border.prominent}`,
                borderRadius: theme.radius.sm,
                color: theme.colors.text.secondary,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: `all ${theme.motion.fast}`,
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.colors.text.secondary;
                e.currentTarget.style.color = theme.colors.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border.prominent;
                e.currentTarget.style.color = theme.colors.text.secondary;
              }}
            >
              Necessary Only
            </button>
            
            <button
              onClick={acceptAll}
              style={{
                padding: '12px 24px',
                background: theme.colors.accent.gold,
                border: 'none',
                borderRadius: theme.radius.sm,
                color: theme.colors.text.inverse,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: `all ${theme.motion.fast}`,
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#C5A028'}
              onMouseLeave={(e) => e.currentTarget.style.background = theme.colors.accent.gold}
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
