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

  if (loading) {
    return (
      <div className="absolute inset-0 -m-8 flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  const cleanCategoryData = stats?.products_by_category?.filter(item => item.value > 0) || [];

  const totalSellers = stats?.seller_status?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  const statusData = stats?.seller_status?.map(item => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    value: item.value,
    color: STATUS_COLORS[item.status] || '#CBD5E0'
  })) || [];

  const formatXAxisLabel = (name) => {
    if (typeof name !== 'string') return name;
    
    const words = name.split(' ');
    
    if (words.length > 1) {
      return `${words[0]} ${words[1][0]}.`; 
    }
    
    if (name.length > 10) {
      return `${name.substring(0, 10)}...`;
    }

    return name;
  };

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
            <div className="p-3 bg-red-50 rounded-lg text-secondary-2">
              <Store size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{totalSellers}</h3>
            <p className="text-gray-500 text-sm">Total Toko Penjual</p>
          </div>
        </div>

        {/* Card 2: Total Review */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg text-secondary-2">
              <MessageCircle size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">{stats?.review_activity?.total_reviews || 0}</h3>
            <p className="text-gray-500 text-sm">Total Ulasan Masuk</p>
          </div>
        </div>

        {/* Card 3: User Reviewer Unik */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg text-secondary-2">
              <Users size={24} />
            </div>
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
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={formatXAxisLabel} interval={0} />
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