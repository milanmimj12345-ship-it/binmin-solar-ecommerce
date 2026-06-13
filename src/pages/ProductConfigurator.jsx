import React, { useContext, useState, useEffect, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ChevronLeft, ShoppingCart, ShieldCheck, 
  Star, Truck, Check, Info, AlertCircle 
} from 'lucide-react';
import { ProductMockSvg } from '../components/ProductCard';

// Define which specs to configure per category
const CONFIG_FIELDS = {
  'Inverters': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Phase', key: 'Phase', type: 'spec' },
    { label: 'Capacity (Watts)', key: 'Capacity', type: 'spec' }
  ],
  'Solar Panels': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Technology', key: 'Technology', type: 'spec' },
    { label: 'Wattage', key: 'Wattage', type: 'spec' }
  ],
  'ACDB': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Phase', key: 'Phase', type: 'spec' },
    { label: 'MCB / Capacity', key: 'MCB / Capacity', type: 'spec' }
  ],
  'DCDB': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Strings', key: 'Strings', type: 'spec' },
    { label: 'SPD Type', key: 'SPD Type', type: 'spec' }
  ],
  'Cables': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Size', key: 'Size', type: 'spec' },
    { label: 'Length', key: 'Length', type: 'spec' },
    { label: 'Type', key: 'Type', type: 'spec' }
  ],
  'Earthing': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'System Capacity', key: 'System Capacity', type: 'spec' },
    { label: 'Rod Material', key: 'Rod Material', type: 'spec' }
  ],
  'Lightning Arrestors': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Type', key: 'Type', type: 'spec' },
    { label: 'Height', key: 'Height', type: 'spec' }
  ],
  'Energy Meters': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Phase', key: 'Phase', type: 'spec' },
    { label: 'Current', key: 'Current', type: 'spec' }
  ],
  'Isolators': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Poles', key: 'Poles', type: 'spec' },
    { label: 'Rating', key: 'Rating', type: 'spec' }
  ],
  'Batteries': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Type / Chemistry', key: 'Type', type: 'spec' },
    { label: 'Capacity', key: 'Capacity', type: 'spec' }
  ],
  'MC4 Connectors': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Type', key: 'Type', type: 'spec' },
    { label: 'Protection', key: 'Protection', type: 'spec' }
  ],
  'Cabinets': [
    { label: 'Brand', key: 'brand', type: 'property' },
    { label: 'Material', key: 'Material', type: 'spec' },
    { label: 'Protection', key: 'Protection', type: 'spec' },
    { label: 'Mounting', key: 'Mounting', type: 'spec' }
  ]
};

// Map brand to inverter images
const getInverterImage = (brand) => {
  const b = brand.toLowerCase();
  if (b.includes('deye')) return '/assets/inverter-deye.png';
  if (b.includes('exide')) return '/assets/inverter-exide.png';
  if (b.includes('fox')) return '/assets/inverter-fox.png';
  if (b.includes('microtek')) return '/assets/inverter-microtek.png';
  if (b.includes('waaree')) return '/assets/inverter-waaree.png';
  return null;
};

// Map brand to panel images
const getPanelImage = (brand) => {
  const b = brand.toLowerCase();
  if (b.includes('microtek')) return '/assets/panel-microtek.png';
  if (b.includes('waaree')) return '/assets/panel-waaree.png';
  if (b.includes('adani')) return '/assets/panel-adani.png';
  if (b.includes('satvik') || b.includes('saatvik')) return '/assets/panel-satvik.png';
  return null;
};

const shouldScaleImage = (product) => {
  if (!product) return false;
  const name = product.name.toLowerCase();
  const cat = product.category.toLowerCase();
  return (
    (name.includes('havells') && name.includes('dcdb')) ||
    (name.includes('excel') && name.includes('arrestor')) ||
    (name.includes('vision tech') && name.includes('meter')) ||
    cat === 'cables' || name.includes('cable') ||
    name.includes('mc4') ||
    (name.includes('excel') && name.includes('earthing')) ||
    (name.includes('havells') && name.includes('cabinet')) ||
    cat === 'batteries' || name.includes('battery')
  );
};

// Valid React component to render the product image or fallback vector SVG
function ProductImageShowcase({ product }) {
  const [imgErr, setImgErr] = useState(false);

  // Reset error state if product changes
  useEffect(() => {
    setImgErr(false);
  }, [product]);

  if (!product) return null;
  const { category, brand, image } = product;

  let src = image;
  if (category === 'Inverters') {
    src = getInverterImage(brand) || image;
  } else if (category === 'Solar Panels') {
    src = getPanelImage(brand) || image;
  }

  if (imgErr) {
    return <ProductMockSvg category={category} name={product.name} />;
  }

  const isPanel = category === 'Solar Panels';

  return (
    <img 
      src={src} 
      alt={product.name}
      onError={() => setImgErr(true)}
      className={`${isPanel ? "details-panel-img" : "details-inverter-img"} ${shouldScaleImage(product) ? 'details-scaled-img' : ''}`}
    />
  );
}

export default function ProductConfigurator() {
  const { 
    products, 
    selectedCategory, 
    setCurrentPage, 
    addToCart, 
    userProfile 
  } = useContext(AppContext);

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState(userProfile.pincode || '');
  const [pincodeStatus, setPincodeStatus] = useState(null); // 'success' | 'error' | null
  const [animateBtn, setAnimateBtn] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'desc'
  const [errorMsg, setErrorMsg] = useState(null);

  // Filter products by selected category
  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Set active product to the first product in the category
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    if (categoryProducts.length > 0) {
      // Prefer top items as the default selected product
      const defaultProduct = categoryProducts.find(p => p.isTopItem) || categoryProducts[0];
      setActiveProduct(defaultProduct);
    }
  }, [categoryProducts]);

  useEffect(() => {
    if (activeProduct) {
      setQuantity(activeProduct.stock > 0 ? 1 : 0);
    }
  }, [activeProduct?.id, activeProduct?.stock]);

  // Get configuration fields for the active category
  const fields = useMemo(() => {
    return CONFIG_FIELDS[selectedCategory] || [
      { label: 'Brand', key: 'brand', type: 'property' }
    ];
  }, [selectedCategory]);

  // Helper to extract unique values of a field across this category's products
  const getFieldValues = (field) => {
    const values = new Set();
    categoryProducts.forEach(p => {
      if (field.type === 'property') {
        values.add(p[field.key]);
      } else {
        if (p.specs && p.specs[field.key]) {
          values.add(p.specs[field.key]);
        }
      }
    });
    return Array.from(values);
  };

  // Logic to handle selection changes
  const handleSelectOption = (field, value) => {
    if (!activeProduct) return;
    setErrorMsg(null);

    // 1. Build the target specs map we want to match
    const targetSpecs = { ...activeProduct.specs };
    let targetBrand = activeProduct.brand;

    if (field.type === 'property' && field.key === 'brand') {
      targetBrand = value;
    } else {
      targetSpecs[field.key] = value;
    }

    // 2. Try to find a perfect match
    let match = categoryProducts.find(p => {
      if (p.brand !== targetBrand) return false;
      // Check all other configurator fields
      return fields.every(f => {
        if (f.type === 'property') {
          return p[f.key] === (f.key === 'brand' ? targetBrand : activeProduct[f.key]);
        } else {
          return p.specs && p.specs[f.key] === targetSpecs[f.key];
        }
      });
    });

    // 3. If no perfect match, find a product matching the changed option first,
    // then match as many other current specs as possible
    if (!match) {
      match = categoryProducts.find(p => {
        if (field.type === 'property') {
          return p[field.key] === value;
        } else {
          return p.specs && p.specs[field.key] === value;
        }
      });

      if (!match) {
        // Safe fallback: should not happen since options are extracted from database
        setErrorMsg("This configuration option is not available.");
        return;
      }
    }

    setActiveProduct(match);
  };

  const handleIncrement = () => setQuantity(q => q < (activeProduct?.stock !== undefined ? activeProduct.stock : 50) ? q + 1 : q);
  const handleDecrement = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6 || isNaN(pincode)) {
      setPincodeStatus('error');
      return;
    }
    if (pincode.startsWith('4') || pincode.startsWith('1') || pincode.startsWith('5')) {
      setPincodeStatus('success');
    } else {
      setPincodeStatus('error');
    }
  };

  const handleAddToCart = () => {
    if (!activeProduct) return;
    addToCart(activeProduct, quantity);
    setAnimateBtn(true);
    setTimeout(() => setAnimateBtn(false), 800);
  };

  const handleBuyNow = () => {
    if (!activeProduct) return;
    addToCart(activeProduct, quantity);
    setCurrentPage('cart');
  };

  if (!selectedCategory || categoryProducts.length === 0 || !activeProduct) {
    return (
      <div style={{ padding: '80px 16px', textAlign: 'center' }} className="animate-fade-in">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '16px' }}>No Category Selected</h2>
        <button onClick={() => setCurrentPage('home')} className="clay-btn-primary" style={{ border: 'none', margin: '0 auto' }}>
          Go to Home Screen
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 16px 100px 16px' }} className="animate-fade-in">
      {/* Back button link */}
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
        <span>Back to Categories</span>
      </button>

      {/* Main Grid: Left Image, Right Configurator */}
      <div className="product-details-container" style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1.1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Left Side: Dynamic Showcase (Transparent floating Bob) */}
        <div className="details-image-showcase" style={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: selectedCategory === 'Solar Panels' ? '540px' : '460px',
          overflow: 'visible',
          background: 'transparent'
        }}>
          <ProductImageShowcase product={activeProduct} />
        </div>

        {/* Right Side: Options Selectors & Checkout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Badge & Title */}
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="clay-badge-green">{selectedCategory}</span>
              {activeProduct.isTopItem && (
                <span className="clay-badge-cream" style={{ background: '#FFF9E6', color: '#D4AC0D' }}>
                  Best Seller
                </span>
              )}
            </div>
            <h1 style={{
              fontSize: '2.1rem',
              fontWeight: '800',
              color: 'var(--text-dark)',
              lineHeight: '1.2',
              letterSpacing: '-1px',
              marginBottom: '4px'
            }}>
              {activeProduct.name}
            </h1>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '600', display: 'block' }}>
              Brand: {activeProduct.brand}
            </span>
            <div style={{ marginTop: '6px', fontSize: '0.82rem', fontWeight: '700' }}>
              {activeProduct.stock === 0 ? (
                <span style={{ color: '#C0392B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={14} /> Out of Stock (Unavailable)
                </span>
              ) : activeProduct.stock <= 10 ? (
                <span style={{ color: '#D35400', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={14} /> Low Stock: Only {activeProduct.stock} left!
                </span>
              ) : (
                <span style={{ color: '#1E8449', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={14} /> In Stock ({activeProduct.stock} available)
                </span>
              )}
            </div>
          </div>

          {/* Dynamic Description */}
          <p style={{ color: 'var(--text-medium)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            {activeProduct.description}
          </p>

          {/* Alert Message for Unavailable Combinations */}
          {errorMsg && (
            <div style={{
              background: '#FDF2F2',
              color: '#9B1C1C',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Characteristics & Variants Selectors */}
          <div className="clay-card-inset" style={{
            padding: '20px 24px',
            background: 'var(--bg-cream-dark)',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            {fields.map(field => {
              const values = getFieldValues(field);
              const currentValue = field.type === 'property' 
                ? activeProduct[field.key] 
                : activeProduct.specs[field.key];

              return (
                <div key={field.label}>
                  <h4 style={{ 
                    fontSize: '0.82rem', 
                    fontWeight: '800', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    color: 'var(--text-medium)',
                    marginBottom: '8px'
                  }}>
                    Select {field.label}
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {values.map(val => {
                      const isActive = val === currentValue;
                      return (
                        <button
                          key={val}
                          onClick={() => handleSelectOption(field, val)}
                          className={isActive ? "clay-btn-primary" : "clay-btn-secondary"}
                          style={{
                            padding: '6px 14px',
                            fontSize: '0.8rem',
                            borderRadius: '50px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            minHeight: 'auto',
                            boxShadow: isActive 
                              ? '0 3px 6px rgba(16,185,129,0.2), inset 0 2px 2px rgba(255,255,255,0.3)'
                              : '2px 2px 4px rgba(163,177,198,0.25), -2px -2px 4px rgba(255,255,255,0.8)'
                          }}
                        >
                          {isActive && <Check size={12} />}
                          <span>{val}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price & Checkout Section */}
          <div className="clay-card-inset" style={{
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-cream-dark)'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase' }}>
                Total Cost
              </span>
              <h2 style={{ fontSize: '1.9rem', fontWeight: '800', color: 'var(--primary-green-dark)', lineHeight: '1' }}>₹ {(Number(activeProduct.price) || 0).toFixed(2)}
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={handleDecrement} disabled={activeProduct.stock === 0} className="clay-btn-round" style={{ width: '36px', height: '36px', fontSize: '1.1rem', opacity: activeProduct.stock === 0 ? 0.5 : 1, cursor: activeProduct.stock === 0 ? 'not-allowed' : 'pointer' }}>-</button>
              <span className="clay-card-inset" style={{
                width: '42px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1rem',
                background: 'var(--bg-cream-dark)',
                borderRadius: '10px',
                opacity: activeProduct.stock === 0 ? 0.6 : 1
              }}>{quantity}</span>
              <button onClick={handleIncrement} disabled={activeProduct.stock === 0} className="clay-btn-round" style={{ width: '36px', height: '36px', fontSize: '1.1rem', opacity: activeProduct.stock === 0 ? 0.5 : 1, cursor: activeProduct.stock === 0 ? 'not-allowed' : 'pointer' }}>+</button>
            </div>
          </div>

          {/* Delivery Checker */}
          <div className="glass-panel" style={{ padding: '16px', borderRadius: '18px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={14} style={{ color: 'var(--primary-green)' }} />
              <span>Check Delivery Availability</span>
            </h4>
            <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                maxLength="6" 
                placeholder="Enter 6-digit zipcode" 
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                className="clay-input"
                style={{ flex: '1', height: '36px', borderRadius: '10px', padding: '0 12px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="clay-btn-primary" style={{ height: '36px', borderRadius: '10px', fontSize: '0.8rem', padding: '0 16px', border: 'none' }}>
                Verify
              </button>
            </form>
            {pincodeStatus === 'success' && (
              <div style={{ color: '#1E8449', fontSize: '0.8rem', marginTop: '8px', fontWeight: '600', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Check size={12} />
                <span>Delivery available! Expected shipping in 2-3 days. Free Delivery.</span>
              </div>
            )}
            {pincodeStatus === 'error' && (
              <div style={{ color: '#A93226', fontSize: '0.8rem', marginTop: '8px', fontWeight: '600', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <AlertCircle size={12} />
                <span>Sorry, we do not ship solar units to this pincode at this time.</span>
              </div>
            )}
          </div>

          {/* Main Action CTAs */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <button 
              onClick={handleAddToCart}
              className="clay-btn-secondary" 
              disabled={activeProduct.stock === 0}
              style={{
                flex: '1',
                height: '48px',
                border: 'none',
                fontSize: '0.95rem',
                background: activeProduct.stock === 0 
                  ? '#BDC3C7' 
                  : animateBtn 
                    ? 'var(--primary-green-light)' 
                    : 'var(--bg-white)',
                color: activeProduct.stock === 0
                  ? '#7F8C8D'
                  : animateBtn 
                    ? 'var(--primary-green-dark)' 
                    : 'var(--text-dark)',
                cursor: activeProduct.stock === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ShoppingCart size={16} />
              <span>{activeProduct.stock === 0 ? 'Out of Stock' : animateBtn ? 'Added!' : 'Add to Cart'}</span>
            </button>
            <button 
              onClick={handleBuyNow}
              className="clay-btn-primary" 
              disabled={activeProduct.stock === 0}
              style={{
                flex: '1', 
                height: '48px', 
                border: 'none', 
                fontSize: '0.95rem',
                background: activeProduct.stock === 0 ? '#BDC3C7' : undefined,
                color: activeProduct.stock === 0 ? '#7F8C8D' : undefined,
                cursor: activeProduct.stock === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {activeProduct.stock === 0 ? 'Unavailable' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section: Spec Details and Product Overview */}
      <div style={{ marginTop: '50px' }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '2px solid rgba(0,0,0,0.06)',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`glass-tab ${activeTab === 'specs' ? 'active' : ''}`}
            style={{ border: 'none' }}
          >
            Technical Specifications
          </button>
          <button 
            onClick={() => setActiveTab('desc')}
            className={`glass-tab ${activeTab === 'desc' ? 'active' : ''}`}
            style={{ border: 'none' }}
          >
            Product Overview
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="clay-card" style={{ padding: '24px', borderRadius: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
              <tbody>
                {Object.entries(activeProduct.specs).map(([key, val], idx) => (
                  <tr 
                    key={key} 
                    style={{
                      borderBottom: idx === Object.keys(activeProduct.specs).length - 1 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                      background: idx % 2 === 0 ? 'rgba(0,0,0,0.01)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '12px 20px', fontWeight: '700', color: 'var(--text-medium)', width: '35%' }}>
                      {key}
                    </td>
                    <td style={{ padding: '12px 20px', fontWeight: '500', color: 'var(--text-dark)' }}>
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'desc' && (
          <div className="clay-card" style={{ padding: '32px', borderRadius: '24px', lineHeight: '1.7' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '14px' }}>Product Details</h3>
            <p style={{ color: 'var(--text-medium)', marginBottom: '20px' }}>{activeProduct.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary-green-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-green-dark)'
                }}>
                  <Check size={16} />
                </div>
                <div>
                  <h5 style={{ fontWeight: '800', fontSize: '0.9rem' }}>Fast Freight Shipping</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    Double-crate packaging to avoid PV micro-cracks or damage during transit.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary-green-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-green-dark)'
                }}>
                  <Info size={16} />
                </div>
                <div>
                  <h5 style={{ fontWeight: '800', fontSize: '0.9rem' }}>Long-Term Performance Warranty</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    Includes manufacturer performance warranties ranging from 5 to 25 years.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-details-container {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
