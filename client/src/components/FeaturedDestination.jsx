import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard";
import { useappContext } from "../context/appContext.jsx";

// API Base URL - updated to use your backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const FeaturedDestination = ({ 
  searchCity = null, 
  searchCheckIn = null, 
  searchCheckOut = null, 
  searchGuests = 1,
  showAsSearch = false 
}) => {
  const { navigate } = useappContext();
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        setErr("");
        setLoading(true);
        
        if (showAsSearch && searchCity) {
          // For search results, filter by city
          try {
            const response = await fetch(
              `${API_BASE}/api/rooms/city/${encodeURIComponent(searchCity)}`,
              { signal: ctrl.signal }
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch hotels');
            }
            
            const data = await response.json();
            
            if (data.success && data.rooms) {
              setFeaturedRooms(data.rooms);
            } else {
              setFeaturedRooms([]);
            }
          } catch (error) {
            console.warn("API failed:", error);
            setErr("Unable to load hotels. Please try again later.");
            setFeaturedRooms([]);
          }
        } else {
          // For featured destinations, get random featured rooms
          try {
            const response = await fetch(
              `${API_BASE}/api/rooms/featured`,
              { signal: ctrl.signal }
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch featured rooms');
            }
            
            const data = await response.json();
            
            if (data.success && data.rooms) {
              // Limit to 4 rooms for featured section
              setFeaturedRooms(data.rooms.slice(0, 4));
            } else {
              setFeaturedRooms([]);
            }
          } catch (error) {
            console.warn("API failed:", error);
            setErr("Unable to load hotels. Please try again later.");
            setFeaturedRooms([]);
          }
        }
        
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Failed to fetch hotels:", e);
          setErr("Unable to load hotels. Please try again later.");
          setFeaturedRooms([]);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [searchCity, searchCheckIn, searchCheckOut, searchGuests, showAsSearch]);

  const gridContent = useMemo(() => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="rounded-2xl overflow-hidden shadow-lg animate-pulse bg-white"
        >
          <div className="h-48 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ));
    }

    if (err) {
      return (
        <div className="col-span-full text-center p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {err}
        </div>
      );
    }

    if (!featuredRooms.length) {
      return (
        <div className="col-span-full text-center p-6 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl">
          {showAsSearch ? "No hotels found for your search criteria." : "No featured destinations available right now. Try again shortly."}
        </div>
      );
    }

    return featuredRooms.map((room, index) => (
      <div
        key={room._id}
        className="group transform transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl bg-white"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <HotelCard room={room} index={index} />
      </div>
    ));
  }, [loading, err, featuredRooms, showAsSearch]);

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {showAsSearch ? `Hotels in ${searchCity}` : "Featured Destinations"}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {showAsSearch 
              ? `Found ${featuredRooms.length} hotels matching your search criteria`
              : "Discover our curated collection of luxury accommodations across major cities, offering timeless elegance and unforgettable experiences."
            }
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {gridContent}
        </div>

        {/* CTA - Only show for featured section */}
        {!showAsSearch && (
          <div className="text-center">
            <div className="inline-flex flex-col items-center">
              <button
                onClick={() => {
                  navigate("/rooms");
                  window.scrollTo(0, 0);
                }}
                className="group relative px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold transition-all duration-300 hover:border-gray-800 hover:bg-gray-800 hover:text-white shadow-sm hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  View All Hotels
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>

              <p className="text-sm text-gray-500 mt-3 max-w-md">
                Explore our complete collection of 19+ luxury properties worldwide
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestination;