import { ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY, REMOVE_FROM_CART, SAVE_SHIPPING } from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { productDetails } = getState();
    const { product } = productDetails;

    if (product) {
        const item = {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity,
            // Directly access the image URL from the 'image' object
            image: product.image && product.image.url ? product.image.url : '/placeholder.png',
        };

        dispatch({
            type: ADD_TO_CART,
            payload: item,
        });

        console.log('Item added to cart:', item);
        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } else {
        console.error("Product not found when trying to add to cart.");
    }
};


export const updateCartItemQuantity = (id, quantity) => (dispatch, getState) => {
    if (quantity < 1) return; // Prevent updating quantity to less than 1

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
    if (!data) {
        console.error("Shipping data is missing.");
        return;
    }

    dispatch({
        type: SAVE_SHIPPING,
        payload: data,
    });

    console.log('Shipping info saved:', data);

    localStorage.setItem('shippingInfo', JSON.stringify(data));
};
