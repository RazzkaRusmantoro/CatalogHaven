import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { myOrders, clearErrors } from '../../actions/orderActions';
import './ListOrders.css';
import { Link } from 'react-router-dom';

const ListOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());
        return () => dispatch(clearErrors());
    }, [dispatch]);

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <>
        <div className="background-layer"></div>
        <div className="list-orders-container">
            <div className="list-orders">
                {orders?.length ? (
                    orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h2 className="order-id">Order ID: {order._id}</h2>
                                <p className={`order-status ${order.orderStatus.toLowerCase()}`}>
                                    <strong>Status:</strong> {order.orderStatus}
                                </p>
                            </div>
                            <p className="order-date"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="order-price"><strong>Total Price:</strong> ${order.totalPrice}</p>
                            <hr className="cartItemSeparator" />
                            <div className="order-items">
                                {order.orderItems?.length ? (
                                    order.orderItems.map((item, idx) => (
                                        <div key={idx} className="order-item">
                                            <Link to={`/product/${item.product?._id}`}>
                                                <img 
                                                    src={item.product?.images[0]?.url || '/placeholder.png'} 
                                                    alt={item.product?.name || 'Product'} 
                                                    className="item-image"
                                                />
                                            </Link>
                                            <div className="item-details">
                                                <Link to={`/product/${item.product?._id}`}>
                                                    <span className="item-name">{item.product?.name || 'Product not found'}</span>
                                                </Link>
                                                <p className="item-price"><strong>Price:</strong> ${item.price}</p>
                                                <p className="item-quantity"><strong>Qty:</strong> {item.quantity}</p>
                                                <p className="item-total"><strong className = "total-item">Total:</strong> <span className='span-price'>${item.price * item.quantity}</span></p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No items in this order.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-orders">No orders found.</p>
                )}
            </div>
        </div>
        </>
    );
};

export default ListOrders;
