import { ADD_TO_CART } from "../constants/cartConstants";


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
