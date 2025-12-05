import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  const INITIAL = { destination: "", checkIn: "", checkOut: "", guests: 2 };
  const [searchData, setSearchData] = useState(INITIAL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  // City code mapping for Amadeus API
  const getCityCode = (cityName) => {
    const cityCodeMap = {
      "New York": "NYC",
      "Dubai": "DXB", 
      "Singapore": "SIN",
      "London": "LON",
      "Paris": "PAR",
      "Tokyo": "NRT",
      "Los Angeles": "LAX",
      "Miami": "MIA"
    };
    
    // Return the mapped code or default to the first 3 letters uppercase
    return cityCodeMap[cityName] || cityName.substring(0, 3).toUpperCase();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Get city code for Amadeus API
    const cityCode = searchData.destination ? getCityCode(searchData.destination) : "NYC";

    // Navigate to search results page with search parameters
    navigate("/search", {
      state: { 
        city: cityCode,
        cityName: searchData.destination || "New York",
        checkIn: searchData.checkIn,
        checkOut: searchData.checkOut,
        guests: searchData.guests
      }
    });
  };

  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      {/* Content */}
      <div className="relative z-10">
        <div className="inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mt-40 border border-white/30">
          <span className="text-sm font-medium text-white">The Ultimate Hotel Experience</span>
        </div>

        <h1 className="font-playfair text-3xl md:text-6xl lg:text-7xl font-bold max-w-4xl mt-6 leading-tight text-white drop-shadow-xl">
          Discover Your Perfect Getaway Vacation
        </h1>

        <p className="max-w-xl mt-6 text-lg md:text-xl text-white font-light leading-relaxed bg-gray-900/80 p-4 rounded-lg">
          Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts.
          Start your journey today.
        </p>
      </div>

      {/* Search form */}
      <div className="relative z-10 w-full mt-12 mb-16">
        <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-lg text-gray-700 rounded-2xl p-6 shadow-2xl border border-white/20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
            {/* Destination */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <label htmlFor="destinationInput" className="text-sm font-medium">Destination</label>
              </div>
              <input
                list="destinations"
                id="destinationInput"
                name="destination"
                type="text"
                value={searchData.destination}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Where to?"
                required
              />
              <datalist id="destinations">
                {cities.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>

            {/* Check in */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <label htmlFor="checkIn" className="text-sm font-medium">Check in</label>
              </div>
              <input
                id="checkIn"
                name="checkIn"
                type="date"
                value={searchData.checkIn}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Check out */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <label htmlFor="checkOut" className="text-sm font-medium">Check out</label>
              </div>
              <input
                id="checkOut"
                name="checkOut"
                type="date"
                value={searchData.checkOut}
                onChange={handleInputChange}
                min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <label htmlFor="guests" className="text-sm font-medium">Guests</label>
              </div>
              <input
                min={1}
                max={8}
                id="guests"
                name="guests"
                type="number"
                value={searchData.guests}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="2"
              />
            </div>

            {/* Search button */}
            <div className="md:col-span-4 xl:col-span-1">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search Hotels</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;


