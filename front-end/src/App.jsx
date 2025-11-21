import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

// --- UPDATE IMPORT ---
import SellerLayout from './components/penjual/SellerLayout'; 
import PenjualDashboard from './pages/penjual/PenjualDashboard';
import ProdukManajemen from './pages/penjual/ProdukManajemen';
import CreateProduct from './pages/penjual/CreateProduct';

import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './components/common/PrivateRoute';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const location = useLocation();
  
  // Cek apakah sedang di halaman dashboard (admin atau penjual)
  const isDashboardRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/penjual');
  
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Navbar Global */}
      {!isDashboardRoute && <Navbar />}

      <main className={isDashboardRoute ? "" : "flex-grow container mx-auto px-4 md:px-32 py-4"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* --- SELLER ROUTES --- */}
          <Route path="/penjual" element={<PrivateRoute />}>
            <Route element={<SellerLayout />}>
               {/* Redirect default ke dashboard overview */}
               <Route index element={<Navigate to="/penjual/dashboard" replace />} />
               
               {/* Menu 1: Dashboard Overview */}
               <Route path="dashboard" element={<PenjualDashboard />} />
               
               {/* Menu 2: Produk Manajemen */}
               <Route path="products" element={<ProdukManajemen />} />
               
               {/* Menu 3: Create Product */}
               <Route path="products/create" element={<CreateProduct />} />
            </Route>
          </Route>

          {/* --- ADMIN ROUTES --- */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer Global */}
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default App;