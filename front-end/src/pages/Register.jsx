import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import RegisterIllustration from '../assets/images/Register.svg';

function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    password_confirmation: '',
    nama_toko: '',
    deskripsi_singkat: '',
    no_handphone: '',
    alamat: '',
    rt: '',
    rw: '',
    no_ktp: '',
    province_id: '',
    province_name: '',
    regency_id: '',
    regency_name: '',
    district_id: '',
    district_name: '',
    village_id: '',
    village_name: '',
  });

  const [foto, setFoto] = useState(null);
  const [fileKtp, setFileKtp] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/wilayah/provinces') 
    .then(response => setProvinces(response.data.data))
    .catch(error => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (formData.province_id) {
      axios.get(`/api/wilayah/regencies?province_id=${formData.province_id}`)
        .then(response => setRegencies(response.data.data))
        .catch(error => console.error("Error fetching regencies:", error));
    }
  }, [formData.province_id]);

  useEffect(() => {
    if (formData.regency_id) {
      axios.get(`/api/wilayah/districts?regency_id=${formData.regency_id}`)
        .then(response => setDistricts(response.data.data))
        .catch(error => console.error("Error fetching districts:", error));
    }
  }, [formData.regency_id]);

  useEffect(() => {
    if (formData.district_id) {
      axios.get(`/api/wilayah/villages?district_id=${formData.district_id}`)
        .then(response => setVillages(response.data.data))
        .catch(error => console.error("Error fetching villages:", error));
    }
  }, [formData.district_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'foto') setFoto(files[0]);
    else if (name === 'file_upload_ktp') setFileKtp(files[0]);
  };

  const handleDropdownChange = (e, list, nameKey, idKey) => {
    const selectedId = e.target.value;
    const selectedItem = list.find(item => item.code === selectedId);
    
    setFormData(prev => ({
      ...prev,
      [idKey]: selectedId,
      [nameKey]: selectedItem ? selectedItem.name : '',
    }));

    if (idKey === 'province_id') {
      setRegencies([]); setDistricts([]); setVillages([]);
      setFormData(prev => ({ ...prev, regency_id: '', district_id: '', village_id: '' }));
    } else if (idKey === 'regency_id') {
      setDistricts([]); setVillages([]);
      setFormData(prev => ({ ...prev, district_id: '', village_id: '' }));
    } else if (idKey === 'district_id') {
      setVillages([]);
      setFormData(prev => ({ ...prev, village_id: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    if(foto) data.append('foto', foto);
    if(fileKtp) data.append('file_upload_ktp', fileKtp);

    try {
      const response = await axios.post('/api/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      alert(response.data.message || "Registrasi berhasil! Mohon cek email secara berkala untuk info aktivasi.");

      navigate('/'); 

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        console.error(error);
        alert('Terjadi kesalahan pada server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const ErrorMsg = ({ field }) => errors[field] ? (
    <p className="text-red-500 text-xs mt-1 ml-1">
      {Array.isArray(errors[field]) ? errors[field][0] : errors[field]}
    </p>
  ) : null;

  const inputClass = "w-full px-0 py-2 border-b border-gray-300 focus:border-secondary-2 focus:outline-none transition-colors bg-transparent font-poppins text-text-2 placeholder-gray-400 text-sm";
  
  const textareaClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-secondary-2 focus:ring-1 focus:ring-secondary-2 focus:outline-none transition-all bg-transparent font-poppins text-text-2 placeholder-gray-400 text-sm h-32 resize-none";
  
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 mt-4";

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex justify-center items-center bg-white">
      <div className="w-full bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.08),0_0_10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row max-w-6xl border border-gray-100 h-[92%]">
        
        <div className="hidden md:flex w-full md:w-2/5 bg-white items-center justify-center p-10 relative">
            <div className="text-center sticky top-10">
                <img src={RegisterIllustration} alt="Register Illustration" className="w-full h-auto object-contain" />
            </div>
        </div>

        <div className="w-full md:w-3/5 py-10 pl-10 pr-6 md:py-12 md:pl-12 md:pr-8 overflow-y-auto custom-scrollbar bg-white">
          <h2 className="text-3xl font-bold font-inter text-text-2 mb-2">
            Create your Account
          </h2>
          <p className="text-gray-500 font-poppins mb-8">
             Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-2">1. Data Diri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Nama Lengkap</label>
                  <input type="text" name="nama" onChange={handleChange} className={inputClass} placeholder="Nama Lengkap Sesuai KTP" />
                  <ErrorMsg field="nama" />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" name="email" onChange={handleChange} className={inputClass} placeholder="email@contoh.com" />
                  <ErrorMsg field="email" />
                </div>
                <div>
                  <label className={labelClass}>No. Handphone</label>
                  <input type="tel" name="no_handphone" onChange={handleChange} className={inputClass} placeholder="08xxxxxxxxxx" />
                  <ErrorMsg field="no_handphone" />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input type="password" name="password" onChange={handleChange} className={inputClass} placeholder="********" />
                  <ErrorMsg field="password" />
                </div>
                <div>
                  <label className={labelClass}>Konfirmasi Password</label>
                  <input type="password" name="password_confirmation" onChange={handleChange} className={inputClass} placeholder="********" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-8">2. Data Toko</h3>
              <div className="space-y-2">
                <div>
                  <label className={labelClass}>Nama Toko</label>
                  <input type="text" name="nama_toko" onChange={handleChange} className={inputClass} placeholder="Contoh: Toko Berkah Jaya" />
                  <ErrorMsg field="nama_toko" />
                </div>
                <div>
                  <label className={labelClass}>Deskripsi Singkat</label>
                  <textarea name="deskripsi_singkat" onChange={handleChange} className={textareaClass} placeholder="Jelaskan apa yang Anda jual..."></textarea>
                  <ErrorMsg field="deskripsi_singkat" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-8">3. Alamat Lengkap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Alamat Jalan</label>
                  <input type="text" name="alamat" onChange={handleChange} className={inputClass} placeholder="Jl. Mawar No. 123" />
                  <ErrorMsg field="alamat" />
                </div>
                <div>
                  <label className={labelClass}>RT / RW</label>
                  <div className="flex gap-4">
                    <input type="text" name="rt" onChange={handleChange} className={inputClass} placeholder="RT" maxLength="3" />
                    <input type="text" name="rw" onChange={handleChange} className={inputClass} placeholder="RW" maxLength="3" />
                  </div>
                  <ErrorMsg field="rt" /> <ErrorMsg field="rw" />
                </div>
                <div>
                    <label className={labelClass}>Provinsi</label>
                    <select name="province_id" value={formData.province_id} onChange={(e) => handleDropdownChange(e, provinces, 'province_name', 'province_id')} className={inputClass}>
                        <option value="">Pilih Provinsi</option>
                        {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                    </select>
                    <ErrorMsg field="province_id" />
                </div>
                <div>
                    <label className={labelClass}>Kabupaten/Kota</label>
                    <select name="regency_id" value={formData.regency_id} onChange={(e) => handleDropdownChange(e, regencies, 'regency_name', 'regency_id')} disabled={!formData.province_id} className={inputClass}>
                        <option value="">Pilih Kabupaten</option>
                        {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
                    </select>
                    <ErrorMsg field="regency_id" />
                </div>
                <div>
                    <label className={labelClass}>Kecamatan</label>
                    <select name="district_id" value={formData.district_id} onChange={(e) => handleDropdownChange(e, districts, 'district_name', 'district_id')} disabled={!formData.regency_id} className={inputClass}>
                        <option value="">Pilih Kecamatan</option>
                        {districts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
                    </select>
                    <ErrorMsg field="district_id" />
                </div>
                <div>
                    <label className={labelClass}>Kelurahan/Desa</label>
                    <select name="village_id" value={formData.village_id} onChange={(e) => handleDropdownChange(e, villages, 'village_name', 'village_id')} disabled={!formData.district_id} className={inputClass}>
                        <option value="">Pilih Kelurahan</option>
                        {villages.map(v => <option key={v.code} value={v.code}>{v.name}</option>)}
                    </select>
                    <ErrorMsg field="village_id" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-8">4. Dokumen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="md:col-span-2">
                    <label className={labelClass}>Nomor KTP</label>
                    <input type="text" name="no_ktp" onChange={handleChange} className={inputClass} maxLength="16" placeholder="16 digit NIK" />
                    <ErrorMsg field="no_ktp" />
                </div>
                <div>
                  <label className={labelClass}>Foto Diri</label>
                  <input type="file" name="foto" onChange={handleFileChange} className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-2 hover:file:bg-red-100" accept="image/*" />
                  <ErrorMsg field="foto" />
                </div>
                <div>
                  <label className={labelClass}>Foto KTP</label>
                  <input type="file" name="file_upload_ktp" onChange={handleFileChange} className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-2 hover:file:bg-red-100" accept="image/*" />
                  <ErrorMsg field="file_upload_ktp" />
                </div>
              </div>
            </div>

            <div className="pt-8 pb-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-secondary-2 text-white font-bold py-4 rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-100 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Sedang Mendaftarkan...' : 'Daftar Sekarang'}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center font-poppins text-gray-600 pb-8">
            <p>
              Sudah punya akun?{' '}
              <Link to="/login" className="font-medium text-secondary-2 hover:underline ml-1">
                Login di sini
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;