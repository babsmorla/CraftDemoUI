import React from "react";
import dummyArtisanServices from "../data/dummyArtisanServices";

const ArtisanServicesPage = () => {
  const { services, pricingNotes } = dummyArtisanServices;

  // Ensure pricingNotes is displayed cleanly if it's a string:
  const pricingNotesArray = typeof pricingNotes === "string"
    ? pricingNotes.split("\n").filter(line => line.trim() !== "")
    : Array.isArray(pricingNotes)
    ? pricingNotes
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Services & Pricing</h1>

      {/* Services Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">Service</th>
              <th className="px-6 py-3 font-medium text-gray-600">Description</th>
              <th className="px-6 py-3 font-medium text-gray-600">Price</th>
              <th className="px-6 py-3 font-medium text-gray-600">Estimated Time</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr key={service.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">{service.service}</td>
                  <td className="px-6 py-4 text-gray-700">{service.description}</td>
                  <td className="px-6 py-4 text-gray-700">{service.price}</td>
                  <td className="px-6 py-4 text-gray-700">{service.estimatedTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pricing Notes */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-800">Pricing Notes</h2>
        {pricingNotesArray.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {pricingNotesArray.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No pricing notes provided.</p>
        )}
      </div>
    </div>
  );
};

export default ArtisanServicesPage;
