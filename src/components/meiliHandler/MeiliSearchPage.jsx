import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ArtisanCard from "../../components/ui/ArtisanCard";
import { artisansIndex } from "../../lib/meiliClient";
import { MapPin, Search, Star, ArrowLeft, ArrowRight } from "lucide-react";

const LOCATIONS = [
  "Greater Accra",
  "Ashanti Region",
  "Western Region",
  "Central Region",
  "Volta Region",
];
const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Tailoring",
  "Masonry",
];
const RATINGS = [5, 4, 3];

const MeiliSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(queryParams.get("q") || "");
  const [locationFilter, setLocationFilter] = useState(
    queryParams.get("location") || ""
  );
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filteredArtisans, setFilteredArtisans] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const filters = [];

      if (locationFilter) {
        filters.push(`location = "${locationFilter}"`);
      }
      if (categoryFilter) {
        filters.push(`specialties = "${categoryFilter}"`);
      }
      if (verifiedOnly) {
        filters.push(`isVerified = true`);
      }
      if (selectedRatings.length > 0) {
        const ratingFilters = selectedRatings
          .map((r) => `rating >= ${r}`)
          .join(" OR ");
        filters.push(`(${ratingFilters})`);
      }

      const filterString = filters.join(" AND ");

      const searchResult = await artisansIndex.search(searchTerm, {
        filter: filterString || undefined,
        limit: 30,
      });

      setFilteredArtisans(searchResult.hits);
    } catch (error) {
      console.error("Meili search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setLocationFilter("");
    setCategoryFilter("");
    setSelectedRatings([]);
    setVerifiedOnly(false);
    setSearchTerm("");
    handleSearch();
  };

  useEffect(() => {
    handleSearch();
  }, []); // load on mount

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Find Skilled Artisans
        </h1>
        <p className="text-gray-600 max-w-lg">
          Search for trusted professionals in your area
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 sticky top-24 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>

            {/* Location */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">All of Ghana</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Ratings */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Rating
              </label>
              <div className="space-y-2">
                {RATINGS.map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingToggle(rating)}
                      className="accent-indigo-600"
                    />
                    <div className="flex items-center space-x-0.5 text-amber-400">
                      {[...Array(rating)].map((_, idx) => (
                        <Star key={idx} size={16} fill="currentColor" />
                      ))}
                      {[...Array(5 - rating)].map((_, idx) => (
                        <Star key={idx} size={16} className="text-gray-300" />
                      ))}
                      <span className="text-gray-700 text-sm ml-1">
                        {rating}+
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Verified */}
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={() => setVerifiedOnly(!verifiedOnly)}
                  className="accent-indigo-600"
                />
                <span className="text-gray-700 font-medium">Verified Only</span>
              </label>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleSearch}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Results Section */}
        <main className="lg:w-3/4 space-y-6">
          {/* Search Bar */}
          <div className="flex bg-white rounded-md border overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search for plumbers, electricians, tailors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-600 px-4 flex items-center justify-center text-white hover:bg-indigo-700 transition"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-xl border p-6 flex flex-col items-center justify-center text-center">
            <MapPin size={32} className="text-gray-400 mb-2" />
            <h3 className="text-lg font-semibold">Artisan Locations Map</h3>
            <p className="text-sm text-gray-500">
              Interactive map showing verified artisans in your selected area.
            </p>
          </div>

          {/* Artisan Cards */}
          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-gray-600">Loading artisans...</p>
            ) : filteredArtisans.length > 0 ? (
              filteredArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))
            ) : (
              <div className="flex flex-col items-center bg-white rounded-xl border p-6">
                <Search size={32} className="text-gray-400 mb-2" />
                <p className="text-gray-600">
                  No artisans found with current filters.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MeiliSearchPage;
