// // import React, { useState } from 'react';
// // import { Paper, TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
// // import { useNavigate, Link, useLocation } from 'react-router-dom'; // 1. Import useLocation
// // import useAuth from '../../hooks/useAuth';

// // const LoginPage = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation(); // 2. Get the location object

// //   // 3. Determine where to redirect the user after login
// //   const from = location.state?.from || '';

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     try {
// //       const role = await login(email, password);
      
// //       // --- THIS IS THE UPDATED REDIRECT LOGIC ---
// //       if (from) {
// //         // If a destination was passed, go there
// //         navigate(from, { replace: true });
// //       } else if (role === 'admin') {
// //         // Otherwise, default to the admin dashboard
// //         navigate('/admin/dashboard', { replace: true });
// //       } else {
// //         // Or the user dashboard
// //         navigate('/dashboard', { replace: true });
// //       }

// //     } catch (err) {
// //       setError('Login failed. Please check your email and password.');
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <Container component="main" maxWidth="xs">
// //       <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //         <Typography component="h1" variant="h5">
// //           Sign In
// //         </Typography>
// //         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
// //           <TextField
// //             margin="normal"
// //             required
// //             fullWidth
// //             id="email"
// //             label="Email Address"
// //             name="email"
// //             autoComplete="email"
// //             autoFocus
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //           <TextField
// //             margin="normal"
// //             required
// //             fullWidth
// //             name="password"
// //             label="Password"
// //             type="password"
// //             id="password"
// //             autoComplete="current-password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
// //           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
// //             Sign In
// //           </Button>
// //           <Box textAlign="center">
// //             <Link to="/register" style={{ textDecoration: 'none' }}>
// //               <Typography variant="body2" color="primary">
// //                 {"Don't have an account? Sign Up"}
// //               </Typography>
// //             </Link>
// //           </Box>
// //         </Box>
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default LoginPage;

// import React, { useState } from 'react';
// import { Paper, TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthProvider';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // 🎯 STEP 1: Read the intended role sent from the Header
//   const intendedRole = location.state?.intendedRole;
//   // 🎯 STEP 2: Create the page title based on the role
//   const pageTitle = intendedRole === 'admin' ? 'Admin Sign In' : 'User Sign In';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const actualRole = await login(email, password);

//       // Verify the role after login
//       if (intendedRole && actualRole !== intendedRole) {
//         setError(`Access Denied. Please use the ${actualRole === 'admin' ? 'Admin' : 'User'} Login for this account.`);
//         logout(); // Clear the invalid login
//         return;
//       }

//       // If roles match, proceed with redirection
//       if (actualRole === 'admin') {
//         navigate('/admin/dashboard', { replace: true });
//       } else {
//         navigate(location.state?.from || '/dashboard', { replace: true });
//       }

//     } catch (err) {
//       setError('Login failed. Please check your email and password.');
//       console.error(err);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5">
//           {/* 🎯 STEP 3: Display the dynamic title here */}
//           {pageTitle}
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Sign In
//           </Button>
//           {intendedRole !== 'admin' && (
//             <Box textAlign="center">
//               <Link to="/register" style={{ textDecoration: 'none' }}>
//                 <Typography variant="body2" color="primary">
//                   {"Don't have an account? Sign Up"}
//                 </Typography>
//               </Link>
//             </Box>
//           )}
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginPage;

// import React, { useState } from 'react';
// import { Paper, TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthProvider';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const intendedRole = location.state?.intendedRole;
//   const pageTitle = intendedRole === 'admin' ? 'Admin Sign In' : 'User Sign In';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const actualRole = await login(email, password);

//       if (intendedRole && actualRole !== intendedRole) {
//         setError(`Access Denied. Please use the ${actualRole === 'admin' ? 'Admin' : 'User'} Login for this account.`);
//         logout();
//         return;
//       }

//       if (actualRole === 'admin') {
//         navigate('/admin/dashboard', { replace: true });
//       } else {
//         navigate(location.state?.from || '/dashboard', { replace: true });
//       }

//     } catch (err) {
//       // For Option A, we simply show an error and do nothing else.
//       setError('Login failed. Please check your email and password.');
//       console.error(err);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5">{pageTitle}</Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
//           <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
//           {intendedRole !== 'admin' && (
//             <Box textAlign="center">
//               <Link to="/register" style={{ textDecoration: 'none' }}>
//                 <Typography variant="body2" color="primary">{"Don't have an account? Sign Up"}</Typography>
//               </Link>
//             </Box>
//           )}
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle state
  const [error, setError] = useState('');
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const intendedRole = location.state?.intendedRole;
  const pageTitle = intendedRole === 'admin' ? 'Admin Sign In' : 'User Sign In';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const actualRole = await login(email, password);

      if (intendedRole && actualRole !== intendedRole) {
        setError(`Access Denied. Please use the ${actualRole === 'admin' ? 'Admin' : 'User'} Login for this account.`);
        logout();
        return;
      }

      if (actualRole === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(location.state?.from || '/dashboard', { replace: true });
      }

    } catch (err) {
      setError('Login failed. Please check your email and password.');
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">{pageTitle}</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'} // ✅ toggle type
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
          {intendedRole !== 'admin' && (
            <Box textAlign="center">
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">{"Don't have an account? Sign Up"}</Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
