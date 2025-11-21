import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, LogOut, Menu, Home, LayoutDashboard } from 'lucide-react';
import axios from 'axios';

// Storage URL Constant
const STORAGE_URL = 'http://localhost:8000/storage';

function SellerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  // MENU SIDEBAR DIPERBARUI
  const menus = [
    { 
        name: 'Dashboard', 
        path: '/penjual/dashboard', 
        icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
        name: 'Produk Manajemen', 
        path: '/penjual/products', // URL diganti jadi /products biar rapi
        icon: <Package className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-poppins">
      
      {/* SIDEBAR */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full z-30`}
      >
        <div className="h-24 flex items-center justify-center border-b border-gray-100">
          <Link to="/" className="font-bold text-text-2 text-2xl font-inter whitespace-nowrap flex items-center gap-2">
            {isSidebarOpen ? 'Seller Center' : 'SC'}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center px-4 py-3.5 rounded-lg transition-colors ${
                location.pathname === menu.path
                  ? 'bg-red-50 text-secondary-2 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {menu.icon}
              {isSidebarOpen && <span className="ml-3 text-sm whitespace-nowrap">{menu.name}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 space-y-2">
             <Link to="/" className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3 whitespace-nowrap">Ke Home Page</span>}
            </Link>

            <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <LogOut className="w-5 h-5" />
                {isSidebarOpen && <span className="ml-3 whitespace-nowrap">Logout</span>}
            </button>
        </div>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-24 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-base font-semibold text-gray-700">{user?.nama || 'Penjual'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-secondary-2 text-white flex items-center justify-center text-lg font-bold shadow-sm overflow-hidden">
                {user?.foto ? (
                    <img 
                        src={`${STORAGE_URL}/${user.foto}`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>{user?.nama ? user.nama.charAt(0).toUpperCase() : 'S'}</span>
                )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 relative">
          {/* PENTING: context={{ user }} agar data user bisa diakses di PenjualDashboard */}
          <Outlet context={{ user }} /> 
        </main>

      </div>
    </div>
  );
}

export default SellerLayout;