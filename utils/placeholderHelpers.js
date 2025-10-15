/**
 * EMERGENCY FALLBACK - Better placeholder system
 * Use until Google Places API is configured
 * 
 * This creates venue-specific gradients with proper icons
 * Better than random images that don't match!
 */

/**
 * Generate a consistent gradient for each venue
 * Based on venue name hash - same venue = same gradient
 */
export function getVenueGradient(venue, category = 'default') {
  const name = venue.name || 'Restaurant';
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Category-specific color schemes
  const colorSchemes = {
    vegan: [
      ['#10b981', '#059669'], // Green
      ['#34d399', '#10b981'], // Light green
      ['#059669', '#047857'], // Dark green
      ['#6ee7b7', '#34d399'], // Mint
    ],
    vegetarian: [
      ['#16a34a', '#15803d'], // Forest green
      ['#22c55e', '#16a34a'], // Bright green
      ['#4ade80', '#22c55e'], // Light lime
      ['#15803d', '#166534'], // Deep green
    ],
    halal: [
      ['#f59e0b', '#d97706'], // Amber/Gold
      ['#fbbf24', '#f59e0b'], // Golden
      ['#d97706', '#b45309'], // Deep amber
      ['#fcd34d', '#fbbf24'], // Light gold
    ],
    landmark: [
      ['#3b82f6', '#2563eb'], // Blue
      ['#60a5fa', '#3b82f6'], // Sky blue
      ['#2563eb', '#1d4ed8'], // Deep blue
      ['#93c5fd', '#60a5fa'], // Light blue
    ],
    default: [
      ['#8b5cf6', '#7c3aed'], // Purple
      ['#a78bfa', '#8b5cf6'], // Light purple
      ['#7c3aed', '#6d28d9'], // Deep purple
      ['#c4b5fd', '#a78bfa'], // Lavender
    ]
  };
  
  const colors = colorSchemes[category] || colorSchemes.default;
  const colorIndex = hash % colors.length;
  const [color1, color2] = colors[colorIndex];
  
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

/**
 * Get category-appropriate emoji/icon
 */
export function getCategoryIcon(category) {
  const icons = {
    vegan: '🌱',
    vegetarian: '🥗',
    halal: '🥘',
    landmark: '🎡',
    default: '🍽️'
  };
  
  return icons[category] || icons.default;
}

/**
 * Create a better placeholder with venue info
 * Shows: Gradient + Icon + Initial Letter
 */
export function getVenuePlaceholder(venue, category = 'default') {
  const gradient = getVenueGradient(venue, category);
  const icon = getCategoryIcon(category);
  const initial = venue.name ? venue.name[0].toUpperCase() : '?';
  
  return {
    type: 'placeholder',
    gradient,
    icon,
    initial,
    alt: `${venue.name} - ${category} restaurant`
  };
}
