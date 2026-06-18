import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Success state
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <div className="newsletter-icon">
          <Mail size={36} />
        </div>
        <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
        <p className="newsletter-desc">
          Get weekly updates on hot deals, new releases, and special promotions sent directly to your inbox.
        </p>

        {!submitted ? (
          <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                style={{
                  borderColor: error ? 'var(--color-red)' : 'transparent',
                  outline: 'none'
                }}
              />
              {error && (
                <span style={{
                  color: '#ff8a8a',
                  fontSize: '0.75rem',
                  textAlign: 'left',
                  marginTop: '4px',
                  paddingLeft: '12px',
                  position: 'absolute',
                  bottom: '-20px'
                }}>
                  {error}
                </span>
              )}
            </div>
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        ) : (
          <div className="newsletter-success">
            <CheckCircle2 size={18} />
            <span>Thank you for subscribing! Check your inbox for updates.</span>
          </div>
        )}
      </div>
    </section>
  );
}
