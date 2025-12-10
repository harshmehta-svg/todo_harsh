import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'; // Import CSS for styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products from a local JSON file or an API
    const fetchProducts = async () => {
      try {
        // Option 1: Fetch from a local JSON file (e.g., products.json in the public directory)
        // const response = await fetch('/products.json');

        // Option 2: Fetch from an API endpoint (replace with your actual API endpoint)
        const response = await fetch('https://fakestoreapi.com/products'); // Example API

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="product-list-container">
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;