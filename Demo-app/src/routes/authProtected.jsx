import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthProtected = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const FullPageRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/patients" replace />;
  }
  
  return children;
};

export { AuthProtected, FullPageRoute }; 