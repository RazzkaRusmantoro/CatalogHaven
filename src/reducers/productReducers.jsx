import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS,
    FEATURED_PRODUCTS_REQUEST,
    FEATURED_PRODUCTS_SUCCESS,
    FEATURED_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_RESET,
    USER_PRODUCTS_REQUEST,
    USER_PRODUCTS_SUCCESS,
    USER_PRODUCTS_FAIL,
    UPDATE_PRODUCTS_RESET,
 } from "../constants/productConstants";

export const productsReducer = (state = { products: [], featuredProducts: [] }, action) => {
    switch(action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            }

        case ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
            case USER_PRODUCTS_REQUEST: // Handle request for user products
            return {
                ...state,
                loading: true,
                products: [] // Clear products until they are fetched
            }

        case USER_PRODUCTS_SUCCESS: // Handle successful response for user products
            return {
                ...state,
                loading: false,
                products: action.payload // Store the user products
            }

        case USER_PRODUCTS_FAIL: // Handle error response for user products
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        case FEATURED_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                featuredProducts: []
            };

        case FEATURED_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                featuredProducts: action.payload.products
            };

        case FEATURED_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        
        default:
            return state;

    }

}

export const productDetailsReducer = (state = { product: {} }, action) => {

    switch(action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {

                loading: false,
                product: action.payload.product,
                error: null
            }

        case PRODUCT_DETAILS_FAIL:
            return {

                loading: false,
                product: {},
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

    
}

export const newReviewReducer = ( state = {}, action ) => {

    switch ( action.type ) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}

const initialState = {
    products: [],
    totalRevenue: {},
    loading: false,
    error: null,
};


export const productRevenueReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_REVENUE_REQUEST:
            return { 
                ...state, loading: true 
            };
            case GET_PRODUCT_REVENUE_SUCCESS:
                return {
                    ...state,
                    totalRevenue: {
                        ...state.totalRevenue,
                        [action.payload.productId]: action.payload.revenue,
                    },
                    loading: false,
                };
        case GET_PRODUCT_REVENUE_FAIL:
            return { 
                ...state, loading: false, error: action.payload 
            };
        case CLEAR_ERRORS:
            return { 
                ...state, error: null 
            };
        default:
            return state;
    }
};