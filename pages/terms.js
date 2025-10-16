import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service | The Best in London</title>
        <meta name="description" content="Terms and conditions for using The Best in London restaurant directory." />
        <link rel="canonical" href="https://thebestinlondon.co.uk/terms" />
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
            Terms of Service
          </h1>

          <div style={{ fontSize: '16px', lineHeight: 1.7, color: theme.colors.text.secondary }}>
            
            <p style={{ marginBottom: '24px' }}>
              <strong>Last updated:</strong> October 16, 2025
            </p>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using The Best in London ("the Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                2. Service Description
              </h2>
              <p>
                The Best in London is a restaurant directory and information service. We aggregate data from public sources 
                including Google Places API, Food Standards Agency, and other third-party platforms. All information is 
                provided for informational purposes only.
              </p>
            </section>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                3. Information Accuracy
              </h2>
              <p>
                While we strive to keep information accurate and up-to-date, we cannot guarantee the completeness, 
                accuracy, or timeliness of restaurant listings, ratings, or other data. Users should verify critical 
                information directly with the restaurants.
              </p>
            </section>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                4. Limitation of Liability
              </h2>
              <p>
                The Best in London shall not be liable for any damages arising from the use or inability to use the 
                Service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </section>

            <section style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: theme.colors.text.primary, marginBottom: '16px' }}>
                5. Contact
              </h2>
              <p>
                For questions about these Terms of Service, please contact us via our website.
              </p>
            </section>

          </div>

          <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: `1px solid ${theme.colors.border.subtle}` }}>
            <Link href="/privacy" style={{ color: theme.colors.accent.gold, textDecoration: 'none', marginRight: '32px' }}>
              Privacy Policy →
            </Link>
            <Link href="/cookies" style={{ color: theme.colors.accent.gold, textDecoration: 'none' }}>
              Cookie Policy →
            </Link>
          </div>

        </main>

      </div>
    </>
  );
}
