// Best of London Score Badge Component
import { calculateBestOfLondonScore } from '../utils/halalStations';

export default function BestOfLondonBadge({ venue, size = 'medium', showTooltip = true, showExplanation = false }) {
  const score = calculateBestOfLondonScore(venue);
  
  const sizes = {
    small: { padding: '4px 10px', fontSize: '12px', iconSize: '12px' },
    medium: { padding: '6px 12px', fontSize: '14px', iconSize: '14px' },
    large: { padding: '8px 16px', fontSize: '16px', iconSize: '16px' }
  };
  
  const style = sizes[size];
  
  const getScoreColor = (score) => {
    if (score >= 4.5) return '#10B981'; // Green for excellent
    if (score >= 4.0) return '#D4AF37'; // Gold for very good
    if (score >= 3.5) return '#F59E0B'; // Orange for good
    return '#6B7280'; // Gray for average
  };
  
  const getScoreLabel = (score) => {
    if (score >= 4.5) return 'Exceptional';
    if (score >= 4.0) return 'Outstanding';
    if (score >= 3.5) return 'Excellent';
    if (score >= 3.0) return 'Very Good';
    return 'Good';
  };
  
  return (
    <div 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: size === 'large' ? '12px 20px' : style.padding,
        background: `linear-gradient(135deg, ${getScoreColor(score)} 0%, ${getScoreColor(score)}CC 100%)`,
        border: `2px solid ${getScoreColor(score)}`,
        borderRadius: size === 'large' ? '12px' : '8px',
        position: 'relative',
        cursor: showTooltip ? 'help' : 'default',
        boxShadow: `0 4px 12px ${getScoreColor(score)}30`,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}
      title={showTooltip ? `Best of London Score: ${score}/5.0 - ${getScoreLabel(score)} rating based on Google reviews (60%), review quality (20%), and FSA hygiene (20%)` : ''}
    >
      <svg 
        width={size === 'large' ? '20px' : style.iconSize} 
        height={size === 'large' ? '20px' : style.iconSize} 
        viewBox="0 0 24 24" 
        fill="#FFFFFF"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span style={{
        fontSize: size === 'large' ? '18px' : style.fontSize,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 1,
        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
      }}>
        {score}
      </span>
      {showTooltip && size !== 'small' && (
        <span style={{
          fontSize: size === 'large' ? '12px' : '10px',
          color: '#FFFFFF',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginLeft: '4px',
          opacity: 0.9
        }}>
          BoL
        </span>
      )}
      {showExplanation && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '12px',
          background: '#0B0B0B',
          border: '2px solid #2A2A2A',
          borderRadius: '12px',
          padding: '16px 20px',
          fontSize: '14px',
          color: '#FAFAFA',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          fontWeight: '600'
        }}>
          <div style={{ fontWeight: '700', color: '#D4AF37', marginBottom: '6px', fontSize: '16px' }}>
            {getScoreLabel(score)} ({score}/5.0)
          </div>
          <div style={{ fontSize: '12px', color: '#9AA0A6' }}>Google: 60% • Reviews: 20% • FSA: 20%</div>
        </div>
      )}
    </div>
  );
}
