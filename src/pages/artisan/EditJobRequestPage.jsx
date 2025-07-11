import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userJobsService from '../../utils/userJobsService';

const UserJobEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = userJobsService.getJobsForUser().find(job => job.id === id);

  const [formData, setFormData] = useState({
    title: job.title,
    description: job.description,
    budget: job.budget,
    scheduledAt: job.scheduledAt,
    location: job.location,
    clientName: job.clientName,
    clientPhone: job.clientPhone,
    clientEmail: job.clientEmail,
    images: job.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: imageUrls }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Job:', formData);
    navigate(`/my-jobs/${id}`);
  };

  if (!job) {
    return <div className="p-6 text-center text-gray-500">Job not found.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold mb-4">Edit Job Request</h1>

      <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Title" required />

      <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Description" rows={4} required />

      <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Budget (e.g., GHS 150 or Negotiable)" />

      <input type="datetime-local" name="scheduledAt" value={formData.scheduledAt} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

      <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Location" required />

      <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Your Name" required />

      <input type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Phone Number" required />

      <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="Email (optional)" />

      <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full border px-3 py-2 rounded" />

      {formData.images && formData.images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {formData.images.map((src, idx) => (
            <img key={idx} src={src} alt={`upload-${idx}`} className="w-24 h-24 object-cover rounded border" />
          ))}
        </div>
      )}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Save Changes</button>
    </form>
  );
};

export default UserJobEditPage;
