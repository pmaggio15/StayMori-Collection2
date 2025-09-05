import React, { useState, useEffect, useMemo } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating';

// Custom checkbox component that works
const CheckBox = ({label, selected = false, onChange = () => {}}) => {
    return (
        <div className='flex items-center gap-2 mb-2 p-1 hover:bg-gray-50 rounded cursor-pointer'
             onClick={() => onChange(!selected, label)}>
            <div className={`w-4 h-4 border-2 border-gray-400 rounded flex items-center justify-center ${
                selected ? 'bg-blue-500 border-blue-500' : 'bg-white'
            }`}>
                {selected && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className='font-light select-none text-sm'>{label}</span>
        </div>
    )
}

// Custom radio button component that works
const RadioButton = ({label, selected = false, onChange = () => {}}) => {
    return (
        <div className='flex items-center gap-2 mb-2 p-1 hover:bg-gray-50 rounded cursor-pointer'
             onClick={() => onChange(label)}>
            <div className={`w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center ${
                selected ? 'bg-blue-500 border-blue-500' : 'bg-white'
            }`}>
                {selected && <div className='w-2 h-2 bg-white rounded-full'></div>}
            </div>
            <span className='font-light select-none text-sm'>{label}</span>
        </div>
    )
}

const AllRooms = () => {
    const navigate = useNavigate();
    const [openFilters, setOpenFilters] = useState(false)

    // API Base URL (same as your other components)
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

    // Filter options
    const roomTypes = [
        "Luxury Suite",
        "Standard",
        "Premium",
        "Deluxe"
    ];

    const priceRanges = [
        "0-200",
        "200-300", 
        "300-400",
        "400-500",
        "500-600",
        "600+"
    ];

    const sortOptions = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ];

    // State
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [roomsData, setRoomsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllRooms();
    }, []);

    // Helper to normalize hotel data from Amadeus API
    const normalizeHotels = (arr = []) => {
        return arr.map((item) => {
            const hotel = item?.hotel || {};
            const offer = item?.offers?.[0] || {};
            const price = offer?.price?.total ?? Math.floor(Math.random() * 500) + 200;
            const currency = offer?.price?.currency ?? "USD";
            const images = item?.images || [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop"
            ];

            return {
                _id: hotel.hotelId || hotel.name || crypto.randomUUID?.() || Math.random().toString(36).slice(2),
                hotel: {
                    name: hotel.name || "Hotel",
                    city: hotel.address?.cityName || "Featured Location",
                    address: hotel.address?.cityName || "Featured Location",
                },
                roomType: ["Luxury Suite", "Standard", "Premium", "Deluxe"][Math.floor(Math.random() * 4)],
                pricePerNight: price,
                amenities: ["Free WiFi", "Room Service", "Pool Access", "Mountain View", "Free Breakfast"].slice(0, 3),
                images: images,
                isAvailable: true,
                createdAt: new Date().toISOString(),
                currency
            };
        });
    };

    const fetchAllRooms = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch from multiple cities to get more hotels
            const cityCodes = ['NYC', 'DXB', 'SIN', 'LON'];
            let allHotels = [];
            
            for (const cityCode of cityCodes) {
                try {
                    const url = new URL("/api/amadeus/hotels", API_BASE);
                    url.searchParams.set("cityCode", cityCode);
                    
                    const response = await fetch(url.toString());
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data.data && Array.isArray(data.data)) {
                            allHotels = [...allHotels, ...data.data];
                        }
                    }
                } catch (err) {
                    console.log(`Failed to fetch from ${cityCode}:`, err);
                    continue;
                }
            }
            
            if (allHotels.length > 0) {
                const normalizedRooms = normalizeHotels(allHotels);
                setRoomsData(normalizedRooms);
            } else {
                setError('No hotels found');
            }
            
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
            setError('Failed to load hotels');
            setRoomsData([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter handlers
    const handleTypeChange = (checked, type) => {
        setSelectedTypes(prev => 
            checked ? [...prev, type] : prev.filter(t => t !== type)
        );
    };

    const handleRangeChange = (checked, range) => {
        setSelectedRanges(prev => 
            checked ? [...prev, range] : prev.filter(r => r !== range)
        );
    };

    const handleSortChange = (option) => {
        setSortOption(prev => prev === option ? "" : option);
    };

    const clearAllFilters = () => {
        setSelectedTypes([]);
        setSelectedRanges([]);
        setSortOption("");
    };

    // Helper to parse price ranges
    const rangeToTuple = (r) => {
        if (r === "600+") return { min: 600, max: Infinity };
        const [min, max] = r.split("-").map(n => Number(n.trim()));
        return { min, max };
    };

    // Apply filters and sorting
    const filteredRooms = useMemo(() => {
        let list = [...roomsData];

        // Filter by room type
        if (selectedTypes.length > 0) {
            list = list.filter(room => selectedTypes.includes(room.roomType));
        }

        // Filter by price range
        if (selectedRanges.length > 0) {
            list = list.filter(room =>
                selectedRanges.some(range => {
                    const { min, max } = rangeToTuple(range);
                    return room.pricePerNight >= min && room.pricePerNight <= max;
                })
            );
        }

        // Sort results
        if (sortOption === "Price Low to High") {
            list.sort((a, b) => a.pricePerNight - b.pricePerNight);
        } else if (sortOption === "Price High to Low") {
            list.sort((a, b) => b.pricePerNight - a.pricePerNight);
        } else if (sortOption === "Newest First") {
            list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        // Limit to maximum 6 hotels
        return list.slice(0, 6);
    }, [roomsData, selectedTypes, selectedRanges, sortOption]);

    // Loading state
    if (loading) {
        return (
            <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
                <div className='flex-1 lg:pr-10'>
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex gap-6 py-6 border-b">
                                <div className="w-1/2 h-48 bg-gray-200 rounded-xl"></div>
                                <div className="w-1/2 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full lg:w-80 h-96 bg-gray-200 rounded-lg animate-pulse'></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
                <div className='flex-1 lg:pr-10 text-center'>
                    <div className="text-red-600 text-xl mb-4">{error}</div>
                    <button 
                        onClick={fetchAllRooms}
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            
            {/* Left side - Results */}
            <div className='flex-1 lg:pr-10'>
                <div className='flex flex-col items-start text-left mb-6'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                        Unlock special offers and limited-time packages that enhance every moment of your journey with unforgettable experiences.
                    </p>
                    
                    {/* Active filters display */}
                    {(selectedTypes.length > 0 || selectedRanges.length > 0 || sortOption) && (
                        <div className='mt-3 text-sm text-gray-600 p-3 bg-blue-50 rounded-lg border border-blue-200'>
                            <span className='font-medium'>Active Filters: </span>
                            {selectedTypes.length > 0 && <span>Types: {selectedTypes.join(", ")}. </span>}
                            {selectedRanges.length > 0 && <span>Price: ${selectedRanges.join(", $")}. </span>}
                            {sortOption && <span>Sort: {sortOption}.</span>}
                        </div>
                    )}
                    
                    {/* Results count */}
                    <div className='mt-2 text-sm text-gray-600'>
                        Showing {filteredRooms.length} of {roomsData.length} rooms
                    </div>
                </div>

                {/* Room listings */}
                {filteredRooms.length === 0 ? (
                    <div className="w-full py-16 text-center border border-gray-200 rounded-xl">
                        <p className="text-gray-700 font-medium mb-2">No rooms match your filters</p>
                        <button
                            onClick={clearAllFilters}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    filteredRooms.map((room) => (
                        <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                            <img 
                                onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}} 
                                src={room.images[0]} 
                                alt="hotel-img" 
                                title='View Room Details' 
                                className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer hover:scale-105 transition-transform' 
                            />
                            <div className='md:w-1/2 flex flex-col gap-2'>
                                <p className='text-gray-500'>{room.hotel.city}</p>
                                <p 
                                    onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                                    className='text-gray-800 text-3xl font-playfair cursor-pointer hover:text-gray-600'>
                                    {room.hotel.name}
                                </p>
                                <div className='flex items-center'>
                                    <StarRating />
                                    <p className='ml-2'>200+ reviews</p>
                                </div>
                                <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                    <img src={assets.locationIcon} alt="location-icon" />
                                    <span>{room.hotel.address}</span>
                                </div>
                                
                                {/* Room Amenities */}
                                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                                   {room.amenities.map((item, index)=> (
                                    <div key={index} className='flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                                        {facilityIcons[item] ? (
                                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                                        ) : (
                                            <div className='w-5 h-5 bg-gray-400 rounded'></div>
                                        )}
                                        <p className='text-xs'>{item}</p>
                                    </div>
                                   ))} 
                                </div>
                                
                                {/* Room price for night */}
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl font-medium text-gray-700'>${room.pricePerNight} /night</p>
                                    <span className='text-sm text-gray-500'>{room.roomType}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Right side - Filters */}
            <div className='bg-white w-full lg:w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16 rounded-lg overflow-hidden'>
                <div className={`flex items-center justify-between px-5 py-2.5 border-b border-gray-300`}>
                    <p className='text-base font-medium text-gray-800'>FILTERS</p>
                    <div className='text-xs cursor-pointer'>
                        <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden hover:text-blue-600'>
                            {openFilters ? 'HIDE' : 'SHOW'}
                        </span>
                        <span onClick={clearAllFilters} className='hidden lg:block hover:text-blue-600 cursor-pointer'>CLEAR</span>
                    </div>
                </div>
                
                <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                    
                    {/* Room Types */}
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Room Type</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox 
                                key={index} 
                                label={room} 
                                selected={selectedTypes.includes(room)}
                                onChange={handleTypeChange}
                            />
                        ))}
                    </div>
                    
                    {/* Price Range */}
                    <div className='px-5 pt-5'>
                        <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                        {priceRanges.map((range, index) => (
                            <CheckBox 
                                key={index} 
                                label={`$${range}`} 
                                selected={selectedRanges.includes(range)}
                                onChange={(checked, label) => handleRangeChange(checked, range)}
                            />
                        ))}
                    </div>
                    
                    {/* Sort Options */}
                    <div className='px-5 pt-5 pb-7'>
                        <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton 
                                key={index} 
                                label={option}
                                selected={sortOption === option}
                                onChange={handleSortChange}
                            />
                        ))}
                    </div>

                    {/* Mobile Clear Button */}
                    <div className='px-5 pb-5 lg:hidden'>
                        <button
                            onClick={clearAllFilters}
                            className='w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition'
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllRooms

