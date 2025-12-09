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
    province_id: '', province_name: '',
    regency_id: '', regency_name: '',
    district_id: '', district_name: '',
    village_id: '', village_name: '',
  });

  const [foto, setFoto] = useState(null);
  const [fileKtp, setFileKtp] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --- EFFECT UNTUK WILAYAH (TETAP SAMA) ---
  useEffect(() => {
    axios.get('/api/wilayah/provinces').then(res => setProvinces(res.data.data));
  }, []);
  useEffect(() => {
    if (formData.province_id) axios.get(`/api/wilayah/regencies?province_id=${formData.province_id}`).then(res => setRegencies(res.data.data));
  }, [formData.province_id]);
  useEffect(() => {
    if (formData.regency_id) axios.get(`/api/wilayah/districts?regency_id=${formData.regency_id}`).then(res => setDistricts(res.data.data));
  }, [formData.regency_id]);
  useEffect(() => {
    if (formData.district_id) axios.get(`/api/wilayah/villages?district_id=${formData.district_id}`).then(res => setVillages(res.data.data));
  }, [formData.district_id]);

  // --- FUNGSI VALIDASI CUSTOM (BARU) ---
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // 1. Data Diri
    if (!formData.nama) { tempErrors.nama = "Nama Lengkap wajib diisi."; isValid = false; }
    
    if (!formData.email) { 
        tempErrors.email = "Email wajib diisi."; isValid = false; 
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Format email salah (harus mengandung '@' dan domain)."; isValid = false;
    }

    if (!formData.no_handphone) {
        tempErrors.no_handphone = "No. Handphone wajib diisi."; isValid = false;
    } else if (!/^[0-9]+$/.test(formData.no_handphone)) {
        tempErrors.no_handphone = "No. Handphone hanya boleh angka."; isValid = false;
    }

    if (!formData.password) {
        tempErrors.password = "Password wajib diisi."; isValid = false;
    } else if (formData.password.length < 8) {
        tempErrors.password = "Password minimal 8 karakter."; isValid = false;
    }

    if (formData.password !== formData.password_confirmation) {
        tempErrors.password_confirmation = "Konfirmasi password tidak cocok."; isValid = false;
    }

    // 2. Data Toko
    if (!formData.nama_toko) { tempErrors.nama_toko = "Nama Toko wajib diisi."; isValid = false; }

    // 3. Alamat
    if (!formData.alamat) { tempErrors.alamat = "Alamat Jalan wajib diisi."; isValid = false; }
    if (!formData.rt) { tempErrors.rt = "RT wajib."; isValid = false; }
    if (!formData.rw) { tempErrors.rw = "RW wajib."; isValid = false; }
    if (!formData.province_id) { tempErrors.province_id = "Provinsi wajib dipilih."; isValid = false; }
    if (!formData.regency_id) { tempErrors.regency_id = "Kabupaten wajib dipilih."; isValid = false; }
    if (!formData.district_id) { tempErrors.district_id = "Kecamatan wajib dipilih."; isValid = false; }
    if (!formData.village_id) { tempErrors.village_id = "Kelurahan wajib dipilih."; isValid = false; }

    // 4. Dokumen
    if (!formData.no_ktp) {
        tempErrors.no_ktp = "No KTP wajib diisi."; isValid = false;
    } else if (!/^\d{16}$/.test(formData.no_ktp)) {
        tempErrors.no_ktp = "No KTP harus tepat 16 digit angka."; isValid = false;
    }

    if (!foto) { tempErrors.foto = "Foto Diri wajib diupload."; isValid = false; }
    if (!fileKtp) { tempErrors.file_upload_ktp = "Foto KTP wajib diupload."; isValid = false; }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Hapus error saat user mengetik
    if(errors[name]) setErrors(prev => ({...prev, [name]: null}));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'foto') {
        setFoto(files[0]);
        if(errors.foto) setErrors(prev => ({...prev, foto: null}));
    } else if (name === 'file_upload_ktp') {
        setFileKtp(files[0]);
        if(errors.file_upload_ktp) setErrors(prev => ({...prev, file_upload_ktp: null}));
    }
  };

  const handleDropdownChange = (e, list, nameKey, idKey) => {
    const selectedId = e.target.value;
    const selectedItem = list.find(item => item.code === selectedId);
    
    setFormData(prev => ({
      ...prev,
      [idKey]: selectedId,
      [nameKey]: selectedItem ? selectedItem.name : '',
    }));
    // Reset child dropdowns logic (Tetap sama)
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
    
    // 1. Jalankan Validasi Custom Frontend Dulu
    if(!validateForm()) {
        // Scroll ke elemen error pertama (opsional, UX bagus)
        const firstError = document.querySelector('.text-red-500');
        if(firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    setLoading(true);
    // setErrors({}); // Jangan di reset kosong, nanti error backend gak masuk

    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    if(foto) data.append('foto', foto);
    if(fileKtp) data.append('file_upload_ktp', fileKtp);

    try {
      const response = await axios.post('/api/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
      navigate('/login'); 
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Mapping error backend ke state errors
        setErrors(error.response.data.errors);
      } else {
        alert('Terjadi kesalahan pada server. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk menampilkan style input dinamis (Merah jika error)
  const getInputClass = (fieldName) => `
    w-full px-0 py-2 border-b focus:outline-none transition-colors bg-transparent font-poppins text-text-2 placeholder-gray-400 text-sm
    ${errors[fieldName] 
        ? 'border-red-500 text-red-600 focus:border-red-500' 
        : 'border-gray-300 focus:border-secondary-2'
    }
  `;

  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 mt-4";

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex justify-center items-center bg-white">
      <div className="w-full bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.08),0_0_10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row max-w-6xl border border-gray-100 h-[92%]">
        
        {/* Gambar Kiri */}
        <div className="hidden md:flex w-full md:w-2/5 bg-white items-center justify-center p-10 relative">
            <div className="text-center sticky top-10">
                <img src={RegisterIllustration} alt="Register Illustration" className="w-full h-auto object-contain" />
            </div>
        </div>

        {/* Form Kanan */}
        <div className="w-full md:w-3/5 py-10 pl-10 pr-6 md:py-12 md:pl-12 md:pr-8 overflow-y-auto custom-scrollbar bg-white">
          <h2 className="text-3xl font-bold font-inter text-text-2 mb-2">
            Buat Akun Baru
          </h2>
          <p className="text-gray-500 font-poppins mb-8">
             Lengkapi detail Anda di bawah ini
          </p>

          {/* Form pakai noValidate */}
          <form onSubmit={handleSubmit} className="space-y-2" noValidate>
            
            {/* Bagian 1: Data Diri */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-2">1. Data Diri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Nama Lengkap</label>
                  <input type="text" name="nama" onChange={handleChange} className={getInputClass('nama')} placeholder="Nama Lengkap Sesuai KTP" />
                  {errors.nama && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.nama) ? errors.nama[0] : errors.nama}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" name="email" onChange={handleChange} className={getInputClass('email')} placeholder="email@contoh.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.email) ? errors.email[0] : errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>No. Handphone</label>
                  <input type="tel" name="no_handphone" onChange={handleChange} className={getInputClass('no_handphone')} placeholder="08xxxxxxxxxx" />
                  {errors.no_handphone && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.no_handphone) ? errors.no_handphone[0] : errors.no_handphone}</p>}
                </div>
                <div>
                  <label className={labelClass}>Kata Sandi</label>
                  <input type="password" name="password" onChange={handleChange} className={getInputClass('password')} placeholder="Minimal 8 karakter" />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.password) ? errors.password[0] : errors.password}</p>}
                </div>
                <div>
                  <label className={labelClass}>Konfirmasi Kata Sandi</label>
                  <input type="password" name="password_confirmation" onChange={handleChange} className={getInputClass('password_confirmation')} placeholder="Ulangi kata sandi" />
                  {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                </div>
              </div>
            </div>

            {/* Bagian 2: Data Toko */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-8">2. Data Toko</h3>
              <div className="space-y-2">
                <div>
                  <label className={labelClass}>Nama Toko</label>
                  <input type="text" name="nama_toko" onChange={handleChange} className={getInputClass('nama_toko')} placeholder="Contoh: Toko Berkah Jaya" />
                  {errors.nama_toko && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.nama_toko) ? errors.nama_toko[0] : errors.nama_toko}</p>}
                </div>
                <div>
                  <label className={labelClass}>Deskripsi Singkat</label>
                  <textarea name="deskripsi_singkat" onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all text-sm h-32 resize-none ${errors.deskripsi_singkat ? 'border-red-500' : 'border-gray-300 focus:border-secondary-2'}`} placeholder="Jelaskan apa yang Anda jual..."></textarea>
                  {errors.deskripsi_singkat && <p className="text-red-500 text-xs mt-1">{errors.deskripsi_singkat}</p>}
                </div>
              </div>
            </div>

            {/* Bagian 3: Alamat */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-8">3. Alamat Lengkap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Alamat Jalan</label>
                  <input type="text" name="alamat" onChange={handleChange} className={getInputClass('alamat')} placeholder="Jl. Mawar No. 123" />
                  {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                </div>
                <div>
                  <label className={labelClass}>RT / RW</label>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                        <input type="text" name="rt" onChange={handleChange} className={getInputClass('rt')} placeholder="RT" maxLength="3" />
                    </div>
                    <div className="w-1/2">
                        <input type="text" name="rw" onChange={handleChange} className={getInputClass('rw')} placeholder="RW" maxLength="3" />
                    </div>
                  </div>
                  {(errors.rt || errors.rw) && <p className="text-red-500 text-xs mt-1">RT/RW wajib diisi.</p>}
                </div>
                
                {/* Dropdowns */}
                <div>
                    <label className={labelClass}>Provinsi</label>
                    <select name="province_id" value={formData.province_id} onChange={(e) => handleDropdownChange(e, provinces, 'province_name', 'province_id')} className={getInputClass('province_id')}>
                        <option value="">Pilih Provinsi</option>
                        {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                    </select>
                    {errors.province_id && <p className="text-red-500 text-xs mt-1">{errors.province_id}</p>}
                </div>
                <div>
                    <label className={labelClass}>Kabupaten/Kota</label>
                    <select name="regency_id" value={formData.regency_id} onChange={(e) => handleDropdownChange(e, regencies, 'regency_name', 'regency_id')} disabled={!formData.province_id} className={getInputClass('regency_id')}>
                        <option value="">Pilih Kabupaten</option>
                        {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
                    </select>
                    {errors.regency_id && <p className="text-red-500 text-xs mt-1">{errors.regency_id}</p>}
                </div>
                <div>
                    <label className={labelClass}>Kecamatan</label>
                    <select name="district_id" value={formData.district_id} onChange={(e) => handleDropdownChange(e, districts, 'district_name', 'district_id')} disabled={!formData.regency_id} className={getInputClass('district_id')}>
                        <option value="">Pilih Kecamatan</option>
                        {districts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
                    </select>
                    {errors.district_id && <p className="text-red-500 text-xs mt-1">{errors.district_id}</p>}
                </div>
                <div>
                    <label className={labelClass}>Kelurahan/Desa</label>
                    <select name="village_id" value={formData.village_id} onChange={(e) => handleDropdownChange(e, villages, 'village_name', 'village_id')} disabled={!formData.district_id} className={getInputClass('village_id')}>
                        <option value="">Pilih Kelurahan</option>
                        {villages.map(v => <option key={v.code} value={v.code}>{v.name}</option>)}
                    </select>
                    {errors.village_id && <p className="text-red-500 text-xs mt-1">{errors.village_id}</p>}
                </div>
              </div>
            </div>

            {/* Bagian 4: Dokumen */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-2 border-b pb-2 mb-4 mt-8">4. Dokumen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="md:col-span-2">
                    <label className={labelClass}>Nomor KTP (NIK)</label>
                    <input type="text" name="no_ktp" onChange={handleChange} className={getInputClass('no_ktp')} maxLength="16" placeholder="16 digit NIK" />
                    {errors.no_ktp && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.no_ktp) ? errors.no_ktp[0] : errors.no_ktp}</p>}
                </div>
                <div>
                  <label className={labelClass}>Foto Diri</label>
                  <input type="file" name="foto" onChange={handleFileChange} className={`mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-2 hover:file:bg-red-100 ${errors.foto ? 'text-red-500' : ''}`} accept="image/*" />
                  {errors.foto && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.foto) ? errors.foto[0] : errors.foto}</p>}
                </div>
                <div>
                  <label className={labelClass}>Foto KTP</label>
                  <input type="file" name="file_upload_ktp" onChange={handleFileChange} className={`mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-2 hover:file:bg-red-100 ${errors.file_upload_ktp ? 'text-red-500' : ''}`} accept="image/*" />
                  {errors.file_upload_ktp && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.file_upload_ktp) ? errors.file_upload_ktp[0] : errors.file_upload_ktp}</p>}
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
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;