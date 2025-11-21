import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingStars from './RatingStars';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    reviewer_name: '',
    reviewer_email: '',
    reviewer_phone: '',
    province: '',
    rating: 0,
    comment: ''
  });

  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch Provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('/api/wilayah/provinces');
        // Handle different response structures
        const provinceData = response.data?.data || response.data || [];
        setProvinces(Array.isArray(provinceData) ? provinceData : []);
      } catch (error) {
        console.error('Gagal mengambil data provinsi', error);
        setProvinces([]); // Set empty array on error
      }
    };
    fetchProvinces();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error saat user mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRatingChange = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Validasi rating
    if (formData.rating === 0) {
      setErrors({ rating: ['Silakan berikan rating untuk produk ini'] });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`/api/products/${productId}/reviews`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSuccessMessage('Review berhasil dikirim! Email notifikasi telah dikirim ke Anda.');
        // Reset form
        setFormData({
          reviewer_name: '',
          reviewer_email: '',
          reviewer_phone: '',
          province: '',
          rating: 0,
          comment: ''
        });
        
        // Notify parent component
        if (onReviewSubmitted) {
          setTimeout(() => {
            onReviewSubmitted();
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error submit review:', error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data.message) {
        setErrors({ general: [error.response.data.message] });
      } else {
        setErrors({ general: ['Gagal mengirim review. Silakan coba lagi.'] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Tulis Review Anda</h3>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium">{successMessage}</p>
            <p className="text-green-700 text-sm mt-1">Terima kasih atas ulasan Anda!</p>
          </div>
        </div>
      )}

      {/* General Error */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{errors.general[0]}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nama */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="reviewer_name"
              value={formData.reviewer_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] ${
                errors.reviewer_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan nama lengkap Anda"
              required
            />
            {errors.reviewer_name && (
              <p className="text-red-500 text-xs mt-1">{errors.reviewer_name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="reviewer_email"
              value={formData.reviewer_email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] ${
                errors.reviewer_email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="email@example.com"
              required
            />
            {errors.reviewer_email && (
              <p className="text-red-500 text-xs mt-1">{errors.reviewer_email[0]}</p>
            )}
          </div>

          {/* No. HP */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              No. Handphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="reviewer_phone"
              value={formData.reviewer_phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] ${
                errors.reviewer_phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="081234567890"
              required
            />
            {errors.reviewer_phone && (
              <p className="text-red-500 text-xs mt-1">{errors.reviewer_phone[0]}</p>
            )}
          </div>

          {/* Provinsi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Provinsi <span className="text-red-500">*</span>
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] ${
                errors.province ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Pilih Provinsi</option>
              {provinces.map((prov, index) => (
                <option key={prov.id || index} value={prov.name}>{prov.name}</option>
              ))}
            </select>
            {errors.province && (
              <p className="text-red-500 text-xs mt-1">{errors.province[0]}</p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <RatingStars
              rating={formData.rating}
              onRatingChange={handleRatingChange}
              interactive={true}
              size={32}
            />
            <span className="text-gray-600 text-sm">
              {formData.rating > 0 ? `${formData.rating} dari 5 bintang` : 'Klik untuk memberi rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-xs mt-2">{errors.rating[0]}</p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ulasan Anda <span className="text-red-500">*</span>
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB4444] ${
              errors.comment ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Bagikan pengalaman Anda dengan produk ini..."
            required
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 text-xs mt-1">{errors.comment[0]}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-[#DB4444] text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Kirim Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
