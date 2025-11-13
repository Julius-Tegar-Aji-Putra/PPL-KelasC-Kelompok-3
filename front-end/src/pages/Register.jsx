import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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

  // State terpisah untuk file
  const [foto, setFoto] = useState(null);
  const [fileKtp, setFileKtp] = useState(null);

  // State untuk dropdown API
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // State untuk error & loading
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --- LOGIKA API WILAYAH ---

  // 1. Ambil Provinsi saat load
  useEffect(() => {
    // Panggil backend kita, BUKAN wilayah.id
    axios.get('/api/wilayah/provinces') 
    .then(response => setProvinces(response.data.data))
    .catch(error => console.error("Error fetching provinces:", error));
  }, []);

  // 2. Ambil Kabupaten saat province_id berubah
  useEffect(() => {
    if (formData.province_id) {
      // Panggil backend kita dengan query parameter
      axios.get(`/api/wilayah/regencies?province_id=${formData.province_id}`)
        .then(response => setRegencies(response.data.data))
        .catch(error => console.error("Error fetching regencies:", error));
    }
  }, [formData.province_id]);

  // 3. Ambil Kecamatan saat regency_id berubah
  useEffect(() => {
    if (formData.regency_id) {
      axios.get(`/api/wilayah/districts?regency_id=${formData.regency_id}`)
        .then(response => setDistricts(response.data.data))
        .catch(error => console.error("Error fetching districts:", error));
    }
  }, [formData.regency_id]);

  // 4. Ambil Kelurahan saat district_id berubah
  useEffect(() => {
    if (formData.district_id) {
      axios.get(`/api/wilayah/villages?district_id=${formData.district_id}`)
        .then(response => setVillages(response.data.data))
        .catch(error => console.error("Error fetching villages:", error));
    }
  }, [formData.district_id]);

  // --- HANDLER ---
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'foto') {
      setFoto(files[0]);
    } else if (name === 'file_upload_ktp') {
      setFileKtp(files[0]);
    }
  };

  // Handler khusus untuk dropdown (untuk menyimpan 'name' dan 'id')
  const handleDropdownChange = (e, list, nameKey, idKey) => {
    const selectedId = e.target.value;
    const selectedItem = list.find(item => item.code === selectedId);
    
    setFormData(prev => ({
      ...prev,
      [idKey]: selectedId,
      [nameKey]: selectedItem ? selectedItem.name : '',
    }));

    // Reset dropdown anak
    if (idKey === 'province_id') {
      setRegencies([]);
      setDistricts([]);
      setVillages([]);
      setFormData(prev => ({ ...prev, regency_id: '', district_id: '', village_id: '' }));
    } else if (idKey === 'regency_id') {
      setDistricts([]);
      setVillages([]);
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

    // 1. Buat FormData untuk mengirim data (karena ada file)
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('foto', foto);
    data.append('file_upload_ktp', fileKtp);

    try {
      // 2. Panggil API Registrasi (Token Auth)
      const response = await axios.post('/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 3. Jika berhasil, simpan token & user
      const { token, user } = response.data;
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 4. Arahkan ke dashboard
      navigate('/penjual/dashboard');

    } catch (error) {
    if (error.response && error.response.status === 422) {
        console.log('Validation errors:', error.response.data);
        setErrors(error.response.data.errors || {});
        const errorMessages = Object.values(error.response.data.errors || {})
            .flat()
            .join('\n');
        alert(`❌ Registrasi Gagal:\n\n${errorMessages}`);
        
    } else {
        console.error("Registrasi gagal:", error);
        alert('❌ Terjadi kesalahan pada server. Silakan coba lagi.');
    }
    } finally {
        setLoading(false);
    }
  };

  // Helper untuk menampilkan error validasi
  const getError = (field) => {
    if (errors[field]) {
        const errorMsg = Array.isArray(errors[field]) ? errors[field][0] : errors[field];
        return <span style={styles.errorText}>{errorMsg}</span>;
    }
    return null;
  };

  // --- TAMPILAN JSX (Desain "Pantes") ---
  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Registrasi Penjual</h1>
        <p style={styles.subtitle}>Buat akun toko Anda untuk mulai berjualan.</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* --- Data Akun --- */}
          <h2 style={styles.sectionTitle}>Data Akun</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Lengkap</label>
            <input type="text" name="nama" onChange={handleChange} style={styles.input} />
            {getError('nama')}
          </div>
          <div style={styles.grid2Col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input type="email" name="email" onChange={handleChange} style={styles.input} />
              {getError('email')}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>No. Handphone</label>
              <input type="tel" name="no_handphone" onChange={handleChange} style={styles.input} />
              {getError('no_handphone')}
            </div>
          </div>
          <div style={styles.grid2Col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" name="password" onChange={handleChange} style={styles.input} />
              {getError('password')}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Konfirmasi Password</label>
              <input type="password" name="password_confirmation" onChange={handleChange} style={styles.input} />
            </div>
          </div>

          {/* --- Data Toko --- */}
          <h2 style={styles.sectionTitle}>Data Toko</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Toko</label>
            <input type="text" name="nama_toko" onChange={handleChange} style={styles.input} />
            {getError('nama_toko')}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Deskripsi Singkat Toko</label>
            <textarea name="deskripsi_singkat" onChange={handleChange} style={styles.textarea}></textarea>
            {getError('deskripsi_singkat')}
          </div>

          {/* --- Data Alamat --- */}
          <h2 style={styles.sectionTitle}>Alamat</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Alamat Jalan</label>
            <input type="text" name="alamat" onChange={handleChange} style={styles.input} />
            {getError('alamat')}
          </div>
          <div style={styles.grid2Col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>RT</label>
              <input type="text" name="rt" onChange={handleChange} style={styles.input} maxLength="3" />
              {getError('rt')}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>RW</label>
              <input type="text" name="rw" onChange={handleChange} style={styles.input} maxLength="3" />
              {getError('rw')}
            </div>
          </div>
          <div style={styles.grid2Col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Provinsi</label>
              <select name="province_id" style={styles.select} value={formData.province_id} onChange={(e) => handleDropdownChange(e, provinces, 'province_name', 'province_id')}>
                <option value="">Pilih Provinsi</option>
                {provinces.map(prov => <option key={prov.code} value={prov.code}>{prov.name}</option>)}
              </select>
              {getError('province_id')}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Kabupaten/Kota</label>
              <select name="regency_id" style={styles.select} value={formData.regency_id} onChange={(e) => handleDropdownChange(e, regencies, 'regency_name', 'regency_id')} disabled={!formData.province_id}>
                <option value="">Pilih Kabupaten/Kota</option>
                {regencies.map(reg => <option key={reg.code} value={reg.code}>{reg.name}</option>)}
              </select>
              {getError('regency_id')}
            </div>
          </div>
          <div style={styles.grid2Col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Kecamatan</label>
              <select name="district_id" style={styles.select} value={formData.district_id} onChange={(e) => handleDropdownChange(e, districts, 'district_name', 'district_id')} disabled={!formData.regency_id}>
                <option value="">Pilih Kecamatan</option>
                {districts.map(dist => <option key={dist.code} value={dist.code}>{dist.name}</option>)}
              </select>
              {getError('district_id')}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Kelurahan/Desa</label>
              <select name="village_id" style={styles.select} value={formData.village_id} onChange={(e) => handleDropdownChange(e, villages, 'village_name', 'village_id')} disabled={!formData.district_id}>
                <option value="">Pilih Kelurahan/Desa</option>
                {villages.map(vill => <option key={vill.code} value={vill.code}>{vill.name}</option>)}
              </select>
              {getError('village_id')}
            </div>
          </div>

          {/* --- Data Identitas --- */}
          <h2 style={styles.sectionTitle}>Identitas Diri</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>No. KTP</label>
            <input type="text" name="no_ktp" onChange={handleChange} style={styles.input} maxLength="16" />
            {getError('no_ktp')}
          </div>
          <div style={styles.grid2Col}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Foto Diri</label>
              <input type="file" name="foto" onChange={handleFileChange} style={styles.input} accept="image/*" />
              {getError('foto')}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Foto KTP</label>
              <input type="file" name="file_upload_ktp" onChange={handleFileChange} style={styles.input} accept="image/*" />
              {getError('file_upload_ktp')}
            </div>
          </div>

          {/* --- Submit --- */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p style={styles.footerText}>
          Sudah punya akun? <Link to="/login" style={styles.link}>Login di sini</Link>
        </p>
      </div>
    </div>
  );
}

// --- STYLES (Desain "Pantes") ---

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align ke atas
    padding: '40px 20px',
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
  },
  formBox: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    margin: '0 0 10px 0',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    margin: '0 0 30px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionTitle: {
    color: '#34495e',
    borderBottom: '2px solid #ecf0f1',
    paddingBottom: '8px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    color: '#34495e',
    fontWeight: '600',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #bdc3c7',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box', // Penting untuk padding
  },
  textarea: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #bdc3c7',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    minHeight: '80px',
    fontFamily: 'inherit',
  },
  select: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #bdc3c7',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  button: {
    padding: '15px 20px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#7f8c8d',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '5px',
  }
};

export default Register;