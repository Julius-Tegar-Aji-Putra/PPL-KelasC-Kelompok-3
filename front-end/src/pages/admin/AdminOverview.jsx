//
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/common/Loader';
import { 
  Users, 
  ShoppingBag, 
  MessageCircle, 
  Store, 
  CheckCircle, 
  XCircle 
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

const AdminOverview = () => {
  const { user } = useOutletContext();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Warna Grafik Konsisten
  const COLORS = ['#DB4444', '#F6AD55', '#48BB78', '#4299E1', '#9F7AEA'];
  const STATUS_COLORS = { 'active': '#48BB78', 'inactive': '#A0AEC0' };

  useEffect(() => {
    const fetchAdminStats = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) return;

            const response = await axios.get('/api/admin/dashboard/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data statistik admin:", error);
        } finally {
            // Sedikit delay agar transisi loader mulus
            setTimeout(() => setLoading(false), 500);
        }
    };

    fetchAdminStats();
  }, []);

  if (loading) return <Loader />;

  // --- DATA PROCESSING ---
  
  // 1. Filter Kategori yang nilainya > 0 saja agar grafik rapi
  const cleanCategoryData = stats?.products_by_category?.filter(item => item.value > 0) || [];

  // 2. Hitung Total Penjual dari array status
  const totalSellers = stats?.seller_status?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  // 3. Format Data Status untuk Pie Chart (Capitalize Label)
  const statusData = stats?.seller_status?.map(item => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: item.value,
    color: STATUS_COLORS[item.status] || '#CBD5E0'
  })) || [];

  return (
    <div className="max-w-7xl mx-auto font-poppins pb-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Halo, {user?.nama || 'Admin'}!</h1>
        <p className="text-gray-500 mt-1">Berikut adalah ringkasan aktivitas platform MartPlace.</p>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Total Penjual */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Store size={24} />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Terdaftar</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{totalSellers}</h3>
            <p className="text-gray-500 text-sm">Total Toko Penjual</p>
          </div>
        </div>

        {/* Card 2: Total Review */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
              <MessageCircle size={24} />
            </div>
            <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Feedback</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{stats?.review_activity?.total_reviews || 0}</h3>
            <p className="text-gray-500 text-sm">Total Ulasan Masuk</p>
          </div>
        </div>

        {/* Card 3: User Reviewer Unik */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Users size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Aktif</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{stats?.review_activity?.unique_reviewers || 0}</h3>
            <p className="text-gray-500 text-sm">Pembeli Memberi Ulasan</p>
          </div>
        </div>

      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* GRAFIK 1: Produk per Kategori */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Sebaran Produk per Kategori</h3>
            <p className="text-sm text-gray-400">Jumlah produk yang terdaftar berdasarkan kategori</p>
          </div>
          <div className="h-72 w-full text-xs">
            {cleanCategoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cleanCategoryData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} allowDecimals={false} />
                    <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#DB4444" radius={[4, 4, 0, 0]} barSize={50} name="Jumlah Produk" />
                </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-400">Belum ada data produk</div>
            )}
          </div>
        </div>

        {/* GRAFIK 2: Sebaran Toko per Provinsi */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Lokasi Toko</h3>
            <p className="text-sm text-gray-400">Asal provinsi toko penjual</p>
          </div>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.stores_by_province}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats?.stores_by_province?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRAFIK 3: Status Penjual */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Status Akun Penjual</h3>
            <p className="text-sm text-gray-400">Perbandingan akun aktif dan non-aktif</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-64">
            {/* Donut Chart */}
            <div className="w-full md:w-1/2 h-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    >
                    {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="w-full md:w-1/2 space-y-4">
                {statusData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{item.value}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOverview;