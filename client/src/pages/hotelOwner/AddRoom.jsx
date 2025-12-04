import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'

const AddRoom = () => {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

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
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
        }
    })

    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validation
        if (!inputs.roomType || !inputs.pricePerNight) {
            setMessage('Please fill in all required fields')
            setStatus('error')
            return
        }

        setStatus('loading')
        setMessage('')

        try {
            const formData = new FormData()
            formData.append('roomType', inputs.roomType)
            formData.append('pricePerNight', inputs.pricePerNight)

            // Convert amenities object to array of selected amenities
            const selectedAmenities = Object.keys(inputs.amenities).filter(
                amenity => inputs.amenities[amenity]
            )
            formData.append('amenities', JSON.stringify(selectedAmenities))

            // Append images
            Object.values(images).forEach((image) => {
                if (image) {
                    formData.append('images', image)
                }
            })

            const response = await fetch(`${API_BASE}/api/rooms`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

            const data = await response.json()

            if (data.success) {
                setStatus('success')
                setMessage('Room created successfully!')
                
                // Reset form
                setImages({ 1: null, 2: null, 3: null, 4: null })
                setInputs({
                    roomType: '',
                    pricePerNight: 0,
                    amenities: {
                        'Free WiFi': false,
                        'Free Breakfast': false,
                        'Room Service': false,
                        'Mountain View': false,
                        'Pool Access': false,
                    }
                })

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setStatus('idle')
                    setMessage('')
                }, 3000)
            } else {
                setStatus('error')
                setMessage(data.message || 'Failed to create room')
            }
        } catch (error) {
            console.error('Error creating room:', error)
            setStatus('error')
            setMessage('Failed to create room. Please try again.')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Title 
                align='left' 
                font='outfit' 
                title='Add Room' 
                subTitle='Fill in room descriptions, pricing, and amenities thoroughly to deliver accuracy, clarity, and a premium booking experience.' 
            />

            {/* Status Messages */}
            {message && (
                <div className={`mt-6 p-4 rounded-lg ${
                    status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                    status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                    {message}
                </div>
            )}

            {/* Upload area for images */}
            <p className='text-gray-800 mt-10'>Images</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key) => (
                    <label htmlFor={`roomImage${key}`} key={key}>
                        <img 
                            className='max-h-13 cursor-pointer opacity-80 hover:opacity-100 transition-opacity' 
                            src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} 
                            alt="" 
                        />
                        <input 
                            type="file" 
                            accept='image/*' 
                            id={`roomImage${key}`} 
                            hidden 
                            onChange={(e) => setImages({...images, [key]: e.target.files[0]})} 
                        />
                    </label>
                ))}
            </div>

            {/* Room Type and Price Box */}
            <div className='bg-white border border-gray-300 rounded p-6 mt-6'>
                <div className='w-full flex max-sm:flex-col sm:gap-4'>
                    <div className='flex-1 max-w-48'>
                        <p className='text-gray-800 mb-2'>Room Type *</p>
                        <select 
                            value={inputs.roomType} 
                            onChange={(e) => setInputs({...inputs, roomType: e.target.value})} 
                            className='border opacity-70 border-gray-300 rounded p-2 w-full'
                            required
                        >
                            <option value="">Select Room Type</option>
                            <option value="Standard">Standard</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                            <option value="Premium Suite">Premium Suite</option>
                            <option value="Executive Suite">Executive Suite</option>
                        </select>
                    </div>
                    <div>
                        <p className='mb-2 text-gray-800'>
                            Price * <span className='text-xs'>/night</span>
                        </p>
                        <input 
                            type="number" 
                            placeholder='0' 
                            min="0"
                            className='border border-gray-300 rounded p-2 w-24' 
                            value={inputs.pricePerNight} 
                            onChange={(e) => setInputs({...inputs, pricePerNight: e.target.value})} 
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Amenities Box */}
            <div className='bg-white border border-gray-300 rounded p-6 mt-6'>
                <p className='text-gray-800 mb-4'>Amenities</p>
                <div className='flex flex-col flex-wrap text-gray-400 max-w-sm'>
                    {Object.keys(inputs.amenities).map((amenity, index) => (
                        <div key={index} className='mb-2'>
                            <input 
                                type="checkbox" 
                                id={`amenities${index+1}`} 
                                checked={inputs.amenities[amenity]} 
                                onChange={() => setInputs({
                                    ...inputs,
                                    amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]}
                                })}
                            />
                            <label htmlFor={`amenities${index+1}`} className='ml-2 cursor-pointer'> {amenity}</label>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                type="submit"
                disabled={status === 'loading'}
                className={`${
                    status === 'loading' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-slate-600 hover:bg-slate-700'
                } text-white px-8 py-2 rounded mt-3 mb-32 cursor-pointer transition-colors`}
            >
                {status === 'loading' ? 'Creating Room...' : 'Add Room'}
            </button>
        </form>
    )
}

export default AddRoom