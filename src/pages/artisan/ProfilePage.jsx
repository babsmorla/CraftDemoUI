import React from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  const defaultValues = {
    name: "Kwame Mensah",
    businessName: "Kwame Mensah Plumbing",
    description: "Professional plumber with 12 years of experience. Specializing in pipe repairs, installations, and maintenance.",
    location: "Kumasi, Ashanti Region",
    experience: "12 years",
    specialties: [
      { id: 1, name: "Pipe Repair" },
      { id: 2, name: "Installation" },
      { id: 3, name: "Leak Detection" },
      { id: 4, name: "Water Heater" }
    ],
    hourlyRate: 25,
    phone: "+233201234567",
    whatsapp: "+233201234567",
    available: true,
    profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
  };

  const {
    name,
    businessName,
    description,
    location,
    experience,
    specialties,
    hourlyRate,
    phone,
    whatsapp,
    available,
    profileImageUrl
  } = defaultValues;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Artisan Profile</h1>
          <p className="text-gray-600 mt-2">
            Your professional profile as shown to clients
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("/artisan/profile/edit")}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Photo & Availability */}
            <div className="md:w-1/3">
              <div className="mb-6">
                <div className="relative w-48 h-48 mx-auto">
                  <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-full h-full">
                    <img 
                      src={profileImageUrl} 
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Availability</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-700">
                    {available ? "Available for new requests" : "Currently unavailable"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800 font-medium">{phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="text-gray-800 font-medium">{whatsapp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="md:w-2/3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <h3 className="text-xl text-indigo-600 font-medium">{businessName}</h3>
                
                <div className="mt-4">
                  <p className="text-gray-700 whitespace-pre-line">{description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Location</h3>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-500 mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <p className="text-gray-700">{location}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Experience</h3>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-500 mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <p className="text-gray-700">{experience}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Hourly Rate</h3>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-500 mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" 
                      />
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <p className="text-gray-700">${hourlyRate}/hr</p>
                  </div>
                </div>
              </div>

              {/* Specialties Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-3">
                  {specialties.map((specialty) => (
                    <div 
                      key={specialty.id} 
                      className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full flex items-center"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {specialty.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section (Placeholder) */}
              {/* <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Reviews</h3>
                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="text-center py-8 text-gray-500">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 mx-auto text-gray-400 mb-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                      />
                    </svg>
                    <p>No reviews yet. Your feedback will appear here.</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;