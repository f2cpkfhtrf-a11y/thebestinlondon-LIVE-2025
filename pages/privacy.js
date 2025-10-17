import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../utils/theme';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | The Best in London</title>
        <meta name="description" content="Privacy policy for The Best in London. Learn how we collect and use your data." />
        <link rel="canonical" href="https://thebestinlondon.co.uk/privacy" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        background: theme.colors.bg.primary, 
        color: theme.colors.text.primary,
        fontFamily: theme.typography.sans 
      }}>
        
        {/* Navigation */}
        <nav style={{
          background: 'rgba(17,17,17,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.colors.border.subtle}`,
          padding: '16px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ 
                fontFamily: theme.typography.serif, 
                fontSize: '20px', 
                fontWeight: 700, 
                color: theme.colors.text.primary 
              }}>
                The Best in London
              </div>
            </Link>
          </div>
        </nav>

        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px' }}>
          
          <h1 style={{
            fontFamily: theme.typography.serif,
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: theme.spacing['2xl'],
            color: theme.colors.text.primary
          }}>
            Privacy Policy
          </h1>

          <p style={{ fontSize: '14px', color: theme.colors.text.secondary, marginBottom: theme.spacing['4xl'] }}>
            Last updated: October 15, 2025
          </p>

          <div style={{ 
            fontSize: '16px', 
            lineHeight: 1.7, 
            color: theme.colors.text.primary,
            '& h2': { marginTop: theme.spacing['3xl'] }
          }}>
            
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              1. Introduction
            </h2>
            <p>
              The Best in London ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website thebestinlondon.co.uk.
            </p>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              2. Information We Collect
            </h2>
            <p>We collect information in the following ways:</p>
            <ul style={{ marginLeft: '20px', marginTop: theme.spacing.md }}>
              <li>Information you provide directly (e.g., contact forms, newsletter signups)</li>
              <li>Usage data collected automatically (e.g., pages visited, time spent on site)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              3. How We Use Your Information
            </h2>
            <p>We use collected information to:</p>
            <ul style={{ marginLeft: '20px', marginTop: theme.spacing.md }}>
              <li>Provide and improve our services</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Analyze site usage and trends</li>
              <li>Respond to your inquiries</li>
            </ul>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              4. Third-Party Services
            </h2>
            <p>
              We use third-party services including Google Analytics for analytics and Google Maps for location services. These services have their own privacy policies.
            </p>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              5. Data Sources & Accuracy
            </h2>
            <p>
              Restaurant data is sourced from official APIs including Google Places, Food Standards Agency (FSA), and TripAdvisor. Ratings and hygiene scores are subject to change. We update our database regularly but cannot guarantee real-time accuracy.
            </p>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              6. Venue Opt-Out
            </h2>
            <p>
              Restaurant owners can request removal or correction of their venue information by contacting us at hello@thebestinlondon.co.uk with verification of ownership.
            </p>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul style={{ marginLeft: '20px', marginTop: theme.spacing.md }}>
              <li>Access your personal data</li>
              <li>Request data deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Update your information</li>
            </ul>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              8. Cookies
            </h2>
            <p>
              We use essential cookies for site functionality and analytics cookies to understand user behavior. You can control cookie preferences through your browser settings.
            </p>

            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: theme.spacing['3xl'],
              marginBottom: theme.spacing.lg 
            }}>
              9. Contact Us
            </h2>
            <p>
              For privacy-related questions or requests, contact us at:<br />
              Email: hello@thebestinlondon.co.uk<br />
              Address: London, United Kingdom
            </p>

            <div style={{
              background: theme.colors.bg.elevated,
              border: `1px solid ${theme.colors.border.subtle}`,
              borderRadius: theme.radius.md,
              padding: theme.spacing.xl,
              marginTop: theme.spacing['4xl']
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: theme.spacing.md }}>
                Disclaimer
              </h3>
              <p style={{ fontSize: '14px', color: theme.colors.text.secondary, margin: 0 }}>
                All restaurant data, ratings, and hygiene scores are sourced from official third-party APIs and are subject to change. While we strive for accuracy, users should verify critical information directly with venues. Images may be illustrative and not represent the actual venue.
              </p>
            </div>

          </div>

        </main>

        <footer style={{ 
          background: theme.colors.bg.primary, 
          padding: `${theme.spacing['4xl']} 0 ${theme.spacing['2xl']}`, 
          borderTop: `1px solid ${theme.colors.border.subtle}` 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <div style={{ marginBottom: theme.spacing.lg }}>
              <Link href="/" style={{ color: theme.colors.text.secondary, textDecoration: 'none', marginRight: '20px' }}>
                Home
              </Link>
              <Link href="/privacy" style={{ color: theme.colors.text.secondary, textDecoration: 'none', marginRight: '20px' }}>
                Privacy
              </Link>
              <Link href="/terms" style={{ color: theme.colors.text.secondary, textDecoration: 'none' }}>
                Terms
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: theme.colors.text.secondary, margin: 0 }}>
              © 2025 The Best in London. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
