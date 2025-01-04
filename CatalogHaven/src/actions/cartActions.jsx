import { ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY, REMOVE_FROM_CART } from "../constants/cartConstants";


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { productDetails } = getState();
    const { product } = productDetails;


    if (product) {
        const item = {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images && product.images[0]?.url,
        };

        dispatch({
            type: ADD_TO_CART,
            payload: item,
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
};

export const updateCartItemQuantity = (id, quantity) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_CART_ITEM_QUANTITY,
        payload: { id, quantity },
    });

    // Save updated cart to localStorage
    const { cart } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    // Save updated cart to localStorage
    const { cart } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
};