import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'

const AddRoom = () => {

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,

        }
    })

  return (
    <form>
        <Title align='left' font='outfit' title='Add Room' subTitle='Fill in room descriptions, pricing, and amenities thoroughly to deliver accuracy, clarity, and a premium booking experience.' />
                 {/*Upload area for images */}
        <p className='text-gray-800 mt-10'>Images</p>
        <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
            {Object.keys(images).map((key) => (
                <label htmlFor={`roomImage${key}`} key={key}>
                    <img className='max-h-13 cursor-pointer opacity-80' src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
                    <input type="file" accept='image/*' id={`roomImage${key}`} hidden onChange={(e) => setImages({...images, [key]: e.target.files[0]})} />
                </label>
            ))}
        </div>

        {/* Room Type and Price Box */}
        <div className='bg-white border border-gray-300 rounded p-6 mt-6'>
            <div className='w-full flex max-sm:flex-col sm:gap-4'>
                <div className='flex-1 max-w-48'>
                    <p className='text-gray-800 mb-2'>Room Type</p>
                    <select value={inputs.roomType} onChange={(e) => setInputs({...inputs, roomType: e.target.value})} className='border opacity-70 border-gray-300 rounded p-2 w-full'>
                        <option value="">Select Room Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Luxury Room">Luxury Room</option>
                        <option value="Family Suite">Family Suite</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2 text-gray-800'>
                        Price <span className='text-xs'>/night</span>
                    </p>
                    <input type="number" placeholder='0' className='border border-gray-300 rounded p-2 w-24' value={inputs.pricePerNight} onChange={(e) => setInputs({...inputs, pricePerNight: e.target.value})} />
                </div>
            </div>
        </div>

        {/* Amenities Box */}
        <div className='bg-white border border-gray-300 rounded p-6 mt-6'>
            <p className='text-gray-800 mb-4'>Amenities</p>
            <div className='flex flex-col flex-wrap text-gray-400 max-w-sm'>
                {Object.keys(inputs.amenities).map((amenity, index) => (
                    <div key={index} className='mb-2'>
                        <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={() => setInputs({...inputs,amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]}})}/>
                        <label htmlFor={`amenities${index+1}`}> {amenity}</label>
                    </div>
                ))}
            </div>
        </div>

        <button className='bg-slate-600 hover:bg-slate-700 text-white px-8 py-2 rounded mt-3 mb-32 cursor-pointer transition-colors'>Add Room</button>
    </form>
  )
}

export default AddRoom

