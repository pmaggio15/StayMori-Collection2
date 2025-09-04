
import React, { useState } from 'react';
import { assets, cities } from '../assets/assets';

const HotelReg = ({ onClose }) => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'done'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    // simulate request
    setTimeout(() => {
      setStatus('done');
    }, 1400);
  };

  const isLoading = status === 'loading';
  const isDone = status === 'done';

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
      <div className='bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-fadeIn'>
        <div className='flex flex-col md:flex-row'>
          {/* Image Section */}
          <div className='md:w-1/2 relative overflow-hidden'>
            <img
              src={assets.regImage}
              alt="Luxury hotel registration"
              className='w-full h-64 md:h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div>
          </div>

          {/* Right Section */}
          <div className='md:w-1/2 p-8 md:p-12 relative'>
            {/* Close */}
            <button
              onClick={onClose}
              className='absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors'
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header (hidden on success) */}
            {!isDone && (
              <div className='mb-8'>
                <h2 className='font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                  Register Your Hotel
                </h2>
                <p className='text-gray-600 text-base leading-relaxed'>
                  Join the StayMori Collection and showcase your property to luxury travelers worldwide.
                </p>
              </div>
            )}

            {/* SUCCESS VIEW */}
            {isDone && (
              <div className="flex flex-col items-center justify-center text-center pt-6 pb-4">
                <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
                  <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Thank you!</h3>
                <p className="mt-2 text-gray-600 max-w-sm">
                  Your registration was submitted successfully. We’ll review your property and be in touch shortly.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3.5 px-6 rounded-xl transition-all"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            )}

            {/* LOADING SKELETON */}
            {isLoading && !isDone && (
              <div className="space-y-6" aria-busy="true">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
                <div className="pt-2">
                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">Submitting…</p>
              </div>
            )}

            {/* FORM (hidden while loading or done) */}
            {status === 'idle' && (
              <form className='space-y-6' onSubmit={handleSubmit}>
                {/* Hotel Name */}
                <div>
                  <label htmlFor="name" className='block text-sm font-semibold text-gray-700 mb-2'>
                    Hotel Name *
                  </label>
                  <input
                    id='name'
                    type="text"
                    placeholder='Enter your hotel name'
                    className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 placeholder-gray-400'
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact" className='block text-sm font-semibold text-gray-700 mb-2'>
                    Phone Number *
                  </label>
                  <input
                    id='contact'
                    type="tel"
                    placeholder='Enter phone number'
                    className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 placeholder-gray-400'
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className='block text-sm font-semibold text-gray-700 mb-2'>
                    Full Address *
                  </label>
                  <input
                    id='address'
                    type="text"
                    placeholder='Enter complete address'
                    className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 placeholder-gray-400'
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className='block text-sm font-semibold text-gray-700 mb-2'>
                    City *
                  </label>
                  <select
                    id="city"
                    className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 bg-white'
                    required
                  >
                    <option value="" className='text-gray-400'>Select your city</option>
                    {cities.map((city) => (
                      <option key={city} value={city} className='text-gray-900'>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <div className='pt-4'>
                  <button
                    type='submit'
                    className='w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50'
                  >
                    Register Hotel
                  </button>

                  <p className='text-xs text-gray-500 mt-3 text-center leading-relaxed'>
                    By registering, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default HotelReg;
