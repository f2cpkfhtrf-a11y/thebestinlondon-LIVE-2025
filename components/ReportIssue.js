import { useState } from 'react';
import { theme } from '../utils/theme';

export default function ReportIssue({ venueId, venueName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const issueTypes = [
    { value: 'closed', label: 'Restaurant is closed' },
    { value: 'wrong-info', label: 'Incorrect information' },
    { value: 'wrong-location', label: 'Wrong location/address' },
    { value: 'inappropriate', label: 'Inappropriate content' },
    { value: 'duplicate', label: 'Duplicate listing' },
    { value: 'other', label: 'Other issue' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Store issue report
    const report = {
      venueId,
      venueName,
      issueType,
      description,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href
    };

    try {
      // Send to backend/queue
      await fetch('/api/report-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });

      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setIssueType('');
        setDescription('');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit report:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: 'transparent',
          border: `1px solid ${theme.colors.border.subtle}`,
          color: theme.colors.text.secondary,
          padding: '8px 16px',
          borderRadius: theme.radius.sm,
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: `all ${theme.motion.fast}`,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = theme.colors.border.prominent;
          e.currentTarget.style.color = theme.colors.text.primary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.colors.border.subtle;
          e.currentTarget.style.color = theme.colors.text.secondary;
        }}
      >
        <span>⚠️</span>
        <span>Report Issue</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div
            style={{
              background: theme.colors.bg.elevated,
              borderRadius: theme.radius.lg,
              padding: theme.spacing['2xl'],
              maxWidth: '500px',
              width: '100%',
              border: `1px solid ${theme.colors.border.subtle}`
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
                <div style={{ fontSize: '48px', marginBottom: theme.spacing.lg }}>✓</div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm 
                }}>
                  Thank you for your report
                </h3>
                <p style={{ fontSize: '14px', color: theme.colors.text.secondary, margin: 0 }}>
                  We'll review this issue shortly
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 600, 
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm 
                }}>
                  Report an Issue
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: theme.colors.text.secondary, 
                  marginBottom: theme.spacing.xl 
                }}>
                  Help us keep information accurate for <strong>{venueName}</strong>
                </p>

                <div style={{ marginBottom: theme.spacing.lg }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '13px', 
                    fontWeight: 500,
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing.sm 
                  }}>
                    Issue Type *
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: theme.colors.bg.primary,
                      border: `1px solid ${theme.colors.border.subtle}`,
                      borderRadius: theme.radius.sm,
                      color: theme.colors.text.primary,
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="">Select an issue...</option>
                    {issueTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: theme.spacing.xl }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '13px', 
                    fontWeight: 500,
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing.sm 
                  }}>
                    Additional Details
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us more about the issue..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: theme.colors.bg.primary,
                      border: `1px solid ${theme.colors.border.subtle}`,
                      borderRadius: theme.radius.sm,
                      color: theme.colors.text.primary,
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: theme.spacing.md }}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'transparent',
                      border: `1px solid ${theme.colors.border.subtle}`,
                      borderRadius: theme.radius.sm,
                      color: theme.colors.text.secondary,
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!issueType}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: issueType ? theme.colors.text.primary : theme.colors.border.subtle,
                      border: 'none',
                      borderRadius: theme.radius.sm,
                      color: issueType ? theme.colors.text.inverse : theme.colors.text.secondary,
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: issueType ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
