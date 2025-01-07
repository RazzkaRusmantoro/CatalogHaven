import React, { useEffect } from 'react';

import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Checkout } from '@chec/commerce.js';

const Payment = () => {

    const stripe = useStripe();
    const elements = useElements();

    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    useEffect(() => {

    }, []);
    

    return (
        <>
            
        </>
    );
}

export default Payment;