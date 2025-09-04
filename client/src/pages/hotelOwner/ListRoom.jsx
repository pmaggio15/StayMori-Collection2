import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {
    const [rooms, setRooms] = useState(roomsData)

    return (
        <div>
            <Title 
                align='left' 
                font='outfit' 
                title='Room Listings' 
                subTitle='Review, update, and organize all listed rooms. Maintain accurate details to ensure guests enjoy a seamless booking experience.' 
            />
            
            
            <div className='bg-white w-full border border-gray-300 text-gray-600 mt-12'>
                
                {/* Header Row */}
                <div className='flex items-center justify-between px-5 py-2.5 border-b border-gray-300'>
                    <p className='text-base font-medium text-gray-800'>StayMori Collection Rooms</p>
                </div>

                {/* Table Content */}
                <div className='max-h-80 overflow-y-auto'>
                    
                    {/* Table Header */}
                    <div className='hidden md:grid md:grid-cols-4 px-5 py-3 bg-gray-50 border-b border-gray-300 font-medium text-sm'>
                        <div>Room Name</div>
                        <div>Facilities</div>
                        <div className='text-center'>Price / Night</div>
                        <div className='text-center'>Status</div>
                    </div>

                    {/* Rooms List */}
                    {rooms.map((item, index) => (
                        <div key={index} className='grid grid-cols-1 md:grid-cols-4 px-5 py-4 border-b border-gray-300 last:border-0 hover:bg-gray-50/50 transition-colors'>
                            
                            {/* Room Name */}
                            <div className='flex flex-col gap-1'>
                                <p className='font-medium text-gray-800'>{item.roomType}</p>
                                <p className='text-xs text-gray-500'>Room</p>
                            </div>

                            {/* Facilities */}
                            <div className='flex items-center max-md:mt-2'>
                                <span className='text-gray-700 font-light'>{item.amenities.join(', ')}</span>
                            </div>

                            {/* Price */}
                            <div className='flex items-center md:justify-center max-md:mt-2'>
                                <span className='text-gray-700 font-medium'>${item.pricePerNight}</span>
                            </div>

                            {/* Status Toggle */}
                            <div className='flex items-center md:justify-center max-md:mt-2'>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <input 
                                        type='checkbox' 
                                        className='sr-only peer' 
                                        checked={item.isAvailable}
                                        onChange={() => {
                                            const updatedRooms = rooms.map(r => 
                                                r._id === item._id ? {...r, isAvailable: !r.isAvailable} : r
                                            )
                                            setRooms(updatedRooms)
                                        }}
                                    />
                                    <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                                </label>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {rooms.length === 0 && (
                        <div className='text-center py-12 px-5'>
                            <p className='text-gray-500 mb-2'>No rooms found</p>
                            <p className='text-sm text-gray-400'>Your room listings will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListRoom
