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
    NEW_REVIEW_FAIL
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