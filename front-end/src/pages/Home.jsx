import React from 'react';
import Hero from '../components/common/Hero';
import CategorySection from '../components/common/CategorySection';
import ProductSection from '../components/common/ProductSection';

function Home() {
  return (
    <>
      <Hero /> 
      <CategorySection />
      
      <div id="produk-kami">
        <ProductSection />
      </div>
    </>
  );
}

export default Home;