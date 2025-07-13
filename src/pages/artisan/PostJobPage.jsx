// src/pages/homeowner/PostJobPage.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userJobs } from "../data/dummyData";

const PostJobPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  const onSubmit = (data) => {
    // Create job object
    const newJob = {
      id: `job_${Date.now()}`,
      title: data.title,
      description: data.description,
      budget: data.budget ? `GHS ${data.budget}` : "Negotiable",
      scheduledAt: data.scheduledAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      location: data.location,
      userId: "user_123", // Would come from auth context
      status: "pending",
      images: [],
      // These would come from user context in a real app
      clientName: "Current User",
      clientPhone: "0244123456",
      clientEmail: "user@example.com",
    };
    
    // In a real app, this would be an API call
    userJobs.push(newJob);
    
    // Simulate API delay
    setTimeout(() => {
      navigate("/homeowner/my-jobs", { state: { jobPosted: true } });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Post a New Job Request</h1>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Cancel
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Job Title *
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Job title is required" })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Fix leaking kitchen sink"
          />
          {errors.title && (
            <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Job Description *
          </label>
          <textarea
            id="description"
            {...register("description", { 
              required: "Job description is required",
              minLength: {
                value: 20,
                message: "Description should be at least 20 characters"
              }
            })}
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the job in detail..."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        
        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
            Budget Estimate
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">GHS</span>
            <input
              type="number"
              id="budget"
              {...register("budget", { 
                min: {
                  value: 1,
                  message: "Budget must be at least 1 GHS"
                }
              })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.budget ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 150"
            />
          </div>
          {errors.budget && (
            <p className="mt-1 text-red-500 text-sm">{errors.budget.message}</p>
          )}
        </div>
        
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            {...register("location", { required: "Location is required" })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Accra, Spintex Road"
          />
          {errors.location && (
            <p className="mt-1 text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>
        
        {/* Scheduled Date */}
        <div>
          <label htmlFor="scheduledAt" className="block text-gray-700 font-medium mb-2">
            Preferred Date & Time
          </label>
          <input
            type="datetime-local"
            id="scheduledAt"
            {...register("scheduledAt")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* Image Upload (Placeholder) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Photos (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-gray-600">Drag & drop photos here or click to browse</p>
            <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG up to 5MB</p>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Posting Job..." : "Post Job Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;