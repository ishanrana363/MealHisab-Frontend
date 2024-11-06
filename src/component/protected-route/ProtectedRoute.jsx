// src/component/protected-route/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, userRole }) => {
    console.log("Current User Role:", userRole); // Log the user role
    console.log("Allowed Roles:", allowedRoles); // Log allowed roles

    // Check if the user role is not present or not allowed
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />; // Redirect to login if not authorized
    }

    return children; // Render the children if authorized
};

export default ProtectedRoute;
