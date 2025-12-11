import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const CustomToast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
  };

  return (
    <div className={`fixed top-5 right-5 z-[60] flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-500 animate-slide-in-right ${styles[type]}`}>
      {icons[type]}
      <p className="text-sm font-medium pr-2">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors">
        <X className="w-4 h-4 opacity-50" />
      </button>
    </div>
  );
};

export default CustomToast;