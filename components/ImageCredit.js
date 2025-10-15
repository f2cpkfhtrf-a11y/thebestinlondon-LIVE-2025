import { theme } from '../utils/theme';

export default function ImageCredit({ credit, sourceUrl, licenseType, position = 'bottom-right' }) {
  const positionStyles = {
    'bottom-right': { bottom: '8px', right: '8px' },
    'bottom-left': { bottom: '8px', left: '8px' },
    'top-right': { top: '8px', right: '8px' },
    'top-left': { top: '8px', left: '8px' }
  };

  if (!credit) return null;

  return (
    <div
      style={{
        position: 'absolute',
        ...positionStyles[position],
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        padding: '4px 8px',
        borderRadius: theme.radius.sm,
        fontSize: '10px',
        color: 'rgba(255,255,255,0.8)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        zIndex: 10
      }}
    >
      <span>📸</span>
      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          {credit}
        </a>
      ) : (
        <span>{credit}</span>
      )}
      {licenseType === 'unsplash' && (
        <a
          href="https://unsplash.com/?utm_source=thebestinlondon&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            marginLeft: '2px'
          }}
          title="Photos from Unsplash"
        >
          via Unsplash
        </a>
      )}
    </div>
  );
}
