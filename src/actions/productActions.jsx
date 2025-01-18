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
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    USER_PRODUCTS_REQUEST,
    USER_PRODUCTS_SUCCESS,
    USER_PRODUCTS_FAIL,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    GET_PRODUCT_REVENUE_REQUEST, 
    GET_PRODUCT_REVENUE_SUCCESS, 
    GET_PRODUCT_REVENUE_FAIL,
    FETCH_REVIEWS_REQUEST,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAIL
} from "../constants/productConstants";
import toast from 'react-hot-toast';

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


// Action to add a new product
export const addProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST });
        
        // Get the token from localStorage or state if needed
        const token = localStorage.getItem("authToken");

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        };

        const { data } = await axios.post('/product/new', product, config);

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data.product
        });

        toast.success('Product added successfully!');
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: error.response?.data?.message || 'Failed to add product',
        });
        toast.error('Failed to add product');
    }
};

export const getUserProducts = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_PRODUCTS_REQUEST });

        console.log('Fetching products for user:', userId); 

        const { data } = await axios.get(`/products/user/${userId}`);
        console.log('Received Products:', data); 

        dispatch({
            type: USER_PRODUCTS_SUCCESS,
            payload: data.products, 
        });
    } catch (error) {
        dispatch({
            type: USER_PRODUCTS_FAIL,
            payload: error.response?.data?.message || 'Failed to fetch user products',
        });

        console.error('Error fetching user products:', error); 
    }
};


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

// Action to get product revenue
export const getProductRevenue = (productId) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_REVENUE_REQUEST });

        const { data } = await axios.get(`/revenue/product/${productId}`);
        console.log('Product Revenue Data:', data);

        dispatch({
            type: GET_PRODUCT_REVENUE_SUCCESS,
            payload: data.totalRevenue
        });

        console.log('Product Revenue:', data.totalRevenue);

        return data;

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_REVENUE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });

        console.error('Error fetching product revenue:', error);
    }
    
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock);
        if (productData.image) {
            formData.append('image', productData.image);
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.put(`/product/update/${id}`, formData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });

        toast.success('Product updated successfully!');
        console.log("Update Success:", data.success);

        window.location.reload();

        dispatch({ type: UPDATE_PRODUCT_RESET });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response?.data?.message || 'Something went wrong',
        });

        dispatch({ type: UPDATE_PRODUCT_RESET });
    }
};


export const fetchProductReviews = (productId) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_REVIEWS_REQUEST });

        const { data } = await axios.get(`/products/${productId}/reviews`);

        console.log('Fetched Reviews:', data.reviews);

        dispatch({
            type: FETCH_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: FETCH_REVIEWS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
