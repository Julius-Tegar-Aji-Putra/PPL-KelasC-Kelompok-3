import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const categoryParam = categorySlug ? `?category=${categorySlug}` : '';
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`/api/products${categoryParam}`),
          axios.get('/api/categories')
        ]);

        setProducts(productsRes.data.data);
        setCategories(categoriesRes.data.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  const getSelectedCategory = () => {
    if (!categorySlug) return 'All Products';
    const category = categories.find(cat => cat.slug === categorySlug);
    return category ? category.name : 'Products';
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full py-10 min-h-screen">
      <div className="container mx-auto px-4 md:px-0">
        
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-md"></div>
            <span className="text-[#DB4444] font-bold text-lg">Products</span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">{getSelectedCategory()}</h2>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          <Link 
            to="/products"
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !categorySlug 
                ? 'bg-[#DB4444] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </Link>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                categorySlug === category.slug
                  ? 'bg-[#DB4444] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-20">
              Tidak ada produk dalam kategori ini.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Products;