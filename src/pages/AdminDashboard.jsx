import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ClipboardList, PlusCircle, Trash2, Edit, X, ArrowUpDown, Layers, ShoppingBag, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';

export default function AdminDashboard() {
  const { 
    products, 
    orders, 
    updateOrderStatus, 
    addProduct, 
    editProduct,
    deleteProduct,
    setCurrentPage,
    editingProduct,
    setEditingProduct
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('inventory'); // 'orders' | 'inventory' | 'add-product'

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingProduct(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  };

  const handleEditSpecChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => {
      if (!prev) return null;
      return {
        ...prev,
        specs: {
          ...(prev.specs || {}),
          [name]: value
        }
      };
    });
  };

  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const parsedPrice = parseFloat(editingProduct.price);
    const parsedStock = parseInt(editingProduct.stock);
    const updated = {
      ...editingProduct,
      price: isNaN(parsedPrice) ? 0 : parsedPrice,
      stock: isNaN(parsedStock) ? 50 : parsedStock
    };
    editProduct(updated);
    setEditingProduct(null);
  };
  const [sortOrdersBy, setSortOrdersBy] = useState('date');
  
  // New product form state
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Inverters',
    brand: '',
    price: '',
    isTopItem: false,
    description: '',
    stock: '50',
    status: 'Active',
    // Dynamic specifications base
    spec1: '', // kW or Wattage (Capacity)
    spec2: '', // Phase or Technology
    spec3: '', // Type
    spec4: ''  // Efficiency or Dimensions
  });

  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) return;

    // Assemble specifications based on category
    const specs = {};
    if (newProductForm.category === 'Inverters') {
      specs['Brand'] = newProductForm.brand || 'Generic';
      specs['Capacity'] = newProductForm.spec1 || '5kW';
      specs['Phase'] = newProductForm.spec2 || '1 Phase';
      specs['Type'] = newProductForm.spec3 || 'Hybrid';
      specs['Efficiency'] = newProductForm.spec4 || '97.5%';
    } else if (newProductForm.category === 'Solar Panels') {
      specs['Brand'] = newProductForm.brand || 'Generic';
      specs['Wattage'] = newProductForm.spec1 || '550W';
      specs['Technology'] = newProductForm.spec2 || 'Topcon';
      specs['Efficiency'] = newProductForm.spec4 || '21.5%';
    } else if (newProductForm.category === 'Batteries') {
      specs['Model'] = newProductForm.spec1 || 'SE F5 Plus';
      specs['Brand'] = newProductForm.brand || 'Generic';
      specs['Capacity'] = newProductForm.spec2 || '5.12kWh';
      specs['Voltage'] = newProductForm.spec3 || '51.2V';
    } else {
      specs['Brand'] = newProductForm.brand || 'Generic';
      specs['Item'] = newProductForm.name;
    }

    const payload = {
      name: newProductForm.name,
      category: newProductForm.category,
      brand: newProductForm.brand || 'Binmin',
      price: parseFloat(newProductForm.price),
      isTopItem: newProductForm.isTopItem,
      description: newProductForm.description || 'Premium solar equipment guaranteed for residential installation.',
      stock: parseInt(newProductForm.stock) || 50,
      status: newProductForm.status || 'Active',
      specs: specs
    };

    addProduct(payload);
    setFormSuccess(true);
    setNewProductForm({
      name: '',
      category: 'Inverters',
      brand: '',
      price: '',
      isTopItem: false,
      description: '',
      stock: '50',
      status: 'Active',
      spec1: '',
      spec2: '',
      spec3: '',
      spec4: ''
    });
    setTimeout(() => setFormSuccess(false), 2000);
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
      {/* Title Header Banner */}
      <div className="glass-panel" style={{
        padding: '24px 32px',
        borderRadius: '24px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)',
        color: 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Binmin Power Systems Admin Portal</h2>
          <p style={{ fontSize: '0.85rem', color: '#BDC3C7', marginTop: '4px' }}>Simulate inventory management and customer order fullfillment processes.</p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '6px 16px',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: '700',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          Staff Mode Active
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
          onClick={() => setActiveTab('orders')}
          className={`glass-tab ${activeTab === 'orders' ? 'active' : ''}`}
          style={{ border: 'none' }}
        >
          Customer Orders ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`glass-tab ${activeTab === 'inventory' ? 'active' : ''}`}
          style={{ border: 'none' }}
        >
          Inventory Catalog ({products.length})
        </button>
        <button 
          onClick={() => setActiveTab('add-product')}
          className={`glass-tab ${activeTab === 'add-product' ? 'active' : ''}`}
          style={{ border: 'none' }}
        >
          Add New Solar Unit
        </button>
      </div>

      {/* TAB CONTENT 1: Orders Manager */}
      {activeTab === 'orders' && (
        <div className="admin-table-card animate-fade-in" style={{ padding: '24px', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClipboardList size={18} style={{ color: 'var(--primary-green)' }} />
            Active Sales Orders
          </h3>

          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-light)' }}>
              <ShoppingBag size={36} style={{ color: 'var(--text-light)', marginBottom: '8px' }} />
              <p style={{ fontSize: '0.95rem' }}>No orders have been placed by users yet.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', textAlign: 'left', color: 'var(--text-light)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Order ID</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Customer</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Date Placed</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Total Value</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800' }}>Status</th>
                    <th style={{ padding: '12px 16px', fontWeight: '800', textAlign: 'center' }}>Modify Status Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '16px 16px', fontWeight: '800', color: 'var(--text-dark)' }}>#{order.id}</td>
                      <td style={{ padding: '16px 16px', fontWeight: '500' }}>
                        <span style={{ fontWeight: '700' }}>{order.shippingAddress.name}</span> <br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{order.shippingAddress.city}, {order.shippingAddress.pincode}</span>
                      </td>
                      <td style={{ padding: '16px 16px', color: 'var(--text-medium)', fontWeight: '500' }}>{order.date}</td>
                      <td style={{ padding: '16px 16px', fontWeight: '800', color: 'var(--primary-green-dark)' }}>₹ {(Number(order.total) || 0).toFixed(2)}</td>
                      <td style={{ padding: '16px 16px' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '50px',
                          background: order.status === 'Delivered' ? '#D4EFDF' : order.status === 'Processing' ? '#FCF3CF' : '#F5CBA7',
                          color: order.status === 'Delivered' ? '#1E8449' : order.status === 'Processing' ? '#B7950B' : '#D35400',
                          display: 'inline-block'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 16px', display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Processing')}
                          style={{
                            fontSize: '0.7rem', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: order.status === 'Processing' ? 'var(--primary-green)' : '#EAEDED',
                            color: order.status === 'Processing' ? 'white' : 'var(--text-medium)',
                            fontWeight: '600'
                          }}
                        >
                          Process
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Shipped')}
                          style={{
                            fontSize: '0.7rem', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: order.status === 'Shipped' ? 'var(--primary-green)' : '#EAEDED',
                            color: order.status === 'Shipped' ? 'white' : 'var(--text-medium)',
                            fontWeight: '600'
                          }}
                        >
                          Ship
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Out for Delivery')}
                          style={{
                            fontSize: '0.7rem', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: order.status === 'Out for Delivery' ? 'var(--primary-green)' : '#EAEDED',
                            color: order.status === 'Out for Delivery' ? 'white' : 'var(--text-medium)',
                            fontWeight: '600'
                          }}
                        >
                          Out
                        </button>
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Delivered')}
                          style={{
                            fontSize: '0.7rem', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: order.status === 'Delivered' ? 'var(--primary-green)' : '#EAEDED',
                            color: order.status === 'Delivered' ? 'white' : 'var(--text-medium)',
                            fontWeight: '600'
                          }}
                        >
                          Deliver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: Inventory Catalog list (with Delete) */}
      {activeTab === 'inventory' && (
        <div className="admin-table-card animate-fade-in" style={{ padding: '24px', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} style={{ color: 'var(--primary-green)' }} />
            Active Products
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.06)', textAlign: 'left', color: 'var(--text-light)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: '800' }}>Product Details</th>
                  <th style={{ padding: '12px 16px', fontWeight: '800' }}>Category</th>
                  <th style={{ padding: '12px 16px', fontWeight: '800' }}>Brand</th>
                  <th style={{ padding: '12px 16px', fontWeight: '800' }}>Price</th>
                  <th style={{ padding: '12px 16px', fontWeight: '800' }}>Stock</th>
                  <th style={{ padding: '12px 16px', fontWeight: '800' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: '800', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <td style={{ padding: '16px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: '#EAEDED',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.55rem',
                        fontWeight: '800',
                        color: 'var(--text-light)'
                      }}>
                        {product.category}
                      </div>
                      <div>
                        <span style={{ fontWeight: '800', color: 'var(--text-dark)' }}>{product.name}</span> <br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>ID: {product.id}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 16px', fontWeight: '600' }}>{product.category}</td>
                    <td style={{ padding: '16px 16px', color: 'var(--text-medium)', fontWeight: '500' }}>{product.brand}</td>
                    <td style={{ padding: '16px 16px', fontWeight: '800', color: 'var(--primary-green-dark)' }}>₹ {(Number(product.price) || 0).toFixed(2)}</td>
                    <td style={{ padding: '16px 16px', fontWeight: '700', color: (product.stock === 0) ? '#E74C3C' : (product.stock <= 10) ? '#E67E22' : 'inherit' }}>
                      {product.stock !== undefined ? product.stock : 50} units
                    </td>
                    <td style={{ padding: '16px 16px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '50px',
                        background: product.status === 'Draft' ? '#FCF3CF' : '#D4EFDF',
                        color: product.status === 'Draft' ? '#B7950B' : '#1E8449',
                        display: 'inline-block'
                      }}>
                        {product.status || 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                          onClick={() => setEditingProduct(product)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-light)',
                            cursor: 'pointer',
                            transition: 'var(--transition-smooth)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-green)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Add Product Form */}
      {activeTab === 'add-product' && (
        <div className="admin-table-card animate-fade-in" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={18} style={{ color: 'var(--primary-green)' }} />
            Add Solar Product listing
          </h3>

          <form onSubmit={handleAddProductSubmit} className="admin-add-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Product Title</label>
              <input 
                type="text" 
                name="name" 
                placeholder="e.g. Deye 8kW Hybrid Inverter (3 Phase)"
                value={newProductForm.name} 
                onChange={handleInputChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Product Category</label>
              <select 
                name="category"
                value={newProductForm.category}
                onChange={handleInputChange}
                className="clay-input"
                style={{ width: '100%', height: '38px', borderRadius: '8px', padding: '0 12px' }}
              >
                <option value="Inverters">Solar Inverters</option>
                <option value="Solar Panels">Solar Panels (PV Modules)</option>
                <option value="Batteries">Batteries</option>
                <option value="BOS">Balance of System (BOS)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Product Brand</label>
              <input 
                type="text" 
                name="brand" 
                placeholder="e.g. Deye, Waaree, Havells"
                value={newProductForm.brand} 
                onChange={handleInputChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Price (₹ INR)</label>
              <input 
                type="number" 
                name="price" 
                step="0.01"
                placeholder="e.g. 1250.00"
                value={newProductForm.price} 
                onChange={handleInputChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Available Qty (Stock)</label>
              <input 
                type="number" 
                name="stock" 
                placeholder="e.g. 50"
                value={newProductForm.stock} 
                onChange={handleInputChange} 
                className="clay-input" 
                style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Status</label>
              <select 
                name="status"
                value={newProductForm.status}
                onChange={handleInputChange}
                className="clay-input"
                style={{ width: '100%', height: '38px', borderRadius: '8px', padding: '0 12px' }}
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label className="custom-checkbox" style={{ marginTop: '24px' }}>
                <input 
                  type="checkbox" 
                  name="isTopItem" 
                  checked={newProductForm.isTopItem} 
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Mark as Top item / Staff Pick
              </label>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Product Description</label>
              <textarea 
                name="description" 
                placeholder="Write a brief overview about product compliance, parameters, capacity and warranties."
                value={newProductForm.description} 
                onChange={handleInputChange} 
                className="clay-input" 
                style={{ width: '100%', minHeight: '80px', borderRadius: '8px', padding: '12px', resize: 'vertical' }} 
              />
            </div>

            {/* DYNAMIC SPECS INPUTS BASED ON CATEGORY */}
            <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px', marginTop: '8px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-medium)' }}>Technical Specifications Fields</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {newProductForm.category === 'Inverters' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Capacity (kW)</label>
                      <input type="text" name="spec1" placeholder="e.g. 5kW, 8kW" value={newProductForm.spec1} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Phase</label>
                      <input type="text" name="spec2" placeholder="e.g. 1 Phase, 3 Phase" value={newProductForm.spec2} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Type</label>
                      <input type="text" name="spec3" placeholder="e.g. Hybrid, Grid Tie" value={newProductForm.spec3} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Max Efficiency</label>
                      <input type="text" name="spec4" placeholder="e.g. 97.6%" value={newProductForm.spec4} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                  </>
                )}

                {newProductForm.category === 'Solar Panels' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Wattage (Watts)</label>
                      <input type="text" name="spec1" placeholder="e.g. 550W, 610W" value={newProductForm.spec1} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Technology</label>
                      <input type="text" name="spec2" placeholder="e.g. Topcon, BiFacial, Mono Perc" value={newProductForm.spec2} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Efficiency</label>
                      <input type="text" name="spec4" placeholder="e.g. 21.8%" value={newProductForm.spec4} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                  </>
                )}

                {newProductForm.category === 'Batteries' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Battery Model</label>
                      <input type="text" name="spec1" placeholder="e.g. SE F5 Plus" value={newProductForm.spec1} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Capacity (kWh)</label>
                      <input type="text" name="spec2" placeholder="e.g. 5.12kWh" value={newProductForm.spec2} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>Voltage (Nominal)</label>
                      <input type="text" name="spec3" placeholder="e.g. 51.2V" value={newProductForm.spec3} onChange={handleInputChange} className="clay-input" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                    </div>
                  </>
                )}

                {newProductForm.category === 'BOS' && (
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>Specifications for BOS accessories are automatically cataloged under item names.</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
              <div>
                {formSuccess && (
                  <span style={{ color: 'var(--primary-green-dark)', fontWeight: '600', fontSize: '0.85rem' }}>
                    ✓ Solar product cataloged successfully!
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className="clay-btn-primary" 
                style={{ border: 'none', height: '42px', padding: '0 24px', fontSize: '0.9rem' }}
              >
                Catalog Product
              </button>
            </div>

          </form>
        </div>
      )}



      <style>{`
        @media (max-width: 768px) {
          .admin-add-form {
            grid-template-columns: 1fr !important;
          }
          .admin-add-form div[style*="span 2"] {
            grid-column: span 1 !important;
          }
          .admin-table-card {
            overflow-x: auto !important;
          }
          .admin-table-card table {
            min-width: 600px;
          }
        }
      `}</style>
    </div>
  );
}
