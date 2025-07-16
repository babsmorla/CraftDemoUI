import React from "react";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Benefits for Homeowners
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  Access to verified, skilled artisans in your area
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  View portfolios and customer reviews before hiring
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  Direct communication with artisans via WhatsApp
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  Report and review system for quality assurance
                </span>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Benefits for Artisans
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  Showcase your skills with a professional portfolio
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  Get verified to build trust with potential clients
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  Receive direct job requests from clients in your area
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                <span className="text-gray-700">
                  Grow your business with positive reviews
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                to="/signup"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Create Artisan Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
