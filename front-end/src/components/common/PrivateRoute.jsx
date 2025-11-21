import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
        setIsAuthenticated(true);

      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem('auth_token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-2 mx-auto mb-4"></div>
          <p className="text-gray-600">Memeriksa status akun...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet context={{ user }} /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;