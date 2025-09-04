import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ⬇️ roomsData removed
import { cities } from "../assets/assets";

// Optional: set this if your backend runs on another origin in dev
const API_BASE = import.meta.env.VITE_API_BASE || "";

const CITY_CODES = {
  paris: "PAR", london: "LON", "new york": "NYC", tokyo: "TOK", sydney: "SYD",
  rome: "ROM", barcelona: "BCN", amsterdam: "AMS", berlin: "BER", miami: "MIA",
};
const toCityCode = (name = "") => CITY_CODES[name.toLowerCase()] || "PAR";
const fmt = (d) => d.toISOString().split("T")[0];

// 🔌 call your Vercel serverless endpoint
async function fetchHotels({ destination, checkIn, checkOut, guests }) {
  const cityCode = toCityCode(destination);

  // defaults: +7 days, 2 nights
  const now = new Date();
  const ci = checkIn ? new Date(checkIn) : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
  const co = checkOut ? new Date(checkOut) : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 9);

  const base = API_BASE || window.location.origin;
  const url = new URL("/api/amadeus/hotels", base);
  url.searchParams.set("cityCode", cityCode);
  url.searchParams.set("checkInDate", fmt(ci));
  url.searchParams.set("checkOutDate", fmt(co));
  url.searchParams.set("adults", String(guests || 2));

  const resp = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!resp.ok) {
    const msg = await resp.text().catch(() => "");
    throw new Error(`Backend error ${resp.status}: ${msg || "Failed to fetch hotels"}`);
  }

  const payload = await resp.json();
  const data = Array.isArray(payload?.data) ? payload.data : [];

  // Normalize to the shape your /search page can use (room-like objects)
  return data.map((item) => {
    const price = Number(item?.offers?.[0]?.price?.total) || 0;
    const currency = item?.offers?.[0]?.price?.currency || "USD";
    const roomType = item?.offers?.[0]?.room?.typeEstimated?.category || "STANDARD";
    const cityName = item?.hotel?.address?.cityName || "";
    const country = item?.hotel?.address?.countryCode || "";

    return {
      hotel: {
        hotelId: item?.hotel?.hotelId || "",
        name: item?.hotel?.name || "Hotel",
        city: cityName,            // ⬅️ for your existing city filter
        country,
        address: item?.hotel?.address || {},
      },
      isAvailable: true,
      price,
      currency,
      roomType,
      // (Optionally include the raw offer if your /search page wants more)
      offers: item?.offers || [],
    };
  });
}

const Hero = () => {
  const navigate = useNavigate();

  const INITIAL = { destination: "", checkIn: "", checkOut: "", guests: 2 };
  const [searchData, setSearchData] = useState(INITIAL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  // ⬇️ make this async and fetch from API instead of roomsData
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const rooms = await fetchHotels(searchData);

      // optional local filtering by destination text (keeps old behavior)
      let filteredRooms = rooms;
      if (searchData.destination) {
        const q = searchData.destination.toLowerCase();
        filteredRooms = rooms.filter((room) =>
          room.hotel.city?.toLowerCase().includes(q)
        );
      }

      navigate("/search", {
        state: { rooms: filteredRooms, searchCriteria: searchData },
      });
    } catch (err) {
      console.error("Search failed:", err);
      alert(err.message || "Failed to search hotels. Check your backend/API keys.");
    }
  };

  return (
    <div className='relative flex flex-col items-start justify-center text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen w-full'>
      {/* ...unchanged UI... */}
      <div className="relative z-10 w-full mt-12 mb-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-lg text-gray-700 rounded-2xl p-6 shadow-2xl border border-white/20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
            {/* Destination */}
            <div className="space-y-2">
              {/* ...unchanged inputs... */}
              <input
                list="destinations"
                id="destinationInput"
                name="destination"
                type="text"
                value={searchData.destination}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Where to?"
              />
              <datalist id="destinations">
                {cities.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>

            {/* Check in */}
            <div className="space-y-2">
              <input
                id="checkIn"
                name="checkIn"
                type="date"
                value={searchData.checkIn}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Check out */}
            <div className="space-y-2">
              <input
                id="checkOut"
                name="checkOut"
                type="date"
                value={searchData.checkOut}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
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


