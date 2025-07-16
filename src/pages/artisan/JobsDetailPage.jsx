import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobs as artisanJobs } from "../data/dummyData";

function JobsDetailPage() {
  const navigate = useNavigate();
  const job = artisanJobs.find((job) => job.id === id);
  const [declineReason, setDeclineReason] = useState("");
  const [showDeclineForm, setShowDeclineForm] = useState(false);

  if (!job) {
    return <div className="p-6 text-center text-gray-500">Job not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-4 hover:underline"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>

      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-gray-600 mt-2">{job.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Job Details
          </h2>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>
                Created: {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
            {job.scheduledAt && (
              <div className="flex items-center text-sm text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                <span>
                  Scheduled: {new Date(job.scheduledAt).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <i className="fas fa-wallet mr-2"></i>
              <span>Budget: {job.budget || "Negotiable"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <span>Distance: 2.5 km</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Homeowner Info
          </h2>
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="ml-3">
              <h3 className="font-medium">Homeowner Name</h3>
              <p className="text-sm text-gray-600">Contact: 024-XXX-XXXX</p>
              <div className="flex mt-1">
                <button className="text-blue-600 text-sm hover:underline mr-3">
                  <i className="fas fa-phone-alt mr-1"></i> Call
                </button>
                <button className="text-blue-600 text-sm hover:underline">
                  <i className="fas fa-comment-alt mr-1"></i> Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Location</h2>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <i className="fas fa-map-marker-alt mr-2"></i>
          <span>{job.location}</span>
        </div>
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
          <span className="text-gray-500">Map View</span>
        </div>
      </div>

      {job.images && job.images.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Job Photos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {job.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Job ${idx + 1}`}
                className="rounded-lg border object-cover w-full h-32"
              />
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Job Status</h2>
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === "completed"
                ? "bg-green-100 text-green-800"
                : job.status === "declined"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>

          {job.declineReason && (
            <div className="ml-4 text-sm text-gray-600">
              <span className="font-medium">Decline Reason:</span>{" "}
              {job.declineReason}
            </div>
          )}
        </div>
      </div>

      {job.status === "pending" && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => alert("Job accepted!")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex-1"
          >
            Accept Job
          </button>

          <button
            onClick={() => setShowDeclineForm(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex-1"
          >
            Decline Job
          </button>
        </div>
      )}

      {showDeclineForm && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">
            Reason for Declining
          </h3>
          <textarea
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder="Explain why you can't take this job..."
            className="w-full p-3 border rounded-lg mb-3"
            rows="3"
          />
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (declineReason.trim()) {
                  alert(`Job declined. Reason: ${declineReason}`);
                  setShowDeclineForm(false);
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex-1"
            >
              Confirm Decline
            </button>
            <button
              onClick={() => setShowDeclineForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {job.status === "accepted" && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => alert("Job marked as completed!")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex-1"
          >
            Mark as Completed
          </button>
          <button
            onClick={() => navigate(`/artisan/${job.artisanId}/schedule`)}
            className="bg-indigo-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex-1"
          >
            Reschedule
          </button>
        </div>
      )}
    </div>
  );
}

export default JobsDetailPage;
