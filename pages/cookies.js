import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy | The Best in London</title>
        <meta name="description" content="Cookie policy and tracking information for The Best in London." />
        <link rel="canonical" href="https://thebestinlondon.co.uk/cookies" />
      </Head>

      <div style={{ minHeight: '100vh', background: theme.colors.bg.primary, color: theme.colors.text.primary }}>
        
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`, padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ fontFamily: theme.typography.serif, fontSize: '20px', fontWeight: 700, color: theme.colors.text.primary }}>
                The Best in London
              </div>
            </Link>
          </div>
        </nav>

        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px' }}>
          <h1 style={{ fontFamily: theme.typography.serif, fontSize: '42px', fontWeight: 700, marginBottom: '32px' }}>
            Cookie Policy
          </h1>

          <div style={{ fontSize: '16px', lineHeight: 1.7, color: theme.colors.text.secondary }}>
            
            <p style={{ marginBottom: '24px' }}>
              <strong>Last updated:</strong> October 16, 2025
            </p>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device when you visit our website. They help us provide you 
                with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                How We Use Cookies
              </h2>
              
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '12px', marginTop: '24px' }}>
                Essential Cookies
              </h3>
              <p style={{ marginBottom: '16px' }}>
                These cookies are necessary for the website to function properly. They enable basic functions like 
                page navigation and access to secure areas.
              </p>

              <h3 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '12px', marginTop: '24px' }}>
                Analytics Cookies
              </h3>
              <p style={{ marginBottom: '16px' }}>
                We use analytics cookies to understand how visitors interact with our website. This helps us improve 
                our service and content.
              </p>
            </section>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                Managing Cookies
              </h2>
              <p>
                You can control and manage cookies through your browser settings. Please note that blocking all cookies 
                may impact your experience on our website and limit certain functionality.
              </p>
            </section>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                Contact Us
              </h2>
              <p>
                If you have questions about our Cookie Policy, please contact us via our website.
              </p>
            </section>

          </div>

          <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: `1px solid ${theme.colors.border.subtle}` }}>
            <Link href="/privacy" style={{ color: theme.colors.accent.gold, textDecoration: 'none', marginRight: '32px' }}>
              Privacy Policy →
            </Link>
            <Link href="/terms" style={{ color: theme.colors.accent.gold, textDecoration: 'none' }}>
              Terms of Service →
            </Link>
          </div>

        </main>

      </div>
    </>
  );
}
