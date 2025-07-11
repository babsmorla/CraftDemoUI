import React, { useState, useEffect } from "react";
import RatingStars from "../../components/ui/RatingStars";
import { useAuth } from "../../contexts/AuthContext";

function ProfilePage() {
  const { currentUser } = useAuth();

  const defaultAvailability = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
  };

  const [profile, setProfile] = useState({
    name: "Kwame Mensah",
    businessName: "Kwame Mensah Plumbing",
    description:
      "Professional plumber with 12 years of experience. Specializing in pipe repairs, installations, and maintenance.",
    location: "Kumasi, Ashanti Region",
    experience: "12 years",
    specialties: [
      "Pipe Repair",
      "Installation",
      "Leak Detection",
      "Water Heater",
    ],
    hourlyRate: 25,
    phone: "+233201234567",
    whatsapp: "+233201234567",
    availability: defaultAvailability,
    available: false,
  });

  const [availability, setAvailability] = useState(
    profile.availability || defaultAvailability
  );
  const [availableNow, setAvailableNow] = useState(profile.available || false);
  const [isEditing, setIsEditing] = useState(false);

  // const days = [
  //   { name: "Monday", key: "monday" },
  //   { name: "Tuesday", key: "tuesday" },
  //   { name: "Wednesday", key: "wednesday" },
  //   { name: "Thursday", key: "thursday" },
  //   { name: "Friday", key: "friday" },
  //   { name: "Saturday", key: "saturday" },
  //   { name: "Sunday", key: "sunday" },
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (index, value) => {
    const newSpecialties = [...profile.specialties];
    newSpecialties[index] = value;
    setProfile((prev) => ({ ...prev, specialties: newSpecialties }));
  };

  const addSpecialty = () => {
    setProfile((prev) => ({ ...prev, specialties: [...prev.specialties, ""] }));
  };

  const removeSpecialty = (index) => {
    setProfile((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile with latest availability data
    setProfile((prev) => ({
      ...prev,
      available: availableNow,
      availability: availability,
    }));
    setIsEditing(false);
    // In a real app, save to backend here
  };

  // Availability Editor Component
  const renderAvailabilityEditor = () => {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Availability</label>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="available-now"
            checked={availableNow}
            onChange={(e) => setAvailableNow(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="available-now" className="text-gray-700">
            Currently available for new requests
          </label>
        </div>

    
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            {isEditing ? (
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Photo */}
            <div className="md:w-1/3">
              <div className="mb-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                    <i className="fas fa-user text-4xl text-gray-400"></i>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800">
                      <i className="fas fa-camera mr-2"></i>Change Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Profile Visibility</h3>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="visibility-toggle"
                      className="sr-only"
                      defaultChecked
                    />
                    <label
                      htmlFor="visibility-toggle"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    >
                      <span className="block h-6 w-6 rounded-full bg-white shadow transform transition ease-in-out duration-200 translate-x-0"></span>
                    </label>
                  </div>
                  <label htmlFor="visibility-toggle" className="text-gray-700">
                    Public Profile
                  </label>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  When enabled, your profile will be visible to homeowners
                  searching for services
                </p>
              </div>
            </div>

            {/* Right Column - Profile Info */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit}>
                {/* Availability Editor - Conditionally Rendered */}
                {isEditing && renderAvailabilityEditor()}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Business Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="businessName"
                        value={profile.businessName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.businessName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={profile.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.experience}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Hourly Rate ($)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="hourlyRate"
                        value={profile.hourlyRate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">${profile.hourlyRate}/hr</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      WhatsApp Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="whatsapp"
                        value={profile.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.whatsapp}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Specialties
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      {profile.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={specialty}
                            onChange={(e) =>
                              handleSpecialtyChange(index, e.target.value)
                            }
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeSpecialty(index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addSpecialty}
                        className="text-blue-600 hover:text-blue-800 mt-2"
                      >
                        <i className="fas fa-plus mr-2"></i>Add Specialty
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Description
                  </label>
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={profile.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  ) : (
                    <p className="text-gray-600">{profile.description}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
