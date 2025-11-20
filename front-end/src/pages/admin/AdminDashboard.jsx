import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- Helper Components ---
const StatusBadge = ({ status }) => {
    const colors = {
        inactive: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        active: 'bg-green-100 text-green-800 border border-green-200',
        rejected: 'bg-red-100 text-red-800 border border-red-200',
    };
    return (
        <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${colors[status] || 'bg-gray-100'}`}>
            {status}
        </span>
    );
};

// --- Main Component Definition ---
const AdminDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('verification'); 
    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Base URL Constants
    const API_URL = 'http://localhost:8000/api'; 
    const STORAGE_URL = 'http://localhost:8000/storage';

    // Auth Token
    const token = localStorage.getItem('auth_token');
    const authConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Fetch Data
    const fetchPendingSellers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/admin/sellers/pending`, authConfig);
            setSellers(response.data.data || []);
        } catch (error) {
            console.error("Gagal mengambil data", error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeMenu === 'verification') {
            fetchPendingSellers();
        }
    }, [activeMenu]);

    // Handle Action
    const handleVerification = async (id, status) => {
        if (!confirm(`Konfirmasi tindakan: ${status === 'approved' ? 'SETUJUI' : 'TOLAK'} penjual ini?`)) return;

        try {
            setLoading(true);
            const endpoint = status === 'approved' 
                ? `${API_URL}/admin/sellers/${id}/approve`
                : `${API_URL}/admin/sellers/${id}/reject`;

            await axios.post(endpoint, {}, authConfig);

            alert(`Berhasil memproses data. Status: ${status}`);
            setSelectedSeller(null); 
            fetchPendingSellers(); 
        } catch (error) {
            console.error(`Error processing`, error);
            alert(`Gagal memproses data.`);
        } finally {
            setLoading(false);
        }
    };

    // --- Sidebar Component ---
    const Sidebar = () => (
        <div className="w-64 bg-white border-r min-h-screen flex flex-col">
            <div className="p-6 border-b mb-4">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">ADMIN PANEL</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                <button
                    onClick={() => setActiveMenu('dashboard')}
                    className={`w-full text-left px-4 py-3 rounded font-medium transition-all duration-200 ${
                        activeMenu === 'dashboard' 
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    Dashboard Utama
                </button>
                <button
                    onClick={() => setActiveMenu('verification')}
                    className={`w-full text-left px-4 py-3 rounded font-medium transition-all duration-200 flex justify-between items-center ${
                        activeMenu === 'verification' 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    <span>Verifikasi Penjual</span>
                    {sellers.length > 0 && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            activeMenu === 'verification' ? 'bg-white text-blue-600' : 'bg-red-500 text-white'
                        }`}>
                            {sellers.length}
                        </span>
                    )}
                </button>
            </nav>
            <div className="p-4 border-t">
                <button 
                    onClick={() => {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('user');
                        delete axios.defaults.headers.common['Authorization'];
                        navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded transition-colors"
                >
                    Keluar
                </button>
            </div>
        </div>
    );

    // --- Modal Detail (Diperbaiki) ---
    const SellerDetailModal = ({ seller, onClose }) => {
        if (!seller) return null;

        // ✅ Helper untuk render gambar dengan fallback
        const renderImage = (path, alt) => {
            if (!path) {
                return (
                    <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500 text-sm italic rounded">
                        Tidak ada gambar
                    </div>
                );
            }
            const fullUrl = `${STORAGE_URL}/${path}`;
            return (
                <a href={fullUrl} target="_blank" rel="noreferrer">
                    <img 
                        src={fullUrl} 
                        alt={alt} 
                        className="w-full h-auto rounded border border-gray-300 hover:opacity-90 transition-opacity cursor-pointer object-cover"
                        style={{ maxHeight: '400px' }}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Tidak+Tersedia';
                        }}
                    />
                </a>
            );
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Detail Pendaftar Penjual</h2>
                            <p className="text-sm text-gray-500 mt-1">ID: #{seller.id} • Terdaftar: {new Date(seller.created_at).toLocaleDateString('id-ID')}</p>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-red-600 text-3xl font-bold leading-none transition-colors">&times;</button>
                    </div>

                    {/* Body (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* ✅ Kolom 1: Foto Profil & Info Utama */}
                            <div className="lg:col-span-1 space-y-4">
                                <div className="bg-white p-6 rounded-lg shadow border text-center">
                                    <div className="mb-4">
                                        <img 
                                            src={seller.foto ? `${STORAGE_URL}/${seller.foto}` : 'https://via.placeholder.com/150'} 
                                            className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-100 shadow-lg"
                                            alt="Foto Profil"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Photo'; }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{seller.nama}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{seller.email}</p>
                                    <div className="mt-3 flex justify-center">
                                        <StatusBadge status={seller.status || 'inactive'} />
                                    </div>
                                </div>

                                {/* Info Kontak */}
                                <div className="bg-white p-4 rounded-lg shadow border space-y-3">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block">No. Handphone</label>
                                        <p className="text-gray-900 font-medium">{seller.no_handphone || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block">NIK / No. KTP</label>
                                        <p className="text-lg font-mono font-bold text-gray-800">{seller.no_ktp || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ✅ Kolom 2: Data Toko & Alamat */}
                            <div className="lg:col-span-1 space-y-4">
                                <div className="bg-white p-5 rounded-lg shadow border">
                                    <h4 className="text-sm font-bold text-blue-600 uppercase mb-4 border-b pb-2">Informasi Toko</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block">Nama Toko</label>
                                            <p className="text-gray-900 font-semibold text-lg">{seller.nama_toko || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase block">Deskripsi Singkat</label>
                                            <p className="text-gray-700 text-sm leading-relaxed">{seller.deskripsi_singkat || 'Tidak ada deskripsi'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-lg shadow border">
                                    <h4 className="text-sm font-bold text-blue-600 uppercase mb-4 border-b pb-2">Alamat Lengkap</h4>
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <p><span className="font-semibold">Jalan:</span> {seller.alamat || '-'}</p>
                                        <p><span className="font-semibold">RT/RW:</span> {seller.rt || '-'} / {seller.rw || '-'}</p>
                                        <p><span className="font-semibold">Kelurahan:</span> {seller.village_name || '-'}</p>
                                        <p><span className="font-semibold">Kecamatan:</span> {seller.district_name || '-'}</p>
                                        <p><span className="font-semibold">Kab/Kota:</span> {seller.regency_name || '-'}</p>
                                        <p><span className="font-semibold">Provinsi:</span> {seller.province_name || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ✅ Kolom 3: Foto KTP (Full Width) */}
                            <div className="lg:col-span-1 space-y-4">
                                <div className="bg-white p-5 rounded-lg shadow border">
                                    <h4 className="text-sm font-bold text-red-600 uppercase mb-3 border-b pb-2">📄 Dokumen KTP</h4>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50">
                                        {renderImage(seller.file_upload_ktp, "Foto KTP")}
                                        <p className="text-xs text-gray-500 mt-2 text-center italic">Klik gambar untuk memperbesar</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer: Tombol Aksi */}
                    <div className="p-6 border-t bg-white flex justify-end space-x-4">
                        <button 
                            onClick={() => handleVerification(seller.id, 'rejected')}
                            disabled={loading}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '⏳ Memproses...' : '❌ TOLAK'}
                        </button>
                        <button 
                            onClick={() => handleVerification(seller.id, 'approved')}
                            disabled={loading}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '⏳ Memproses...' : '✅ SETUJUI'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {activeMenu === 'verification' && (
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-gray-800">Verifikasi Penjual</h2>
                                <p className="text-gray-600 mt-1">Review dan approve pendaftar baru</p>
                            </div>

                            <div className="bg-white rounded-lg shadow border border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Penjual</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Toko</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Kontak</th>
                                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {loading && sellers.length === 0 ? (
                                                <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500">⏳ Memuat data...</td></tr>
                                            ) : sellers.length > 0 ? (
                                                sellers.map((seller) => (
                                                    <tr key={seller.id} className="hover:bg-blue-50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <img 
                                                                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-200" 
                                                                    src={seller.foto ? `${STORAGE_URL}/${seller.foto}` : 'https://via.placeholder.com/50'} 
                                                                    alt=""
                                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                                                                />
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-bold text-gray-900">{seller.nama}</div>
                                                                    <div className="text-xs text-gray-500">{seller.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900">{seller.nama_toko || '-'}</div>
                                                            <div className="text-xs text-gray-500">{seller.regency_name || '-'}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                            {seller.no_handphone || '-'}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button 
                                                                onClick={() => setSelectedSeller(seller)}
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow hover:shadow-lg transition-all transform hover:scale-105"
                                                            >
                                                                📋 Review
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-12 text-center">
                                                        <div className="text-gray-400 text-lg">✅ Tidak ada antrian verifikasi</div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeMenu === 'dashboard' && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p className="text-2xl font-bold">👋 Selamat Datang Admin</p>
                            <p className="text-sm mt-2">Pilih menu di sidebar untuk mulai bekerja</p>
                        </div>
                    )}
                </main>
            </div>

            {selectedSeller && (
                <SellerDetailModal 
                    seller={selectedSeller} 
                    onClose={() => setSelectedSeller(null)} 
                />
            )}
        </div>
    );
};

export default AdminDashboard;