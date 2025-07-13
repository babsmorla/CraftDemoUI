import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { artisans } from "./dummyData";

function ArtisanReviewPage() {
  const { artisanId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the artisan being reviewed
  const artisan = artisans.find((a) => a.id === artisanId);

  if (!artisan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Artisan Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Create review object (matches your dummy data structure)
      const newReview = {
        id: `rev_${Date.now()}`,
        userId: "user_456", // In real app, this would come from auth context
        artisanId: artisan.id,
        rating: rating,
        comment: data.comment,
        date: new Date().toISOString(),
        status: "pending",
        flagged: false,
        flaggedReason: "",
        userName: "Ama Boateng", // Would come from current user
      };

      // In a real app, you would send this to your API
      console.log("Submitting review:", newReview);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to confirmation page
      navigate(`/review-confirmation/${artisanId}`, {
        state: {
          review: newReview,
          artisanName: artisan.name,
          businessName: artisan.businessName,
        },
      });
    } catch (error) {
      console.error("Review submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Leave a Review</h1>
        <p className="text-gray-600 mt-2">
          Share your experience with {artisan.name} from {artisan.businessName}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mb-4 md:mb-0 md:mr-6" />
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800">
                {artisan.name}
              </h2>
              <p className="text-gray-600">{artisan.businessName}</p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${i < artisan.rating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {artisan.rating} ({artisan.completedJobs} jobs)
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-3 font-medium text-center">
                How would you rate your experience?
              </label>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`text-4xl mx-1 cursor-pointer ${
                        ratingValue <= (hoverRating || rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${ratingValue} stars`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm text-center mt-1">
                  Please select a rating
                </p>
              )}
              <input
                type="hidden"
                {...register("rating", {
                  required: "Rating is required",
                  validate: (value) => value > 0 || "Please select a rating",
                })}
                value={rating}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Share details of your experience
              </label>
              <textarea
                {...register("comment", {
                  required: "Review comment is required",
                  minLength: {
                    value: 20,
                    message:
                      "Please provide more details (at least 20 characters)",
                  },
                  maxLength: {
                    value: 500,
                    message: "Review is too long (max 500 characters)",
                  },
                })}
                rows={5}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.comment ? "border-red-500" : ""
                }`}
                placeholder="What did you like or dislike? Would you recommend this artisan to others?"
              ></textarea>
              {errors.comment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.comment.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className={`w-full px-6 py-3 rounded-lg font-medium ${
                  isSubmitting || rating === 0
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white transition-colors`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtisanReviewPage;
