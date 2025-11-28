//
import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader'; // 1. Import Loader

function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = response.data;
        setUser(userData);
        
        // Simpan data user terbaru ke localStorage agar sinkron dengan SellerLayout
        localStorage.setItem('user', JSON.stringify(userData));
        
        setIsAuthenticated(true);

      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user'); // Hapus user juga jika token invalid
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // 2. GANTI TAMPILAN LOADING MANUAL DENGAN COMPONENT LOADER
  if (isAuthenticated === null) {
    return <Loader />;
  }

  // Kirim context user ke child route (Outlet)
  return isAuthenticated ? <Outlet context={{ user }} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;