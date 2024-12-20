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
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json', // Use JSON as content type
            }
        };

        const { data } = await axios.post('/login', { email, password }, config);

        if (data && data.user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.user, // Assuming 'user' is the object returned from the backend
            });
        } else {
            // Dispatch LOGIN_FAIL if the user data is invalid
            dispatch({
                type: LOGIN_FAIL,
                payload: 'Invalid email or password',
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.message || 'An error occurred during login',
        });
    }
};  

// Register user
export const register = (fname, lname, email, username, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/register', { fname, lname, email, username, password }, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user, // Assuming 'user' is the object returned after registration
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response?.data?.message || 'An error occurred during registration',
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
        localStorage.clear();
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
