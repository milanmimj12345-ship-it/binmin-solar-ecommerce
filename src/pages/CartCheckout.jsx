import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, ShieldCheck, ShoppingCart, ArrowRight, ChevronLeft } from 'lucide-react';

export default function CartCheckout() {
  const { 
    products,
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    placeOrder, 
    userProfile, 
    setCurrentPage 
  } = useContext(AppContext);

  // Address form fields local state, prefilled with global profile
  const [form, setForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
    city: userProfile.city,
    state: userProfile.state,
    pincode: userProfile.pincode
  });

  const [formErrors, setFormErrors] = useState({});
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const subtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 35; // Free shipping above ₹100
  const tax = subtotal * 0.08; // 8% simulated tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Full name required';
    if (!form.email.trim() || !form.email.includes('@')) errors.email = 'Valid email required';
    if (!form.phone.trim()) errors.phone = 'Phone number required';
    if (!form.address.trim()) errors.address = 'Shipping address required';
    if (!form.city.trim()) errors.city = 'City required';
    if (!form.state.trim()) errors.state = 'State required';
    if (!form.pincode.trim() || form.pincode.length !== 6 || isNaN(form.pincode)) {
      errors.pincode = '6-digit pincode required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if any item in the cart exceeds available stock
    const outOfStockItems = cart.filter(item => {
      const currentProduct = products.find(p => p.id === item.product.id);
      const stock = currentProduct ? currentProduct.stock : 0;
      return item.quantity > stock;
    });

    if (outOfStockItems.length > 0) {
      alert(
        `Cannot place order. The following items exceed available stock:\n` + 
        outOfStockItems.map(item => {
          const currentProduct = products.find(p => p.id === item.product.id);
          const stock = currentProduct ? currentProduct.stock : 0;
          return `- ${item.product.name} (Requested: ${item.quantity}, Available: ${stock})`;
        }).join('\n')
      );
      return;
    }

    const orderId = placeOrder(form);
    setPlacedOrderId(orderId);
    setIsCheckoutSuccess(true);
  };

  if (isCheckoutSuccess) {
    return (
      <div style={{ padding: '80px 16px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
        <div className="clay-card" style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary-green-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-green-dark)'
          }}>
            <ShieldCheck size={36} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Order Placed Successfully!</h2>
          <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Thank you for shopping with Binmin Power Systems. Your order ID is <strong style={{ color: 'var(--primary-green-dark)' }}>{placedOrderId}</strong>.
          </p>
          <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
            We have sent a confirmation email to {form.email}. You can track the shipment status in your profile portal.
          </p>
          <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: '16px' }}>
            <button 
              onClick={() => setCurrentPage('profile')} 
              className="clay-btn-primary" 
              style={{ flex: 1, border: 'none' }}
            >
              Track Order
            </button>
            <button 
              onClick={() => setCurrentPage('home')} 
              className="clay-btn-secondary" 
              style={{ flex: 1, border: 'none' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px 16px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }} className="animate-fade-in">
        <div className="clay-card" style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <ShoppingCart size={48} style={{ color: 'var(--text-light)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Your Shopping Cart is Empty</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', maxWidth: '340px' }}>
            Explore our high-efficiency solar inverters, PV modules, and balance-of-system accessories to fill your cart.
          </p>
          <button 
            onClick={() => setCurrentPage('shop')} 
            className="clay-btn-primary" 
            style={{ border: 'none', padding: '12px 28px', marginTop: '8px' }}
          >
            <span>Browse Shop</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

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

      <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>
        Checkout & Shopping Cart
      </h1>

      <div className="checkout-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Side: Cart Items List & Delivery Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Cart Items Card */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>Selected Items</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.product.id} className="cart-item-row" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  paddingBottom: '16px',
                  justifyContent: 'space-between'
                }}>
                  {/* Item Description info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: 'radial-gradient(circle, #FDFEFE 0%, #EAEDED 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--text-light)' }}>{item.product.category}</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-dark)' }}>{item.product.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600' }}>Brand: {item.product.brand}</span>
                      {(() => {
                        const currentProduct = products.find(p => p.id === item.product.id);
                        const currentStock = currentProduct ? currentProduct.stock : 0;
                        if (currentStock === 0) {
                          return (
                            <div style={{ color: '#E74C3C', fontSize: '0.75rem', fontWeight: '700', marginTop: '4px' }}>
                              ⚠️ Out of Stock
                            </div>
                          );
                        } else if (item.quantity > currentStock) {
                          return (
                            <div style={{ color: '#E67E22', fontSize: '0.75rem', fontWeight: '700', marginTop: '4px' }}>
                              ⚠️ Exceeds available stock (Only {currentStock} left)
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>

                  {/* Quantity Modifier and Total */}
                  <div className="cart-item-controls" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="clay-btn-round" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>-</button>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', width: '24px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="clay-btn-round" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>+</button>
                    </div>

                    <div style={{ width: '80px', textAlign: 'right' }}>
                      <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--primary-green-dark)' }}>₹ {(Number(item.product.price * item.quantity) || 0).toFixed(2)}
                      </span>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-light)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#E74C3C'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Shipping Form */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>Shipping & Billing Address</h3>
            <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleInputChange} 
                  className="clay-input" 
                  style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                />
                {formErrors.name && <span style={{ fontSize: '0.75rem', color: '#C0392B', fontWeight: '600' }}>{formErrors.name}</span>}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleInputChange} 
                  className="clay-input" 
                  style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                />
                {formErrors.email && <span style={{ fontSize: '0.75rem', color: '#C0392B', fontWeight: '600' }}>{formErrors.email}</span>}
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Street Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={form.address} 
                  onChange={handleInputChange} 
                  className="clay-input" 
                  style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                />
                {formErrors.address && <span style={{ fontSize: '0.75rem', color: '#C0392B', fontWeight: '600' }}>{formErrors.address}</span>}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={form.city} 
                  onChange={handleInputChange} 
                  className="clay-input" 
                  style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                />
                {formErrors.city && <span style={{ fontSize: '0.75rem', color: '#C0392B', fontWeight: '600' }}>{formErrors.city}</span>}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={form.state} 
                  onChange={handleInputChange} 
                  className="clay-input" 
                  style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                />
                {formErrors.state && <span style={{ fontSize: '0.75rem', color: '#C0392B', fontWeight: '600' }}>{formErrors.state}</span>}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Pincode (Zipcode)</label>
                <input 
                  type="text" 
                  name="pincode" 
                  maxLength="6"
                  value={form.pincode} 
                  onChange={handleInputChange} 
                  className="clay-input" 
                  style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                />
                {formErrors.pincode && <span style={{ fontSize: '0.75rem', color: '#C0392B', fontWeight: '600' }}>{formErrors.pincode}</span>}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleInputChange} 
                  className="clay-input" 
                  style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                />
                {formErrors.phone && <span style={{ fontSize: '0.75rem', color: '#C0392B', fontWeight: '600' }}>{formErrors.phone}</span>}
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Order Summary Panel */}
        <aside className="clay-card" style={{ padding: '24px', position: 'sticky', top: '90px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '10px' }}>
            Order Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContext: 'space-between', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-medium)', fontWeight: '500' }}>Subtotal</span>
              <span style={{ fontWeight: '700' }}>₹ {(Number(subtotal) || 0).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContext: 'space-between', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-medium)', fontWeight: '500' }}>Simulated Tax (8%)</span>
              <span style={{ fontWeight: '700' }}>₹ {(Number(tax) || 0).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContext: 'space-between', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-medium)', fontWeight: '500' }}>Freight Shipping</span>
              <span style={{ fontWeight: '700' }}>
                {shipping === 0 ? <span style={{ color: 'var(--primary-green)', fontWeight: '800' }}>FREE</span> : `₹${(Number(shipping) || 0).toFixed(2)}`}
              </span>
            </div>
            
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '8px 0' }}></div>
            
            <div style={{ display: 'flex', justifyContext: 'space-between', justifyContent: 'space-between', fontSize: '1.1rem' }}>
              <span style={{ fontWeight: '800', color: 'var(--text-dark)' }}>Order Total</span>
              <span style={{ fontWeight: '900', color: 'var(--primary-green-dark)' }}>₹ {(Number(total) || 0).toFixed(2)}</span>
            </div>

            {/* Payment security info */}
            <div className="glass-panel" style={{
              marginTop: '16px',
              padding: '12px 16px',
              fontSize: '0.75rem',
              color: 'var(--text-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.3)'
            }}>
              <ShieldCheck size={20} style={{ color: 'var(--primary-green)', flexShrink: 0 }} />
              <span>Secure checkout. Double shadow clay-encryption simulated. Solar items eligible for government subsidies.</span>
            </div>

            {/* Place Order CTA */}
            <button 
              onClick={handlePlaceOrder}
              className="clay-btn-primary" 
              style={{
                width: '100%',
                height: '46px',
                border: 'none',
                marginTop: '20px',
                fontSize: '0.95rem'
              }}
            >
              Confirm and Place Order
            </button>
          </div>
        </aside>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .checkout-grid form {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .cart-item-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .cart-item-controls {
            width: 100% !important;
            justify-content: space-between !important;
            gap: 12px !important;
            border-top: 1px dashed rgba(0,0,0,0.06);
            padding-top: 10px;
          }
          .checkout-grid .clay-card {
            padding: 14px !important;
          }
        }
        @media (max-width: 480px) {
          .checkout-grid {
            gap: 16px !important;
          }
          .checkout-grid .clay-card {
            padding: 10px !important;
          }
          .cart-item-row {
            padding-bottom: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
