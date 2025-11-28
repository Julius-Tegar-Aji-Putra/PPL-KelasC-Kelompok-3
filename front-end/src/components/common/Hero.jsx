//
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import BannerIllustration from '../../assets/images/Banner.svg';

function Hero() {
  const handleScroll = (e) => {
    e.preventDefault(); 
    const element = document.getElementById('produk-kami');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

  return (
    <div className="bg-text-2 text-text rounded-lg h-[344px] relative overflow-hidden">
      <div className="flex justify-between items-center h-full px-12">
        
        {/* PERBAIKAN DI SINI: Ubah w-[400px] menjadi w-[500px] atau w-full md:w-3/5 */}
        <div className="space-y-6 text-left w-full md:w-[500px] z-10">
          
          <h1 className="text-5xl font-inter font-bold leading-tight">
            Selamat Datang di<br/>MartPlace
          </h1>
          
          <p className="text-base font-poppins text-gray-300 max-w-[450px]">
            Platform katalog kebutuhan mahasiswa.
          </p>
          
          <a 
            href="#produk-kami" 
            onClick={handleScroll}
            className="cursor-pointer inline-flex items-center gap-2 font-poppins font-medium text-base text-primary hover:underline transition-all hover:gap-4"
          >
            Belanja Sekarang <FiArrowRight />
          </a>
        </div>

        <div className="hidden md:block absolute right-10 bottom-8"> 
          <img 
            src={BannerIllustration} 
            alt="MartPlace Illustration" 
            className="w-[420px] h-[280px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;