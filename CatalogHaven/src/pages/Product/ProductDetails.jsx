import React, { useEffect } from 'react';
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
                            <h2>{product.name || 'No product name available'}</h2>
                        </div>
                        <div className="product-owner">
                            <p>Owner: {product.owner || 'Unknown'}</p>
                        </div>
                        <div className="product-price">
                            <p>Price: USD ${product.price || '0.00'}</p>
                        </div>
                        <div className="product-rating">
                            <p>Rating: {product.rating || 'No rating available'}</p>
                        </div>
                        <div className="product-quantity">
                            <p>Quantity: {product.stock || 'Out of stock'}</p>
                        </div>
                        <div className="product-buy">
                            <button>Add to Cart</button>
                        </div>
                        <div className="product-description">
                            <p>{product.description || 'No description available'}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;
