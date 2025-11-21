import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh] w-full bg-white">
      
      <div className="flex items-center gap-1.5 h-[40px]">
        
        <div 
          className="w-3 bg-[#DB4444] rounded-full animate-stretch"
        ></div>
        
        <div 
          className="w-3 bg-[#DB4444] rounded-full animate-stretch"
          style={{ animationDelay: '0.1s' }}
        ></div>
        
        <div 
          className="w-3 bg-[#DB4444] rounded-full animate-stretch"
          style={{ animationDelay: '0.2s' }}
        ></div>
        
      </div>

    </div>
  );
};

export default Loader;