# Newsletter Setup Guide

## Quick Start

The newsletter system supports **3 providers**:
1. **Mailchimp** (Recommended - free tier available)
2. **ConvertKit** (Great for content creators)
3. **Local Storage** (Fallback - stores in JSON file)

---

## Option 1: Mailchimp (Recommended)

### Steps:

1. **Sign up for Mailchimp** (if you don't have an account):
   - Go to: https://mailchimp.com/
   - Free tier: Up to 500 contacts, 1,000 emails/month

2. **Get your API Key**:
   - Mailchimp Dashboard → Account → Extras → API keys
   - Create new key if needed
   - Copy the API key (format: `abc123def456-us1`)

3. **Get your Audience ID**:
   - Mailchimp Dashboard → Audience → Settings → Audience name and defaults
   - Scroll down to find "Audience ID" (format: `abc123def4`)

4. **Add to Vercel Environment Variables**:
   ```bash
   NEWSLETTER_PROVIDER=mailchimp
   NEWSLETTER_API_KEY=your-api-key-here
   NEWSLETTER_LIST_ID=your-audience-id-here
   ```
   
   Or via Vercel Dashboard:
   - Project → Settings → Environment Variables
   - Add each variable above

5. **Test it**:
   - Visit your site and subscribe with a test email
   - Check Mailchimp dashboard to see the subscriber

---

## Option 2: ConvertKit

### Steps:

1. **Sign up for ConvertKit**: https://convertkit.com/

2. **Get API Key**:
   - ConvertKit → Settings → Advanced → API Secret
   - Copy the API Secret

3. **Create a Form** (optional but recommended):
   - ConvertKit → Forms → Create new form
   - Get the Form ID from the URL or form settings

4. **Add to Vercel Environment Variables**:
   ```bash
   NEWSLETTER_PROVIDER=convertkit
   NEWSLETTER_API_KEY=your-api-secret-here
   CONVERTKIT_FORM_ID=your-form-id-here  # Optional
   ```

---

## Option 3: Local Storage (Default)

### If no provider is configured:
- Subscriptions are saved to `data/newsletter-subscriptions.json`
- **Warning**: This file grows over time. For production, use Mailchimp or ConvertKit.
- You can manually export emails from the JSON file

### Exporting Local Subscriptions:
```bash
cat data/newsletter-subscriptions.json | jq '.[].email' > emails.txt
```

---

## Usage in Components

### Basic Usage:
```jsx
import NewsletterSignup from '../components/NewsletterSignup';

<NewsletterSignup 
  location="homepage"
  title="Get Weekly Recommendations"
  description="Best restaurants delivered weekly"
/>
```

### Variants:
- `variant="inline"` - Standard inline form (default)
- `variant="banner"` - Full-width banner style
- `variant="modal"` - Modal/popup style

---

## Analytics Tracking

The newsletter component automatically tracks:
- **Google Analytics**: `newsletter_signup` event
- **Custom Analytics**: `analytics.newsletterSignup(location)`

---

## Testing

1. **Local Testing** (default provider):
   - No setup needed
   - Subscriptions saved to `data/newsletter-subscriptions.json`

2. **Mailchimp Testing**:
   - Set environment variables
   - Subscribe with test email
   - Verify in Mailchimp dashboard

3. **ConvertKit Testing**:
   - Set environment variables
   - Subscribe with test email
   - Verify in ConvertKit dashboard

---

## Troubleshooting

### "Subscription failed"
- Check API keys are correct
- Verify environment variables are set in Vercel
- Check Mailchimp/ConvertKit dashboard for errors

### "Already subscribed"
- This is normal - the system prevents duplicates
- Shows success message to user

### "Network error"
- Check API endpoints are accessible
- Verify CORS settings if using custom provider

---

## Next Steps

1. **Set up Mailchimp** (recommended for production)
2. **Design email templates** in your email provider
3. **Send weekly digests** with new restaurant openings
4. **Track open rates** and optimize content

---

## Email Content Ideas

### Weekly Digest Template:
- **Top 3 New Openings** this week
- **Featured Restaurant** of the week
- **Seasonal Guide** (e.g., "Best Alfresco Dining")
- **Exclusive Offers** from restaurants
- **User Spotlight** (popular searches)

---

**Status**: ✅ Ready to use  
**Provider**: Configure via environment variables

