import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ArtisanAddServicesPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      services: [
        { id: uuidv4(), service: "", description: "", price: "", estimatedTime: "" },
      ],
      pricingNotes: "",
    },
  });

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit = (data) => {
    console.log("Submitted Artisan Services Data:", data);
    alert("Services and pricing notes saved successfully!");
    navigate("/artisan/services");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h1 className="text-2xl font-bold">Add Services & Pricing Notes</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Services Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Services Offered</h2>
          {serviceFields.map((field, index) => (
            <div
              key={field.id}
              className="border rounded p-4 bg-gray-50 space-y-2 relative"
            >
              <button
                type="button"
                onClick={() => removeService(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
              <input
                {...register(`services.${index}.service`, { required: true })}
                placeholder="Service Title"
                className="border p-2 rounded w-full"
              />
              <textarea
                {...register(`services.${index}.description`)}
                placeholder="Description"
                className="border p-2 rounded w-full"
              />
              <input
                {...register(`services.${index}.price`)}
                placeholder="Price (e.g., $30/hr)"
                className="border p-2 rounded w-full"
              />
              <input
                {...register(`services.${index}.estimatedTime`)}
                placeholder="Estimated Time (e.g., Varies by project)"
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add New Service
          </button>
        </div>

        {/* Pricing Notes Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Pricing Notes</h2>
          <textarea
            {...register("pricingNotes")}
            placeholder={`• Prices are estimates and may vary based on project complexity\n• Minimum service charge: 1 hour\n• Materials not included in pricing\n• Free quotes available upon request`}
            rows={6}
            className="border p-3 rounded w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            You can use bullet points (•, -, 1.) to format your notes clearly for clients.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
        >
          Save Services & Notes
        </button>
      </form>
    </div>
  );
};

export default ArtisanAddServicesPage;
