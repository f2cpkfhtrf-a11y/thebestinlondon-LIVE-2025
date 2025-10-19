import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="theme-color" content="#D4AF37" />
      </Head>
      <div className="page-transition-wrapper">
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        .page-transition-wrapper {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Page fade transitions */
        @media (prefers-reduced-motion: no-preference) {
          .page-transition-wrapper {
            animation: fadeIn 0.3s ease-in-out;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default MyApp




