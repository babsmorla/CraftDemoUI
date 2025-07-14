import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import RatingStars from "../../components/ui/RatingStars";
import { publicArtisanProfile } from "../data/dummyData";

const ArtisanProfilePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [saved, setSaved] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();


  
  // Sample data - in a real app this would come from an API
  const artisan = publicArtisanProfile





  // Calculate rating distribution
  const ratingDistribution = {
    5: (artisan.reviews.filter(r => r.rating === 5).length / artisan.reviews.length) * 100,
    4: (artisan.reviews.filter(r => r.rating === 4).length / artisan.reviews.length) * 100,
    3: (artisan.reviews.filter(r => r.rating === 3).length / artisan.reviews.length) * 100,
    2: (artisan.reviews.filter(r => r.rating === 2).length / artisan.reviews.length) * 100,
    1: (artisan.reviews.filter(r => r.rating === 1).length / artisan.reviews.length) * 100,
  };

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      console.log("Review submitted:", { rating, comment: data.comment });
      reset();
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const getRatingLabel = (rating) => {
    if (rating === 5) return 'Excellent';
    if (rating === 4) return 'Good';
    if (rating === 3) return 'Fair';
    if (rating === 2) return 'Poor';
    return 'Bad';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div
        className="profile-header text-white py-8 md:py-12"
        style={{
          background:
            "linear-gradient(rgba(37, 99, 235, 0.9), rgba(37, 99, 235, 0.8)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover",
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-8">
              <img
                src={artisan.profilePic}
                alt={artisan.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/profiles/default-artisan.jpg";
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">{artisan.businessName}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start mt-2 gap-2">
                <div className="text-amber-400 mr-1">
                  <RatingStars rating={artisan.rating} size="md" />
                </div>
                <span className="text-sm md:text-base">
                  {artisan.rating.toFixed(1)} ({artisan.reviewCount} reviews)
                </span>
                <span className="hidden md:inline mx-2">|</span>
                {artisan.verificationStatus === "verified" && (
                  <span className="bg-blue-500 px-2 py-1 rounded-full text-xs md:text-sm">
                    <i className="fas fa-badge-check mr-1"></i> Verified
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 text-sm md:text-base">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-1 md:mr-2"></i>
                  <span>{artisan.location}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-tools mr-1 md:mr-2"></i>
                  <span>{artisan.experience} experience</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-wallet mr-1 md:mr-2"></i>
                  <span>From GHS {artisan.hourlyRate}/hr</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                <a
                  href={`https://wa.me/${artisan.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-5 py-1 md:py-2 rounded-lg flex items-center text-sm md:text-base"
                >
                  <i className="fab fa-whatsapp mr-1 md:mr-2"></i> WhatsApp
                </a>
                <a
                  href={`tel:${artisan.phone}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-1 md:py-2 rounded-lg flex items-center text-sm md:text-base"
                >
                  <i className="fas fa-phone mr-1 md:mr-2"></i> Call
                </a>
                <button 
                  onClick={() => setSaved(!saved)}
                  className={`${saved ? 'bg-blue-100 text-blue-600' : 'bg-white text-blue-600'} px-3 md:px-5 py-1 md:py-2 rounded-lg flex items-center text-sm md:text-base border border-blue-200`}
                >
                  <i className={`${saved ? 'fas' : 'far'} fa-bookmark mr-1 md:mr-2`}></i> 
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="border-b overflow-x-auto">
            <nav className="flex">
              <button
                className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === "overview" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === "portfolio" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setActiveTab("portfolio")}
              >
                Portfolio
              </button>
              <button
                className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === "reviews" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({artisan.reviewCount})
              </button>
              <button
                className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base whitespace-nowrap ${activeTab === "pricing" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setActiveTab("pricing")}
              >
                Services & Pricing
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 md:p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl font-bold mb-3 md:mb-4">
                    About {artisan.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {artisan.description}
                  </p>
                </div>

                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl font-bold mb-3 md:mb-4">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {artisan.specialties.map((service, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-sm transition-shadow"
                      >
                        <h3 className="font-semibold text-base md:text-lg flex items-center">
                          <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                          {service}
                        </h3>
                        <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                          Professional {service.toLowerCase()} services
                        </p>
                        <p className="mt-1 md:mt-2 font-semibold text-sm md:text-base">
                          Starting at GHS {artisan.hourlyRate}/hr
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === "portfolio" && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl font-bold mb-3 md:mb-4">Recent Projects</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {artisan.portfolio.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 md:mt-4 text-center">
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-800">
                    View Full Portfolio ({artisan.portfolio.length} Photos)
                  </a>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl font-bold mb-3 md:mb-4">Customer Reviews</h2>
                
                {/* Rating Summary */}
                <div className="flex flex-col md:flex-row items-center mb-4 md:mb-6 bg-gray-50 p-3 md:p-4 rounded-lg">
                  <div className="text-center md:text-left mb-3 md:mb-0 md:mr-8">
                    <div className="text-4xl md:text-5xl font-bold text-blue-600">
                      {artisan.rating.toFixed(1)}
                    </div>
                    <div className="text-amber-400 text-lg md:text-xl">
                      <RatingStars rating={artisan.rating} size="lg" />
                    </div>
                    <div className="text-gray-600 text-sm md:text-base">
                      {artisan.reviewCount} reviews
                    </div>
                  </div>

                  <div className="flex-grow w-full md:w-auto">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center mb-1">
                        <span className="w-12 md:w-16 text-right mr-1 md:mr-2 text-xs md:text-sm">
                          {rating} star{rating !== 1 ? 's' : ''}
                        </span>
                        <div className="flex-grow md:w-48 bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-amber-400 h-2 rounded-full"
                            style={{
                              width: `${ratingDistribution[rating] || 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="ml-1 md:ml-2 w-8 md:w-10 text-xs md:text-sm">
                          {Math.round(ratingDistribution[rating] || 0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Form */}
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                  <h3 className="text-lg font-semibold mb-2 md:mb-3">Write a Review</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 md:mb-4">
                      <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                        Your Rating <span className="text-red-500">*</span>
                      </label>
                      <div className="flex text-xl md:text-2xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className={`${star <= (hover || rating) ? "text-amber-400" : "text-gray-300"} mx-0.5 md:mx-1`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      {rating === 0 && (
                        <p className="text-red-500 text-xs md:text-sm mt-1">Please select a rating</p>
                      )}
                    </div>

                    <div className="mb-3 md:mb-4">
                      <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                        Your Review <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register("comment", { required: "Review is required" })}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        rows="4"
                        placeholder="Share your experience..."
                      />
                      {errors.comment && (
                        <p className="text-red-500 text-xs md:text-sm mt-1">
                          {errors.comment.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || rating === 0}
                      className={`px-4 md:px-6 py-2 rounded-lg text-sm md:text-base ${isSubmitting || rating === 0 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>

                    {isSubmitSuccessful && (
                      <p className="text-green-600 text-sm md:text-base mt-2">Review submitted successfully!</p>
                    )}
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-4 md:space-y-6">
                  {artisan.reviews.map((review) => {
                    const ratingLabel = getRatingLabel(review.rating);
                    const labelColor = {
                      'Excellent': 'bg-green-100 text-green-800',
                      'Good': 'bg-blue-100 text-blue-800',
                      'Fair': 'bg-yellow-100 text-yellow-800',
                      'Poor': 'bg-orange-100 text-orange-800',
                      'Bad': 'bg-red-100 text-red-800'
                    }[ratingLabel];

                    return (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-4 md:pb-6 last:border-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 md:mb-3">
                          <div className="flex items-center mb-2 sm:mb-0">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden mr-2 md:mr-3">
                              <img
                                src={review.user.profilePic || '/profiles/default-user.jpg'}
                                alt={review.user.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/profiles/default-user.jpg';
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm md:text-base">{review.user.name}</h3>
                              <div className="flex items-center mt-1">
                                <RatingStars rating={review.rating} size="sm" />
                                <span className={`ml-1 md:ml-2 text-xs px-2 py-0.5 md:py-1 rounded-full ${labelColor}`}>
                                  {ratingLabel}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs md:text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <div className="pl-0 sm:pl-11 md:pl-13">
                          <p className="text-gray-700 mt-1 md:mt-2 text-sm md:text-base">{review.comment}</p>
                          
                          {/* Review Actions */}
                          <div className="flex items-center mt-2 md:mt-3 text-xs md:text-sm">
                            <button className="text-blue-600 hover:text-blue-800 mr-3 md:mr-4 flex items-center">
                              <i className="far fa-thumbs-up mr-1"></i> Helpful
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 flex items-center">
                              <i className="far fa-comment mr-1"></i> Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

             
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <div>
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl font-bold mb-3 md:mb-4">Services & Pricing</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {artisan.services.map((service, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                              <div className="text-sm md:text-base font-medium text-gray-900">
                                {service.service}
                              </div>
                            </td>
                            <td className="px-4 md:px-6 py-4">
                              <div className="text-sm md:text-base text-gray-500">
                                {service.description}
                              </div>
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-500">
                              {service.price}
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm md:text-base text-gray-500">
                              {service.estimatedTime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-1 md:mb-2">Pricing Notes</h3>
                  <p className="whitespace-pre-line text-gray-600 text-sm md:text-base">
                    {artisan.pricingNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Report Button */}
            <div className="text-right mt-4 md:mt-6">
              <button className="text-red-600 hover:text-red-800 text-sm md:text-base">
                <i className="fas fa-flag mr-1 md:mr-2"></i>Report Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfilePage;