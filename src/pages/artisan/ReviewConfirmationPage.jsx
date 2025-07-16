import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function ReviewConfirmationPage() {
  const navigate = useNavigate();
  const { artisanId } = useParams();
  const location = useLocation();
  const { review, artisanName, businessName } = location.state || {};

  if (!review) {
    navigate(`/review/${artisanId}`);
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Review Submitted!
        </h1>
        <p className="text-gray-600">
          Thank you for reviewing {artisanName} from {businessName}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-3xl mx-1 ${
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700 italic">"{review.comment}"</p>
            <p className="text-sm text-gray-500 mt-4">
              Status:{" "}
              <span className="text-yellow-600 font-medium">
                Pending approval
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate(`/artisan/${artisanId}`)}
              className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              View Artisan Profile
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewConfirmationPage;
