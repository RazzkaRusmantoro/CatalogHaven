import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RatingPopup from './Review/RatingPopup';

import './ProductItem.css';

const ProductItem = ({ product }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [isBottom, setIsBottom] = useState(false);
    const productItemRef = useRef(null);
    const ratingsRef = useRef(null);

    const calculateStarDistribution = (reviews) => {
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((review) => {
            if (review.rating >= 1 && review.rating <= 5) {
                distribution[review.rating]++;
            }
        });
        return distribution;
    };

    const starDistribution = calculateStarDistribution(product.reviews);

    const renderStarRating = (rating) => {
        const totalStars = 5;
        const fullStar = '★';
        const emptyStar = '☆';
        let stars = '';

        for (let i = 1; i <= totalStars; i++) {
            stars += i <= rating ? fullStar : emptyStar;
        }

        return stars;
    };

    const imageSrc = product.images && Array.isArray(product.images) && product.images.length > 0
        ? product.images[0].url
        : product.image
        ? product.image.url
        : '/placeholder.png';

    return (
        <a href={`/product/${product._id}`}>
            <div className="product-item" ref={productItemRef}>
                <img
                    src={imageSrc}
                    alt={product.name}
                />
                <h6>{product.name}</h6>
                <div
                    className="ratings"
                    ref={ratingsRef}
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}
                >
                    <span className="star-rating">
                        <span className="rating-card">{product.ratings.toFixed(1)}</span>
                        {renderStarRating(Math.round(product.ratings))}
                        <span className="reviews-card">({product.numReviews})</span>
                    </span>
                    {showPopup && (
                        <RatingPopup
                            ratings={product.ratings}
                            numReviews={product.numReviews}
                            starDistribution={starDistribution}
                            isBottom={isBottom}
                        />
                    )}
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
                url: PropTypes.string.isRequired,
            })
        ),
        image: PropTypes.shape({
            url: PropTypes.string.isRequired,
        }), 
        ratings: PropTypes.number.isRequired,
        numReviews: PropTypes.number.isRequired,
        reviews: PropTypes.array.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductItem;
