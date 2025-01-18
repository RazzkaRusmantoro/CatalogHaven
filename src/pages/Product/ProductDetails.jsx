import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors, fetchProductReviews } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';
import ReviewListPopup from './ReviewListPopup';
import CartDropdown from '../../components/Cart/CartDropdown';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: productId } = useParams();

    const { loading: productLoading, error, product = {} } = useSelector((state) => state.productDetails || {});
    const { reviews, loading: reviewsLoading } = useSelector((state) => state.reviews || {});
    const { isAuthenticated } = useSelector((state) => state.user);

    const [quantity, setQuantity] = useState(1);
    const [recentCartItem, setRecentCartItem] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);
    const [isReviewsPopupVisible, setReviewsPopupVisible] = useState(false);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(productId));
    }, [dispatch, error, productId]);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

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

    const toggleDescription = () => setDescriptionVisible(!isDescriptionVisible);

    const addToCart = () => {
        if (!isAuthenticated) {
            navigate('/sign-in');
            return;
        }

        const cartItem = {
            id: productId,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images?.[0]?.url || product.image?.url || '',
        };

        dispatch(addItemToCart(productId, quantity));
        setRecentCartItem(cartItem);
        setDropdownVisible(true);

        setTimeout(() => {
            setDropdownVisible(false);
        }, 3000);
    };

    const showReviewsPopup = () => {
        dispatch(fetchProductReviews(productId));
        setReviewsPopupVisible(true);
    };

    const closeReviewsPopup = () => setReviewsPopupVisible(false);

    const imageSrc = product.images?.[0]?.url || product.image?.url || '/placeholder.png';

    return (
        <>
            <div className="background-layer"></div>
            {productLoading ? (
                <Loader />
            ) : (
                <div className="product-details">
                    {/* Left */}
                    <div className="product-image-container">
                        <div className="product-image">
                            <img
                                src={imageSrc}
                                alt={product.name || 'Product Image'}
                            />
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
                        <div className="horizontal">
                            <hr />
                        </div>
                        <div className="product-seller">
                            <p><b>Seller:</b> {product.user?.username || product.seller || 'Unknown'}</p>
                        </div>

                        <div className="product-rating">
                            <span className="star-rating">
                                <span className="rating-num">{product.ratings?.toFixed(1)}</span>
                                {renderStarRating(Math.round(product.ratings))}
                            </span>
                            <span className="reviews-details" id="reviews-product" onClick={showReviewsPopup}>
                                ({product.numReviews} Reviews)
                            </span>
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
                            <button
                                disabled={product.stock === 0 || isDropdownVisible}
                                onClick={addToCart}
                            >
                                <b>Add to Cart</b>
                            </button>
                        </div>
                        <div className="product-description">
                            <div className="description-header" onClick={toggleDescription}>
                                <h4>Description</h4>
                                <span className="arrow">{isDescriptionVisible ? '▲' : '▼'}</span>
                                <div className={`product-description-content ${isDescriptionVisible ? 'expanded' : ''}`}>
                                    <p>{product.description || 'No description available'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDropdownVisible && recentCartItem && (
                <CartDropdown cartItems={[recentCartItem]} />
            )}

            {isReviewsPopupVisible && (
                <ReviewListPopup reviews={reviews} onClose={closeReviewsPopup} />
            )}
        </>
    );
};

export default ProductDetails;
