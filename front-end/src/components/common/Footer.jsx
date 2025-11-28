import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="bg-text-2 text-text">
      <div className="container mx-auto px-32 py-16">
        
        <div className="flex flex-col md:flex-row justify-between gap-10">
          
          <div className="space-y-4 md:w-1/3 lg:w-[400px]">
            <h3 className="text-2xl font-bold font-inter">MartPlace</h3>
            <p className="font-poppins text-sm leading-relaxed">
              MartPlace adalah platform katalog produk yang memungkinkan
              penjual terverifikasi untuk menampilkan inventaris mereka.
              Pengunjung umum dapat mencari produk serta memberikan rating
              dan komentar tanpa perlu melakukan pendaftaran. Sistem ini
              dilengkapi notifikasi email, dashboard analitik, dan laporan
              otomatis untuk memantau performa toko.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-poppins font-medium">Support</h4>
            <div className="space-y-3 font-poppins text-sm">
              <p>
                Jl. Prof. Soedarto, Tembalang, Kec. Tembalang, 
                Kota Semarang, Jawa Tengah 50275
              </p>
              <p>martplace.ac@gmail.com</p>
              <p>+6285176909090</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-poppins font-medium">Account</h4>
            <ul className="space-y-3 font-poppins text-sm">
              <li><a href="#" className="hover:underline">My Account</a></li>
              <li><a href="#" className="hover:underline">Login / Register</a></li>
              <li><a href="#" className="hover:underline">Wishlist</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;