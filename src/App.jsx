import React, { useContext, useEffect } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartCheckout from './pages/CartCheckout';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import ProductConfigurator from './pages/ProductConfigurator';
import SolarPackageConfigurator from './pages/SolarPackageConfigurator';
import EditProductModal from './components/EditProductModal';
import { ShieldAlert, Sun, Info, Home as HomeIcon, ShoppingBag, Package as PackageIcon } from 'lucide-react';

function AppContent() {
  const { currentPage, isAdminMode, setIsAdminMode, setCurrentPage } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product-details':
        return <ProductDetails />;
      case 'cart':
        return <CartCheckout />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminDashboard />;
      case 'configurator':
        return <ProductConfigurator />;
      case 'package-configurator':
        return <SolarPackageConfigurator />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Glassmorphic Animated background mesh shapes */}
      <div className="bg-gradient-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Global Navigation header */}
      <Navigation />

      {/* Global Edit Product Modal Overlay */}
      <EditProductModal />

      {/* Admin Mode Floating Alert Toast (displays when admin dashboard is active or enabled) */}
      {isAdminMode && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(230, 126, 34, 0.95)',
          backdropFilter: 'blur(8px)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '50px',
          boxShadow: '0 8px 32px rgba(230,126,34,0.3), inset 0 2px 4px rgba(255,255,255,0.4)',
          fontWeight: '700',
          fontSize: '0.85rem'
        }}>
          <ShieldAlert size={18} className="animate-bounce" />
          <span>Binmin Staff Mode Active</span>
          <button 
            onClick={() => {
              setIsAdminMode(false);
              setCurrentPage('home');
            }}
            style={{
              background: 'white',
              color: '#D35400',
              border: 'none',
              padding: '4px 12px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '800',
              fontSize: '0.75rem',
              marginLeft: '8px',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Exit Staff Portal
          </button>
        </div>
      )}

      {/* Main Page Layout Container */}
      <main style={{ 
        flex: 1, 
        maxWidth: '1280px', 
        width: '100%', 
        margin: '0 auto', 
        padding: '0 16px',
        animation: 'fadeInUp 0.4s ease-out'
      }}>
        {renderPage()}
      </main>

      {/* Glassmorphic Footer */}
      <footer className="glass-panel app-footer" style={{
        margin: '40px 16px 24px 16px',
        padding: '32px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'rgba(255, 255, 255, 0.4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Logo & Description */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: 'transparent',
              flexShrink: 0
            }}>
              <img 
                src="/logo.png" 
                alt="Binmin Power Systems" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            </div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--text-dark)' }}>BINMIN</span> <br />
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-green)', fontWeight: '600' }}>POWER SYSTEMS</span>
            </div>
          </div>

          {/* Copyright info */}
          <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
            &copy; {new Date().getFullYear()} Binmin Power Systems. All rights reserved.
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }}></div>

        {/* Environmental impact note */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          color: 'var(--text-medium)',
          fontWeight: '500',
          justifyContent: 'center'
        }}>
          <Sun size={14} style={{ color: '#F1C40F' }} />
          <span>Every kilowatt of solar installed offsets 1.2 tons of carbon emissions annually. Empower your energy independence.</span>
        </div>
      </footer>

      {/* Floating Bottom Navigation Bar for Home and Shop */}
      <div className="bottom-nav-bar" style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 98,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 237, 213, 0.6)',
        padding: '8px 16px',
        borderRadius: '50px',
        boxShadow: '0 8px 32px rgba(92, 45, 19, 0.15), inset 0 2px 4px rgba(255,255,255,0.4)',
        transition: 'all 0.3s ease'
      }}>
        <button
          onClick={() => { setCurrentPage('home'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: currentPage === 'home' ? 'var(--primary-green)' : 'transparent',
            color: currentPage === 'home' ? 'white' : 'var(--text-medium)',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '0.9rem',
            boxShadow: currentPage === 'home' 
              ? '0 4px 10px rgba(255, 93, 0, 0.25), inset 0 1px 2px rgba(255,255,255,0.3)'
              : 'none',
            transition: 'all 0.3s ease'
          }}
          className="clay-btn-hover"
        >
          <HomeIcon size={16} />
          <span>Home</span>
        </button>
        
        <button
          onClick={() => { setCurrentPage('shop'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: currentPage === 'shop' ? 'var(--primary-green)' : 'transparent',
            color: currentPage === 'shop' ? 'white' : 'var(--text-medium)',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '0.9rem',
            boxShadow: currentPage === 'shop' 
              ? '0 4px 10px rgba(255, 93, 0, 0.25), inset 0 1px 2px rgba(255,255,255,0.3)'
              : 'none',
            transition: 'all 0.3s ease'
          }}
          className="clay-btn-hover"
        >
          <ShoppingBag size={16} />
          <span>Shop</span>
        </button>

        <button
          onClick={() => { setCurrentPage('package-configurator'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: currentPage === 'package-configurator' ? 'var(--primary-green)' : 'transparent',
            color: currentPage === 'package-configurator' ? 'white' : 'var(--text-medium)',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '0.9rem',
            boxShadow: currentPage === 'package-configurator' 
              ? '0 4px 10px rgba(255, 93, 0, 0.25), inset 0 1px 2px rgba(255,255,255,0.3)'
              : 'none',
            transition: 'all 0.3s ease'
          }}
          className="clay-btn-hover"
        >
          <PackageIcon size={16} />
          <span>Solar Packages</span>
        </button>
      </div>

      <style>{`
        .animate-bounce {
          animation: bounce 0.6s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        @media (max-width: 768px) {
          main {
            padding: 0 8px !important;
          }
          .app-footer {
            margin: 24px 8px 16px 8px !important;
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }
          .app-footer > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 480px) {
          .app-footer {
            margin: 16px 6px 12px 6px !important;
            padding: 16px 12px !important;
          }
          .app-footer > div:last-child span {
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
