import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return null;
  }

  return (
    <footer className="bg-text-2 text-text">
      <div className="container mx-auto px-32 py-16">
        
        <div className="flex flex-col md:flex-row justify-between gap-10">
          
          <div className="space-y-4 md:w-1/3 lg:w-[400px]">
            <h3 className="text-2xl font-bold font-inter">MartPlace</h3>
            <p className="font-poppins text-sm leading-relaxed">
              MartPlace is a product catalog platform that enables 
              verified sellers to showcase their inventory. Public 
              visitors can search for products, as well as provide 
              ratings and comments without registration. The system 
              features email notifications, analytical dashboards, 
              and automated reporting to monitor store performance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-poppins font-medium">Support</h4>
            <div className="space-y-3 font-poppins text-sm">
              <p>
                Jl. Prof. Soedarto, Tembalang, Kec. Tembalang, 
                Kota Semarang, Jawa Tengah 50275
              </p>
              <p>martplace.ac@gmail.com</p>
              <p>+6285176909090</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-poppins font-medium">Account</h4>
            <ul className="space-y-3 font-poppins text-sm">
              <li><a href="#" className="hover:underline">My Account</a></li>
              <li><a href="#" className="hover:underline">Login / Register</a></li>
              <li><a href="#" className="hover:underline">Wishlist</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;