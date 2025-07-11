import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummyUserJobs from '../data/dummyUserJobs';
import RatingStars from '../../components/ui/RatingStars';

const LeaveReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobIndex = dummyUserJobs.findIndex(job => job.id === id);
  const job = dummyUserJobs[jobIndex];
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dummyUserJobs[jobIndex] = {
      ...job,
      rating,
      reviewTitle,
      reviewText,
      reviewLeft: true,
      reviewImages: images.map(file => URL.createObjectURL(file)),
    };
    navigate(`/my-jobs/${job.id}`);
  };
  if (!job) return <div className="text-center p-8">Job not found.</div>;
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Write a Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium block mb-1">Your Rating</label>
          <RatingStars rating={rating} onChange={setRating} />
        </div>
        <div>
          <label className="font-medium block mb-1">Review Title</label>
          <input type="text" value={reviewTitle} onChange={e => setReviewTitle(e.target.value)} placeholder="Summarize your experience" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="font-medium block mb-1">Your Review</label>
          <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Share details of your experience" className="w-full border rounded px-3 py-2" rows={4}></textarea>
        </div>
        <div>
          <label className="font-medium block mb-1">Upload Photos (Optional)</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Submit Review</button>
      </form>
    </div>
  );
};
export default LeaveReviewPage;
