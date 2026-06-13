import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { X } from 'lucide-react';

export default function EditProductModal() {
  const { editingProduct, setEditingProduct, editProduct } = useContext(AppContext);

  if (!editingProduct) return null;

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

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '80px 20px',
      overflowY: 'auto'
    }}>
      <div className="clay-card" style={{
        backgroundColor: '#FFFDF9',
        backgroundImage: 'none',
        color: 'var(--text-dark)',
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        borderRadius: '24px',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(92, 45, 19, 0.3)',
        border: '2px solid var(--primary-green)'
      }}>
        <button 
          onClick={() => setEditingProduct(null)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-light)',
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#E74C3C'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px', color: 'var(--text-dark)' }}>
          Edit Solar Product Specification
        </h3>

        <form onSubmit={handleEditProductSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Product Title</label>
            <input 
              type="text" 
              name="name" 
              value={editingProduct.name || ''} 
              onChange={handleEditInputChange} 
              className="clay-input" 
              style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Brand</label>
            <input 
              type="text" 
              name="brand" 
              value={editingProduct.brand || ''} 
              onChange={handleEditInputChange} 
              className="clay-input" 
              style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Category</label>
            <select 
              name="category"
              value={editingProduct.category || ''}
              onChange={handleEditInputChange}
              className="clay-input"
              style={{ width: '100%', height: '38px', borderRadius: '8px', padding: '0 12px' }}
            >
              <option value="Inverters">Solar Inverters</option>
              <option value="Solar Panels">Solar Panels (PV Modules)</option>
              <option value="Batteries">Batteries</option>
              <option value="ACDB">ACDB</option>
              <option value="DCDB">DCDB</option>
              <option value="Cables">Cables</option>
              <option value="Earthing">Earthing</option>
              <option value="Lightning Arrestors">Lightning Arrestors</option>
              <option value="Energy Meters">Energy Meters</option>
              <option value="Isolators">Isolators</option>
              <option value="MC4 Connectors">MC4 Connectors</option>
              <option value="Cabinets">Cabinets</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Price (₹ INR)</label>
            <input 
              type="number" 
              name="price" 
              step="0.01"
              value={editingProduct.price !== undefined && editingProduct.price !== null ? editingProduct.price : ''} 
              onChange={handleEditInputChange} 
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
              value={editingProduct.stock !== undefined && editingProduct.stock !== null ? editingProduct.stock : ''} 
              onChange={handleEditInputChange} 
              className="clay-input" 
              style={{ width: '100%', height: '38px', borderRadius: '8px' }} 
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Status</label>
            <select 
              name="status"
              value={editingProduct.status || 'Active'}
              onChange={handleEditInputChange}
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
                checked={!!editingProduct.isTopItem} 
                onChange={handleEditInputChange}
              />
              <span className="checkmark"></span>
              Top item / Staff Pick
            </label>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-medium)', display: 'block', marginBottom: '6px' }}>Product Description</label>
            <textarea 
              name="description" 
              value={editingProduct.description || ''} 
              onChange={handleEditInputChange} 
              className="clay-input" 
              style={{ width: '100%', minHeight: '80px', borderRadius: '8px', padding: '12px', resize: 'vertical' }} 
              required
            />
          </div>

          {editingProduct.specs && Object.keys(editingProduct.specs).length > 0 && (
            <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px', marginTop: '8px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '12px', color: 'var(--text-medium)' }}>Technical Specifications</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {Object.entries(editingProduct.specs).map(([key, value]) => (
                  <div key={key}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '4px' }}>{key}</label>
                    <input 
                      type="text" 
                      value={value || ''} 
                      onChange={(e) => handleEditSpecChange({ target: { name: key, value: e.target.value } })} 
                      className="clay-input" 
                      style={{ width: '100%', height: '36px', borderRadius: '6px' }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={() => setEditingProduct(null)}
              className="clay-btn-secondary" 
              style={{ border: 'none', height: '42px', padding: '0 24px', fontSize: '0.9rem' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="clay-btn-primary" 
              style={{ border: 'none', height: '42px', padding: '0 24px', fontSize: '0.9rem' }}
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
