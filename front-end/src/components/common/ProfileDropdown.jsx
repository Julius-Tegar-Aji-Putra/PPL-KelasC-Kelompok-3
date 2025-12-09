import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaStore } from 'react-icons/fa';
import axios from 'axios';

// [1] Import ConfirmModal
import ConfirmModal from './ConfirmModal'; // Pastikan path import sesuai struktur folder Anda

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [user, setUser] = useState(null);
  
  // [2] State baru untuk kontrol Modal Logout
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    function handleClickOutside(event) {
      // Logic tambahan: Jangan tutup dropdown jika sedang klik di dalam modal (opsional, tapi modal pakai overlay jd aman)
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsLocked(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // [3] Fungsi Trigger: Hanya memunculkan modal
  const handleLogoutClick = () => {
    setIsOpen(false); // Tutup dropdown dulu biar rapi
    setShowLogoutConfirm(true); // Munculkan modal
  };

  // [4] Fungsi Eksekusi: Logout beneran setelah klik "Ya"
  const confirmLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    
    setShowLogoutConfirm(false); // Tutup modal
    navigate('/login');
    window.location.reload(); 
  };

  const handleClick = () => {
    if (isLocked) {
      setIsLocked(false);
      setIsOpen(false);
    } else {
      setIsLocked(true);
      setIsOpen(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isLocked) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isLocked) setIsOpen(false);
  };

  return (
    <>
      <div 
        className="relative" 
        ref={dropdownRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={handleClick}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-2 ${isOpen ? 'bg-red-700 ring-2 ring-offset-2 ring-secondary-2' : 'bg-secondary-2 hover:bg-red-600'}`}
        >
          {user?.foto ? (
             <img 
               src={`http://localhost:8000/storage/${user.foto}`} 
               alt="Profile" 
               className="w-full h-full rounded-full object-cover"
             />
          ) : (
             <FaUser className="text-white text-lg" />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-down">
            <div className="px-4 py-2 border-b border-gray-100 mb-1">
              <p className="text-xs font-bold text-gray-400 uppercase">
                Halo, {user?.nama || 'Akun Saya'}
              </p>
            </div>

            {user?.role === 'penjual' && (
              <Link
                to="/penjual/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-secondary-2 font-semibold hover:bg-red-50 hover:text-red-700 transition-colors font-poppins text-sm border-b border-gray-50"
              >
                <FaStore />
                <span>Dashboard Toko</span>
              </Link>
            )}

            {/* Tombol Logout sekarang memanggil handleLogoutClick */}
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-poppins text-sm"
            >
              <FaSignOutAlt />
              <span>Keluar</span> {/* Ubah Logout jadi Keluar biar konsisten Indo */}
            </button>
          </div>
        )}
      </div>

      {/* [5] Pasang Komponen Modal Disini (Di luar div relative agar overlay penuh layar) */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari akun ini?"
      />
    </>
  );
}

export default ProfileDropdown;