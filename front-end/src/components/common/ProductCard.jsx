import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  // Helper Format Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Ambil rating dari API, jika null/undefined anggap 0
  const ratingVal = product.rating || 0;

  return (
    <div 
      onClick={() => navigate(`/products/${product.id}`)}
      className="group w-full flex flex-col gap-4 cursor-pointer"> 
      
      {/* --- BAGIAN GAMBAR --- */}
      <div className="relative w-full h-[250px] bg-[#F5F5F5] rounded flex items-center justify-center overflow-hidden p-4">
        <img 
          src={product.main_image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
        />

        {/* Badge Kondisi (Pastikan API mengirim 'condition') */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-normal text-white 
          ${product.condition === 'Baru' ? 'bg-[#00C24E]' : 'bg-[#DB4444]'}`}>
          {product.condition === 'Baru' ? 'BARU' : 'BEKAS'}
        </div>
      </div>

      {/* --- BAGIAN KONTEN TEXT --- */}
      <div className="flex flex-col gap-2">
        {/* Nama Produk */}
        <h3 className="font-medium text-base text-black line-clamp-1">
          {product.name}
        </h3>

        <div className="flex flex-col gap-1">
          {/* Harga */}
          <span className="text-[#DB4444] font-medium text-base">
            {product.price ? formatPrice(product.price) : 'Hubungi Penjual'}
          </span>
          
          {/* Rating & Terjual */}
          <div className="flex items-center gap-2">
            {/* Bintang */}
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={16} 
                  className={star <= Math.round(ratingVal) ? "fill-[#FFAD33] text-[#FFAD33]" : "fill-gray-300 text-gray-300"} 
                />
              ))}
            </div>
            
            {/* Angka Rating & Jumlah Terjual */}
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-500 opacity-50">
               <span>({product.total_sold || 0} Terjual)</span>
            </div>
          </div>

          {/* Lokasi Penjual */}
          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
            <MapPin size={14} />
            <span className="truncate font-medium">
                {product.seller_location || 'Lokasi Tidak Diketahui'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;