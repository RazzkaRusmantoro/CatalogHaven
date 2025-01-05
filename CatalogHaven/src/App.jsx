import React from 'react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./pages/Home/Home";
import Login from "./pages/Profile/LoginPage";
import UserInfo from "./pages/Profile/UserInfo";
import Search from "./pages/Search/Search";
import ProductDetails from './pages/Product/ProductDetails';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import ProtectedRoute from './components/route/ProtectedRoute';
import Shopping from './pages/Checkout/Shopping';

import { loadUser } from './actions/userActions';
import store from './store';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

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
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<UserInfo />} />
                <Route path="/checkout/shipping" element={<Shopping />} />
            </Route>
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<Search />} />
            
          </Routes>
        </Layout>
      </Router>
    </UserContextProvider>
  );
}

export default App;
