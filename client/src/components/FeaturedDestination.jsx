// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HotelCard from "./HotelCard";
// import { useAppContext } from "../context/appContext";


// // If you're running the frontend on Vite (5173) and the API is on Vercel,
// // set VITE_API_BASE=https://<your-app>.vercel.app in .env.local
// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

// console.log("API_BASE:", API_BASE); // Debug log to check the value

// // --- Helpers ---
// function normalizeHotels(arr = []) {
//   return arr.slice(0, 4).map((item) => {
//     const hotel = item?.hotel || {};
//     const offer = item?.offers?.[0] || {};
//     const price = offer?.price?.total ?? 200;
//     const currency = offer?.price?.currency ?? "USD";

//     return {
//       _id: hotel.hotelId || hotel.name || crypto.randomUUID?.() || Math.random().toString(36).slice(2),
//       hotel: {
//         name: hotel.name || "Hotel",
//         address: hotel.address?.cityName || "Featured Location",
//       },
//       pricePerNight: price,
//       currency,
//       images: ["/assets/hotel-placeholder.jpg"],
//     };
//   });
// }

// async function fetchFeaturedRoomsApi(cityCode, { signal } = {}) {
//   // Ensure API_BASE is valid
//   if (!API_BASE) {
//     throw new Error("API_BASE is not configured. Please check your .env.local file.");
//   }

//   try {
//     const url = new URL("/api/amadeus/hotels", API_BASE);
//     url.searchParams.set("cityCode", cityCode);

//     console.log("Fetching from URL:", url.toString()); // Debug log

//     const resp = await fetch(url.toString(), { signal });
//     const ct = resp.headers.get("content-type") || "";

//     if (!resp.ok) {
//       const txt = await resp.text().catch(() => "");
//       throw new Error(`HTTP ${resp.status} • ${txt.slice(0, 200)}`);
//     }
//     if (!ct.includes("application/json")) {
//       const txt = await resp.text().catch(() => "");
//       throw new Error(`Expected JSON, got ${ct || "unknown"} • ${txt.slice(0, 200)}`);
//     }

//     const payload = await resp.json();
//     return Array.isArray(payload?.data) ? payload.data : [];
//   } catch (error) {
//     console.error("fetchFeaturedRoomsApi error:", error);
//     throw error;
//   }
// }

// export default function FeaturedDestination() {
//   const {rooms, navigate} = useAppContext();
//   const [featuredRooms, setFeaturedRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     const ctrl = new AbortController();

//     (async () => {
//       try {
//         setErr("");
//         setLoading(true);
//         // NYC by default; change to any supported city code (e.g., PAR, LON)
//         const raw = await fetchFeaturedRoomsApi("NYC", { signal: ctrl.signal });
//         const normalized = normalizeHotels(raw);
//         setFeaturedRooms(normalized);
//       } catch (e) {
//         if (e.name !== "AbortError") {
//           console.error("Failed to fetch featured rooms:", e);
//           setErr(e.message || "Failed to fetch featured rooms.");
//           setFeaturedRooms([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => ctrl.abort();
//   }, []);

//   const gridContent = useMemo(() => {
//     if (loading) {
//       // Simple skeletons
//       return Array.from({ length: 4 }).map((_, i) => (
//         <div
//           key={`skeleton-${i}`}
//           className="rounded-2xl overflow-hidden shadow-lg animate-pulse bg-white"
//         >
//           <div className="h-48 bg-gray-200" />
//           <div className="p-4 space-y-3">
//             <div className="h-5 bg-gray-200 rounded w-3/4" />
//             <div className="h-4 bg-gray-200 rounded w-1/2" />
//             <div className="h-6 bg-gray-200 rounded w-1/3" />
//           </div>
//         </div>
//       ));
//     }

//     if (err) {
//       return (
//         <div className="col-span-full text-center p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
//           {err}
//         </div>
//       );
//     }

//     if (!featuredRooms.length) {
//       return (
//         <div className="col-span-full text-center p-6 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl">
//           No featured destinations available right now. Try again shortly.
//         </div>
//       );
//     }

//     return featuredRooms.slice(0, 4).map((room, index) => (
//       <div
//         key={room._id}
//         className="group transform transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
//         style={{ animationDelay: `${index * 100}ms` }}
//       >
//         <HotelCard room={room} index={index} />
//       </div>
//     ));
//   }, [loading, err, featuredRooms]);

//   return (
//     <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
//         {/* Header */}
//         <div className="text-center mb-16 md:mb-20">
//           <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//             Featured Destinations
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
//             Discover our curated portfolio of luxury hotels worldwide, offering timeless elegance,
//             refined comfort, and unforgettable stays.
//           </p>
//         </div>

//         {/* Hotels Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
//           {gridContent}
//         </div>

//         {/* CTA */}
//         <div className="text-center">
//           <div className="inline-flex flex-col items-center">
//             <button
//               onClick={() => {
//                 navigate("/rooms");
//                 window.scrollTo(0, 0);
//               }}
//               className="group relative px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold transition-all duration-300 hover:border-gray-800 hover:bg-gray-800 hover:text-white shadow-sm hover:shadow-xl"
//             >
//               <span className="flex items-center gap-2">
//                 View All Destinations
//                 <svg
//                   className="w-5 h-5 transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </span>
//             </button>

//             <p className="text-sm text-gray-500 mt-3 max-w-md">
//               Explore our complete collection of luxury properties worldwide
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard";
import { useAppContext } from "../context/AppContext";

// API Base URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

// Helper to normalize hotel data from Amadeus API
function normalizeHotels(arr = []) {
  return arr.slice(0, 4).map((item) => {
    const hotel = item?.hotel || {};
    const offer = item?.offers?.[0] || {};
    const price = offer?.price?.total ?? 200;
    const currency = offer?.price?.currency ?? "USD";

    return {
      _id: hotel.hotelId || hotel.name || crypto.randomUUID?.() || Math.random().toString(36).slice(2),
      hotel: {
        name: hotel.name || "Hotel",
        address: hotel.address?.cityName || "Featured Location",
      },
      pricePerNight: price,
      currency,
      images: ["/assets/hotel-placeholder.jpg"],
    };
  });
}

// Fetch hotels from Amadeus API
async function fetchHotelsFromAmadeus(cityCode, checkIn = null, checkOut = null, guests = 1, { signal } = {}) {
  if (!API_BASE) {
    throw new Error("API_BASE is not configured. Please check your .env.local file.");
  }

  try {
    const url = new URL("/api/amadeus/hotels", API_BASE);
    url.searchParams.set("cityCode", cityCode);
    
    // Add optional search parameters
    if (checkIn) url.searchParams.set("checkInDate", checkIn);
    if (checkOut) url.searchParams.set("checkOutDate", checkOut);
    if (guests > 1) url.searchParams.set("adults", guests.toString());

    console.log("Fetching from URL:", url.toString());

    const resp = await fetch(url.toString(), { signal });
    const ct = resp.headers.get("content-type") || "";

    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`HTTP ${resp.status} • ${txt.slice(0, 200)}`);
    }
    if (!ct.includes("application/json")) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`Expected JSON, got ${ct || "unknown"} • ${txt.slice(0, 200)}`);
    }

    const payload = await resp.json();
    return Array.isArray(payload?.data) ? payload.data : [];
  } catch (error) {
    console.error("fetchHotelsFromAmadeus error:", error);
    throw error;
  }
}

const FeaturedDestination = ({ 
  searchCity = "NYC", 
  searchCheckIn = null, 
  searchCheckOut = null, 
  searchGuests = 1,
  showAsSearch = false 
}) => {
  const { navigate } = useAppContext();
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        setErr("");
        setLoading(true);
        
        // Try Amadeus API first
        try {
          const raw = await fetchHotelsFromAmadeus(
            searchCity, 
            searchCheckIn, 
            searchCheckOut, 
            searchGuests,
            { signal: ctrl.signal }
          );
          
          const normalized = normalizeHotels(raw);
          setFeaturedRooms(normalized);
        } catch (amadeusError) {
          console.warn("Amadeus API failed, falling back to local data:", amadeusError);
          
          // Fallback to local dummy data
          let filteredRooms = roomsDummyData.filter((room) => {
            // Basic city filtering (you can enhance this)
            const cityMatch = searchCity === "NYC" || 
                             room.hotel.city?.toLowerCase().includes(searchCity.toLowerCase()) ||
                             !searchCity;
            return cityMatch && room.isAvailable;
          });
          
          setFeaturedRooms(filteredRooms.slice(0, 4));
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
  }, [searchCity, searchCheckIn, searchCheckOut, searchGuests]);

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
              : "Discover our curated portfolio of luxury hotels worldwide, offering timeless elegance, refined comfort, and unforgettable stays."
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
                  navigate("/search");
                  window.scrollTo(0, 0);
                }}
                className="group relative px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold transition-all duration-300 hover:border-gray-800 hover:bg-gray-800 hover:text-white shadow-sm hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Search All Hotels
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
                Explore our complete collection of luxury properties worldwide
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestination;