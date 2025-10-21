import { useState } from 'react';

/**
 * Social sharing buttons component
 * Supports: Facebook, Twitter, WhatsApp, LinkedIn, Copy Link
 */
export default function SocialShareButtons({ url, title, description, image }) {
  const [copied, setCopied] = useState(false);

  // Use canonical URL if available, otherwise construct from current location
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || 'The Best in London';
  const shareDescription = description || 'Discover the best restaurants in London';
  const shareImage = image || 'https://www.thebestinlondon.co.uk/logo.svg';

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedDescription = encodeURIComponent(shareDescription);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track in analytics
      if (window.gtag) {
        window.gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'restaurant',
          item_id: shareUrl
        });
      }
    }
  };

  const handleShare = (platform) => {
    const shareUrl = shareLinks[platform];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      
      // Track in analytics
      if (window.gtag) {
        window.gtag('event', 'share', {
          method: platform,
          content_type: 'restaurant',
          item_id: shareUrl
        });
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ color: '#9AA0A6', fontSize: '14px', marginRight: '8px' }}>Share:</span>
      
      {/* Facebook */}
      <button
        onClick={() => handleShare('facebook')}
        aria-label="Share on Facebook"
        style={{
          background: '#1877F2',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        onMouseOver={(e) => e.target.style.opacity = '0.9'}
        onMouseOut={(e) => e.target.style.opacity = '1'}
      >
        <span>f</span>
        <span>Facebook</span>
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShare('twitter')}
        aria-label="Share on Twitter"
        style={{
          background: '#1DA1F2',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        onMouseOver={(e) => e.target.style.opacity = '0.9'}
        onMouseOut={(e) => e.target.style.opacity = '1'}
      >
        <span>🐦</span>
        <span>Twitter</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => handleShare('whatsapp')}
        aria-label="Share on WhatsApp"
        style={{
          background: '#25D366',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        onMouseOver={(e) => e.target.style.opacity = '0.9'}
        onMouseOut={(e) => e.target.style.opacity = '1'}
      >
        <span>💬</span>
        <span>WhatsApp</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        style={{
          background: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: '6px',
          padding: '8px 16px',
          color: '#D4AF37',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#2A2A2A';
          e.target.style.borderColor = '#D4AF37';
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#1A1A1A';
          e.target.style.borderColor = '#2A2A2A';
        }}
      >
        <span>{copied ? '✓' : '🔗'}</span>
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}

