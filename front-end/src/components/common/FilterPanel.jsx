import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    condition: true,
    location: true,
    sort: true
  });

  useEffect(() => {
    fetchCategories();
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (filters.province_id) {
      fetchRegencies(filters.province_id);
    } else {
      setRegencies([]);
    }
  }, [filters.province_id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      const categoryData = response.data?.data || response.data || [];
      setCategories(Array.isArray(categoryData) ? categoryData : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('/api/wilayah/provinces');
      const provinceData = response.data?.data || [];
      setProvinces(Array.isArray(provinceData) ? provinceData : []);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchRegencies = async (provinceCode) => {
    if (!provinceCode) {
      setRegencies([]);
      return;
    }
    try {
      const response = await axios.get(`/api/wilayah/regencies?province_id=${provinceCode}`);
      const regencyData = response.data?.data || [];
      setRegencies(Array.isArray(regencyData) ? regencyData : []);
    } catch (error) {
      console.error('Error fetching regencies:', error);
      setRegencies([]);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-2 text-left"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
        <Filter className="w-5 h-5 text-[#DB4444]" />
        <h3 className="text-lg font-bold text-gray-900">Filter</h3>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <FilterSection title="Kategori" sectionKey="category">
          <div className="space-y-2">
            {categories.map(cat => {
              const isChecked = 
                filters.category === cat.slug || 
                ((!filters.category || filters.category === '') && cat.slug === 'semua-kategori');
              return (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="radio"
                    name="category"
                    value={cat.slug}
                    checked={isChecked}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-4 h-4 text-[#DB4444] focus:ring-[#DB4444]"
                  />
                  <span className="text-sm text-gray-700 capitalize">{cat.name}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* Condition Filter */}
        <FilterSection title="Kondisi" sectionKey="condition">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="condition"
                value=""
                checked={!filters.condition}
                onChange={(e) => handleFilterChange('condition', '')}
                className="w-4 h-4 text-[#DB4444] focus:ring-[#DB4444]"
              />
              <span className="text-sm text-gray-700">Semua</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="condition"
                value="baru"
                checked={filters.condition === 'baru'}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-4 h-4 text-[#DB4444] focus:ring-[#DB4444]"
              />
              <span className="text-sm text-gray-700">Baru</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="condition"
                value="bekas"
                checked={filters.condition === 'bekas'}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-4 h-4 text-[#DB4444] focus:ring-[#DB4444]"
              />
              <span className="text-sm text-gray-700">Bekas</span>
            </label>
          </div>
        </FilterSection>

        {/* Location Filter */}
        <FilterSection title="Lokasi" sectionKey="location">
          <div className="space-y-3">
            {/* Province */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Provinsi
              </label>
              <select
                value={filters.province_id || ''}
                onChange={(e) => {
                  const provinceCode = e.target.value;
                  const newFilters = { ...filters, province_id: provinceCode, regency_id: '' };
                  onFilterChange(newFilters);
                  if (provinceCode) {
                    fetchRegencies(provinceCode);
                  } else {
                    setRegencies([]);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
              >
                <option value="">Semua Provinsi</option>
                {provinces.map((prov) => (
                  <option key={prov.code} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Regency (only enabled when province is selected) */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Kota/Kabupaten
              </label>
              <select
                value={filters.regency_id || ''}
                onChange={(e) => {
                  handleFilterChange('regency_id', e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444] disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!filters.province_id}
              >
                <option value="">Semua Kota/Kabupaten</option>
                {regencies.map((reg) => (
                  <option key={reg.code} value={reg.code}>
                    {reg.name}
                  </option>
                ))}
              </select>
              {!filters.province_id && (
                <p className="text-xs text-gray-500 mt-1">Pilih provinsi terlebih dahulu</p>
              )}
              {filters.province_id && regencies.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">Memuat kota/kabupaten...</p>
              )}
            </div>
          </div>
        </FilterSection>

        {/* Sort Filter */}
        <FilterSection title="Urutkan" sectionKey="sort">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="sort"
                value=""
                checked={!filters.sort}
                onChange={(e) => handleFilterChange('sort', '')}
                className="w-4 h-4 text-[#DB4444] focus:ring-[#DB4444]"
              />
              <span className="text-sm text-gray-700">Terbaru</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="sort"
                value="price_asc"
                checked={filters.sort === 'price_asc'}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-4 h-4 text-[#DB4444] focus:ring-[#DB4444]"
              />
              <span className="text-sm text-gray-700">Harga Termurah</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="sort"
                value="price_desc"
                checked={filters.sort === 'price_desc'}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-4 h-4 text-[#DB4444] focus:ring-[#DB4444]"
              />
              <span className="text-sm text-gray-700">Harga Termahal</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterPanel;