import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { assets } from '../assets/assets'

const RoomDetails = () => {
    const {id} = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [availabilityStatus, setAvailabilityStatus] = useState(null)
    const [isChecking, setIsChecking] = useState(false)
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        guests: 1
    })

   useEffect(() => {
    fetchRoomDetails()
}, [id])

const fetchRoomDetails = async () => {
    try {
        // For now, fetch from hotels API and find matching hotel
        const response = await fetch('/api/amadeus/hotels?cityCode=NYC')
        const data = await response.json()
        
        // Find hotel that matches the ID
        const foundHotel = data.data.find(hotel => hotel.hotel.hotelId === id)
        
        if (foundHotel) {
            const roomData = {
                _id: foundHotel.hotel.hotelId,
                hotel: {
                    name: foundHotel.hotel.name,
                    address: foundHotel.hotel.address ? 
                        `${foundHotel.hotel.address.lines?.[0] || ''}, ${foundHotel.hotel.address.cityName || ''}` : 
                        'Address not available',
                    owner: {
                        image: '/assets/hotel-placeholder.jpg' // You'll need a default owner image
                    }
                },
                roomType: foundHotel.offers?.[0]?.room?.typeEstimated?.category || 'Standard',
                pricePerNight: foundHotel.offers?.[0]?.price?.total || 200,
                amenities: ['Free WiFi', 'Room Service', 'Pool Access'],
                images: ['/assets/hotel-placeholder.jpg'], // You'll need placeholder images
                isAvailable: true
            }
            setRoom(roomData)
            setMainImage(roomData.images[0])
        }
    } catch (error) {
        console.error('Failed to fetch room details:', error)
    }
}

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheckAvailability = async (e) => {
        e.preventDefault()
        
        // Validate form
        if (!formData.checkInDate || !formData.checkOutDate || !formData.guests) {
            setAvailabilityStatus({
                type: 'error',
                message: 'Please fill in all fields'
            })
            return
        }

        // Validate dates
        const checkIn = new Date(formData.checkInDate)
        const checkOut = new Date(formData.checkOutDate)
        const today = new Date()
        
        if (checkIn < today) {
            setAvailabilityStatus({
                type: 'error',
                message: 'Check-in date cannot be in the past'
            })
            return
        }

        if (checkOut <= checkIn) {
            setAvailabilityStatus({
                type: 'error',
                message: 'Check-out date must be after check-in date'
            })
            return
        }

        // Show loading state
        setIsChecking(true)
        setAvailabilityStatus(null)

        // Simulate API call delay
        setTimeout(() => {
            // Check if room is available (using room.isAvailable from dummy data)
            if (room && room.isAvailable) {
                const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
                const totalPrice = nights * room.pricePerNight

                setAvailabilityStatus({
                    type: 'available',
                    message: 'Room is available!',
                    details: {
                        nights,
                        totalPrice,
                        checkIn: formData.checkInDate,
                        checkOut: formData.checkOutDate,
                        guests: formData.guests
                    }
                })
            } else {
                setAvailabilityStatus({
                    type: 'unavailable',
                    message: 'Sorry, this room is not available for the selected dates'
                })
            }
            setIsChecking(false)
        }, 1500) // 1.5 second delay to simulate loading
    }

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/*Room Details */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-gray-700 rounded-full'>20% OFF</p>
            </div>

            {/*Room Rating*/}
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2'>200+ Reviews</p>
            </div>

            {/*Room address*/}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
            </div>

            {/*Room images */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.length > 1 && room.images.map((image,index) => (
                        <img onClick={() => setMainImage(image)} 
                            src={image} 
                            alt="Room Image" 
                            key={index} 
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image ? 'outline outline-3 outline-gray-700' : 'hover:opacity-80'}`} />
                    ))}
                </div>
            </div>

            {/*Room Highlights*/}
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Uncover Luxury Beyond Imagination</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                {facilityIcons[item] ? (
                                    <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                ) : (
                                    <div className='w-5 h-5 bg-gray-400 rounded'></div>
                                )}
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/*Room Price*/}
                <p className='text-2xl font-medium'>${room.pricePerNight} /night</p>
            </div>

            {/* CheckIn Checkout Form*/}
            <form onSubmit={handleCheckAvailability} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-600'>
                    
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input 
                            type="date" 
                            id='checkInDate' 
                            name='checkInDate'
                            value={formData.checkInDate}
                            onChange={handleInputChange}
                            placeholder='Check-In' 
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:ring-2 focus:ring-blue-500' 
                            required 
                        />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input 
                            type="date" 
                            id='checkOutDate' 
                            name='checkOutDate'
                            value={formData.checkOutDate}
                            onChange={handleInputChange}
                            placeholder='Check-Out' 
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:ring-2 focus:ring-blue-500' 
                            required 
                        />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input 
                            type="number" 
                            id='guests' 
                            name='guests'
                            value={formData.guests}
                            onChange={handleInputChange}
                            min="1"
                            max="8"
                            placeholder='1' 
                            className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:ring-2 focus:ring-blue-500' 
                            required 
                        />
                    </div>
                </div>
                
                <button 
                    type='submit' 
                    disabled={isChecking}
                    className={`${
                        isChecking 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gray-800 hover:bg-gray-900 active:scale-95'
                    } transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base cursor-pointer font-semibold`}
                >
                    {isChecking ? 'Checking...' : 'Check Availability'}
                </button>
            </form>

            {/* Availability Status */}
            {availabilityStatus && (
                <div className={`mt-6 p-4 rounded-xl border max-w-6xl mx-auto ${
                    availabilityStatus.type === 'available' 
                        ? 'bg-green-50 border-green-200' 
                        : availabilityStatus.type === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                }`}>
                    <div className={`flex items-start gap-3 ${
                        availabilityStatus.type === 'available' ? 'text-green-800' : 
                        availabilityStatus.type === 'error' ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            availabilityStatus.type === 'available' ? 'bg-green-200' : 
                            availabilityStatus.type === 'error' ? 'bg-red-200' : 'bg-yellow-200'
                        }`}>
                            {availabilityStatus.type === 'available' ? '✓' : 
                             availabilityStatus.type === 'error' ? '!' : '⚠'}
                        </div>
                        <div className='flex-1'>
                            <p className='font-semibold text-lg'>{availabilityStatus.message}</p>
                            {availabilityStatus.details && (
                                <div className='mt-2 text-sm'>
                                    <p><strong>Duration:</strong> {availabilityStatus.details.nights} night{availabilityStatus.details.nights !== 1 ? 's' : ''}</p>
                                    <p><strong>Dates:</strong> {availabilityStatus.details.checkIn} to {availabilityStatus.details.checkOut}</p>
                                    <p><strong>Guests:</strong> {availabilityStatus.details.guests}</p>
                                    <p className='text-lg font-semibold mt-2'>
                                        <strong>Total Price: ${availabilityStatus.details.totalPrice}</strong>
                                    </p>
                                    <button className='mt-3 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors cursor-not-allowed'>
                                        Book Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Common Specifications */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-4'>
                        <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6 h-6' />
                        <div>
                            <p className='text-base font-medium'>{spec.title}</p>
                            <p className='text-gray-600'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <p className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>Guests will be placed on the ground floor depending on availability. Indulge in a stylish two-bedroom apartment offering true metropolitan charm. The listed rate is for two guests; please select the number of guests during booking to ensure correct group pricing. Accommodations remain subject to ground floor availability. Relax in a refined two-bedroom apartment designed to reflect the spirit and sophistication of modern city living.</p>
            </div>

            {/*Hosted By*/}
            <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4'>
                    <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='bg-gray-800 hover:bg-gray-900 active:scale-95 transition-all duration-300 text-white rounded-xl shadow-lg hover:shadow-xl max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base font-semibold cursor-not-allowed'>Contact Now</button>
            </div>
        </div>
    )
}

export default RoomDetails
