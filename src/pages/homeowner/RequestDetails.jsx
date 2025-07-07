import React, { useState } from 'react';
import RatingStars from '../ui/RatingStars';

const RequestDetail = ({ request, artisan, onCancel, onBack, onChat }) => {
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCancel = () => {
    if (!cancellationReason) return;
    setIsSubmitting(true);
    onCancel(request.id, cancellationReason);
    setIsSubmitting(false);
    setShowCancelForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 mr-4"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold">Request Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">Service Request</h3>
          <p className="text-gray-800">{request.service}</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">Description</h3>
          <p className="text-gray-600">{request.description}</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">Status</h3>
          <div className="flex items-center">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
            {request.status === 'cancelled' && request.cancellationReason && (
              <p className="ml-4 text-gray-600 italic">Reason: {request.cancellationReason}</p>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">Requested On</h3>
          <p className="text-gray-600">{formatDate(request.createdAt)}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2">Artisan Information</h3>
          {artisan ? (
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-200">
                {artisan.profileImage ? (
                  <img 
                    src={artisan.profileImage} 
                    alt={artisan.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold">{artisan.businessName}</h4>
                <div className="flex items-center mt-1">
                  <RatingStars rating={artisan.rating} />
                  <span className="text-gray-600 ml-2">{artisan.rating} ({artisan.reviewCount} reviews)</span>
                </div>
                <p className="text-gray-600 mt-1">{artisan.location}</p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    artisan.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {artisan.available ? 'Available now' : 'Not available'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Artisan information not available</p>
          )}
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Scheduled Date</h3>
            {request.scheduledDate ? (
              <p className="text-gray-600">{formatDate(request.scheduledDate)}</p>
            ) : (
              <p className="text-gray-600">Not scheduled yet</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 flex justify-between">
        {request.status === 'pending' && (
          <button
            onClick={() => setShowCancelForm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Cancel Request
          </button>
        )}
        
        {request.status === 'accepted' && (
          <button
            onClick={onChat}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <i className="fas fa-comments mr-2"></i>Chat with Artisan
          </button>
        )}
      </div>
      
      {showCancelForm && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Cancel Service Request</h3>
          <p className="text-gray-600 mb-4">Please provide a reason for cancellation</p>
          <textarea
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            rows="3"
            placeholder="Enter reason for cancellation..."
          ></textarea>
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              disabled={isSubmitting || !cancellationReason}
              className={`px-4 py-2 rounded-lg ${
                isSubmitting || !cancellationReason
                  ? 'bg-red-300 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
            >
              {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
            </button>
            <button
              onClick={() => setShowCancelForm(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetail;