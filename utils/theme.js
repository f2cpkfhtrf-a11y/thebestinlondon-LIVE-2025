// GLOBAL DESIGN TOKENS
export const theme = {
  colors: {
    bg: {
      primary: '#0B0B0B',
      elevated: '#111111',
      hover: '#1A1A1A',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#9AA0A6',
      inverse: '#0B0B0B',
    },
    accent: {
      gold: '#D4AF37',
      success: '#10B981',
      error: '#EF4444',
    },
    border: {
      subtle: '#1F1F1F',
      prominent: '#2A2A2A',
    }
  },
  
  typography: {
    serif: '"Playfair Display", Georgia, serif',
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
    '5xl': '64px',
  },
  
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0,0,0,0.4)',
    md: '0 4px 16px rgba(0,0,0,0.5)',
    lg: '0 8px 32px rgba(0,0,0,0.6)',
  },
  
  motion: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
