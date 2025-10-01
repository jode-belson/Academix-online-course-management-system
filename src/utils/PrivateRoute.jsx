// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import { CircularProgress, Box } from '@mui/material';

// const PrivateRoute = ({ allowedRoles }) => {
//   const { user, token } = useAuth();
  
//   // This handles the initial loading state when the app first loads and the user is being determined.
//   if (token && !user) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
//   }

//   return user && allowedRoles.includes(user.role) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Check if user is logged in
    if (!user) {
        // --- THIS IS THE FIX ---
        // If not logged in, redirect to the homepage instead of the login page.
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Check if the user has the required role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If logged in but wrong role, redirect to homepage (or an unauthorized page)
        return <Navigate to="/" replace />;
    }
    
    // If logged in and has the correct role, show the page
    return <Outlet />;
};

export default PrivateRoute;