import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LoginIllustration from "../assets/images/Login.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
      });

      const { token, user } = response.data;

      if (user.role === "penjual" && user.status !== "active") {
        setError(
          "Akun Anda masih dalam peninjauan (Inactive). Silakan tunggu verifikasi dari Admin."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const navigationState = {
        state: {
          showWelcome: true,
          userName: user.nama,
        },
      };

      if (user.role === "admin") {
        navigate("/admin/dashboard", navigationState);
      } else if (user.role === "penjual") {
        navigate("/penjual/dashboard", navigationState);
      } else {
        navigate("/", navigationState);
      }
    } catch (error) {
      console.error("Login gagal:", error);
      if (error.response && error.response.status === 422) {
        setError("Email atau Password yang Anda masukkan salah.");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="w-full bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.08),0_0_10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row max-w-5xl border border-gray-100">
        
        {/* LEFT IMAGE */}
        <div className="hidden md:flex w-full md:w-1/2 bg-white items-center justify-center p-10">
          <div className="text-center">
            <img
              src={LoginIllustration}
              alt="Login Illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-inter text-text-2 mb-2">
            Log in to MartPlace
          </h2>
          <p className="text-gray-500 font-poppins mb-8">
            Enter your details below
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-0 py-3 border-b border-gray-300 focus:border-secondary-2 focus:outline-none transition-colors bg-transparent font-poppins text-text-2 placeholder-gray-400"
              />
            </div>

            {/* PASSWORD + SHOW/HIDE */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-0 py-3 pr-10 border-b border-gray-300 focus:border-secondary-2 focus:outline-none transition-colors bg-transparent font-poppins text-text-2 placeholder-gray-400"
              />

              {/* ICON BUTTON */}
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* SUBMIT */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary-2 text-white font-medium py-4 rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-100 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>

          {/* REGISTER LINK */}
          <div className="mt-8 text-center font-poppins text-gray-600">
            <p>
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-medium text-secondary-2 hover:underline ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;