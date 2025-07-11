import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import artisanServicesService from "../../utils/artisanServicesService";

const ArtisanAddEditServicesPage = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      services: [
        {
          service: "",
          price: "",
          pricingNotes: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit = (data) => {
    artisanServicesService.saveServicesForArtisan("artisan-123", data.services);
    navigate("/artisan/services");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add / Edit Services Offered</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md space-y-2">
            <div>
              <label className="block font-medium">Service Name</label>
              <input
                type="text"
                {...register(`services.${index}.service`, { required: "Service is required" })}
                className="mt-1 w-full border rounded px-3 py-2"
              />
              {errors.services?.[index]?.service && (
                <p className="text-red-500 text-sm mt-1">{errors.services[index].service.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Price</label>
              <input
                type="text"
                {...register(`services.${index}.price`, { required: "Price is required" })}
                className="mt-1 w-full border rounded px-3 py-2"
              />
              {errors.services?.[index]?.price && (
                <p className="text-red-500 text-sm mt-1">{errors.services[index].price.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Pricing Notes</label>
              <textarea
                {...register(`services.${index}.pricingNotes`)}
                rows={2}
                className="mt-1 w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 text-sm mt-2 hover:underline"
            >
              Remove Service
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ service: "", price: "", pricingNotes: "" })}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Another Service
        </button>

        <div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save Services
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisanAddEditServicesPage;
