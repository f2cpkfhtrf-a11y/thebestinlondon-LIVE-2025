import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';

export default function Custom404() {
  const suggestions = [
    { name: 'Best Indian Restaurants', href: '/indian-restaurants-london', emoji: '🍛' },
    { name: 'Restaurants in Shoreditch', href: '/restaurants-shoreditch', emoji: '📍' },
    { name: 'Best Halal Restaurants', href: '/best-halal-restaurants-london', emoji: '☪️' },
    { name: 'Restaurants in Soho', href: '/restaurants-soho', emoji: '📍' },
    { name: 'Best Vegan Restaurants', href: '/vegan-restaurants-london', emoji: '🌱' },
    { name: 'Browse All Restaurants', href: '/restaurants', emoji: '🍽️' },
  ];

  return (
    <>
      <Head>
        <title>Page Not Found | The Best in London</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        background: theme.colors.bg.primary, 
        color: theme.colors.text.primary,
        fontFamily: theme.typography.sans,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '600px', textAlign: 'center' }}>
          
          <div style={{ fontSize: '120px', marginBottom: theme.spacing['2xl'] }}>🍽️</div>
          
          <h1 style={{
            fontFamily: theme.typography.serif,
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: theme.spacing.lg,
            color: theme.colors.text.primary
          }}>
            Page Not Found
          </h1>

          <p style={{
            fontSize: '18px',
            color: theme.colors.text.secondary,
            lineHeight: 1.6,
            marginBottom: theme.spacing['3xl']
          }}>
            We couldn't find that page, but London has plenty of amazing restaurants waiting for you.
          </p>

          <div style={{ marginBottom: theme.spacing['4xl'] }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: `${theme.spacing.md} ${theme.spacing['2xl']}`,
                background: theme.colors.text.primary,
                color: theme.colors.text.inverse,
                border: 'none',
                borderRadius: theme.radius.sm,
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: `all ${theme.motion.fast}`
              }}>
                Back to Homepage
              </button>
            </Link>
          </div>

          <div style={{ textAlign: 'left' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: theme.spacing.lg,
              color: theme.colors.text.primary
            }}>
              Try these instead:
            </h2>

            <div style={{ display: 'grid', gap: theme.spacing.md }}>
              {suggestions.map(item => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: theme.colors.bg.elevated,
                    border: `1px solid ${theme.colors.border.subtle}`,
                    borderRadius: theme.radius.md,
                    padding: theme.spacing.lg,
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                    transition: `all ${theme.motion.fast}`,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.border.prominent;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.colors.border.subtle;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}>
                    <span style={{ fontSize: '24px' }}>{item.emoji}</span>
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: 500,
                      color: theme.colors.text.primary 
                    }}>
                      {item.name}
                    </span>
                    <span style={{ 
                      marginLeft: 'auto',
                      color: theme.colors.text.secondary 
                    }}>
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
