// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import { createOrUpdateProduct, setAuthToken } from '../api';

const ProductForm = () => {
  const [productID, setProductID] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [totalStock, setTotalStock] = useState('');
  const [variants, setVariants] = useState([{ name: '', sub_variants: [{ name: '', stock: '' }] }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Handlers for input changes
  const handleProductIDChange = (e) => setProductID(e.target.value);
  const handleProductCodeChange = (e) => setProductCode(e.target.value);
  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleHsnCodeChange = (e) => setHsnCode(e.target.value);
  const handleTotalStockChange = (e) => setTotalStock(e.target.value);

  // Handlers for variant changes
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleSubVariantChange = (variantIndex, subVariantIndex, field, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].sub_variants[subVariantIndex][field] = value;
    setVariants(newVariants);
  };

  // Add new variant or sub-variant
  const addVariant = () => {
    setVariants([...variants, { name: '', sub_variants: [{ name: '', stock: '' }] }]);
  };

  const addSubVariant = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].sub_variants.push({ name: '', stock: '' });
    setVariants(newVariants);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('ProductID', productID);
      formData.append('ProductCode', productCode);
      formData.append('ProductName', productName);
      formData.append('HSNCode', hsnCode);
      formData.append('TotalStock', totalStock);
      formData.append('variants', JSON.stringify(variants));

      await createOrUpdateProduct(formData);
      resetForm();
      setError(null);
      setLoading(false);
      alert('Product created or updated successfully');
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const formattedErrors = formatErrors(error.response.data.errors);
        setError(formattedErrors);
      } else {
        setError({ general: 'Failed to create or update product' });
      }
      console.error('API Error:', error);
    }
  };

  // Format errors for display
  const formatErrors = (errors) => {
    let formatted = {};
    Object.keys(errors).forEach((key) => {
      formatted[key] = errors[key].join(', ');
    });
    return formatted;
  };

  // Reset form fields
  const resetForm = () => {
    setProductID('');
    setProductCode('');
    setProductName('');
    setHsnCode('');
    setTotalStock('');
    setVariants([{ name: '', sub_variants: [{ name: '', stock: '' }] }]);
  };

  // JSX for rendering the form
  return (
    <div>
      <h2>Create or Update Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product ID */}
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productID}
            onChange={handleProductIDChange}
            required
          />
        </div>

        {/* Product Code */}
        <div>
          <label>Product Code:</label>
          <input
            type="text"
            value={productCode}
            onChange={handleProductCodeChange}
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            required
          />
        </div>

        {/* HSN Code */}
        <div>
          <label>HSN Code:</label>
          <input
            type="text"
            value={hsnCode}
            onChange={handleHsnCodeChange}
            required
          />
        </div>

        {/* Total Stock */}
        <div>
          <label>Total Stock:</label>
          <input
            type="number"
            value={totalStock}
            onChange={handleTotalStockChange}
            required
          />
        </div>

        {/* Variants section */}
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex}>
            <label>Variant Name:</label>
            <input
              type="text"
              value={variant.name}
              onChange={(e) => handleVariantChange(variantIndex, 'name', e.target.value)}
              required
            />
            {/* Sub-variants */}
            {variant.sub_variants.map((subVariant, subVariantIndex) => (
              <div key={subVariantIndex}>
                <label>Sub-Variant Name:</label>
                <input
                  type="text"
                  value={subVariant.name}
                  onChange={(e) => handleSubVariantChange(variantIndex, subVariantIndex, 'name', e.target.value)}
                  required
                />
                <label>Stock:</label>
                <input
                  type="number"
                  value={subVariant.stock}
                  onChange={(e) => handleSubVariantChange(variantIndex, subVariantIndex, 'stock', e.target.value)}
                  required
                />
              </div>
            ))}
            {/* Button to add sub-variant */}
            <button type="button" onClick={() => addSubVariant(variantIndex)}>Add Sub-Variant</button>
          </div>
        ))}

        {/* Button to add variant */}
        <button type="button" onClick={addVariant}>Add Variant</button>

        {/* Submit button */}
        <button type="submit" disabled={loading}>Create or Update Product</button>
      </form>

      {/* Error display */}
      {error && (
        <div>
          <p>Error occurred:</p>
          <ul>
            {Object.keys(error).map((key, index) => (
              <li key={index}>{`${key}: ${error[key]}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
