/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - BestDubai Inspired
        gold: '#D4AF37',
        charcoal: '#0E0E0E',
        warmWhite: '#F9F9F9',
        grey: '#B3B3B3',
        
        // Extended palette
        'gold-light': '#E6C85A',
        'gold-dark': '#B8941F',
        'charcoal-light': '#1A1A1A',
        'grey-light': '#D1D5DB',
        'grey-dark': '#6B7280',
        
        // BIL Score colors
        'score-high': '#10B981', // Green-gold for ≥ 8.5
        'score-mid': '#D4AF37',  // Neutral gold for mid
        'score-low': '#EF4444',  // Red tint for < 6
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        'nav': ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '32px'],
        '2xl': ['24px', '36px'],
        '3xl': ['30px', '40px'],
        '4xl': ['36px', '44px'],
        '5xl': ['48px', '56px'],
        '6xl': ['60px', '68px'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 8px 25px 0 rgba(212, 175, 55, 0.4)',
        'charcoal': '0 4px 14px 0 rgba(14, 14, 14, 0.5)',
        'charcoal-lg': '0 8px 25px 0 rgba(14, 14, 14, 0.6)',
        'score-glow': '0 0 20px rgba(212, 175, 55, 0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'score-pulse': 'scorePulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scorePulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
          '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #E6C85A 100%)',
        'gradient-score-high': 'linear-gradient(135deg, #10B981 0%, #D4AF37 100%)',
        'gradient-score-low': 'linear-gradient(135deg, #EF4444 0%, #D4AF37 100%)',
        'hero-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}
