import { useState } from 'react';
import { analytics } from '../utils/analytics';

/**
 * Newsletter Signup Component
 * Supports Mailchimp, ConvertKit, or custom API endpoint
 */
export default function NewsletterSignup({ 
  location = 'unknown',
  title = "Stay Updated",
  description = "Get weekly recommendations for London's best restaurants",
  variant = 'inline' // 'inline' | 'modal' | 'banner'
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, location })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! Check your email.');
        setEmail('');
        
        // Track conversion
        analytics.newsletterSignup(location);
        
        // Track in GA
        if (window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            event_category: 'Conversion',
            event_label: location
          });
        }

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  const baseStyles = variant === 'banner' 
    ? 'bg-gradient-to-r from-gold/20 to-black border-t border-gold/30'
    : variant === 'modal'
    ? 'bg-black-light border border-grey-dark'
    : 'bg-black-light border border-grey-dark';

  return (
    <div className={`${baseStyles} rounded-lg p-6 ${variant === 'banner' ? 'w-full' : ''}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-serif font-bold text-warmWhite mb-2">
            {title}
          </h3>
          <p className="text-grey text-sm">
            {description}
          </p>
          {status === 'success' && (
            <p className="text-green-400 text-sm mt-2">✓ {message}</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-2">✗ {message}</p>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 flex-1 md:flex-initial md:min-w-[320px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 bg-white/10 border border-grey-dark rounded-lg text-warmWhite placeholder-grey focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? '...' : status === 'success' ? '✓ Subscribed' : 'Subscribe'}
          </button>
        </form>
      </div>

      <p className="text-xs text-grey mt-3">
        Weekly digest • No spam • Unsubscribe anytime
      </p>
    </div>
  );
}

