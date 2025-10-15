import { theme } from '../utils/theme';

export default function LegalFooter() {
  return (
    <div style={{
      background: theme.colors.bg.elevated,
      borderTop: `1px solid ${theme.colors.border.subtle}`,
      padding: `${theme.spacing['2xl']} 0`,
      fontSize: '13px',
      color: theme.colors.text.secondary,
      lineHeight: 1.6
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Data Attribution */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md 
          }}>
            Data Sources & Attribution
          </h4>
          <p style={{ margin: `0 0 ${theme.spacing.sm} 0` }}>
            • <strong>Google Reviews:</strong> Rating and review data sourced from Google Maps. 
            ©2025 Google LLC. All rights reserved.
          </p>
          <p style={{ margin: `0 0 ${theme.spacing.sm} 0` }}>
            • <strong>TripAdvisor Reviews:</strong> Rating data provided by TripAdvisor. 
            Reviews are the subjective opinions of TripAdvisor members.
          </p>
          <p style={{ margin: `0 0 ${theme.spacing.sm} 0` }}>
            • <strong>FSA Hygiene Ratings:</strong> Food hygiene ratings from the Food Standards Agency. 
            Visit <a href="https://ratings.food.gov.uk" target="_blank" rel="noopener" style={{ color: theme.colors.accent.gold }}>
              ratings.food.gov.uk
            </a> for official records.
          </p>
        </div>

        {/* Disclaimer */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md 
          }}>
            Disclaimer
          </h4>
          <p style={{ margin: 0 }}>
            The Best in London curates restaurant listings based on publicly available information. 
            While we strive for accuracy, details may change. Always verify opening hours, menus, 
            and availability directly with the venue. We are not affiliated with any listed restaurants 
            unless explicitly stated.
          </p>
        </div>

        {/* Venue Opt-Out */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md 
          }}>
            Restaurant Owners
          </h4>
          <p style={{ margin: 0 }}>
            If you own or manage a listed venue and would like to:
          </p>
          <ul style={{ margin: `${theme.spacing.sm} 0`, paddingLeft: '20px' }}>
            <li>Update your information</li>
            <li>Claim your listing</li>
            <li>Request removal from our directory</li>
          </ul>
          <p style={{ margin: 0 }}>
            Please contact us at{' '}
            <a href="mailto:listings@thebestinlondon.co.uk" style={{ color: theme.colors.accent.gold }}>
              listings@thebestinlondon.co.uk
            </a>
          </p>
        </div>

        {/* Image Attribution */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md 
          }}>
            Images & Photography
          </h4>
          <p style={{ margin: 0 }}>
            Images are sourced from venue-provided materials, licensed stock photography, or 
            Creative Commons sources. Credits appear on each image. If you believe an image 
            has been used inappropriately, please{' '}
            <a href="mailto:images@thebestinlondon.co.uk" style={{ color: theme.colors.accent.gold }}>
              contact us
            </a>.
          </p>
        </div>

        {/* Copyright */}
        <div style={{ 
          paddingTop: theme.spacing.lg, 
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          textAlign: 'center',
          color: theme.colors.text.secondary,
          fontSize: '12px'
        }}>
          <p style={{ margin: `0 0 ${theme.spacing.sm} 0` }}>
            © 2025 The Best in London. All rights reserved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="/privacy" style={{ color: 'inherit' }}>Privacy Policy</a>
            <span>•</span>
            <a href="/terms" style={{ color: 'inherit' }}>Terms of Service</a>
            <span>•</span>
            <a href="/cookies" style={{ color: 'inherit' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
