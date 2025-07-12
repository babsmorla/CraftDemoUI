import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mock data matching backend structure
const mockVerificationData = {
  id: "ver_123456789",
  status: "rejected", // "approved", "rejected"
  submittedAt: "2023-07-15T10:30:00.000Z",
  reviewedAt: null,
  documents: [
    { 
      type: "id_front", 
      url: "/uploads/id_front.jpg",
      verified: false
    },
    { 
      type: "id_back", 
      url: "/uploads/id_back.jpg",
      verified: false
    },
    { 
      type: "address_proof", 
      url: "/uploads/address_proof.pdf",
      verified: false
    },
    { 
      type: "business_reg", 
      url: "/uploads/business_reg.pdf",
      verified: false
    }
  ],
  rejectionReason: "We cant Verify you now"
};

function ArtisanVerificationStatusPage() {
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDoc, setExpandedDoc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch verification status
    const fetchVerificationStatus = async () => {
      try {
        // In real app: 
        // const response = await fetch('/api/verification/status');
        // const data = await response.json();
        
        // Using mock data
        setVerificationData(mockVerificationData);
      } catch (error) {
        console.error("Failed to fetch verification status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, []);

  const statusConfig = {
    pending: {
      title: "Verification Pending",
      description: "Your documents are under review. This usually takes 1-3 business days.",
      icon: "⏳",
      color: "bg-yellow-100 text-yellow-800",
      action: null
    },
    approved: {
      title: "Verified Successfully!",
      description: "Your account is now fully verified. You can access all features.",
      icon: "✅",
      color: "bg-green-100 text-green-800",
      action: {
        text: "Go to Dashboard",
        handler: () => navigate("/artisan/dashboard")
      }
    },
    rejected: {
      title: "Verification Rejected",
      description: "We found issues with your submission. Please review the reason below.",
      icon: "❌",
      color: "bg-red-100 text-red-800",
      // action: {
      //   text: "Resubmit Documents",
      //   handler: () => navigate("/artisan/verification")
      // }
    }
  };

  const documentTypes = {
    id_front: "Front of ID",
    id_back: "Back of ID",
    address_proof: "Proof of Address",
    business_reg: "Business Registration"
  };

  const openDocument = (doc) => {
    setExpandedDoc(doc);
  };

  const closeDocument = () => {
    setExpandedDoc(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!verificationData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Verification Status Unavailable</h2>
        <p className="text-gray-600 mb-6">
          We couldn't retrieve your verification status. Please try again later.
        </p>
        <button
          onClick={() => navigate("/artisan")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const status = verificationData.status;
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Verification Status</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Status Banner */}
          <div className={`flex items-start p-4 rounded-lg ${config.color} mb-8`}>
            <span className="text-2xl mr-4">{config.icon}</span>
            <div>
              <h2 className="text-xl font-semibold">{config.title}</h2>
              <p className="mt-2">{config.description}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Submission Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Request ID:</span> {verificationData.id}
                </p>
                <p>
                  <span className="text-gray-600">Submitted:</span>{" "}
                  {new Date(verificationData.submittedAt).toLocaleString()}
                </p>
                {verificationData.reviewedAt && (
                  <p>
                    <span className="text-gray-600">Reviewed:</span>{" "}
                    {new Date(verificationData.reviewedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {status === "rejected" && (
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">Rejection Reason</h3>
                <p>{verificationData.rejectionReason || "Your submission didn't meet our verification requirements."}</p>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Submitted Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationData.documents.map((doc, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div 
                    className="bg-gray-100 p-4 h-48 flex items-center justify-center cursor-pointer"
                    onClick={() => openDocument(doc)}
                  >
                    {doc.url.endsWith(".pdf") ? (
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-700 mt-2">PDF Document</span>
                      </div>
                    ) : (
                      <img 
                        src={doc.url} 
                        alt={documentTypes[doc.type] || doc.type} 
                        className="object-contain h-full w-full"
                      />
                    )}
                  </div>
                  <div className="p-3 bg-white border-t border-gray-200">
                    <p className="text-sm font-medium">
                      {documentTypes[doc.type] || doc.type.replace('_', ' ')}
                    </p>
                    <p className={`text-xs mt-1 ${
                      doc.verified ? "text-green-600" : "text-gray-500"
                    }`}>
                      {doc.verified ? "Verified" : "Pending verification"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/artisan")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
            
            {config.action && (
              <button
                onClick={config.action.handler}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {config.action.text}
              </button>
            )}
            
            {status === "rejected" && (
              <button
                onClick={() => navigate("/artisan/verification")}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Resubmit Documents
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Document Modal */}
      {expandedDoc && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeDocument}
        >
          <div className="max-w-4xl max-h-full overflow-auto bg-white rounded-lg">
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <h3 className="font-medium">
                {documentTypes[expandedDoc.type] || expandedDoc.type.replace('_', ' ')}
              </h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={closeDocument}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 max-h-[80vh] overflow-auto">
              {expandedDoc.url.endsWith(".pdf") ? (
                <iframe 
                  src={expandedDoc.url} 
                  title="Document Preview"
                  className="w-full h-[70vh]"
                />
              ) : (
                <img 
                  src={expandedDoc.url} 
                  alt="Document Preview" 
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtisanVerificationStatusPage;