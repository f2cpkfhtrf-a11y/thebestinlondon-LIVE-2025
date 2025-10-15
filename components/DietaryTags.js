import { theme } from '../utils/theme';

export default function DietaryTags({ tags, size = 'default' }) {
  const tagConfig = {
    halal: { emoji: '☪️', label: 'Halal', color: '#059669' },
    vegan: { emoji: '🌱', label: 'Vegan', color: '#10B981' },
    vegetarian: { emoji: '🥗', label: 'Vegetarian', color: '#16A34A' },
    'gluten-free': { emoji: '🌾', label: 'Gluten Free', color: '#F59E0B' },
    'family-friendly': { emoji: '👨‍👩‍👧‍👦', label: 'Family Friendly', color: '#3B82F6' },
    michelin: { emoji: '⭐', label: 'Michelin', color: '#D4AF37' }
  };

  const sizes = {
    small: { padding: '4px 8px', fontSize: '11px' },
    default: { padding: '6px 10px', fontSize: '12px' },
    medium: { padding: '8px 12px', fontSize: '13px' }
  };

  const sizeStyle = sizes[size] || sizes.default;

  // Ensure tags is an array
  if (!tags || !Array.isArray(tags) || tags.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {tags.map(tag => {
        const config = tagConfig[tag];
        if (!config) return null;

        return (
          <div
            key={tag}
            style={{
              background: `${config.color}15`,
              border: `1px solid ${config.color}30`,
              color: config.color,
              padding: sizeStyle.padding,
              borderRadius: theme.radius.sm,
              fontSize: sizeStyle.fontSize,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{config.emoji}</span>
            <span>{config.label}</span>
          </div>
        );
      })}
    </div>
  );
}
