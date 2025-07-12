import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as jobRequestsService from "../../utils/jobRequestsService";
import DeclineReasonModal from "./DeclineReasonModal";
import { jobs,users } from "../data/dummyData";

const UserJobsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [userJobs, setUserJobs] = useState([]);
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const currentUserId = "user_123";

  useEffect(() => {
    const userJobsData = jobs.filter((job) => job.userId === currentUserId);
    setUserJobs(userJobsData);
  }, []);

  const handleCancel = (reason) => {
    if (!selectedJobId) return;

    const updatedJob = jobRequestsService.cancelJobRequest(
      selectedJobId,
      reason
    );
    setUserJobs(
      userJobs.map((job) => (job.id === selectedJobId ? updatedJob : job))
    );
    setShowCancelModal(false);
  };

  const filteredJobs = userJobs.filter((job) =>
    activeTab === "completed"
      ? job.status === "completed"
      : activeTab === "active"
        ? job.status === "accepted"
        : job.status === activeTab
  );

  const currentUser = users.find((user) => user.id === currentUserId);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Cancel Reason Modal */}
      <DeclineReasonModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        title="Reason for Cancellation"
        placeholder="Explain why you're canceling this job request..."
        confirmText="Confirm Cancellation"
        cancelText="Go Back"
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Job Requests</h1>
          <p className="text-gray-600 mt-1">
            {currentUser?.name || "User"} • {currentUser?.email || ""}
          </p>
        </div>
        <button
          onClick={() => navigate("my-jobs/post-job")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full sm:w-auto text-center"
        >
          Post New Job
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 border-b mb-6 pb-2 overflow-x-auto">
        {["pending", "active", "completed", "cancelled"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 rounded-t-lg capitalize whitespace-nowrap ${
              activeTab === tab
                ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
              {
                userJobs.filter((job) =>
                  tab === "completed"
                    ? job.status === "completed"
                    : tab === "active"
                      ? job.status === "accepted"
                      : job.status === tab
                ).length
              }
            </span>
          </button>
        ))}
      </div>

      {/* Job Cards - Single Column Layout */}
      {filteredJobs.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No {activeTab} jobs
          </h3>
          <p className="text-gray-500 mb-4">
            {activeTab === "pending"
              ? "You don't have any pending job requests"
              : `You don't have any ${activeTab} jobs`}
          </p>
          {activeTab === "pending" && (
            <button
              onClick={() => navigate("my-jobs/post-job")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Post Your First Job
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {" "}
          {/* Single column layout with vertical spacing */}
          {filteredJobs.map((job) => {
            const artisan = users.find((user) => user.id === job.artisanId);

            return (
              <div
                key={job.id}
                className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-800">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap items-center mt-1 gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          job.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : job.status === "accepted"
                              ? "bg-blue-100 text-blue-700"
                              : job.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(job.scheduledAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-semibold">{job.budget}</span>
                </div>

                <p className="text-gray-700 mb-3 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      {artisan?.name || "Artisan"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {artisan?.businessName || "Service Provider"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3 flex flex-col sm:flex-row justify-between gap-3">
                  <button
                    onClick={() => navigate(`/homeowner/my-jobs/${job.id}`)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    View Details
                  </button>

                  <div className="flex flex-wrap gap-2 justify-end">
                    {job.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleCancel(job.id)}
                          className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 whitespace-nowrap"
                        >
                          Cancel Request
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/homeowner/my-jobs/${job.id}/edit`)
                          }
                          className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 whitespace-nowrap"
                        >
                          Edit Details
                        </button>
                      </>
                    )}

                    {/* {job.status === "completed" && !job.reviewId && (
                      <button
                        onClick={() =>
                          navigate(`review/${job.artisanId}`, {
                            state: {
                              jobId: job.id,
                              artisanId: job.artisanId,
                              homeownerId: currentUserId, // Add this
                            },
                          })
                        }
                        className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 whitespace-nowrap"
                      >
                        Leave Review
                      </button>
                    )} */}

                    {job.status === "pending" && (
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowCancelModal(true);
                        }}
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    )}

                    {/* Display cancellation reason if exists */}
                    {job.cancellationReason && (
                      <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                        <p className="font-medium text-red-700">
                          Cancellation Reason:
                        </p>
                        <p className="text-red-600">{job.cancellationReason}</p>
                      </div>
                    )}

                    {job.status === "completed" && job.reviewId && (
                      <button
                        onClick={() => navigate(`${job.id}/review`)}
                        className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 whitespace-nowrap"
                      >
                        View Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserJobsPage;
