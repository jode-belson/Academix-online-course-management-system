
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider'; // Make sure this path is correct

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth; // <-- This must be a default export