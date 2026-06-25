import { useState, useRef, useEffect } from 'react';
import { X, Search, MessageSquare, Phone, Mail, Clock, ShieldCheck, RefreshCw, Truck, CreditCard } from 'lucide-react';

const HELP_ARTICLES = [
  {
    id: 1,
    title: 'How do I track my order?',
    category: 'shipping',
    content: 'You can track your order by clicking on "Returns & Orders" in the header or selecting "Your Orders" from the Account dropdown menu. Each active order has a real-time status tracker (e.g. Ordered, Shipped, Out for Delivery, Delivered).'
  },
  {
    id: 2,
    title: 'What is the return and refund policy?',
    category: 'returns',
    content: 'We offer a 30-day return policy for most categories (Fashion, Home, Sports). Electronics and mobiles have a 10-day return window. Once a return is received and inspected, refunds are credited back to the original payment source within 5-7 business days.'
  },
  {
    id: 3,
    title: 'How do I manage my Prime subscription?',
    category: 'prime',
    content: 'To manage your Prime membership, navigate to "Your Account" -> "Profile". Under the Prime Status section, you can toggle your Prime membership. Active Prime members get gold badging, free express shipping, and exclusive discounts.'
  },
  {
    id: 4,
    title: 'Can I request a commercial tax invoice?',
    category: 'billing',
    content: 'Yes! Once an order is placed and marked as "Delivered", you can download the PDF tax invoice from the "Your Orders" page. Look for the "Download Invoice" link on the corresponding order card.'
  },
  {
    id: 5,
    title: 'How do I change my delivery address?',
    category: 'profile',
    content: 'Go to "Your Account" -> "Profile Settings". Update the address text area field and click "Save Profile". The updated address will be used as the default destination for all future checkouts.'
  }
];

export default function CustomerServiceModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Chat bot states
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am VibeBot, your virtual support assistant. How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Filter help articles
  const filteredArticles = searchQuery.trim() === ''
    ? []
    : HELP_ARTICLES.filter(art => 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        art.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleQuickCategoryClick = (categoryName) => {
    const article = HELP_ARTICLES.find(a => a.category === categoryName);
    if (article) {
      setSelectedArticle(article);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsgText = chatInput.trim();
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Contextual bot response
    setTimeout(() => {
      let botResponse = '';
      const text = userMsgText.toLowerCase();

      if (text.includes('track') || text.includes('order') || text.includes('where is')) {
        botResponse = 'You can check your order statuses under "Returns & Orders" in the header or in your Account dropdown under "Your Orders". Standard items arrive in 2-4 days. Prime items arrive in 1 day!';
      } else if (text.includes('return') || text.includes('refund') || text.includes('replace')) {
        botResponse = 'Returns can be scheduled within 30 days of delivery (10 days for electronics) directly from the "Your Orders" page. Click "Return Item" to generate a free pickup slot.';
      } else if (text.includes('prime') || text.includes('gold')) {
        botResponse = 'ShopVibe Prime offers free shipping and special pricing! You can join or cancel Prime anytime inside the profile settings panel under "Your Account".';
      } else if (text.includes('pay') || text.includes('card') || text.includes('upi') || text.includes('money')) {
        botResponse = 'We support Credit Cards, Debit Cards, Net Banking, UPI, and Cash on Delivery (COD). You can also redeem virtual gift cards to your wallet balance for instant checkout.';
      } else if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
        botResponse = 'Hello there! Let me know if you need help with order tracking, return policies, wallet gift cards, or listing items as a seller!';
      } else {
        botResponse = "I've recorded your query about \"" + userMsgText + "\". Since I'm still learning, I have queued a human support representative to review your message. We'll email support instructions to your registered account within 2 hours.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container cs-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="cs-header">
          <h2>Customer <span>Service Hub</span></h2>
          <p>Search help topics or speak with our live virtual assistant</p>
        </div>

        <div className="cs-layout">
          {/* Left panel: Self help knowledge base */}
          <div className="cs-kb-panel">
            <h3>Knowledge Base</h3>
            <div className="cs-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search articles (e.g. track, refund, address)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedArticle(null);
                }}
              />
            </div>

            {/* Live Search Results */}
            {searchQuery.trim() !== '' && (
              <div className="cs-search-results">
                <h4>Search Results ({filteredArticles.length})</h4>
                {filteredArticles.length > 0 ? (
                  <ul>
                    {filteredArticles.map(art => (
                      <li key={art.id} onClick={() => setSelectedArticle(art)}>
                        {art.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-articles">No matching articles found. Try another term.</p>
                )}
              </div>
            )}

            {/* Quick Cards Grid */}
            <div className="cs-quick-grid">
              <div className="cs-quick-card" onClick={() => handleQuickCategoryClick('shipping')}>
                <Truck size={24} />
                <span>Track Packages</span>
              </div>
              <div className="cs-quick-card" onClick={() => handleQuickCategoryClick('returns')}>
                <RefreshCw size={24} />
                <span>Returns & Refunds</span>
              </div>
              <div className="cs-quick-card" onClick={() => handleQuickCategoryClick('billing')}>
                <CreditCard size={24} />
                <span>Payment Issues</span>
              </div>
              <div className="cs-quick-card" onClick={() => handleQuickCategoryClick('prime')}>
                <ShieldCheck size={24} />
                <span>Prime Account</span>
              </div>
            </div>

            {/* Selected Article Detail Panel */}
            <div className="cs-article-detail">
              {selectedArticle ? (
                <>
                  <h4>{selectedArticle.title}</h4>
                  <p>{selectedArticle.content}</p>
                </>
              ) : (
                <div className="cs-kb-placeholder">
                  <p>Click a quick topic card or search above to view detailed instructions here.</p>
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="cs-contact-row">
              <div className="contact-item">
                <Phone size={14} />
                <span>1800-400-VIBE (24/7 Toll-Free)</span>
              </div>
              <div className="contact-item">
                <Mail size={14} />
                <span>support@shopvibe.com</span>
              </div>
              <div className="contact-item">
                <Clock size={14} />
                <span>Agent Wait: ~2 mins</span>
              </div>
            </div>
          </div>

          {/* Right panel: Live chatbot */}
          <div className="cs-chat-panel">
            <div className="chat-header">
              <MessageSquare size={18} />
              <h4>VibeBot Chat Assistant</h4>
              <span className="online-indicator"></span>
            </div>

            <div className="chat-body">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                  {msg.sender === 'bot' && <div className="bot-avatar">VB</div>}
                  <div className="chat-bubble">
                    <p>{msg.text}</p>
                    <span className="chat-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble-row bot">
                  <div className="bot-avatar">VB</div>
                  <div className="chat-bubble typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-footer">
              <input
                type="text"
                placeholder="Ask VibeBot a question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
