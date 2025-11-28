import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Loader from './Loader';

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  // Menampilkan 12 produk (3 Baris x 4 Kolom)
  const displayedProducts = products.slice(0, 12);

  return (
    <div className="w-full py-10 mb-10 border-b border-gray-200">
       <div className="container mx-auto px-4 md:px-0">
         
         {/* Header Section */}
         <div className="flex flex-col gap-4 mb-10">
             <div className="flex items-center gap-4">
                 <div className="w-5 h-10 bg-secondary-2 rounded-md"></div>
                 <span className="text-secondary-2 font-bold text-base">Produk Kami</span>
             </div>

             <div className="flex justify-between items-end">
               <h2 className="text-4xl font-semibold text-slate-900 tracking-wider">Jelajahi Produk Kami</h2>
             </div>
         </div>

         {/* Grid Produk */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
             {displayedProducts.length > 0 ? (
                 displayedProducts.map((product) => (
                     <ProductCard key={product.id} product={product} />
                 ))
             ) : (
                 <div className="col-span-full text-center text-gray-500 py-10">
                     Belum ada produk yang tersedia saat ini.
                 </div>
             )}
         </div>

         {/* Tombol Lihat Semua Produk */}
         <div className="mt-14 flex justify-center">
            <Link 
                to="/products" 
                className="bg-secondary-2 text-white px-12 py-4 rounded font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
            >
               Lihat Semua Produk
            </Link>
         </div>

       </div>
    </div>
  );
};

export default ProductSection;