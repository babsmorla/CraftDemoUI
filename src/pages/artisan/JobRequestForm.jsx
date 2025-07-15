import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

export default function JobRequestForm({ onSubmit }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleFormSubmit = (data) => {
    // Convert images from FileList to Array for easy backend handling
    const images = data.images ? Array.from(data.images) : [];

    const formData = {
      ...data,
      images, // Contains File objects for upload
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-xl mx-auto space-y-4 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Request a Service</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Fix leaking sink"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="w-full border rounded px-3 py-2"
          placeholder="Provide details about the job..."
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Budget */}
      <div>
        <label className="block mb-1 font-medium">Budget</label>
        <input
          type="text"
          {...register('budget')}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., GHS 150 or Negotiable"
        />
      </div>

      {/* Scheduled Date */}
      <div>
        <label className="block mb-1 font-medium">Preferred Date & Time</label>
        <input
          type="datetime-local"
          {...register('scheduledAt')}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block mb-1 font-medium">Location</label>
        <input
          type="text"
          {...register('location', { required: 'Location is required' })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Accra, Spintex Road"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
      </div>

      {/* Client Name */}
      <div>
        <label className="block mb-1 font-medium">Your Name</label>
        <input
          type="text"
          {...register('clientName', { required: 'Name is required' })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Ama Mensah"
        />
        {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
      </div>

      {/* Client Phone */}
      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="tel"
          {...register('clientPhone', { required: 'Phone number is required' })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., 0244123456"
        />
        {errors.clientPhone && <p className="text-red-500 text-sm mt-1">{errors.clientPhone.message}</p>}
      </div>

      {/* Client Email */}
      <div>
        <label className="block mb-1 font-medium">Email (optional)</label>
        <input
          type="email"
          {...register('clientEmail')}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., ama@gmail.com"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Images (optional)</label>
        <input
          type="file"
          {...register('images')}
          accept="image/*"
          multiple
          className="w-full border rounded px-3 py-2"
          onChange={handleImageChange}
        />
        {previews.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {previews.map((src, idx) => (
              <img key={idx} src={src} alt={`preview-${idx}`} className="w-20 h-20 object-cover rounded border" />
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 transition"
      >
        Submit Request
      </button>
    </form>
  );
}
