import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeownerDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Homeowner Dashboard</h1>
      <p className="text-gray-600 mb-6">Track your job requests, manage your profile, and monitor progress on your projects easily.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">My Jobs</h2>
          <p className="text-gray-600 mb-4">Manage your pending, active, completed, and cancelled jobs here.</p>
          <button onClick={() => navigate('/homeowner/my-jobs')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Go to My Jobs</button>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600 mb-4">View and update your homeowner profile information.</p>
          <button onClick={() => navigate('/homeowner/profile')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">View Profile</button>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Request New Job</h2>
          <p className="text-gray-600 mb-4">Post a new job request and connect with artisans easily.</p>
          <button onClick={() => navigate('/homeowner/request')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Request Job</button>
        </div>
      </div>
    </div>
  );
};

export default HomeownerDashboardPage;
