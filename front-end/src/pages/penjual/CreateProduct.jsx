//
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Upload, X, ImagePlus, Save } from 'lucide-react';

// 1. IMPORT KOMPONEN CUSTOM
import CustomToast from '../../components/penjual/CustomToast';
import ConfirmModal from '../../components/common/ConfirmModal';

function CreateProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    
    // 2. STATE UNTUK UI CUSTOM
    const [toast, setToast] = useState(null); // { type: 'success'|'error', message: '' }
    const [showConfirm, setShowConfirm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        category_id: '',
        name: '',
        price: '',
        stock: '',
        brand: '',
        warranty_type: '',
        condition: '',
        description: ''
    });

    // Image State
    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [additionalPreviews, setAdditionalPreviews] = useState([]);

    // Error State (Validasi Form)
    const [errors, setErrors] = useState({});

    // Auth Token
    const token = localStorage.getItem('auth_token');
    const authConfig = {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    };

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                const categoryData = response.data?.data || response.data || [];
                setCategories(Array.isArray(categoryData) ? categoryData : []);
            } catch (error) {
                console.error('Gagal mengambil kategori', error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Handle Main Image
    const handleMainImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2048000) { 
                // GANTI ALERT DENGAN TOAST
                setToast({ type: 'error', message: 'Ukuran file maksimal 2MB' });
                return;
            }
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
            setErrors(prev => ({ ...prev, main_image: null }));
        }
    };

    // Handle Additional Images
    const handleAdditionalImages = (e) => {
        const files = Array.from(e.target.files);
        
        if (additionalImages.length + files.length > 4) {
            // GANTI ALERT DENGAN TOAST
            setToast({ type: 'error', message: 'Maksimal 4 gambar tambahan' });
            return;
        }

        const validFiles = files.filter(file => file.size <= 2048000);
        if (validFiles.length !== files.length) {
            setToast({ type: 'error', message: 'Beberapa file melebihi 2MB dan diabaikan' });
        }

        setAdditionalImages(prev => [...prev, ...validFiles]);
        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        setAdditionalPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeAdditionalImage = (index) => {
        setAdditionalImages(prev => prev.filter((_, i) => i !== index));
        setAdditionalPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // 3. UBAH LOGIKA SUBMIT: TRIGGER MODAL DULU
    const handlePreSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        // Validasi Manual
        let hasError = false;
        if (!mainImage) {
            setErrors(prev => ({ ...prev, main_image: ['Gambar utama wajib diupload'] }));
            hasError = true;
        }
        if (!formData.name) {
            setErrors(prev => ({ ...prev, name: ['Nama produk wajib diisi'] }));
            hasError = true;
        }
        // ... (Tambahkan validasi lain jika perlu)

        if (hasError) {
            setToast({ type: 'error', message: 'Mohon lengkapi data yang wajib diisi.' });
            return;
        }

        // Jika lolos validasi, munculkan Modal Konfirmasi
        setShowConfirm(true);
    };

    // 4. EKSEKUSI API SETELAH KONFIRMASI (DI DALAM MODAL)
    const handleConfirmSubmit = async () => {
        setLoading(true);
        
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
            formDataToSend.append('main_image', mainImage);
            additionalImages.forEach(image => {
                formDataToSend.append('additional_images[]', image);
            });

            const response = await axios.post('/api/seller/products', formDataToSend, {
                headers: {
                    ...authConfig.headers,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.success) {
                setShowConfirm(false); // Tutup modal
                setToast({ type: 'success', message: 'Produk berhasil ditambahkan!' });
                
                // Delay redirect agar notifikasi terbaca
                setTimeout(() => {
                    navigate('/penjual/products');
                }, 1500);
            }
        } catch (error) {
            console.error('Error upload produk:', error);
            setShowConfirm(false); // Tutup modal biar user bisa edit lagi
            
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
                setToast({ type: 'error', message: 'Periksa kembali inputan Anda.' });
            } else if (error.response && error.response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setToast({ type: 'error', message: 'Gagal menambahkan produk. Silakan coba lagi.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-poppins h-full flex flex-col overflow-y-auto relative">
            
            {/* 5. RENDER CUSTOM COMPONENTS DI SINI */}
            {toast && (
                <CustomToast 
                    type={toast.type} 
                    message={toast.message} 
                    onClose={() => setToast(null)} 
                />
            )}

            <ConfirmModal 
                isOpen={showConfirm} 
                onClose={() => setShowConfirm(false)} 
                onConfirm={handleConfirmSubmit}
                loading={loading}
                title="Simpan Produk?"
                message="Pastikan semua informasi produk sudah benar sebelum dipublikasikan ke etalase toko."
            />

            <div className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-4">
                        <Link 
                            to="/penjual/products"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Tambah Produk Baru</h1>
                            <p className="text-gray-500 mt-1">Lengkapi form di bawah untuk menambahkan produk</p>
                        </div>
                    </div>

                    {/* Form - Ubah onSubmit menjadi handlePreSubmit */}
                    <form onSubmit={handlePreSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        
                        {/* ... (BAGIAN INPUT FORM DI BAWAH INI SAMA PERSIS, TIDAK PERLU DIUBAH) ... */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-gray-200">
                                Informasi Produk
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nama Produk */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Produk <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: Laptop Gaming Lenovo Legion"
                                        // required dihapus agar validasi manual handlePreSubmit yang menangani
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                                </div>

                                {/* Kategori */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.category_id ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id[0]}</p>}
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Merk / Brand <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.brand ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: Lenovo"
                                        required
                                    />
                                    {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand[0]}</p>}
                                </div>

                                {/* Harga */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Harga (Rp) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.price ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="25000000"
                                        min="0"
                                        required
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price[0]}</p>}
                                </div>

                                {/* Stok */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Stok <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.stock ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="10"
                                        min="1"
                                        required
                                    />
                                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock[0]}</p>}
                                </div>

                                {/* Kondisi */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Kondisi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.condition ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    >
                                        <option value="">Pilih Kondisi</option>
                                        <option value="Baru">Baru</option>
                                        <option value="Bekas">Bekas</option>
                                    </select>
                                    {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition[0]}</p>}
                                </div>

                                {/* Jenis Garansi */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Jenis Garansi <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="warranty_type"
                                        value={formData.warranty_type}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.warranty_type ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        required
                                    >
                                        <option value="">Pilih Jenis Garansi</option>
                                        <option value="Garansi Resmi">Garansi Resmi</option>
                                        <option value="Garansi Toko">Garansi Toko</option>
                                        <option value="Garansi Distributor">Garansi Distributor</option>
                                        <option value="Tidak Ada Garansi">Tidak Ada Garansi</option>
                                    </select>
                                    {errors.warranty_type && <p className="text-red-500 text-xs mt-1">{errors.warranty_type[0]}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Deskripsi Produk <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="5"
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-2 ${
                                            errors.description ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Jelaskan detail produk, spesifikasi, dan keunggulan produk Anda..."
                                        required
                                    ></textarea>
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Upload Gambar */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-gray-200">
                                Foto Produk
                            </h2>

                            {/* Main Image */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Gambar Utama <span className="text-red-500">*</span>
                                    <span className="text-xs text-gray-500 font-normal ml-2">(Max 2MB, Format: JPG/PNG)</span>
                                </label>
                                
                                {mainImagePreview ? (
                                    <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
                                        <img src={mainImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMainImage(null);
                                                setMainImagePreview(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span> atau drag & drop</p>
                                            <p className="text-xs text-gray-400">PNG, JPG (MAX. 2MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={handleMainImage}
                                        />
                                    </label>
                                )}
                                {errors.main_image && <p className="text-red-500 text-xs mt-1">{errors.main_image[0]}</p>}
                            </div>

                            {/* Additional Images */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Gambar Tambahan (Opsional)
                                    <span className="text-xs text-gray-500 font-normal ml-2">(Max 4 gambar, masing-masing max 2MB)</span>
                                </label>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    {additionalPreviews.map((preview, index) => (
                                        <div key={index} className="relative aspect-square border-2 border-gray-300 rounded-lg overflow-hidden">
                                            <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeAdditionalImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {additionalPreviews.length < 4 && (
                                        <label className="aspect-square flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-xs text-gray-500 text-center px-2">Tambah Gambar</p>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/jpeg,image/png,image/jpg"
                                                multiple
                                                onChange={handleAdditionalImages}
                                            />
                                        </label>
                                    )}
                                </div>
                                {errors.additional_images && <p className="text-red-500 text-xs mt-1">{errors.additional_images[0]}</p>}
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <Link
                                to="/penjual/products"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-secondary-2 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>Simpan Produk</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;