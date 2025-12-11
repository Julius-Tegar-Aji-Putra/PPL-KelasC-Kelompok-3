import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserCheck, Menu, LogOut, FileText, User } from 'lucide-react';
import axios from 'axios';
import Loader from '../common/Loader';
import WelcomeAlert from '../common/WelcomeAlert';

const STORAGE_URL = 'http://localhost:8000/storage';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Alert
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // 1. Cek User & Loading
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
      setTimeout(() => setIsLoading(false), 1000);
    };
    checkUser();
  }, []);

  // 2. Cek Sinyal Welcome dari Login
  useEffect(() => {
    if (location.state?.showWelcome) {
        setWelcomeName(location.state.userName || 'Admin');
        setShowWelcomeAlert(true);
        window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };
  
  const menus = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Verifikasi Penjual', path: '/admin/verification', icon: <UserCheck className="w-5 h-5" /> },
    { name: 'Laporan', path: '/admin/reports', icon: <FileText className="w-5 h-5" /> },
  ];

  if (isLoading) return <Loader />;

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-poppins relative">
      
      {/* Alert */}
      {showWelcomeAlert && (
        <WelcomeAlert 
            message={`Selamat datang kembali, Administrator ${welcomeName}!`}
            onClose={() => setShowWelcomeAlert(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-full z-30`}>
        <div className="h-24 flex items-center justify-center border-b border-gray-100">
          <div className="font-bold text-text-2 text-2xl font-inter whitespace-nowrap flex items-center gap-2 overflow-hidden">
            <span className={`transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'} overflow-hidden`}>
                Admin Dashboard
            </span>
            <span className={`transition-all duration-300 ${!isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>
                AD
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-2 scrollbar-hide">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center px-4 py-3.5 rounded-lg transition-colors group ${
                location.pathname === menu.path
                  ? 'bg-secondary-2 text-white shadow-md shadow-red-100'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="min-w-[20px] flex items-center justify-center">
                {menu.icon}
              </div>
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-40 ml-3 opacity-100' : 'w-0 ml-0 opacity-0'}`}>
                {menu.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="px-3 py-3 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-3.5 rounded-lg transition-colors group text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className={`whitespace-nowrap transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-3 opacity-100' : 'ml-0 opacity-0 w-0'}`}>
                Keluar
            </span>
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-24 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold font-poppins text-text-2">{user?.nama || 'Admin'}</p>
              <p className="text-xs text-gray-500 font-poppins">Administrator</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary-2 flex items-center justify-center text-white font-semibold overflow-hidden border-2 border-gray-200">
              {user?.foto_profil ? (
                <img 
                  src={`${STORAGE_URL}/${user.foto_profil}`} 
                  alt={user.nama}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 relative p-8">
          <Outlet context={{ user }} /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;