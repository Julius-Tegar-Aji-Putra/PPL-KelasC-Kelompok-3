//
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import Icon Kategori & Icon Panah
import { 
  Headphones, DeviceMobile, TShirt, Dress, HairDryer, ForkKnife, 
  Motorcycle, Palette, Book, GameController, FirstAidKit, Barbell, 
  Armchair, SquaresFour,
  CaretLeft, CaretRight // Icon untuk tombol panah
} from '@phosphor-icons/react';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // Ref untuk mengakses elemen scroll container
    const scrollContainerRef = useRef(null);

    // Fungsi Scroll ke Kiri
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    // Fungsi Scroll ke Kanan
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Mapping Icon (Sama seperti sebelumnya)
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
                        
                        {/* Tombol Navigasi (Hanya muncul di Desktop / Layar Besar) */}
                        <div className="hidden md:flex gap-2">
                            <button 
                                onClick={scrollLeft}
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-secondary-2 hover:text-white transition-colors"
                            >
                                <CaretLeft size={20} weight="bold" />
                            </button>
                            <button 
                                onClick={scrollRight}
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-secondary-2 hover:text-white transition-colors"
                            >
                                <CaretRight size={20} weight="bold" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Wrapper Relative untuk menampung scroll container */}
                <div className="relative group">
                    
                    {/* SCROLLABLE CONTAINER */}
                    {/* ref={scrollContainerRef} dipasang di sini agar tombol bisa mengontrol div ini */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex flex-nowrap overflow-x-auto gap-8 pb-4 scroll-smooth scrollbar-hide"
                    >
                        {categories.map((category) => (
                            <div 
                                key={category.id}
                                onClick={() => navigate(`/products?category=${category.slug}`)}
                                className="
                                    group/card 
                                    border border-gray-300 rounded-md 
                                    min-w-[170px] w-[170px] h-[145px] 
                                    flex flex-col items-center justify-center gap-4 
                                    cursor-pointer 
                                    transition-all duration-300 
                                    hover:bg-secondary-2 hover:border-secondary-2 hover:shadow-lg
                                    flex-shrink-0
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
        </div>
    );
};

export default CategorySection;