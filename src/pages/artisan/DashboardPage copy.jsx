import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // Sample data
  const jobRequests = [
    {
      id: "1",
      title: "Pipe repair in kitchen",
      date: "Today, 10:30 AM",
      client: "Ama Johnson, East Legon",
      description: "Kitchen sink pipe is leaking and needs urgent repair. Water is dripping under the sink cabinet.",
      status: "pending"
    },
    {
      id: "2",
      title: "Install new bathroom fixtures",
      date: "Yesterday, 3:45 PM",
      client: "Kofi Boateng, Airport Residential",
      description: "Need installation of new sink, toilet, and shower in master bathroom renovation project.",
      status: "viewed"
    }
  ];
  
  const recentReviews = [
    {
      id: "1",
      title: "Excellent pipe repair service",
      name: "Ama Johnson",
      date: "June 15, 2023",
      rating: 5,
      content: "Kwame arrived on time and fixed our kitchen pipe leak efficiently. He was professional, courteous, and cleaned up after finishing the job. Highly recommended!"
    },
    {
      id: "2",
      title: "Great installation work",
      name: "Samuel Owusu",
      date: "June 10, 2023",
      rating: 4.5,
      content: "Kwame installed new bathroom fixtures for us. The work was done professionally and he offered helpful advice on maintenance. Will definitely hire again."
    }
  ];
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Profile Completion</h2>
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">85% complete</span>
              <span className="text-blue-600">Verified</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">Complete your profile to appear higher in search results and get more job requests</p>
          <Link to="/artisan/profile" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Complete Profile
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Job Requests */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Job Requests</h2>
              <Link to="/artisan/jobs" className="text-blue-600 hover:text-blue-800">View All</Link>
            </div>
            
            <div className="space-y-4">
              {jobRequests.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{job.title}</h3>
                    <span className="text-sm text-gray-500">{job.date}</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <i className="fas fa-user text-gray-500 mr-2"></i>
                    <span>{job.client}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{job.description}</p>
                  <div className="mt-4 flex gap-3">
                    {job.status === "pending" ? (
                      <>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Accept</button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">Decline</button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Message</button>
                      </>
                    ) : (
                      <>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">View Details</button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Message</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Reviews</h2>
              <a href="#" className="text-blue-600 hover:text-blue-800">View All</a>
            </div>
            
            <div className="space-y-6">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{review.title}</h3>
                    <div className="text-amber-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className={review.rating >= 4.5 ? "fas fa-star" : "fas fa-star-half-alt"}></i>
                    </div>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span>By {review.name}</span>
                    <span className="mx-2">•</span>
                    <span>{review.date}</span>
                  </div>
                  <p className="mt-3 text-gray-600">{review.content}</p>
                  <div className="mt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      <i className="fas fa-reply mr-1"></i> Respond to Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          {/* Verification Status */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Verification Status</h2>
            <div className="flex items-start mb-4">
              <i className="fas fa-badge-check text-green-500 text-2xl mt-1 mr-3"></i>
              <div>
                <h3 className="font-semibold">Identity Verified</h3>
                <p className="text-gray-600 text-sm">Your government ID has been verified</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-badge-check text-green-500 text-2xl mt-1 mr-3"></i>
              <div>
                <h3 className="font-semibold">Professional Verified</h3>
                <p className="text-gray-600 text-sm">Your trade certifications have been verified</p>
              </div>
            </div>
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Renew Verification</button>
          </div>
          
          {/* Performance Stats */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Performance Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Response Rate</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Job Completion</span>
                  <span className="font-semibold">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Positive Reviews</span>
                  <span className="font-semibold">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/artisan/profile" className="bg-blue-50 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-100">
                <i className="fas fa-edit text-2xl mb-2"></i>
                <p>Edit Profile</p>
              </Link>
              <Link to="#" className="bg-blue-50 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-100">
                <i className="fas fa-camera text-2xl mb-2"></i>
                <p>Add Portfolio</p>
              </Link>
              <Link to="#" className="bg-blue-50 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-100">
                <i className="fas fa-calendar-alt text-2xl mb-2"></i>
                <p>Availability</p>
              </Link>
              <Link to="#" className="bg-blue-50 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-100">
                <i className="fas fa-chart-line text-2xl mb-2"></i>
                <p>Insights</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;