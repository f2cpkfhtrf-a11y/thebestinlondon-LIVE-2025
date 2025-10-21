import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';

import Header from '../components/Header';
import Footer from '../components/Footer';
export default function BestCoffeeShopsLondon() {
  return (
    <>
      <Head>
        <title>Best Coffee Shops in London 2025 | Specialty Coffee & Roasters</title>
        <meta name="description" content="Discover London's best coffee shops and specialty roasters. From flat whites to pour-overs. Real reviews, FSA verified. Updated daily." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://thebestinlondon.co.uk/best-coffee-shops-london" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-black">
        
        <Header />

        <Header />

        <header style={{ padding: '80px 20px', background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.elevated} 100%)`, borderBottom: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212, 175, 55, 0.1)', padding: '8px 16px', borderRadius: theme.radius.sm, marginBottom: theme.spacing.lg, border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <span style={{ fontSize: '20px' }}>☕</span>
              <span style={{ color: theme.colors.accent.gold, fontWeight: 600, fontSize: '14px' }}>COMING SOON</span>
            </div>

            <h1 style={{ fontFamily: theme.typography.serif, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: theme.spacing.lg }}>
              Best Coffee Shops in London
            </h1>

            <p style={{ fontSize: '18px', color: theme.colors.text.secondary, lineHeight: 1.6, maxWidth: '800px' }}>
              We're curating London's finest coffee shops, from third-wave roasters to classic espresso bars. This page will feature 50+ verified coffee shops with FSA ratings and real reviews.
            </p>
          </div>
        </header>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
          <h2 style={{ fontFamily: theme.typography.serif, fontSize: '32px', fontWeight: 700, marginBottom: theme.spacing['2xl'], textAlign: 'center' }}>
            Explore Our Other Collections
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.lg, maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/best-cafes-london" style={{ textDecoration: 'none', padding: theme.spacing.xl, background: theme.colors.bg.elevated, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: theme.radius.md, color: theme.colors.text.primary, transition: 'all 0.2s', display: 'block' }}>
              ☕ Best Cafés
            </Link>
            <Link href="/indian-restaurants-london" style={{ textDecoration: 'none', padding: theme.spacing.xl, background: theme.colors.bg.elevated, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: theme.radius.md, color: theme.colors.text.primary, transition: 'all 0.2s', display: 'block' }}>
              🍛 Indian Restaurants
            </Link>
            <Link href="/restaurants-shoreditch" style={{ textDecoration: 'none', padding: theme.spacing.xl, background: theme.colors.bg.elevated, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: theme.radius.md, color: theme.colors.text.primary, transition: 'all 0.2s', display: 'block' }}>
              📍 Shoreditch
            </Link>
          </div>
        </main>

        <Footer />

      </div>
    </>
  );
}
