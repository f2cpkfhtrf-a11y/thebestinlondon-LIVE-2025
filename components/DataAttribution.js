import { theme } from '../utils/theme';

export default function DataAttribution({ dataSources, variant = 'compact' }) {
  const formatDate = (isoDate) => {
    if (!isoDate) return 'Recently';
    const date = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  };

  if (variant === 'compact') {
    return (
      <div style={{
        fontSize: '11px',
        color: theme.colors.text.secondary,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '8px',
        paddingTop: '8px',
        borderTop: `1px solid ${theme.colors.border.subtle}`
      }}>
        <span>📊 Data from:</span>
        {dataSources.google?.verified && (
          <span style={{ opacity: 0.8 }}>Google ({formatDate(dataSources.google.lastUpdated)})</span>
        )}
        {dataSources.tripadvisor?.verified && (
          <span style={{ opacity: 0.8 }}>• TripAdvisor</span>
        )}
        {dataSources.fsa?.verified && (
          <span style={{ opacity: 0.8 }}>• FSA</span>
        )}
      </div>
    );
  }

  // Full variant for venue pages
  return (
    <div style={{
      background: theme.colors.bg.elevated,
      border: `1px solid ${theme.colors.border.subtle}`,
      borderRadius: theme.radius.md,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.xl
    }}>
      <h4 style={{
        fontSize: '14px',
        fontWeight: 600,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Data Sources & Attribution
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, fontSize: '13px' }}>
        {dataSources.google?.verified && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>Google Maps</span>
              <span style={{ color: theme.colors.text.secondary, marginLeft: '8px' }}>
                Rating & Reviews
              </span>
            </div>
            <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
              Updated {formatDate(dataSources.google.lastUpdated)}
            </span>
          </div>
        )}

        {dataSources.tripadvisor?.verified && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>TripAdvisor</span>
              <span style={{ color: theme.colors.text.secondary, marginLeft: '8px' }}>
                Reviews & Rating
              </span>
            </div>
            <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
              Updated {formatDate(dataSources.tripadvisor.lastUpdated)}
            </span>
          </div>
        )}

        {dataSources.fsa?.verified && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>Food Standards Agency</span>
              <span style={{ color: theme.colors.text.secondary, marginLeft: '8px' }}>
                Hygiene Rating
              </span>
            </div>
            <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
              {dataSources.fsa.inspectionDate ? 
                `Inspected ${formatDate(dataSources.fsa.inspectionDate)}` : 
                `Updated ${formatDate(dataSources.fsa.lastUpdated)}`
              }
            </span>
          </div>
        )}
      </div>

      <div style={{
        marginTop: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        borderTop: `1px solid ${theme.colors.border.subtle}`,
        fontSize: '11px',
        color: theme.colors.text.secondary,
        lineHeight: 1.5
      }}>
        <p style={{ margin: 0 }}>
          All data is sourced from official third-party providers and verified for accuracy. 
          Ratings and reviews are independently collected and displayed in accordance with provider terms.
        </p>
      </div>
    </div>
  );
}
