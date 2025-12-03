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
  TrendingUp 
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
        
        // setStats({
        //   totalProduk: 12,
        //   totalStok: 450,
        //   rataRataRating: 4.8,
          
        //   stockData: [
        //     { name: 'HP Gaming', stok: 45 },
        //     { name: 'Laptop Asus', stok: 20 },
        //     { name: 'Mouse Logitech', stok: 85 },
        //     { name: 'Keyboard Mech', stok: 30 },
        //     { name: 'Headset RGB', stok: 55 },
        //     { name: 'Monitor 24"', stok: 15 },
        //   ],

        //   ratingData: [
        //     { name: 'HP Gaming', rating: 4.9 },
        //     { name: 'Laptop Asus', rating: 4.7 },
        //     { name: 'Mouse', rating: 4.5 },
        //     { name: 'Keyboard', rating: 5.0 },
        //     { name: 'Headset', rating: 4.2 },
        //     { name: 'Monitor', rating: 4.8 },
        //   ],

        //   locationData: [
        //     { name: 'Jawa Tengah', value: 45 },
        //     { name: 'DKI Jakarta', value: 30 },
        //     { name: 'Jawa Barat', value: 15 },
        //     { name: 'Jawa Timur', value: 10 },
        //   ]
        // });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS = ['#DB4444', '#F6AD55', '#48BB78', '#4299E1', '#9F7AEA'];

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
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">Stok per Produk</h3>
                <p className="text-sm text-gray-400">Distribusi jumlah stok barang Anda</p>
              </div>
              <div className="h-72 w-full text-xs"> {/* Tinggi diperbesar sedikit agar label muat */}
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.stockData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    {/* PERBAIKAN XAXIS: 
                        - interval={0} memaksa semua label muncul 
                        - angle={-25} memiringkan teks agar muat jika panjang
                        - textAnchor="end" merapikan posisi teks miring
                    */}
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#64748b', fontSize: 11}} 
                        interval={0}
                        angle={-25}
                        textAnchor="end"
                        height={60}
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
            </div>

            {/* GRAFIK 2: Performa Rating */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">Performa Rating Produk</h3>
                <p className="text-sm text-gray-400">Nilai rata-rata ulasan per produk</p>
              </div>
              <div className="h-72 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={stats?.ratingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                    <XAxis type="number" domain={[0, 5]} hide />
                    <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    {/* PERBAIKAN WARNA: fill="#DB4444" (Merah) */}
                    <Bar dataKey="rating" fill="#DB4444" radius={[0, 4, 4, 0]} barSize={20} background={{ fill: '#f8fafc' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GRAFIK 3: Demografi Pembeli */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
              <div className="mb-6">
                 <h3 className="text-lg font-bold text-slate-800">Demografi Pembeli</h3>
                 <p className="text-sm text-gray-400">Asal provinsi pemberi rating/ulasan</p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="h-72 w-full md:w-3/4 text-xs"> 
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats?.locationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stats?.locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
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