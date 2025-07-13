import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { reviewData } from "../data/dummyData";

function ReviewDetailPage() {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const review = reviewData.find((r) => r.id === reviewId);

  if (!review) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Review Not Found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Reviews
        </button>
      </div>
    );
  }

  const onSubmit = (data) => {
    console.log("Review action:", data);
    // In real app: API call to update review status
    navigate("/admin/reviews");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
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
        Back to Reviews
      </button>

      {/* Review Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Review Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Review Details</h2>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{review.rating}/5</span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
              ${review.status === "approved" ? "bg-green-100 text-green-800" : ""}
              ${review.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
              ${review.flagged ? "bg-red-100 text-red-800" : ""}`}
            >
              {review.flagged ? "Flagged" : review.status}
            </span>
          </div>

          {/* User and Artisan Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* User Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Customer</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={review.user.profilePic} 
                    alt={review.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profiles/default-user.jpg";
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{review.user.name}</p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Artisan Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Artisan</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={review.artisan.profilePic} 
                    alt={review.artisan.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profiles/default-artisan.jpg";
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{review.artisan.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-3">Review Content</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{review.comment}</p>
            </div>

            {review.flagged && (
              <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-100">
                <h4 className="font-medium text-red-800 mb-1">
                  Flagged Reason
                </h4>
                <p className="text-red-700">
                  {review.flaggedReason || "This review has been flagged by the system"}
                </p>
              </div>
            )}
          </div>

          {/* Action Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Review Action
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                  <input
                    type="radio"
                    value="approve"
                    defaultChecked={review.status === "approved"}
                    {...register("action", { required: "Action is required" })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-700">
                      Approve
                    </span>
                    <span className="block text-sm text-gray-500">
                      Publish this review
                    </span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                  <input
                    type="radio"
                    value="reject"
                    defaultChecked={review.status === "rejected"}
                    {...register("action", { required: "Action is required" })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-700">
                      Reject
                    </span>
                    <span className="block text-sm text-gray-500">
                      Remove this review
                    </span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                  <input
                    type="radio"
                    value="pending"
                    defaultChecked={review.status === "pending"}
                    {...register("action", { required: "Action is required" })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-700">
                      Keep Pending
                    </span>
                    <span className="block text-sm text-gray-500">
                      No change
                    </span>
                  </div>
                </label>
              </div>
              {errors.action && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.action.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Admin Notes (Optional)
              </label>
              <textarea
                {...register("adminNotes")}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Add any notes about this review decision..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Decision
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetailPage;