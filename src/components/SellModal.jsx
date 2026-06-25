import { useState } from 'react';
import { X, Store, Tag, DollarSign, Image as ImageIcon, FileText, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const PRESET_IMAGES = [
  { id: 'headphones', label: 'Tech Headset', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', category: 'electronics' },
  { id: 'watch', label: 'Smart Band', url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60', category: 'electronics' },
  { id: 'sneakers', label: 'White Sneakers', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60', category: 'fashion' },
  { id: 'mug', label: 'Ceramic Mug', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60', category: 'home' },
  { id: 'tea', label: 'Green Tea', url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=60', category: 'grocery' },
  { id: 'sunscreen', label: 'Sunscreen Lotion', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60', category: 'beauty' }
];

export default function SellModal({ isOpen, onClose, onListProduct, triggerToast }) {
  // Seller Profile states
  const [isSellerRegistered, setIsSellerRegistered] = useState(() => {
    return localStorage.getItem('shopvibe_is_seller') === 'true';
  });
  const [storeName, setStoreName] = useState(() => {
    return localStorage.getItem('shopvibe_store_name') || '';
  });
  const [storeCategory, setStoreCategory] = useState(() => {
    return localStorage.getItem('shopvibe_store_category') || 'electronics';
  });

  // Product listing form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  
  // Image selection: holds either preset URL or 'custom'
  const [imageSelection, setImageSelection] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');

  if (!isOpen) return null;

  const handleRegisterSeller = (e) => {
    e.preventDefault();
    if (!storeName.trim()) {
      triggerToast('Please provide a store name.', 'info');
      return;
    }

    localStorage.setItem('shopvibe_is_seller', 'true');
    localStorage.setItem('shopvibe_store_name', storeName.trim());
    localStorage.setItem('shopvibe_store_category', storeCategory);
    setIsSellerRegistered(true);
    triggerToast(`Congratulations! "${storeName.trim()}" is now registered as a seller!`, 'success');
  };

  const handleDeregister = () => {
    localStorage.removeItem('shopvibe_is_seller');
    localStorage.removeItem('shopvibe_store_name');
    localStorage.removeItem('shopvibe_store_category');
    setIsSellerRegistered(false);
    setStoreName('');
    triggerToast('Seller registration reset.', 'info');
  };

  const handleSubmitListing = (e) => {
    e.preventDefault();
    if (!name || !price) {
      triggerToast('Please provide a product name and price.', 'info');
      return;
    }

    const priceNum = Number(price);
    const origPriceNum = originalPrice ? Number(originalPrice) : priceNum;

    if (priceNum <= 0) {
      triggerToast('Price must be greater than zero.', 'info');
      return;
    }

    // Calculate discount percent
    let discountVal = 0;
    if (origPriceNum > priceNum) {
      discountVal = Math.round(((origPriceNum - priceNum) / origPriceNum) * 100);
    }

    // Set image
    const finalImageUrl = imageSelection === 'custom' 
      ? (customImageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60') 
      : imageSelection;

    const newProduct = {
      id: 'custom-' + Date.now(),
      name: name.trim(),
      price: priceNum,
      originalPrice: origPriceNum,
      discount: discountVal > 0 ? discountVal : undefined,
      rating: 5.0, // Newly added products get default 5 stars!
      reviewsCount: 0,
      category: category,
      image: finalImageUrl,
      description: description.trim() || 'No description provided by the seller.',
      isBestSeller: false
    };

    onListProduct(newProduct);
    
    // Clear fields
    setName('');
    setCategory('electronics');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setImageSelection(PRESET_IMAGES[0].url);
    setCustomImageUrl('');

    triggerToast(`Congratulations! "${newProduct.name}" is now listed in ${category.toUpperCase()}!`, 'success');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container sell-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* 1. ONBOARDING SCREEN (If not registered) */}
        {!isSellerRegistered ? (
          <div className="sell-onboarding">
            <div className="sell-header">
              <div className="header-icon"><Store size={28} /></div>
              <h2>Become a <span>ShopVibe Seller</span></h2>
              <p>Join India's fastest growing retail platform and list your inventory</p>
            </div>

            <div className="onboarding-content">
              <div className="onboarding-info">
                <h3>Why sell on ShopVibe?</h3>
                <div className="info-points">
                  <div className="point">
                    <ShieldCheck size={18} className="point-icon" />
                    <div>
                      <h4>Trusted & Safe</h4>
                      <p>Full secure payment gateways and verification process.</p>
                    </div>
                  </div>
                  <div className="point">
                    <Sparkles size={18} className="point-icon" />
                    <div>
                      <h4>Zero Listing Cost</h4>
                      <p>Start listing products immediately with no setup fees.</p>
                    </div>
                  </div>
                  <div className="point">
                    <Store size={18} className="point-icon" />
                    <div>
                      <h4>Reach Millions</h4>
                      <p>Instant visual placement on corresponding department feeds.</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleRegisterSeller} className="onboarding-form">
                <h3>Create Seller Profile</h3>
                <div className="form-group">
                  <label htmlFor="store-name">Store / Business Name *</label>
                  <input
                    id="store-name"
                    type="text"
                    placeholder="e.g. Jash Smart Retailers"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="store-cat">Primary Category Specialist</label>
                  <select
                    id="store-cat"
                    value={storeCategory}
                    onChange={(e) => setStoreCategory(e.target.value)}
                  >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="beauty">Beauty</option>
                    <option value="grocery">Grocery</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <input type="checkbox" id="terms-agree" required defaultChecked />
                  <label htmlFor="terms-agree">I agree to the ShopVibe Merchant Policy.</label>
                </div>

                <button type="submit" className="onboarding-submit-btn">
                  Start Your Journey <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* 2. PRODUCT LISTING SCREEN (If registered) */
          <>
            <div className="sell-header">
              <div className="header-icon"><Store size={28} /></div>
              <h2>Sell on <span>ShopVibe Portal</span></h2>
              <p>List your product globally and start receiving orders instantly</p>
              
              <div className="seller-meta-row">
                <span>Active Store: <strong>{storeName}</strong> ({storeCategory})</span>
                <button type="button" className="reset-seller-btn" onClick={handleDeregister}>
                  Deregister Store
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitListing} className="sell-form">
              <div className="form-group">
                <label htmlFor="sell-name">Product Title / Name *</label>
                <input
                  id="sell-name"
                  type="text"
                  placeholder="e.g. Sony WH-1000XM4 Wireless Noise Cancelling Headphones"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="sell-category">Product Department *</label>
                  <select
                    id="sell-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="beauty">Beauty</option>
                    <option value="grocery">Grocery</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="sell-price">Selling Price (₹) *</label>
                    <input
                      id="sell-price"
                      type="number"
                      placeholder="e.g. 19999"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sell-orig-price">M.R.P. / Original Price (₹)</label>
                    <input
                      id="sell-orig-price"
                      type="number"
                      placeholder="e.g. 24999"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image Selector */}
              <div className="image-selection-group">
                <label>Choose Product Cover Image *</label>
                <div className="presets-grid">
                  {PRESET_IMAGES.map(img => (
                    <div 
                      key={img.id} 
                      className={`preset-card ${imageSelection === img.url ? 'selected' : ''}`}
                      onClick={() => setImageSelection(img.url)}
                    >
                      <img src={img.url} alt={img.label} />
                      <span className="preset-label">{img.label}</span>
                      {imageSelection === img.url && <div className="checked-badge"><Check size={10} /></div>}
                    </div>
                  ))}
                  <div 
                    className={`preset-card custom ${imageSelection === 'custom' ? 'selected' : ''}`}
                    onClick={() => setImageSelection('custom')}
                  >
                    <div className="custom-icon-wrapper">
                      <ImageIcon size={20} />
                      <span>Custom URL</span>
                    </div>
                    {imageSelection === 'custom' && <div className="checked-badge"><Check size={10} /></div>}
                  </div>
                </div>

                {imageSelection === 'custom' && (
                  <div className="form-group custom-url-input">
                    <input
                      type="url"
                      placeholder="Paste cover image link (HTTPS, e.g. https://images.unsplash.com/...)"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="sell-desc">Product Description & Specs</label>
                <textarea
                  id="sell-desc"
                  placeholder="Provide a detailed overview of your product features, package contents, warranty details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                />
              </div>

              <button type="submit" className="sell-submit-btn">
                List Product Now
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
