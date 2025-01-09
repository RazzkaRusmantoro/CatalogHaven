import axios from 'axios';

import { createSelector } from 'reselect';

import { 
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL, 
    CLEAR_ERRORS,
    FEATURED_PRODUCTS_REQUEST,
    FEATURED_PRODUCTS_SUCCESS,
    FEATURED_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET
} from "../constants/productConstants";

export const getProducts = (keyword = '', currentPage = 1) => async(dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/search?keyword=${keyword}&page=${currentPage}&limit=${resPerPage}`);
        
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getFeaturedProducts = () => async (dispatch) => {
    try {
        dispatch({ type: FEATURED_PRODUCTS_REQUEST });

        const { data } = await axios.get('/products/featured');

        dispatch({
            type: FEATURED_PRODUCTS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: FEATURED_PRODUCTS_FAIL,
            payload: error.response?.data.message || 'Failed to load featured products'
        });
    }
}

export const getProductDetails = (id) => async(dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/product/${id}`);

        console.log('Fetched Product Data:', data);
        
        console.log(data); 

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async(dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put('/review', reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async(dispatch) => {

    dispatch({
        type: CLEAR_ERRORS
    })
}

// Selector to get the base ProductDetails state
const selectProductDetailsState = (state) => state.ProductDetails;

// Memoized selector for product details
export const getProductDetailsSelector = createSelector(
    [selectProductDetailsState],
    (ProductDetails) => ({
        loading: ProductDetails.loading,
        error: ProductDetails.error,
        product: ProductDetails.product,
    })
);