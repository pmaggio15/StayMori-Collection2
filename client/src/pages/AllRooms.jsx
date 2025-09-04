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

    // Updated to match your dummy data
    const roomTypes = [
        "Single Bed",
        "Double Bed"
    ];

    // Updated price ranges to match your room prices
    const priceRanges = [
        "0-200",
        "200-300", 
        "300-400",
        "400-500"
    ];

    const sortOptions = [
        "Price Low to High",
        "Price High to Low",
        "Newest First"
    ];

    // Filter state
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [sortOption, setSortOption] = useState("");


    const [roomsData, setRoomsData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchRooms();
}, []);

const fetchRooms = async () => {
    try {
        setLoading(true);
        const response = await fetch('/api/amadeus/hotels?cityCode=NYC');
        const data = await response.json();
        // Convert API data to match your room structure
        const convertedRooms = data.data.map(hotel => ({
            _id: hotel.hotel.hotelId,
            hotel: {
                name: hotel.hotel.name,
                city: hotel.hotel.address?.cityName || 'Unknown',
                address: hotel.hotel.address ? 
                    `${hotel.hotel.address.lines?.[0] || ''}, ${hotel.hotel.address.cityName || ''}` : 
                    'Address not available'
            },
            roomType: hotel.offers?.[0]?.room?.typeEstimated?.category || 'Standard',
            pricePerNight: hotel.offers?.[0]?.price?.total || 200,
            amenities: ['Free WiFi', 'Room Service', 'Pool Access'],
            images: ['/assets/hotel-placeholder.jpg'], // You'll need to add a placeholder image
            isAvailable: true,
            createdAt: new Date().toISOString()
        }));
        setRoomsData(convertedRooms);
    } catch (error) {
        console.error('Failed to fetch rooms:', error);
        setRoomsData([]); // Empty array if API fails
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
        

        return list;
    }, [selectedTypes, selectedRanges, sortOption]);

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
