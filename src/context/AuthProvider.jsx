// import React, { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import api from '../api/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
//         const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
//         setUser({ name: userName, role: userRole });
//       } catch (error) {
//         console.error("Invalid token:", error);
//         localStorage.removeItem('token');
//         setToken(null);
//       }
//     } else {
//       setUser(null);
//     }
//   }, [token]);

//   const login = async (email, password) => {
//     const response = await api.post('/auth/login', { email, password });
//     if (response.data.statusCode === 200) {
//       const newToken = response.data.data;
//       localStorage.setItem('token', newToken);
//       setToken(newToken);
//       const decoded = jwtDecode(newToken);
//       return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
//     }
//     throw new Error('Login failed');
//   };

//   const register = async (fullName, email, password) => {
//     await api.post('/auth/register', { fullName, email, password });
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          setUser({ name: userName, role: userRole });
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // --- THIS FUNCTION HAS BEEN REWRITTEN ---
      const response = await api.post('/auth/login', { email, password });

      // 1. Check for a successful response from your API
      if (response.data.statusCode === 200) {
        const token = response.data.data;

        // 2. Decode the token to get user details
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

        // 3. Save token and set user state
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({ name: userName, role: userRole });
        
        // 4. Return the user's role for navigation
        return userRole;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const register = async (fullName, email, password) => {
    await api.post('/auth/register', {
      fullName,
      email,
      password,
      role: 'user',
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;