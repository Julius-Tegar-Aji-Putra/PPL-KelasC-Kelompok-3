//
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import axios from 'axios';
import { 
  Store, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Package, 
  Star, 
  TrendingUp,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';

function PenjualDashboard() {
  const { user } = useOutletContext();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productPage, setProductPage] = useState(1);
  const [stockPage, setStockPage] = useState(1);
  const [ratingPage, setRatingPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Simulasi fetch data dari API
    const fetchDashboardData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const token = localStorage.getItem('auth_token'); 

        const response = await axios.get('/api/seller/dashboard/stats', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.data.success) {
            setStats(response.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS = [
    '#DB4444', '#4299E1', '#48BB78', '#F6AD55', '#9F7AEA', 
    '#ED64A6', '#ECC94B', '#38B2AC', '#667EEA', '#ED8936', 
    '#F56565', '#4FD1C5', '#D69E2E', '#9F7AEA', '#0BC5EA',
    '#B83280', '#FC8181', '#68D391', '#63B3ED', '#F6E05E', 
    '#76E4F7', '#F687B3', '#48BB78', '#F6AD55', '#4A5568', 
    '#C53030', '#2B6CB0', '#2F855A', '#C05621', '#805AD5',
    '#D53F8C', '#D69E2E', '#2C7A7B', '#5A67D8', '#DD6B20', 
    '#E53E3E', '#319795', '#3182CE'                        
  ];

  if (isLoading) {
    return <Loader />;
  }

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === 'active') return (
      <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
        <CheckCircle size={16} /> AKTIF
      </span>
    );
    if (s === 'pending') return (
      <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">
        <Clock size={16} /> MENUNGGU
      </span>
    );
    return (
      <span className="flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
        <XCircle size={16} /> DITOLAK
      </span>
    );
  };

  // --- LOGIKA GENERATOR TOMBOL HALAMAN ---
  const renderPagination = (currentPage, totalPages, setPageFunc) => {
    const buttons = [];
    
    // Tombol Previous (<)
    buttons.push(
      <button
        key="prev"
        onClick={() => setPageFunc(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    );

    // Tombol Angka
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => setPageFunc(i)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              i === currentPage
                ? 'bg-[#DB4444] text-white border border-[#DB4444]'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2
      ) {
        buttons.push(<span key={`dots-${i}`} className="px-1 text-gray-400 text-xs">...</span>);
      }
    }

    // Tombol Next (>)
    buttons.push(
      <button
        key="next"
        onClick={() => setPageFunc(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    );

    return buttons;
  };

  return (
    <div className="font-poppins space-y-8 pb-10 p-8">
      
      {/* HEADER & WELCOME CARD */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-secondary-2">
            <Store size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Halo, {user?.nama_toko || user?.nama || 'Seller'}!</h1>
            <p className="text-gray-500 text-sm mt-1">
              Selamat datang kembali di panel kontrol toko Anda.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Status Toko</span>
          {getStatusBadge(user?.status || 'active')}
        </div>
      </div>

      {(user?.status === 'active' || !user?.status) ? (
        <>
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card Total Produk */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-4">
                <div className="p-3 bg-red-50 rounded-lg text-secondary-2 w-fit">
                  <Package size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800">{stats?.totalProduk}</h3>
              <p className="text-gray-500 text-sm">Total Produk</p>
            </div>

            {/* Card Total Stok */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-4">
                <div className="p-3 bg-red-50 rounded-lg text-secondary-2 w-fit">
                  <TrendingUp size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800">{stats?.totalStok}</h3>
              <p className="text-gray-500 text-sm">Total Stok Tersedia</p>
            </div>

            {/* Card Rating */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-4">
                <div className="p-3 bg-red-50 rounded-lg text-secondary-2 w-fit">
                  <Star size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800">{stats?.rataRataRating} <span className="text-lg text-gray-400">/ 5.0</span></h3>
              <p className="text-gray-500 text-sm">Rata-rata Rating Toko</p>
            </div>
          </div>

          {/* BAGIAN GRAFIK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* GRAFIK 1: Stok per Produk */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              {(() => {
                const data = stats?.stockData || [];
                if (data.length === 0) {
                return (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400">
                      <div className="bg-gray-50 p-4 rounded-full mb-3">
                        <Package size={32} className="opacity-50" />
                      </div>
                      <p className="font-medium text-sm">Belum ada produk yang ditambahkan</p>
                    </div>
                  );
                }
                const totalPages = Math.ceil(data.length / itemsPerPage);
                // Potong data agar grafik tidak numpuk
                const currentData = data.slice((stockPage - 1) * itemsPerPage, stockPage * itemsPerPage);

                return (
                  <>
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Stok per Produk</h3>
                        <p className="text-sm text-gray-400">Distribusi stok (Halaman {stockPage})</p>
                      </div>
                      
                      {/* Tombol Halaman untuk Grafik Stok */}
                      {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                          {renderPagination(stockPage, totalPages, setStockPage)}
                        </div>
                      )}
                    </div>

                    <div className="h-72 w-full text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={currentData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{fill: '#64748b', fontSize: 12}} // Font sedikit diperbesar
                              interval={0}
                              height={40} // Tinggi dikurangi karena teks tegak
                              // Fungsi pemotong teks otomatis:
                              tickFormatter={(value) => {
                                  const limit = 10; // Batas jumlah huruf
                                  if (value.length > limit) return `${value.substring(0, limit)}...`;
                                  return value;
                              }}
                          />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="stok" fill="#DB4444" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* GRAFIK 2: Performa Rating (DENGAN PAGINATION) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              {(() => {
                const data = stats?.ratingData || [];
                if (data.length === 0) {
                  return (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400">
                      <div className="bg-gray-50 p-4 rounded-full mb-3">
                        <Star size={32} className="opacity-50" />
                      </div>
                      <p className="font-medium text-sm">Belum ada ulasan masuk</p>
                    </div>
                  );
                }
                
                const totalPages = Math.ceil(data.length / itemsPerPage);
                const currentData = data.slice((ratingPage - 1) * itemsPerPage, ratingPage * itemsPerPage);

                return (
                  <>
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Rating Produk</h3>
                        <p className="text-sm text-gray-400">Rata-rata ulasan (Halaman {ratingPage})</p>
                      </div>

                      {/* Tombol Halaman untuk Grafik Rating */}
                      {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                          {renderPagination(ratingPage, totalPages, setRatingPage)}
                        </div>
                      )}
                    </div>

                    <div className="h-72 w-full text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                          <XAxis type="number" domain={[0, 5]} hide />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={100} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748b'}} 
                          />
                          <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="rating" fill="#DB4444" radius={[0, 4, 4, 0]} barSize={20} background={{ fill: '#f8fafc' }} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* GRAFIK 3: Demografi Pengunjung */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              {(() => {
                const data = stats?.locationData || [];

                if (data.length === 0) {
                  return (
                    <div className="h-72 flex flex-col items-center justify-center text-gray-400">
                      <div className="bg-gray-50 p-4 rounded-full mb-3">
                        <CheckCircle size={32} className="opacity-50" />
                      </div>
                      <p className="font-medium text-sm">Belum ada data pengunjung</p>
                    </div>
                  );
                }

                return (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-800">Demografi Pengunjung</h3>
                      <p className="text-sm text-gray-400">Asal provinsi pemberi rating/ulasan</p>
                    </div>
                    
                    <div className="flex items-center justify-center h-72">
                      <div className="h-full w-full md:w-3/4 text-xs"> 
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={data}
                              cx="50%"
                              cy="50%"
                              innerRadius={80}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Legend verticalAlign="bottom" height={36}/>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </>
      ) : (
        /* JIKA STATUS TIDAK AKTIF */
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
            <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm">
                <Store size={24} />
            </div>
            <div>
                <h3 className="font-bold text-blue-900 text-lg">Akses Terbatas</h3>
                <p className="text-blue-700 mt-1 mb-4 text-sm leading-relaxed">
                    Menu pengelolaan produk dan analisis data penjualan hanya dapat diakses setelah toko Anda berstatus <strong>AKTIF</strong>. 
                    Saat ini admin sedang meninjau dokumen Anda.
                </p>
                <div className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
                    Estimasi Review: 1x24 Jam Kerja
                </div>
            </div>
        </div>
      )}

    </div>
  );
}

export default PenjualDashboard;