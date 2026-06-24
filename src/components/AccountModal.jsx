import { useState } from 'react';
import { X, User, ShoppingBag, Heart, Save, ShoppingCart, CheckCircle, Package } from 'lucide-react';
import { products, dealsOfTheDay } from '../mockData';

export default function AccountModal({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  orders,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  initialTab = 'profile',
  triggerToast
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Profile edit states
  const [name, setName] = useState(() => currentUser?.name || '');
  const [email, setEmail] = useState(() => currentUser?.email || '');
  const [phone, setPhone] = useState(() => currentUser?.phone || '');
  const [address, setAddress] = useState(() => currentUser?.address || '');
  const [isPrime, setIsPrime] = useState(() => currentUser?.isPrime || false);

  if (!isOpen) return null;

  // Resolve wishlisted products
  const allProducts = [...products, ...dealsOfTheDay];
  const wishlistedItems = allProducts.filter(item => wishlist.includes(item.id));

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!name || !email) {
      triggerToast('Name and Email are required.', 'info');
      return;
    }

    onUpdateUser({
      ...currentUser,
      name,
      email,
      phone,
      address,
      isPrime
    });
    triggerToast('Profile updated successfully!', 'success');
  };

  const handleTogglePrime = () => {
    const nextPrime = !isPrime;
    setIsPrime(nextPrime);
    onUpdateUser({
      ...currentUser,
      isPrime: nextPrime
    });
    triggerToast(
      nextPrime ? 'Thank you for joining ShopVibe Prime! 🌟' : 'Prime membership cancelled.',
      nextPrime ? 'success' : 'info'
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container account-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Left Sidebar - Tabs */}
        <div className="account-sidebar">
          <div className="sidebar-user-info">
            <div className="user-avatar-large">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-text">
              <h3>{currentUser?.name || 'User'}</h3>
              {currentUser?.isPrime && <span className="prime-badge-gold">PRIME</span>}
            </div>
          </div>

          <div className="sidebar-tabs">
            <button
              className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> My Profile
            </button>
            <button
              className={`sidebar-tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={18} /> Your Orders
              {orders.length > 0 && <span className="tab-count">{orders.length}</span>}
            </button>
            <button
              className={`sidebar-tab ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart size={18} /> Wishlist
              {wishlist.length > 0 && <span className="tab-count">{wishlist.length}</span>}
            </button>
          </div>
        </div>

        {/* Modal Content Area */}
        <div className="account-content-container">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="account-tab-content">
              <h2 className="tab-title">Profile Settings</h2>
              <form onSubmit={handleProfileSave} className="profile-form">
                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="prof-name">Full Name</label>
                    <input
                      id="prof-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prof-email">Email Address</label>
                    <input
                      id="prof-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="prof-phone">Phone Number</label>
                    <input
                      id="prof-phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Prime Membership</label>
                    <button
                      type="button"
                      onClick={handleTogglePrime}
                      className={`prime-status-btn ${isPrime ? 'active' : ''}`}
                    >
                      {isPrime ? '🌟 Active (Prime Member)' : 'Join ShopVibe Prime'}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="prof-address">Default Delivery Address</label>
                  <textarea
                    id="prof-address"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address for faster checkout"
                  ></textarea>
                </div>

                <button type="submit" className="save-profile-btn">
                  <Save size={16} /> Save Changes
                </button>
              </form>

              <div className="prime-benefit-card">
                <div className="benefit-icon">✨</div>
                <div className="benefit-details">
                  <h4>Why join Prime?</h4>
                  <p>Free guaranteed one-day delivery, early access to lightning deals of the day, and special bank card cashback options on every purchase.</p>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="account-tab-content">
              <h2 className="tab-title">Your Order History</h2>
              
              {orders.length === 0 ? (
                <div className="empty-state">
                  <Package size={48} className="empty-icon" />
                  <h3>No Orders Found</h3>
                  <p>You haven't placed any orders yet. Add items to your cart and check out to see them here.</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card-item">
                      <div className="order-card-header">
                        <div>
                          <span className="order-label">ORDER PLACED</span>
                          <span className="order-value">
                            {new Date(order.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="order-label">TOTAL</span>
                          <span className="order-value price">₹{order.total.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span className="order-label">ORDER #</span>
                          <span className="order-value-id">{order.id}</span>
                        </div>
                        <div className="order-status-badge">
                          <CheckCircle size={14} /> {order.status || 'Delivered'}
                        </div>
                      </div>

                      <div className="order-card-body">
                        {order.items.map((item) => (
                          <div key={item.id} className="order-item-row">
                            <img src={item.image} alt={item.name} className="order-item-img" />
                            <div className="order-item-info">
                              <h4>{item.name}</h4>
                              <p className="order-item-meta">
                                Qty: {item.quantity} · Price: ₹{item.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <button
                              className="order-buy-again-btn"
                              onClick={() => {
                                onAddToCart(item);
                                triggerToast(`"${item.name.slice(0, 20)}..." added back to cart.`, 'success');
                              }}
                            >
                              Buy it again
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div className="account-tab-content">
              <h2 className="tab-title">Your Wishlist</h2>
              
              {wishlistedItems.length === 0 ? (
                <div className="empty-state">
                  <Heart size={48} className="empty-icon-heart" />
                  <h3>Your Wishlist is Empty</h3>
                  <p>Tap the heart icon on any product to save it to your wishlist and monitor deals.</p>
                </div>
              ) : (
                <div className="wishlist-grid-panel">
                  {wishlistedItems.map((product) => (
                    <div key={product.id} className="wishlist-card-item">
                      <img src={product.image} alt={product.name} />
                      <div className="wishlist-item-details">
                        <h4>{product.name}</h4>
                        <div className="wishlist-price">
                          ₹{product.price.toLocaleString('en-IN')}
                          {product.originalPrice && (
                            <span className="wishlist-orig-price">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <div className="wishlist-actions-row">
                          <button
                            className="wishlist-cart-btn"
                            onClick={() => {
                              onAddToCart(product);
                              triggerToast('Added to Cart from Wishlist!', 'success');
                            }}
                          >
                            <ShoppingCart size={14} /> Add to Cart
                          </button>
                          <button
                            className="wishlist-remove-btn"
                            onClick={() => onToggleWishlist(product.id)}
                            title="Remove from Wishlist"
                          >
                            <X size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
