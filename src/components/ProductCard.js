import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css'; // Import CSS for styling

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Error: No product data provided.</div>;
  }

  const { id, title, description, image, price, rating } = product;

  // Handle missing or invalid data gracefully
  const safeTitle = title || 'Untitled Product';
  const safeDescription = description || 'No description available.';
  const safeImage = image || 'https://via.placeholder.com/150'; // Use a placeholder image if none is provided
  const safePrice = typeof price === 'number' ? price.toFixed(2) : 'N/A'; // Format price to 2 decimal places
  const safeRating = typeof rating === 'number' ? rating.toFixed(1) : 'N/A';

  const handleAddToCart = () => {
    // Implement add to cart functionality here (e.g., dispatch an action to update cart state)
    console.log(`Adding product ${id} to cart`);
    alert(`Adding ${safeTitle} to cart! (This is a demo)`); // Replace with actual cart logic
  };

  return (
    <div className="product-card">
      <img src={safeImage} alt={safeTitle} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{safeTitle}</h3>
        <p className="product-description">{safeDescription}</p>
        <div className="product-price-rating">
          <p className="product-price">${safePrice}</p>
          <p className="product-rating">Rating: {safeRating}</p>
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
  }).isRequired,
};

export default ProductCard;