import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../ui/SearchBar';

const HeroSection = () => {
  return (
    <section 
      className="hero-bg text-white flex items-center"
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.7), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat",
        height: "90vh",
        minHeight: "600px"
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Trusted Artisans in Ghana</h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Connecting you with skilled professionals for all your home and business needs
        </p>
        
        <SearchBar />
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link 
            to="/search" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Find Artisans
          </Link>
          <Link 
            to="/signup" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium"
          >
            Join as Artisan
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;