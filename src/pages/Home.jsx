import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { 
  ArrowRight, Zap, Sun, ShieldAlert, Cpu, 
  Battery, Power, Gauge, Cable, Shield, 
  Box, Layers, Sliders 
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Inverters', label: 'Solar Inverters', icon: 'inverter', file: 'cat-inverter.png', color: 'var(--primary-green)' },
  { id: 'Solar Panels', label: 'panels', icon: 'panel', file: 'cat-panel.png', color: '#FBBF24' },
  { id: 'ACDB', label: 'ACDB (AC Distribution Boards) with spike protection', icon: 'acdb', file: 'cat-acdb.png', color: '#F97316' },
  { id: 'DCDB', label: 'DCDB', icon: 'dcdb', file: 'cat-dcdb.png', color: '#EA580C' },
  { id: 'Cables', label: 'AC & DC Cables (4mm², 6mm²)', icon: 'cable', file: 'cat-cables.png', color: '#D97706' },
  { id: 'Earthing', label: 'Earthing systems (3kW, 5kW)', icon: 'earthing', file: 'earthing-system.png', color: '#B45309' },
  { id: 'Lightning Arrestors', label: 'Lightning Arrestor systems', icon: 'arrestor', file: 'cat-arrestors.png', color: '#E67E22' },
  { id: 'Energy Meters', label: 'Calibrated Energy Meters (1 Phase, 30A)', icon: 'meter', file: 'cat-meters.png', color: '#C2410C' },
  { id: 'Isolators', label: 'Main Isolator Switches', icon: 'isolator', file: 'isolator-havells.png', color: '#9A3412' },
  { id: 'Batteries', label: 'Batteries', icon: 'battery', file: 'cat-battery.png', color: 'var(--primary-green)' },
  { id: 'MC4 Connectors', label: 'MC4 Connectors', icon: 'cable', file: 'mc4-microtek.png', color: '#EA580C' },
  { id: 'Cabinets', label: 'Solar Distribution Cabinets', icon: 'dcdb', file: 'cabinet-havells.png', color: '#E67E22' }
];

function CategoryIcon({ icon, color }) {
  const size = 28;
  switch (icon) {
    case 'inverter': return <Cpu size={size} style={{ color }} />;
    case 'panel': return <Sun size={size} style={{ color }} />;
    case 'acdb': return <Layers size={size} style={{ color }} />;
    case 'dcdb': return <Box size={size} style={{ color }} />;
    case 'cable': return <Cable size={size} style={{ color }} />;
    case 'earthing': return <Shield size={size} style={{ color }} />;
    case 'arrestor': return <Zap size={size} style={{ color }} />;
    case 'meter': return <Gauge size={size} style={{ color }} />;
    case 'isolator': return <Power size={size} style={{ color }} />;
    case 'battery': return <Battery size={size} style={{ color }} />;
    default: return <Sliders size={size} style={{ color }} />;
  }
}

function CategoryBox({ category }) {
  const { setCurrentPage, setSelectedCategory } = useContext(AppContext);
  const [imgErr, setImgErr] = useState(false);

  const handleClick = () => {
    setSelectedCategory(category.id);
    setCurrentPage('configurator');
  };

  return (
    <div 
      className="category-rect-box"
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        gap: '12px',
        minHeight: '88px',
        background: 'var(--bg-white)',
        transition: 'var(--transition-smooth)',
        position: 'relative'
      }}
    >
      <span style={{ 
        fontWeight: '800', 
        fontSize: '0.88rem', 
        color: 'var(--text-dark)',
        lineHeight: '1.25',
        flex: 1
      }}>
        {category.label}
      </span>
      <div className="clay-card-inset" style={{
        width: '50px',
        height: '50px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-cream-dark)',
        flexShrink: 0,
        padding: '4px',
        overflow: 'hidden',
        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.06), inset -2px -2px 4px rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.5)'
      }}>
        {!imgErr ? (
          <img 
            src={`/assets/${category.file}`} 
            alt={category.label} 
            onError={() => setImgErr(true)}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <CategoryIcon icon={category.icon} color={category.color} />
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { products, setCurrentPage, setSelectedCategory, setShopFilters } = useContext(AppContext);

  // Split products by category
  const inverters = useMemo(() => {
    return products.filter(p => p.category === 'Inverters');
  }, [products]);

  const solarPanels = useMemo(() => {
    return products.filter(p => p.category === 'Solar Panels');
  }, [products]);

  const batteries = useMemo(() => {
    return products.filter(p => p.category === 'Batteries');
  }, [products]);

  // Randomized BOS items mix (shuffled on load or stable shuffled representation)
  const bosAccessories = useMemo(() => {
    const bosCategories = ['BOS', 'ACDB', 'DCDB', 'Cables', 'Earthing', 'Lightning Arrestors', 'Energy Meters', 'Isolators', 'MC4 Connectors', 'Cabinets'];
    const bos = products.filter(p => bosCategories.includes(p.category));
    // Simple stable pseudo-shuffle to avoid layout shifts on every minor re-render
    return [...bos].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [products]);

  const handleSeeAll = (category) => {
    setShopFilters(prev => ({
      ...prev,
      category: category,
      brand: 'All',
      capacity: 'All',
      phase: 'All',
      wattage: 'All',
      technology: 'All'
    }));
    setCurrentPage('shop');
  };

  return (
    <div style={{ paddingBottom: '80px' }} className="animate-fade-in">
      {/* Hero Banner Slider */}
      <Hero />

      {/* Complete Solar Package Builder Promo Card */}
      <section style={{ margin: '40px 16px' }}>
        <div 
          className="clay-card animate-fade-in" 
          style={{ 
            padding: '32px', 
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #FF5D00 0%, #FFE066 100%)',
            border: 'none',
            color: 'var(--primary-green-dark)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: '0 12px 30px rgba(255, 93, 0, 0.2), var(--clay-shadow)'
          }}
        >
          <div style={{ flex: '1', minWidth: '280px' }}>
            <span className="clay-badge-green" style={{ background: '#FFF9E6', color: '#B7950B', fontSize: '0.75rem', fontWeight: '800', marginBottom: '8px' }}>
              Special Configurator Bundle
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.8px', color: '#2B1D0F', lineHeight: '1.2' }}>
              Complete 3kW / 5kW Solar Rooftop Package
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#5C4E43', marginTop: '6px', maxWidth: '650px', fontWeight: '600' }}>
              Get everything you need for home solar in a single configured bundle. Select 3kW or 5kW, customize the brands of all 9 items (panels, inverters, cables, earthing, etc.), and checkout instantly!
            </p>
          </div>
          <button 
            onClick={() => setCurrentPage('package-configurator')}
            className="clay-btn-primary"
            style={{ 
              border: 'none', 
              background: '#2B1D0F', 
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: '700',
              padding: '14px 28px',
              borderRadius: '50px',
              boxShadow: '0 6px 12px rgba(43,29,15,0.25), inset 0 2px 3px rgba(255,255,255,0.2)'
            }}
          >
            Configure Package
          </button>
        </div>
      </section>

      {/* 10 Categories Rectangular Grid */}
      <section style={{ margin: '40px 16px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px' }}>
          Product Categories
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '20px' }}>
          Explore our range of premium solar systems, panels, storage units, and wiring components
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {CATEGORIES.map(category => (
            <CategoryBox key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Category Row 1: Inverters */}
      <section style={{ margin: '40px 16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '16px',
          padding: '0 8px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-dark)' }}>Solar Inverters</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Top tier hybrid, grid-tied and micro inverter models</p>
          </div>
          <button 
            onClick={() => handleSeeAll('Inverters')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-green)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.9rem'
            }}
          >
            <span>See All</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="horizontal-scroll">
          {inverters.map(product => (
            <div key={product.id} style={{ minWidth: '280px', maxWidth: '300px', flex: '0 0 auto' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Category Row 2: Solar Panels */}
      <section style={{ margin: '40px 16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '16px',
          padding: '0 8px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-dark)' }}>Solar Panels (PV Modules)</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>High-output monocrystalline and bifacial technologies</p>
          </div>
          <button 
            onClick={() => handleSeeAll('Solar Panels')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-green)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.9rem'
            }}
          >
            <span>See All</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="horizontal-scroll">
          {solarPanels.map(product => (
            <div key={product.id} style={{ minWidth: '280px', maxWidth: '300px', flex: '0 0 auto' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Battery Highlight Row (If batteries exist) */}
      {batteries.length > 0 && (
        <section style={{ margin: '40px 16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '16px',
            padding: '0 8px'
          }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-dark)' }}>Signature Storage Batteries</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Long cycle life lithium energy bank models</p>
            </div>
            <button 
              onClick={() => handleSeeAll('Batteries')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-green)',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.9rem'
              }}
            >
              <span>See All</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="horizontal-scroll">
            {batteries.map(product => (
              <div key={product.id} style={{ minWidth: '280px', maxWidth: '300px', flex: '0 0 auto' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Row 3: BOS (Balance of System) Randomized Mix */}
      <section style={{ margin: '40px 16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '20px',
          padding: '0 8px'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-dark)' }}>Balance of System (BOS) Accessories</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>ACDB boards, double insulated cables, lightning arrestors & grounding meters</p>
          </div>
          <button 
            onClick={() => handleSeeAll('BOS')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-green)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.9rem'
            }}
          >
            <span>See All BOS</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="product-grid" style={{ padding: '8px' }}>
          {bosAccessories.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .animate-fade-in > section {
            margin: 16px 6px !important;
          }
          .animate-fade-in > section h2 {
            font-size: 1rem !important;
            margin-bottom: 2px !important;
          }
          .animate-fade-in > section p {
            font-size: 0.72rem !important;
            margin-bottom: 10px !important;
          }
          .animate-fade-in > section button span {
            font-size: 0.75rem !important;
          }
        }
        @media (max-width: 480px) {
          .animate-fade-in {
            padding-bottom: 56px !important;
          }
          .animate-fade-in > section {
            margin: 10px 4px !important;
          }
          .animate-fade-in > section h2 {
            font-size: 0.92rem !important;
          }
          .animate-fade-in > section p {
            font-size: 0.68rem !important;
            margin-bottom: 8px !important;
          }
          .animate-fade-in > section .clay-card[style*="linear-gradient"] {
            padding: 14px !important;
            border-radius: 10px !important;
            gap: 12px !important;
          }
          .animate-fade-in > section .clay-card[style*="linear-gradient"] h2 {
            font-size: 1rem !important;
          }
          .animate-fade-in > section .clay-card[style*="linear-gradient"] p {
            font-size: 0.72rem !important;
          }
          .animate-fade-in > section .clay-card[style*="linear-gradient"] button {
            padding: 8px 16px !important;
            font-size: 0.78rem !important;
          }
          .animate-fade-in > section .clay-card[style*="linear-gradient"] > div {
            min-width: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
