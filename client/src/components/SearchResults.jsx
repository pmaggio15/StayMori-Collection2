// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const SearchResults = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   // If user hits /search directly
//   if (!state) {
//     return (
//       <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-32 py-12">
//         <div className="flex items-center gap-3 mb-6">
//           <button
//             onClick={() => navigate("/")}
//             className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//             aria-label="Back to Home"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//             Home
//           </button>
//           <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
//         </div>

//         <p className="text-gray-600">No search performed yet. Try searching from the home page.</p>
//       </div>
//     );
//   }

//   const { rooms, searchCriteria } = state;

//   return (
//     <div className="pt-42 px-6 md:px-16 lg:px-24 xl:px-32 pb-12">
//       {/* Top bar */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//             aria-label="Back to Home"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//             Home
//           </button>

//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
//             <p className="text-gray-600">
//               {rooms.length > 0
//                 ? `Found ${rooms.length} room${rooms.length !== 1 ? "s" : ""}${
//                     searchCriteria.destination ? ` in ${searchCriteria.destination}` : ""
//                   }`
//                 : "No rooms found matching your criteria"}
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => navigate("/")}
//           className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//         >
//           New Search
//         </button>
//       </div>

//       {/* Results */}
//       {rooms.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {rooms.map((room) => (
//             <div
//               key={room._id}
//               className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="h-48 bg-gray-200 relative overflow-hidden">
//                 <img
//                   src={room.images[0]}
//                   alt={room.roomType}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.roomType}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{room.hotel.name}</p>
//                 <p className="text-sm text-gray-500 mb-4">📍 {room.hotel.city}</p>

//                 {/* Amenities */}
//                 <div className="mb-4">
//                   <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
//                   <div className="flex flex-wrap gap-1">
//                     {room.amenities.slice(0, 3).map((amenity, idx) => (
//                       <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
//                         {amenity}
//                       </span>
//                     ))}
//                     {room.amenities.length > 3 && (
//                       <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
//                         +{room.amenities.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Price & availability */}
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <span className="text-xl font-bold text-gray-900">${room.pricePerNight}</span>
//                     <span className="text-sm text-gray-500">/night</span>
//                   </div>

//                   <div
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       room.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {room.isAvailable ? "Available" : "Unavailable"}
//                   </div>
//                 </div>

//                 <button
//                   disabled={!room.isAvailable}
//                   className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors cursor-not-allowed ${
//                     room.isAvailable
//                       ? "bg-gray-900 text-white hover:bg-gray-800"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   {room.isAvailable ? "Book Now" : "Not Available"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">No rooms found</h3>
//           <p className="text-gray-500">Try adjusting your search criteria</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// API function - you can move this to a separate file later
const getFeaturedHotels = async (cityCode = "NYC") => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE || window.location.origin;
  const url = new URL("/api/amadeus/hotels", API_BASE_URL);
  url.searchParams.set("cityCode", cityCode);

  const response = await fetch(url.toString());
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}: ${errorText.slice(0, 200)}`);
  }
  const payload = await response.json();
  return Array.isArray(payload?.data) ? payload.data : [];
};

const SearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // State for Amadeus hotels
  const [amadeusHotels, setAmadeusHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [selectedTab, setSelectedTab] = useState("local"); // "local" or "global"
  const [cityCode, setCityCode] = useState("NYC");

  // Function to search Amadeus hotels
  const searchAmadeusHotels = async (city = "NYC") => {
    setLoadingHotels(true);
    try {
      const hotelData = await getFeaturedHotels(city);
      setAmadeusHotels(hotelData);
    } catch (error) {
      console.error("Error fetching Amadeus hotels:", error);
      setAmadeusHotels([]);
    }
    setLoadingHotels(false);
  };

  // Load default hotels when component mounts
  useEffect(() => {
    searchAmadeusHotels();
  }, []);

  // If user hits /search directly
  if (!state) {
    return (
      <div className="pt-28 px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Back to Home"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
        </div>

        {/* Tab navigation for direct access */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setSelectedTab("local")}
            className={`px-4 py-2 font-medium ${
              selectedTab === "local"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Local Rooms
          </button>
          <button
            onClick={() => setSelectedTab("global")}
            className={`px-4 py-2 font-medium ${
              selectedTab === "global"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Global Hotels
          </button>
        </div>

        {selectedTab === "local" ? (
          <p className="text-gray-600">No local search performed yet. Try searching from the home page.</p>
        ) : (
          <div>
            {/* City selector for global hotels */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => { setCityCode("NYC"); searchAmadeusHotels("NYC"); }}
                className={`px-4 py-2 rounded-lg transition ${
                  cityCode === "NYC" ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                New York
              </button>
              <button
                onClick={() => { setCityCode("PAR"); searchAmadeusHotels("PAR"); }}
                className={`px-4 py-2 rounded-lg transition ${
                  cityCode === "PAR" ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Paris
              </button>
              <button
                onClick={() => { setCityCode("LON"); searchAmadeusHotels("LON"); }}
                className={`px-4 py-2 rounded-lg transition ${
                  cityCode === "LON" ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                London
              </button>
            </div>

            {loadingHotels && <p className="text-gray-600">Loading global hotels...</p>}
            
            {/* Amadeus Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amadeusHotels.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-4xl">🏨</span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.hotel.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">📍 {item.hotel.address.cityName}</p>

                    {/* Offers */}
                    {item.offers && item.offers.length > 0 && (
                      <div className="mb-4">
                        {item.offers.slice(0, 2).map((offer, offerIndex) => (
                          <div key={offerIndex} className="mb-2 p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-xl font-bold text-gray-900">
                                  {offer.price.total} {offer.price.currency}
                                </span>
                                <span className="text-sm text-gray-500">/night</span>
                              </div>
                              <span className="px-2 py-1 bg-blue-100 text-xs text-blue-600 rounded">
                                {offer.room.typeEstimated.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button className="w-full mt-4 py-2 px-4 rounded-lg font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const { rooms, searchCriteria } = state;

  return (
    <div className="pt-42 px-6 md:px-16 lg:px-24 xl:px-32 pb-12">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Back to Home"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </button>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
            <p className="text-gray-600">
              {selectedTab === "local" ? (
                rooms.length > 0
                  ? `Found ${rooms.length} room${rooms.length !== 1 ? "s" : ""}${
                      searchCriteria.destination ? ` in ${searchCriteria.destination}` : ""
                    }`
                  : "No local rooms found matching your criteria"
              ) : (
                `${amadeusHotels.length} global hotels found`
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          New Search
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setSelectedTab("local")}
          className={`px-4 py-2 font-medium ${
            selectedTab === "local"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Local Rooms ({rooms.length})
        </button>
        <button
          onClick={() => setSelectedTab("global")}
          className={`px-4 py-2 font-medium ${
            selectedTab === "global"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Global Hotels ({amadeusHotels.length})
        </button>
      </div>

      {/* Global Hotels City Selector */}
      {selectedTab === "global" && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setCityCode("NYC"); searchAmadeusHotels("NYC"); }}
            className={`px-4 py-2 rounded-lg transition ${
              cityCode === "NYC" ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            New York
          </button>
          <button
            onClick={() => { setCityCode("PAR"); searchAmadeusHotels("PAR"); }}
            className={`px-4 py-2 rounded-lg transition ${
              cityCode === "PAR" ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Paris
          </button>
          <button
            onClick={() => { setCityCode("LON"); searchAmadeusHotels("LON"); }}
            className={`px-4 py-2 rounded-lg transition ${
              cityCode === "LON" ? "bg-gray-900 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            London
          </button>
        </div>
      )}

      {/* Results */}
      {selectedTab === "local" ? (
        // Your existing local rooms display
        rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.roomType}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.roomType}</h3>
                  <p className="text-sm text-gray-600 mb-2">{room.hotel.name}</p>
                  <p className="text-sm text-gray-500 mb-4">📍 {room.hotel.city}</p>

                  {/* Amenities */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & availability */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${room.pricePerNight}</span>
                      <span className="text-sm text-gray-500">/night</span>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        room.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {room.isAvailable ? "Available" : "Unavailable"}
                    </div>
                  </div>

                  <button
                    disabled={!room.isAvailable}
                    className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors ${
                      room.isAvailable
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {room.isAvailable ? "Book Now" : "Not Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No local rooms found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )
      ) : (
        // Amadeus Hotels Display
        loadingHotels ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading global hotels...</p>
          </div>
        ) : amadeusHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amadeusHotels.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-4xl">🏨</span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.hotel.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">📍 {item.hotel.address.cityName}</p>

                  {/* Offers */}
                  {item.offers && item.offers.length > 0 && (
                    <div className="mb-4">
                      {item.offers.slice(0, 2).map((offer, offerIndex) => (
                        <div key={offerIndex} className="mb-2 p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-xl font-bold text-gray-900">
                                {offer.price.total} {offer.price.currency}
                              </span>
                              <span className="text-sm text-gray-500">/night</span>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-xs text-blue-600 rounded">
                              {offer.room.typeEstimated.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button className="w-full mt-4 py-2 px-4 rounded-lg font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <span className="text-4xl">🏨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No global hotels found</h3>
            <p className="text-gray-500">Try selecting a different city</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchResults;