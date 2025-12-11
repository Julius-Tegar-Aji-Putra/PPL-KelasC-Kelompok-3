import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import ConfirmModal from '../../components/common/ConfirmModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomToast from '../../components/common/CustomToast';

// Helper: Status Badge
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

// Modal Detail
const SellerDetailModal = ({ seller, onClose, onVerify, loadingAction }) => {
    if (!seller) return null;
    const STORAGE_URL = 'http://localhost:8000/storage';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden">
                {/* Header Modal */}
                <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-white">
                    <div>
                        <h2 className="text-2xl font-bold font-poppins text-text-2">Detail Pendaftar</h2>
                        <p className="text-xs text-gray-500 font-poppins mt-1">ID Pengajuan: #{seller.id}</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-secondary-2 transition-all">
                        <span className="text-2xl font-bold leading-none">&times;</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {/* Foto Profil & Status */}
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
                        {/* 1. Informasi Pribadi */}
                        <div>
                            <SectionTitle title="Informasi Pribadi" />
                            <div className="bg-gray-50 rounded-lg px-6 py-2 border border-gray-100">
                                <DetailRow label="Nomor Handphone / WA" value={seller.no_handphone} />
                                <DetailRow label="NIK" value={seller.no_ktp} />
                            </div>
                        </div>

                        {/* --- BAGIAN BARU: ALAMAT LENGKAP (Tambahkan Disini) --- */}
                        <div>
                            <SectionTitle title="Alamat Lengkap" />
                            <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                <div className="md:col-span-2 border-b border-gray-200 pb-2 mb-2 last:border-0">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Alamat Jalan</p>
                                    <p className="text-text-2 font-medium">{seller.alamat}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2 mb-2 md:border-b-0 md:pb-0 md:mb-0">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">RT / RW</p>
                                    <p className="text-text-2 font-medium">{seller.rt} / {seller.rw}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2 mb-2 md:border-b-0 md:pb-0 md:mb-0">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Desa / Kelurahan</p>
                                    <p className="text-text-2 font-medium">{seller.village_name}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2 mb-2 md:border-b-0 md:pb-0 md:mb-0">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Kecamatan</p>
                                    <p className="text-text-2 font-medium">{seller.district_name}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2 mb-2 md:border-b-0 md:pb-0 md:mb-0">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Kabupaten / Kota</p>
                                    <p className="text-text-2 font-medium">{seller.regency_name}</p>
                                </div>
                                <div className="md:col-span-2 pt-2 md:border-t border-gray-200 mt-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Provinsi</p>
                                    <p className="text-text-2 font-medium">{seller.province_name}</p>
                                </div>
                            </div>
                        </div>
                        {/* -------------------------------------------------------- */}

                        {/* 2. Informasi Toko */}
                        <div>
                            <SectionTitle title="Informasi Toko" />
                            <div className="bg-gray-50 rounded-lg px-6 py-2 border border-gray-100">
                                <DetailRow label="Nama Toko" value={seller.nama_toko} />
                                <DetailRow label="Deskripsi Toko" value={seller.deskripsi_singkat}/>
                            </div>
                        </div>

                        {/* 3. Dokumen KTP */}
                        <div>
                            <SectionTitle title="Dokumen KTP" />
                            <div className="mt-4 border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 flex justify-center">
                                {seller.file_upload_ktp ? (
                                    <a href={`${STORAGE_URL}/${seller.file_upload_ktp}`} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <img 
                                            src={`${STORAGE_URL}/${seller.file_upload_ktp}`}
                                            alt="Foto KTP"
                                            className="max-w-full h-auto object-contain max-h-64"
                                        />
                                    </a>
                                ) : (
                                    <span className="text-sm italic text-gray-400">File KTP tidak tersedia</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Modal Buttons */}
                <div className="p-8 border-t border-gray-200 bg-white flex gap-4">
                    <button 
                        onClick={() => onVerify(seller.id, 'rejected')}
                        disabled={loadingAction}
                        className="flex-1 py-3.5 px-4 rounded-lg border-2 border-secondary-2 text-secondary-2 font-bold font-poppins hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                        {loadingAction ? '...' : 'Tolak'}
                    </button>
                    <button 
                        onClick={() => onVerify(seller.id, 'approved')}
                        disabled={loadingAction}
                        className="flex-1 py-3.5 px-4 rounded-lg bg-secondary-2 text-white font-bold font-poppins hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-50"
                    >
                        {loadingAction ? 'Processing...' : 'Setuju'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const SellerVerification = () => {
    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: '', 
        sellerId: null,
        sellerName: '',
        title: '',
        message: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;    

    const currentSellers = sellers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sellers.length / itemsPerPage);

    const [toast, setToast] = useState(null);

    const renderPagination = () => {
        const buttons = [];
        
        buttons.push(
            <button
                key="prev"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
        );

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                            i === currentPage
                                ? 'bg-secondary-2 text-white shadow-md border border-secondary-2'
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
                buttons.push(<span key={`dots-${i}`} className="px-2 text-gray-400">...</span>);
            }
        }
        buttons.push(
            <button
                key="next"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
        );

        return buttons;
    };

    const navigate = useNavigate();
    const API_URL = 'http://localhost:8000/api'; 
    const STORAGE_URL = 'http://localhost:8000/storage';
    const token = localStorage.getItem('auth_token');
    const authConfig = { headers: { Authorization: `Bearer ${token}` } };

    const fetchPendingSellers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/admin/sellers/pending`, authConfig);
            setSellers(response.data.data || []);
        } catch (error) {
            console.error("Gagal mengambil data", error);
            if (error.response && error.response.status === 401) navigate('/login');
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        fetchPendingSellers();
    }, []);

    const openConfirmationModal = (id, status) => {
        const currentSeller = sellers.find(s => s.id === id);
        const sellerName = currentSeller ? currentSeller.nama : '';

        const isApprove = status === 'approved';
        
        setModalConfig({
            type: status, 
            sellerId: id,
            sellerName: sellerName, 
            title: isApprove ? 'Konfirmasi Persetujuan' : 'Konfirmasi Penolakan',
            message: isApprove 
                ? 'Apakah Anda yakin ingin MENYETUJUI penjual ini? Penjual akan dapat mulai berjualan.'
                : 'Apakah Anda yakin ingin MENOLAK pengajuan penjual ini? Penjual tidak akan dapat mengakses fitur toko.'
        });
        setIsModalOpen(true);
    };

    const handleConfirmAction = async () => {
        const { sellerId, type, sellerName } = modalConfig; 
        setIsModalOpen(false);

        try {
            setActionLoading(true);
            const endpoint = type === 'approved' 
                ? `${API_URL}/admin/sellers/${sellerId}/approve`
                : `${API_URL}/admin/sellers/${sellerId}/reject`;

            await axios.post(endpoint, {}, authConfig);
            
            const message = type === 'approved' 
                ? `Penjual ${sellerName || ''} berhasil disetujui.` 
                : `Penjual ${sellerName || ''} berhasil ditolak.`;
            
            setToast({ message, type: 'success' });
            
            setSelectedSeller(null); 
            fetchPendingSellers();   
        } catch (error) {
            console.error(`Error processing`, error);
            
            setToast({ 
                message: "Gagal memproses data. Silakan coba lagi.", 
                type: 'error' 
            });
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="absolute inset-0 -m-8 flex items-center justify-center bg-white">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {toast && (
                <CustomToast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
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
                            {currentSellers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="text-gray-400 text-lg font-poppins">Tidak ada antrian verifikasi</div>
                                    </td>
                                </tr>
                            ) : (
                                currentSellers.map((seller) => (
                                    <tr key={seller.id} className="transition-colors">
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
                {sellers.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-sm text-gray-500 font-poppins">
                            Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sellers.length)} dari {sellers.length} pendaftar
                        </span>
                        
                        <div className="flex items-center gap-2">
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>

            {selectedSeller && (
                <SellerDetailModal 
                    seller={selectedSeller} 
                    onClose={() => setSelectedSeller(null)} 
                    onVerify={openConfirmationModal} 
                    loadingAction={actionLoading}
                />
            )}

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAction}
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText="Ya, Lanjutkan"
                cancelText="Batal"
                isDanger={modalConfig.type === 'rejected'}
            />
        </div>
    );
};

export default SellerVerification;