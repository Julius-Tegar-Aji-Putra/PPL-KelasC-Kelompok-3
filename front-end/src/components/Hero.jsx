import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import BannerIllustration from '../assets/images/Banner.svg';

function Hero() {
  return (
    <div className="bg-text-2 text-text rounded-lg h-[344px] relative overflow-hidden">
      <div className="flex justify-between items-center h-full px-12">
        <div className="space-y-6 text-left w-[380px]">
          <h1 className="text-5xl font-inter font-bold leading-tight">
            Welcome to<br/>MartPlace
          </h1>
          
          <p className="text-base font-poppins text-gray-300">
            Buy and sell everything you need for campus life.
          </p>
          
          <a 
            href="#" 
            className="inline-flex items-center gap-2 font-poppins font-medium text-base text-primary hover:underline transition-all hover:gap-4"
          >
            Shop Now <FiArrowRight />
          </a>
        </div>

        <div className="hidden md:block"> 
          <img 
            src={BannerIllustration} 
            alt="MartPlace Illustration" 
            className="rounded-lg w-[420px] h-[280px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;