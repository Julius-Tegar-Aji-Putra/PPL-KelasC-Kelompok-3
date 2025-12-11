import React from 'react';
import { useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react'; // Opsional: Jika ingin pakai icon hati dari lucide

function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  // Logic menyembunyikan footer di halaman login/register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="bg-text-2 border-t border-neutral-800">
      <div className="container mx-auto px-6 md:px-32 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Bagian Kiri: Copyright */}
          <p className="font-poppins text-sm text-gray-400 text-center md:text-left">
            &copy; {currentYear} <span className="font-semibold text-text tracking-wide">MartPlace</span>. All Rights Reserved.
          </p>

          {/* Bagian Kanan: Credit (Opsional, memberikan kesan personal & elegan) */}
          <div className="flex items-center gap-1.5 font-poppins text-sm text-gray-500">
            <span>Made with</span>
            {/* Menggunakan text-secondary-2 (Merah) sesuai config tailwind */}
            <span className="text-secondary-2 text-lg animate-pulse">♥</span> 
            <span>by Kelompok 3</span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;