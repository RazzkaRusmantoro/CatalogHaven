import React from 'react';
import Home from "./pages/Home/Home";
import Login from "./pages/Profile/LoginPage";
import UserInfo from "./pages/Profile/UserInfo";
import ProductDetails from './pages/Product/ProductDetails';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';

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
            <Route path="/dashboard" element={<UserInfo />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Layout>
      </Router>
    </UserContextProvider>
  );
}

export default App;
