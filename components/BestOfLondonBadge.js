// Best of London Score Badge Component
import { calculateBestOfLondonScore } from '../utils/halalStations';

export default function BestOfLondonBadge({ venue, size = 'medium', showTooltip = true }) {
  const score = calculateBestOfLondonScore(venue);
  
  const sizes = {
    small: { padding: '4px 10px', fontSize: '12px', iconSize: '12px' },
    medium: { padding: '6px 12px', fontSize: '14px', iconSize: '14px' },
    large: { padding: '8px 16px', fontSize: '16px', iconSize: '16px' }
  };
  
  const style = sizes[size];
  
  return (
    <div 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: style.padding,
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(244,208,63,0.15) 100%)',
        border: '1px solid rgba(212,175,55,0.3)',
        borderRadius: '8px',
        position: 'relative',
        cursor: showTooltip ? 'help' : 'default'
      }}
      title={showTooltip ? `Best of London Score: ${score}/5.0 - Based on Google rating (60%), review quality (20%), and FSA hygiene (20%)` : ''}
    >
      <svg 
        width={style.iconSize} 
        height={style.iconSize} 
        viewBox="0 0 24 24" 
        fill="#D4AF37"
        style={{ flexShrink: 0 }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span style={{
        fontSize: style.fontSize,
        fontWeight: '700',
        color: '#D4AF37',
        lineHeight: 1
      }}>
        {score}
      </span>
      {showTooltip && size !== 'small' && (
        <span style={{
          fontSize: '10px',
          color: '#9AA0A6',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginLeft: '2px'
        }}>
          BoL
        </span>
      )}
    </div>
  );
}
