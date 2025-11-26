import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import Loader from '../components/common/Loader';
import FilterPanel from '../components/common/FilterPanel';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parse filters from URL
  const getFiltersFromURL = () => ({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    condition: searchParams.get('condition') || '',
    province_id: searchParams.get('province_id') || '',
    regency_id: searchParams.get('regency_id') || '',
    sort: searchParams.get('sort') || '',
    store_id: searchParams.get('store_id') || '',
    page: searchParams.get('page') || '1'
  });

  const [filters, setFilters] = useState(getFiltersFromURL());

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilters(getFiltersFromURL());
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      const categoryData = response.data?.data || response.data || [];
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Build query params
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.condition) params.condition = filters.condition;
      if (filters.province_id) params.province_id = filters.province_id;
      if (filters.regency_id) params.regency_id = filters.regency_id;
      if (filters.sort) params.sort = filters.sort;
      if (filters.store_id) params.store_id = filters.store_id;
      if (filters.page) params.page = filters.page;

      const response = await axios.get('/api/products', { params });
      
      const productData = response.data?.data || response.data || [];
      setProducts(Array.isArray(productData) ? productData : []);
      
      // Update pagination
      if (response.data.current_page) {
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateURLWithFilters = (newFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...newFilters, page: '1' };
    updateURLWithFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: filters.search,
      category: '',
      condition: '',
      province_id: '',
      regency_id: '',
      sort: '',
      store_id: '',
      page: '1'
    };
    updateURLWithFilters(clearedFilters);
  };

  const handlePageChange = (page) => {
    const updatedFilters = { ...filters, page: page.toString() };
    updateURLWithFilters(updatedFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFilter = (filterKey) => {
    const updatedFilters = { ...filters, [filterKey]: '', page: '1' };
    updateURLWithFilters(updatedFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => 
      key !== 'search' && key !== 'page' && value && value !== ''
    ).length;
  };

  const getPageTitle = () => {
    if (filters.search) {
      return `Hasil Pencarian: "${filters.search}"`;
    }
    if (filters.category) {
      const category = categories.find(cat => cat.slug === filters.category);
      return category ? category.name : 'Products';
    }
    if (filters.store_id) {
      return 'Produk Toko';
    }
    return 'Semua Produk';
  };

  const ActiveFilterBadge = ({ label, value, onRemove }) => (
    <div className="inline-flex items-center gap-2 bg-[#DB4444] text-white px-3 py-1 rounded-full text-sm">
      <span>{label}: {value}</span>
      <button onClick={onRemove} className="hover:bg-red-600 rounded-full p-0.5">
        <X className="w-3 h-3" />
      </button>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="w-full py-10 min-h-screen">
      <div className="container mx-auto">
        
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-md"></div>
            <span className="text-[#DB4444] font-bold text-lg">Products</span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">{getPageTitle()}</h2>
        </div>

        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.condition && (
              <ActiveFilterBadge 
                label="Kondisi" 
                value={filters.condition === 'baru' ? 'Baru' : 'Bekas'} 
                onRemove={() => removeFilter('condition')}
              />
            )}
            {filters.sort && (
              <ActiveFilterBadge 
                label="Urutan" 
                value={
                  filters.sort === 'price_asc' ? 'Termurah' : 
                  filters.sort === 'price_desc' ? 'Termahal' : 'Terbaru'
                } 
                onRemove={() => removeFilter('sort')}
              />
            )}
            <button
              onClick={handleClearFilters}
              className="text-sm text-[#DB4444] hover:text-red-700 font-medium"
            >
              Hapus Semua Filter
            </button>
          </div>
        )}

        <div className="flex gap-6">
          
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterPanel 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          <div className="flex-1">
            
            <div className="mb-4 text-sm text-gray-600">
              Menampilkan {products.length} dari {pagination.total} produk
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-20 bg-white rounded-lg">
                  <p className="text-xl font-semibold mb-2">Tidak ada produk ditemukan</p>
                  <p className="text-sm">Coba ubah filter atau kata kunci pencarian Anda</p>
                </div>
              )}
            </div>

            {pagination.last_page > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(pagination.last_page)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === pagination.last_page ||
                    (page >= pagination.current_page - 1 && page <= pagination.current_page + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          page === pagination.current_page
                            ? 'bg-[#DB4444] text-white'
                            : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === pagination.current_page - 2 ||
                    page === pagination.current_page + 2
                  ) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;