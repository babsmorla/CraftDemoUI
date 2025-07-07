import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ArtisanCard from '../../components/ui/ArtisanCard';
import artisans from '../data/artisans';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.get('q') || '');
  const [locationFilter, setLocationFilter] = useState(queryParams.get('location') || '');
  const [filteredArtisans, setFilteredArtisans] = useState([]);
  
  useEffect(() => {
    // Filter artisans based on search criteria
    const results = artisans.filter(artisan => {
      const matchesSearch = artisan.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           artisan.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = locationFilter ? artisan.location.includes(locationFilter) : true;
      return matchesSearch && matchesLocation;
    });
    
    setFilteredArtisans(results);
  }, [searchTerm, locationFilter]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Skilled Artisans</h1>
        <p className="text-gray-600">Search for trusted professionals in your area</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Location</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={locationFilter}
                onChange={handleLocationChange}
              >
                <option value="">All of Ghana</option>
                <option value="Greater Accra">Greater Accra</option>
                <option value="Ashanti Region">Ashanti Region</option>
                <option value="Western Region">Western Region</option>
                <option value="Central Region">Central Region</option>
                <option value="Volta Region">Volta Region</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Service Category</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Carpentry</option>
                <option>Painting</option>
                <option>Tailoring</option>
                <option>Masonry</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="rating-5" className="mr-2" />
                  <label htmlFor="rating-5" className="text-gray-700">
                    <span className="text-amber-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-4" className="mr-2" defaultChecked />
                  <label htmlFor="rating-4" className="text-gray-700">
                    <span className="text-amber-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i> 4+
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating-3" className="mr-2" />
                  <label htmlFor="rating-3" className="text-gray-700">
                    <span className="text-amber-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i> 3+
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Verified Only</label>
              <div className="flex items-center">
                <input type="checkbox" id="verified" className="mr-2" defaultChecked />
                <label htmlFor="verified" className="text-gray-700">Show verified artisans only</label>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Apply Filters</button>
            <button className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Reset Filters</button>
          </div>
        </div>
        
        {/* Results */}
        <div className="lg:w-3/4">
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex">
            <input 
              type="text" 
              placeholder="Search for plumbers, electricians, tailors..." 
              className="flex-grow px-4 py-2 text-gray-800 focus:outline-none rounded-l-lg"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 font-medium">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          {/* Map View */}
          <div className="map-container mb-8">
            <div className="map-placeholder">
              <i className="fas fa-map-marked-alt text-4xl mb-4 text-gray-400"></i>
              <h3 className="text-xl font-semibold mb-2">Artisan Locations Map</h3>
              <p className="text-center px-4">Interactive map showing verified artisans in your selected area</p>
            </div>
          </div>
          
          {/* Artisan Results */}
          <div className="space-y-6">
            {filteredArtisans.length > 0 ? (
              filteredArtisans.map(artisan => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">No artisans found</h3>
                <p>Try adjusting your search filters</p>
              </div>
            )}
            
            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-blue-600 rounded-l-lg">
                  <i className="fas fa-arrow-left"></i>
                </a>
                <a href="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white text-blue-600 font-medium">1</a>
                <a href="#" className="py-2 px-4 border-t border-b border-gray-300 bg-blue-600 text-white font-medium">2</a>
                <a href="#" className="py-2 px-4 border-t border-b border-gray-300 bg-white text-blue-600 font-medium">3</a>
                <a href="#" className="py-2 px-4 border border-gray-300 bg-white text-blue-600 rounded-r-lg">
                  <i className="fas fa-arrow-right"></i>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;