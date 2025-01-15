import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview, clearErrors, getProductDetails } from '../../actions/productActions';
import './ReviewPopup.css';
import { toast } from 'react-hot-toast';

const ReviewPopup = ({ productId, isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [product, setProduct] = useState(null);

    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.newReview || {});
    const productDetails = useSelector((state) => state.productDetails);

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetails(productId));
        }
    }, [productId, dispatch]);

    useEffect(() => {
        if (productDetails?.product) {
            setProduct(productDetails.product);
        }
    }, [productDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!rating || !comment.trim()) {
            toast.error('Please enter a rating and comment.');
            return;
        }

        dispatch(newReview({ rating, comment, productId }));
    };

    const closePopup = () => {
        if (error) dispatch(clearErrors());
        onClose();
    };

    React.useEffect(() => {
        if (success) {
            toast.success('Review submitted successfully!');
            setRating(0);
            setComment('');
            dispatch({ type: 'NEW_REVIEW_RESET' });
            onClose();
        }
    }, [success, dispatch, onClose]);

    const getImageSrc = (product) => {
        if (product?.image?.url) {
            return product.image.url;
        } else if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
            return product.images[0].url;
        } else {
            return "/placeholder.png";
        }
    };

    return (
        isOpen && (
            <div className="popup-overlay">
                <div className="popup">
                    <button className="close-btn" onClick={closePopup}>
                        &times;
                    </button>
                    {product && (
                        <div className="product-image-review">
                            <div className="product-image-container-review">
                                <img
                                    src={getImageSrc(product)}
                                    alt={product?.name || 'Product'}
                                    className="product-image-review-thumbnail"
                                />
                            </div>
                            <div className="product-details-review">
                                <h3 className="product-name-review">{product?.name}</h3>
                    
                                <label className="rating-label">
                                    <div className="star-rating-review">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={`star ${star <= rating ? 'filled' : ''}`}
                                                onClick={() => setRating(star)}
                                            >
                                                &#9733;
                                            </span>
                                        ))}
                                    </div>
                                </label>

                                {/* Review Form under rating */}
                                <form className="review-form" onSubmit={handleSubmit}>
                                    <label className="comment-label">
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Write your review here..."
                                            className="comment-input"
                                        />
                                    </label>
                                    <button type="submit" className="submit-btn">
                                        SEND REVIEW
                                    </button>
                                </form>
                            </div>
                        </div>                    
                    )}

                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        )
    );    
};

export default ReviewPopup;
