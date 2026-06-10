import React, { useState, useEffect } from 'react';
import { Clock, ShoppingBag } from 'lucide-react';
import { dealsOfTheDay } from '../mockData';

export default function DealOfDay({ onAddToCart }) {
  // Helper to calculate seconds remaining until the end of the day
  const getSecondsUntilEndOfDay = () => {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const diff = Math.floor((endOfDay - now) / 1000);
    return diff > 0 ? diff : 86400; // fallback to 24h if negative
  };

  const [timeLeft, setTimeLeft] = useState(getSecondsUntilEndOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : getSecondsUntilEndOfDay()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format seconds to HH, MM, SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  return (
    <section className="deal-section">
      <div className="deal-header">
        <div className="deal-info-block">
          <span className="deal-tag">Limited Time</span>
          <h2 className="deal-title">Deal of the Day</h2>
        </div>
        
        {/* Countdown Timer */}
        <div className="deal-timer-container">
          <span className="deal-timer-label">Ends in:</span>
          <div className="deal-timer-digits">
            <div className="timer-box" title="Hours">{time.hours}</div>
            <div style={{ color: 'var(--color-amber-light)', fontWeight: 'bold', fontSize: '1.25rem' }}>:</div>
            <div className="timer-box" title="Minutes">{time.minutes}</div>
            <div style={{ color: 'var(--color-amber-light)', fontWeight: 'bold', fontSize: '1.25rem' }}>:</div>
            <div className="timer-box" title="Seconds">{time.seconds}</div>
          </div>
          <Clock size={16} style={{ color: '#cccccc', marginLeft: '4px' }} />
        </div>
      </div>

      {/* Deals Grid */}
      <div className="deal-grid">
        {dealsOfTheDay.map((deal) => (
          <div className="deal-card" key={deal.id}>
            <div className="deal-img-wrapper">
              <img src={deal.image} alt={deal.name} className="deal-img" />
            </div>
            <div className="deal-content">
              <div>
                <h3 className="deal-prod-title" title={deal.name}>{deal.name}</h3>
                <span className="deal-offer-badge">{deal.offerText}</span>
              </div>
              <div className="deal-price-line" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span className="deal-price">₹{deal.price.toLocaleString('en-IN')}</span>
                  <span className="deal-original">₹{deal.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  className="product-add-btn" 
                  style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={() => onAddToCart({
                    id: deal.id,
                    name: deal.name,
                    price: deal.price,
                    image: deal.image,
                    category: "deals"
                  })}
                >
                  <ShoppingBag size={14} />
                  Claim
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
