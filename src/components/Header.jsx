import React from 'react';
import { Search, ShoppingCart, User, MapPin, Menu, ChevronDown } from 'lucide-react';

export default function Header({ cartCount, searchTerm, setSearchTerm, activeCategory, setActiveCategory }) {
  return (
    <header className="header">
      {/* Main Bar */}
      <div className="header-main">
        {/* Logo */}
        <div className="header-logo" onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}>
          Shop<span>Vibe</span>
        </div>

        {/* Delivery Location (Static/Decorative for Amazon feel) */}
        <div className="header-action-item hide-mobile">
          <span className="line-1">Deliver to</span>
          <span className="line-2">
            <MapPin size={14} /> India
          </span>
        </div>

        {/* Search Bar */}
        <div className="header-search-container">
          <select 
            className="header-search-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Kitchen</option>
            <option value="beauty">Beauty</option>
            <option value="grocery">Grocery</option>
            <option value="sports">Sports</option>
          </select>
          <input
            type="text"
            className="header-search-input"
            placeholder="Search ShopVibe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="header-search-button">
            <Search size={20} color="#0f1111" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="header-actions">
          {/* Account/Profile */}
          <div className="header-action-item">
            <span className="line-1">Hello, Sign in</span>
            <span className="line-2">
              Account & Lists <ChevronDown size={12} />
            </span>
          </div>

          {/* Orders */}
          <div className="header-action-item hide-tablet">
            <span className="line-1">Returns</span>
            <span className="line-2">& Orders</span>
          </div>

          {/* Cart Icon */}
          <div className="header-action-item header-cart">
            <span className="header-cart-badge">{cartCount}</span>
            <ShoppingCart size={24} />
            <span className="line-2 hide-mobile">Cart</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation Links */}
      <div className="header-subnav">
        <div className="subnav-link bold">
          <Menu size={16} /> All
        </div>
        <div 
          className={`subnav-link ${activeCategory === 'electronics' ? 'bold' : ''}`}
          onClick={() => setActiveCategory('electronics')}
        >
          Electronics
        </div>
        <div 
          className={`subnav-link ${activeCategory === 'fashion' ? 'bold' : ''}`}
          onClick={() => setActiveCategory('fashion')}
        >
          Fashion
        </div>
        <div 
          className={`subnav-link ${activeCategory === 'home' ? 'bold' : ''}`}
          onClick={() => setActiveCategory('home')}
        >
          Home & Kitchen
        </div>
        <div 
          className={`subnav-link ${activeCategory === 'grocery' ? 'bold' : ''}`}
          onClick={() => setActiveCategory('grocery')}
        >
          Grocery
        </div>
        <div 
          className={`subnav-link ${activeCategory === 'beauty' ? 'bold' : ''}`}
          onClick={() => setActiveCategory('beauty')}
        >
          Beauty
        </div>
        <div 
          className={`subnav-link ${activeCategory === 'sports' ? 'bold' : ''}`}
          onClick={() => setActiveCategory('sports')}
        >
          Sports
        </div>
        <div className="subnav-link hide-mobile">Today's Deals</div>
        <div className="subnav-link hide-mobile">Customer Service</div>
        <div className="subnav-link hide-mobile">Registry</div>
        <div className="subnav-link hide-mobile">Gift Cards</div>
        <div className="subnav-link hide-mobile">Sell</div>
      </div>
    </header>
  );
}
