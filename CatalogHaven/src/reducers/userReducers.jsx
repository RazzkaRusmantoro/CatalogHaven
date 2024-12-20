import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL
} from '../constants/userConstants';

const initialState = {
  // Ensure valid JSON data before parsing it
  user: (() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      return null;
    }
  })(),
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
switch (action.type) {
  case LOGIN_REQUEST:
  case REGISTER_REQUEST:
  case LOAD_USER_REQUEST:
      return {
          ...state,
          loading: true,
          isAuthenticated: false,
      };
  case LOGIN_SUCCESS:
  case REGISTER_SUCCESS:
    // Ensure the user data is valid before saving to localStorage
    try {
      localStorage.setItem('user', JSON.stringify(action.payload));
    } catch (e) {
      console.error("Error saving user to localStorage:", e);
    }
    return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
    };
  case LOAD_USER_SUCCESS:
      return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          loading: false,
      }
  case LOGIN_FAIL:
  case REGISTER_FAIL:
  case LOAD_USER_FAIL:
      return {
          ...state,
          error: action.payload,
          loading: false,
          isAuthenticated: false,
      };
  case LOGOUT_SUCCESS:
      localStorage.removeItem('user');
      return {
          ...state,
          user: null,
          isAuthenticated: false,  
          loading: false,
      };
  case LOGOUT_FAIL:
      return {
          ...state,
          error: action.payload,
      };
  case CLEAR_ERRORS:
      return {
          ...state,
          error: null,
      };
  default:
      return state;
}
};
