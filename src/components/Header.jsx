// // // // import React from 'react';
// // // // import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// // // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // // import useAuth from '../hooks/useAuth';

// // // // const Header = () => {
// // // //   const { user, logout } = useAuth();
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation(); // We use this to know the current page path

// // // //   const handleLogout = () => {
// // // //     if (window.confirm('Are you sure you want to log out?')) {
// // // //       logout();
// // // //       navigate('/login');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'background.paper', color: 'text.primary' }}>
// // // //       <Toolbar>
// // // //         <Typography 
// // // //           variant="h6" 
// // // //           component={Link} 
// // // //           to="/" 
// // // //           sx={{ flexGrow: 1, textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}
// // // //         >
// // // //           Academix
// // // //         </Typography>

// // // //         <Box>
// // // //           {user ? (
// // // //             // === USER IS LOGGED IN ===
// // // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              
// // // //               {/* --- THIS IS THE UPDATED DYNAMIC LINK LOGIC --- */}
// // // //               {user.role === 'admin' ? (
// // // //                 // If user is an admin, always show the Admin Dashboard link
// // // //                 <Button component={Link} to="/admin/dashboard" color="inherit">Admin Dashboard</Button>
// // // //               ) : (
// // // //                 // If user is a regular user, toggle the link based on their location
// // // //                 location.pathname === '/' ? (
// // // //                   <Button component={Link} to="/dashboard" color="inherit">User Dashboard</Button>
// // // //                 ) : (
// // // //                   <Button component={Link} to="/" color="inherit">Home</Button>
// // // //                 )
// // // //               )}
// // // //               {/* --- END OF UPDATED LOGIC --- */}

// // // //               <Typography color="text.secondary">Hi, {user.name}</Typography>
// // // //               <Button variant="outlined" onClick={handleLogout}>Logout</Button>
// // // //             </Box>
// // // //           ) : (
// // // //             // === USER IS LOGGED OUT ===
// // // //             (location.pathname === '/login' || location.pathname === '/register') ? (
// // // //               <Button component={Link} to="/" variant="contained">Home</Button>
// // // //             ) : (
// // // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // // //                 <Button component={Link} to="/login" color="primary">User Login</Button>
// // // //                 <Button component={Link} to="/login" color="primary">Admin Login</Button>
// // // //                 <Button component={Link} to="/register" variant="contained">New User</Button>
// // // //               </Box>
// // // //             )
// // // //           )}
// // // //         </Box>
// // // //       </Toolbar>
// // // //     </AppBar>
// // // //   );
// // // // };

// // // // export default Header;

// // // import React from 'react';
// // // import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// // // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // // import { useAuth } from '../context/AuthProvider'; // Adjust path if needed

// // // const Header = () => {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const handleLogout = () => {
// // //     if (window.confirm('Are you sure you want to log out?')) {
// // //       logout(); // clear user state
// // //       navigate('/');
// // //     }
// // //   };

// // //   return (
// // //     <AppBar
// // //       position="fixed"
// // //       sx={{
// // //         zIndex: (theme) => theme.zIndex.drawer + 1,
// // //         backgroundColor: 'background.paper',
// // //         color: 'text.primary',
// // //       }}
// // //     >
// // //       <Toolbar>
// // //         {/* Logo / Brand */}
// // //         <Typography
// // //           variant="h6"
// // //           component={Link}
// // //           to="/"
// // //           sx={{
// // //             flexGrow: 1,
// // //             textDecoration: 'none',
// // //             color: 'primary.main',
// // //             fontWeight: 'bold',
// // //           }}
// // //         >
// // //           Academix
// // //         </Typography>

// // //         <Box>
// // //           {user ? (
// // //             // === USER IS LOGGED IN ===
// // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // //               {/* Show nothing special for admin, only dashboard link for user */}
// // //               {user.role !== 'admin' && (
// // //                 location.pathname === '/' ? (
// // //                   <Button component={Link} to="/dashboard" color="inherit">
// // //                     User Dashboard
// // //                   </Button>
// // //                 ) : (
// // //                   <Button component={Link} to="/" color="inherit">
// // //                     Home
// // //                   </Button>
// // //                 )
// // //               )}

// // //               <Typography color="text.secondary">Hi, {user.name}</Typography>
// // //               <Button variant="outlined" onClick={handleLogout}>
// // //                 Logout
// // //               </Button>
// // //             </Box>
// // //           ) : (
// // //             // === USER IS LOGGED OUT ===
// // //             (location.pathname === '/login' || location.pathname === '/register') ? (
// // //               <Button component={Link} to="/" variant="contained">
// // //                 Home
// // //               </Button>
// // //             ) : (
// // //               <Box sx={{ display: 'flex', gap: 1 }}>
// // //                 <Button component={Link} to="/login" color="primary">
// // //                   User Login
// // //                 </Button>
// // //                 <Button component={Link} to="/login" color="primary">
// // //                   Admin Login
// // //                 </Button>
// // //                 <Button component={Link} to="/register" variant="contained">
// // //                   New User
// // //                 </Button>
// // //               </Box>
// // //             )
// // //           )}
// // //         </Box>
// // //       </Toolbar>
// // //     </AppBar>
// // //   );
// // // };

// // // export default Header;
// // import React from 'react';
// // import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../context/AuthProvider';

// // const Header = () => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleLogout = () => {
// //     if (window.confirm('Are you sure you want to log out?')) {
// //       logout();
// //       navigate('/');
// //     }
// //   };

// //   return (
// //     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'background.paper', color: 'text.primary' }}>
// //       <Toolbar>
// //         <Typography 
// //           variant="h6" 
// //           component={Link} 
// //           to="/" 
// //           sx={{ flexGrow: 1, textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}
// //         >
// //           Academix
// //         </Typography>

// //         <Box>
// //           {user ? (
// //             // === USER IS LOGGED IN ===
// //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //               {user.role === 'admin' ? null : (
// //                 location.pathname === '/' ? (
// //                   <Button component={Link} to="/dashboard" color="inherit">User Dashboard</Button>
// //                 ) : (
// //                   <Button component={Link} to="/" color="inherit">Home</Button>
// //                 )
// //               )}
// //               <Typography color="text.secondary">Hi, {user.name}</Typography>
// //               <Button variant="outlined" onClick={handleLogout}>Logout</Button>
// //             </Box>
// //           ) : (
// //             // === USER IS LOGGED OUT ===
// //             (location.pathname === '/login' || location.pathname === '/register') ? (
// //               <Button component={Link} to="/" variant="contained">Home</Button>
// //             ) : (
// //               <Box sx={{ display: 'flex', gap: 1 }}>
// //                 {/* --- THIS IS THE FIX --- */}
// //                 {/* We now pass the 'state' prop directly to the Link component */}
// //                 <Button 
// //                   component={Link} 
// //                   to="/login" 
// //                   state={{ intendedRole: 'user' }} 
// //                   color="primary"
// //                 >
// //                   User Login
// //                 </Button>
// //                 <Button 
// //                   component={Link} 
// //                   to="/login" 
// //                   state={{ intendedRole: 'admin' }} 
// //                   color="primary"
// //                 >
// //                   Admin Login
// //                 </Button>
// //                 <Button component={Link} to="/register" variant="contained">New User</Button>
// //               </Box>
// //             )
// //           )}
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default Header;
// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthProvider';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       logout();
//       navigate('/');
//     }
//   };

//   return (
//     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'background.paper', color: 'text.primary' }}>
//       <Toolbar>
//         <Typography 
//           variant="h6" 
//           component={Link} 
//           to="/" 
//           sx={{ flexGrow: 1, textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}
//         >
//           Academix
//         </Typography>

//         <Box>
//           {user ? (
//             // === USER IS LOGGED IN ===
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               {user.role === 'admin' ? null : (
//                 location.pathname === '/' ? (
//                   <Button component={Link} to="/dashboard" color="inherit">User Dashboard</Button>
//                 ) : (
//                   <Button component={Link} to="/" color="inherit">Home</Button>
//                 )
//               )}
//               <Typography color="text.secondary">Hi, {user.name}</Typography>
//               <Button variant="outlined" onClick={handleLogout}>Logout</Button>
//             </Box>
//           ) : (
//             // === USER IS LOGGED OUT ===
//             (location.pathname === '/login' || location.pathname === '/register') ? (
//               <Button component={Link} to="/" variant="contained">Home</Button>
//             ) : (
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <Button 
//                   component={Link} 
//                   to="/login" 
//                   state={{ intendedRole: 'user' }} 
//                   color="primary"
//                 >
//                   User Login
//                 </Button>
//                 <Button 
//                   component={Link} 
//                   to="/login" 
//                   state={{ intendedRole: 'admin' }} 
//                   color="primary"
//                 >
//                   Admin Login
//                 </Button>
//                 <Button component={Link} to="/register" variant="contained">New User</Button>
//               </Box>
//             )
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'background.paper', color: 'text.primary' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}
        >
          Academix
        </Typography>

        <Box>
          {user ? (
            // === USER IS LOGGED IN ===
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              
              {user.role === 'admin' ? (
                // ✅ FIX: If user is an ADMIN, always show the Admin Dashboard button
                <Button component={Link} to="/admin/dashboard" color="inherit">Admin Dashboard</Button>
              ) : (
                // If user is a regular USER, keep the original logic
                location.pathname === '/' ? (
                  <Button component={Link} to="/dashboard" color="inherit">User Dashboard</Button>
                ) : (
                  <Button component={Link} to="/" color="inherit">Home</Button>
                )
              )}

              <Typography color="text.secondary">Hi, {user.name}</Typography>
              <Button variant="outlined" onClick={handleLogout}>Logout</Button>
            </Box>
          ) : (
            // === USER IS LOGGED OUT ===
            (location.pathname === '/login' || location.pathname === '/register') ? (
              <Button component={Link} to="/" variant="contained">Home</Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button component={Link} to="/login" state={{ intendedRole: 'user' }} color="primary">User Login</Button>
                <Button component={Link} to="/login" state={{ intendedRole: 'admin' }} color="primary">Admin Login</Button>
                <Button component={Link} to="/register" variant="contained">New User</Button>
              </Box>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;