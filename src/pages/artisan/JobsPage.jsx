 // src/pages/artisan/JobsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jobRequestsService from "../../utils/jobRequestsService";
import DeclineReasonModal from "./DeclineReasonModal";

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [jobs, setJobs] = useState([]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();

  const currentUser = { id: "art_789", name: "Kofi Mensah" };

  useEffect(() => {
    if (currentUser?.id) {
      const fetchedJobs = jobRequestsService.getJobsByArtisan(currentUser.id);
      setJobs(fetchedJobs);
    }
  }, [currentUser?.id]);

  const handleAccept = (jobId) => {
    const updatedJob = jobRequestsService.acceptJobRequest(
      jobId,
      currentUser.id
    );
    setJobs(jobs.map((job) => (job.id === jobId ? updatedJob : job)));
  };

  const handleDecline = (reason) => {
    if (!selectedJobId) return;

    const updatedJob = jobRequestsService.declineJobRequest(
      selectedJobId,
      currentUser.id,
      reason
    );
    setJobs(jobs.map((job) => (job.id === selectedJobId ? updatedJob : job)));
    setShowDeclineModal(false);
  };

  const handleComplete = (jobId) => {
    const updatedJob = jobRequestsService.markJobAsCompleted(jobId);
    setJobs(jobs.map((job) => (job.id === jobId ? updatedJob : job)));
  };

  const filteredJobs = jobs.filter((job) => job.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Decline Reason Modal */}
      <DeclineReasonModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onConfirm={handleDecline}
        title="Reason for Declining Job"
        placeholder="Please explain why you can't accept this job..."
        confirmText="Decline Job"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Job Requests</h1>
        <p className="text-gray-600 mt-2">
          Manage your incoming job requests and scheduled work
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="flex overflow-x-auto">
          {["pending", "accepted", "completed", "declined"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-500 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <div className="flex items-center gap-2">
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(tab)}`}
                >
                  {jobs.filter((job) => job.status === tab).length}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold capitalize text-gray-700">
          {activeTab} Jobs
        </h2>
        <p className="text-gray-500">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
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
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-800">
                        {job.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}
                      >
                        {job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{job.clientName || "Client Name"}</span>
                    </div>
                  </div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-semibold sm:self-start">
                    {job.budget || "Negotiable"}
                  </div>
                </div>

                <p className="mt-4 text-gray-600">{job.description}</p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-indigo-500"
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
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {job.scheduledAt && (
                    <div className="flex items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      <span>
                        Scheduled:{" "}
                        {new Date(job.scheduledAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {job.completedAt && (
                    <div className="flex items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        Completed:{" "}
                        {new Date(job.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Details
                  </button>

                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    Message
                  </button>
                  {/*                   
                  {activeTab === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(job.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(job.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                          />
                        </svg>
                        Decline
                      </button>
                    </>
                  )} */}

                  {activeTab === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(job.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowDeclineModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {/* Display decline reason if exists */}
                  {job.declineReason && (
                    <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                      <p className="font-medium text-red-700">
                        Decline Reason:
                      </p>
                      <p className="text-red-600">{job.declineReason}</p>
                    </div>
                  )}

                  {activeTab === "accepted" && (
                    <button
                      onClick={() => handleComplete(job.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Mark Complete
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

export default JobsPage;
