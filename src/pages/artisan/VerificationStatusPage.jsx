// /pages/artisan/VerificationStatusPage.jsx

import React from "react";
import dummyVerificationRequests from "../data/dummyVerificationRequests";
import { useNavigate } from "react-router-dom";

const VerificationStatusPage = () => {
  const navigate = useNavigate();
  const { artisanName, artisanId, requests } = dummyVerificationRequests;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Verification Status</h1>
        <button
          onClick={() => navigate("/artisan/verification/upload")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload Verification Documents
        </button>
      </div>

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-gray-600 font-medium">Requirement</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Status</th>
              <th className="px-4 py-2 text-gray-600 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-800">{req.requirement}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    req.status === "approved"
                      ? "text-green-600"
                      : req.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </td>
                <td className="px-4 py-2 text-gray-700">{req.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationStatusPage;
