import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Artisan Dashboard</h1>
              <p className="text-blue-100">Welcome back, {currentUser?.name || 'Artisan'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg">
                <i className="fas fa-bell"></i>
              </button>
              <div className="relative">
                <button className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                        <i className="fas fa-user text-gray-400"></i>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex overflow-x-auto">
            <NavLink 
              to="/artisan" 
              className={`px-6 py-3 font-medium ${isActive('/artisan') ? 'border-b-4 border-white' : 'text-blue-200 hover:text-white'}`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/artisan/profile" 
              className={`px-6 py-3 font-medium ${isActive('/artisan/profile') ? 'border-b-4 border-white' : 'text-blue-200 hover:text-white'}`}
            >
              Profile
            </NavLink>
            <NavLink 
              to="/artisan/jobs" 
              className={`px-6 py-3 font-medium ${isActive('/artisan/jobs') ? 'border-b-4 border-white' : 'text-blue-200 hover:text-white'}`}
            >
              Job Requests
            </NavLink>
            <button 
              onClick={logout}
              className="px-6 py-3 font-medium text-blue-200 hover:text-white ml-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;