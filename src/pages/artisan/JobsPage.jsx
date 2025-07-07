import React, { useState, useEffect } from 'react';
import RatingStars from '../../components/ui/RatingStars';
import { useAuth } from '../../contexts/AuthContext';
import * as jobRequestsService from '../../utils/jobRequestsService';

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
     const fetchedJobs = jobRequestsService.getJobsByArtisan(currentUser.id);
      setJobs(fetchedJobs);
    }
  }, [currentUser]);

  const handleAccept = (jobId) => {
    const updatedJob = jobRequestsService.acceptJobRequest(jobId, currentUser.id);
    setJobs(jobs.map(job => job.id === jobId ? updatedJob : job));
  };

  const handleDecline = (jobId) => {
    const updatedJob = jobRequestsService.declineJobRequest(jobId);
    setJobs(jobs.map(job => job.id === jobId ? updatedJob : job));
  };

  const handleComplete = (jobId) => {
    const updatedJob = jobRequestsService.markJobAsCompleted(jobId);
    setJobs(jobs.map(job => job.id === jobId ? updatedJob : job));
  };

  const filteredJobs = jobs.filter(job => job.status === activeTab);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Job Requests</h1>
          <p className="text-gray-600">Manage your incoming job requests and scheduled work</p>
        </div>

        <div className="border-b">
          <nav className="flex">
            {['pending', 'accepted', 'completed'].map(tab => (
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
                      <i className="fas fa-user mr-2"></i>
                      <span>{job.clientName || 'Client Name'}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(job.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.budget || 'Negotiable'}
                  </span>
                </div>

                <p className="mt-4 text-gray-600">{job.description}</p>

                {job.scheduledAt && (
                  <div className="mt-4 flex items-center">
                    <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
                    <span>Scheduled: {new Date(job.scheduledAt).toLocaleString()}</span>
                  </div>
                )}

                {job.completedAt && (
                  <div className="mt-4 flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Completed: {new Date(job.completedAt).toLocaleDateString()}</span>
                    {job.rating && (
                      <span className="ml-4 flex items-center">
                        <RatingStars rating={job.rating} size="sm" />
                        <span className="ml-2">{job.rating}</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-6 flex gap-3 flex-wrap">
                  {activeTab === 'pending' && (
                    <>
                      <button onClick={() => handleAccept(job.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Accept</button>
                      <button onClick={() => handleDecline(job.id)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Decline</button>
                    </>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">Message Client</button>
                  {activeTab === 'accepted' && (
                    <button onClick={() => handleComplete(job.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Mark as Completed</button>
                  )}
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <p className="text-gray-500 text-center">No {activeTab} jobs at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
