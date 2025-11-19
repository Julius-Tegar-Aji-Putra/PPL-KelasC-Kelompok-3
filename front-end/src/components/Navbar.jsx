import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { Link, useLocation } from 'react-router-dom'; 
import ProfileDropdown from './ProfileDropdown';

function Navbar() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location.pathname]);

  return (
    <header className="bg-primary shadow-sm border-b border-gray-200 h-24">
      <div className="container mx-auto px-32 h-full">
        <div className={`flex items-center h-full ${isAuthPage ? 'justify-center' : 'justify-between'}`}>
          
          <Link to="/" className="text-2xl font-bold font-inter text-text-2">
            CampusMarket
          </Link>

          {!isAuthPage && (
            <>
              <div className="w-96 flex items-center bg-secondary px-3 py-2 rounded">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-transparent outline-none font-poppins text-sm text-text-2"
                />
                <FaSearch className="text-gray-500" />
              </div>

              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <ProfileDropdown />
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="font-poppins text-text-2 px-4 py-2 rounded hover:bg-secondary transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="font-poppins text-text-2 px-4 py-2 rounded hover:bg-secondary transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;