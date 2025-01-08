import { ADD_TO_CART, UPDATE_CART_ITEM_QUANTITY, REMOVE_FROM_CART, SAVE_SHIPPING } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.id === item.id);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i =>
                        i.id === isItemExist.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case UPDATE_CART_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };

        case SAVE_SHIPPING:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};
