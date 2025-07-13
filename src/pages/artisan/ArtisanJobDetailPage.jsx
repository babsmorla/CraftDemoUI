import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTools, FaEdit, FaTimes, FaCheckCircle } from "react-icons/fa";
import { artisanJobs } from "../data/dummyData"; // Import from dummy data file

const ArtisanJobDetailPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  
  // Find the specific job from imported artisanJobs array
  const job = artisanJobs.find(job => job.id === jobId);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to My Jobs
          </button>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-amber-100 text-amber-800",
    accepted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    declined: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to My Jobs
      </button>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex items-center mt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}
              >
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
              <span className="ml-3 text-gray-500 text-sm">
                Posted: {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-gray-900">
              {job.budget || "Negotiable"}
            </p>
            <p className="text-gray-500 text-sm">Budget</p>
          </div>
        </div>

        <p className="text-gray-700 mt-4 leading-relaxed">{job.description}</p>
      </div>

      {/* Image Gallery */}
      {job.images && job.images.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {job.images.map((src, idx) => (
              <div 
                key={idx} 
                className="cursor-pointer overflow-hidden rounded-xl aspect-square group"
                onClick={() => setSelectedImage(src)}
              >
                <div className="w-full h-full relative">
                  <img
                    src={src}
                    alt={`Job ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full">
            <img
              src={selectedImage}
              alt="Full size preview"
              className="max-h-[90vh] w-auto mx-auto rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Job Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Job Details */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FaCalendarAlt />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-medium">
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {job.scheduledAt && (
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FaClock />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Scheduled</p>
                  <p className="font-medium">
                    {new Date(job.scheduledAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FaMapMarkerAlt />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        {job.user && (
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="flex items-start">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                <span className="text-gray-700 font-bold text-xl">
                  {job.user.name.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{job.user.name}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-2 text-sm text-indigo-600" />
                    <a href={`tel:${job.user.phone}`} className="hover:text-indigo-700">
                      {job.user.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-2 text-sm text-indigo-600" />
                    <a href={`mailto:${job.user.email}`} className="hover:text-indigo-700">
                      {job.user.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-sm text-indigo-600" />
                    <span>{job.user.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {job.status === "pending" && (
            <>
              <button
                onClick={() => setShowDeclineForm(true)}
                className="px-4 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <FaTimes />
                Decline Job
              </button>
              <button
                onClick={() => {
                  // In a real app, you would update the job status via API here
                  alert("Job accepted successfully!");
                }}
                className="px-4 py-2.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <FaCheckCircle />
                Accept Job
              </button>
            </>
          )}
          
          {job.status === "accepted" && (
            <>
              <button
                onClick={() => window.location.href = `tel:${job.user.phone}`}
                className="px-4 py-2.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <FaPhone />
                Call Customer
              </button>
              <button
                onClick={() => {
                  // In a real app, you would mark job as completed via API
                  alert("Job marked as completed!");
                }}
                className="px-4 py-2.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <FaCheckCircle />
                Mark as Completed
              </button>
            </>
          )}
        </div>
      </div>

      {/* Decline Form Modal */}
      {showDeclineForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Decline Job</h3>
              <button 
                onClick={() => setShowDeclineForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Please explain why you're declining this job
            </p>
            
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="e.g. I'm not available, outside my expertise..."
              className="w-full p-3 border rounded-lg mb-4 min-h-[120px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (declineReason.trim()) {
                    // In a real app, you would update the job status via API here
                    alert(`Job declined. Reason: ${declineReason}`);
                    setShowDeclineForm(false);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex-1 font-medium flex items-center justify-center gap-2"
                disabled={!declineReason.trim()}
              >
                <FaTimes />
                Confirm Decline
              </button>
              <button
                onClick={() => setShowDeclineForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex-1 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanJobDetailPage;