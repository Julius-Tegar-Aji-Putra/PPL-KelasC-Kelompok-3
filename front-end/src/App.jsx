import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import PenjualDashboard from './pages/penjual/PenjualDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './components/common/PrivateRoute';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/penjual');
  
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {!isDashboardRoute && <Navbar />}

      <main className={isDashboardRoute ? "" : "flex-grow container mx-auto px-4 md:px-32 py-4"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route element={<PrivateRoute />}>
            <Route path="/penjual/dashboard" element={<PenjualDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default App;
