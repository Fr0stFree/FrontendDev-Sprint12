import React, { Component } from 'react';
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    props.isAuthenticated ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRoute;
