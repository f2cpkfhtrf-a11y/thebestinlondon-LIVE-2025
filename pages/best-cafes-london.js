import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FSABadge from '../components/FSABadge';
import ReviewBadges from '../components/ReviewBadges';

export async function getStaticProps() {
  // Placeholder - will be populated with real cafe data
  const cafes = [];
  return { props: { venues: cafes }};
}

export default function BestCafesLondon({ venues }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArea, setFilterArea] = useState('all');

  const filtered = useMemo(() => {
    return venues.filter(v => {
      const matchesSearch = !searchTerm || v.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = filterArea === 'all' || v.area === filterArea;
      return matchesSearch && matchesArea;
    });
  }, [venues, searchTerm, filterArea]);

  return (
    <>
      <Head>
        <title>Best Cafés in London {new Date().getFullYear()} | 50+ Top Coffee Shops & Cafés</title>
        <meta name="description" content="Discover London's best cafés. From specialty coffee to all-day brunch spots. Real reviews, FSA verified. Updated daily." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-cafes-london" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-black">
        
        <Header />

        <Header />

        <header style={{ position: 'relative', padding: '80px 20px', background: `linear-gradient(135deg, ${theme.colors.bg.primary} 0%, ${theme.colors.bg.elevated} 100%)`, borderBottom: `1px solid ${theme.colors.border.subtle}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212, 175, 55, 0.1)', padding: '8px 16px', borderRadius: theme.radius.sm, marginBottom: theme.spacing.lg, border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <span style={{ fontSize: '20px' }}>☕</span>
              <span style={{ color: theme.colors.accent.gold, fontWeight: 600, fontSize: '14px' }}>COMING SOON</span>
            </div>

            <h1 style={{ fontFamily: theme.typography.serif, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: theme.spacing.lg }}>
              Best Cafés in London
            </h1>

            <div style={{ fontSize: '18px', color: theme.colors.text.secondary, lineHeight: 1.6, maxWidth: '800px', marginBottom: theme.spacing['2xl'] }}>
              <p style={{ marginBottom: theme.spacing.base }}>
                We're curating London's finest cafés, from specialty coffee roasters to cozy neighborhood spots. This page will feature 50+ verified cafés with FSA ratings, real reviews, and detailed information.
              </p>
              <p style={{ margin: 0 }}>
                Check back soon, or explore our restaurant collections below.
              </p>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: theme.typography.serif, fontSize: '32px', fontWeight: 700, marginBottom: theme.spacing['2xl'] }}>
              Explore Our Other Collections
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.lg, maxWidth: '800px', margin: '0 auto' }}>
              <Link href="/indian-restaurants-london" style={{ textDecoration: 'none', padding: theme.spacing.xl, background: theme.colors.bg.elevated, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: theme.radius.md, color: theme.colors.text.primary }}>
                🍛 Indian Restaurants
              </Link>
              <Link href="/best-coffee-shops-london" style={{ textDecoration: 'none', padding: theme.spacing.xl, background: theme.colors.bg.elevated, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: theme.radius.md, color: theme.colors.text.primary }}>
                ☕ Best Coffee Shops
              </Link>
              <Link href="/vegan-restaurants-london" style={{ textDecoration: 'none', padding: theme.spacing.xl, background: theme.colors.bg.elevated, border: `1px solid ${theme.colors.border.subtle}`, borderRadius: theme.radius.md, color: theme.colors.text.primary }}>
                🌱 Vegan Restaurants
              </Link>
            </div>
          </div>
        </main>

        <Footer />

      </div>
    </>
  );
}
