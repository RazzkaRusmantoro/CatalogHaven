import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useSelector(state => state.user);

    if (loading) {
        return <div><Loader/></div>; // Optional: Show a loading spinner
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
