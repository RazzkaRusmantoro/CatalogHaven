import React from 'react';
import PropTypes from 'prop-types';

import './RatingPopup.css';

const RatingPopup = ({ ratings, numReviews, starDistribution, isBottom }) => {
    const calculatePercentage = (starCount) => {
        if (numReviews === 0) return 0;
        return ((starCount / numReviews) * 100).toFixed(1);
    };

    return (
        <div className={`rating-popup ${isBottom ? 'bottom' : 'right'}`}>
            <h4 className="rating-header">Ratings & Reviews</h4>
            <div className="popup-stars">
                <div className="popup-rating">{ratings.toFixed(1)} ★</div>
                <div>{numReviews} Reviews</div>
            </div>
            <div className="popup-distribution">
                {Object.entries(starDistribution).map(([star, count]) => {
                    const percentage = calculatePercentage(count);

                    return (
                        <div key={star} className="popup-bar">
                            <span className="popup-bar-label">{star} Star</span>
                            <div className="popup-bar-track">
                                <div
                                    className="popup-bar-fill"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="popup-bar-percentage">
                                {percentage}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

RatingPopup.propTypes = {
    ratings: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired,
    starDistribution: PropTypes.shape({
        1: PropTypes.number.isRequired,
        2: PropTypes.number.isRequired,
        3: PropTypes.number.isRequired,
        4: PropTypes.number.isRequired,
        5: PropTypes.number.isRequired,
    }).isRequired,
    isBottom: PropTypes.bool.isRequired,
};

export default RatingPopup;
