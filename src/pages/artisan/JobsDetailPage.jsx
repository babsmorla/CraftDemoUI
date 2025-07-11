import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummyJobs from '../data/dummyjobs';
import RatingStars from '../../components/ui/RatingStars';

 function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = dummyJobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-600">{job.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p><strong>Budget:</strong> {job.budget || 'Negotiable'}</p>
            <p><strong>Scheduled At:</strong> {new Date(job.scheduledAt).toLocaleString()}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Status:</strong> {job.status}</p>
            {job.completedAt && (
              <p><strong>Completed At:</strong> {new Date(job.completedAt).toLocaleString()}</p>
            )}
          </div>
          <div>
            <p><strong>Client Name:</strong> {job.clientName}</p>
            <p><strong>Phone:</strong> {job.clientPhone}</p>
            <p><strong>Email:</strong> {job.clientEmail || 'N/A'}</p>
            {job.rating && (
              <p className="flex items-center gap-2">
                <strong>Rating:</strong> 
                <RatingStars rating={job.rating} size="sm" />
                <span>{job.rating}</span>
              </p>
            )}
          </div>
        </div>

        {job.images && job.images.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mt-6 mb-2">Uploaded Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {job.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Job image ${idx}`}
                  className="rounded border object-cover w-full h-40"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailsPage