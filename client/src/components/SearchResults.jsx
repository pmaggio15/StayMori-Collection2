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



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeaturedDestination from '../components/FeaturedDestination';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search parameters from navigation state or URL params
  const searchParams = location.state || {};
  const urlParams = new URLSearchParams(location.search);
  
  const [searchData, setSearchData] = useState({
    city: searchParams.city || urlParams.get('city') || 'NYC',
    checkIn: searchParams.checkIn || urlParams.get('checkIn') || null,
    checkOut: searchParams.checkOut || urlParams.get('checkOut') || null,
    guests: parseInt(searchParams.guests || urlParams.get('guests') || '1')
  });

  const handleNewSearch = (newSearchData) => {
    setSearchData(newSearchData);
    // Update URL without navigating
    const params = new URLSearchParams();
    Object.entries(newSearchData).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600 mt-1">
                {searchData.cityName || searchData.city} • {searchData.checkIn && searchData.checkOut 
                  ? `${searchData.checkIn} to ${searchData.checkOut}` 
                  : 'Flexible dates'} • {searchData.guests} guest{searchData.guests > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
            >
              Modify Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <FeaturedDestination
        searchCity={searchData.city}
        searchCheckIn={searchData.checkIn}
        searchCheckOut={searchData.checkOut}
        searchGuests={searchData.guests}
        showAsSearch={true}
      />
    </div>
  );
};

export default SearchResults;