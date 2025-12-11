import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, LogOut, Menu, Home, LayoutDashboard, ClipboardList } from 'lucide-react'; // Tambah ClipboardList
import axios from 'axios';
import Loader from '../common/Loader';
import WelcomeAlert from '../common/WelcomeAlert';
import ConfirmModal from '../common/ConfirmModal';

// Storage URL Constant
const STORAGE_URL = 'http://localhost:8000/storage';

function SellerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.showWelcome) {
        setWelcomeName(location.state.userName || 'Seller');
        setShowWelcomeAlert(true);
        
        window.history.replaceState({}, document.title);
    }
  }, [location]);

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
        
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    checkUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setShowLogoutModal(false);
    navigate('/login');
  };

  const menus = [
    { 
        name: 'Dashboard', 
        path: '/penjual/dashboard', 
        icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
        name: 'Produk Manajemen', 
        path: '/penjual/products', 
        icon: <Package className="w-5 h-5" /> 
    },
    { 
        name: 'Laporan Toko',
        path : '/penjual/reports',
        icon : <ClipboardList className="w-5 h-5" />
    } 
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-poppins">
      
      {/* 4. TAMPILKAN ALERT DISINI (Floating) */}
      {showWelcomeAlert && (
        <WelcomeAlert 
            message={`Selamat datang kembali, ${welcomeName}!`}
            onClose={() => setShowWelcomeAlert(false)}
        />
      )}

      {/* Render Confirm Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari akun ini?"
        confirmText="Ya, Keluar"
        cancelText="Batal"
        variant="danger"
      />

      {/* SIDEBAR */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-full z-30`}
      >
        <div className="h-24 flex items-center justify-center border-b border-gray-100">
          <Link to="/" className="font-bold text-text-2 text-2xl font-inter whitespace-nowrap flex items-center gap-2 overflow-hidden">
            <span className={`transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'} overflow-hidden`}>
                Penjual Dashboard
            </span>
            <span className={`transition-all duration-300 ${!isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>
                PD
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-2 scrollbar-hide">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center px-4 py-3.5 rounded-lg transition-colors group ${
                location.pathname === menu.path
                  ? 'bg-red-50 text-secondary-2 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="min-w-[20px] flex items-center justify-center">
                {menu.icon}
              </div>
              
              <span 
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                  ${isSidebarOpen 
                    ? 'w-40 ml-3 opacity-100'
                    : 'w-0 ml-0 opacity-0'
                  }
                `}
              >
                {menu.name}
              </span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link 
            to="/" 
            className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <Home className="w-5 h-5 shrink-0" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-3 opacity-100' : 'ml-0 w-0 opacity-0'}`}>
              Ke Home Page
            </span>
          </Link>

          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-3 opacity-100' : 'ml-0 w-0 opacity-0'}`}>
              Logout
            </span>
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
          <Outlet context={{ user }} /> 
        </main>

      </div>
    </div>
  );
}

export default SellerLayout;