import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

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

  if (loading) return <div className="py-20 text-center">Loading Products...</div>;

  return (
    <div className="w-full py-10 mb-10 border-b border-gray-200">
       {/* Container ini menjamin margin kiri-kanan sama dengan section lain */}
       <div className="container mx-auto px-4 md:px-0">
          
          {/* --- HEADER SECTION --- */}
          <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-4">
                  <div className="w-5 h-10 bg-[#DB4444] rounded-md"></div>
                  <span className="text-[#DB4444] font-bold text-base">Our Products</span>
              </div>

              <div className="flex justify-between items-end">
                <h2 className="text-4xl font-semibold text-slate-900 tracking-wider">Explore Our Products</h2>
              </div>
          </div>

          {/* --- GRID PRODUK --- */}
          {/* Grid akan membagi lebar container menjadi 4 kolom rata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.length > 0 ? (
                  products.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} product={product} />
                  ))
              ) : (
                  <div className="col-span-full text-center text-gray-500">
                      Belum ada produk.
                  </div>
              )}
          </div>

          {/* --- TOMBOL VIEW ALL --- */}
          <div className="mt-14 flex justify-center">
            <button className="bg-[#DB4444] text-white px-12 py-4 rounded font-medium hover:bg-red-600 transition-colors">
                View All Products
            </button>
          </div>

       </div>
    </div>
  );
};

export default ProductSection;