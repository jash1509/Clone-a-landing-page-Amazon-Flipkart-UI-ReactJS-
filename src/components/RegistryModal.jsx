import { useState, useEffect } from 'react';
import { X, Gift, Calendar, MapPin, User, Search, Link2, Plus, Check, ClipboardCopy, Trash2 } from 'lucide-react';
import { products } from '../mockData';

const DEFAULT_REGISTRIES = [
  {
    id: 'RG-10023',
    owner: 'Jash Barot',
    title: "Jash's Tech Birthday Bash",
    type: 'Birthday',
    date: '2026-07-15',
    location: 'Mumbai, MH',
    description: 'Looking to upgrade my desk setup! Family and friends can pick items from here.',
    items: [
      { id: 1, name: "OnePlus Nord CE4 Lite 5G (8GB RAM, 128GB Storage)", price: 19999, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60", bought: false },
      { id: 2, name: "boAt Airdopes 141 Bluetooth Wireless Earbuds", price: 1299, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60", bought: true }
    ]
  },
  {
    id: 'RG-20095',
    owner: 'Priya & Amit',
    title: 'Amit & Priya Wedding Registry',
    type: 'Wedding',
    date: '2026-10-24',
    location: 'Pune, MH',
    description: 'Help us set up our new kitchen and home! Thank you for sharing our special day.',
    items: [
      { id: 5, name: "Prestige Iris 750W Mixer Grinder (3 Stainless Steel Jars)", price: 3299, image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=500&auto=format&fit=crop&q=60", bought: false },
      { id: 6, name: "Pigeon Healthifry Digital Air Fryer (4.2 Liter, Green)", price: 4299, image: "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=500&auto=format&fit=crop&q=60", bought: false }
    ]
  }
];

export default function RegistryModal({ isOpen, onClose, triggerToast }) {
  const [registries, setRegistries] = useState(() => {
    try {
      const saved = localStorage.getItem('shopvibe_registries');
      return saved ? JSON.parse(saved) : DEFAULT_REGISTRIES;
    } catch {
      return DEFAULT_REGISTRIES;
    }
  });

  // Active tab: 'find' | 'create' | 'view'
  const [activeTab, setActiveTab] = useState('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegistry, setSelectedRegistry] = useState(null);

  // Create form states
  const [ownerName, setOwnerName] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [eventLoc, setEventLoc] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  // Registry product search (inside registry editing)
  const [prodSearch, setProdSearch] = useState('');

  // Save registries to localStorage
  useEffect(() => {
    localStorage.setItem('shopvibe_registries', JSON.stringify(registries));
  }, [registries]);

  if (!isOpen) return null;

  // Filter products for adding to registry
  const matchedProducts = prodSearch.trim() === ''
    ? []
    : products.filter(p => p.name.toLowerCase().includes(prodSearch.toLowerCase()));

  // Search existing registries
  const searchResults = registries.filter(reg => 
    reg.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRegistry = (e) => {
    e.preventDefault();
    if (!ownerName || !eventTitle || !eventDate) {
      triggerToast('Please fill out all required fields.', 'info');
      return;
    }

    const newRegistry = {
      id: 'RG-' + Math.floor(10000 + Math.random() * 90000),
      owner: ownerName,
      title: eventTitle,
      type: eventType,
      date: eventDate,
      location: eventLoc || 'Online',
      description: eventDesc,
      items: []
    };

    setRegistries(prev => [newRegistry, ...prev]);
    setSelectedRegistry(newRegistry);
    setActiveTab('view');
    
    // Clear form
    setOwnerName('');
    setEventTitle('');
    setEventDate('');
    setEventLoc('');
    setEventDesc('');

    triggerToast(`"${newRegistry.title}" Created!`, 'success');
  };

  const handleCopyLink = (regId) => {
    navigator.clipboard.writeText(`https://shopvibe.com/registry/${regId}`);
    triggerToast('Shareable registry link copied!', 'success');
  };

  const handleAddItemToRegistry = (registryId, product) => {
    setRegistries(prevRegs => {
      return prevRegs.map(reg => {
        if (reg.id === registryId) {
          const exists = reg.items.some(item => item.id === product.id);
          if (exists) return reg;
          return {
            ...reg,
            items: [...reg.items, { id: product.id, name: product.name, price: product.price, image: product.image, bought: false }]
          };
        }
        return reg;
      });
    });

    // Update active viewed registry context
    setSelectedRegistry(prev => {
      if (prev && prev.id === registryId) {
        const exists = prev.items.some(item => item.id === product.id);
        if (exists) return prev;
        return {
          ...prev,
          items: [...prev.items, { id: product.id, name: product.name, price: product.price, image: product.image, bought: false }]
        };
      }
      return prev;
    });

    setProdSearch('');
    triggerToast('Product added to Registry list!', 'success');
  };

  const handleRemoveItem = (registryId, productId) => {
    setRegistries(prevRegs => {
      return prevRegs.map(reg => {
        if (reg.id === registryId) {
          return {
            ...reg,
            items: reg.items.filter(item => item.id !== productId)
          };
        }
        return reg;
      });
    });

    setSelectedRegistry(prev => {
      if (prev && prev.id === registryId) {
        return {
          ...prev,
          items: prev.items.filter(item => item.id !== productId)
        };
      }
      return prev;
    });

    triggerToast('Product removed from Registry.', 'info');
  };

  const toggleBoughtState = (registryId, productId) => {
    setRegistries(prevRegs => {
      return prevRegs.map(reg => {
        if (reg.id === registryId) {
          return {
            ...reg,
            items: reg.items.map(item => item.id === productId ? { ...item, bought: !item.bought } : item)
          };
        }
        return reg;
      });
    });

    setSelectedRegistry(prev => {
      if (prev && prev.id === registryId) {
        return {
          ...prev,
          items: prev.items.map(item => item.id === productId ? { ...item, bought: !item.bought } : item)
        };
      }
      return prev;
    });

    triggerToast('Gift purchase status updated!', 'success');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container registry-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="registry-header">
          <div className="header-icon"><Gift size={28} /></div>
          <h2>Gift <span>Registry Center</span></h2>
          <p>Create lists for your special occasions or find a registry to gift others</p>
        </div>

        <div className="registry-tabs">
          <button 
            className={`registry-tab ${activeTab === 'find' ? 'active' : ''}`}
            onClick={() => { setActiveTab('find'); setSelectedRegistry(null); }}
          >
            Find a Registry
          </button>
          <button 
            className={`registry-tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => { setActiveTab('create'); setSelectedRegistry(null); }}
          >
            Create your Registry
          </button>
          {selectedRegistry && (
            <button 
              className={`registry-tab ${activeTab === 'view' ? 'active' : ''}`}
              onClick={() => setActiveTab('view')}
            >
              Viewing: {selectedRegistry.title.split(' ')[0]}...
            </button>
          )}
        </div>

        <div className="registry-body-content">
          {/* FIND REGISTRY */}
          {activeTab === 'find' && (
            <div className="find-registry-container">
              <div className="search-field">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search registries by name (e.g. Jash, Priya)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="registry-results">
                <h3>All Active Registries ({searchResults.length})</h3>
                {searchResults.length > 0 ? (
                  <div className="results-grid">
                    {searchResults.map(reg => (
                      <div key={reg.id} className="registry-result-card" onClick={() => { setSelectedRegistry(reg); setActiveTab('view'); }}>
                        <div className="registry-card-type">{reg.type}</div>
                        <h4>{reg.title}</h4>
                        <div className="registry-card-meta">
                          <span><User size={12} /> {reg.owner}</span>
                          <span><Calendar size={12} /> {reg.date}</span>
                          <span><MapPin size={12} /> {reg.location}</span>
                        </div>
                        <p className="registry-card-desc">{reg.description || 'No description provided.'}</p>
                        <div className="registry-card-footer">
                          <span>{reg.items.length} items registered</span>
                          <button 
                            type="button" 
                            className="view-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRegistry(reg);
                              setActiveTab('view');
                            }}
                          >
                            View Registry
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-registries">
                    <p>No registries found. Try searching for a different owner name.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CREATE REGISTRY */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateRegistry} className="create-registry-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-owner">Registrant / Owner Name *</label>
                  <input
                    id="reg-owner"
                    type="text"
                    placeholder="e.g. Jash Barot"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-title">Event Registry Title *</label>
                  <input
                    id="reg-title"
                    type="text"
                    placeholder="e.g. Jash's Housewarming Party"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-type">Event Type</label>
                  <select
                    id="reg-type"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Housewarming">Housewarming</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="reg-date">Event Date *</label>
                  <input
                    id="reg-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-loc">Location</label>
                  <input
                    id="reg-loc"
                    type="text"
                    placeholder="e.g. Mumbai, MH"
                    value={eventLoc}
                    onChange={(e) => setEventLoc(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-desc">Registry Notes / Description</label>
                <textarea
                  id="reg-desc"
                  placeholder="Share a message with your family and friends..."
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="create-reg-submit">
                Create & Add Items
              </button>
            </form>
          )}

          {/* VIEW / MANAGE SINGLE REGISTRY */}
          {activeTab === 'view' && selectedRegistry && (
            <div className="view-registry-detail">
              <div className="registry-detail-banner">
                <div className="registry-badge">{selectedRegistry.type}</div>
                <h2>{selectedRegistry.title}</h2>
                <div className="registry-detail-meta">
                  <span><strong>Owner:</strong> {selectedRegistry.owner}</span>
                  <span><strong>Date:</strong> {selectedRegistry.date}</span>
                  <span><strong>Location:</strong> {selectedRegistry.location}</span>
                  <span className="registry-id">ID: {selectedRegistry.id}</span>
                </div>
                <p>{selectedRegistry.description}</p>
                <div className="registry-detail-actions">
                  <button className="copy-link-btn" onClick={() => handleCopyLink(selectedRegistry.id)}>
                    <Link2 size={14} /> Copy Share Link
                  </button>
                </div>
              </div>

              {/* Add item interface */}
              <div className="registry-add-items-section">
                <h3>Add Products to Registry</h3>
                <div className="search-field small">
                  <Search size={14} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search catalog products (e.g. earbuds, air dryer, saree)..."
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                  />
                </div>

                {prodSearch.trim() !== '' && (
                  <div className="registry-search-results">
                    {matchedProducts.length > 0 ? (
                      <ul>
                        {matchedProducts.map(p => (
                          <li key={p.id}>
                            <img src={p.image} alt={p.name} />
                            <div className="info">
                              <h5>{p.name}</h5>
                              <span>₹{p.price.toLocaleString('en-IN')}</span>
                            </div>
                            <button onClick={() => handleAddItemToRegistry(selectedRegistry.id, p)}>
                              <Plus size={14} /> Add
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-res">No matching items in ShopVibe catalog.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Registered Items list */}
              <div className="registered-items-list">
                <h3>Registry Checklist ({selectedRegistry.items.length})</h3>
                {selectedRegistry.items.length > 0 ? (
                  <div className="checklist-grid">
                    {selectedRegistry.items.map(item => (
                      <div key={item.id} className={`checklist-item-card ${item.bought ? 'bought' : ''}`}>
                        <img src={item.image} alt={item.name} />
                        <div className="details">
                          <h4>{item.name}</h4>
                          <span className="price">₹{item.price.toLocaleString('en-IN')}</span>
                          <div className="status-label">
                            {item.bought ? (
                              <span className="badge-bought"><Check size={12} /> Gift Purchased</span>
                            ) : (
                              <span className="badge-needed">Needed</span>
                            )}
                          </div>
                        </div>

                        <div className="actions">
                          <button 
                            className={`toggle-bought-btn ${item.bought ? 'undo' : ''}`}
                            onClick={() => toggleBoughtState(selectedRegistry.id, item.id)}
                            title={item.bought ? "Mark as needed" : "Mark as bought/gifted"}
                          >
                            {item.bought ? "Unmark Gift" : "Mark as Gifted"}
                          </button>
                          <button 
                            className="remove-item-btn" 
                            onClick={() => handleRemoveItem(selectedRegistry.id, item.id)}
                            title="Remove from registry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-checklist">
                    <p>No products added yet. Use the search field above to register products for your event!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
