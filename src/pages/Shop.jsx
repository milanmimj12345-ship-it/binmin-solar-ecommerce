import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Filter, ArrowUpDown, ChevronDown, ChevronUp, SearchX, ShoppingBag, ChevronLeft } from 'lucide-react';

export default function Shop() {
  const { 
    products, 
    shopFilters, 
    setShopFilters, 
    searchQuery, 
    setSearchQuery,
    setCurrentPage
  } = useContext(AppContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedSection, setExpandedSection] = useState({
    brand: true,
    specs: true,
    price: true,
    delivery: true
  });

  const toggleSection = (section) => {
    setExpandedSection(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper arrays for filters
  const categories = ['All', 'Inverters', 'Solar Panels', 'BOS', 'Batteries'];
  
  const brands = useMemo(() => {
    // Return brands matching selected category to keep it clean, or all
    const bosCategories = ['BOS', 'ACDB', 'DCDB', 'Cables', 'Earthing', 'Lightning Arrestors', 'Energy Meters', 'Isolators', 'MC4 Connectors', 'Cabinets'];
    const catFiltered = shopFilters.category === 'All' 
      ? products 
      : shopFilters.category === 'BOS'
        ? products.filter(p => bosCategories.includes(p.category))
        : products.filter(p => p.category === shopFilters.category);
    return [...new Set(catFiltered.map(p => p.brand))];
  }, [products, shopFilters.category]);

  const capacities = ['All', '1kW', '2.2kW', '3kW', '4kW', '5kW', '6kW', '8kW'];
  const phases = ['All', '1 Phase', '3 Phase'];
  const wattages = ['All', '500W', '540W', '545W', '550W', '580W', '610W', '620W'];
  const technologies = ['All', 'Topcon', 'BiFacial', 'DCR', 'NDCR', 'Half-cut', 'Mono Perc'];

  // Reset Filters helper
  const handleResetFilters = () => {
    setShopFilters({
      category: 'All',
      brand: 'All',
      capacity: 'All',
      phase: 'All',
      wattage: 'All',
      technology: 'All',
      priceRange: [0, 200000],
      sortBy: 'default'
    });
    setSearchQuery('');
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 0. Status Filter (Hide Drafts from customers)
      if (p.status === 'Draft') return false;

      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      // 2. Category
      if (shopFilters.category !== 'All') {
        const bosCategories = ['BOS', 'ACDB', 'DCDB', 'Cables', 'Earthing', 'Lightning Arrestors', 'Energy Meters', 'Isolators', 'MC4 Connectors', 'Cabinets'];
        if (shopFilters.category === 'BOS') {
          if (!bosCategories.includes(p.category)) {
            return false;
          }
        } else if (p.category !== shopFilters.category) {
          return false;
        }
      }

      // 3. Brand
      if (shopFilters.brand !== 'All' && p.brand !== shopFilters.brand) {
        return false;
      }

      // 4. Inverter capacity
      if (shopFilters.capacity !== 'All' && p.specs['Capacity'] !== shopFilters.capacity) {
        return false;
      }

      // 5. Inverter phase
      if (shopFilters.phase !== 'All' && p.specs['Phase'] !== shopFilters.phase) {
        return false;
      }

      // 6. Solar Panel wattage
      if (shopFilters.wattage !== 'All' && p.specs['Wattage'] !== shopFilters.wattage) {
        return false;
      }

      // 7. Solar Panel technology
      if (shopFilters.technology !== 'All' && p.specs['Technology'] !== shopFilters.technology && p.specs['Type']?.indexOf(shopFilters.technology) === -1) {
        return false;
      }

      // 8. Price Range
      if (p.price < shopFilters.priceRange[0] || p.price > shopFilters.priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (shopFilters.sortBy === 'price-low-high') {
        return a.price - b.price;
      }
      if (shopFilters.sortBy === 'price-high-low') {
        return b.price - a.price;
      }
      if (shopFilters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // default order
    });
  }, [products, searchQuery, shopFilters]);

  return (
    <div style={{ padding: '24px 16px 100px 16px' }} className="animate-fade-in">
      {/* Back Button Link */}
      <button
        onClick={() => setCurrentPage('home')}
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'var(--bg-white)',
          border: '1px solid rgba(255,255,255,0.8)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '24px',
          padding: '8px 16px',
          borderRadius: '50px',
          fontSize: '0.85rem',
          boxShadow: '3px 3px 6px rgba(92, 45, 19, 0.06), -3px -3px 6px rgba(255, 255, 255, 0.8), inset 0 1px 2px rgba(255,255,255,0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.color = 'var(--primary-green)';
          e.currentTarget.style.borderColor = 'var(--primary-green)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.color = 'var(--text-dark)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
        }}
      >
        <ChevronLeft size={16} />
        <span>Back to Home</span>
      </button>

      <div style={{
        display: 'flex',
        gap: '24px',
        position: 'relative',
        alignItems: 'flex-start'
      }}>
      
      {/* LEFT Collapsible Filters Sidebar */}
      {isSidebarOpen && (
        <aside 
          className="clay-card"
          style={{
            width: '320px',
            flexShrink: 0,
            padding: '24px',
            position: 'sticky',
            top: '90px',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            paddingBottom: '12px'
          }}>
            <h3 style={{ fontWeight: '800', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} style={{ color: 'var(--primary-green)' }} />
              Filters
            </h3>
            <button 
              onClick={handleResetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-light)',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#E74C3C'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
            >
              Reset All
            </button>
          </div>

          {/* Category Filter Pills inside sidebar */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '10px' }}>Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setShopFilters(prev => ({ ...prev, category: cat, brand: 'All' }))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    background: shopFilters.category === cat ? 'var(--primary-green-light)' : 'var(--bg-cream-dark)',
                    color: shopFilters.category === cat ? 'var(--primary-green-dark)' : 'var(--text-medium)',
                    boxShadow: shopFilters.category === cat 
                      ? 'inset 1px 1px 2px rgba(255,255,255,0.4)' 
                      : 'inset 1px 1px 3px rgba(0,0,0,0.05)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {cat === 'All' ? 'All Products' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Checklist */}
          <div style={{ marginBottom: '20px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px' }}>
            <div 
              onClick={() => toggleSection('brand')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '12px' }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Brand</h4>
              {expandedSection.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expandedSection.brand && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                <label className="custom-checkbox">
                  <input 
                    type="radio" 
                    name="brand" 
                    checked={shopFilters.brand === 'All'} 
                    onChange={() => setShopFilters(prev => ({ ...prev, brand: 'All' }))}
                  />
                  <span className="checkmark"></span>
                  All Brands
                </label>
                {brands.map(brand => (
                  <label key={brand} className="custom-checkbox">
                    <input 
                      type="radio" 
                      name="brand" 
                      checked={shopFilters.brand === brand} 
                      onChange={() => setShopFilters(prev => ({ ...prev, brand: brand }))}
                    />
                    <span className="checkmark"></span>
                    {brand}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Technical Specifications Filters */}
          {(shopFilters.category === 'All' || shopFilters.category === 'Inverters' || shopFilters.category === 'Solar Panels') && (
            <div style={{ marginBottom: '20px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px' }}>
              <div 
                onClick={() => toggleSection('specs')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '12px' }}
              >
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Specifications</h4>
                {expandedSection.specs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {expandedSection.specs && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Capacity (Inverter Only) */}
                  {(shopFilters.category === 'All' || shopFilters.category === 'Inverters') && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Capacity (kW)</label>
                      <select 
                        value={shopFilters.capacity}
                        onChange={(e) => setShopFilters(prev => ({ ...prev, capacity: e.target.value }))}
                        className="clay-input"
                        style={{ width: '100%', height: '36px', padding: '0 12px', borderRadius: '10px', boxShadow: 'none', background: 'var(--bg-cream-dark)' }}
                      >
                        {capacities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Capacities' : c}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Phase (Inverter Only) */}
                  {(shopFilters.category === 'All' || shopFilters.category === 'Inverters') && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Phase</label>
                      <select 
                        value={shopFilters.phase}
                        onChange={(e) => setShopFilters(prev => ({ ...prev, phase: e.target.value }))}
                        className="clay-input"
                        style={{ width: '100%', height: '36px', padding: '0 12px', borderRadius: '10px', boxShadow: 'none', background: 'var(--bg-cream-dark)' }}
                      >
                        {phases.map(p => <option key={p} value={p}>{p === 'All' ? 'All Phases' : p}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Wattage (Solar Panels Only) */}
                  {(shopFilters.category === 'All' || shopFilters.category === 'Solar Panels') && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Panel Wattage</label>
                      <select 
                        value={shopFilters.wattage}
                        onChange={(e) => setShopFilters(prev => ({ ...prev, wattage: e.target.value }))}
                        className="clay-input"
                        style={{ width: '100%', height: '36px', padding: '0 12px', borderRadius: '10px', boxShadow: 'none', background: 'var(--bg-cream-dark)' }}
                      >
                        {wattages.map(w => <option key={w} value={w}>{w === 'All' ? 'All Wattages' : w}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Tech (Solar Panels Only) */}
                  {(shopFilters.category === 'All' || shopFilters.category === 'Solar Panels') && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Technology</label>
                      <select 
                        value={shopFilters.technology}
                        onChange={(e) => setShopFilters(prev => ({ ...prev, technology: e.target.value }))}
                        className="clay-input"
                        style={{ width: '100%', height: '36px', padding: '0 12px', borderRadius: '10px', boxShadow: 'none', background: 'var(--bg-cream-dark)' }}
                      >
                        {technologies.map(t => <option key={t} value={t}>{t === 'All' ? 'All Tech' : t}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Price Range Slider */}
          <div style={{ marginBottom: '20px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px' }}>
            <div 
              onClick={() => toggleSection('price')}
              style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '12px' }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Price Range</h4>
              {expandedSection.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expandedSection.price && (
              <div>
                <input 
                  type="range" 
                  min="0" 
                  max="200000"
                  step="1000"
                  value={shopFilters.priceRange[1]}
                  onChange={(e) => setShopFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--primary-green)',
                    height: '6px',
                    borderRadius: '5px',
                    background: 'var(--bg-cream-dark)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)' }}>
                  <span>Min: ₹{shopFilters.priceRange[0]}</span>
                  <span className="clay-badge-green" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>Max: ₹{shopFilters.priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Options */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px' }}>
            <div 
              onClick={() => toggleSection('delivery')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '12px' }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Delivery Options</h4>
              {expandedSection.delivery ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expandedSection.delivery && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="glass-tab active" style={{ flex: 1, border: 'none', fontSize: '0.75rem', padding: '6px 12px' }}>
                  Standard
                </button>
                <button className="glass-tab" style={{ flex: 1, border: 'none', fontSize: '0.75rem', padding: '6px 12px' }}>
                  Express Pick Up
                </button>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* RIGHT Product Grid Container */}
      <div style={{ flex: 1 }}>
        {/* Toolbar header */}
        <div className="glass-panel" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          marginBottom: '20px',
          borderRadius: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Header Info */}
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
              Showing {filteredProducts.length} results {searchQuery ? `for "${searchQuery}"` : ''}
            </span>
          </div>

          {/* Actions: Toggle Sidebar & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Sidebar toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="clay-btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.8rem', border: 'none', height: '36px' }}
            >
              <Filter size={14} />
              <span>{isSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={14} style={{ color: 'var(--text-light)' }} />
              <select
                value={shopFilters.sortBy}
                onChange={(e) => setShopFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="clay-input"
                style={{
                  height: '36px',
                  padding: '0 24px 0 12px',
                  fontSize: '0.8rem',
                  borderRadius: '10px',
                  boxShadow: 'none',
                  border: '1px solid rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
              >
                <option value="default">Default Sort</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Promo Banner for Solar Packages */}
        <div 
          className="clay-card animate-fade-in"
          style={{
            padding: '20px 24px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(255, 93, 0, 0.04) 0%, rgba(255, 224, 102, 0.08) 100%)',
            border: '1px solid rgba(255, 93, 0, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            boxShadow: '0 8px 20px rgba(92, 45, 19, 0.03), var(--clay-shadow)'
          }}
        >
          <div style={{ flex: 1, minWidth: '240px' }}>
            <span className="clay-badge-green" style={{ fontSize: '0.7rem', padding: '4px 10px', marginBottom: '6px', display: 'inline-block' }}>
              Rooftop Packages
            </span>
            <h4 style={{ margin: 0, fontWeight: '800', color: 'var(--text-dark)', fontSize: '1.05rem', letterSpacing: '-0.3px' }}>
              Looking for a Complete Rooftop Solar System?
            </h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--text-medium)', fontWeight: '600', lineHeight: '1.4' }}>
              Configure all 9 required components (modules, inverter, cables, safety units, etc.) for a 3kW or 5kW system and buy them together. Select brands and save time!
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('package-configurator')}
            className="clay-btn-primary"
            style={{
              padding: '8px 20px',
              fontSize: '0.82rem',
              fontWeight: '700',
              border: 'none',
              height: '38px',
              borderRadius: '50px',
              cursor: 'pointer'
            }}
          >
            Build Package
          </button>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid animate-fade-in">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="clay-card animate-fade-in" style={{
            padding: '80px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <SearchX size={48} style={{ color: 'var(--text-light)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>No Products Found</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '380px' }}>
              We couldn't find matches for your current search or filters. Try adjusting your sidebar toggles or search keyword.
            </p>
            <button onClick={handleResetFilters} className="clay-btn-primary" style={{ border: 'none', padding: '10px 20px', fontSize: '0.85rem' }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
