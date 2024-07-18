import React, { useState } from 'react';
import axios from 'axios';

const StockManagement = () => {
  const [productId, setProductId] = useState('');
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);

  const handleStockChange = async (type) => {
    try {
      await axios.post(`/api/products/${productId}/variants/${variantId}/stock/`, {
        quantity,
        type,
      });
      setError(null);
    } catch (error) {
      setError('Failed to update stock');
    }
  };

  return (
    <div>
      <h2>Stock Management</h2>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Variant ID:</label>
        <input
          type="text"
          value={variantId}
          onChange={(e) => setVariantId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>
      <button type="button" onClick={() => handleStockChange('add')}>Add Stock</button>
      <button type="button" onClick={() => handleStockChange('remove')}>Remove Stock</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default StockManagement;