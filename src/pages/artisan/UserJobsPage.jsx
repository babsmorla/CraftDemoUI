import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userJobsService from "../../utils/userJobsService";

const UserJobsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedJobs = userJobsService.getJobsForUser("user-123");
    setJobs(fetchedJobs);
  }, []);

  const handleCancel = (jobId) => {
    userJobsService.cancelJobRequest(jobId);
    setJobs(userJobsService.getJobsForUser("user-123"));
  };

  const filteredJobs = jobs.filter((job) => job.status === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Job Requests</h1>

      <div className="flex space-x-4 border-b mb-4">
        {["pending", "active", "completed", "cancelled"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500">No {activeTab} jobs currently.</p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{job.title}</h2>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <p className="text-sm text-gray-500">
                    Requested on: {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    job.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : job.status === "active"
                      ? "bg-blue-100 text-blue-700"
                      : job.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <p className="text-gray-700">{job.description}</p>

              <div className="flex gap-2 flex-wrap mt-2">
                <button
                  onClick={() => navigate(`/homeowner/my-jobs/${job.id}`)}
                  className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
                >
                  View Details
                </button>

                {job.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleCancel(job.id)}
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                    >
                      Cancel Request
                    </button>
                    <button
                      onClick={() => navigate(`/homeowner/my-jobs/${job.id}/edit`)}
                      className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                  </>
                )}

                {job.status === "completed" && (
                  <button
                    onClick={() => navigate(`/homeowner/my-jobs/${job.id}/review`)}
                    className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                  >
                    Leave Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserJobsPage;