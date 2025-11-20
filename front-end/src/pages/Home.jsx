import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductSection from '../components/ProductSection';

function Home() {
  return (
    <>
      <Hero /> 
      <CategorySection />
      <ProductSection />
    </>
  );
}

export default Home;