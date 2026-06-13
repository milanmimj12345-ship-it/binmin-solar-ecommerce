import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ChevronLeft, ShoppingCart, ShieldCheck, 
  Check, Info, AlertCircle, Sun, Cpu, 
  Layers, Box, Cable, Shield, Zap, Gauge, Power, ArrowRight
} from 'lucide-react';
import { ProductMockSvg } from '../components/ProductCard';

const PACKAGES = {
  '3kw': {
    name: '3kW Residential Solar Package',
    rating: '3kW',
    phase: '1 Phase',
    description: 'Perfect for small homes (2-3 BHK) with low-to-medium power requirements. Runs lighting, fans, television, refrigerator, and one 1.5 Ton AC.',
    items: [
      {
        id: 'panels',
        category: 'Solar Panels',
        name: 'PV Modules Mono Perc Half-cut Topcon Bi-facial DCR',
        spec: '620Wp',
        qty: 5,
        unit: 'Nos.',
        brands: ['Adani', 'Waaree', 'Saatvik', 'Microtek'],
        brandPrices: { Adani: 23000, Waaree: 22000, Saatvik: 21500, Microtek: 21000 }
      },
      {
        id: 'inverter',
        category: 'Inverters',
        name: 'Solar Inverter',
        spec: '3kW, 1Phase',
        qty: 1,
        unit: 'No.',
        brands: ['Waaree', 'Deye', 'Exide', 'Fox ESS', 'Microtek'],
        brandPrices: { Waaree: 38000, Deye: 45000, Exide: 34000, 'Fox ESS': 39000, Microtek: 35000 }
      },
      {
        id: 'acdb',
        category: 'ACDB',
        name: 'AC Distribution Board with Spike Protection',
        spec: '3kW, 1 Phase',
        qty: 1,
        unit: 'No.',
        brands: ['Havells'],
        brandPrices: { Havells: 5500 }
      },
      {
        id: 'dcdb',
        category: 'DCDB',
        name: 'DC Distribution Board with Spike Protection',
        spec: '3kW, 1 String',
        qty: 1,
        unit: 'No.',
        brands: ['Havells'],
        brandPrices: { Havells: 5500 }
      },
      {
        id: 'cables',
        category: 'Cables',
        name: 'AC Cables, DC Cables, MC4 Connectors etc.',
        spec: 'AC - 4mm2, DC - 4mm2',
        qty: 1,
        unit: 'Lot',
        brands: ['Microtek', 'Finolex'],
        brandPrices: { Microtek: 9500, Finolex: 11800 }
      },
      {
        id: 'earthing',
        category: 'Earthing',
        name: 'Earthing system (Chemical Earth Pit + Rod)',
        spec: '10SWG Cu Wire + 1.5" dia. GI Pipe',
        qty: 2,
        unit: 'Sets',
        brands: ['Excel'],
        brandPrices: { Excel: 7800 }
      },
      {
        id: 'arrestor',
        category: 'Lightning Arrestors',
        name: 'Lightning Arrestor system',
        spec: '50mm2 Al Cable + single spike LA',
        qty: 1,
        unit: 'Set',
        brands: ['Excel'],
        brandPrices: { Excel: 8500 }
      },
      {
        id: 'meter',
        category: 'Energy Meters',
        name: 'Calibrated Energy Meter',
        spec: '1 Phase, 30A, 240V, Class:1',
        qty: 1,
        unit: 'No.',
        brands: ['L&T', 'Vision Tech'],
        brandPrices: { 'L&T': 4800, 'Vision Tech': 4200 }
      },
      {
        id: 'isolator',
        category: 'Isolators',
        name: 'Main Isolator Switch & cabinet enclosure',
        spec: '40A, DP',
        qty: 1,
        unit: 'No.',
        brands: ['Havells'],
        brandPrices: { Havells: 3500 }
      }
    ]
  },
  '5kw': {
    name: '5kW Premium Solar Package',
    rating: '5kW',
    phase: '1 Phase / 3 Phase',
    description: 'Designed for medium-to-large residential structures (3-5 BHK) with high air-conditioning loads, water pumps, and heavy appliances. Highly recommended for complete grid independence.',
    items: [
      {
        id: 'panels',
        category: 'Solar Panels',
        name: 'PV Modules Mono Perc Half-cut Topcon Bi-facial DCR',
        spec: '560Wp - 620Wp',
        qty: 8,
        unit: 'Items',
        brands: ['Waaree', 'Adani', 'Saatvik', 'Microtek'],
        brandPrices: { Waaree: 21500, Adani: 22500, Saatvik: 21000, Microtek: 20500 }
      },
      {
        id: 'inverter',
        category: 'Inverters',
        name: 'Solar Inverter',
        spec: '5kW, 1Phase',
        qty: 1,
        unit: 'No.',
        brands: ['Fox ESS', 'Deye', 'Waaree', 'Exide', 'Microtek'],
        brandPrices: { 'Fox ESS': 59000, Deye: 72000, Waaree: 52000, Exide: 48000, Microtek: 45000 }
      },
      {
        id: 'acdb',
        category: 'ACDB',
        name: 'AC Distribution Board with Spike Protection',
        spec: '5kW, 1 Phase',
        qty: 1,
        unit: 'No.',
        brands: ['Havells'],
        brandPrices: { Havells: 8900 }
      },
      {
        id: 'dcdb',
        category: 'DCDB',
        name: 'DC Distribution Board with Spike Protection',
        spec: '5kW, 1 String',
        qty: 1,
        unit: 'No.',
        brands: ['Havells'],
        brandPrices: { Havells: 8900 }
      },
      {
        id: 'cables',
        category: 'Cables',
        name: 'AC Cables, DC Cables, MC4 Connectors etc.',
        spec: 'AC - 6mm2, DC - 4mm2',
        qty: 1,
        unit: 'Lot',
        brands: ['Microtek', 'Finolex'],
        brandPrices: { Microtek: 14500, Finolex: 17200 }
      },
      {
        id: 'earthing',
        category: 'Earthing',
        name: 'Earthing system (Chemical Earth Pit + Rod)',
        spec: '10SWG Cu Wire + 1.5" dia. GI Pipe',
        qty: 2,
        unit: 'Sets',
        brands: ['Excel'],
        brandPrices: { Excel: 7800 }
      },
      {
        id: 'arrestor',
        category: 'Lightning Arrestors',
        name: 'Lightning Arrestor system',
        spec: '50mm2 Al Cable + single spike LA',
        qty: 1,
        unit: 'Set',
        brands: ['Excel'],
        brandPrices: { Excel: 8500 }
      },
      {
        id: 'meter',
        category: 'Energy Meters',
        name: 'Calibrated Energy Meter',
        spec: 'Phase, 30A, 240V, Class:1',
        qty: 1,
        unit: 'No.',
        brands: ['L&T', 'Vision Tech'],
        brandPrices: { 'L&T': 9800, 'Vision Tech': 8500 }
      },
      {
        id: 'isolator',
        category: 'Isolators',
        name: 'Main Isolator Switch & cabinet enclosure',
        spec: '40A, DP',
        qty: 1,
        unit: 'No.',
        brands: ['Havells'],
        brandPrices: { Havells: 5200 }
      }
    ]
  }
};

function getComponentImage(category, brand, spec) {
  const brandLower = brand.toLowerCase();
  
  if (category === 'Solar Panels') {
    if (brandLower.includes('adani')) return '/assets/panel-adani.png';
    if (brandLower.includes('waaree')) return '/assets/panel-waaree.png';
    if (brandLower.includes('satvik') || brandLower.includes('saatvik')) return '/assets/panel-satvik.png';
    return '/assets/panel-microtek.png';
  }
  
  if (category === 'Inverters') {
    if (brandLower.includes('exide')) return '/assets/inverter-exide.png';
    if (brandLower.includes('fox')) return '/assets/inverter-fox.png';
    if (brandLower.includes('microtek')) return '/assets/inverter-microtek.png';
    if (brandLower.includes('deye')) return '/assets/inverter-deye.png';
    if (brandLower.includes('waaree')) return '/assets/inverter-waaree.png';
    return '/assets/inverter-exide.png';
  }
  
  if (category === 'ACDB') {
    return '/assets/acdb-havells.png';
  }
  
  if (category === 'DCDB') {
    return '/assets/dcdb-havells.png';
  }
  
  if (category === 'Cables') {
    if (brandLower.includes('finolex')) return '/assets/cable-finolex-ac.png';
    return '/assets/cable-microtek-ac.png';
  }
  
  if (category === 'Earthing') {
    return '/assets/earthing-system.png';
  }
  
  if (category === 'Lightning Arrestors') {
    return '/assets/arrestor-excel.png';
  }
  
  if (category === 'Energy Meters') {
    if (brandLower.includes('vision')) return '/assets/meter-visiontech.png';
    return '/assets/meter-lt.png';
  }
  
  if (category === 'Isolators') {
    return '/assets/isolator-havells.png';
  }
  
  return '/assets/logo.png';
}

function getComponentIcon(category) {
  const size = 20;
  switch (category) {
    case 'Solar Panels': return <Sun size={size} style={{ color: '#F59E0B' }} />;
    case 'Inverters': return <Cpu size={size} style={{ color: 'var(--primary-green)' }} />;
    case 'ACDB': return <Layers size={size} style={{ color: '#F97316' }} />;
    case 'DCDB': return <Box size={size} style={{ color: '#EA580C' }} />;
    case 'Cables': return <Cable size={size} style={{ color: '#D97706' }} />;
    case 'Earthing': return <Shield size={size} style={{ color: '#B45309' }} />;
    case 'Lightning Arrestors': return <Zap size={size} style={{ color: '#E67E22' }} />;
    case 'Energy Meters': return <Gauge size={size} style={{ color: '#C2410C' }} />;
    case 'Isolators': return <Power size={size} style={{ color: '#9A3412' }} />;
    default: return <Cpu size={size} />;
  }
}

export default function SolarPackageConfigurator() {
  const { setCurrentPage, addToCart } = useContext(AppContext);
  const [selectedType, setSelectedType] = useState(null); // null | '3kw' | '5kw'
  const [selectedPanelSpec, setSelectedPanelSpec] = useState('620W'); // default '620W'
  
  const currentPackage = selectedType ? PACKAGES[selectedType] : null;

  // Set default brands when type switches
  const [selectedBrands, setSelectedBrands] = useState({});
  const [customQtys, setCustomQtys] = useState({});

  // Automatically reset selected brands and panel spec to valid defaults when package changes
  React.useEffect(() => {
    if (!currentPackage) return;
    const defaults = {};
    const defaultQtys = {};
    currentPackage.items.forEach(item => {
      defaults[item.id] = item.brands[0];
      defaultQtys[item.id] = item.qty;
    });
    setSelectedBrands(defaults);
    setCustomQtys(defaultQtys);
    setSelectedPanelSpec('620W');
  }, [selectedType]);

  const handleBrandChange = (itemId, brandName) => {
    setSelectedBrands(prev => ({
      ...prev,
      [itemId]: brandName
    }));
  };

  // Panel specs available
  const panelSpecs = selectedType === '3kw' 
    ? ['550W', '580W', '610W', '620W']
    : ['550W', '560W', '580W', '610W', '620W'];

  // Helper to compute panel qty based on target watts and panel wattage
  const currentPanelQty = useMemo(() => {
    if (!selectedType) return 0;
    const wattage = parseInt(selectedPanelSpec) || 620;
    if (selectedType === '3kw') {
      return Math.ceil(2901 / wattage);
    } else {
      return Math.ceil(4801 / wattage);
    }
  }, [selectedType, selectedPanelSpec]);

  // Sync panels custom quantity when spec or type changes
  React.useEffect(() => {
    if (!selectedType) return;
    setCustomQtys(prev => ({
      ...prev,
      panels: currentPanelQty
    }));
  }, [currentPanelQty, selectedType]);

  // Price adjustment helper for panels based on selected wattage spec
  const getPanelPriceAdjustment = (spec) => {
    switch (spec) {
      case '620W': return 0;
      case '610W': return -500;
      case '580W': return -1500;
      case '560W': return -2000;
      case '550W': return -2500;
      default: return 0;
    }
  };

  // Compute total price dynamically
  const totalPrice = useMemo(() => {
    if (!currentPackage) return 0;
    return currentPackage.items.reduce((sum, item) => {
      const selectedBrand = selectedBrands[item.id] || item.brands[0];
      let itemPrice = item.brandPrices[selectedBrand] || 0;
      
      let baseQty = item.qty;
      if (item.id === 'panels') {
        baseQty = currentPanelQty;
        itemPrice = Math.max(10000, itemPrice + getPanelPriceAdjustment(selectedPanelSpec));
      }

      const qty = customQtys[item.id] !== undefined ? customQtys[item.id] : baseQty;

      return sum + (itemPrice * qty);
    }, 0);
  }, [selectedType, selectedBrands, selectedPanelSpec, currentPanelQty, customQtys]);

  const [animateCart, setAnimateCart] = useState(false);

  const handleAddPackageToCart = () => {
    // Add all 9 configured items to the cart
    currentPackage.items.forEach(item => {
      const brand = selectedBrands[item.id] || item.brands[0];
      let unitPrice = item.brandPrices[brand];
      let baseQty = item.qty;
      let spec = item.spec;

      if (item.id === 'panels') {
        baseQty = currentPanelQty;
        spec = selectedPanelSpec + ' DCR';
        unitPrice = Math.max(10000, unitPrice + getPanelPriceAdjustment(selectedPanelSpec));
      }
      
      const qty = customQtys[item.id] !== undefined ? customQtys[item.id] : baseQty;
      
      const payload = {
        id: `pkg-${selectedType}-${item.id}-${brand}-${spec.replace(/\s+/g, '-')}`,
        name: `[${selectedType.toUpperCase()} Solar Package] ${item.name} (${brand})`,
        price: unitPrice,
        category: item.category,
        brand: brand,
        image: null, // Fallbacks to mockups
        stock: 50,
        rating: 5,
        reviewsCount: 1,
        specs: {
          'Package Size': selectedType.toUpperCase(),
          'Specification': spec,
          'Make': brand
        }
      };

      addToCart(payload, qty);
    });

    setAnimateCart(true);
    setTimeout(() => {
      setAnimateCart(false);
      setCurrentPage('cart');
    }, 1200);
  };

  return (
    <div style={{ padding: '24px 16px 100px 16px' }} className="animate-fade-in">
      {!selectedType ? (
        /* STEP 1: Select Type of Package */
        <div>
          {/* Back button */}
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
            <span>Back to Store</span>
          </button>

          {/* Hero Title */}
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <span className="clay-badge-green" style={{ fontSize: '0.8rem', padding: '6px 16px', marginBottom: '12px' }}>
              Complete Solar Bundles
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', color: 'var(--text-dark)', marginTop: '8px' }}>
              Select Rooftop Solar Package
            </h1>
            <p style={{ color: 'var(--text-medium)', fontSize: '0.98rem', marginTop: '8px', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
              Select from our pre-configured bundles. Each package includes all 9 essential products required for a complete, grid-compliant installation. You will customize the brands of individual components in the next step.
            </p>
          </div>

          {/* Grid of choice cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            maxWidth: '960px',
            margin: '0 auto'
          }}>
            {/* 3kW Solar Package Card */}
            <div 
              onClick={() => setSelectedType('3kw')}
              className="clay-card animate-fade-in"
              style={{
                padding: '36px 32px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, rgba(255, 93, 0, 0.02) 0%, rgba(255, 224, 102, 0.06) 100%)',
                border: '1px solid rgba(255, 93, 0, 0.12)',
                borderRadius: '32px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '300px',
                boxShadow: '0 10px 30px rgba(92, 45, 19, 0.05), var(--clay-shadow)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--primary-green)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 93, 0, 0.12), var(--clay-shadow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 93, 0, 0.12)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(92, 45, 19, 0.05), var(--clay-shadow)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #FF5D00 0%, #FFA07A 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(255, 93, 0, 0.2)'
                  }}>
                    <Sun size={28} />
                  </div>
                  <span className="clay-badge-green" style={{ background: '#FFF9E6', color: '#B7950B', fontSize: '0.8rem', padding: '6px 14px' }}>
                    1 Phase Grid
                  </span>
                </div>

                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                  3kW Solar Package
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: '1.5', marginBottom: '24px', fontWeight: '600' }}>
                  Perfect for small residential setups (2-3 BHK homes).
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '700' }}>Configured Price from</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-green-dark)' }}>₹2,05,900.00</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType('3kw');
                  }}
                  className="clay-btn-primary" 
                  style={{ width: '100%', height: '48px', border: 'none', fontSize: '0.95rem' }}
                >
                  <span>Configure Brands</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* 5kW Solar Package Card */}
            <div 
              onClick={() => setSelectedType('5kw')}
              className="clay-card animate-fade-in"
              style={{
                padding: '36px 32px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, rgba(255, 93, 0, 0.02) 0%, rgba(255, 224, 102, 0.06) 100%)',
                border: '1px solid rgba(255, 93, 0, 0.12)',
                borderRadius: '32px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '300px',
                boxShadow: '0 10px 30px rgba(92, 45, 19, 0.05), var(--clay-shadow)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--primary-green)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 93, 0, 0.12), var(--clay-shadow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 93, 0, 0.12)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(92, 45, 19, 0.05), var(--clay-shadow)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(39, 174, 96, 0.2)'
                  }}>
                    <Sun size={28} />
                  </div>
                  <span className="clay-badge-green" style={{ background: '#FFF9E6', color: '#B7950B', fontSize: '0.8rem', padding: '6px 14px' }}>
                    3 Phase / 1 Phase
                  </span>
                </div>

                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                  5kW Solar Package
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: '1.5', marginBottom: '24px', fontWeight: '600' }}>
                  Ideal for medium-to-large homes with high AC/power loads.
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '700' }}>Configured Price from</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-green-dark)' }}>₹3,02,400.00</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType('5kw');
                  }}
                  className="clay-btn-primary" 
                  style={{ width: '100%', height: '48px', border: 'none', fontSize: '0.95rem' }}
                >
                  <span>Configure Brands</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* STEP 2: Configure Brands of Package */
        <div>
          {/* Breadcrumb / Step indicator */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
            <span 
              onClick={() => setSelectedType(null)} 
              style={{ color: 'var(--primary-green)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              Step 1: Select Package
            </span>
            <span style={{ color: 'var(--text-light)' }}>/</span>
            <span style={{ color: 'var(--text-dark)' }}>Step 2: Customize Brands ({selectedType.toUpperCase()})</span>
          </div>

          {/* Header & Change package type action */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.8px', color: 'var(--text-dark)', margin: 0 }}>
                Configure {selectedType.toUpperCase()} Solar Package
              </h1>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.92rem', marginTop: '6px', margin: '6px 0 0 0' }}>
                Customize individual component brands. The total package cost will recalculate in real-time.
              </p>
            </div>
            
            <button
              onClick={() => setSelectedType(null)}
              className="clay-btn-secondary"
              style={{
                border: 'none',
                background: 'var(--bg-white)',
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '0.82rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '2px 2px 5px rgba(92, 45, 19, 0.05), -2px -2px 5px rgba(255,255,255,0.8)'
              }}
            >
              <ChevronLeft size={14} />
              <span>Change Package Type</span>
            </button>
          </div>

          {/* Component Customization Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Left Side: Customize Brands of 9 items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px', margin: 0 }}>
                Configure Component Brands
              </h3>
              
              {currentPackage.items.map((item, index) => {
                const currentBrand = selectedBrands[item.id] || item.brands[0];
                let unitPrice = item.brandPrices[currentBrand] || 0;
                let baseQty = item.qty;
                let spec = item.spec;

                if (item.id === 'panels') {
                  baseQty = currentPanelQty;
                  spec = selectedPanelSpec + ' DCR';
                  unitPrice = Math.max(10000, unitPrice + getPanelPriceAdjustment(selectedPanelSpec));
                }

                const qty = customQtys[item.id] !== undefined ? customQtys[item.id] : baseQty;

                return (
                  <div 
                    key={item.id} 
                    className="clay-card animate-fade-in" 
                    style={{ 
                      padding: '24px', 
                      borderRadius: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Dynamic Brand Image (No box, larger size) */}
                    <div style={{
                      width: '130px',
                      height: '130px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      position: 'relative'
                    }}>
                      <img 
                        src={getComponentImage(item.category, currentBrand, spec)} 
                        alt={`${currentBrand} ${item.category}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(3px 8px 12px rgba(92, 45, 19, 0.15))',
                          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                      />
                    </div>

                    {/* Info Column */}
                    <div style={{ flex: '1', minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {getComponentIcon(item.category)}
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                          Item {index + 1}: {item.category}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: '1.25', margin: 0 }}>
                        {item.name}
                      </h4>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-medium)', fontWeight: '600', marginTop: '2px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span>Specs: <strong style={{ color: 'var(--text-dark)' }}>{spec}</strong></span>
                        <span>•</span>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span>Qty:</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,0,0,0.04)', borderRadius: '50px', padding: '2px', gap: '6px' }}>
                            <button
                              onClick={() => {
                                setCustomQtys(prev => {
                                  const currentVal = prev[item.id] !== undefined ? prev[item.id] : baseQty;
                                  return {
                                    ...prev,
                                    [item.id]: Math.max(baseQty, currentVal - 1)
                                  };
                                });
                              }}
                              disabled={qty <= baseQty}
                              onMouseEnter={e => { if (qty > baseQty) e.currentTarget.style.background = 'rgba(0,0,0,0.08)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-white)'; }}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                border: 'none',
                                background: 'var(--bg-white)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: 'var(--text-dark)',
                                boxShadow: '1px 1px 2px rgba(92, 45, 19, 0.05)',
                                opacity: qty <= baseQty ? 0.4 : 1,
                                transition: 'all 0.2s ease'
                              }}
                            >
                              -
                            </button>
                            <span style={{ minWidth: '22px', textAlign: 'center', fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-dark)' }}>
                              {qty}
                            </span>
                            <button
                              onClick={() => {
                                setCustomQtys(prev => {
                                  const currentVal = prev[item.id] !== undefined ? prev[item.id] : baseQty;
                                  return {
                                    ...prev,
                                    [item.id]: currentVal + 1
                                  };
                                });
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.08)'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-white)'; }}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                border: 'none',
                                background: 'var(--bg-white)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: 'var(--text-dark)',
                                boxShadow: '1px 1px 2px rgba(92, 45, 19, 0.05)',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              +
                            </button>
                          </div>
                          <span style={{ color: 'var(--text-medium)' }}>{item.unit}</span>
                          {qty > baseQty && (
                            <span className="clay-badge-green" style={{ fontSize: '0.68rem', padding: '3px 8px', background: 'rgba(255, 93, 0, 0.08)', color: '#FF5D00', border: 'none' }}>
                              (+{qty - baseQty} extra)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Brand select tabs */}
                      <div style={{ marginTop: '12px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-light)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                          Select Brand / Make
                        </span>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {item.brands.map(b => {
                            const isActive = b === currentBrand;
                            return (
                              <button
                                key={b}
                                onClick={() => handleBrandChange(item.id, b)}
                                className={isActive ? "clay-btn-primary" : "clay-btn-secondary"}
                                style={{
                                  padding: '4px 12px',
                                  fontSize: '0.72rem',
                                  minHeight: 'auto',
                                  borderRadius: '50px',
                                  border: 'none',
                                  boxShadow: isActive 
                                    ? '0 2px 4px rgba(255,93,0,0.15), inset 0 1px 1px rgba(255,255,255,0.3)'
                                    : '1px 1px 3px rgba(163,177,198,0.2), -1px -1px 3px rgba(255,255,255,0.8)'
                                }}
                              >
                                {isActive && <Check size={10} style={{ marginRight: '2px' }} />}
                                <span>{b}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Wattage Spec Selection (Panels Only) */}
                      {item.id === 'panels' && (
                        <div style={{ marginTop: '12px', borderTop: '1px dashed rgba(0,0,0,0.06)', paddingTop: '10px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-light)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Select Panel Wattage Specification
                          </span>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {panelSpecs.map(ws => {
                              const isActive = ws === selectedPanelSpec;
                              return (
                                <button
                                  key={ws}
                                  onClick={() => setSelectedPanelSpec(ws)}
                                  className={isActive ? "clay-btn-primary" : "clay-btn-secondary"}
                                  style={{
                                    padding: '4px 12px',
                                    fontSize: '0.72rem',
                                    minHeight: 'auto',
                                    borderRadius: '50px',
                                    border: 'none',
                                    boxShadow: isActive 
                                      ? '0 2px 4px rgba(255,93,0,0.15), inset 0 1px 1px rgba(255,255,255,0.3)'
                                      : '1px 1px 3px rgba(163,177,198,0.2), -1px -1px 3px rgba(255,255,255,0.8)'
                                  }}
                                >
                                  {isActive && <Check size={10} style={{ marginRight: '2px' }} />}
                                  <span>{ws}</span>
                                </button>
                              );
                            })}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block', marginTop: '6px', fontWeight: '600' }}>
                            *Quantity automatically recalculates to achieve target system power ({selectedType === '3kw' ? '3kW' : '5kW'}).
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Price Display Column */}
                    <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '100px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600' }}>Cost per unit</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-green-dark)' }}>₹ {unitPrice.toFixed(2)}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-medium)', fontWeight: '700' }}>
                        Total: ₹{(unitPrice * qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Side: Sticky Pricing Summary & Cart */}
            <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="clay-card-inset" style={{ padding: '24px', background: 'var(--bg-cream-dark)', borderRadius: '28px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px', margin: 0 }}>
                  Package Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '16px 0 24px 0', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-medium)' }}>Package Rating</span>
                    <span style={{ color: 'var(--text-dark)', fontWeight: '800' }}>{selectedType.toUpperCase()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-medium)' }}>Total Solar Panel Qty</span>
                    <span style={{ color: 'var(--text-dark)', fontWeight: '800' }}>{customQtys['panels'] !== undefined ? customQtys['panels'] : currentPanelQty} panels ({selectedPanelSpec})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-medium)' }}>Grid Phase</span>
                    <span style={{ color: 'var(--text-dark)', fontWeight: '800' }}>{currentPackage.phase}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-medium)' }}>Total Components Configured</span>
                    <span style={{ color: 'var(--text-dark)', fontWeight: '800' }}>9 / 9 items</span>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '4px 0' }}></div>

                  {/* Mini Itemized Brands Overview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
                    {currentPackage.items.map(item => {
                      const qty = customQtys[item.id] !== undefined ? customQtys[item.id] : (item.id === 'panels' ? currentPanelQty : item.qty);
                      return (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-medium)' }}>
                          <span>{item.category} (x{qty})</span>
                          <strong style={{ color: 'var(--text-dark)' }}>{selectedBrands[item.id] || item.brands[0]}</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total price card */}
                <div className="clay-card" style={{ padding: '16px 20px', background: 'var(--bg-white)', borderRadius: '18px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Complete Package Cost
                  </span>
                  <div style={{ fontSize: '2.1rem', fontWeight: '800', color: 'var(--primary-green-dark)', lineHeight: '1.1', marginTop: '4px' }}>₹ {totalPrice.toFixed(2)}
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-medium)', fontWeight: '600', marginTop: '6px', margin: '6px 0 0 0' }}>
                    Includes double-insulated wiring and structural ISI mount components.
                  </p>
                </div>

                {/* Verification Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '12px',
                  background: '#E8F8F5',
                  borderRadius: '16px',
                  color: '#117A65',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  lineHeight: '1.4',
                  marginBottom: '20px'
                }}>
                  <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Full compliance bundle. Meets local grid connectivity standards with certified protection levels.</span>
                </div>

                {/* Action buttons */}
                <button 
                  onClick={handleAddPackageToCart}
                  disabled={animateCart}
                  className="clay-btn-primary" 
                  style={{
                    width: '100%', 
                    height: '50px', 
                    border: 'none', 
                    fontSize: '1rem',
                    background: animateCart ? 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)' : undefined
                  }}
                >
                  <ShoppingCart size={18} />
                  <span>{animateCart ? 'Redirecting to Cart...' : 'Add Entire Package to Cart'}</span>
                </button>
              </div>

              {/* Sticky Info Panel */}
              <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                  <Info size={14} style={{ color: 'var(--primary-green)' }} />
                  <span>Rooftop Solar Installation Support</span>
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-medium)', lineHeight: '1.4', marginTop: '6px', margin: '6px 0 0 0' }}>
                  Binmin certified solar engineers will contact you within 24 hours of package purchase to schedule your free site suitability survey and dispatch shipping.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
