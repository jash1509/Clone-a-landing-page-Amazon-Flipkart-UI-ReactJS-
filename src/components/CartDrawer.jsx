import { useEffect, useState } from 'react';
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleClose = () => {
    setIsOrderPlaced(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOrderPlaced(false);
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    onCheckout();
    setIsOrderPlaced(true);
  };

  return (
    <div className="cart-overlay" onMouseDown={(event) => event.target === event.currentTarget && handleClose()}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        data-testid="cart-drawer"
      >
        <div className="cart-drawer-header">
          <div>
            <span className="cart-eyebrow">Your basket</span>
            <h2 id="cart-title">Shopping Cart</h2>
          </div>
          <button type="button" className="cart-close-btn" onClick={handleClose} aria-label="Close cart" autoFocus>
            <X size={21} />
          </button>
        </div>

        {isOrderPlaced ? (
          <div className="order-success-state" data-testid="order-success">
            <div className="order-success-icon"><Check size={38} strokeWidth={3} /></div>
            <span className="cart-eyebrow">Order confirmed</span>
            <h3>Your order has been placed successfully!</h3>
            <p>Thank you for shopping with ShopVibe. Your order is now confirmed.</p>
            <button type="button" className="cart-continue-btn" onClick={handleClose}>Continue Shopping</button>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon"><ShoppingBag size={34} /></div>
            <h3>Your cart is empty</h3>
            <p>Add something you love and it will show up here.</p>
            <button type="button" className="cart-continue-btn" onClick={handleClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items" aria-label="Cart items">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img className="cart-item-image" src={item.image} alt="" />
                  <div className="cart-item-content">
                    <h3>{item.name}</h3>
                    <strong>{formatCurrency(item.price)}</strong>
                    <div className="cart-item-actions">
                      <div className="cart-quantity" aria-label={`Quantity for ${item.name}`}>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={15} /> Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <p>Taxes and delivery are calculated at checkout.</p>
              <button type="button" className="cart-checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
