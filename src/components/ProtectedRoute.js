import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('token'); // Check for token in localStorage

    // If the token exists, render the element; otherwise, redirect to login
    return token ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
