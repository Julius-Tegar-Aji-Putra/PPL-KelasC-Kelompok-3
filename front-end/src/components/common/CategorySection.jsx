import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Monitor, Shirt, Grid } from 'lucide-react';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Mapping Slug dari Database ke Ikon Visual
    // Slug harus persis dengan yang ada di tabel 'product_categories'
    const iconMapping = {
        'elektronik': <Monitor size={40} strokeWidth={1.5} />,
        'fashion': <Shirt size={40} strokeWidth={1.5} />,
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Panggil API Backend
                const response = await axios.get('api/categories');
                setCategories(response.data.data); 
            } catch (error) {
                console.error("Gagal mengambil kategori:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return null; // Atau bisa return skeleton loader

    return (
        <div className="w-full py-10 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-0">
                
                {/* Header: Judul Bagian */}
                <div className="flex flex-col gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-10 bg-red-500 rounded-md"></div>
                        <span className="text-red-500 font-bold text-lg">Categories</span>
                    </div>
                    <h2 className="text-4xl font-semibold text-slate-900">Browse By Category</h2>
                </div>

                {/* Grid Kategori */}
                {/* Menggunakan flex-wrap agar jika cuma 2 item, mereka rapat di kiri (tidak melar aneh) */}
                <div className="flex flex-wrap gap-8">
                    {categories.map((category) => (
                        <div 
                            key={category.id}
                            onClick={() => navigate(`/products?category=${category.slug}`)}
                            className="group border border-gray-300 rounded-md w-[170px] h-[145px] flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:bg-red-500 hover:border-red-500 hover:shadow-lg"
                        >
                            {/* Icon */}
                            <div className="text-slate-900 group-hover:text-white transition-colors duration-300">
                                {/* Jika mapping tidak ketemu, pakai icon Grid default */}
                                {iconMapping[category.slug] || <Grid size={40} strokeWidth={1.5} />} 
                            </div>
                            
                            {/* Nama Kategori */}
                            <span className="text-slate-900 font-medium text-base group-hover:text-white transition-colors duration-300 capitalize">
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CategorySection;
