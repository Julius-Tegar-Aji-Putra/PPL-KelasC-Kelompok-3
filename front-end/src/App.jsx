import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import PenjualDashboard from './pages/penjual/PenjualDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}

      <main className={isAdminRoute ? "" : "flex-grow container mx-auto px-32 py-4"}>
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

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;