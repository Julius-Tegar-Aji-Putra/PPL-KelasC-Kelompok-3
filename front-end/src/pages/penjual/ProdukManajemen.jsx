//
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/common/Loader'; 
import { Plus, Package, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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

    // 2. BLOCKING LOADER: Tampilkan Loader full screen jika sedang memuat data
    if (loading) {
        return <Loader />;
    }

    // --- Modal Detail Produk (Updated) ---
    const ProductDetailModal = ({ product, onClose }) => {
        const [selectedImage, setSelectedImage] = React.useState(product?.main_image);
        const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
        
        if (!product) return null;
        
        const STORAGE_URL = 'http://localhost:8000/storage';

        // Gabungkan main image dan additional images
        const allImages = [
            { path: product.main_image, isMain: true },
            ...(product.images || []).map(img => ({ path: img.image_path, isMain: false }))
        ];

        // Navigation functions
        const handlePrevImage = () => {
            const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1;
            setCurrentImageIndex(newIndex);
            setSelectedImage(allImages[newIndex].path);
        };

        const handleNextImage = () => {
            const newIndex = currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0;
            setCurrentImageIndex(newIndex);
            setSelectedImage(allImages[newIndex].path);
        };

        const handleThumbnailClick = (img, idx) => {
            setSelectedImage(img.path);
            setCurrentImageIndex(idx);
        };

        const DetailRow = ({ label, value, isLong = false }) => (
            <div className="border-b border-gray-100 py-3 last:border-0">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1.5">{label}</p>
                <p className={`text-text-2 font-medium ${isLong ? 'text-sm leading-relaxed' : 'text-base'}`}>
                    {value || '-'}
                </p>
            </div>
        );

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
                    
                    {/* Header Modal */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
                        <div>
                            <h2 className="text-xl font-bold font-poppins text-text-2">Detail Produk</h2>
                            <p className="text-xs text-gray-500 font-poppins mt-0.5">ID: #{product.id}</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 hover:bg-red-100 text-gray-400 hover:text-secondary-2 transition-all"
                        >
                            <span className="text-xl font-bold leading-none">&times;</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        
                        {/* Gambar Produk */}
                        <div className="mb-6">
                            {/* Main Image Display with Navigation */}
                            <div className="mb-3 relative group">
                                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden aspect-video flex items-center justify-center">
                                    <img 
                                        src={selectedImage ? `${STORAGE_URL}/${selectedImage}` : 'https://via.placeholder.com/600x400?text=No+Image'} 
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Error'; }}
                                    />
                                </div>

                                {/* Navigation Arrows - Only show if more than 1 image */}
                                {allImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </>
                                )}

                                {/* Dot Indicators */}
                                {allImages.length > 1 && (
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                        {allImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleThumbnailClick(allImages[idx], idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    idx === currentImageIndex 
                                                        ? 'bg-secondary-2 w-6' 
                                                        : 'bg-white/70 hover:bg-white'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Row */}
                            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleThumbnailClick(img, idx)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all hover:border-secondary-2 ${
                                            currentImageIndex === idx 
                                                ? 'border-secondary-2 ring-2 ring-secondary-2 ring-opacity-30' 
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <img 
                                            src={img.path ? `${STORAGE_URL}/${img.path}` : 'https://via.placeholder.com/150'}
                                            className="w-full h-full object-cover"
                                            alt={`Thumbnail ${idx + 1}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Nama Produk */}
                        <div className="mb-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Nama Produk</h3>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <p className="text-lg font-bold text-text-2">{product.name}</p>
                            </div>
                        </div>

                        {/* Info Produk */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Kolom Kiri */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Detail & Harga</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                                        <DetailRow label="Harga" value={formatRupiah(product.price)} />
                                        <DetailRow label="Stok" value={`${product.stock} Unit`} />
                                        <DetailRow label="Kondisi" value={product.condition} />
                                    </div>
                                </div>
                            </div>

                            {/* Kolom Kanan */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Informasi Produk</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                                        <DetailRow label="Merk / Brand" value={product.brand} />
                                        <DetailRow label="Kategori" value={product.category?.name} />
                                        <DetailRow label="Jenis Garansi" value={product.warranty_type} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="mt-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Deskripsi Produk</h3>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                    {product.description || '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Modal */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3">
                        <button 
                            onClick={onClose}
                            className="bg-white hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold font-poppins transition-colors border border-gray-300"
                        >
                            Tutup
                        </button>
                        <Link 
                            to={`/products/${product.id}`}
                            className="bg-secondary-2 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold font-poppins shadow-md transition-colors"
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
                                    {currentProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <Package className="w-12 h-12 mb-3 opacity-50" />
                                                    <p className="text-lg font-medium text-gray-600">Belum ada produk</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentProducts.map((product) => (
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
                        {filteredProducts.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <span className="text-sm text-gray-500 font-poppins">
                                    Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredProducts.length)} dari {filteredProducts.length} produk
                                </span>
                                
                                <div className="flex items-center gap-2">
                                    {renderPagination()}
                                </div>
                            </div>
                        )}
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