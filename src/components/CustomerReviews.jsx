import { Star, CheckCircle } from 'lucide-react';
import { customerReviews } from '../mockData';

export default function CustomerReviews() {
  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < count ? "var(--color-amber)" : "none"}
        color={i < count ? "var(--color-amber)" : "var(--color-border)"}
      />
    ));
  };

  return (
    <section className="section-container">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="reviews-grid" style={{ marginTop: '20px' }}>
        {customerReviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-header">
              <div className="review-avatar">
                <img src={review.avatar} alt={review.userName} />
              </div>
              <div className="review-user-info">
                <span className="review-user-name">{review.userName}</span>
                {review.verified && (
                  <span className="review-verified">
                    <CheckCircle size={10} fill="currentColor" color="var(--color-white)" />
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
            
            <div className="review-rating-row">
              <div style={{ display: 'flex', gap: '2px' }}>
                {renderStars(review.rating)}
              </div>
            </div>

            <p className="review-text">"{review.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
