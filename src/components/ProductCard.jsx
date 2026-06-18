import { Star, Heart, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const { id, name, price, originalPrice, discount, rating, reviewsCount, category, image, isBestSeller } = product;

  // Star renderer that handles half stars
  const renderStars = (ratingScore) => {
    const stars = [];
    const fullStars = Math.floor(ratingScore);
    const hasHalfStar = ratingScore % 1 >= 0.4; // 0.4 or higher displays half star

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} fill="currentColor" color="currentColor" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} style={{ position: 'relative', display: 'inline-block', color: 'var(--color-amber)' }}>
            {/* Outline background */}
            <Star size={14} color="var(--color-border)" />
            {/* Colored left half */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '50%', 
              overflow: 'hidden', 
              color: 'var(--color-amber)' 
            }}>
              <Star size={14} fill="currentColor" color="currentColor" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={14} color="var(--color-border)" />);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      {/* Best Seller Tag */}
      {isBestSeller && <div className="product-badge">Best Seller</div>}

      {/* Wishlist Button */}
      <button 
        className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
        onClick={() => onToggleWishlist(id)}
        aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image Container */}
      <div className="product-img-container">
        <img src={image} alt={name} className="product-img" loading="lazy" />
      </div>

      {/* Product Details */}
      <div className="product-info">
        <span className="product-category-tag">{category}</span>
        <h3 className="product-name" title={name}>{name}</h3>
        
        {/* Rating Row */}
        <div className="product-rating">
          <div className="stars-container">
            {renderStars(rating)}
          </div>
          <span className="stars-rating-text">({reviewsCount.toLocaleString()})</span>
        </div>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="product-price">₹{price.toLocaleString('en-IN')}</span>
          {originalPrice && (
            <>
              <span className="product-original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
              <span className="product-discount-label">({discount}% OFF)</span>
            </>
          )}
        </div>

        {/* Add To Cart */}
        <button className="product-add-btn" onClick={() => onAddToCart(product)}>
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
