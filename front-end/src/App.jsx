import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Halaman
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import PenjualDashboard from './pages/penjual/PenjualDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Import Komponen Pengaman
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar /> 

      <main className="flex-grow container mx-auto px-32 py-4">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* --- PROTECTED ROUTES (Hanya yang login) --- */}
          <Route element={<PrivateRoute />}>
            <Route path="/penjual/dashboard" element={<PenjualDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Fallback jika halaman tidak ketemu */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;