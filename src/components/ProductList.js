// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/apis/products/list/');
        console.log(response.data); // Log response data for debugging
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {error && <p>{error}</p>}
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <strong>{product.ProductName}</strong> - {product.ProductCode}
              <ul>
                {product.variants.map((variant) => (
                  <li key={variant.id}>
                    <strong>{variant.name}</strong>
                    <ul>
                      {variant.sub_variants.map((subVariant) => (
                        <li key={subVariant.id}>
                          {subVariant.name} - Stock: {subVariant.stock}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
