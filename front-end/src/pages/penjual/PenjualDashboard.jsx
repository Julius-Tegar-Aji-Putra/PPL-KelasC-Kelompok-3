import React from 'react';
import { useOutletContext } from 'react-router-dom';

function PenjualDashboard() {
  const { user } = useOutletContext();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard Penjual</h1>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <p className="text-lg">Halo, <strong>{user?.nama}</strong>!</p>
        <p className="text-gray-600 mt-2">
          Status Toko: 
          <span className={`ml-2 font-bold px-2 py-1 rounded ${user?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {user?.status?.toUpperCase()}
          </span>
        </p>
        <p className="mt-4 text-sm text-gray-500">
          (Halaman ini hanya bisa dilihat jika Anda login & status Active)
        </p>
      </div>
    </div>
  );
}

export default PenjualDashboard;