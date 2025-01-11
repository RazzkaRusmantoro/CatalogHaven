import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, addProduct, getUserProducts, getProductRevenue } from "../../actions/productActions";
import { Link } from "react-router-dom";
import "./SellDashboard.css";

const SellDashboard = () => {
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);
    const { totalRevenue, revenueLoading, revenueError } = useSelector((state) => state.products);
    const [productRevenues, setProductRevenues] = useState({});

    
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        images: [],
    });

    useEffect(() => {
        if (user) {
            dispatch(getUserProducts(user._id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (products && products.length > 0) {
            products.forEach((product) => {
                dispatch(getProductRevenue(product._id)).then((data) => {
                    setProductRevenues((prevRevenues) => ({
                        ...prevRevenues,
                        [product._id]: data.totalRevenue,
                    }));
                });
            });
        }
    }, [dispatch, products]);
    

    return (
        <>
        <div className = "background-layer"></div>
        <div className="sell-dashboard">
            <div className = "sell-container-header">
                <h1>↓ Your Products:</h1>
                <button className="sell-button">
                    <span>
                        Sell a Product
                    </span>
                    <svg className="sell-icon" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"></path>
                    </svg>
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : products && products.length > 0 ? (
                <div className="product-list-sell">
                    {products.map((product) => (
                        <div key={product._id} className="product-card-sell">
                            <div className="product-image-sell">
                                <img
                                    src={product.images[0]?.url || "/placeholder.png"}
                                    alt={product.name}
                                />
                            </div>
                            <div className="product-details-sell">
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <p>Stock: {product.stock}</p>
                                <p>
                                    Total Revenue: ${productRevenues[product._id]}
                                </p>
                                <Link to={`/product/${product._id}`} className="view-details">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have not sold a product yet.</p>
            )}
        </div>
        </>
    );
};

export default SellDashboard;
