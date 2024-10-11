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
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

export const getProducts = () => async(dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get('/products');
        
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