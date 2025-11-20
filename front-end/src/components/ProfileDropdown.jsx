import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsLocked(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
    window.location.reload(); 
  };

  // PERBAIKAN LOGIKA KLIK
  const handleClick = () => {
    if (isLocked) {
      // Jika sedang terkunci, klik akan membuka kunci dan menutup dropdown
      setIsLocked(false);
      setIsOpen(false);
    } else {
      // Jika tidak terkunci, klik akan mengunci dan MEMAKSA dropdown terbuka
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
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        // Tambahkan outline-none agar ring fokus browser default tidak mengganggu, 
        // tapi kita tetap punya focus ring dari Tailwind untuk aksesibilitas
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-2 ${isOpen ? 'bg-red-700 ring-2 ring-offset-2 ring-secondary-2' : 'bg-secondary-2 hover:bg-red-600'}`}
      >
        <FaUser className="text-white text-lg" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-down">
          <div className="px-4 py-2 border-b border-gray-100 mb-1">
            <p className="text-xs font-bold text-gray-400 uppercase">Akun Saya</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-poppins text-sm"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;