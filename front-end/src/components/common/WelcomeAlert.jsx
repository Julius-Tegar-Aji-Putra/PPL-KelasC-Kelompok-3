import React, { useEffect, useState } from 'react';
import { X, CheckCircle } from 'lucide-react'; // Menggunakan icon Lucide agar konsisten

const WelcomeAlert = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Efek animasi masuk
  useEffect(() => {
    setIsVisible(true);
    
    // Auto close setelah 8 detik
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Tunggu animasi keluar selesai baru unmount (300ms sesuai duration-300)
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div 
      className={`
        fixed top-5 right-5 z-50 w-full max-w-sm 
        transition-all duration-300 ease-in-out transform
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
      `}
    >
      {/* Container Alert sesuai styling referensi Anda */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 shadow-lg" role="alert">
        <div className="flex items-start">
          
          {/* Icon Check */}
          <div className="shrink-0">
            <CheckCircle className="size-5 text-teal-600 mt-0.5" />
          </div>
          
          {/* Content */}
          <div className="ms-3 flex-1">
            <h3 className="text-sm font-medium text-teal-800">
              Berhasil Login!
            </h3>
            <p className="text-sm text-teal-700 mt-1">
              {message || "Selamat datang kembali di MartPlace."}
            </p>
          </div>
          
          {/* Close Button */}
          <div className="ms-3">
            <button 
              onClick={handleClose}
              type="button" 
              className="inline-flex bg-teal-50 rounded-lg p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              <span className="sr-only">Dismiss</span>
              <X className="size-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WelcomeAlert;