import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dummyUserJobs from '../data/dummyUserJobs';

const UserJobsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const currentUser = { id: 'user-123', name: 'Ama Mensah' };

  useEffect(() => {
    const fetchedJobs = dummyUserJobs.filter(job => job.userId === currentUser.id);
    setJobs(fetchedJobs);
  }, []);

  const handleCancelJob = (jobId) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, status: 'cancelled' } : job
      )
    );
  };

  const filteredJobs = jobs.filter(job => job.status === activeTab);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">My Job Requests</h1>
          <p className="text-gray-600">Track, edit, and manage your service requests easily.</p>
        </div>

        <div className="border-b">
          <nav className="flex">
            {['pending', 'accepted', 'completed', 'cancelled'].map(tab => (
              <button
                key={tab}
                className={`px-6 py-4 font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold capitalize">{activeTab} Jobs</h2>
            <p className="text-gray-600">{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="space-y-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <i className="fas fa-clock mr-2"></i>
                      <span>{new Date(job.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.budget || 'Negotiable'}
                  </span>
                </div>

                <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>

                {job.scheduledAt && (
                  <div className="mt-2 text-sm text-gray-500">
                    <i className="fas fa-calendar-alt mr-1"></i>
                    Scheduled: {new Date(job.scheduledAt).toLocaleString()}
                  </div>
                )}

                <div className="mt-6 flex gap-3 flex-wrap">
                  <button onClick={() => navigate(`/my-jobs/${job.id}`)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">View</button>
                  {(activeTab === 'pending' || activeTab === 'accepted') && (
                    <button onClick={() => handleCancelJob(job.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
                  )}
                  {activeTab === 'completed' && !job.artisanReview && (
                    <button onClick={() => navigate(`/my-jobs/${job.id}/review`)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Leave Review</button>
                  )}
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <p className="text-gray-500 text-center">No {activeTab} jobs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserJobsPage