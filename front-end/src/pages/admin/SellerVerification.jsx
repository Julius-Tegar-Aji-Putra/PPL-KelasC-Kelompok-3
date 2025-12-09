import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import ConfirmModal from '../../components/common/ConfirmModal';

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
                                <DetailRow label="NIK" value={seller.no_ktp} />
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
        const isApprove = status === 'approved';
        
        setModalConfig({
            type: status, 
            sellerId: id,
            title: isApprove ? 'Konfirmasi Persetujuan' : 'Konfirmasi Penolakan',
            message: isApprove 
                ? 'Apakah Anda yakin ingin MENYETUJUI penjual ini? Penjual akan dapat mulai berjualan.'
                : 'Apakah Anda yakin ingin MENOLAK pengajuan penjual ini? Penjual tidak akan dapat mengakses fitur toko.'
        });
        setIsModalOpen(true);
    };

    const handleConfirmAction = async () => {
        const { sellerId, type } = modalConfig;
        setIsModalOpen(false);

        try {
            setActionLoading(true);
            const endpoint = type === 'approved' 
                ? `${API_URL}/admin/sellers/${sellerId}/approve`
                : `${API_URL}/admin/sellers/${sellerId}/reject`;

            await axios.post(endpoint, {}, authConfig);
            
            setSelectedSeller(null); 
            fetchPendingSellers();   
        } catch (error) {
            console.error(`Error processing`, error);
            alert(`Gagal memproses data.`);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
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