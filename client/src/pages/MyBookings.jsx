import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const MyBookings = () => {

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setBookings([])
        setLoading(false)
    }, [])

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        <Title 
            title='My Bookings' 
            subTitle='Manage every hotel stay—past trips, current bookings, and upcoming plans—with a few simple clicks.' align='left' />
            
            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                    <div className='w-1/3'>Hotels</div>
                    <div className='w-1/3'>Date & Timings</div>
                    <div className='w-1/3'>Payment</div>
                </div>

                {bookings.map((booking) => (
                    <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                {/* Hotel Details - Column 1 */}
                <div className='flex flex-col md:flex-row'>
                    <img src={booking.room.images[0]} alt="hotel-img" className='md:w-44 rounded shadow object-cover' />
                    <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                        <p className='font-playfair text-2xl'>{booking.hotel.name}
                            <span className='font-inter text-sm'> ({booking.room.roomType})</span>
                        </p>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.locationIcon} alt="location-icon" />
                            <span>{booking.hotel.address}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.guestsIcon} alt="guests-icon" />
                            <span>{booking.guests}</span>
                        </div>
                        <p className='text-base'>Total: ${booking.totalPrice}</p>
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
                </div>

                {/* Payment Status - Column 3 */}
                <div className="flex flex-col items-start justify-center pt-3">
                <div className="flex items-center gap-2">
                    {/* Status Dot */}
                    <div
                    className={`h-3 w-3 rounded-full ${
                        booking.isPaid
                        ? "bg-green-500"
                        : booking.isPending
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    ></div>

                    {/* Status Text */}
                    <p
                    className={`text-sm font-medium ${
                        booking.isPaid
                        ? "text-green-600"
                        : booking.isPending
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                    >
                    {booking.isPaid
                        ? "Paid"
                        : booking.isPending
                        ? "Pending"
                        : "Unpaid"}
                    </p>
                </div>
                {!booking.isPaid && (
                    <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                        Pay Now
                    </button>
                )}
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default MyBookings
