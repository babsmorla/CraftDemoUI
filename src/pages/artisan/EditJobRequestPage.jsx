import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import dummyUserJobs from '../data/dummyUserJobs';

const EditJobRequestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = dummyUserJobs.find(job => job.id === id);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: job || {}
  });

  if (!job) {
    return <div className="p-6 text-center text-gray-500">Job not found.</div>;
  }

  const onSubmit = (data) => {
    console.log('Updated job request:', data);
    alert('Job request updated successfully!');
    navigate(`/my-jobs/${id}`);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-4 hover:underline">← Back</button>
      <h1 className="text-2xl font-bold mb-4">Edit Job Request</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full border rounded px-3 py-2"
            rows={4}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Budget</label>
          <input
            type="text"
            {...register('budget')}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Preferred Date & Time</label>
          <input
            type="datetime-local"
            {...register('scheduledAt')}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 transition"
        >
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditJobRequestPage;