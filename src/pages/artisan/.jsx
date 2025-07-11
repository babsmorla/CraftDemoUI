import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dummyUserJobs from '../data/dummyUserJobs';
import RatingStars from '../../components/ui/RatingStars';

const UserJobsPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setJobs(dummyUserJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'active') return job.status === 'active';
    if (activeTab === 'completed') return job.status === 'completed';
    if (activeTab === 'cancelled') return job.status === 'cancelled';
    return false;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">My Job Requests</h1>
          <p className="text-gray-600">Track your service requests and engage artisans</p>
        </div>

        <div className="border-b flex">
          {['active', 'completed', 'cancelled'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium ${activeTab === tab ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-600 hover:text-yellow-600'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="border rounded p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="text-gray-500 text-sm">{job.location} • {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">{job.status}</span>
              </div>

              <p className="mt-3 text-gray-700">{job.description}</p>

              {job.scheduledAt && (
                <p className="text-sm text-gray-500 mt-1">Scheduled: {new Date(job.scheduledAt).toLocaleString()}</p>
              )}

              {job.status === 'completed' && job.rating && (
                <div className="flex items-center mt-2">
                  <RatingStars rating={job.rating} size="sm" />
                  <span className="ml-2 text-gray-600 text-sm">{job.rating} / 5</span>
                </div>
              )}

              {/* Uploaded images preview */}
              {job.images && job.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`job-${idx}`} className="w-20 h-20 object-cover rounded border" />
                  ))}
                </div>
              )}

              <div className="flex gap-2 flex-wrap mt-4">
                {job.status !== 'completed' && job.status !== 'cancelled' && (
                  <button
                    onClick={() => navigate(`/my-jobs/${job.id}/edit`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Edit Request
                  </button>
                )}
                {job.status === 'completed' && !job.reviewLeft && (
                  <button
                    onClick={() => navigate(`/my-jobs/${job.id}/review`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    Leave Review
                  </button>
                )}
                <button
                  onClick={() => navigate(`/my-jobs/${job.id}`)}
                  className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <p className="text-center text-gray-500">No {activeTab} jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserJobsPage;
