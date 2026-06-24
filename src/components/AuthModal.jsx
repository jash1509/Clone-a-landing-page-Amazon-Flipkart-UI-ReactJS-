import { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, triggerToast }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Jash Barot',
      email: 'jash@example.com',
      phone: '+91 98765 43210',
      address: '123, Prime Street, Mumbai, Maharashtra - 400001',
      isPrime: true,
    };
    onLogin(demoUser);
    triggerToast('Logged in successfully as Jash Barot!', 'success');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      triggerToast('Please fill in all required fields.', 'info');
      return;
    }

    if (isSignUp && !name) {
      triggerToast('Please enter your name to sign up.', 'info');
      return;
    }

    const user = {
      name: isSignUp ? name : email.split('@')[0],
      email: email,
      phone: phone || '+91 99999 88888',
      address: 'Enter delivery address in your profile settings',
      isPrime: false,
    };

    onLogin(user);
    triggerToast(
      isSignUp ? 'Account created and logged in!' : `Welcome back, ${user.name}!`,
      'success'
    );
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="auth-header">
          <h2>Shop<span>Vibe</span></h2>
          <p>{isSignUp ? 'Create your new account' : 'Sign in to your account'}</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            <LogIn size={16} /> Sign In
          </button>
          <button
            className={`auth-tab ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            <UserPlus size={16} /> Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="auth-name">Full Name *</label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Email Address *</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="auth-phone">Mobile Number</label>
              <input
                id="auth-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-password">Password *</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>Or</span>
        </div>

        <button className="auth-demo-btn" onClick={handleDemoLogin}>
          Sign In as Demo User (Jash Barot)
        </button>

        <p className="auth-footer-text">
          By continuing, you agree to ShopVibe's Conditions of Use and Privacy Notice.
        </p>
      </div>
    </div>
  );
}
