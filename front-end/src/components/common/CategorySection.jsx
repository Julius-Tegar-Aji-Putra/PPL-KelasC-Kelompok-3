//
import React, { useState, useEffect } from 'react'; // Hapus useRef
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import Icon Kategori (Sama persis, tidak diubah)
import { 
  Headphones, DeviceMobile, TShirt, Dress, HairDryer, ForkKnife, 
  Motorcycle, Palette, Book, GameController, FirstAidKit, Barbell, 
  Armchair, SquaresFour 
  // Hapus CaretLeft, CaretRight karena tidak dipakai lagi
} from '@phosphor-icons/react';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // Mapping Icon (Sama persis, tidak diubah)
    const getCategoryIcon = (slugOrName) => {
        const key = slugOrName.toLowerCase();
        const iconProps = { size: 32, weight: "regular" }; 

        if (key.includes('wanita') || key.includes('perempuan') || key.includes('dress')) return <Dress {...iconProps} />;
        if (key.includes('pria') || key.includes('cowok') || key.includes('kaos')) return <TShirt {...iconProps} />;
        if (key.includes('gadget') || key.includes('hp') || key.includes('handphone')) return <DeviceMobile {...iconProps} />;
        if (key.includes('elektronik') || key.includes('laptop')) return <Headphones {...iconProps} />;
        if (key.includes('kecantikan') || key.includes('skincare')) return <HairDryer {...iconProps} />;
        if (key.includes('makanan') || key.includes('minuman')) return <ForkKnife {...iconProps} />;
        if (key.includes('otomotif') || key.includes('motor')) return <Motorcycle {...iconProps} />;
        if (key.includes('hobi') || key.includes('koleksi')) return <Palette {...iconProps} />;
        if (key.includes('buku') || key.includes('atk')) return <Book {...iconProps} />;
        if (key.includes('game') || key.includes('gaming')) return <GameController {...iconProps} />;
        if (key.includes('kesehatan') || key.includes('obat')) return <FirstAidKit {...iconProps} />;
        if (key.includes('olahraga') || key.includes('sport')) return <Barbell {...iconProps} />;
        if (key.includes('rumah') || key.includes('perabot')) return <Armchair {...iconProps} />;
        
        return <SquaresFour {...iconProps} />;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data.data || response.data || []); 
            } catch (error) {
                console.error("Gagal mengambil kategori:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return null;

    return (
        <div className="w-full py-10 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-0">
                
                {/* Header */}
                <div className="flex flex-col gap-4 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-10 bg-secondary-2 rounded-md"></div>
                        <span className="text-secondary-2 font-bold text-lg">Kategori</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <h2 className="text-4xl font-semibold text-slate-900">Telusuri Berdasarkan Kategori</h2>
                    </div>
                </div>

                {/* --- BAGIAN UTAMA YANG DIUBAH --- */}
                {/* Menggunakan GRID System, bukan Flex Scroll */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.map((category) => (
                        <div 
                            key={category.id}
                            onClick={() => navigate(`/products?category=${category.slug}`)}
                            className="
                                group/card 
                                border border-gray-300 rounded-md 
                                h-[145px] w-full  /* Ukuran mengikuti grid, bukan fix 170px */
                                flex flex-col items-center justify-center gap-4 
                                cursor-pointer 
                                transition-all duration-300 
                                hover:bg-secondary-2 hover:border-secondary-2 hover:shadow-lg
                            "
                        >
                            <div className="text-slate-900 group-hover/card:text-white transition-colors duration-300">
                                {getCategoryIcon(category.slug || category.name)} 
                            </div>
                            
                            <span className="text-slate-900 font-medium text-base group-hover/card:text-white transition-colors duration-300 capitalize text-center px-2 line-clamp-2">
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