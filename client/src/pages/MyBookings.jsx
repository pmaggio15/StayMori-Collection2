import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useUser } from '@clerk/clerk-react'

const MyBookings = () => {
    const { user } = useUser()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000"

    useEffect(() => {
        if (user) {
            fetchBookings()
        }
    }, [user])

    const fetchBookings = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`${API_BASE}/api/bookings/user`, {
                headers: {
                    'Authorization': `Bearer ${await user.getToken()}`
                }
            })

            const data = await response.json()

            if (data.success) {
                setBookings(data.bookings)
            } else {
                setError(data.message || 'Failed to load bookings')
            }
        } catch (error) {
            console.error('Error fetching bookings:', error)
            setError('Failed to load bookings')
        } finally {
            setLoading(false)
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
                <Title 
                    title='My Bookings' 
                    subTitle='Manage every hotel stay—past trips, current bookings, and upcoming plans—with a few simple clicks.' 
                    align='left' 
                />
                <div className="mt-8 space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="animate-pulse flex gap-6 py-6 border-b">
                            <div className="w-44 h-32 bg-gray-200 rounded"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
                <Title 
                    title='My Bookings' 
                    subTitle='Manage every hotel stay—past trips, current bookings, and upcoming plans—with a few simple clicks.' 
                    align='left' 
                />
                <div className="mt-8 text-center p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    {error}
                </div>
            </div>
        )
    }

    // Empty state
    if (bookings.length === 0) {
        return (
            <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
                <Title 
                    title='My Bookings' 
                    subTitle='Manage every hotel stay—past trips, current bookings, and upcoming plans—with a few simple clicks.' 
                    align='left' 
                />
                <div className="mt-8 text-center p-12 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="text-6xl mb-4">🏨</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-6">Start exploring our luxury accommodations and book your perfect stay!</p>
                    <a 
                        href="/rooms" 
                        className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        Browse Hotels
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
            <Title 
                title='My Bookings' 
                subTitle='Manage every hotel stay—past trips, current bookings, and upcoming plans—with a few simple clicks.' 
                align='left' 
            />
            
            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                    <div>Hotels</div>
                    <div>Date & Timings</div>
                    <div>Status</div>
                </div>

                {bookings.map((booking) => (
                    <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                        {/* Hotel Details - Column 1 */}
                        <div className='flex flex-col md:flex-row'>
                            <img 
                                src={booking.room?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'} 
                                alt="hotel-img" 
                                className='md:w-44 h-32 rounded shadow object-cover' 
                            />
                            <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                                <p className='font-playfair text-2xl'>
                                    {booking.hotel?.name || booking.hotel}
                                    <span className='font-inter text-sm'> ({booking.room?.roomType || 'Room'})</span>
                                </p>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
                                    <span>{booking.hotel?.address || booking.hotel}</span>
                                </div>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <img src={assets.guestsIcon} alt="guests-icon" className='w-4 h-4' />
                                    <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                                </div>
                                <p className='text-base font-medium mt-2'>Total: ${booking.totalPrice}</p>
                            </div>
                        </div>

                        {/* Date & Timing - Column 2 */}
                        <div className='flex flex-col gap-4 mt-3 md:mt-0'>
                            <div>
                                <p className='font-medium'>Check-In:</p>
                                <p className='text-gray-500 text-sm'>{new Date(booking.checkInDate).toDateString()}</p>
                            </div>
                            <div>
                                <p className='font-medium'>Check-Out:</p>
                                <p className='text-gray-500 text-sm'>{new Date(booking.checkOutDate).toDateString()}</p>
                            </div>
                            <div>
                                <p className='text-xs text-gray-400'>
                                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Status - Column 3 */}
                        <div className="flex flex-col items-start justify-center pt-3">
                            <div className="flex items-center gap-2">
                                {/* Status Dot */}
                                <div
                                    className={`h-3 w-3 rounded-full ${
                                        booking.status === 'confirmed'
                                            ? "bg-green-500"
                                            : booking.status === 'pending'
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                ></div>

                                {/* Status Text */}
                                <p
                                    className={`text-sm font-medium capitalize ${
                                        booking.status === 'confirmed'
                                            ? "text-green-600"
                                            : booking.status === 'pending'
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {booking.status}
                                </p>
                            </div>
                            
                            {/* Payment Status */}
                            <div className="mt-3">
                                <p className={`text-xs ${booking.isPaid ? 'text-green-600' : 'text-gray-600'}`}>
                                    {booking.isPaid ? '✓ Paid' : 'Pay at Hotel'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings