import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Store, CheckCircle, XCircle, Clock } from 'lucide-react';

function PenjualDashboard() {
  // Mengambil data user yang dikirim dari SellerLayout via <Outlet context={{ user }} />
  const { user } = useOutletContext();

  // Handle jika user tidak ada
  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-2 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  // Fungsi untuk menentukan status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-green-200">
            <CheckCircle className="w-3.5 h-3.5" />
            ACTIVE
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-yellow-200">
            <Clock className="w-3.5 h-3.5" />
            PENDING
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            REJECTED
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-gray-200">
            <XCircle className="w-3.5 h-3.5" />
            {status?.toUpperCase() || 'UNKNOWN'}
          </span>
        );
    }
  };

  return (
    <div className="font-poppins max-w-4xl">
      
      {/* Header Title */}
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-slate-900">Dashboard Penjual</h1>
         <p className="text-gray-500 mt-1">Ringkasan status toko Anda</p>
      </div>

      {/* Status Card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-6">
        
        {/* Icon Besar */}
        <div className="bg-red-50 p-4 rounded-full">
            <Store className="w-12 h-12 text-secondary-2" />
        </div>

        <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-900">
                Halo, {user?.nama || 'Penjual'}!
            </h2>
            <p className="text-gray-500 text-sm mt-1 mb-4">
                Selamat datang di panel kontrol toko <span className="font-semibold text-gray-700">{user?.nama_toko}</span>.
            </p>
            
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Status Toko:</span>
                {getStatusBadge(user?.status)}
            </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
        <p>
            💡 <strong>Info:</strong> Halaman pengelolaan produk hanya dapat diakses penuh jika status toko Anda sudah <strong>ACTIVE</strong>.
        </p>
      </div>

    </div>
  );
}

export default PenjualDashboard;