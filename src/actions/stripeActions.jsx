export const linkStripeAccount = (userId) => async (dispatch) => {
    try {
      dispatch({ type: 'STRIPE_LINKING_REQUEST' });
      
      const { data } = await axios.post('/stripe/onboarding', { userId });
      
      if (data.success) {
        // Redirect user to Stripe onboarding URL
        window.location.href = data.url;
        dispatch({ type: 'STRIPE_LINKING_SUCCESS' });
      } else {
        toast.error(data.message || 'Failed to link Stripe account');
        dispatch({ type: 'STRIPE_LINKING_FAIL', payload: data.message });
      }
    } catch (error) {
      toast.error(error.message || 'Error linking Stripe account');
      dispatch({ type: 'STRIPE_LINKING_FAIL', payload: error.message });
    }
};

// Check Stripe account link status
export const checkStripeAccountLink = (userId) => async (dispatch) => {
    try {
      dispatch({ type: 'CHECK_STRIPE_ACCOUNT_REQUEST' });
      
      const { data } = await axios.get(`/stripe/link-status/${userId}`);
      
      if (data.isLinked) {
        dispatch({ type: 'STRIPE_ACCOUNT_LINKED' });
      } else {
        dispatch({ type: 'STRIPE_ACCOUNT_NOT_LINKED' });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'CHECK_STRIPE_ACCOUNT_FAIL', payload: error.message });
    }
};
