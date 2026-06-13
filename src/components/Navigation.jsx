import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, ShoppingCart, User, ShieldAlert, Award, ChevronRight } from 'lucide-react';

export default function Navigation() {
  const { 
    cart, 
    setCurrentPage, 
    currentPage, 
    isAdminMode, 
    setIsAdminMode, 
    searchQuery, 
    setSearchQuery,
    setShopFilters
  } = useContext(AppContext);

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    // Switch to Shop view with filters reset except search
    setShopFilters(prev => ({
      ...prev,
      category: 'All',
      brand: 'All',
      capacity: 'All',
      phase: 'All',
      wattage: 'All',
      technology: 'All'
    }));
    setCurrentPage('shop');
  };

  const handleLogoClick = () => {
    setLocalSearch('');
    setSearchQuery('');
    setCurrentPage('home');
  };

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '16px',
      left: '16px',
      right: '16px',
      margin: '16px auto',
      width: 'calc(100% - 32px)',
      zIndex: 100,
      padding: '12px 32px',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={handleLogoClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            fontWeight: '800', 
            fontSize: '1.25rem', 
            color: 'var(--text-dark)', 
            lineHeight: 1.1,
            letterSpacing: '-0.5px' 
          }}>
            BINMIN
          </span>
          <span style={{ 
            fontWeight: '600', 
            fontSize: '0.65rem', 
            color: 'var(--primary-green)',
            letterSpacing: '1px'
          }}>
            POWER SYSTEMS
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <form 
        onSubmit={handleSearchSubmit}
        style={{
          flex: '1',
          maxWidth: '500px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <input 
          type="text"
          placeholder="Search solar panels, inverters, cables..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="clay-input"
          style={{
            width: '100%',
            paddingRight: '48px',
            height: '42px',
            fontSize: '0.9rem'
          }}
        />
        <button 
          type="submit"
          style={{
            position: 'absolute',
            right: '4px',
            background: 'var(--primary-green)',
            border: 'none',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 3px 6px var(--primary-green-glow), inset 0 1px 2px rgba(255,255,255,0.3)',
            transition: 'var(--transition-smooth)'
          }}
          className="clay-btn-hover"
        >
          <Search size={16} />
        </button>
      </form>

      {/* Navigation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>


        {/* User Cart & Profile Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Cart Icon */}
          <button 
            onClick={() => setCurrentPage('cart')}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPage === 'cart' ? 'var(--primary-green)' : 'var(--text-medium)',
              padding: '6px',
              transition: 'var(--transition-smooth)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingCart size={22} style={{ transition: 'var(--transition-smooth)' }} />
            {cartItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'linear-gradient(135deg, #FF5733 0%, #C70039 100%)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: '800',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4)',
                animation: 'bounce 0.3s ease infinite alternate'
              }}>
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button 
            onClick={() => setCurrentPage('profile')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPage === 'profile' ? 'var(--primary-green)' : 'var(--text-medium)',
              padding: '6px',
              transition: 'var(--transition-smooth)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User size={22} />
          </button>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.08)' }}></div>

        {/* Admin Portal Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAdminMode ? (
            <>
              <button
                onClick={() => {
                  setCurrentPage(currentPage === 'admin' ? 'home' : 'admin');
                }}
                className="clay-btn-secondary"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'white',
                  background: 'linear-gradient(135deg, var(--primary-green) 0%, #F59E0B 100%)',
                  boxShadow: '0 4px 8px rgba(255, 93, 0, 0.25), inset 0 2px 4px rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <ShieldAlert size={14} />
                <span>{currentPage === 'admin' ? 'Back to Store' : 'Admin Panel'}</span>
              </button>
              <button
                onClick={() => {
                  setIsAdminMode(false);
                  setCurrentPage('home');
                }}
                className="clay-btn-secondary"
                style={{
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--text-dark)',
                  background: 'var(--bg-cream-dark)',
                  boxShadow: '2px 2px 5px rgba(163, 177, 198, 0.15), -2px -2px 5px rgba(255,255,255,0.8)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                title="Exit Staff Mode"
              >
                <span>Exit</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsAdminMode(true);
                setCurrentPage('admin');
              }}
              className="clay-btn-secondary"
              style={{
                padding: '8px 16px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-dark)',
                background: 'var(--bg-cream-dark)',
                boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.25), -4px -4px 8px rgba(255,255,255,0.8)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Award size={14} />
              <span>Staff Portal</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-3px); }
        }
        @media (max-width: 768px) {
          header {
            flex-direction: column !important;
            padding: 16px !important;
            gap: 12px !important;
            border-radius: 18px !important;
            margin: 10px !important;
            width: calc(100% - 20px) !important;
          }
          form {
            max-width: 100% !important;
            width: 100% !important;
          }
          .nav-tabs {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
