
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productActions';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const { loading = false, error = null, product = {} } = useSelector(state => state.productDetails || {});

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        // Fetch product details
        dispatch(getProductDetails(productId));
    }, [dispatch, error, productId]);

    // Logging for debug
    useEffect(() => {
        if (!loading && product) {
            console.log('Product Image URL:', product.images && product.images.length > 0 ? product.images[0].url : 'No image available');
        }
    }, [loading, product]);

    const [quantity, setQuantity] = useState(1); // Initial quantity state
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const increaseQuantity = () => {
        setQuantity(quantity + 1); // Increase quantity
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); // Decrease quantity
        }
    };

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

    const toggleDescription = () => {
        setDescriptionVisible(!isDescriptionVisible); // Toggle description visibility
    };

    return (
        <>
            {loading ? (

                <Loader />

            ) : (
                <div className="product-details">
                    {/* Left */}
                    <div className="product-image-container">
                        <div className="product-image">
                            <img src={product.images && product.images.length > 0 ? product.images[0].url : ''} alt={product.name || 'Product Image'} />
                        </div>
                    </div>
                    {/* Right */}
                    <div className="product-details-info">
                        <div className="product-name">
                            <h1>{product.name || 'No product name available'}</h1>
                        </div>
                        <div className="product-price">
                            <h3>USD ${product.price || '0.00'}</h3>
                        </div>
                        <div className = "horizontal">
                            <hr></hr>
                        </div>
                        <div className="product-seller">
                            <p><b>Seller:</b> {product.user?.username|| product.seller || 'Unknown'}</p>
                        </div>
                        
                        <div className="product-rating">
                            <span className="star-rating">
                                {renderStarRating(product.rating)}

                            </span>
                            <span id="reviews">({product.numReviews})</span>
                        </div>
                        <div className="product-quantity">
                            <p>Quantity:</p>
                            <div className="quantity-container">
                                <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                <span className="quantity-value">{quantity}</span>
                                <button className="quantity-button" onClick={increaseQuantity}>+</button>
                            </div>
                        </div>
                        <div className="product-buy">
                            <button><b>Add to Cart</b></button>
                        </div>
                        <div className="product-description">
                            <div className="description-header" onClick={toggleDescription}>
                                <h4>Description</h4>
                                <span>{isDescriptionVisible ? '▲' : '▼'}</span> {/* Toggle icon */}
                            </div>
                            {isDescriptionVisible && (
                                <p>{product.description || 'No description available'}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;
