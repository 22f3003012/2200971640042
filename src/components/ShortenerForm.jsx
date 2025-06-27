import React, { useState } from 'react';

// Utility function to generate shortcode
const generateShortcode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Simple logger function
const logger = (module) => (message) => {
  console.log(`[${module}] ${message}`);
};

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!originalUrl) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Use in-memory storage instead of localStorage
    const existingLinks = window.shortLinks || {};
    const code = customCode || generateShortcode();

    if (existingLinks[code]) {
      setError('Shortcode already exists! Try another.');
      setIsLoading(false);
      return;
    }

    const minutes = validity ? parseInt(validity) : 30;
    const expiry = Date.now() + minutes * 60 * 1000;

    existingLinks[code] = { url: originalUrl, expiry, createdAt: Date.now(), visits: 0 };
    window.shortLinks = existingLinks;

    logger('ShortLinkStore')(`Created shortlink: ${code}`);

    setShortUrl(`${window.location.origin}/${code}`);
    setOriginalUrl('');
    setCustomCode('');
    setValidity('');
    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ebf8ff 0%, #e0e7ff 50%, #f3e8ff 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      maxWidth: '600px',
      margin: '0 auto',
      paddingTop: '50px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    iconContainer: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '16px',
      marginBottom: '24px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '16px',
      margin: '0'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#6b7280',
      maxWidth: '400px',
      margin: '0 auto'
    },
    card: {
      background: 'white',
      borderRadius: '24px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid #f3f4f6'
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    labelIcon: {
      marginRight: '8px',
      fontSize: '18px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      fontSize: '16px',
      color: '#1f2937',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    helpText: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '4px'
    },
    errorBox: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px'
    },
    errorText: {
      color: '#dc2626',
      fontSize: '0.875rem',
      margin: '0'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '1.125rem',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
    },
    buttonDisabled: {
      opacity: '0.7',
      cursor: 'not-allowed',
      transform: 'none'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    },
    resultCard: {
      background: 'white',
      borderRadius: '24px',
      boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
      padding: '32px',
      border: '1px solid #f3f4f6',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease-out'
    },
    successIcon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      background: '#dcfce7',
      borderRadius: '50%',
      marginBottom: '16px'
    },
    resultTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '16px'
    },
    urlContainer: {
      background: '#f9fafb',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    urlText: {
      color: '#2563eb',
      fontWeight: '500',
      fontSize: '1.125rem',
      textDecoration: 'none',
      cursor: 'pointer',
      flex: '1',
      marginRight: '16px',
      wordBreak: 'break-all'
    },
    copyButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      background: '#3b82f6',
      color: 'white',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    copyButtonSuccess: {
      background: '#10b981'
    },
    footer: {
      textAlign: 'center',
      marginTop: '48px',
      color: '#6b7280',
      fontSize: '0.875rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <span style={{color: 'white', fontSize: '32px'}}>🔗</span>
          </div>
          <h1 style={styles.title}>URL Shortener</h1>
          <p style={styles.subtitle}>
            Transform long URLs into short, shareable links with custom codes and expiration times
          </p>
        </div>

        {/* Main Form Card */}
        <div style={styles.card}>
          <div>
            {/* Original URL Input */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🔗</span>
                Original URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/very-long-url..."
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                style={styles.input}
              />
            </div>

            {/* Custom Code Input */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>#</span>
                Custom Shortcode (Optional)
              </label>
              <input
                type="text"
                placeholder="my-custom-code"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                style={styles.input}
              />
            </div>

            {/* Validity Input */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>⏰</span>
                Validity Period (Minutes)
              </label>
              <input
                type="number"
                placeholder="30"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                style={styles.input}
              />
              <p style={styles.helpText}>Leave empty for 30 minutes default</p>
            </div>

            {/* Error Message */}
            {error && (
              <div style={styles.errorBox}>
                <p style={styles.errorText}>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {})
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Shortening...
                </>
              ) : (
                <>
                  <span style={{marginRight: '8px', fontSize: '20px'}}>⚡</span>
                  Shorten URL
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result Card */}
        {shortUrl && (
          <div style={styles.resultCard}>
            <div style={styles.successIcon}>
              <span style={{color: '#16a34a', fontSize: '24px'}}>✓</span>
            </div>
            <h3 style={styles.resultTitle}>
              Your Short URL is Ready!
            </h3>
            
            <div style={styles.urlContainer}>
              <div 
                onClick={() => window.open(shortUrl, '_blank')}
                style={styles.urlText}
              >
                {shortUrl}
              </div>
              <button
                onClick={copyToClipboard}
                style={{
                  ...styles.copyButton,
                  ...(copied ? styles.copyButtonSuccess : {})
                }}
                onMouseEnter={(e) => {
                  if (!copied) e.target.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  if (!copied) e.target.style.backgroundColor = '#3b82f6';
                }}
              >
                {copied ? (
                  <>
                    <span style={{marginRight: '4px'}}>✓</span>
                    Copied!
                  </>
                ) : (
                  <>
                    <span style={{marginRight: '4px'}}>📋</span>
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <p style={{color: '#6b7280', margin: '0'}}>
              Click the link above to test it, or use the copy button to share it!
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <p style={{margin: '0'}}>
            Built with React • Powered by in-memory storage
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ShortenerForm;