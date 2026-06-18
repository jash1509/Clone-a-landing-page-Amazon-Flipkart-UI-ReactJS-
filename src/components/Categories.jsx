import * as Icons from 'lucide-react';
import { categories } from '../mockData';

export default function Categories({ activeCategory, setActiveCategory }) {
  // Map strings to Lucide icon components
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={30} /> : <Icons.HelpCircle size={30} />;
  };

  return (
    <section className="section-container">
      <h2 className="section-title">Shop by Category</h2>
      <div className="categories-grid" style={{ marginTop: '16px' }}>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <div
              key={category.id}
              className="category-card"
              style={{
                borderColor: isActive ? 'var(--color-amber)' : 'var(--color-border)',
                backgroundColor: isActive ? 'var(--color-white)' : '',
                boxShadow: isActive ? 'var(--shadow-md)' : ''
              }}
              onClick={() => setActiveCategory(isActive ? 'all' : category.id)}
            >
              <div 
                className="category-icon-wrapper"
                style={{
                  backgroundColor: isActive ? 'var(--color-amber)' : '',
                  color: isActive ? 'var(--color-navy-dark)' : ''
                }}
              >
                {renderIcon(category.icon)}
              </div>
              <span className="category-name">{category.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
