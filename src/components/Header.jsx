import { useMemo, useState, useEffect } from 'react';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown } from 'lucide-react';
import { products as staticProducts } from '../mockData';

const MAX_SUGGESTIONS = 5;

export default function Header({
  products = staticProducts,
  cartCount,
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  onOpenCart,
  currentUser,
  onSignOut,
  onOpenAuth,
  onOpenAccount,
  onOpenCustomerService,
  onOpenRegistry,
  onOpenGiftCards,
  onOpenSell
}) {
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.header-account-trigger')) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isDropdownOpen]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!normalizedSearch) return [];

    return products
      .filter((product) => (
        product.name.toLowerCase().includes(normalizedSearch)
        && (activeCategory === 'all' || product.category === activeCategory)
      ))
      .slice(0, MAX_SUGGESTIONS);
  }, [activeCategory, normalizedSearch]);

  const showSuggestions = isSuggestionOpen && normalizedSearch.length > 0;

  const scrollToProducts = () => {
    document.querySelector('.products-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectSuggestion = (product) => {
    setSearchTerm(product.name);
    setActiveCategory(product.category);
    setIsSuggestionOpen(false);
    setActiveSuggestion(-1);
    requestAnimationFrame(scrollToProducts);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
      selectSuggestion(suggestions[activeSuggestion]);
      return;
    }

    setIsSuggestionOpen(false);
    scrollToProducts();
  };

  const handleSearchKeyDown = (event) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (event.key === 'Escape') setIsSuggestionOpen(false);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSuggestion((current) => (current + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSuggestion((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
    } else if (event.key === 'Escape') {
      setIsSuggestionOpen(false);
      setActiveSuggestion(-1);
    }
  };

  return (
    <header className="header">
      <div className="header-main">
        <button
          type="button"
          className="header-logo"
          onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
          aria-label="ShopVibe home"
        >
          Shop<span>Vibe</span>
        </button>

        <div className="header-action-item hide-mobile">
          <span className="line-1">Deliver to</span>
          <span className="line-2"><MapPin size={14} /> India</span>
        </div>

        <div
          className="header-search-wrapper"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsSuggestionOpen(false);
              setActiveSuggestion(-1);
            }
          }}
        >
          <form className="header-search-container" role="search" onSubmit={handleSearchSubmit}>
            <label className="sr-only" htmlFor="department-select">Search department</label>
            <select
              id="department-select"
              className="header-search-select"
              value={activeCategory}
              onChange={(event) => {
                setActiveCategory(event.target.value);
                setActiveSuggestion(-1);
              }}
            >
              <option value="all">All Departments</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Kitchen</option>
              <option value="beauty">Beauty</option>
              <option value="grocery">Grocery</option>
              <option value="sports">Sports</option>
            </select>
            <label className="sr-only" htmlFor="shop-search">Search products</label>
            <input
              id="shop-search"
              type="search"
              className="header-search-input"
              placeholder="Search ShopVibe..."
              value={searchTerm}
              onFocus={() => setIsSuggestionOpen(true)}
              onChange={(event) => {
                const nextSearchTerm = event.target.value;
                setSearchTerm(nextSearchTerm);
                if (nextSearchTerm === '') setActiveCategory('all');
                setIsSuggestionOpen(true);
                setActiveSuggestion(-1);
              }}
              onKeyDown={handleSearchKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showSuggestions}
              aria-controls="search-suggestions"
              aria-activedescendant={activeSuggestion >= 0 ? `search-suggestion-${suggestions[activeSuggestion]?.id}` : undefined}
            />
            <button type="submit" className="header-search-button" aria-label="Search products">
              <Search size={20} color="#0f1111" />
            </button>
          </form>

          {showSuggestions && (
            <div className="search-suggestions-panel" data-testid="search-suggestions">
              {suggestions.length > 0 ? (
                <ul id="search-suggestions" role="listbox" aria-label="Product suggestions">
                  {suggestions.map((product, index) => (
                    <li
                      id={`search-suggestion-${product.id}`}
                      role="option"
                      aria-selected={index === activeSuggestion}
                      className={index === activeSuggestion ? 'active' : ''}
                      key={product.id}
                    >
                      <button
                        type="button"
                        onClick={() => selectSuggestion(product)}
                        onMouseEnter={() => setActiveSuggestion(index)}
                      >
                        <img src={product.image} alt="" />
                        <span className="search-suggestion-copy">
                          <strong>{product.name}</strong>
                          <span>{product.category} · ₹{product.price.toLocaleString('en-IN')}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="search-no-suggestions">No matching products found.</div>
              )}
            </div>
          )}
        </div>

        <div className="header-actions">
          <div 
            className="header-action-item header-account-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onMouseEnter={() => setIsDropdownOpen(true)}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <span className="line-1">
              {currentUser ? `Hello, ${currentUser.name.split(' ')[0]}` : 'Hello, Sign in'}
            </span>
            <span className="line-2">
              Account & Lists <ChevronDown size={12} />
            </span>

            {isDropdownOpen && (
              <div 
                className="header-account-dropdown"
                onClick={(e) => e.stopPropagation()}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {!currentUser ? (
                  <div className="dropdown-auth-prompt">
                    <button 
                      type="button" 
                      className="dropdown-signin-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(false);
                        onOpenAuth();
                      }}
                    >
                      Sign in
                    </button>
                    <p className="dropdown-signup-text">
                      New customer? <span onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(false); onOpenAuth(); }}>Start here.</span>
                    </p>
                  </div>
                ) : (
                  <div className="dropdown-auth-prompt">
                    <span className="dropdown-user-welcome">
                      Welcome, <strong>{currentUser.name}</strong>
                      {currentUser.isPrime && <span className="prime-mini-badge">Prime</span>}
                    </span>
                  </div>
                )}
                
                <div className="dropdown-columns">
                  <div className="dropdown-column">
                    <h3>Your Lists</h3>
                    <ul>
                      <li onClick={() => { setIsDropdownOpen(false); onOpenAccount('wishlist'); }}>
                        Your Wishlist
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-column border-left">
                    <h3>Your Account</h3>
                    <ul>
                      <li onClick={() => { setIsDropdownOpen(false); onOpenAccount('profile'); }}>
                        Your Account
                      </li>
                      <li onClick={() => { setIsDropdownOpen(false); onOpenAccount('orders'); }}>
                        Your Orders
                      </li>
                      {currentUser && (
                        <li 
                          className="dropdown-signout-link"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            onSignOut();
                          }}
                        >
                          Sign Out
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div 
            className="header-action-item hide-tablet"
            onClick={() => onOpenAccount('orders')}
            style={{ cursor: 'pointer' }}
          >
            <span className="line-1">Returns</span>
            <span className="line-2">& Orders</span>
          </div>

          <button
            type="button"
            className="header-action-item header-cart"
            onClick={onOpenCart}
            aria-label={`Open cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            data-testid="cart-trigger"
          >
            <span className="header-cart-badge" aria-hidden="true">{cartCount}</span>
            <ShoppingCart size={24} />
            <span className="line-2 hide-mobile">Cart</span>
          </button>
        </div>
      </div>

      <div className="header-subnav">
        <div className="subnav-link bold" onClick={() => { setActiveCategory('all'); setSearchTerm(''); }} style={{ cursor: 'pointer' }}><Menu size={16} /> All</div>
        <div className={`subnav-link ${activeCategory === 'electronics' ? 'bold' : ''}`} onClick={() => setActiveCategory('electronics')}>Electronics</div>
        <div className={`subnav-link ${activeCategory === 'fashion' ? 'bold' : ''}`} onClick={() => setActiveCategory('fashion')}>Fashion</div>
        <div className={`subnav-link ${activeCategory === 'home' ? 'bold' : ''}`} onClick={() => setActiveCategory('home')}>Home & Kitchen</div>
        <div className={`subnav-link ${activeCategory === 'grocery' ? 'bold' : ''}`} onClick={() => setActiveCategory('grocery')}>Grocery</div>
        <div className={`subnav-link ${activeCategory === 'beauty' ? 'bold' : ''}`} onClick={() => setActiveCategory('beauty')}>Beauty</div>
        <div className={`subnav-link ${activeCategory === 'sports' ? 'bold' : ''}`} onClick={() => setActiveCategory('sports')}>Sports</div>
        <div className={`subnav-link hide-mobile ${activeCategory === 'deals' ? 'bold' : ''}`} onClick={() => { setActiveCategory('deals'); setSearchTerm(''); setTimeout(() => scrollToProducts(), 50); }} style={{ cursor: 'pointer' }}>Today's Deals</div>
        <div className="subnav-link hide-mobile" onClick={onOpenCustomerService} style={{ cursor: 'pointer' }}>Customer Service</div>
        <div className="subnav-link hide-mobile" onClick={onOpenRegistry} style={{ cursor: 'pointer' }}>Registry</div>
        <div className="subnav-link hide-mobile" onClick={onOpenGiftCards} style={{ cursor: 'pointer' }}>Gift Cards</div>
        <div className="subnav-link hide-mobile" onClick={onOpenSell} style={{ cursor: 'pointer' }}>Sell</div>
      </div>
    </header>
  );
}
