import React, { useContext, useState, useEffect, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ChevronLeft, ShoppingCart, Truck, Calendar, MapPin, Check, AlertCircle } from 'lucide-react';

// Larger detailed mock SVGs for details page
const DetailProductSvg = ({ category, name }) => {
  if (category === 'Solar Panels') {
    return (
      <svg width="100%" height="340" viewBox="0 0 300 240">
        <rect x="30" y="20" width="240" height="200" rx="12" fill="#EAEDED" stroke="#BDC3C7" strokeWidth="4" />
        <rect x="38" y="28" width="224" height="184" rx="8" fill="radial-gradient(circle, #2E4053 0%, #1A252F 100%)" />
        <path d="M 38 28 L 262 28 L 262 212 L 38 212 Z" fill="#1C2833" />
        {/* Cells */}
        <line x1="94" y1="28" x2="94" y2="212" stroke="#566573" strokeWidth="2.5" />
        <line x1="150" y1="28" x2="150" y2="212" stroke="#BDC3C7" strokeWidth="3" />
        <line x1="206" y1="28" x2="206" y2="212" stroke="#566573" strokeWidth="2.5" />
        {/* Horizontal cell connections */}
        {[45, 65, 85, 105, 125, 145, 165, 185, 205].map(y => (
          <line key={y} x1="38" y1={y} x2="262" y2={y} stroke="#566573" strokeWidth="1.5" />
        ))}
        {/* Sun reflection */}
        <path d="M 38 70 L 120 28 L 180 212 Z" fill="rgba(255,255,255,0.06)" />
        <circle cx="150" cy="120" r="30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
      </svg>
    );
  }

  if (category === 'Inverters') {
    return (
      <svg width="100%" height="340" viewBox="0 0 300 240">
        <rect x="60" y="20" width="180" height="200" rx="24" fill="#FFFFFF" stroke="#E5E8E8" strokeWidth="2" />
        <path d="M 60 50 L 60 44 A 24 24 0 0 1 84 20 L 216 20 A 24 24 0 0 1 240 44 L 240 50 Z" fill="var(--primary-green)" />
        {/* Large LCD Display */}
        <rect x="90" y="70" width="120" height="50" rx="8" fill="#1C2833" />
        <text x="105" y="100" fill="var(--accent-mint)" fontSize="20" fontWeight="800">5.00 kW</text>
        {/* Stats */}
        <circle cx="85" cy="35" r="4" fill="#34D399" />
        <circle cx="100" cy="35" r="4" fill="#F1C40F" />
        <circle cx="115" cy="35" r="4" fill="#E74C3C" />
        
        {/* Air vents grids */}
        {[140, 152, 164, 176, 188].map(y => (
          <line key={y} x1="90" y1={y} x2="210" y2={y} stroke="#BDC3C7" strokeWidth="5" strokeLinecap="round" />
        ))}
      </svg>
    );
  }

  if (category === 'Batteries') {
    return (
      <svg width="100%" height="340" viewBox="0 0 300 240">
        <rect x="40" y="30" width="220" height="180" rx="16" fill="#2C3E50" stroke="#1F2937" strokeWidth="3" />
        {/* Front mounting plate ears */}
        <rect x="25" y="80" width="15" height="80" rx="4" fill="#7F8C8D" />
        <rect x="260" y="80" width="15" height="80" rx="4" fill="#7F8C8D" />
        {/* Smart BMS LCD panel */}
        <rect x="60" y="60" width="100" height="36" rx="6" fill="#17202A" />
        <rect x="65" y="65" width="60" height="10" rx="2" fill="var(--primary-green)" />
        <text x="65" y="90" fill="#BDC3C7" fontSize="8" fontWeight="600">SOC: 98% | TEMP: 28C</text>
        {/* Connection terminals */}
        <circle cx="200" cy="80" r="12" fill="#E74C3C" />
        <circle cx="230" cy="80" r="12" fill="#2E4053" />
        {/* Text logo */}
        <text x="60" y="145" fill="white" fontSize="18" fontWeight="900" letterSpacing="1">SE F5 PLUS</text>
        <text x="60" y="165" fill="var(--primary-green)" fontSize="10" fontWeight="700">LITHIUM IRON PHOSPHATE</text>
      </svg>
    );
  }

  // Accessories default
  return (
    <svg width="100%" height="340" viewBox="0 0 300 240">
      <rect x="80" y="30" width="140" height="180" rx="12" fill="#EAEDED" stroke="#BDC3C7" strokeWidth="3" />
      <rect x="95" y="45" width="110" height="150" rx="8" fill="#F8F9F9" stroke="#BDC3C7" strokeWidth="1" />
      <circle cx="150" cy="120" r="28" fill="#E67E22" />
      <rect x="144" y="98" width="12" height="44" rx="3" fill="#FFF" />
      <circle cx="115" cy="70" r="6" fill="#E74C3C" />
      <circle cx="185" cy="70" r="6" fill="#2ECC71" />
    </svg>
  );
};

const getInverterImage = (brand) => {
  const b = brand.toLowerCase();
  if (b.includes('deye')) return '/assets/inverter-deye.png';
  if (b.includes('exide')) return '/assets/inverter-exide.png';
  if (b.includes('fox')) return '/assets/inverter-fox.png';
  if (b.includes('microtek')) return '/assets/inverter-microtek.png';
  if (b.includes('waaree')) return '/assets/inverter-waaree.png';
  return null;
};

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

export default function ProductDetails() {
  const { 
    selectedProductId, 
    getProductById, 
    addToCart, 
    setCurrentPage, 
    userProfile,
    isAdminMode,
    setEditingProduct
  } = useContext(AppContext);

  const product = getProductById(selectedProductId);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState(userProfile.pincode || '');
  const [pincodeStatus, setPincodeStatus] = useState(null); // 'success' | 'error' | null
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'desc'
  const [animateBtn, setAnimateBtn] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(product.stock > 0 ? 1 : 0);
    }
  }, [selectedProductId, product?.stock]);

  if (!product) {
    return (
      <div style={{ padding: '80px 16px', textAlignment: 'center' }}>
        <h2>Product not found.</h2>
        <button onClick={() => setCurrentPage('home')} className="clay-btn-primary" style={{ border: 'none', marginTop: '20px' }}>
          Go Home
        </button>
      </div>
    );
  }

  const handleIncrement = () => setQuantity(q => q < (product.stock !== undefined ? product.stock : 50) ? q + 1 : q);
  const handleDecrement = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6 || isNaN(pincode)) {
      setPincodeStatus('error');
      return;
    }

    // Pincode validation rules (mock): Mumbai, Pune and ranges starting with 4, or random valid subset
    if (pincode.startsWith('4') || pincode.startsWith('1') || pincode.startsWith('5')) {
      setPincodeStatus('success');
    } else {
      setPincodeStatus('error');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAnimateBtn(true);
    setTimeout(() => setAnimateBtn(false), 800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentPage('cart');
  };
  return (
    <div style={{ padding: '24px 16px 100px 16px' }} className="animate-fade-in">
      {/* Back Button Link */}
      <button
        onClick={() => setCurrentPage('shop')}
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
        <span>Back to Shop</span>
      </button>

      {/* Main Details Panel Grid */}
      <div className="product-details-container" style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1.1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Left Side: Product Image Showcase */}
        <div 
          className="details-image-showcase" 
          style={{
            minHeight: product.category === 'Solar Panels' ? '540px' : '460px'
          }}
        >
          {product.category === 'Inverters' && getInverterImage(product.brand) ? (
            <img 
              src={getInverterImage(product.brand)} 
              alt={product.name} 
              className="details-inverter-img"
            />
          ) : product.category === 'Solar Panels' && getPanelImage(product.brand) ? (
            <img 
              src={getPanelImage(product.brand)} 
              alt={product.name} 
              className="details-panel-img"
            />
          ) : (product.image && !product.image.includes('cat-')) ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className={`details-inverter-img ${shouldScaleImage(product) ? 'details-scaled-img' : ''}`}
              style={{ maxWidth: '96%', maxHeight: '96%', objectFit: 'contain' }}
            />
          ) : (
            <DetailProductSvg category={product.category} name={product.name} />
          )}
        </div>

        {/* Right Side: Configuration & Buy Drawer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Badge & Title */}
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="clay-badge-green">{product.category}</span>
              {product.isTopItem && (
                <span className="clay-badge-cream" style={{ background: '#FFF9E6', color: '#D4AC0D' }}>Staff Pick</span>
              )}
            </div>
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: '800',
              color: 'var(--text-dark)',
              lineHeight: '1.2',
              letterSpacing: '-1px'
            }}>
              {product.name}
            </h1>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '600' }}>Brand: {product.brand}</span>
          </div>

          {/* Pricing Panel */}
          <div className="clay-card-inset" style={{
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-cream-dark)'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase' }}>Best Price</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-green-dark)', lineHeight: '1' }}>₹ {(Number(product.price) || 0).toFixed(2)}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600' }}>Rating</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-dark)' }}>{product.rating}</span>
                <div style={{ color: '#F1C40F', display: 'flex' }}>
                  <span style={{ fontSize: '1rem' }}>★</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>({product.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Stock Status Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            fontWeight: '700',
            padding: '4px 8px'
          }}>
            {product.stock === 0 ? (
              <span style={{ color: '#C0392B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={16} />
                Out of Stock (Temporarily unavailable)
              </span>
            ) : (product.stock !== undefined && product.stock <= 10) ? (
              <span style={{ color: '#D35400', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={16} />
                Low Stock: Only {product.stock} units left - order soon!
              </span>
            ) : (
              <span style={{ color: '#1E8449', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} />
                In Stock ({product.stock !== undefined ? product.stock : 50} units available)
              </span>
            )}
          </div>

          {/* Location Delivery Checkbox */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: 'var(--primary-green)' }} />
              Check Delivery Availability
            </h4>
            <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                maxLength="6"
                placeholder="Enter 6-digit zipcode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="clay-input"
                style={{ flex: '1', height: '38px', borderRadius: '10px', boxShadow: 'none', background: 'rgba(255,255,255,0.7)', padding: '0 16px' }}
              />
              <button 
                type="submit" 
                className="clay-btn-primary" 
                style={{ height: '38px', borderRadius: '10px', border: 'none', fontSize: '0.8rem', padding: '0 20px' }}
              >
                Verify
              </button>
            </form>
            {pincodeStatus === 'success' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1E8449', fontSize: '0.8rem', marginTop: '10px', fontWeight: '600' }}>
                <Check size={14} />
                <span>Delivery available! Expected shipping in 2-3 days. Free Delivery.</span>
              </div>
            )}
            {pincodeStatus === 'error' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#A93226', fontSize: '0.8rem', marginTop: '10px', fontWeight: '600' }}>
                <AlertCircle size={14} />
                <span>Sorry, we do not ship solar units to this pincode at this time.</span>
              </div>
            )}
          </div>

          {/* Quantity Selector Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '10px 0' }}>
            <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-medium)' }}>Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={handleDecrement} disabled={product.stock === 0} className="clay-btn-round" style={{ opacity: product.stock === 0 ? 0.5 : 1, cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}>-</button>
              <span className="clay-card-inset" style={{
                width: '50px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.1rem',
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.06), inset -2px -2px 4px rgba(255,255,255,0.8)',
                background: 'var(--bg-cream-dark)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.5)',
                opacity: product.stock === 0 ? 0.6 : 1
              }}>
                {quantity}
              </span>
              <button onClick={handleIncrement} disabled={product.stock === 0} className="clay-btn-round" style={{ opacity: product.stock === 0 ? 0.5 : 1, cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}>+</button>
            </div>
          </div>

          {/* Action CTAs (Claymorphic Buttons) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={handleAddToCart}
                className="clay-btn-secondary"
                disabled={product.stock === 0}
                style={{
                  flex: '1',
                  height: '50px',
                  border: 'none',
                  fontSize: '1rem',
                  background: product.stock === 0 
                    ? '#BDC3C7' 
                    : animateBtn 
                      ? 'var(--primary-green-light)' 
                      : 'var(--bg-white)',
                  color: product.stock === 0
                    ? '#7F8C8D'
                    : animateBtn 
                      ? 'var(--primary-green-dark)' 
                      : 'var(--text-dark)',
                  boxShadow: product.stock === 0 ? 'none' : '0 6px 12px rgba(163, 177, 198, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.8)',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <ShoppingCart size={18} />
                <span>{product.stock === 0 ? 'Out of Stock' : animateBtn ? 'Added!' : 'Add to Cart'}</span>
              </button>
              <button 
                onClick={handleBuyNow}
                className="clay-btn-primary"
                disabled={product.stock === 0}
                style={{
                  flex: '1',
                  height: '50px',
                  border: 'none',
                  fontSize: '1rem',
                  background: product.stock === 0 ? '#BDC3C7' : undefined,
                  color: product.stock === 0 ? '#7F8C8D' : undefined,
                  boxShadow: product.stock === 0 ? 'none' : undefined,
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {product.stock === 0 ? 'Unavailable' : 'Buy Now'}
              </button>
            </div>

            {isAdminMode && (
              <button 
                onClick={() => setEditingProduct(product)}
                className="clay-btn-primary"
                style={{
                  height: '50px',
                  border: 'none',
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
                  boxShadow: '0 6px 12px rgba(230, 126, 34, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Edit Specifications / Product Listing
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Below the fold (Specs & Description) */}
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

        {/* Specs Table */}
        {activeTab === 'specs' && (
          <div className="clay-card" style={{ padding: '24px', borderRadius: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <tbody>
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <tr 
                    key={key} 
                    style={{ 
                      borderBottom: idx === Object.keys(product.specs).length - 1 ? 'none' : '1px solid rgba(0,0,0,0.06)',
                      background: idx % 2 === 0 ? 'rgba(0,0,0,0.01)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--text-medium)', width: '35%' }}>{key}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '500', color: 'var(--text-dark)' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'desc' && (
          <div className="clay-card" style={{ padding: '32px', borderRadius: '24px', lineHeight: '1.7' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '14px' }}>Product Details</h3>
            <p style={{ color: 'var(--text-medium)', marginBottom: '20px' }}>{product.description}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-green-dark)' }}>
                  <Truck size={16} style={{ margin: 'auto' }} />
                </div>
                <div>
                  <h5 style={{ fontWeight: '800', fontSize: '0.9rem' }}>Fast Freight Shipping</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Double-crate packaging to avoid PV micro-cracks or damage during transit.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-green-dark)' }}>
                  <Calendar size={16} style={{ margin: 'auto' }} />
                </div>
                <div>
                  <h5 style={{ fontWeight: '800', fontSize: '0.9rem' }}>Long-Term Performance Warranty</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Includes manufacturer performance warranties ranging from 5 to 25 years.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-details-container {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          h1 {
            font-size: 1.6rem !important;
          }
        }
        @media (max-width: 480px) {
          .product-details-container {
            gap: 16px !important;
          }
          .product-details-container .clay-card div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          h1 {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </div>
  );
}
