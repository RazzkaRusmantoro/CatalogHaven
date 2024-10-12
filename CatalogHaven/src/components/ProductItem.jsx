// src/components/ProductItem.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import './ProductItem.css'; // Optional: create a CSS file for styling

const ProductItem = ({ product }) => {
    

    const renderStarRating = (rating) => {
        const totalStars = 5;
        const fullStar = "★";
        const emptyStar = "☆";
        let stars = '';

        for (let i = 1; i <= totalStars; i++) {
            stars += i <= rating ? fullStar : emptyStar;
        }

        return stars;
    };

    return (
        <a href={`/product/${product._id}`}>
        <div className="product-item">
            <img src={product.images[0].url} alt={product.name} />
            <h6>{product.name}</h6>
            <div className="ratings">
                <span className="star-rating">
                    {renderStarRating(product.rating)}

                </span>
                <span id="reviews">({product.numReviews})</span>
            </div>
            <p id="price">USD ${product.price}</p>
        </div>
        </a>
    );
};

ProductItem.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        ).isRequired,
        rating: PropTypes.number.isRequired,
        numReviews: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
};

export default ProductItem;
