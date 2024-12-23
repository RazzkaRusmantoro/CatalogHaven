import { ADD_TO_CART } from '../constants/cartConstants';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Check if the item already exists in the cart
            const itemExists = state.cartItems.find(item => item.id === action.payload.id);

            if (itemExists) {
                // If item exists, update the quantity of that item
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            } else {
                // If item doesn't exist, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }

        default:
            return state;
    }
};
