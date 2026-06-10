import React from 'react';
import { featuredBrands } from '../mockData';

export default function FeaturedBrands() {
  return (
    <section className="section-container">
      <h2 className="section-title">Featured Brands</h2>
      <div className="brands-slider" style={{ marginTop: '16px' }}>
        {featuredBrands.map((brand) => (
          <div className="brand-card" key={brand.id}>
            <div className="brand-logo-container">
              {brand.logo}
            </div>
            <h3 className="brand-name">{brand.name}</h3>
            <span className="brand-offer">{brand.offer}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
