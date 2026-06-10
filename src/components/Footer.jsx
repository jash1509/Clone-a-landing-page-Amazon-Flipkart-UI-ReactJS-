import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Back to Top Bar */}
      <div className="footer-back-to-top" onClick={handleBackToTop}>
        Back to top
      </div>

      {/* Directory Links Grid */}
      <div className="footer-links-grid">
        <div>
          <h3 className="footer-column-title">Get to Know Us</h3>
          <ul className="footer-list">
            <li className="footer-list-item">Careers</li>
            <li className="footer-list-item">Blog</li>
            <li className="footer-list-item">About ShopVibe</li>
            <li className="footer-list-item">Investor Relations</li>
            <li className="footer-list-item">ShopVibe Devices</li>
            <li className="footer-list-item">ShopVibe Science</li>
          </ul>
        </div>

        <div>
          <h3 className="footer-column-title">Make Money with Us</h3>
          <ul className="footer-list">
            <li className="footer-list-item">Sell products on ShopVibe</li>
            <li className="footer-list-item">Sell on ShopVibe Business</li>
            <li className="footer-list-item">Sell apps on ShopVibe</li>
            <li className="footer-list-item">Become an Affiliate</li>
            <li className="footer-list-item">Advertise Your Products</li>
            <li className="footer-list-item">Self-Publish with Us</li>
          </ul>
        </div>

        <div>
          <h3 className="footer-column-title">ShopVibe Payment Products</h3>
          <ul className="footer-list">
            <li className="footer-list-item">ShopVibe Rewards Card</li>
            <li className="footer-list-item">ShopVibe.com Store Card</li>
            <li className="footer-list-item">ShopVibe Secured Card</li>
            <li className="footer-list-item">ShopVibe Business Card</li>
            <li className="footer-list-item">Shop with Points</li>
            <li className="footer-list-item">Reload Your Balance</li>
          </ul>
        </div>

        <div>
          <h3 className="footer-column-title">Contact & Help</h3>
          <ul className="footer-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem' }}>
              <MapPin size={14} color="var(--color-amber-light)" style={{ marginTop: '3px', flexShrink: 0 }} />
              ShopVibe India Pvt. Ltd., 4th Floor, Prestige Tech Park, Outer Ring Road, Bengaluru, Karnataka - 560103
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
              <Phone size={14} color="var(--color-amber-light)" />
              1800-419-VIBE (Toll-Free)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
              <Mail size={14} color="var(--color-amber-light)" />
              support@shopvibe.in
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <div className="footer-logo-row">
          <div className="footer-logo">
            Shop<span>Vibe</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="footer-socials">
          <a className="footer-social-icon" href="#" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a className="footer-social-icon" href="#" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a className="footer-social-icon" href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a className="footer-social-icon" href="#" aria-label="Github">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} ShopVibe, Inc. or its affiliates. All rights reserved. 
          Inspired by Amazon & Flipkart designs. Made for demonstration.
        </p>
      </div>
    </footer>
  );
}
