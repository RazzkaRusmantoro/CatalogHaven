import {
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
    
    
} from '../constants/userConstants';


const initialState = {
  user: null,
  isAuthenticated: false,  
  error: null,
  successMessage: '',
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
          error: null, 
          successMessage: '', 
        };
    case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload?.user || action.payload,
          isAuthenticated: true, 
          error: null,
          successMessage: 'Login successful',
        };
    case REGISTER_SUCCESS:
        return {
          ...state,
          user: action.payload?.user || action.payload,
          isAuthenticated: true, 
          error: null,
          successMessage: 'Registration successful',
        };
    case LOAD_USER_SUCCESS:
        return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
            error: null,
            loading: false,
        };
    case LOGOUT_SUCCESS:
        return {
            ...state,
            user: null,
            isAuthenticated: false,  
            loading: false,
        }
    case LOGOUT_FAIL:
        return {
            ...state,
            error: action.payload,
        }
    
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        successMessage: '',
      };
    case 'SET_SUCCESS_MESSAGE':
      return {
          ...state,
          successMessage: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,  
        loading: false,
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


