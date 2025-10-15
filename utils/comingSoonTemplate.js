// COMING SOON PAGE TEMPLATE GENERATOR
// Creates consistent "coming soon" pages for new categories

import { theme } from '../utils/theme';

export function generateComingSoonPage({ 
  title, 
  description, 
  h1, 
  emoji, 
  intro, 
  relatedLinks 
}) {
  return {
    Head: { title, description, robots: 'noindex,follow' },
    content: { h1, emoji, intro, relatedLinks }
  };
}

export const comingSoonTemplate = (props) => `
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';

export default function ComingSoonPage() {
  return (
    <>
      <Head>
        <title>${props.title}</title>
        <meta name="description" content="${props.description}" />
        <meta name="robots" content="noindex,follow" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary, fontFamily: theme.typography.sans }}>
        
        {/* Navigation */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(12px)',
          borderBottom: \`1px solid \${theme.colors.border.subtle}\`, padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>
                The Best in London
              </div>
            </Link>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <nav style={{ background: theme.colors.bg.elevated, borderBottom: \`1px solid \${theme.colors.border.subtle}\`, padding: '12px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', fontSize: '13px', color: theme.colors.text.secondary }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: theme.colors.border.prominent }}>/</span>
            <span style={{ color: theme.colors.text.primary, fontWeight: 500 }}>${props.breadcrumb}</span>
          </div>
        </nav>

        {/* Hero */}
        <header style={{ padding: '80px 20px', background: \`linear-gradient(135deg, \${theme.colors.bg.primary} 0%, \${theme.colors.bg.elevated} 100%)\`, borderBottom: \`1px solid \${theme.colors.border.subtle}\` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212, 175, 55, 0.1)', padding: '8px 16px', borderRadius: theme.radius.sm, marginBottom: theme.spacing.lg, border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <span style={{ fontSize: '20px' }}>${props.emoji}</span>
              <span style={{ color: theme.colors.accent.gold, fontWeight: 600, fontSize: '14px' }}>COMING SOON</span>
            </div>

            <h1 style={{ fontFamily: theme.typography.serif, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: theme.spacing.lg }}>
              ${props.h1}
            </h1>

            <p style={{ fontSize: '18px', color: theme.colors.text.secondary, lineHeight: 1.6, maxWidth: '800px' }}>
              ${props.intro}
            </p>
          </div>
        </header>

        {/* Related Links */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
          <h2 style={{ fontFamily: theme.typography.serif, fontSize: '32px', fontWeight: 700, marginBottom: theme.spacing['2xl'], textAlign: 'center' }}>
            Explore Our Other Collections
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.lg, maxWidth: '800px', margin: '0 auto' }}>
            ${props.links.map(link => \`
              <Link href="\${link.href}" style={{ textDecoration: 'none', padding: theme.spacing.xl, background: theme.colors.bg.elevated, border: \\\`1px solid \\\${theme.colors.border.subtle}\\\`, borderRadius: theme.radius.md, color: theme.colors.text.primary }}>
                \${link.text}
              </Link>
            \`).join('')}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ background: theme.colors.bg.primary, padding: \`\${theme.spacing['4xl']} 0 \${theme.spacing['2xl']}\`, borderTop: \`1px solid \${theme.colors.border.subtle}\` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center', fontSize: '13px', color: theme.colors.text.secondary }}>
            <p style={{ margin: 0 }}>© 2025 The Best in London. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
`;
