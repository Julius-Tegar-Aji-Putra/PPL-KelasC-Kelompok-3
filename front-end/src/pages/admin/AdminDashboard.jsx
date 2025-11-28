//
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import ProfileDropdown from '../../components/common/ProfileDropdown';
import Loader from '../../components/common/Loader';
import WelcomeAlert from '../../components/common/WelcomeAlert'; 

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
    
    // State untuk Alert
    const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
    const [welcomeName, setWelcomeName] = useState('');

    const navigate = useNavigate();
    const location = useLocation(); 

    // Base URL Constants
    const API_URL = 'http://localhost:8000/api'; 
    const STORAGE_URL = 'http://localhost:8000/storage';

    const token = localStorage.getItem('auth_token');
    const authConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Effect untuk menangkap sinyal Login
    useEffect(() => {
        if (location.state?.showWelcome) {
            setWelcomeName(location.state.userName || 'Admin');
            setShowWelcomeAlert(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

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
            setTimeout(() => {
                setLoading(false);
            }, 500);
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
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
            <div className="h-24 flex items-center px-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold font-inter text-text-2">Admin Dashboard</h1>
            </div>
            <nav className="flex-1 px-4 py-4">
                <button
                    onClick={() => setActiveMenu('verification')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-poppins font-medium transition-all duration-200 flex justify-between items-center ${
                        activeMenu === 'verification' 
                            ? 'bg-secondary-2 text-white' 
                            : 'text-text-2 hover:bg-secondary'
                    }`}
                >
                    <span>Verifikasi Penjual</span>
                    {sellers.length > 0 && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            activeMenu === 'verification' ? 'bg-white text-secondary-2' : 'bg-secondary-2 text-white'
                        }`}>
                            {sellers.length}
                        </span>
                    )}
                </button>
            </nav>
        </div>
    );

    // --- Modal Detail ---
    const SellerDetailModal = ({ seller, onClose }) => {
        if (!seller) return null;

        const DetailRow = ({ label, value, isLong = false }) => (
            <div className="border-b border-gray-100 py-3 last:border-0">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1.5">{label}</p>
                <p className={`text-text-2 font-medium ${isLong ? 'text-sm leading-relaxed' : 'text-base'}`}>
                    {value || '-'}
                </p>
            </div>
        );

        const SectionTitle = ({ title }) => (
            <div className="flex items-center gap-2 mb-3 mt-8 pb-2 border-b border-gray-200">
                <div className="w-1 h-5 bg-secondary-2 rounded-full"></div>
                <h3 className="text-sm font-bold font-poppins text-secondary-2 uppercase tracking-wider">{title}</h3>
            </div>
        );

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
                    
                    <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-white">
                        <div>
                            <h2 className="text-2xl font-bold font-poppins text-text-2">Detail Pendaftar</h2>
                            <p className="text-xs text-gray-500 font-poppins mt-1">ID Pengajuan: #{seller.id}</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-secondary-2 transition-all"
                        >
                            <span className="text-2xl font-bold leading-none">&times;</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="relative mb-4">
                                <img 
                                    src={seller.foto ? `${STORAGE_URL}/${seller.foto}` : 'https://via.placeholder.com/150'} 
                                    className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md"
                                    alt="Foto Profil"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Photo'; }}
                                />
                            </div>
                            <h3 className="text-xl font-bold font-poppins text-text-2 mb-1">{seller.nama}</h3>
                            <p className="text-sm text-gray-500 font-poppins mb-3">{seller.email}</p>
                            <StatusBadge status={seller.status || 'inactive'} />
                        </div>

                        <div className="flex flex-col gap-2">
                            
                            <div>
                                <SectionTitle title="Informasi Pribadi" />
                                <div className="bg-gray-50 rounded-lg px-6 py-2 border border-gray-100">
                                    <DetailRow label="Nomor Handphone / WA" value={seller.no_handphone} />
                                    <DetailRow label="NIK (Nomor Induk Kependudukan)" value={seller.no_ktp} />
                                </div>
                            </div>

                            <div>
                                <SectionTitle title="Informasi Toko" />
                                <div className="bg-gray-50 rounded-lg px-6 py-2 border border-gray-100">
                                    <DetailRow label="Nama Toko" value={seller.nama_toko} />
                                    <DetailRow label="Deskripsi Toko" value={seller.deskripsi_singkat} isLong={true} />
                                </div>
                            </div>

                            <div>
                                <SectionTitle title="Alamat Lengkap" />
                                <div className="bg-gray-50 rounded-lg px-6 py-2 border border-gray-100">
                                    <DetailRow label="Alamat Jalan" value={seller.alamat} isLong={true} />
                                    <div className="grid grid-cols-2 gap-8 border-b border-gray-100 py-3">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1.5">RT / RW</p>
                                            <p className="text-text-2 font-medium">{seller.rt || '-'} / {seller.rw || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1.5">Kelurahan</p>
                                            <p className="text-text-2 font-medium">{seller.village_name || '-'}</p>
                                        </div>
                                    </div>
                                    <DetailRow label="Kecamatan" value={seller.district_name} />
                                    <DetailRow label="Kabupaten / Kota" value={seller.regency_name} />
                                    <DetailRow label="Provinsi" value={seller.province_name} />
                                </div>
                            </div>

                            <div>
                                <SectionTitle title="Dokumen KTP" />
                                <div className="mt-4 border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 flex justify-center">
                                    {seller.file_upload_ktp ? (
                                        <a href={`${STORAGE_URL}/${seller.file_upload_ktp}`} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                            <img 
                                                src={`${STORAGE_URL}/${seller.file_upload_ktp}`}
                                                alt="Foto KTP"
                                                className="max-w-full h-auto object-contain max-h-64"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x250?text=Gambar+Tidak+Tersedia';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <span className="text-white text-sm font-bold bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                                                    Lihat Gambar Asli
                                                </span>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="h-32 w-full flex flex-col items-center justify-center text-gray-400">
                                            <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            <span className="text-sm italic">File KTP tidak tersedia</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-gray-200 bg-white flex gap-4">
                        <button 
                            onClick={() => handleVerification(seller.id, 'rejected')}
                            disabled={loading}
                            className="flex-1 py-3.5 px-4 rounded-lg border-2 border-secondary-2 text-secondary-2 font-bold font-poppins hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '...' : 'Tolak'}
                        </button>
                        
                        <button 
                            onClick={() => handleVerification(seller.id, 'approved')}
                            disabled={loading}
                            className="flex-1 py-3.5 px-4 rounded-lg bg-secondary-2 text-white font-bold font-poppins hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Setuju'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-primary font-poppins overflow-hidden relative">
            
            {showWelcomeAlert && (
                <WelcomeAlert 
                    message={`Selamat datang kembali, Admin ${welcomeName}!`}
                    onClose={() => setShowWelcomeAlert(false)}
                />
            )}

            <Sidebar />
            
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="bg-primary border-b border-gray-200 h-24 flex items-center px-8 flex-shrink-0">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-semibold font-poppins text-text-2">Admin</p>
                            <p className="text-xs text-gray-500 font-poppins">Administrator</p>
                        </div>
                        <ProfileDropdown />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-primary p-8">
                    {loading ? (
                        <Loader />
                    ) : (
                        activeMenu === 'verification' && (
                            <div className="max-w-7xl mx-auto">
                                <div className="mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-5 h-10 bg-red-500 rounded-md"></div>
                                        <h2 className="text-4xl font-semibold font-poppins text-slate-900">Verifikasi Penjual</h2>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-secondary">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Penjual</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Toko</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Kontak</th>
                                                    <th className="px-6 py-4 text-center text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {sellers.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-12 text-center">
                                                            <div className="text-gray-400 text-lg font-poppins">Tidak ada antrian verifikasi</div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    sellers.map((seller) => (
                                                        <tr key={seller.id} className="transition-colors"> {/* HAPUS hover:bg-secondary */}
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center">
                                                                    <img 
                                                                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-200" 
                                                                        src={seller.foto ? `${STORAGE_URL}/${seller.foto}` : 'https://via.placeholder.com/50'} 
                                                                        alt=""
                                                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                                                                    />
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-semibold font-poppins text-text-2">{seller.nama}</div>
                                                                        <div className="text-xs font-poppins text-gray-500">{seller.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="text-sm font-medium font-poppins text-text-2">{seller.nama_toko || '-'}</div>
                                                                <div className="text-xs font-poppins text-gray-500">{seller.regency_name || '-'}</div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-poppins text-gray-600">
                                                                {seller.no_handphone || '-'}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <button 
                                                                    onClick={() => setSelectedSeller(seller)}
                                                                    className="bg-secondary-2 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium font-poppins shadow-md hover:shadow-lg transition-all"
                                                                >
                                                                    Review
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
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