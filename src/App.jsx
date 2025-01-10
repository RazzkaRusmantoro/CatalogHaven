import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Home from "./pages/Home/Home";
import Login from "./pages/Profile/LoginPage";
import UserInfo from "./pages/Profile/UserInfo";
import Search from "./pages/Search/Search";
import ProductDetails from './pages/Product/ProductDetails';
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import ProtectedRoute from './components/route/ProtectedRoute';
import Shipping from './pages/Checkout/Shipping';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Checkout/Payment';
import ListOrders from "./pages/Orders/ListOrders";
import Sell from "./pages/Sell/Sell";


import { loadUser } from './actions/userActions';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const stripePromise = loadStripe('pk_test_51Pf50dRxCns0JWUNHEicsRNxOtipIjtsYo57iL8g45rj1xtCGjTHvhawFDXv14husEhsSQzNDjksXn8QggqF4ah600rXpd3kP4');


function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {children}
      { location.pathname !== '/sign-in' // <Footer />}
      }
    </>
  );
}

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());

  }, [dispatch]);

  return (
    <UserContextProvider>
      <Router>
        <Toaster position='bottom-right' toastOptions={{
          duration: 2000,
          style: {
            fontSize: '20px',
            width: '400px',
            height: '80px',
          },
        }} />
        <Elements stripe={stripePromise}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<UserInfo />} />
                <Route path="/checkout/shipping" element={<Shipping />} />
                <Route path="/checkout/confirm" element={<Checkout />} />
                <Route path="/checkout/payment" element={<Payment />} />
                <Route path="/orders" element={<ListOrders />} />
              </Route>
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/sell" element={<Sell />} />
            </Routes>
          </Layout>
        </Elements>
      </Router>
    </UserContextProvider>
  );
}

export default App;
