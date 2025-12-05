import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const Dashboard = () => {
    const { getToken, userId } = useAuth()
    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        bookings: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000"

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            setError(null)

            const token = await getToken()

            if (!token) {
                setError('Please sign in to view dashboard')
                return
            }

            // Fetch user's bookings
            const response = await fetch(`${API_BASE}/api/bookings/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (data.success && data.bookings) {
                // Calculate stats
                const totalBookings = data.bookings.length
                const totalRevenue = data.bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)

                setDashboardData({
                    totalBookings,
                    totalRevenue,
                    bookings: data.bookings
                })
            } else {
                setDashboardData({
                    totalBookings: 0,
                    totalRevenue: 0,
                    bookings: []
                })
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error)
            setError('Failed to load dashboard data')
        } finally {
            setLoading(false)
        }
    }

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    if (loading) {
        return (
            <div className='py-8 px-4 md:px-0'>
                <div className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
                    <div className="flex gap-4 mb-8">
                        <div className="h-24 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-24 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='py-8 px-4 md:px-0'>
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">{error}</div>
                    <button 
                        onClick={fetchDashboardData}
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='py-8 px-4 md:px-0'>
            
            {/* Header Section */}
            <div className='flex flex-col items-start text-left mb-8'>
                <h1 className='font-playfair text-4xl md:text-[40px] text-gray-900'>Dashboard</h1>
                <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                    Streamline management of rooms, bookings, and earnings with powerful tools. Unlock valuable insights that drive growth and ensure operational success.
                </p>
            </div>

            {/* Stats Cards */}
            <div className='flex gap-4 my-8'>
                
                {/* Total Bookings */}
                <div className='bg-white border border-gray-300 rounded p-4 pr-8 flex items-center'>
                    <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-gray-600 text-lg'>Total Bookings</p>
                        <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className='bg-white border border-gray-300 rounded p-4 pr-8 flex items-center'>
                    <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-gray-600 text-lg'>Total Revenue</p>
                        <p className='text-neutral-400 text-base'>$ {dashboardData.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <h2 className='text-xl text-gray-600 font-medium mb-5'>Your Bookings</h2>
            
            <div className='bg-white w-full border border-gray-300 text-gray-600'>
                
                {/* Header Row */}
                <div className='flex items-center justify-between px-5 py-2.5 border-b border-gray-300'>
                    <p className='text-base font-medium text-gray-800'>BOOKINGS</p>
                    <div className='text-xs cursor-pointer'>
                        <button 
                            onClick={fetchDashboardData}
                            className='hover:text-blue-600'
                        >
                            REFRESH
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className='max-h-80 overflow-y-auto'>
                    
                    {/* Table Header */}
                    <div className='hidden md:grid md:grid-cols-5 px-5 py-3 bg-gray-50 border-b border-gray-300 font-medium text-sm'>
                        <div>Hotel</div>
                        <div>Check In</div>
                        <div>Check Out</div>
                        <div className='text-center'>Total Amount</div>
                        <div className='text-center'>Status</div>
                    </div>

                    {/* Bookings List */}
                    {dashboardData.bookings.length > 0 ? (
                        dashboardData.bookings.map((booking) => (
                            <div key={booking._id} className='grid grid-cols-1 md:grid-cols-5 px-5 py-4 border-b border-gray-300 last:border-0 hover:bg-gray-50/50 transition-colors'>
                                
                                {/* Hotel Name */}
                                <div className='flex flex-col gap-1'>
                                    <p className='font-medium text-gray-800'>{booking.hotelName || 'Hotel'}</p>
                                    <p className='text-xs text-gray-500'>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                                </div>

                                {/* Check In Date */}
                                <div className='flex items-center max-md:mt-2'>
                                    <span className='text-gray-700 font-light'>{formatDate(booking.checkInDate)}</span>
                                </div>

                                {/* Check Out Date */}
                                <div className='flex items-center max-md:mt-2'>
                                    <span className='text-gray-700 font-light'>{formatDate(booking.checkOutDate)}</span>
                                </div>

                                {/* Amount */}
                                <div className='flex items-center md:justify-center max-md:mt-2'>
                                    <span className='text-gray-700 font-medium'>${booking.totalPrice.toLocaleString()}</span>
                                </div>

                                {/* Status */}
                                <div className='flex items-center md:justify-center max-md:mt-2'>
                                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                        booking.status === 'confirmed'
                                            ? "bg-green-200 text-green-600"
                                            : booking.status === 'pending'
                                            ? "bg-yellow-200 text-yellow-600"
                                            : "bg-red-200 text-red-600"
                                    }`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty State */
                        <div className='text-center py-12 px-5'>
                            <p className='text-gray-500 mb-2'>No bookings yet</p>
                            <p className='text-sm text-gray-400'>Your bookings will appear here</p>
                            <a 
                                href="/rooms"
                                className='inline-block mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900'
                            >
                                Browse Rooms
                            </a>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Dashboard