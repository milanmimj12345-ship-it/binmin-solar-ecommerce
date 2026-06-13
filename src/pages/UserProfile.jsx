import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { User, MapPin, Phone, Mail, FileText, CheckCircle, Package, Truck, Smile, ShieldAlert, ChevronLeft } from 'lucide-react';

export default function UserProfile() {
  const { 
    orders, 
    userProfile, 
    setUserProfile, 
    setCurrentPage 
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'settings'
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  
  // Settings form local state
  const [settingsForm, setSettingsForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
    city: userProfile.city,
    state: userProfile.state,
    pincode: userProfile.pincode
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setUserProfile(settingsForm);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettingsForm(prev => ({ ...prev, [name]: value }));
  };

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  // Status mapping to display active tracking index
  const statusSteps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const getStatusIndex = (status) => {
    return statusSteps.indexOf(status);
  };

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
      {/* Profile Header Grid */}
      <div className="glass-panel animate-fade-in" style={{
        padding: '30px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        borderRadius: '24px'
      }}>
        {/* Profile Avatar */}
        <div style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%)',
          boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.4), 0 8px 16px var(--primary-green-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <User size={36} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-dark)' }}>{userProfile.name}</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <Mail size={14} style={{ color: 'var(--primary-green)' }} /> {userProfile.email}
            <span style={{ color: 'rgba(0,0,0,0.15)' }}>|</span>
            <Phone size={14} style={{ color: 'var(--primary-green)' }} /> {userProfile.phone}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        borderBottom: '2px solid rgba(0,0,0,0.06)',
        paddingBottom: '12px',
        marginBottom: '24px'
      }}>
        <button 
          onClick={() => { setActiveTab('orders'); setSelectedOrderId(null); }}
          className={`glass-tab ${activeTab === 'orders' ? 'active' : ''}`}
          style={{ border: 'none' }}
        >
          My Orders ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`glass-tab ${activeTab === 'settings' ? 'active' : ''}`}
          style={{ border: 'none' }}
        >
          Profile Settings
        </button>
      </div>

      {/* TAB CONTENT: Orders History & Live Tracker */}
      {activeTab === 'orders' && (
        <div style={{ display: 'grid', gridTemplateColumns: selectedOrderId ? '1fr 1fr' : '1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* Orders list */}
          <div className="clay-card" style={{ padding: '24px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: 'var(--primary-green)' }} />
              Order History
            </h3>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-light)' }}>
                <p style={{ fontSize: '0.95rem' }}>You haven't placed any orders yet.</p>
                <button onClick={() => setCurrentPage('shop')} className="clay-btn-primary" style={{ border: 'none', margin: '16px auto 0 auto', padding: '8px 20px', fontSize: '0.85rem' }}>
                  Explore Products
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {orders.map(order => (
                  <div 
                    key={order.id} 
                    onClick={() => setSelectedOrderId(order.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      background: selectedOrderId === order.id ? 'var(--primary-green-light)' : 'var(--bg-cream-dark)',
                      border: selectedOrderId === order.id ? '1px solid var(--primary-green)' : '1px solid rgba(255,255,255,0.7)',
                      boxShadow: selectedOrderId === order.id 
                        ? 'inset 1px 1px 2px rgba(255,255,255,0.5)' 
                        : 'inset 2px 2px 4px rgba(0,0,0,0.03)',
                      transition: 'var(--transition-smooth)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={e => {
                      if (selectedOrderId !== order.id) {
                        e.currentTarget.style.background = 'var(--bg-white)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (selectedOrderId !== order.id) {
                        e.currentTarget.style.background = 'var(--bg-cream-dark)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div>
                      <h4 style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-dark)' }}>Order #{order.id}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600' }}>Date: {order.date}</span>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--primary-green-dark)' }}>₹ {(Number(order.total) || 0).toFixed(2)}</div>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '50px',
                          background: order.status === 'Delivered' ? '#D4EFDF' : order.status === 'Processing' ? '#FCF3CF' : '#F5CBA7',
                          color: order.status === 'Delivered' ? '#1E8449' : order.status === 'Processing' ? '#B7950B' : '#D35400',
                          display: 'inline-block',
                          marginTop: '4px'
                        }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT Side: Live Status Tracker Timeline */}
          {selectedOrderId && selectedOrder && (
            <div className="clay-card animate-fade-in" style={{ padding: '24px', borderRadius: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Live Tracking: #{selectedOrder.id}</h3>
                <span className="clay-badge-green" style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>{selectedOrder.status}</span>
              </div>

              {/* Status Tracking Steps Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingLeft: '8px', position: 'relative' }}>
                
                {/* Visual Line connector */}
                <div style={{
                  position: 'absolute',
                  left: '19px',
                  top: '16px',
                  bottom: '16px',
                  width: '4px',
                  background: '#EAEDED',
                  borderRadius: '2px',
                  zIndex: 1
                }} />

                {/* Shaded Active Line connector */}
                <div style={{
                  position: 'absolute',
                  left: '19px',
                  top: '16px',
                  height: `${(getStatusIndex(selectedOrder.status) / 3) * 100}%`,
                  maxHeight: 'calc(100% - 32px)',
                  width: '4px',
                  background: 'var(--primary-green)',
                  borderRadius: '2px',
                  zIndex: 2,
                  transition: 'var(--transition-smooth)'
                }} />

                {/* Step 1: Processing */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 5 }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: getStatusIndex(selectedOrder.status) >= 0 ? 'var(--primary-green)' : '#BDC3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: getStatusIndex(selectedOrder.status) >= 0 ? '0 0 8px var(--primary-green)' : 'none',
                    fontWeight: '800',
                    fontSize: '0.7rem'
                  }}>
                    {getStatusIndex(selectedOrder.status) >= 0 ? '✓' : '1'}
                  </div>
                  <div>
                    <h5 style={{ fontWeight: '800', fontSize: '0.9rem', color: getStatusIndex(selectedOrder.status) >= 0 ? 'var(--text-dark)' : 'var(--text-light)' }}>Order Received</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>We have received your payment. Our engineering staff is verifying system parameters.</p>
                  </div>
                </div>

                {/* Step 2: Shipped */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 5 }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: getStatusIndex(selectedOrder.status) >= 1 ? 'var(--primary-green)' : '#BDC3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: getStatusIndex(selectedOrder.status) >= 1 ? '0 0 8px var(--primary-green)' : 'none',
                    fontWeight: '800',
                    fontSize: '0.7rem'
                  }}>
                    {getStatusIndex(selectedOrder.status) >= 1 ? '✓' : '2'}
                  </div>
                  <div>
                    <h5 style={{ fontWeight: '800', fontSize: '0.9rem', color: getStatusIndex(selectedOrder.status) >= 1 ? 'var(--text-dark)' : 'var(--text-light)' }}>Dispatched</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Solar units handed over to specialized heavy-cargo freight carriers.</p>
                  </div>
                </div>

                {/* Step 3: Out for Delivery */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 5 }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: getStatusIndex(selectedOrder.status) >= 2 ? 'var(--primary-green)' : '#BDC3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: getStatusIndex(selectedOrder.status) >= 2 ? '0 0 8px var(--primary-green)' : 'none',
                    fontWeight: '800',
                    fontSize: '0.7rem'
                  }}>
                    {getStatusIndex(selectedOrder.status) >= 2 ? '✓' : '3'}
                  </div>
                  <div>
                    <h5 style={{ fontWeight: '800', fontSize: '0.9rem', color: getStatusIndex(selectedOrder.status) >= 2 ? 'var(--text-dark)' : 'var(--text-light)' }}>Out for Delivery</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Delivery vehicle is en-route to your installation location site.</p>
                  </div>
                </div>

                {/* Step 4: Delivered */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 5 }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: getStatusIndex(selectedOrder.status) >= 3 ? 'var(--primary-green)' : '#BDC3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: getStatusIndex(selectedOrder.status) >= 3 ? '0 0 8px var(--primary-green)' : 'none',
                    fontWeight: '800',
                    fontSize: '0.7rem'
                  }}>
                    {getStatusIndex(selectedOrder.status) >= 3 ? '✓' : '4'}
                  </div>
                  <div>
                    <h5 style={{ fontWeight: '800', fontSize: '0.9rem', color: getStatusIndex(selectedOrder.status) >= 3 ? 'var(--text-dark)' : 'var(--text-light)' }}>Delivered</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Package signed off at site. Binmin Solar installation check completed.</p>
                  </div>
                </div>

              </div>

              {/* Shipped Items List Summary inside tracking */}
              <div className="clay-card-inset" style={{ padding: '16px', marginTop: '24px', background: 'var(--bg-cream-dark)' }}>
                <h5 style={{ fontSize: '0.8rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-medium)' }}>Delivery Destination:</h5>
                <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-dark)' }}>
                  {selectedOrder.shippingAddress.name} <br />
                  {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </p>
                
                <h5 style={{ fontSize: '0.8rem', fontWeight: '800', margin: '12px 0 6px 0', color: 'var(--text-medium)' }}>Items:</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {selectedOrder.items.map(item => (
                    <div key={item.product.id} style={{ display: 'flex', justifyContext: 'space-between', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-medium)' }}>{item.product.name} (x{item.quantity})</span>
                      <span style={{ fontWeight: '700' }}>₹ {(Number(item.product.price * item.quantity) || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB CONTENT: Profile Address Settings Form */}
      {activeTab === 'settings' && (
        <div className="clay-card" style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px' }}>Personal details & Address book</h3>
          
          <form onSubmit={handleSettingsSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={settingsForm.name} 
                onChange={handleSettingsChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={settingsForm.email} 
                onChange={handleSettingsChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Street Address</label>
              <input 
                type="text" 
                name="address" 
                value={settingsForm.address} 
                onChange={handleSettingsChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>City</label>
              <input 
                type="text" 
                name="city" 
                value={settingsForm.city} 
                onChange={handleSettingsChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>State</label>
              <input 
                type="text" 
                name="state" 
                value={settingsForm.state} 
                onChange={handleSettingsChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Pincode (Zipcode)</label>
              <input 
                type="text" 
                name="pincode" 
                maxLength="6"
                value={settingsForm.pincode} 
                onChange={handleSettingsChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                value={settingsForm.phone} 
                onChange={handleSettingsChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <div>
                {isSaved && (
                  <span style={{ color: 'var(--primary-green-dark)', fontWeight: '600', fontSize: '0.85rem' }}>
                    ✓ Settings saved locally!
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className="clay-btn-primary" 
                style={{ border: 'none', height: '42px', padding: '0 24px', fontSize: '0.9rem' }}
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
