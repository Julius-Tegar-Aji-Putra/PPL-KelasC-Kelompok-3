//
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { Search, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import axios from 'axios';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions({ products: [], stores: [] });
      setShowSuggestions(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('/api/search/suggestions', {
        params: { query }
      });
      const data = response.data || { products: [], stores: [] };
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions({ products: [], stores: [] });
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    } else {
      navigate('/products');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleStoreClick = (storeId) => {
    navigate(`/products?store_id=${storeId}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    // PERUBAHAN DISINI: Tambahkan 'sticky top-0 z-50'
    // sticky: Membuat elemen menempel
    // top-0: Menempel di posisi paling atas (0px dari atas)
    // z-50: Memastikan navbar berada di atas elemen lain (layer paling atas)
    <header className="bg-primary shadow-sm border-b border-gray-200 h-24 sticky top-0 z-50">
      <div className="container mx-auto px-32 h-full">
        <div className={`flex items-center h-full ${isAuthPage ? 'justify-center' : 'justify-between'}`}>
          
          <Link to="/" className="text-2xl font-bold font-inter text-text-2">
            MartPlace
          </Link>

          {!isAuthPage && (
            <>
              <div className="w-96 relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Cari produk atau toko..."
                    className="w-full bg-secondary px-4 py-2 pr-20 rounded outline-none font-poppins text-sm text-text-2"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-10 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  >
                    <Search className="w-5 h-5 text-gray-500" />
                  </button>
                </form>

                {showSuggestions && searchQuery.length >= 2 && (suggestions.products?.length > 0 || suggestions.stores?.length > 0) && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {suggestions.products && suggestions.products.length > 0 && (
                      <div className="p-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Produk</p>
                        {suggestions.products.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left"
                          >
                            <img 
                              src={product.image || '/placeholder.png'} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                              onError={(e) => { e.target.src = '/placeholder.png'; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                              <p className="text-sm text-[#DB4444] font-semibold">
                                Rp {parseInt(product.price).toLocaleString('id-ID')}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {suggestions.stores && suggestions.stores.length > 0 && (
                      <div className="p-2 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Toko</p>
                        {suggestions.stores.map((store) => (
                          <button
                            key={store.id}
                            onClick={() => handleStoreClick(store.id)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-left"
                          >
                            {store.image ? (
                              <img 
                                src={store.image} 
                                alt={store.name}
                                className="w-10 h-10 object-cover rounded-full"
                                onError={(e) => { e.target.src = ''; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-semibold">
                                  {store.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{store.name}</p>
                              {store.location && (
                                <p className="text-xs text-gray-500 truncate">{store.location}</p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {showSuggestions && searchQuery.length >= 2 && !loading && suggestions.products?.length === 0 && suggestions.stores?.length === 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center z-50">
                    <p className="text-sm text-gray-500">Tidak ada hasil untuk "{searchQuery}"</p>
                  </div>
                )}

                {loading && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Mencari...</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <ProfileDropdown />
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="font-poppins text-text-2 px-4 py-2 rounded hover:bg-secondary transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="font-poppins text-text-2 px-4 py-2 rounded hover:bg-secondary transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;