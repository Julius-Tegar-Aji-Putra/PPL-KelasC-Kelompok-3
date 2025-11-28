//
import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

// --- SELLER IMPORTS ---
import SellerLayout from './components/penjual/SellerLayout'; 
import PenjualDashboard from './pages/penjual/PenjualDashboard';
import ProdukManajemen from './pages/penjual/ProdukManajemen';
import CreateProduct from './pages/penjual/CreateProduct';

// --- ADMIN IMPORTS (BARU) ---
import AdminLayout from './components/admin/AdminLayout'; // Layout baru
import AdminOverview from './pages/admin/AdminOverview';   // Dashboard Overview
import SellerVerification from './pages/admin/SellerVerification'; // Halaman Verifikasi
import AdminReports from './pages/admin/AdminReports';
import SellerReports from './pages/penjual/SellerReports';

import PrivateRoute from './components/common/PrivateRoute';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const location = useLocation();
  
  // Cek apakah sedang di halaman dashboard (admin atau penjual)
  // Logic ini menyembunyikan Navbar & Footer global saat di dashboard
  const isDashboardRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/penjual');
  
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Navbar Global (Hanya muncul di halaman publik) */}
      {!isDashboardRoute && <Navbar />}

      <main className={isDashboardRoute ? "" : "flex-grow container mx-auto px-4 md:px-32 py-4"}>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* --- SELLER ROUTES --- */}
          <Route path="/penjual" element={<PrivateRoute />}>
            <Route element={<SellerLayout />}>
               <Route index element={<Navigate to="/penjual/dashboard" replace />} />
               <Route path="dashboard" element={<PenjualDashboard />} />
               <Route path="products" element={<ProdukManajemen />} />
               <Route path="products/create" element={<CreateProduct />} />
               
               {/* ROUTE BARU PENJUAL */}
               <Route path="reports" element={<SellerReports />} />
            </Route>
          </Route>

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
               <Route index element={<Navigate to="/admin/dashboard" replace />} />
               <Route path="dashboard" element={<AdminOverview />} />
               <Route path="verification" element={<SellerVerification />} />
               
               {/* ROUTE BARU ADMIN */}
               <Route path="reports" element={<AdminReports />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer Global */}
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default App;