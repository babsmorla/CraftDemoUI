import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import dummyArtisanServices from "../data/dummyArtisanServices";

const ArtisanEditServicesPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      services: dummyArtisanServices.services,
      pricingNotes: Array.isArray(dummyArtisanServices.pricingNotes)
        ? dummyArtisanServices.pricingNotes.join("\n")
        : dummyArtisanServices.pricingNotes || "",
    },
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit = (data) => {
    const processedData = {
      ...data,
      pricingNotes: data.pricingNotes
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== ""),
    };

    console.log("Updated Artisan Services Data:", processedData);
    alert("Services and pricing notes updated successfully!");
    navigate("/artisan/services");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Services</h1>
          <p className="text-gray-600 mt-2">
            Manage your service offerings and pricing information
          </p>
        </div>
        <button
          onClick={() => navigate("/artisan/services")}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back to Services
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Services Table */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Service List</h2>
            <button
              type="button"
              onClick={() =>
                appendService({
                  id: uuidv4(),
                  service: "",
                  description: "",
                  price: "",
                  estimatedTime: "",
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Service
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceFields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        {...register(`services.${index}.service`, {
                          required: true,
                        })}
                        placeholder="Service title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        {...register(`services.${index}.description`)}
                        placeholder="Brief description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          {...register(`services.${index}.price`)}
                          placeholder="0.00"
                          className="pl-7 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        {...register(`services.${index}.estimatedTime`)}
                        placeholder="e.g. 2 hours"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove Service"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Notes */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Pricing Notes
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              These notes will appear below your services to provide additional
              pricing context
            </p>
          </div>
          
          <textarea
            {...register("pricingNotes")}
            placeholder={`• Prices are estimates and may vary\n• Materials not included\n• Minimum service fee applies`}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <p className="text-indigo-700 text-sm flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Each new line will be displayed as a separate note. Use bullet
              points (•) or dashes (-) for better readability.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/artisan/services")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisanEditServicesPage;