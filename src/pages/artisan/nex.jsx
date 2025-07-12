// /pages/artisan/VerificationUploadPage.jsx

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const VerificationUploadPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idType: "",
      idDocument: null,
      addressProof: null,
      businessCert: null,
      professionalCerts: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Uploaded Verification Data:", data);
    alert("Verification documents submitted successfully!");
    navigate("/artisan/verification");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Verification Documents</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ID Type Selection */}
        <div>
          <label className="block font-semibold mb-1">Select ID Type *</label>
          <select
            {...register("idType", { required: "ID Type is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select...</option>
            <option value="national_id">National ID</option>
            <option value="passport">Passport</option>
            <option value="driver_license">Driver's License</option>
            <option value="voter_id">Voter ID</option>
          </select>
          {errors.idType && (
            <p className="text-red-500 text-sm mt-1">{errors.idType.message}</p>
          )}
        </div>

        {/* ID Document Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload ID Document *</label>
          <input
            type="file"
            {...register("idDocument", { required: "ID Document is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.idDocument && (
            <p className="text-red-500 text-sm mt-1">{errors.idDocument.message}</p>
          )}
        </div>

        {/* Proof of Address Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Proof of Address *</label>
          <input
            type="file"
            {...register("addressProof", { required: "Proof of address is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.addressProof && (
            <p className="text-red-500 text-sm mt-1">{errors.addressProof.message}</p>
          )}
        </div>

        {/* Business Registration Certificate Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Business Certificate (optional)</label>
          <input
            type="file"
            {...register("businessCert")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Professional Certifications Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Professional Certifications (optional)</label>
          <input
            type="file"
            {...register("professionalCerts")}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 w-full"
        >
          Submit Verification Documents
        </button>
      </form>
    </div>
  );
};

export default VerificationUploadPage;
