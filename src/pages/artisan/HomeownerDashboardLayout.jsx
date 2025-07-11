import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HomeownerDashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Homeowner Dashboard</h1>
              <p className="text-green-100">Welcome, {currentUser?.name || 'Homeowner'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={logout} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">Logout</button>
            </div>
          </div>

          <div className="mt-6 flex overflow-x-auto">
            <button onClick={() => navigate('/homeowner')} className={`px-6 py-3 font-medium ${isActive('/homeowner') ? 'border-b-4 border-white' : 'text-green-200 hover:text-white'}`}>Dashboard</button>
            <button onClick={() => navigate('/homeowner/my-jobs')} className={`px-6 py-3 font-medium ${isActive('/homeowner/my-jobs') ? 'border-b-4 border-white' : 'text-green-200 hover:text-white'}`}>My Jobs</button>
            <button onClick={() => navigate('/homeowner/profile')} className={`px-6 py-3 font-medium ${isActive('/homeowner/profile') ? 'border-b-4 border-white' : 'text-green-200 hover:text-white'}`}>Profile</button>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeownerDashboardLayout;
