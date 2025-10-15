import { theme } from '../utils/theme';

export default function ReviewBadges({ google, tripadvisor, layout = 'row' }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: layout === 'row' ? 'row' : 'column',
    gap: layout === 'row' ? '16px' : '8px',
    alignItems: layout === 'row' ? 'center' : 'flex-start'
  };

  const badgeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      {google && google.rating && (
        <div style={badgeStyle}>
          <div style={{
            background: 'rgba(234, 67, 53, 0.1)',
            padding: '4px 10px',
            borderRadius: theme.radius.sm,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ color: '#EA4335', fontSize: '14px' }}>★</span>
            <span style={{ color: theme.colors.text.primary, fontWeight: 600 }}>
              {google.rating}
            </span>
            <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
              Google
            </span>
          </div>
          {google.reviews && (
            <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
              ({google.reviews.toLocaleString()})
            </span>
          )}
        </div>
      )}

      {tripadvisor && tripadvisor.rating && (
        <div style={badgeStyle}>
          <div style={{
            background: 'rgba(52, 211, 153, 0.1)',
            padding: '4px 10px',
            borderRadius: theme.radius.sm,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ color: '#34D399', fontSize: '14px' }}>★</span>
            <span style={{ color: theme.colors.text.primary, fontWeight: 600 }}>
              {tripadvisor.rating}
            </span>
            <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
              TripAdvisor
            </span>
          </div>
          {tripadvisor.reviews && (
            <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
              ({tripadvisor.reviews.toLocaleString()})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
