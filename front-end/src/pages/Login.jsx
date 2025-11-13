import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setLoading(true);       
    setError(null);         

    try {
      await axios.get('/sanctum/csrf-cookie');

      const response = await axios.post('/api/login', {
        email: email,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }

      const user = response.data.user;

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'penjual') {
        navigate('/penjual/dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error("Login gagal:", error);
      setError("Email atau Password yang Anda masukkan salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
      <h1>Login</h1>
      <p>Silakan login sebagai Admin atau Penjual.</p>

      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <button 
            type="submit" 
            disabled={loading} 
            style={{ width: '100%', padding: '10px', cursor: 'pointer' }}
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Belum punya akun penjual? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default Login;