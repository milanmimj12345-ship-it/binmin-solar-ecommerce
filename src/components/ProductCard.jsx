import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, Star, ShoppingCart, Edit } from 'lucide-react';

// A helper component to draw a beautiful SVG mock for products based on category
export const ProductMockSvg = ({ category, name }) => {
  if (category === 'Solar Panels') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C2833" />
            <stop offset="100%" stopColor="#2E4053" />
          </linearGradient>
          <filter id="clayGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.1" />
          </filter>
        </defs>
        {/* Frame */}
        <rect x="20" y="15" width="160" height="120" rx="10" fill="#EAEDED" stroke="#BDC3C7" strokeWidth="3" filter="url(#clayGlow)" />
        {/* Grid Cells */}
        <rect x="25" y="20" width="150" height="110" rx="6" fill="url(#panelGrad)" />
        {/* Grid Lines */}
        <line x1="62.5" y1="20" x2="62.5" y2="130" stroke="#566573" strokeWidth="1.5" />
        <line x1="100" y1="20" x2="100" y2="130" stroke="#566573" strokeWidth="2" />
        <line x1="137.5" y1="20" x2="137.5" y2="130" stroke="#566573" strokeWidth="1.5" />
        
        <line x1="25" y1="42" x2="175" y2="42" stroke="#566573" strokeWidth="1" />
        <line x1="25" y1="64" x2="175" y2="64" stroke="#566573" strokeWidth="1.5" />
        <line x1="25" y1="86" x2="175" y2="86" stroke="#566573" strokeWidth="1" />
        <line x1="25" y1="108" x2="175" y2="108" stroke="#566573" strokeWidth="1" />

        {/* Highlight flare */}
        <path d="M25 40 L60 20 L80 130 Z" fill="rgba(255,255,255,0.05)" />
      </svg>
    );
  }

  if (category === 'Inverters') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        <defs>
          <linearGradient id="invGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F2F4F4" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="6" stdDeviation="4" floodOpacity="0.08" />
          </filter>
        </defs>
        {/* Body */}
        <rect x="40" y="20" width="120" height="110" rx="16" fill="url(#invGrad)" stroke="#E5E8E8" strokeWidth="1" filter="url(#softShadow)" />
        {/* Top Brand Stripe */}
        <path d="M 40 36 L 40 32 A 12 12 0 0 1 52 20 L 148 20 A 12 12 0 0 1 160 32 L 160 36 Z" fill="var(--primary-green)" />
        {/* LCD Screen */}
        <rect x="65" y="48" width="70" height="28" rx="4" fill="#1C2833" />
        {/* Digital numbers simulation */}
        <rect x="73" y="58" width="12" height="8" rx="1" fill="var(--accent-mint)" opacity="0.8" />
        <rect x="90" y="58" width="12" height="8" rx="1" fill="var(--accent-mint)" opacity="0.8" />
        <rect x="107" y="58" width="20" height="8" rx="1" fill="#FF5733" opacity="0.8" />
        {/* Heat vents / details */}
        <line x1="60" y1="90" x2="140" y2="90" stroke="#BDC3C7" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="100" x2="140" y2="100" stroke="#BDC3C7" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="110" x2="140" y2="110" stroke="#BDC3C7" strokeWidth="4" strokeLinecap="round" />
        {/* Led status indicators */}
        <circle cx="55" cy="28" r="3" fill="#34D399" />
        <circle cx="65" cy="28" r="3" fill="#F1C40F" />
      </svg>
    );
  }

  if (category === 'Batteries') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        <defs>
          <linearGradient id="batGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2C3E50" />
            <stop offset="100%" stopColor="#1A252F" />
          </linearGradient>
        </defs>
        {/* Rack battery box */}
        <rect x="30" y="25" width="140" height="100" rx="12" fill="url(#batGrad)" stroke="#111" strokeWidth="2" />
        {/* Handles */}
        <rect x="22" y="55" width="8" height="40" rx="3" fill="#7F8C8D" />
        <rect x="170" y="55" width="8" height="40" rx="3" fill="#7F8C8D" />
        {/* Battery Status bar (Green) */}
        <rect x="45" y="45" width="60" height="14" rx="4" fill="#17202A" />
        <rect x="48" y="48" width="40" height="8" rx="2" fill="var(--primary-green)" />
        <rect x="91" y="48" width="10" height="8" rx="2" fill="var(--primary-green)" />
        {/* Model logo text */}
        <text x="45" y="85" fill="#E5E8E8" fontSize="10" fontWeight="800">SE F5 PLUS</text>
        <text x="45" y="98" fill="var(--primary-green)" fontSize="8" fontWeight="600">LITHIUM STORAGE</text>
        {/* Port connectors */}
        <circle cx="130" cy="85" r="7" fill="#C0392B" />
        <circle cx="150" cy="85" r="7" fill="#2E4053" />
        <line x1="127" y1="85" x2="133" y2="85" stroke="white" strokeWidth="2" />
        <line x1="147" y1="85" x2="153" y2="85" stroke="white" strokeWidth="2" />
        <line x1="150" y1="82" x2="150" y2="88" stroke="white" strokeWidth="2" />
      </svg>
    );
  }

  if (category === 'ACDB' || category === 'DCDB') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        <defs>
          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECEFF1" />
            <stop offset="100%" stopColor="#CFD8DC" />
          </linearGradient>
        </defs>
        {/* Enclosure */}
        <rect x="45" y="20" width="110" height="110" rx="12" fill="url(#dbGrad)" stroke="#B0BEC5" strokeWidth="2" />
        {/* Transparent panel cover */}
        <rect x="55" y="30" width="90" height="90" rx="6" fill="rgba(255, 255, 255, 0.4)" stroke="#B0BEC5" strokeWidth="1" />
        {/* Busbar Din rail */}
        <rect x="62" y="55" width="76" height="12" fill="#B0BEC5" />
        {/* Circuit Breakers (MCBs) */}
        <rect x="70" y="45" width="16" height="32" rx="2" fill="#37474F" />
        <rect x="90" y="45" width="16" height="32" rx="2" fill="#37474F" />
        <rect x="110" y="45" width="18" height="32" rx="2" fill="#D32F2F" />
        {/* MCB toggle switches */}
        <rect x="75" y="52" width="6" height="12" fill="#ECEFF1" />
        <rect x="95" y="52" width="6" height="12" fill="#ECEFF1" />
        <rect x="116" y="52" width="6" height="12" fill="#ECEFF1" />
        {/* Category Badge Text inside mockup */}
        <text x="100" y="108" textAnchor="middle" fill="#546E7A" fontSize="9" fontWeight="800">{category}</text>
      </svg>
    );
  }

  if (category === 'Cables') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        {/* Reel ring outer */}
        <circle cx="100" cy="75" r="48" fill="none" stroke="#263238" strokeWidth="12" />
        {/* Copper coils */}
        <circle cx="100" cy="75" r="42" fill="none" stroke="#D84315" strokeWidth="3" />
        <circle cx="100" cy="75" r="37" fill="none" stroke="#D84315" strokeWidth="3" />
        <circle cx="100" cy="75" r="32" fill="none" stroke="#263238" strokeWidth="3" />
        {/* Center core */}
        <circle cx="100" cy="75" r="18" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
        {/* Wires tail coming out */}
        <path d="M 120 110 C 130 120, 150 120, 165 110" fill="none" stroke="#D84315" strokeWidth="6" strokeLinecap="round" />
        <path d="M 120 110 C 130 120, 150 120, 165 110" fill="none" stroke="#ECEFF1" strokeWidth="2" strokeDasharray="3,3" />
        <path d="M 80 110 C 70 120, 50 120, 35 110" fill="none" stroke="#263238" strokeWidth="6" strokeLinecap="round" />
        <text x="100" y="80" textAnchor="middle" fill="#546E7A" fontSize="9" fontWeight="800">CABLES</text>
      </svg>
    );
  }

  if (category === 'Earthing') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        {/* Ground layers */}
        <rect x="25" y="95" width="150" height="35" fill="#8D6E63" opacity="0.6" rx="4" />
        <rect x="25" y="105" width="150" height="25" fill="#5D4037" opacity="0.8" rx="4" />
        {/* Grounding rod driving into soil */}
        <rect x="95" y="25" width="10" height="90" rx="3" fill="#D84315" stroke="#BF360C" strokeWidth="1" />
        <line x1="95" y1="50" x2="105" y2="50" stroke="#FFE0B2" strokeWidth="2" />
        <line x1="95" y1="80" x2="105" y2="80" stroke="#FFE0B2" strokeWidth="2" />
        {/* Ground clamp */}
        <rect x="91" y="32" width="18" height="10" rx="2" fill="#FFB300" />
        <circle cx="100" cy="37" r="2" fill="white" />
        {/* Earthing wire connecting */}
        <path d="M 100 37 Q 130 30, 150 65" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" />
        <text x="100" y="142" textAnchor="middle" fill="#546E7A" fontSize="9" fontWeight="800">EARTHING SYSTEM</text>
      </svg>
    );
  }

  if (category === 'Lightning Arrestors') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        <defs>
          <linearGradient id="arrestorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA000" />
            <stop offset="100%" stopColor="#D84315" />
          </linearGradient>
        </defs>
        {/* Arrestor mast */}
        <rect x="96" y="35" width="8" height="85" rx="2" fill="url(#arrestorGrad)" />
        {/* Multi points spikes */}
        <path d="M 100 15 L 100 35" stroke="#FFA000" strokeWidth="4" strokeLinecap="round" />
        <path d="M 85 20 L 100 35 L 115 20" fill="none" stroke="#FFA000" strokeWidth="3" strokeLinecap="round" />
        {/* Mounting base */}
        <rect x="85" y="115" width="30" height="12" rx="2" fill="#37474F" />
        {/* Spark waves */}
        <circle cx="100" cy="15" r="8" fill="none" stroke="#FFD54F" strokeWidth="1" strokeDasharray="2,2" opacity="0.8" />
        <circle cx="100" cy="15" r="16" fill="none" stroke="#FFD54F" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
        <text x="100" y="142" textAnchor="middle" fill="#546E7A" fontSize="9" fontWeight="800">LIGHTNING ARRESTOR</text>
      </svg>
    );
  }

  if (category === 'Energy Meters') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        {/* Body */}
        <rect x="50" y="25" width="100" height="100" rx="14" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="2" />
        {/* LCD Backlit Blue Screen */}
        <rect x="62" y="40" width="76" height="30" rx="4" fill="#0091EA" opacity="0.85" />
        {/* Display numbers */}
        <text x="68" y="60" fill="white" fontSize="12" fontWeight="700" fontFamily="monospace">00123.4</text>
        <text x="120" y="50" fill="white" fontSize="6" fontWeight="800">kWh</text>
        {/* Led pulses */}
        <circle cx="68" cy="85" r="3" fill="#D32F2F" />
        <circle cx="80" cy="85" r="3" fill="#FFEB3B" />
        <text x="65" y="96" fill="#78909C" fontSize="5" fontWeight="800">CAL / PULSE</text>
        {/* Terminal cover */}
        <rect x="58" y="105" width="84" height="15" fill="#B0BEC5" rx="2" />
        <text x="100" y="142" textAnchor="middle" fill="#546E7A" fontSize="9" fontWeight="800">ENERGY METER</text>
      </svg>
    );
  }

  if (category === 'Isolators') {
    return (
      <svg width="100%" height="200" viewBox="0 0 200 150">
        {/* Enclosure */}
        <rect x="50" y="25" width="100" height="100" rx="14" fill="#F4F6F6" stroke="#BDC3C7" strokeWidth="2" />
        {/* Rotary Switch Knob */}
        <circle cx="100" cy="70" r="26" fill="#BDC3C7" stroke="#95A5A6" strokeWidth="1" />
        <circle cx="100" cy="70" r="20" fill="#E74C3C" />
        {/* Handle grip */}
        <rect x="94" y="52" width="12" height="36" rx="3" fill="white" />
        <rect x="98" y="56" width="4" height="28" rx="1" fill="#C0392B" />
        {/* On / Off labels */}
        <text x="100" y="44" textAnchor="middle" fill="#7F8C8D" fontSize="8" fontWeight="800">ON</text>
        <text x="100" y="112" textAnchor="middle" fill="#7F8C8D" fontSize="8" fontWeight="800">OFF</text>
        <text x="100" y="142" textAnchor="middle" fill="#546E7A" fontSize="9" fontWeight="800">MAIN ISOLATOR</text>
      </svg>
    );
  }

  // Accessories / Default Fallback
  return (
    <svg width="100%" height="200" viewBox="0 0 200 150">
      <defs>
        <linearGradient id="bosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EAEDED" />
          <stop offset="100%" stopColor="#D5DBDB" />
        </linearGradient>
      </defs>
      <rect x="50" y="25" width="100" height="100" rx="10" fill="url(#bosGrad)" stroke="#BDC3C7" strokeWidth="2" />
      <rect x="65" y="40" width="70" height="70" rx="6" fill="#F2F4F4" stroke="#BDC3C7" strokeWidth="1" />
      <circle cx="100" cy="75" r="16" fill="#D35400" />
      <rect x="96" y="62" width="8" height="26" rx="2" fill="#ECF0F1" />
      <circle cx="78" cy="52" r="3" fill="#E74C3C" />
      <circle cx="122" cy="52" r="3" fill="#2ECC71" />
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

export default function ProductCard({ product }) {
  const { addToCart, setCurrentPage, setSelectedProductId, isAdminMode, setEditingProduct } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setCurrentPage('product-details');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Stop click from routing to details page
    addToCart(product, 1);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 800);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="clay-card animate-fade-in"
      onClick={handleCardClick}
      style={{
        padding: '20px',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
      }}
    >
      {/* Top Banner Tags */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {product.isTopItem ? (
            <span 
              className="clay-badge-green animate-pulse"
              style={{ 
                background: '#FEF9E7', 
                color: '#B7950B',
                fontSize: '0.75rem',
                fontWeight: '700',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), 2px 2px 4px rgba(241,196,15,0.1)'
              }}
            >
              Top item
            </span>
          ) : (
            <span className="clay-badge-cream" style={{ fontSize: '0.7rem' }}>
              {product.category}
            </span>
          )}

          {/* Stock Status Badging */}
          {product.stock === 0 ? (
            <span className="clay-badge-cream animate-pulse" style={{ background: '#FADBD8', color: '#C0392B', fontSize: '0.7rem', border: '1px solid rgba(192, 57, 43, 0.2)' }}>
              Out of Stock
            </span>
          ) : (product.stock !== undefined && product.stock <= 10) ? (
            <span className="clay-badge-cream" style={{ background: '#FDEBD0', color: '#D35400', fontSize: '0.7rem', border: '1px solid rgba(211, 84, 0, 0.2)' }}>
              Only {product.stock} left!
            </span>
          ) : null}
        </div>

        {/* Actions Container */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {isAdminMode && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setEditingProduct(product);
              }}
              style={{
                background: 'var(--bg-white)',
                border: '1px solid rgba(255,255,255,0.8)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-medium)',
                boxShadow: '2px 2px 5px rgba(163, 177, 198, 0.2), -2px -2px 5px rgba(255, 255, 255, 0.8)',
                transition: 'var(--transition-smooth)',
                zIndex: 2
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.color = 'var(--primary-green)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = 'var(--text-medium)';
              }}
              title="Edit Product"
            >
              <Edit size={14} />
            </button>
          )}

          {/* Favorite Icon */}
          <button 
            onClick={handleFavoriteClick}
            style={{
              background: 'var(--bg-white)',
              border: '1px solid rgba(255,255,255,0.8)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isFavorite ? '#E74C3C' : 'var(--text-light)',
              boxShadow: isFavorite 
                ? '0 3px 6px rgba(231,76,60,0.2), inset 0 2px 3px rgba(255,255,255,0.6)'
                : '2px 2px 5px rgba(163,177,198,0.2), -2px -2px 5px rgba(255,255,255,0.8)',
              transition: 'var(--transition-smooth)',
              zIndex: 2
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart size={15} fill={isFavorite ? '#E74C3C' : 'none'} style={{ transition: 'var(--transition-smooth)' }} />
          </button>
        </div>
      </div>

      {/* Product Image Area */}
      <div 
        className="product-img-box" 
        style={{
          height: product.category === 'Solar Panels' ? '260px' : '220px'
        }}
      >
        {product.category === 'Inverters' && getInverterImage(product.brand) ? (
          <img 
            src={getInverterImage(product.brand)} 
            alt={product.name} 
            className="inverter-img"
          />
        ) : product.category === 'Solar Panels' && getPanelImage(product.brand) ? (
          <img 
            src={getPanelImage(product.brand)} 
            alt={product.name} 
            className="panel-img"
          />
        ) : (product.image && !product.image.includes('cat-')) ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className={`inverter-img ${shouldScaleImage(product) ? 'scaled-img' : ''}`}
            style={{ maxWidth: '96%', maxHeight: '96%', objectFit: 'contain' }}
          />
        ) : (
          <ProductMockSvg category={product.category} name={product.name} />
        )}
      </div>

      {/* Rating Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginBottom: '6px'
      }}>
        <div style={{ display: 'flex', color: '#F1C40F' }}>
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              fill={i < Math.floor(product.rating) ? '#F1C40F' : 'none'} 
              stroke={i < Math.floor(product.rating) ? '#F1C40F' : '#BDC3C7'} 
            />
          ))}
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600' }}>
          ({product.reviewsCount})
        </span>
      </div>

      {/* Product Name */}
      <h3 style={{
        fontSize: '0.95rem',
        fontWeight: '700',
        color: 'var(--text-dark)',
        lineHeight: '1.3',
        marginBottom: '14px',
        minHeight: '40px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {product.name}
      </h3>

      {/* Price & Action Button Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        {/* Price Badges */}
        <div className="clay-badge-cream" style={{
          padding: '8px 16px',
          fontWeight: '800',
          fontSize: '0.95rem',
          color: 'var(--primary-green-dark)',
          background: 'var(--bg-cream-dark)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.8), 2px 2px 4px rgba(163, 177, 198, 0.1)'
        }}>₹ {(Number(product.price) || 0).toFixed(2)}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={product.stock > 0 ? handleAddToCart : (e) => e.stopPropagation()}
          className="clay-btn-primary"
          disabled={product.stock === 0}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-smooth)',
            transform: animateCart ? 'scale(1.2)' : 'none',
            background: product.stock === 0
              ? '#BDC3C7'
              : animateCart
                ? 'linear-gradient(135deg, var(--accent-mint) 0%, var(--primary-green) 100%)'
                : 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%)',
            boxShadow: product.stock === 0 ? 'none' : undefined,
            cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          {product.stock === 0 ? (
            <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>Ø</span>
          ) : (
            <ShoppingCart size={16} />
          )}
        </button>
      </div>

      <style>{`
        .animate-pulse {
          animation: pulse 2s infinite alternate;
        }
        @keyframes pulse {
          0% { opacity: 0.95; }
          100% { opacity: 1; transform: scale(1.02); }
        }

        /* ===== MOBILE-ONLY COMPACT PRODUCT CARD ===== */
        @media (max-width: 768px) {
          .clay-card.animate-fade-in {
            padding: 10px !important;
            border-radius: 10px !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.07) !important;
            gap: 0 !important;
          }
          .clay-card.animate-fade-in:hover {
            transform: none !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.07) !important;
          }
          /* Top tag row */
          .clay-card.animate-fade-in > div:first-child {
            margin-bottom: 6px !important;
          }
          /* Badges in top row */
          .clay-card.animate-fade-in > div:first-child span {
            font-size: 0.6rem !important;
            padding: 2px 6px !important;
            border-radius: 4px !important;
          }
          /* Fav / Edit buttons */
          .clay-card.animate-fade-in > div:first-child button {
            width: 24px !important;
            height: 24px !important;
          }
          .clay-card.animate-fade-in > div:first-child button svg {
            width: 12px !important;
            height: 12px !important;
          }
          /* Image box */
          .clay-card.animate-fade-in .product-img-box {
            height: 110px !important;
            margin-bottom: 6px !important;
          }
          .clay-card.animate-fade-in .product-img-box svg {
            height: 100px !important;
          }
          .clay-card.animate-fade-in .product-img-box img {
            max-height: 100px !important;
          }
          /* Rating row */
          .clay-card.animate-fade-in > div:nth-child(3) {
            margin-bottom: 4px !important;
            gap: 2px !important;
          }
          .clay-card.animate-fade-in > div:nth-child(3) svg {
            width: 10px !important;
            height: 10px !important;
          }
          .clay-card.animate-fade-in > div:nth-child(3) span {
            font-size: 0.65rem !important;
          }
          /* Product title */
          .clay-card.animate-fade-in h3 {
            font-size: 0.75rem !important;
            line-height: 1.25 !important;
            margin-bottom: 6px !important;
            min-height: 0 !important;
            -webkit-line-clamp: 2 !important;
          }
          /* Price + Cart row */
          .clay-card.animate-fade-in > div:last-child {
            gap: 4px !important;
          }
          .clay-card.animate-fade-in > div:last-child .clay-badge-cream {
            padding: 4px 8px !important;
            font-size: 0.75rem !important;
            border-radius: 4px !important;
            box-shadow: none !important;
          }
          .clay-card.animate-fade-in > div:last-child .clay-btn-primary {
            width: 28px !important;
            height: 28px !important;
            border-radius: 50% !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .clay-card.animate-fade-in > div:last-child .clay-btn-primary svg {
            width: 13px !important;
            height: 13px !important;
          }
        }

        @media (max-width: 480px) {
          .clay-card.animate-fade-in {
            padding: 8px !important;
            border-radius: 8px !important;
          }
          .clay-card.animate-fade-in > div:first-child span {
            font-size: 0.55rem !important;
            padding: 1px 5px !important;
          }
          .clay-card.animate-fade-in > div:first-child button {
            width: 22px !important;
            height: 22px !important;
          }
          .clay-card.animate-fade-in .product-img-box {
            height: 95px !important;
            margin-bottom: 5px !important;
          }
          .clay-card.animate-fade-in .product-img-box svg {
            height: 85px !important;
          }
          .clay-card.animate-fade-in .product-img-box img {
            max-height: 85px !important;
          }
          .clay-card.animate-fade-in h3 {
            font-size: 0.68rem !important;
            margin-bottom: 5px !important;
          }
          .clay-card.animate-fade-in > div:last-child .clay-badge-cream {
            padding: 3px 6px !important;
            font-size: 0.68rem !important;
          }
          .clay-card.animate-fade-in > div:last-child .clay-btn-primary {
            width: 26px !important;
            height: 26px !important;
          }
          .clay-card.animate-fade-in > div:last-child .clay-btn-primary svg {
            width: 12px !important;
            height: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
