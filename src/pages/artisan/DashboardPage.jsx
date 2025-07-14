import React from "react";
import { Link } from "react-router-dom";
import { artisanProfile } from "../data/dummyData";

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Profile Summary */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={artisanProfile.profilePic}
            alt={artisanProfile.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">{artisanProfile.name}</h2>
            <p className="text-gray-600">{artisanProfile.businessName}</p>
            <p className="text-sm text-gray-500">{artisanProfile.craft}</p>
            <p className="text-sm text-green-600 capitalize">{artisanProfile.verificationStatus}</p>
          </div>
        </div>
        <Link
          to="/artisan/profile"
          className="mt-4 md:mt-0 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit Profile
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">Rating</p>
          <p className="text-2xl font-bold">⭐ {artisanProfile.rating}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">Completed Jobs</p>
          <p className="text-2xl font-bold">{artisanProfile.stats.completedJobs}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">Pending Jobs</p>
          <p className="text-2xl font-bold">{artisanProfile.stats.pendingJobs}</p>
        </div>
      </div>

      {/* Contact & Location */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <p><strong>Phone:</strong> {artisanProfile.phone}</p>
        <p><strong>WhatsApp:</strong> {artisanProfile.whatsapp}</p>
        <p><strong>Email:</strong> {artisanProfile.email}</p>
        <p><strong>Location:</strong> {artisanProfile.location}</p>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Portfolio</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artisanProfile.portfolio.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`portfolio-${index}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Specialties</h2>
        <div className="flex flex-wrap gap-2">
          {artisanProfile.specialties.map((specialty, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {artisanProfile.reviews && artisanProfile.reviews.length > 0 ? (
            artisanProfile.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex justify-between">
                  <p className="font-semibold">{review.comment}</p>
                  <span className="text-yellow-500">⭐ {review.rating}</span>
                </div>
                <p className="text-sm text-gray-500">By {review.user.name} on {new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
