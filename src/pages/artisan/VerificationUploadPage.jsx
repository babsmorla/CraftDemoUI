// VerificationUploadPage.jsx

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { verificationRequirements } from "../data/verificationDummyData";

const VerificationUploadPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      uploads: verificationRequirements.map(() => null),
    },
  });

  const onSubmit = (data) => {
    console.log("Verification Uploads:", data);
    alert("Verification documents uploaded successfully!");
    navigate("/artisan/verification");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Verification Documents</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {verificationRequirements.map((req, index) => (
          <div
            key={req.id}
            className="border rounded p-4 bg-gray-50 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{req.title}</h2>
                <p className="text-sm text-gray-600">{req.description}</p>
                {req.required && (
                  <span className="text-xs text-red-500">* Required</span>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium">Examples:</p>
                <ul className="text-xs text-gray-600 list-disc list-inside">
                  {req.examples.map((ex, idx) => (
                    <li key={idx}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Controller
              name={`uploads.${index}`}
              control={control}
              rules={{ required: req.required }}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => field.onChange(e.target.files[0])}
                  className="border p-2 rounded w-full"
                />
              )}
            />

            {errors.uploads?.[index] && (
              <p className="text-sm text-red-500">This document is required.</p>
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationUploadPage;
