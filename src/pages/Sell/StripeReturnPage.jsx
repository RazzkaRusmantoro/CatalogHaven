import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const StripeReturnPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStripeReturn = async () => {
      try {
        const accountId = new URLSearchParams(window.location.search).get("accountId");
    
        const { data } = await axios.post('/verify-stripe', { accountId });
    
        if (data.success) {
          toast.success('Your Stripe account is now linked!');
          navigate("/dashboard"); 
        } else {
          toast.error('Failed to link your Stripe account');
        }
      } catch (error) {
        toast.error('Error verifying Stripe account');
      }
    };

    handleStripeReturn();
  }, [navigate]);

  return (
    <div>
      <p>Verifying your Stripe account...</p>
    </div>
  );
};

export default StripeReturnPage;
