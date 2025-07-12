// /pages/artisan/VerificationRequestPage.jsx

import React from "react";
import dummyVerificationRequest from "../../data/dummyVerificationRequest";
import { useNavigate } from "react-router-dom";

const VerificationRequestPage = () => {
  const navigate = useNavigate();
  const { status, documents, submittedAt } = dummyVerificationRequest;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    in_review: "bg-blue-100 text-blue-700",
    missing: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Verification Request</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
        >
          {status.replace("_", " ").toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 mb-6">
        Submitted: {new Date(submittedAt).toLocaleString()}
      </p>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border rounded-lg p-4 bg-white shadow space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{doc.title}</h2>
                <p className="text-gray-600 text-sm">{doc.description}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}
              >
                {doc.status.replace("_", " ").toUpperCase()}
              </span>
            </div>

            {doc.comments && (
              <p className="text-sm text-gray-700">
                <strong>Admin Comments:</strong> {doc.comments}
              </p>
            )}

            {doc.files.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {doc.files.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm truncate max-w-xs"
                  >
                    {file.name}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No files submitted.</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/artisan/profile")}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Back to Profile
      </button>
    </div>
  );
};

export default VerificationRequestPage;
