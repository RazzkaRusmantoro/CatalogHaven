import axios from 'axios';
import { ADD_TO_CART } from '../constants/cartConstants';

// Add item to cart
export const addItemToCart = (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.post('/cart/add', { productId, quantity });

    dispatch({
        type: ADD_TO_CART,
        payload: data,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};