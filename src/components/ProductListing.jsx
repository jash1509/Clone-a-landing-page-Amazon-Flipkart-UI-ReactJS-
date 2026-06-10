import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../mockData';
import { Search } from 'lucide-react';

export default function ProductListing({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, onAddToCart, onToggleWishlist, wishlist }) {
  // Filter products by search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };

  return (
    <section className="products-wrapper">
      <div className="products-header-bar">
        <h2 className="section-title">
          {activeCategory === 'all' ? 'Recommended Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Specials`}
        </h2>
        <div className="products-filter-info">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <Search size={48} className="empty-results-icon" />
          <h3 className="empty-results-title">No Products Found</h3>
          <p className="empty-results-desc">
            We couldn't find any products matching "{searchTerm}" {activeCategory !== 'all' && `in Category "${activeCategory}"`}.
          </p>
          <button className="empty-results-btn" onClick={handleResetFilters}>
            Clear Search & Filters
          </button>
        </div>
      )}
    </section>
  );
}
