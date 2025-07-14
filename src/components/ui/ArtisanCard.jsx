import React from 'react';
import { Link } from 'react-router-dom';
import { publicArtisanProfile } from '../../pages/data/dummyData';
import RatingStars from './RatingStars';

const ArtisanCard = () => {
  return (
    <div className="artisan-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="md:flex">
        <div className="md:w-1/4">
          <div className="h-48 md:h-full bg-gray-200 relative">
            <img 
              src={publicArtisanProfile.profilePic} 
              alt={publicArtisanProfile.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/profiles/default-artisan.jpg";
              }}
            />
            {publicArtisanProfile.verificationStatus === "verified" && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                <i className="fas fa-badge-check"></i> Verified
              </div>
            )}
          </div>
        </div>
        <div className="p-6 md:w-3/4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-bold">{publicArtisanProfile.businessName}</h3>
              <div className="flex items-center mt-1">
                <RatingStars rating={publicArtisanProfile.rating} />
                <span className="text-gray-600 ml-2">
                  {publicArtisanProfile.rating} ({publicArtisanProfile.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-semibold">GHS {publicArtisanProfile.hourlyRate}/hr</span>
              <p className="text-sm text-gray-600">Starting price</p>
            </div>
          </div>
          
          <p className="mt-4 text-gray-600">{publicArtisanProfile.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {publicArtisanProfile.specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <a 
              href={`https://wa.me/${publicArtisanProfile.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <i className="fab fa-whatsapp mr-2"></i> WhatsApp
            </a>
            <a 
              href={`tel:${publicArtisanProfile.phone}`} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <i className="fas fa-phone mr-2"></i> Call Now
            </a>
            <Link 
              to={`/artisan/${publicArtisanProfile.id}`} 
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;