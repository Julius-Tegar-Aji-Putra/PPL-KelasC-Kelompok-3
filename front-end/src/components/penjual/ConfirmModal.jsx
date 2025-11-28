import React from 'react';
import { HelpCircle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, loading, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 p-6 text-center">
        
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-secondary-2" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{title || "Konfirmasi"}</h3>
        <p className="text-gray-500 text-sm mb-6">
          {message || "Apakah Anda yakin ingin melanjutkan tindakan ini?"}
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button 
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-lg bg-secondary-2 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? 'Memproses...' : 'Ya, Lanjutkan'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;