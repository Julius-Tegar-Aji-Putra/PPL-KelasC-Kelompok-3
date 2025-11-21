import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Package } from 'lucide-react';
import Loader from '../components/common/Loader';
import RatingStars from '../components/product/RatingStars';
import ReviewForm from '../components/product/ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data.data);
      setSelectedImage(response.data.data.main_image);
    } catch (error) {
      console.error("Gagal mengambil detail produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
    fetchProduct();
  }, [id]);

  // Callback setelah review berhasil dikirim
  const handleReviewSubmitted = () => {
    fetchProduct(); // Refresh data produk untuk update review
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
     }).format(price);
  };

  if (loading) return <Loader />;
  if (!product) return <div className="py-20 text-center">Produk tidak ditemukan</div>;

  const allImages = [product.main_image, ...product.detail_images];
  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length 
    : 0;

  return (
    <div className="w-full py-10">
      <div className="container mx-auto px-4 md:px-0">
        
        {/* --- HEADER PRODUCT DETAILS (Referensi Style) --- */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-md"></div>
            <span className="text-[#DB4444] font-bold text-lg">Product Details</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- BAGIAN GAMBAR --- */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {allImages.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 bg-gray-100 rounded cursor-pointer border-2 ${
                    selectedImage === img ? 'border-[#DB4444]' : 'border-transparent'
                  } hover:border-[#DB4444] transition-colors`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain p-2" />
                </div>
              ))}
            </div>

            <div className="flex-1 bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <img src={selectedImage} alt={product.name} className="max-w-full max-h-[500px] object-contain" />
            </div>
          </div>

          {/* --- BAGIAN INFORMASI PRODUK --- */}
          <div className="flex flex-col gap-6">
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <RatingStars rating={Math.round(averageRating)} size={18} />
                <span className="text-gray-600">({product.reviews.length} reviews)</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{product.total_sold}</span>
                <div className={`px-3 py-1 rounded text-xs font-semibold text-white ${
                  product.condition === 'baru' ? 'bg-[#00C24E]' : 'bg-[#DB4444]'
                }`}>
                  {product.condition === 'baru' ? 'NEW' : 'USED'}
                </div>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>

              <div className="text-3xl font-bold text-[#DB4444] mb-4">
                {formatPrice(product.price)}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={20} className="text-gray-600" />
                  <span className="font-semibold text-gray-900">{product.seller.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} />
                  <span>{product.seller.location}, {product.seller.province}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Brand</p>
                  <p className="font-semibold text-gray-900">{product.brand}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Warranty</p>
                  <p className="font-semibold text-gray-900">{product.warranty_type}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Condition</p>
                  <p className="font-semibold text-gray-900 capitalize">{product.condition}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Stock</p>
                  <p className="font-semibold text-gray-900">{product.stock} units</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div className="mt-16">
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-10 bg-[#DB4444] rounded-md"></div>
            
            <div className="flex items-center gap-2">
              <span className="text-[#DB4444] font-bold text-lg">Customer Reviews</span>
              <span className="text-gray-600 text-sm">({product.reviews.length} Reviews)</span>
            </div>
          </div>

          {product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{review.user}</p>
                      <p className="text-sm text-gray-500">{review.province}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={review.rating} size={16} />
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-gray-500">Belum ada review untuk produk ini.</p>
            </div>
          )}

          {/* Form Submit Review */}
          <ReviewForm productId={id} onReviewSubmitted={handleReviewSubmitted} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;