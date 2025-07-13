// src/pages/homeowner/ReviewForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { reviews } from "../data/dummyData";

const ReviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { artisanId, jobId, homeownerId } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const [rating, setRating] = React.useState(0);

  const onSubmit = (data) => {
    // Create new review object
    const newReview = {
      id: `rev_${Date.now()}`,
      userId: homeownerId,
      artisanId,
      jobId,
      rating: parseInt(data.rating),
      comment: data.comment,
      date: new Date().toISOString(),
      status: "pending",
      flagged: false,
      flaggedReason: "",
      userName: "Current User", // Would come from auth context
    };

    // In a real app, this would be an API call
    reviews.push(newReview);

    // Simulate API delay
    setTimeout(() => {
      navigate(`/homeowner/my-jobs/${jobId}`, {
        state: { reviewSubmitted: true },
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to job
        </button>

        <h1 className="text-2xl font-bold mb-2">Leave a Review</h1>
        <p className="text-gray-600 mb-6">
          Share your experience working with this artisan
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              How would you rate this artisan? *
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setValue("rating", star.toString());
                  }}
                  className={`text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-3 text-gray-600">{rating}/5</span>
            </div>
            <input
              type="hidden"
              {...register("rating", { required: "Rating is required" })}
            />
            {errors.rating && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Comment Section */}
          <div>
            <label
              htmlFor="comment"
              className="block text-gray-700 font-medium mb-3"
            >
              Your Review *
            </label>
            <textarea
              id="comment"
              {...register("comment", {
                required: "Review comment is required",
                minLength: {
                  value: 10,
                  message: "Review should be at least 10 characters",
                },
              })}
              rows="5"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.comment ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your experience with this artisan..."
            ></textarea>
            {errors.comment && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
