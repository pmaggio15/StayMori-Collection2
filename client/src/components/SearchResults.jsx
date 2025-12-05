import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeaturedDestination from '../components/FeaturedDestination';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  const searchParams = location.state || {};
  const urlParams = new URLSearchParams(location.search);
  
  const [searchData, setSearchData] = useState({
    cityName: searchParams.cityName || urlParams.get('cityName') || 'New York',
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

      {/* Results Section */}
      <FeaturedDestination
        searchCity={searchData.cityName}
        searchCheckIn={searchData.checkIn}
        searchCheckOut={searchData.checkOut}
        searchGuests={searchData.guests}
        showAsSearch={true}
      />
    </div>
  );
};

export default SearchResults;