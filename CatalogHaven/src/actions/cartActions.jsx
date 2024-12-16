
import axios from 'axios';
export const ADD_TO_CART = 'ADD_TO_CART';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}
