import { useState } from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function ProductDetailModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  triggerToast
}) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const {
    id,
    name,
    price,
    originalPrice,
    discount,
    rating = 4.3,
    reviewsCount = 120,
    category,
    image,
    isBestSeller
  } = product;

  // Star renderer that handles half stars
  const renderStars = (ratingScore) => {
    const stars = [];
    const fullStars = Math.floor(ratingScore);
    const hasHalfStar = ratingScore % 1 >= 0.4;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={16} fill="var(--color-amber)" color="var(--color-amber)" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} style={{ position: 'relative', display: 'inline-block', color: 'var(--color-amber)' }}>
            <Star size={16} color="var(--color-border)" />
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '50%', 
              overflow: 'hidden', 
              color: 'var(--color-amber)' 
            }}>
              <Star size={16} fill="currentColor" color="currentColor" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={16} color="var(--color-border)" />);
      }
    }
    return stars;
  };

  // Generate dynamic product descriptions based on name/category
  const getProductSpecs = (prodId, prodName, cat) => {
    const defaultSpecs = [
      "Premium quality material designed for long-lasting durability.",
      "Ergonomic construction ensures extreme ease of use and comfort.",
      "Elegant contemporary aesthetic suitable for modern lifestyles.",
      "100% Customer Satisfaction guaranteed with robust warranty support."
    ];

    if (prodId === 1) { // OnePlus
      return [
        "Camera: 50 MP Sony LYT-600 main camera with OIS for blur-free photography.",
        "Display: 6.67-inch 120Hz AMOLED Screen with peak brightness up to 2100 nits.",
        "Battery & Charging: Massive 5500 mAh battery with 80W SUPERVOOC fast charging.",
        "Performance: Snapdragon 4 Gen 2 octa-core processor with 8GB RAM + 128GB ROM.",
        "Audio: Dual stereo speakers with 300% Ultra Volume Mode and 3.5mm headphone jack."
      ];
    }
    if (prodId === 2) { // boAt Earbuds
      return [
        "Playback: Up to 42 hours of total playtime (6 hours per charge) for endless listening.",
        "Driver Size: Powerful 8mm dynamic drivers delivering immersive boAt Signature Sound.",
        "Beast Mode: Low latency (80ms) gaming mode for real-time audio synchronization.",
        "ENx Tech: Quad microphones designed to filter out ambient noise during voice calls.",
        "ASAP Charge: 5 minutes of quick charge yields up to 75 minutes of playtime."
      ];
    }
    if (prodId === 3) { // Cotton Kurta
      return [
        "Fabric: Crafted from 100% premium grade breathable cotton fabric.",
        "Design: Features a refined Mandarin collar, side pockets, and long sleeves.",
        "Occasion: Perfect for casual daily wear, ethnic festivals, or family functions.",
        "Wash Care: Machine wash cold with similar colors. Warm iron if needed.",
        "Fit: Standard regular fit ensuring maximum airflow and comfort during summers."
      ];
    }
    if (prodId === 4) { // Georgette Saree
      return [
        "Material: Lightweight and flowing premium georgette fabric that drapes beautifully.",
        "Pattern: Gorgeous modern floral digital print all over with matching borders.",
        "Package Contents: Includes 1 Saree (5.5 meters) and 1 unstitched Blouse piece (0.8 meters).",
        "Occasion: Festive gatherings, evening parties, or formal events.",
        "Care Instructions: Dry clean recommended to maintain color brilliance and fabric quality."
      ];
    }
    if (prodId === 5) { // Prestige Grinder
      return [
        "Motor: High-efficiency 750 Watt copper-wound motor for grinding tough ingredients.",
        "Jars: Comes with 3 stainless steel jars (Wet, Dry, and Chutney grinding) with secure lids.",
        "Blades: Heavy-duty stainless steel blades designed for fine grinding and blending.",
        "Safety: Features overload protection switch and slip-resistant sturdy rubber feet.",
        "Warranty: 2-year manufacturer warranty on product and motor."
      ];
    }
    if (prodId === 6) { // Pigeon Air Fryer
      return [
        "Capacity: Compact 4.2-liter space-efficient cooking basket.",
        "Technology: 360-degree rapid air convection heating for oil-free healthy cooking.",
        "Controls: Easy-to-use digital timer controls with automatic shut-off safety switch.",
        "Versatility: Air fry, roast, bake, and grill a wide variety of snacks easily.",
        "Clean Up: Non-stick food-grade dishwasher-safe removable frying pan."
      ];
    }
    if (prodId === 7) { // Tata Tea
      return [
        "Rich Blend: Crafted by blending high-quality Assam CTC tea with gentle leaves.",
        "Aroma: Specially processed long tea leaves that release an irresistible aroma.",
        "Taste: Strong and rich cup of tea that energizes your senses.",
        "Quality: Standard hygienically packed tea leaves certified by Tata Quality Standards."
      ];
    }
    if (prodId === 8) { // Biotique Lotion
      return [
        "Ingredients: Contains morning nectar, wild turmeric, ashwagandha, and pure honey.",
        "Benefits: Nourishes and hydrates the skin, promoting a flawless, glowing complexion.",
        "Sun Protection: Contains natural SPF to shield skin from harmful UV rays.",
        "Skin Type: Suitable for all skin types. Dermatologically tested for safety.",
        "Application: Apply evenly to clean face and neck, morning and evening."
      ];
    }
    if (prodId === 9) { // Cosco Cricket Balls
      return [
        "Material: Made from premium lightweight natural rubber with high-durability felt.",
        "Bounce: Provides consistent bounce and flight trajectory for training.",
        "Application: Ideal for recreational tennis cricket matches and backyard training.",
        "Package: Contains 6 bright yellow, high-visibility tennis balls."
      ];
    }
    if (prodId === 101) { // boAt Wave Smart Watch
      return [
        "Display: 1.69-inch HD square display with bold touch controls.",
        "Calling: Bluetooth Calling with active dial pad, mic, and speaker support.",
        "Fitness: 15+ sports modes, steps tracking, calorie tracking, and heart-rate monitoring.",
        "Battery Life: Lasts up to 7 days on standard usage, 2 days with active BT calling.",
        "Build: IP68 sweat and water resistance."
      ];
    }
    if (prodId === 102) { // Sony Alpha DSLR
      return [
        "Sensor: 24.2 MP APS-C Exmor CMOS sensor for brilliant detail and low noise.",
        "Autofocus: Hybrid AF system with 425 phase-detection points for ultra-fast tracking.",
        "Video: Cinematic 4K recording with S-Log profiles for post-production editing.",
        "Lens: Supplied with 16-50mm power zoom compact lens.",
        "Connectivity: Built-in Wi-Fi and NFC for instant image sharing to mobile devices."
      ];
    }
    if (prodId === 103) { // Office Chair
      return [
        "Ergonomics: High backrest with active adjustable lumbar support and headrest.",
        "Material: Breathable high-grade nylon mesh back and padded dense sponge cushion.",
        "Mechanism: Multi-functional tilting mechanism with tilt lock (90 to 120 degrees).",
        "Gas Lift: Class 4 hydraulic piston for smooth height adjustments.",
        "Base: Sturdy metal base with 360-degree silent castor wheels."
      ];
    }

    // Fallback search keywords
    const lowerName = prodName.toLowerCase();
    if (lowerName.includes("smart watch") || lowerName.includes("watch")) {
      return [
        "Display: Color touchscreen with custom watch faces.",
        "Tracking: Heart rate, blood oxygen (SpO2), active sleep cycles, and daily steps.",
        "Notifications: Alerts for calls, texts, and social media notifications.",
        "Battery: Long battery life lasting up to several days on a single charge."
      ];
    }
    if (lowerName.includes("headphone") || lowerName.includes("earbuds") || lowerName.includes("audio")) {
      return [
        "Sound: Premium acoustic drivers delivering high-fidelity stereo output.",
        "Battery: Extended playtime with fast charging capability.",
        "Connectivity: Latest Bluetooth version for stable wireless pairing.",
        "Comfort: Lightweight, ergonomic ear cushions designed for all-day listening."
      ];
    }
    if (lowerName.includes("shirt") || lowerName.includes("kurta") || lowerName.includes("apparel") || cat === "fashion") {
      return [
        "Fabric: Soft, breathable, and skin-friendly premium fabric.",
        "Stitching: Fine double-stitch tailoring to maintain shape after multiple washes.",
        "Styling: Designed to blend modern fashion with absolute daily comfort.",
        "Fit: Regular comfort fit suitable for various body types."
      ];
    }

    return defaultSpecs;
  };

  const productSpecs = getProductSpecs(id, name, category);

  const handleAddToCartClick = () => {
    // Add product to cart with quantity
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    triggerToast(`Added ${quantity} item(s) of "${name.slice(0, 30)}..." to Cart!`, 'success');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="detail-grid-layout">
          {/* Left Column: Image Area */}
          <div className="detail-image-section">
            {isBestSeller && <div className="detail-best-seller-tag">Best Seller</div>}
            <img src={image} alt={name} className="detail-main-img" />
          </div>

          {/* Right Column: Information Area */}
          <div className="detail-info-section">
            <span className="detail-category">{category}</span>
            <h2 className="detail-title">{name}</h2>

            {/* Ratings Row */}
            <div className="detail-ratings-row">
              <div className="detail-stars">
                {renderStars(rating)}
              </div>
              <span className="detail-rating-score">{rating}</span>
              <span className="detail-rating-separator">|</span>
              <span className="detail-reviews-count">{reviewsCount.toLocaleString()} ratings</span>
            </div>

            <hr className="detail-divider" />

            {/* Pricing Row */}
            <div className="detail-pricing-block">
              <div className="detail-price-row">
                <span className="detail-price-value">₹{price.toLocaleString('en-IN')}</span>
                {originalPrice && (
                  <>
                    <span className="detail-original-price">M.R.P.: ₹{originalPrice.toLocaleString('en-IN')}</span>
                    {(() => {
                      const calculatedDiscount = discount || Math.round(((originalPrice - price) / originalPrice) * 100);
                      return calculatedDiscount > 0 ? (
                        <span className="detail-discount">({calculatedDiscount}% OFF)</span>
                      ) : null;
                    })()}
                  </>
                )}
              </div>
              <p className="detail-taxes-label">Inclusive of all taxes</p>
              <div className="detail-badge-row">
                <span className="detail-prime-delivery-badge">Prime Delivery</span>
                <span className="detail-stock-badge">In Stock</span>
              </div>
            </div>

            <hr className="detail-divider" />

            {/* Features Row */}
            <div className="detail-shipping-points">
              <div className="shipping-point">
                <Truck size={18} />
                <span>Free Delivery</span>
              </div>
              <div className="shipping-point">
                <RefreshCw size={18} />
                <span>7 Days Replacement</span>
              </div>
              <div className="shipping-point">
                <ShieldCheck size={18} />
                <span>1 Year Warranty</span>
              </div>
            </div>

            <hr className="detail-divider" />

            {/* Add to Cart Actions */}
            <div className="detail-actions-block">
              <div className="qty-selector">
                <label htmlFor="detail-qty">Qty:</label>
                <select
                  id="detail-qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <button className="detail-add-to-cart-btn" onClick={handleAddToCartClick}>
                <ShoppingCart size={16} /> Add to Cart
              </button>

              <button
                className={`detail-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(id)}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <hr className="detail-divider" />

            {/* Technical Specifications */}
            <div className="detail-specs-block">
              <h3>About this item</h3>
              <ul>
                {productSpecs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
