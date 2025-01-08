import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { myOrders, clearErrors } from '../../actions/orderActions';

const ListOrders = () => {
    const dispatch = useDispatch();

    const { loading, error, myOrders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());
        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const renderOrders = () => {
        return myOrders.map(order => (
            <tr key={order._id}>
                <td>{order._id}</td>
                <td>${order.totalPrice}</td>
                <td>{order.orderStatus}</td>
                <td>
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        Details
                    </Link>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <h1>My Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Amount</th>
                            <th>Order Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderOrders()}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default ListOrders;
