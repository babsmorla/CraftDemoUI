import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RequestCard from '../../components/ui/RequestCard';
import RequestDetail from '../../components/homeowner/RequestDetail';
import ChatInterface from '../../components/chat/ChatInterface';

const HomeownerDashboardPage = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [view, setView] = useState('requests'); // 'requests' or 'chat'
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('craftconnect_requests')) || [];
    const userRequests = storedRequests.filter(
      req => req.homeownerId === currentUser?.id
    );
    setRequests(userRequests);
    
    // Load artisans
    const storedArtisans = JSON.parse(localStorage.getItem('craftconnect_artisans')) || [];
    setArtisans(storedArtisans);
  }, [currentUser]);

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setView('detail');
  };

  const handleCancelRequest = (requestId, reason) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'cancelled', cancellationReason: reason } 
        : req
    );
    setRequests(updatedRequests);
    setSelectedRequest(updatedRequests.find(req => req.id === requestId));
    
    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem('craftconnect_requests')) || [];
    const updatedAllRequests = allRequests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'cancelled', cancellationReason: reason } 
        : req
    );
    localStorage.setItem('craftconnect_requests', JSON.stringify(updatedAllRequests));
  };

  const handleStartChat = (request) => {
    setSelectedRequest(request);
    setView('chat');
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Service Requests</h1>
      
      {view === 'requests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold">No requests yet</h3>
              <p className="text-gray-600 mt-2">
                Start by requesting services from artisans
              </p>
            </div>
          ) : (
            requests.map(request => (
              <RequestCard 
                key={request.id} 
                request={request} 
                artisan={artisans.find(a => a.id === request.artisanId)}
                onClick={() => handleSelectRequest(request)}
              />
            ))
          )}
        </div>
      )}
      
      {view === 'detail' && selectedRequest && (
        <RequestDetail 
          request={selectedRequest} 
          artisan={artisans.find(a => a.id === selectedRequest.artisanId)}
          onCancel={handleCancelRequest}
          onBack={() => setView('requests')}
          onChat={() => handleStartChat(selectedRequest)}
        />
      )}
      
      {view === 'chat' && selectedRequest && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setView('detail')}
              className="text-blue-600 hover:text-blue-800 mr-4"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h2 className="text-xl font-bold">
              Chat with {artisans.find(a => a.id === selectedRequest.artisanId)?.name}
            </h2>
          </div>
          <ChatInterface 
            request={selectedRequest} 
            currentUser={currentUser}
            receiverId={selectedRequest.artisanId}
          />
        </div>
      )}
    </div>
  );
};

export default HomeownerDashboardPage;