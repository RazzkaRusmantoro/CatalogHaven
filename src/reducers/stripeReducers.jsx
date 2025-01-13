const initialStateStripe = {
    isLinked: false,
    loading: false,
    error: null,
  };
  
  export const stripeReducer = (state = initialStateStripe, action) => {
    switch (action.type) {
      case 'STRIPE_LINKING_REQUEST':
        return { ...state, loading: true };
      case 'STRIPE_LINKING_SUCCESS':
        return { ...state, loading: false };
      case 'STRIPE_LINKING_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'CHECK_STRIPE_ACCOUNT_REQUEST':
        return { ...state, loading: true };
      case 'STRIPE_ACCOUNT_LINKED':
        return { ...state, isLinked: true, loading: false };
      case 'STRIPE_ACCOUNT_NOT_LINKED':
        return { ...state, isLinked: false, loading: false };
      case 'CHECK_STRIPE_ACCOUNT_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  