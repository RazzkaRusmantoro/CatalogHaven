import axios from 'axios';

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';

export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/order/new', order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response?.data?.message || 'Failed to create order',
        });
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('/orders/profile');

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response?.data?.message || 'Failed to load orders',
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};