import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { facilityIcons, roomCommonData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { assets } from '../assets/assets'
import { useUser, useAuth } from '@clerk/clerk-react'

const RoomDetails = () => {
    const { id } = useParams()
    const { user, isSignedIn } = useUser()
    const { getToken } = useAuth()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [availabilityStatus, setAvailabilityStatus] = useState(null)
    const [isChecking, setIsChecking] = useState(false)
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        guests: 1
    })

    // API Base URL - updated to use your backend
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

    useEffect(() => {
        fetchRoomDetails()
    }, [id])

    const fetchRoomDetails = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await fetch(`${API_BASE}/api/rooms/${id}`)
            
            if (!response.ok) {
                throw new Error('Room not found')
            }
            
            const data = await response.json()
            
            if (data.success && data.room) {
                setRoom(data.room)
                setMainImage(data.room.images[0])
            } else {
                setError('Room not found')
            }
        } catch (error) {
            console.error('Failed to fetch room details:', error)
            setError('Failed to load room details')
        } finally {
            setLoading(false)
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
        today.setHours(0, 0, 0, 0)
        
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

        try {
            // Check availability
            const response = await fetch(`${API_BASE}/api/bookings/check-availability`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    room: id,
                    checkInDate: formData.checkInDate,
                    checkOutDate: formData.checkOutDate
                })
            })

            const data = await response.json()

            if (data.success && data.isAvailable) {
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
        } catch (error) {
            console.error('Error checking availability:', error)
            setAvailabilityStatus({
                type: 'error',
                message: 'Failed to check availability. Please try again.'
            })
        } finally {
            setIsChecking(false)
        }
    }

    const handleBookNow = async () => {
        console.log('handleBookNow called')
        console.log('isSignedIn:', isSignedIn)
        console.log('user:', user)
        
        // Check if user is signed in
        if (!isSignedIn || !user) {
            setAvailabilityStatus({
                type: 'error',
                message: 'Please sign in to book this room'
            })
            return
        }

        try {
            setIsChecking(true)

            // Get auth token from Clerk - with detailed error handling
            let token
            try {
                console.log('Attempting to get token...')
                token = await getToken()
                console.log('Token received:', token ? 'yes' : 'no')
            } catch (tokenError) {
                console.error('Token retrieval error:', tokenError)
                setAvailabilityStatus({
                    type: 'error',
                    message: `Authentication failed: ${tokenError.message}. Please sign in again.`
                })
                setIsChecking(false)
                return
            }

            if (!token) {
                console.error('No token received')
                setAvailabilityStatus({
                    type: 'error',
                    message: 'Could not get authentication token. Please sign in again.'
                })
                setIsChecking(false)
                return
            }

            console.log('Making booking request...')
            const response = await fetch(`${API_BASE}/api/bookings/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    room: id,
                    checkInDate: availabilityStatus.details.checkIn,
                    checkOutDate: availabilityStatus.details.checkOut,
                    guests: availabilityStatus.details.guests
                })
            })

            const data = await response.json()
            console.log('Booking response:', data)

            if (data.success) {
                setAvailabilityStatus({
                    type: 'booked',
                    message: 'Booking confirmed!',
                    details: {
                        ...availabilityStatus.details,
                        bookingId: data.booking._id
                    }
                })
            } else {
                setAvailabilityStatus({
                    type: 'error',
                    message: data.message || 'Failed to create booking'
                })
            }
        } catch (error) {
            console.error('Error creating booking:', error)
            setAvailabilityStatus({
                type: 'error',
                message: error.message || 'Failed to create booking. Please try again.'
            })
        } finally {
            setIsChecking(false)
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">{error}</div>
                    <button 
                        onClick={fetchRoomDetails}
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/*Room Details */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel?.name || 'Luxury Hotel'} <span className='font-inter text-sm'>({room.roomType})</span></h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-gray-700 rounded-full'>Premium Room</p>
            </div>

            {/*Room Rating*/}
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2'>4.8 · 200+ Reviews</p>
            </div>

            {/*Room address*/}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel?.address || room.hotel?.name || 'Featured Location'}</span>
            </div>

            {/*Room images */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="Room Image" className='w-full h-80 lg:h-96 rounded-xl shadow-lg object-cover' />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.length > 1 && room.images.slice(0, 4).map((image, index) => (
                        <img 
                            onClick={() => setMainImage(image)} 
                            src={image} 
                            alt="Room Image" 
                            key={index} 
                            className={`w-full h-36 lg:h-44 rounded-xl shadow-md object-cover cursor-pointer transition-all ${
                                mainImage === image ? 'outline outline-3 outline-gray-700' : 'hover:opacity-80'
                            }`} 
                        />
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
                <div className="text-right">
                    <p className='text-2xl font-medium'>${room.pricePerNight} <span className="text-lg font-normal">/night</span></p>
                </div>
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
                            min={new Date().toISOString().split('T')[0]}
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
                            min={formData.checkInDate || new Date().toISOString().split('T')[0]}
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
                    availabilityStatus.type === 'available' || availabilityStatus.type === 'booked'
                        ? 'bg-green-50 border-green-200' 
                        : availabilityStatus.type === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                }`}>
                    <div className={`flex items-start gap-3 ${
                        availabilityStatus.type === 'available' || availabilityStatus.type === 'booked' ? 'text-green-800' : 
                        availabilityStatus.type === 'error' ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            availabilityStatus.type === 'available' || availabilityStatus.type === 'booked' ? 'bg-green-200' : 
                            availabilityStatus.type === 'error' ? 'bg-red-200' : 'bg-yellow-200'
                        }`}>
                            {availabilityStatus.type === 'available' || availabilityStatus.type === 'booked' ? '✓' : 
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
                                        <strong>Total Price: ${availabilityStatus.details.totalPrice.toLocaleString()}</strong>
                                    </p>
                                    {availabilityStatus.type === 'available' && (
                                        <button 
                                            onClick={handleBookNow}
                                            disabled={isChecking}
                                            className={`mt-3 ${
                                                isChecking 
                                                    ? 'bg-gray-400 cursor-not-allowed' 
                                                    : 'bg-green-600 hover:bg-green-700'
                                            } text-white px-6 py-2 rounded-lg font-semibold transition-colors`}
                                        >
                                            {isChecking ? 'Booking...' : 'Confirm Booking'}
                                        </button>
                                    )}
                                    {availabilityStatus.type === 'booked' && (
                                        <div className='mt-3'>
                                            <p className='text-green-700 font-semibold mb-2'>✓ Booking Confirmed!</p>
                                            <a 
                                                href="/my-bookings"
                                                className='inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors'
                                            >
                                                View My Bookings
                                            </a>
                                        </div>
                                    )}
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
                <p className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
                    Experience unparalleled luxury in our carefully designed accommodations. Each room features premium amenities and thoughtful touches to ensure your stay is nothing short of exceptional. Our attentive staff is dedicated to making your visit memorable, whether you're here for business or pleasure.
                </p>
            </div>

            {/*Hosted By*/}
            <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4'>
                    <img 
                        src={room.hotel?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"} 
                        alt="Host" 
                        className='h-14 w-14 md:h-18 md:w-18 rounded-full object-cover' 
                    />
                    <div>
                        <p className='text-lg md:text-xl'>Managed by {room.hotel?.name || 'Hotel Management'}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating />
                            <p className='ml-2'>4.8 · 200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='bg-gray-800 hover:bg-gray-900 active:scale-95 transition-all duration-300 text-white rounded-xl shadow-lg hover:shadow-xl max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base font-semibold'>
                    Contact Property
                </button>
            </div>
        </div>
    )
}

export default RoomDetails