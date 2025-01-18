import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productsReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { authReducer } from "./reducers/userReducers";
import { newOrderReducer, myOrdersReducer } from "./reducers/orderReducers";
import { newReviewReducer } from "./reducers/productReducers";
import { stripeReducer } from "./reducers/stripeReducers";
import { reviewsReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: authReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    newReview: newReviewReducer,
    stripe: stripeReducer,
    reviews: reviewsReducer
    
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : [],

    },
    myOrders: {
        orders: [],
        loading: false,
        error: null,
    }


};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;