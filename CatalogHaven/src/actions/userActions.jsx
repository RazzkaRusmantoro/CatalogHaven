import {
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../constants/userConstants';
import axios from 'axios';

// Login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ 
            type: LOGIN_REQUEST 
        });

        dispatch({
            type: 'SET_SUCCESS_MESSAGE',
            payload: 'Login successful', 
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/login', { email, password }, config);
        console.log('Login Response:', data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });
        
    } catch (error) {
        console.error('Login Error:', error.response || error);

        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.message || error.message || 'Something went wrong'
        });
    }
};


// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ 
            type: REGISTER_REQUEST 
        });

        dispatch({
            type: 'SET_SUCCESS_MESSAGE',
            payload: 'Registration successful', 
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const { data } = await axios.post('/register', userData, config);
        console.log('Register Response:', data); 
        console.log('User:', data.user);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        console.error('Register Error:', error.response || error);

        dispatch({
            type: REGISTER_FAIL,
            payload: error.response?.data?.message || error.message || 'Something went wrong'
        });
    }
};



// Load user details
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/profile');

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response?.data?.message || 'Failed to load user',
        });
    }
};

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/logout');
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response?.data?.message || 'Failed to logout',
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ 
        type: CLEAR_ERRORS
    });
};
