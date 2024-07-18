import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [variants, setVariants] = useState([{ name: '', options: [''] }]);
  const [error, setError] = useState(null);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleOptionChange = (variantIndex, optionIndex, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options[optionIndex] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', options: [''] }]);
  };

  const addOption = (index) => {
    const newVariants = [...variants];
    newVariants[index].options.push('');
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products/', { name, variants });
      setName('');
      setVariants([{ name: '', options: [''] }]);
      setError(null);
    } catch (error) {
      setError('Failed to create product');
    }
  };

  return (
    <div>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex}>
            <label>Variant Name:</label>
            <input
              type="text"
              value={variant.name}
              onChange={(e) => handleVariantChange(variantIndex, 'name', e.target.value)}
              required
            />
            {variant.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>Option:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(variantIndex, optionIndex, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={() => addOption(variantIndex)}>Add Option</button>
          </div>
        ))}
        <button type="button" onClick={addVariant}>Add Variant</button>
        <button type="submit">Create Product</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProductForm;