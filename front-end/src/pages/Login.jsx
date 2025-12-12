import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import LoginIllustration from "../assets/images/Login.svg";
import CustomToast from "../components/common/CustomToast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [errors, setErrors] = useState({}); 
  const [generalError, setGeneralError] = useState(null);
  const [toast, setToast] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Cek apakah ada state 'successMessage' yang dikirim dari navigasi
    if (location.state?.showToast && location.state?.successMessage) {
      setToast({
        message: location.state.successMessage,
        type: "success",
      });

      // Bersihkan history state agar toast tidak muncul lagi saat refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // --- LOGIKA VALIDASI ---
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // 1. Validasi Email
    if (!email) {
      tempErrors.email = "Email wajib diisi.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Pesan error tanpa emoji
      tempErrors.email = "Format email salah. Harap sertakan '@' dan domain (contoh: user@email.com).";
      isValid = false;
    }

    // 2. Validasi Password
    if (!password) {
      tempErrors.password = "Kata sandi wajib diisi.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return; 
    }

    setLoading(true);
    setErrors({});
    setGeneralError(null);

    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
      });

      const { token, user } = response.data;

      if (user.role === "penjual" && user.status !== "active") {
        setGeneralError("Akun sedang diverifikasi Admin. Mohon tunggu.");
        setLoading(false);
        return;
      }

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const navigationState = { state: { showWelcome: true, userName: user.nama } };

      if (user.role === "admin") navigate("/admin/dashboard", navigationState);
      else if (user.role === "penjual") navigate("/penjual/dashboard", navigationState);
      else navigate("/", navigationState);

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const serverErrors = error.response.data.errors;
        let newErrors = {};
        if (serverErrors.email) newErrors.email = serverErrors.email[0];
        if (serverErrors.password) newErrors.password = serverErrors.password[0];
        setErrors(newErrors);
      } else {
        setGeneralError("Email atau kata sandi salah.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center py-12 bg-white relative">
      {/* --- RENDER TOAST --- */}
      {toast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Tombol Kembali ke Homepage */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-secondary-2 font-medium transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Kembali ke Beranda</span>
      </Link>
      
      <div className="w-full bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.08),0_0_10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row max-w-5xl border border-gray-100">
        
        {/* Gambar Ilustrasi */}
        <div className="hidden md:flex w-full md:w-1/2 bg-white items-center justify-center p-10">
          <div className="text-center">
            <img src={LoginIllustration} alt="Login Illustration" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Form Login */}
        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-inter text-gray-800 mb-2">Masuk ke MartPlace</h2>
          <p className="text-gray-500 font-poppins mb-8">Masukkan detail Anda di bawah ini</p>

          {/* Alert Error Umum */}
          {generalError && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm border border-red-100 font-medium">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Input Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if(errors.email) setErrors({...errors, email: null});
                }}
                // PERBAIKAN DI SINI:
                // text-gray-800 selalu dipakai (tidak berubah jadi merah).
                // Hanya border yang berubah warna.
                className={`w-full px-0 py-3 border-b focus:outline-none transition-colors bg-transparent font-poppins placeholder-gray-400 text-gray-800
                  ${errors.email 
                    ? 'border-red-500 focus:border-red-500' // Error: Border Merah
                    : 'border-gray-300 focus:border-blue-500' // Normal: Border Abu/Biru
                  }`}
              />
              {/* Pesan Error di Bawah (Tanpa Emoji) */}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-poppins">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Input Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if(errors.password) setErrors({...errors, password: null});
                }}
                className={`w-full px-0 py-3 pr-10 border-b focus:outline-none transition-colors bg-transparent font-poppins placeholder-gray-400 text-gray-800
                  ${errors.password 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                  }`}
              />
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-poppins">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white font-medium py-4 rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-100 disabled:opacity-70"
              >
                {loading ? "Sedang Masuk..." : "Masuk"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center font-poppins text-gray-600">
            <p>
              Belum punya akun?{" "}
              <Link to="/register" className="font-medium text-red-500 hover:underline ml-1">
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Login;