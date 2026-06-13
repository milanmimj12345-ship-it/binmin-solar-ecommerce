import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    title: 'Empower Your Home with Clean Solar Energy',
    subtitle: 'PREMIUM SOLAR SOLUTIONS',
    description: 'High-efficiency PV modules, smart hybrid inverters, and full Balance-of-System accessories tailored for absolute energy independence.',
    btnText: 'Shop Solar Modules',
    categoryLink: 'Solar Panels',
    gradient: 'linear-gradient(135deg, #B45309 0%, #FF5D00 60%, #FBBF24 100%)',
    bgDetailColor: 'rgba(251, 191, 36, 0.2)',
    image: '/assets/panel-adani.png',
    scale: 1.35
  },
  {
    title: 'Binmin SE F5 Plus Lithium Battery',
    subtitle: 'UNCOMPROMISED POWER RESILIENCE',
    description: 'Smart energy storage module with built-in active BMS, scalable up to 15 modules in parallel. 6,000+ cycles guaranteed.',
    btnText: 'Explore Storage',
    categoryLink: 'Batteries',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #EA580C 60%, #F59E0B 100%)',
    bgDetailColor: 'rgba(245, 158, 11, 0.2)',
    image: '/assets/battery-sef5.png',
    scale: 1.3
  },
  {
    title: 'Complete Balance of System (BOS)',
    subtitle: 'SAFETY & COMPLIANCE FIRST',
    description: 'Secure your setups with surge-protected ACDB boards, DC distribution boxes, double-insulated cables, and certified lightning protection.',
    btnText: 'View Accessories',
    categoryLink: 'BOS',
    gradient: 'linear-gradient(135deg, #451A03 0%, #9A3412 50%, #EA580C 100%)',
    bgDetailColor: 'rgba(234, 88, 12, 0.15)',
    image: '/assets/acdb-havells.png',
    scale: 1.05
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setCurrentPage, setShopFilters } = useContext(AppContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleCtaClick = (category) => {
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
    <div 
      className="hero-container animate-fade-in"
      style={{
        margin: '16px auto',
        width: 'calc(100% - 32px)',
        height: '420px',
        overflow: 'hidden',
        position: 'relative',
        background: SLIDES[currentSlide].gradient,
        border: 'none',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Dynamic Background Glow Graphic */}
      <div style={{
        position: 'absolute',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: SLIDES[currentSlide].bgDetailColor,
        right: '-100px',
        top: '-100px',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        transition: 'var(--transition-smooth)'
      }} />

      {/* Slide Navigation Buttons */}
      <button 
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: '24px',
          zIndex: 10,
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          color: 'white',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          transition: 'var(--transition-smooth)'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '24px',
          zIndex: 10,
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          color: 'white',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          transition: 'var(--transition-smooth)'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '40px',
        width: '100%',
        padding: '0 80px',
        alignItems: 'center',
        zIndex: 5,
        transition: 'var(--transition-smooth)'
      }} className="hero-slide-grid">
        {/* Left column: text content */}
        <div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '800',
            letterSpacing: '3px',
            background: 'rgba(255,255,255,0.15)',
            padding: '6px 16px',
            borderRadius: '50px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '16px',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {SLIDES[currentSlide].subtitle}
          </span>
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            lineHeight: '1.15',
            marginBottom: '16px',
            color: 'white',
            letterSpacing: '-1px'
          }}>
            {SLIDES[currentSlide].title}
          </h1>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '28px',
            fontWeight: '400'
          }}>
            {SLIDES[currentSlide].description}
          </p>

          {/* CTA Button */}
          <button 
            onClick={() => handleCtaClick(SLIDES[currentSlide].categoryLink)}
            className="clay-btn-primary"
            style={{
              background: 'var(--bg-white)',
              color: 'var(--text-dark)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15), inset 0 4px 6px rgba(255,255,255,0.8), inset 0 -4px 6px rgba(0,0,0,0.05)',
              border: 'none',
              fontSize: '1rem',
              padding: '14px 32px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'var(--bg-cream)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'var(--bg-white)';
            }}
          >
            <span>{SLIDES[currentSlide].btnText}</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right column: product image showcase */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '360px',
          width: '100%',
          overflow: 'visible'
        }} className="hero-img-col">
          <div style={{
            animation: 'heroFloat 6s ease-in-out infinite',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            overflow: 'visible'
          }}>
            <img 
              src={SLIDES[currentSlide].image} 
              alt={SLIDES[currentSlide].title}
              style={{
                maxHeight: '340px',
                maxWidth: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(5px 15px 25px rgba(0,0,0,0.3))',
                transform: `scale(${SLIDES[currentSlide].scale || 1.0})`,
                transition: 'var(--transition-smooth)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        zIndex: 5
      }}>
        {SLIDES.map((_, index) => (
          <div 
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: currentSlide === index ? '28px' : '8px',
              height: '8px',
              borderRadius: '50px',
              background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-container {
            height: auto !important;
            min-height: 320px !important;
            padding: 32px 16px !important;
            border-radius: 20px !important;
          }
          .hero-slide-grid {
            grid-template-columns: 1fr !important;
            padding: 0 16px !important;
            gap: 16px !important;
          }
          .hero-img-col {
            display: none !important;
          }
          .hero-container h1 {
            font-size: 1.6rem !important;
          }
          .hero-container p {
            font-size: 0.88rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-container {
            min-height: 260px !important;
            padding: 24px 12px !important;
            border-radius: 16px !important;
          }
          .hero-slide-grid {
            padding: 0 8px !important;
          }
          .hero-container h1 {
            font-size: 1.3rem !important;
          }
          .hero-container p {
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </div>
  );
}
