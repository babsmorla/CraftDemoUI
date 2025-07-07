import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RatingStars from '../../components/ui/RatingStars';
import artisans from '../data/artisans';

const ArtisanProfilePage = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const foundArtisan = artisans.find(a => a.id === id);
    setArtisan(foundArtisan);
  }, [id]);
  
  if (!artisan) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Calculate rating distribution
  const ratingDistribution = {
    5: artisan.reviews.filter(r => r.rating === 5).length / artisan.reviews.length * 100,
    4: artisan.reviews.filter(r => r.rating === 4).length / artisan.reviews.length * 100,
    3: artisan.reviews.filter(r => r.rating === 3).length / artisan.reviews.length * 100,
    2: artisan.reviews.filter(r => r.rating === 2).length / artisan.reviews.length * 100,
    1: artisan.reviews.filter(r => r.rating === 1).length / artisan.reviews.length * 100
  };
  
  return (
    <div>
      <div 
        className="profile-header text-white py-12"
        style={{
          background: "linear-gradient(rgba(37, 99, 235, 0.9), rgba(37, 99, 235, 0.8)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover"
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 md:mb-0 md:mr-8">
              <img src={artisan.profileImage} alt={artisan.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{artisan.businessName}</h1>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <div className="text-amber-400 mr-2">
                  <RatingStars rating={artisan.rating} size="lg" />
                </div>
                <span>{artisan.rating} ({artisan.reviewCount} reviews)</span>
                <span className="mx-3">|</span>
                {artisan.isVerified && (
                  <span className="bg-blue-500 px-2 py-1 rounded-full text-sm">
                    <i className="fas fa-badge-check mr-1"></i> Verified
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>{artisan.location}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-tools mr-2"></i>
                  <span>{artisan.experience} experience</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-wallet mr-2"></i>
                  <span>Starting at ${artisan.hourlyRate}/hr</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <a 
                  href={`https://wa.me/${artisan.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center"
                >
                  <i className="fab fa-whatsapp mr-2"></i> Message on WhatsApp
                </a>
                <a 
                  href={`tel:${artisan.phone}`} 
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center"
                >
                  <i className="fas fa-phone mr-2"></i> Call Now
                </a>
                <button className="bg-white text-blue-600 px-5 py-2 rounded-lg flex items-center">
                  <i className="fas fa-bookmark mr-2"></i> Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Navigation Tabs */}
          <div className="border-b">
            <nav className="flex flex-wrap">
              <button 
                className={`px-6 py-4 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-6 py-4 font-medium ${activeTab === 'portfolio' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('portfolio')}
              >
                Portfolio
              </button>
              <button 
                className={`px-6 py-4 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({artisan.reviewCount})
              </button>
              <button 
                className={`px-6 py-4 font-medium ${activeTab === 'pricing' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('pricing')}
              >
                Services & Pricing
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">About {artisan.name}</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {artisan.description}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {artisan.specialties.map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-lg flex items-center">
                          <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                          {service}
                        </h3>
                        <p className="text-gray-600 mt-2">Professional {service.toLowerCase()} services</p>
                        <p className="mt-2 font-semibold">Starting at ${artisan.hourlyRate}/hr</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {artisan.portfolio.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Project ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <a href="#" className="text-blue-600 font-medium">View Full Portfolio ({artisan.portfolio.length} Photos)</a>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                <div className="flex flex-col md:flex-row items-center mb-6">
                  <div className="text-center md:text-left mb-4 md:mb-0 md:mr-10">
                    <div className="text-5xl font-bold text-blue-600">{artisan.rating}</div>
                    <div className="text-amber-400 text-xl">
                      <RatingStars rating={artisan.rating} size="lg" />
                    </div>
                    <div className="text-gray-600">{artisan.reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-grow">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center mb-1">
                        <span className="w-16 text-right mr-2">{rating} stars</span>
                        <div className="w-48 bg-gray-200 h-2 rounded-full">
                          <div 
                            className="bg-amber-400 h-2 rounded-full" 
                            style={{ width: `${ratingDistribution[rating] || 0}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{Math.round(ratingDistribution[rating] || 0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Review Form */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Your Rating</label>
                    <div className="flex text-2xl text-gray-300">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="fas fa-star hover:text-amber-400 cursor-pointer"></i>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Review Title</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Summarize your experience" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Your Review</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Share details of your experience"></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Upload Photos (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
                      <p className="text-gray-500">Drag & drop images here or click to browse</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Submit Review</button>
                </div>
                
                {/* Reviews List */}
                <div className="space-y-6">
                  {artisan.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{review.title}</h3>
                        <RatingStars rating={review.rating} />
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span>By {review.name}</span>
                        <span className="mx-2">•</span>
                        <span>{review.date}</span>
                      </div>
                      <p className="mt-3 text-gray-600">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Services & Pricing</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estimated Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {artisan.specialties.map((service, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{service}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">Professional {service.toLowerCase()} service</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${artisan.hourlyRate}/hr
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Varies by project
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Pricing Notes</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Prices are estimates and may vary based on project complexity</li>
                    <li>Minimum service charge: 1 hour</li>
                    <li>Materials not included in pricing</li>
                    <li>Free quotes available upon request</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Report Button */}
            <div className="text-right mt-8">
              <button className="text-red-600 hover:text-red-800">
                <i className="fas fa-flag mr-2"></i>Report Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfilePage;