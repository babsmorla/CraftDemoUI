import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummyUserJobs from '../data/dummyUserJobs';

const UserJobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = dummyUserJobs.find(job => job.id === id);

  if (!job) {
    return <div className="p-6 text-center text-gray-500">Job not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-4 hover:underline">← Back</button>
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.description}</p>

      <div className="mb-2 text-sm text-gray-500">
        <i className="fas fa-clock mr-1"></i> Created: {new Date(job.createdAt).toLocaleString()}
      </div>
      {job.scheduledAt && (
        <div className="mb-2 text-sm text-gray-500">
          <i className="fas fa-calendar-alt mr-1"></i> Scheduled: {new Date(job.scheduledAt).toLocaleString()}
        </div>
      )}
      <div className="mb-4 text-sm text-gray-500">
        <i className="fas fa-map-marker-alt mr-1"></i> Location: {job.location}
      </div>

      <div className="mb-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {job.budget || 'Negotiable'}
        </span>
      </div>

      {job.images && job.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {job.images.map((src, idx) => (
            <img key={idx} src={src} alt={`Job image ${idx}`} className="rounded border object-cover w-full h-32" />
          ))}
        </div>
      )}

      <div className="flex gap-3 flex-wrap mt-4">
        {job.status === 'pending' && (
          <button
            onClick={() => alert('Implement cancel logic here')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel Job
          </button>
        )}
        {job.status === 'completed' && !job.artisanReview && (
          <button
            onClick={() => navigate(`/my-jobs/${job.id}/review`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Leave Review
          </button>
        )}
      </div>
    </div>
  );
};

export default UserJobDetailPage;