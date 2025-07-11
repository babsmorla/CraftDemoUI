import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummyUserJobs from '../data/dummyUserJobs';
import RatingStars from '../../components/ui/RatingStars';

const UserSingleJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = dummyUserJobs.find(job => job.id === id);

  if (!job) {
    return (
      <div className="max-w-xl mx-auto py-8 text-center">
        <p className="text-gray-500">Job not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-500 mb-4">{new Date(job.createdAt).toLocaleDateString()} • {job.location}</p>
        <p className="text-gray-700 mb-4">{job.description}</p>

        {job.scheduledAt && (
          <p className="text-sm text-gray-500 mb-2">Scheduled: {new Date(job.scheduledAt).toLocaleString()}</p>
        )}

        {job.status === 'completed' && job.rating && (
          <div className="flex items-center mb-4">
            <RatingStars rating={job.rating} />
            <span className="ml-2 text-gray-600">{job.rating} / 5</span>
          </div>
        )}

        {job.images && job.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {job.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`uploaded-${idx}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {job.status !== 'completed' && job.status !== 'cancelled' && (
            <button
              onClick={() => navigate(`/my-jobs/${job.id}/edit`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit Request
            </button>
          )}
          {job.status === 'completed' && !job.reviewLeft && (
            <button
              onClick={() => navigate(`/my-jobs/${job.id}/review`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Leave Review
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSingleJobPage;
