import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { artisanJobs } from "../data/dummyData";

const ArtisanJobsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // In production, this would come from auth context
  const currentArtisanId = "art_789";

  // API CALL: This would be replaced with actual API fetch
  useEffect(() => {
    // Simulating API call
    const artisanJobsData = artisanJobs.filter(job => job.artisanId === currentArtisanId);
    setJobs(artisanJobsData);
  }, []);

  // API CALL: This would be an actual API call in production
  const handleDecline = (data) => {
    if (!selectedJobId) return;

    // Simulating API response
    const updatedJobs = jobs.map(job => 
      job.id === selectedJobId ? { 
        ...job, 
        status: "declined",
        declineReason: data.reason
      } : job
    );
    
    setJobs(updatedJobs);
    setShowDeclineModal(false);
    setSelectedJobId(null);
    reset();
  };

  // API CALL: Accept job
  const handleAcceptJob = (jobId) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, status: "accepted" } : job
    );
    setJobs(updatedJobs);
  };

  // API CALL: Mark job as completed
  const handleCompleteJob = (jobId) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId ? { ...job, status: "completed" } : job
    );
    setJobs(updatedJobs);
  };

  // Helper functions
  const getStatusCount = (tab) => {
    return jobs.filter(job => {
      if (tab === "completed") return job.status === "completed";
      if (tab === "active") return job.status === "accepted";
      if (tab === "cancelled") return job.status === "cancelled";
      if (tab === "declined") return job.status === "declined";
      return job.status === "pending";
    }).length;
  };

  const filteredJobs = jobs.filter(job => {
    if (activeTab === "completed") return job.status === "completed";
    if (activeTab === "active") return job.status === "accepted";
    if (activeTab === "cancelled") return job.status === "cancelled";
    if (activeTab === "declined") return job.status === "declined";
    return job.status === "pending";
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    declined: "bg-purple-100 text-purple-800",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Decline Reason Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Reason for Declining</h3>
              <button 
                onClick={() => {
                  setShowDeclineModal(false);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(handleDecline)}>
              <div className="mb-4">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Please explain why you're declining this job
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="I need to decline because..."
                  {...register("reason", { required: "Reason is required" })}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeclineModal(false);
                    reset();
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                >
                  Confirm Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              My Job Requests
            </h1>
            <p className="text-gray-600 mt-1">
              Kwame's Plumbing Services • kwame.plumbing@example.com
            </p>
          </div>
          <button
            onClick={() => navigate("/artisan/profile/edit")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto text-center"
          >
            Edit Profile
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-6 pb-1">
          {["pending", "active", "completed", "cancelled", "declined"].map(
            (tab) => (
              <button
                key={tab}
                className={`py-3 px-4 font-medium text-sm transition-colors whitespace-nowrap relative ${
                  activeTab === tab
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                  {getStatusCount(tab)}
                </span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No {activeTab} jobs available
            </h3>
            <p className="text-gray-500">
              {activeTab === "pending"
                ? "You don't have any pending job requests at the moment."
                : `You don't have any ${activeTab} jobs at the moment.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {job.title}
                      </h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1.5 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        Scheduled: {formatDate(job.scheduledAt)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-semibold">
                    {job.budget}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Customer Information Section */}
                {job.user && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="bg-indigo-100 text-indigo-800 rounded-xl w-10 h-10 flex items-center justify-center font-bold">
                        {job.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{job.user.name}</p>
                        <p className="text-xs text-gray-500">{job.user.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <a 
                        href={`tel:${job.user.phone}`}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {job.user.phone}
                      </a>
                      <a 
                        href={`mailto:${job.user.email}`}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.user.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Cancellation/Decline Reason */}
                {(job.cancellationReason || job.declineReason) && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                    <p className="font-medium text-red-700">
                      {job.status === "cancelled"
                        ? "Cancellation Reason:"
                        : "Decline Reason:"}
                    </p>
                    <p className="text-red-600">
                      {job.cancellationReason || job.declineReason}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/artisan/jobs/view/${job.id}`)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>

                  {job.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowDeclineModal(true);
                        }}
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Decline Job
                      </button>
                      <button
                        onClick={() => handleAcceptJob(job.id)}
                        className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        Accept Job
                      </button>
                    </>
                  )}

                  {job.status === "accepted" && (
                    <button
                      onClick={() => handleCompleteJob(job.id)}
                      className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanJobsPage;