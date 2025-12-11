import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import RegisterIllustration from '../assets/images/Register.svg';
// Ikon sederhana (bisa diganti dengan library icon Anda jika mau)
import { Eye, EyeOff, Upload, CheckCircle, ArrowRight, ArrowLeft, X } from 'lucide-react'; 

function Register() {
  const navigate = useNavigate();
  
  // --- 1. STATE MANAGEMENT ---
  const [step, setStep] = useState(1); // 1: Diri, 2: Toko, 3: Alamat, 4: Dokumen
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State Data Form
  const [formData, setFormData] = useState({
    nama: '', email: '', password: '', password_confirmation: '',
    no_handphone: '', nama_toko: '', deskripsi_singkat: '',
    alamat: '', rt: '', rw: '',
    province_id: '', province_name: '',
    regency_id: '', regency_name: '',
    district_id: '', district_name: '',
    village_id: '', village_name: '',
    no_ktp: ''
  });

  // State File & Preview
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [fileKtp, setFileKtp] = useState(null);
  const [previewKtp, setPreviewKtp] = useState(null);

  // State Wilayah
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // --- 2. LOGIKA WILAYAH (Sama seperti sebelumnya) ---
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

  // --- 3. HANDLER INPUT ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Khusus input angka (HP & KTP/RT/RW), cegah huruf
    if (['no_handphone', 'rt', 'rw', 'no_ktp'].includes(name) && value && !/^\d+$/.test(value)) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    if(errors[name]) setErrors(prev => ({...prev, [name]: null}));
  };

  const handleDropdownChange = (e, list, nameKey, idKey) => {
    const selectedId = e.target.value;
    const selectedItem = list.find(item => item.code === selectedId);
    
    setFormData(prev => ({
      ...prev, [idKey]: selectedId, [nameKey]: selectedItem ? selectedItem.name : '',
    }));
    // Reset Logic
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      if (name === 'foto') {
        setFoto(file);
        setPreviewFoto(objectUrl);
        if(errors.foto) setErrors(prev => ({...prev, foto: null}));
      } else if (name === 'file_upload_ktp') {
        setFileKtp(file);
        setPreviewKtp(objectUrl);
        if(errors.file_upload_ktp) setErrors(prev => ({...prev, file_upload_ktp: null}));
      }
    }
  };

  // --- 4. VALIDASI BERTAHAP (STEP VALIDATION) ---
  const validateStep = (currentStep) => {
    let tempErrors = {};
    let isValid = true;

    // Step 1: Data Diri
    if (currentStep === 1) {
        if (!formData.nama) tempErrors.nama = "Nama Lengkap wajib diisi.";
        if (!formData.email) { 
            tempErrors.email = "Email wajib diisi."; 
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Format email salah.";
        }
        if (!formData.no_handphone) tempErrors.no_handphone = "No. Handphone wajib diisi.";
        if (!formData.password) tempErrors.password = "Password wajib diisi.";
        else if (formData.password.length < 8) tempErrors.password = "Minimal 8 karakter.";
        if (formData.password !== formData.password_confirmation) tempErrors.password_confirmation = "Password tidak cocok.";
    }

    // Step 2: Data Toko
    if (currentStep === 2) {
        if (!formData.nama_toko) tempErrors.nama_toko = "Nama Toko wajib diisi.";
        if (!formData.deskripsi_singkat) tempErrors.deskripsi_singkat = "Deskripsi toko wajib diisi.";
    }

    // Step 3: Alamat
    if (currentStep === 3) {
        if (!formData.alamat) tempErrors.alamat = "Alamat wajib diisi.";
        if (!formData.rt || !formData.rw) tempErrors.rt = "RT/RW wajib diisi.";
        if (!formData.province_id) tempErrors.province_id = "Provinsi wajib dipilih.";
        if (!formData.regency_id) tempErrors.regency_id = "Kabupaten wajib dipilih.";
        if (!formData.district_id) tempErrors.district_id = "Kecamatan wajib dipilih.";
        if (!formData.village_id) tempErrors.village_id = "Kelurahan wajib dipilih.";
    }

    // Step 4: Dokumen (Final)
    if (currentStep === 4) {
        if (!formData.no_ktp) tempErrors.no_ktp = "NIK wajib diisi.";
        else if (formData.no_ktp.length !== 16) tempErrors.no_ktp = "NIK harus 16 digit.";
        if (!foto) tempErrors.foto = "Foto Diri wajib diupload.";
        if (!fileKtp) tempErrors.file_upload_ktp = "Foto KTP wajib diupload.";
    }

    if (Object.keys(tempErrors).length > 0) {
        setErrors(tempErrors);
        isValid = false;
        // Scroll ke error pertama (UX improvement)
        setTimeout(() => {
            const firstError = document.querySelector('.text-red-500');
            if(firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    } else {
        setErrors({});
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // --- 5. SUBMIT FINAL ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setLoading(true);
    const data = new FormData();
    // Append semua data
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
        setErrors(error.response.data.errors);
        // Jika error validasi backend, mungkin perlu mundur step. 
        // Untuk sederhana, kita tampilkan alert dulu.
        alert("Terdapat kesalahan data. Silakan cek kembali inputan Anda.");
      } else {
        alert('Terjadi kesalahan pada server.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const getInputClass = (fieldName) => `
    w-full px-0 py-3 border-b focus:outline-none transition-colors bg-transparent font-poppins text-gray-800 placeholder-gray-400
    ${errors[fieldName] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
  `;
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 mt-3";

  return (
    <div className="w-full min-h-screen flex justify-center items-center py-12 bg-white relative">
      {/* Tombol Kembali ke Homepage */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-secondary-2 font-medium transition-colors group z-50"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Beranda</span>
      </Link>
      
      <div className="w-full bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.08),0_0_10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row max-w-5xl border border-gray-100">
        
        {/* KIRI: Ilustrasi */}
        <div className="hidden md:flex w-full md:w-1/2 bg-white items-center justify-center p-10">
            <div className="text-center">
                <img src={RegisterIllustration} alt="Register Illustration" className="w-full h-auto object-contain" />
            </div>
        </div>

        {/* KANAN: Form Wizard */}
        <div className="w-full md:w-1/2 flex flex-col">
            {/* Header */}
            <div className="px-10 md:px-12 pt-8 pb-5 bg-white">
                <h2 className="text-3xl font-bold font-inter text-gray-800 mb-2">Daftar ke MartPlace</h2>
                <p className="text-gray-500 font-poppins mb-6">Lengkapi data Anda untuk mulai berjualan</p>
                
                {/* Stepper Indicator Dengan Progress Line */}
                <div className="relative mb-6">
                   {/* Garis Background (Abu-abu) - Posisi top-4 agar pas tengah lingkaran h-8 */}
                   <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 rounded"></div>
                   
                   {/* Garis Progress (Merah) - Terlihat jelas */}
                   <div 
                        className="absolute top-4 left-0 h-1 bg-secondary-2 rounded transition-all duration-500 ease-in-out z-0"
                        style={{ width: `${((step - 1) / 3) * 100}%` }}
                   ></div>
                   
                   {/* Container Grouping */}
                   <div className="flex justify-between w-full">
                       {[
                           { id: 1, label: 'Data Diri' },
                           { id: 2, label: 'Toko' },
                           { id: 3, label: 'Alamat' },
                           { id: 4, label: 'Dokumen' }
                       ].map((item) => (
                           <div key={item.id} className="flex flex-col items-center">
                               {/* Lingkaran Nomor */}
                               <div 
                                   className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-xs transition-all duration-300 z-10
                                   ${step >= item.id 
                                       ? 'bg-secondary-2 border-secondary-2 text-white scale-110 shadow-md' 
                                       : 'bg-white border-gray-300 text-gray-400'
                                   }`}
                               >
                                   {step > item.id ? <CheckCircle size={16} /> : item.id}
                               </div>
                               
                               {/* Label Teks */}
                               <span className={`text-[10px] font-medium mt-2 uppercase tracking-wider text-center ${step >= item.id ? 'text-secondary-2 font-bold' : 'text-gray-400'}`}>
                                   {item.label}
                               </span>
                           </div>
                       ))}
                   </div>
                </div>
            </div>


            {/* Scrollable Form Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-10 md:px-12 pb-4">
                <form onSubmit={handleSubmit} noValidate>
                    
                    {/* STEP 1: DATA DIRI */}
                    {step === 1 && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-lg font-semibold text-secondary-2 border-b border-gray-200 pb-2 mb-4">1. Informasi Pribadi</h3>
                            <div>
                                <label className={labelClass}>Nama Lengkap (Sesuai KTP)</label>
                                <input type="text" name="nama" value={formData.nama} onChange={handleChange} className={getInputClass('nama')} placeholder="Contoh: Budi Santoso" autoFocus />
                                {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass('email')} placeholder="email@mahasiswa.ac.id" />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>No. Handphone (WA)</label>
                                    <input type="tel" name="no_handphone" value={formData.no_handphone} onChange={handleChange} className={getInputClass('no_handphone')} placeholder="08xxxxxxxxxx" inputMode="numeric" />
                                    {errors.no_handphone && <p className="text-red-500 text-xs mt-1">{errors.no_handphone}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={getInputClass('password')} placeholder="Min. 8 karakter" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1 font-poppins">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Konfirmasi Password</label>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"} name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className={getInputClass('password_confirmation')} placeholder="Ketik ulang password" />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                            {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 font-poppins">{errors.password_confirmation}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DATA TOKO */}
                    {step === 2 && (
                        <div className="space-y-4 animate-fade-in">
                             <h3 className="text-lg font-semibold text-secondary-2 border-b border-gray-200 pb-2 mb-4">2. Informasi Toko</h3>
                             <div>
                                <label className={labelClass}>Nama Toko</label>
                                <input type="text" name="nama_toko" value={formData.nama_toko} onChange={handleChange} className={getInputClass('nama_toko')} placeholder="Contoh: Snack Mahasiswa Enak" autoFocus />
                                {errors.nama_toko && <p className="text-red-500 text-xs mt-1">{errors.nama_toko}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi Singkat</label>
                                <input 
                                    type="text"
                                    name="deskripsi_singkat" 
                                    value={formData.deskripsi_singkat}
                                    onChange={handleChange} 
                                    className={getInputClass('deskripsi_singkat')}
                                    placeholder="Ceritakan sedikit tentang toko Anda dan apa yang Anda jual..."
                                />
                                {errors.deskripsi_singkat && <p className="text-red-500 text-xs mt-1">{errors.deskripsi_singkat}</p>}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: ALAMAT */}
                    {step === 3 && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-lg font-semibold text-secondary-2 border-b border-gray-200 pb-2 mb-4">3. Lokasi Penjual</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Provinsi</label>
                                    <select name="province_id" value={formData.province_id} onChange={(e) => handleDropdownChange(e, provinces, 'province_name', 'province_id')} className={getInputClass('province_id')}>
                                        <option value="">Pilih Provinsi</option>
                                        {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                                    </select>
                                    {errors.province_id && <p className="text-red-500 text-xs mt-1">Wajib dipilih</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Kabupaten/Kota</label>
                                    <select name="regency_id" value={formData.regency_id} onChange={(e) => handleDropdownChange(e, regencies, 'regency_name', 'regency_id')} disabled={!formData.province_id} className={getInputClass('regency_id')}>
                                        <option value="">{formData.province_id ? 'Pilih Kabupaten' : '-'}</option>
                                        {regencies.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
                                    </select>
                                    {errors.regency_id && <p className="text-red-500 text-xs mt-1">Wajib dipilih</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Kecamatan</label>
                                    <select name="district_id" value={formData.district_id} onChange={(e) => handleDropdownChange(e, districts, 'district_name', 'district_id')} disabled={!formData.regency_id} className={getInputClass('district_id')}>
                                        <option value="">{formData.regency_id ? 'Pilih Kecamatan' : '-'}</option>
                                        {districts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
                                    </select>
                                    {errors.district_id && <p className="text-red-500 text-xs mt-1">Wajib dipilih</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Desa/Kelurahan</label>
                                    <select name="village_id" value={formData.village_id} onChange={(e) => handleDropdownChange(e, villages, 'village_name', 'village_id')} disabled={!formData.district_id} className={getInputClass('village_id')}>
                                        <option value="">{formData.district_id ? 'Pilih Kelurahan' : '-'}</option>
                                        {villages.map(v => <option key={v.code} value={v.code}>{v.name}</option>)}
                                    </select>
                                    {errors.village_id && <p className="text-red-500 text-xs mt-1">Wajib dipilih</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-[1fr_auto] gap-4">
                                <div>
                                    <label className={labelClass}>Alamat Jalan / Detail</label>
                                    <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} className={getInputClass('alamat')} placeholder="Nama Jalan, No. Rumah, Patokan" />
                                    {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
                                </div>
                                <div className="w-32">
                                    <div className="flex gap-2">
                                        <div>
                                            <label className={labelClass}>RT</label>
                                            <input type="text" name="rt" value={formData.rt} onChange={handleChange} className={getInputClass('rt')} placeholder="001" maxLength="3" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>RW</label>
                                            <input type="text" name="rw" value={formData.rw} onChange={handleChange} className={getInputClass('rw')} placeholder="005" maxLength="3" />
                                        </div>
                                    </div>
                                    {(errors.rt || errors.rw) && <p className="text-red-500 text-xs mt-1">RT/RW Wajib diisi</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: DOKUMEN */}
                    {step === 4 && (
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-lg font-semibold text-secondary-2 border-b border-gray-200 pb-2 mb-4">4. Dokumen Verifikasi</h3>
                            
                            <div>
                                <label className={labelClass}>Nomor Induk Kependudukan (NIK)</label>
                                <input type="text" name="no_ktp" value={formData.no_ktp} onChange={handleChange} className={getInputClass('no_ktp')} placeholder="16 digit angka sesuai KTP" maxLength="16" />
                                {errors.no_ktp && <p className="text-red-500 text-xs mt-1">{Array.isArray(errors.no_ktp) ? errors.no_ktp[0] : errors.no_ktp}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Upload Foto Diri */}
                                <div className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all relative ${errors.foto ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-secondary-2 hover:bg-gray-50'}`}>
                                    {previewFoto && (
                                        <button 
                                            type="button" 
                                            onClick={(e) => { e.preventDefault(); setPreviewFoto(null); setFoto(null); }}
                                            className="absolute top-3 left-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                    <label className="cursor-pointer w-full h-full flex flex-col items-center">
                                        {previewFoto ? (
                                            <div className="relative">
                                                <img src={previewFoto} alt="Preview Foto" className="w-28 h-28 object-cover rounded-full shadow-md mb-2" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-gray-400">
                                                    <Upload size={22} />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">Upload Foto Profil</span>
                                                <span className="text-xs text-gray-400 mt-0.5">JPG/PNG, Max 2MB</span>
                                            </>
                                        )}
                                        <input type="file" name="foto" onChange={handleFileChange} className="hidden" accept="image/*" />
                                    </label>
                                    {errors.foto && <p className="text-red-500 text-xs mt-2">Foto wajib diupload</p>}
                                </div>

                                {/* Upload KTP */}
                                <div className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all relative ${errors.file_upload_ktp ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-secondary-2 hover:bg-gray-50'}`}>
                                    {previewKtp && (
                                        <button 
                                            type="button" 
                                            onClick={(e) => { e.preventDefault(); setPreviewKtp(null); setFileKtp(null); }}
                                            className="absolute top-3 left-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                    <label className="cursor-pointer w-full h-full flex flex-col items-center">
                                        {previewKtp ? (
                                            <div className="relative w-full">
                                                <img src={previewKtp} alt="Preview KTP" className="w-full h-24 object-contain rounded-lg shadow-md mb-2 bg-gray-50" />
                                            </div>
                                        ) : (
                                            <>
                                                 <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-2 text-gray-400">
                                                    <div className="w-9 h-5 border-2 border-gray-400 rounded-sm"></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">Upload Foto KTP</span>
                                                <span className="text-xs text-gray-400 mt-0.5">Pastikan tulisan terbaca</span>
                                            </>
                                        )}
                                        <input type="file" name="file_upload_ktp" onChange={handleFileChange} className="hidden" accept="image/*" />
                                    </label>
                                    {errors.file_upload_ktp && <p className="text-red-500 text-xs mt-2">Foto KTP wajib diupload</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Navigation Buttons */}
            <div className="px-10 md:px-12 py-5 bg-white flex justify-between gap-4">
                {step > 1 ? (
                    <button 
                        type="button" 
                        onClick={handleBack}
                        className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-semibold flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft size={18} /> Kembali
                    </button>
                ) : (
                    <div className="w-[10px]"></div> // Spacer
                )}
                
                {step < 4 ? (
                    <button 
                        type="button" 
                        onClick={handleNext}
                        className="px-8 py-3 bg-secondary-2 text-white rounded-lg hover:bg-red-700 font-bold shadow-lg shadow-red-100 flex items-center gap-2 transition-all hover:translate-x-1"
                    >
                        Lanjut <ArrowRight size={18} />
                    </button>
                ) : (
                    <button 
                        type="button" 
                        onClick={handleSubmit}
                        disabled={loading} 
                        className="px-8 py-3 bg-secondary-2 text-white rounded-lg hover:bg-red-700 font-bold shadow-lg shadow-red-100 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Memproses...' : 'Daftar Sekarang'} <CheckCircle size={18} />
                    </button>
                )}
            </div>
            
            <div className="px-10 md:px-12 pb-8 pt-6 bg-white">
                <div className="text-center font-poppins text-gray-600">
                    <p>
                        Sudah punya akun?{" "}
                        <Link to="/login" className="font-medium text-red-500 hover:underline ml-1">
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>

        </div>
      </div>
      
    </div>
  );
}

export default Register;