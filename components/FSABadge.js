import { Shield } from 'lucide-react';

export default function FSABadge({ rating, variant = 'default', size = 'default' }) {
  if (!rating) return null;

  // Luxurious green with gold accents
  const getColors = () => {
    if (rating >= 4) return {
      bg: 'linear-gradient(135deg, #047857 0%, #065f46 100%)', // Rich emerald green
      border: '2px solid #D4AF37', // Gold border
      text: '#FAFAFA', // White text
      ratingText: '#FAFAFA', // White rating
      shadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.5)'
    };
    if (rating >= 3) return {
      bg: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', // Amber
      border: '2px solid #D4AF37',
      text: '#FAFAFA',
      ratingText: '#FAFAFA',
      shadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.5)'
    };
    return {
      bg: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', // Red
      border: '2px solid #D4AF37',
      text: '#FAFAFA',
      ratingText: '#FAFAFA',
      shadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.5)'
    };
  };

  const colors = getColors();

  // Card variant for image overlays - LUXURIOUS
  if (variant === 'card') {
    return (
      <div style={{
        background: colors.bg,
        border: colors.border,
        borderRadius: '10px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: colors.shadow,
        transition: 'all 0.3s ease'
      }}>
        <Shield 
          size={26} 
          color={colors.text}
          strokeWidth={2.5}
          fill="rgba(255, 255, 255, 0.2)"
          style={{ flexShrink: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{
            color: colors.text,
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            lineHeight: '1',
            fontFamily: 'Inter, sans-serif'
          }}>
            FSA Hygiene Rating
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '6px' }}>
            <span style={{
              color: colors.ratingText,
              fontSize: '28px',
              fontWeight: '800',
              lineHeight: '1',
              fontFamily: 'Inter, sans-serif'
            }}>
              {rating}
            </span>
            <span style={{
              color: colors.text,
              fontSize: '16px',
              fontWeight: '700',
              lineHeight: '1'
            }}>
              / 5
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant - LUXURIOUS
  return (
    <div style={{
      background: colors.bg,
      border: colors.border,
      borderRadius: '8px',
      padding: '10px 14px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: colors.shadow
    }}>
      <Shield 
        size={22} 
        color={colors.text}
        strokeWidth={2.5}
        fill="rgba(255, 255, 255, 0.2)"
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{
          color: colors.text,
          fontSize: '9px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          lineHeight: '1'
        }}>
          FSA Hygiene Rating
        </span>
        <span style={{
          color: colors.ratingText,
          fontSize: '22px',
          fontWeight: '800',
          lineHeight: '1',
          marginTop: '4px'
        }}>
          {rating}/5
        </span>
      </div>
    </div>
  );
}
