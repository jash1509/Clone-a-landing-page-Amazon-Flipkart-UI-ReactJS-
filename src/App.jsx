import React, { useState } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import Categories from './components/Categories';
import DealOfDay from './components/DealOfDay';
import ProductListing from './components/ProductListing';
import FeaturedBrands from './components/FeaturedBrands';
import CustomerReviews from './components/CustomerReviews';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { Heart, ShoppingBag } from 'lucide-react';

export default function App() {
  // Global states
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Toast notifications state
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Show dynamic toast
  const triggerToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    // Reset toast after 3 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Add to Cart handler
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    triggerToast(`"${product.name.slice(0, 30)}..." added to Cart!`, 'success');
  };

  // Toggle Wishlist handler
  const handleToggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const isAlreadyWishlisted = prevWishlist.includes(productId);
      if (isAlreadyWishlisted) {
        triggerToast("Removed from Wishlist", "info");
        return prevWishlist.filter(id => id !== productId);
      } else {
        triggerToast("Added to Wishlist!", "wishlist");
        return [...prevWishlist, productId];
      }
    });
  };

  // Total cart item quantity count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      {/* 1. Header (Dynamic search + cart count badge) */}
      <Header 
        cartCount={cartCount} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Sections */}
      <main className="main-content">
        {/* 2. Hero Carousel / Promotion banner */}
        <HeroCarousel />

        {/* 3. Categories section with hover animations */}
        <Categories 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* 5. Deal of the Day (Ticking Countdown Timer) */}
        <DealOfDay onAddToCart={handleAddToCart} />

        {/* 4. Product Listing Grid (Minimum 6 products + filtering search/categories) */}
        <ProductListing 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />

        {/* 6. Featured Brands section */}
        <FeaturedBrands />

        {/* 7. Customer Reviews section */}
        <CustomerReviews />

        {/* 8. Newsletter Subscription (State-driven form + success feedback) */}
        <Newsletter />
      </main>

      {/* 9. Footer (Social links + directories + Back to Top) */}
      <Footer />

      {/* Custom Toast Feedback Alert */}
      {toast.visible && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: toast.type === 'success' 
              ? 'var(--color-navy-light)' 
              : toast.type === 'wishlist' 
                ? 'var(--color-red)' 
                : '#37475a',
            color: 'var(--color-white)',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1000,
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {toast.type === 'success' && <ShoppingBag size={16} color="var(--color-amber-light)" />}
          {toast.type === 'wishlist' && <Heart size={16} fill="currentColor" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
