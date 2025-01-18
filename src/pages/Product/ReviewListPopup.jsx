import React from 'react';
import './ReviewListPopup.css';

const ReviewListPopup = ({ reviews, onClose }) => {
    return (
        <div className="reviews-popup-overlay">
            <div className="reviews-popup">
                <button className="close-button" onClick={onClose}>
                    ✖
                </button>
                <h2 className = "reviews-product-header-list">Product Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    <div className="reviews-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <div className="review-header">
                                    <img
                                        src={review.profilePicture || '/assets/default-avatar.jpg'}
                                        alt="Profile"
                                        className="review-avatar"
                                    />
                                    <div>
                                        <p className="review-username">{review.name}</p>
                                        <p className="review-rating">Rating: {review.rating}/5</p>
                                    </div>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews available for this product.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewListPopup;
