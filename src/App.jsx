import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import DealOfDay from './components/DealOfDay';
import ProductListing from './components/ProductListing';
import FeaturedBrands from './components/FeaturedBrands';
import CustomerReviews from './components/CustomerReviews';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import AccountModal from './components/AccountModal';
import ProductDetailModal from './components/ProductDetailModal';
import CustomerServiceModal from './components/CustomerServiceModal';
import RegistryModal from './components/RegistryModal';
import GiftCardsModal from './components/GiftCardsModal';
import SellModal from './components/SellModal';
import { products } from './mockData';
import { Heart, ShoppingBag } from 'lucide-react';

export default function App() {
  // Global states
  const [productList, setProductList] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_products');
      return saved ? JSON.parse(saved) : products;
    } catch {
      return products;
    }
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_wallet_balance');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User & Orders States
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal Visibility States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState('profile');

  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
  const [isRegistryOpen, setIsRegistryOpen] = useState(false);
  const [isGiftCardsOpen, setIsGiftCardsOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('shopvibe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopvibe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('shopvibe_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopvibe_products', JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    localStorage.setItem('shopvibe_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('shopvibe_user', JSON.stringify(user));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('shopvibe_user');
    triggerToast('Signed out successfully.', 'info');
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('shopvibe_user', JSON.stringify(updatedUser));
  };

  const handleOpenAccount = (tab) => {
    setActiveAccountTab(tab);
    setIsAccountOpen(true);
  };

  // Product Detail Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };
  
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

  const handleUpdateCartQuantity = (productId, nextQuantity) => {
    setCart((prevCart) => {
      if (nextQuantity <= 0) {
        return prevCart.filter((item) => item.id !== productId);
      }

      return prevCart.map((item) => (
        item.id === productId ? { ...item, quantity: nextQuantity } : item
      ));
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    triggerToast('Item removed from Cart', 'info');
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: 'OD' + Math.floor(1000000000 + Math.random() * 9000000000),
      date: new Date().toISOString(),
      status: 'Delivered',
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);
    setIsCartOpen(false);
    triggerToast('Order placed successfully! 📦', 'success');

    // Open orders tab after a small delay to show the new order
    setTimeout(() => {
      handleOpenAccount('orders');
    }, 800);
  };

  const handleListProduct = (newProduct) => {
    setProductList(prev => [newProduct, ...prev]);
    setActiveCategory(newProduct.category);
    setSearchTerm('');
    setTimeout(() => {
      document.querySelector('.products-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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

  const showHomeContent = activeCategory === 'all' && searchTerm.trim() === '';

  return (
    <div className="app-container">
      {/* 1. Header (Dynamic search + cart count badge) */}
      <Header 
        products={productList}
        cartCount={cartCount} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAccount={handleOpenAccount}
        onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
        onOpenRegistry={() => setIsRegistryOpen(true)}
        onOpenGiftCards={() => setIsGiftCardsOpen(true)}
        onOpenSell={() => setIsSellOpen(true)}
      />

      {/* Main Sections */}
      <main className="main-content">
        {/* 2. Hero Carousel / Promotion banner */}
        {showHomeContent && <HeroCarousel />}

        {/* 5. Deal of the Day (Ticking Countdown Timer) */}
        {showHomeContent && <DealOfDay onAddToCart={handleAddToCart} onOpenDetail={handleOpenDetail} />}

        {/* 4. Product Listing Grid (Minimum 6 products + filtering search/categories) */}
        <ProductListing 
          products={productList}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          onOpenDetail={handleOpenDetail}
        />

        {/* 6. Featured Brands section */}
        {showHomeContent && <FeaturedBrands />}

        {/* 7. Customer Reviews section */}
        {showHomeContent && <CustomerReviews />}

        {/* 8. Newsletter Subscription (State-driven form + success feedback) */}
        {showHomeContent && <Newsletter />}
      </main>

      {/* 9. Footer (Social links + directories + Back to Top) */}
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handlePlaceOrder}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        triggerToast={triggerToast}
      />

      <AccountModal
        key={currentUser ? `${currentUser.email}_${isAccountOpen}_${activeAccountTab}` : `guest_${isAccountOpen}_${activeAccountTab}`}
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        orders={orders}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        initialTab={activeAccountTab}
        triggerToast={triggerToast}
      />

      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        triggerToast={triggerToast}
      />

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

      <CustomerServiceModal
        isOpen={isCustomerServiceOpen}
        onClose={() => setIsCustomerServiceOpen(false)}
      />

      <RegistryModal
        isOpen={isRegistryOpen}
        onClose={() => setIsRegistryOpen(false)}
        triggerToast={triggerToast}
      />

      <GiftCardsModal
        isOpen={isGiftCardsOpen}
        onClose={() => setIsGiftCardsOpen(false)}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        triggerToast={triggerToast}
        currentUser={currentUser}
      />

      <SellModal
        isOpen={isSellOpen}
        onClose={() => setIsSellOpen(false)}
        onListProduct={handleListProduct}
        triggerToast={triggerToast}
      />
    </div>
  );
}
