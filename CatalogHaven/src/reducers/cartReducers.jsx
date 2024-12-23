import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            // Check if the product already exists in the cart based on the product ID
            const isItemExist = state.cartItems.find(i => i.id === item.id);

            if (isItemExist) {
                // If the item exists, update the quantity
                return {
                    ...state,
                    cartItems: state.cartItems.map(i =>
                        i.id === isItemExist.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    )
                };
            } else {
                // If item doesn't exist, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }

        default:
            return state;
    }
};

