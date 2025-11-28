//
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Package, Search, Eye } from 'lucide-react';
import Loader from '../../components/common/Loader'; // 1. Import Loader

// --- Helper Components ---
const StockBadge = ({ stock }) => {
    const isAvailable = stock > 0;
    return (
        <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${
            isAvailable 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-red-100 text-red-800 border-red-200'
        }`}>
            {isAvailable ? `${stock} Unit` : 'Habis'}
        </span>
    );
};

// --- Main Component Definition ---
export default function ProdukManajemen() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Auth Token
    const token = localStorage.getItem('auth_token');
    const authConfig = {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    };

    // Fetch Data
    const fetchMyProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/seller/products', authConfig);
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data", error);
            if (error.response) {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            }
        } finally {
            // Sedikit delay agar transisi tidak terlalu kaget/flicker
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    // Fetch Detail Product by ID
    const fetchProductDetail = async (productId) => {
        try {
            const response = await axios.get(`/api/seller/products/${productId}`, authConfig);
            if (response.data.success) {
                setSelectedProduct(response.data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil detail produk", error);
            if (error.response) {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    navigate('/login');
                }
            }
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, [navigate]);

    // Filter Logic
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // 2. BLOCKING LOADER: Tampilkan Loader full screen jika sedang memuat data
    if (loading) {
        return <Loader />;
    }

    // --- Modal Detail Produk ---
    const ProductDetailModal = ({ product, onClose }) => {
        if (!product) return null;

        const DetailRow = ({ label, value, isLong = false }) => (
            <div className="border-b border-gray-100 py-3 last:border-0">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1.5">{label}</p>
                <p className={`text-text-2 font-medium ${isLong ? 'text-sm leading-relaxed' : 'text-base'}`}>
                    {value || '-'}
                </p>
            </div>
        );

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
                    
                    {/* Header Modal */}
                    <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-white">
                        <div>
                            <h2 className="text-2xl font-bold font-poppins text-text-2">Detail Produk</h2>
                            <p className="text-xs text-gray-500 font-poppins mt-1">ID Produk: #{product.id}</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-secondary-2 transition-all"
                        >
                            <span className="text-2xl font-bold leading-none">&times;</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Kolom Kiri */}
                            <div className="flex flex-col gap-2">
                                <DetailRow label="Nama Produk" value={product.name} />
                                <DetailRow label="Merk / Brand" value={product.brand} />
                                <DetailRow label="Kategori" value={product.category?.name} />
                                <DetailRow label="Harga" value={formatRupiah(product.price)} />
                            </div>

                            {/* Kolom Kanan */}
                            <div className="flex flex-col gap-2">
                                <div className="border-b border-gray-100 py-3">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1.5">Stok</p>
                                    <StockBadge stock={product.stock} />
                                </div>
                                <div className="border-b border-gray-100 py-3">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1.5">Kondisi</p>
                                    <span className="capitalize px-3 py-1 rounded-md text-xs font-bold border border-gray-200 bg-gray-50 text-gray-600">
                                        {product.condition}
                                    </span>
                                </div>
                                <DetailRow label="Jenis Garansi" value={product.warranty_type} />
                            </div>
                        </div>

                        {/* Deskripsi Full Width */}
                        <div className="mt-4">
                            <DetailRow label="Deskripsi Produk" value={product.description} isLong={true} />
                        </div>
                    </div>

                    {/* Footer Modal */}
                    <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3">
                        <button 
                            onClick={onClose}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-bold font-poppins transition-colors"
                        >
                            Tutup
                        </button>
                        <Link 
                            to={`/products/${product.id}`}
                            className="bg-secondary-2 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold font-poppins shadow-md transition-colors"
                        >
                            Lihat Halaman Publik
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="font-poppins h-full flex flex-col">
            
            <div className="flex-1 p-8 overflow-hidden flex flex-col">
                <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
                    
                    {/* HEADER SECTION */}
                    <div className="mb-8 flex-shrink-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-5 h-10 bg-red-500 rounded-md"></div>
                                <h2 className="text-4xl font-semibold font-poppins text-slate-900">Produk Manajemen</h2>
                            </div>

                            <div className="flex gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-2 w-full sm:w-64 shadow-sm bg-white"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                </div>

                                <Link 
                                    to="/penjual/products/create"
                                    className="bg-secondary-2 hover:bg-red-700 text-white px-5 py-3 rounded-lg text-sm font-bold font-poppins shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
                        <div className="overflow-x-auto flex-1">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-secondary sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Produk</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Harga</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Stok</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Kondisi</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold font-poppins text-gray-700 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Logic Loading di dalam tabel dihapus, 
                                        karena sudah di-handle oleh Blocking Loader di atas.
                                        Langsung cek jika kosong atau ada isinya.
                                    */}
                                    {filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <Package className="w-12 h-12 mb-3 opacity-50" />
                                                    <p className="text-lg font-medium text-gray-600">Belum ada produk</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold font-poppins text-text-2 line-clamp-1">
                                                            {product.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500 font-poppins">
                                                            {product.brand}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                                        {product.category?.name || 'N/A'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium font-poppins text-text-2">
                                                        {formatRupiah(product.price)}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <StockBadge stock={product.stock} />
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-poppins text-gray-600 capitalize">
                                                    {product.condition}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <button 
                                                        onClick={() => fetchProductDetail(product.id)}
                                                        className="inline-flex items-center gap-2 bg-white hover:bg-red-50 text-secondary-2 px-4 py-2 rounded-lg text-sm font-bold border-2 border-secondary-2 transition-all shadow-sm hover:shadow-md"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span>Detail</span>
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
            </div>

            {/* Modal Detail */}
            {selectedProduct && (
                <ProductDetailModal 
                    product={selectedProduct} 
                    onClose={() => setSelectedProduct(null)} 
                />
            )}

        </div>
    );
}