import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar /> 

      <main className="flex-grow container mx-auto px-32 py-4">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}

export default App;