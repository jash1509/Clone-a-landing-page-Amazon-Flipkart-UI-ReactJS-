import { useState } from 'react';
import { X, CreditCard, Sparkles, Send, Award, Gift, CheckCircle } from 'lucide-react';

const CARD_THEMES = [
  { id: 'classic', label: 'Classic Vibe', bg: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', text: '#ffffff' },
  { id: 'birthday', label: 'Birthday Gold', bg: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)', text: '#ffffff' },
  { id: 'anniversary', label: 'Anniversary Ruby', bg: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', text: '#ffffff' },
  { id: 'thankyou', label: 'Thanks Teal', bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', text: '#ffffff' }
];

export default function GiftCardsModal({ isOpen, onClose, walletBalance, setWalletBalance, triggerToast, currentUser }) {
  const [selectedTheme, setSelectedTheme] = useState('classic');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftAmount, setGiftAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [senderName, setSenderName] = useState(currentUser ? currentUser.name : '');
  const [giftMessage, setGiftMessage] = useState('');
  
  // Redeem code states
  const [voucherCode, setVoucherCode] = useState('');
  
  if (!isOpen) return null;

  const currentTheme = CARD_THEMES.find(t => t.id === selectedTheme) || CARD_THEMES[0];
  const finalAmount = giftAmount === 'custom' ? Number(customAmount) : Number(giftAmount);

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!recipientEmail) {
      triggerToast('Please provide a recipient email.', 'info');
      return;
    }
    if (isNaN(finalAmount) || finalAmount <= 0) {
      triggerToast('Please enter a valid gift amount.', 'info');
      return;
    }

    triggerToast(`Success! ₹${finalAmount.toLocaleString('en-IN')} Gift Card sent to ${recipientEmail}`, 'success');
    
    // Reset fields
    setRecipientEmail('');
    setCustomAmount('');
    setGiftMessage('');
  };

  const handleRedeem = (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) {
      triggerToast('Please enter a voucher code.', 'info');
      return;
    }

    const code = voucherCode.trim().toUpperCase();
    let addValue = 0;

    if (code === 'WELCOME1000') {
      addValue = 1000;
    } else if (code === 'VIBE500') {
      addValue = 500;
    } else if (code === 'FESTIVE250') {
      addValue = 250;
    } else if (code.startsWith('VIBE-') && code.length >= 9) {
      // Simulate random voucher codes
      addValue = Math.floor(100 + Math.random() * 900);
    } else {
      triggerToast('Invalid or expired voucher code.', 'info');
      return;
    }

    setWalletBalance(prev => prev + addValue);
    triggerToast(`Redeemed! ₹${addValue} added to your Wallet balance.`, 'success');
    setVoucherCode('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container giftcards-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="gc-header">
          <div className="header-icon"><Gift size={28} /></div>
          <h2>Gift Cards & <span>Wallet</span></h2>
          <p>Purchase custom digital gift cards or redeem gift vouchers into your account</p>
        </div>

        <div className="gc-layout">
          {/* Left panel: Wallet Status & Redeem */}
          <div className="gc-wallet-panel">
            <div className="wallet-card">
              <span className="card-label">SHOPVIBE virtual WALLET</span>
              <div className="wallet-balance">
                <span className="symbol">₹</span>
                <span className="value">{walletBalance.toLocaleString('en-IN')}</span>
              </div>
              <span className="card-user">{currentUser ? currentUser.name : 'Guest User'}</span>
              <div className="chip"></div>
            </div>

            {/* Quick Promo Info */}
            <div className="promo-codes-banner">
              <h5>🏷️ Testing Promo Codes Available:</h5>
              <div className="codes-list">
                <div><code>WELCOME1000</code> <span>(Get ₹1,000 cash)</span></div>
                <div><code>VIBE500</code> <span>(Get ₹500 cash)</span></div>
                <div><code>FESTIVE250</code> <span>(Get ₹250 cash)</span></div>
              </div>
            </div>

            {/* Redeem Voucher Form */}
            <form onSubmit={handleRedeem} className="redeem-voucher-form">
              <h3>Redeem a Gift Card / Voucher</h3>
              <p>Enter your 10-digit voucher claim code to transfer balance directly to your wallet.</p>
              <div className="redeem-input-row">
                <input
                  type="text"
                  placeholder="e.g. WELCOME1000"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button type="submit">Redeem Code</button>
              </div>
            </form>
          </div>

          {/* Right panel: Purchase Gift Card */}
          <form onSubmit={handlePurchase} className="gc-purchase-panel">
            <h3>Buy a Digital Gift Card</h3>
            
            {/* Template Card Preview */}
            <div 
              className="gift-card-preview" 
              style={{ background: currentTheme.bg, color: currentTheme.text }}
            >
              <div className="preview-header">
                <span>ShopVibe</span>
                <Sparkles size={16} />
              </div>
              <div className="preview-middle">
                <span className="preview-card-title">{currentTheme.label}</span>
                <span className="preview-amount">₹{(finalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="preview-footer">
                <span>{senderName ? `From: ${senderName}` : 'From: Friend'}</span>
                <span>E-Gift Card</span>
              </div>
            </div>

            {/* Theme Selectors */}
            <div className="theme-selector-group">
              <label>Select Card Theme:</label>
              <div className="themes-grid">
                {CARD_THEMES.map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    className={`theme-btn ${selectedTheme === theme.id ? 'active' : ''}`}
                    onClick={() => setSelectedTheme(theme.id)}
                    style={{ background: theme.bg }}
                    title={theme.label}
                  />
                ))}
              </div>
            </div>

            {/* Purchase Form Fields */}
            <div className="form-group">
              <label htmlFor="gc-email">Recipient Email *</label>
              <input
                id="gc-email"
                type="email"
                placeholder="friend@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-row-two">
              <div className="form-group">
                <label>Gift Card Amount *</label>
                <select
                  value={giftAmount}
                  onChange={(e) => setGiftAmount(e.target.value)}
                >
                  <option value="500">₹500</option>
                  <option value="1000">₹1,000</option>
                  <option value="2000">₹2,000</option>
                  <option value="5000">₹5,000</option>
                  <option value="custom">Custom Amount</option>
                </select>
              </div>
              
              {giftAmount === 'custom' && (
                <div className="form-group">
                  <label htmlFor="gc-custom-amount">Enter Amount (₹) *</label>
                  <input
                    id="gc-custom-amount"
                    type="number"
                    min="100"
                    max="50000"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gc-sender">Your Name</label>
              <input
                id="gc-sender"
                type="text"
                placeholder="Your Name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gc-msg">Personal Message</label>
              <textarea
                id="gc-msg"
                placeholder="Wishing you a wonderful celebration! Happy shopping!"
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                rows="2"
              />
            </div>

            <button type="submit" className="purchase-submit-btn">
              <Send size={16} /> Purchase E-Gift Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
