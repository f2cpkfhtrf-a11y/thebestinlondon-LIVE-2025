import { theme } from '../utils/theme';
import { formatLastUpdated } from '../utils/venueDataModel';

export default function DataSourceBadge({ source, lastUpdated, showTooltip = true }) {
  const sources = {
    google: {
      label: 'Google',
      color: '#EA4335',
      attribution: 'Reviews from Google',
      icon: '🔍'
    },
    tripadvisor: {
      label: 'TripAdvisor',
      color: '#34E0A1',
      attribution: 'Reviews from TripAdvisor',
      icon: '🦉'
    },
    fsa: {
      label: 'FSA',
      color: '#10B981',
      attribution: 'Food Standards Agency',
      icon: '🏥'
    }
  };

  const config = sources[source];
  if (!config) return null;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          color: theme.colors.text.secondary,
          padding: '4px 8px',
          background: theme.colors.bg.elevated,
          borderRadius: theme.radius.sm,
          border: `1px solid ${theme.colors.border.subtle}`
        }}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
        {lastUpdated && (
          <>
            <span style={{ color: theme.colors.border.prominent }}>•</span>
            <span>{formatLastUpdated(lastUpdated)}</span>
          </>
        )}
      </div>
      
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            background: theme.colors.bg.primary,
            border: `1px solid ${theme.colors.border.subtle}`,
            borderRadius: theme.radius.sm,
            fontSize: '12px',
            color: theme.colors.text.secondary,
            whiteSpace: 'nowrap',
            opacity: 0,
            pointerEvents: 'none',
            transition: `opacity ${theme.motion.fast}`,
            zIndex: 1000
          }}
          className="tooltip"
        >
          {config.attribution}
          {lastUpdated && (
            <>
              <br />
              Last verified: {new Date(lastUpdated).toLocaleDateString('en-GB')}
            </>
          )}
        </div>
      )}

      <style jsx>{`
        div:hover .tooltip {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
