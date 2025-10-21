/**
 * Newsletter Subscription API
 * Supports multiple providers: Mailchimp, ConvertKit, or local storage
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, location } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  // Get provider from environment
  const provider = process.env.NEWSLETTER_PROVIDER || 'local';
  const apiKey = process.env.NEWSLETTER_API_KEY;
  const listId = process.env.NEWSLETTER_LIST_ID || process.env.MAILCHIMP_AUDIENCE_ID;

  try {
    let result;

    switch (provider.toLowerCase()) {
      case 'mailchimp':
        result = await subscribeToMailchimp(email, listId, apiKey, location);
        break;
      
      case 'convertkit':
        result = await subscribeToConvertKit(email, apiKey, location);
        break;
      
      case 'local':
      default:
        result = await saveLocalSubscription(email, location);
        break;
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed!',
      provider: result.provider
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      error: error.message || 'Subscription failed. Please try again.' 
    });
  }
}

/**
 * Mailchimp Integration
 */
async function subscribeToMailchimp(email, audienceId, apiKey, location) {
  if (!apiKey || !audienceId) {
    throw new Error('Mailchimp API key and Audience ID required');
  }

  // Extract server prefix from API key (e.g., "abc123def456-us1")
  const serverPrefix = apiKey.split('-').pop();
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        SIGNUP_LOC: location || 'unknown'
      },
      tags: ['website-signup']
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle "already subscribed" gracefully
    if (data.title === 'Member Exists') {
      return { provider: 'mailchimp', status: 'already_subscribed' };
    }
    throw new Error(data.detail || 'Mailchimp subscription failed');
  }

  return { provider: 'mailchimp', status: 'subscribed', id: data.id };
}

/**
 * ConvertKit Integration
 */
async function subscribeToConvertKit(email, apiKey, location) {
  if (!apiKey) {
    throw new Error('ConvertKit API key required');
  }

  const formId = process.env.CONVERTKIT_FORM_ID;
  
  // Use form ID if available, otherwise use subscriber endpoint
  const url = formId 
    ? `https://api.convertkit.com/v3/forms/${formId}/subscribe`
    : `https://api.convertkit.com/v3/subscribers`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: apiKey,
      email: email,
      fields: {
        signup_location: location || 'unknown'
      }
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'ConvertKit subscription failed');
  }

  return { provider: 'convertkit', status: 'subscribed', id: data.subscription?.subscriber?.id };
}

/**
 * Local Storage (fallback - stores in JSON file)
 * For production, consider using a database
 */
async function saveLocalSubscription(email, location) {
  const fs = require('fs');
  const path = require('path');
  
  const subscriptionsFile = path.join(process.cwd(), 'data', 'newsletter-subscriptions.json');
  
  // Ensure data directory exists
  const dataDir = path.dirname(subscriptionsFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Load existing subscriptions
  let subscriptions = [];
  if (fs.existsSync(subscriptionsFile)) {
    try {
      const content = fs.readFileSync(subscriptionsFile, 'utf8');
      subscriptions = JSON.parse(content);
    } catch (error) {
      console.warn('Error reading subscriptions file:', error);
    }
  }

  // Check if email already exists
  const exists = subscriptions.some(sub => sub.email === email);
  if (exists) {
    return { provider: 'local', status: 'already_subscribed' };
  }

  // Add new subscription
  subscriptions.push({
    email,
    location: location || 'unknown',
    subscribedAt: new Date().toISOString()
  });

  // Save to file
  fs.writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));

  return { provider: 'local', status: 'subscribed', count: subscriptions.length };
}

