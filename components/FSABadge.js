import { theme } from '../utils/theme';

export default function FSABadge({ rating, size = 'default', showLabel = true }) {
  const colors = {
    5: { bg: '#10B981', text: '#FFFFFF', label: 'Excellent' },
    4: { bg: '#059669', text: '#FFFFFF', label: 'Good' },
    3: { bg: '#F59E0B', text: '#FFFFFF', label: 'Satisfactory' },
    2: { bg: '#EF4444', text: '#FFFFFF', label: 'Improvement Needed' },
    1: { bg: '#DC2626', text: '#FFFFFF', label: 'Urgent Improvement' },
    0: { bg: '#6B7280', text: '#FFFFFF', label: 'Awaiting Inspection' }
  };

  const sizes = {
    small: { padding: '4px 8px', fontSize: '11px' },
    default: { padding: '6px 12px', fontSize: '13px' },
    large: { padding: '8px 16px', fontSize: '15px' }
  };

  const color = colors[rating] || colors[0];
  const sizeStyle = sizes[size] || sizes.default;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <div style={{
        background: color.bg,
        color: color.text,
        padding: sizeStyle.padding,
        borderRadius: theme.radius.sm,
        fontSize: sizeStyle.fontSize,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <span>FSA</span>
        <span style={{ fontWeight: 700 }}>{rating}</span>
        <span style={{ fontSize: '12px' }}>⭐</span>
      </div>
      {showLabel && size !== 'small' && (
        <span style={{
          fontSize: '12px',
          color: theme.colors.text.secondary,
          fontWeight: 500
        }}>
          {color.label}
        </span>
      )}
    </div>
  );
}
