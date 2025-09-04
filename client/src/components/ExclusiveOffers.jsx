import React from 'react'
import Title from './Title'
import {assets, exclusiveOffers} from '../assets/assets.js'

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-32'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title align={'left'} title='Exclusive Offers' subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories' />
        <button className='group flex items-center gap-2 font-medium cursor-not-allowed max-md:mt-12 '>
            View All Offers
            <img src={assets.arrowIcon} alt="arrow-icon" 
            className='group-hover:translate-x-1 transition-all'/>
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
      {exclusiveOffers.map((item) => (
        <div 
          key={item._id} 
          className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl cursor-pointer' 
          style={{backgroundImage: `url(${item.image})`}}
        >
          <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full transition-transform duration-300 group-hover:scale-110'>
            {item.priceOff}% OFF
          </p>
          
          <div className='transition-all duration-300 group-hover:transform group-hover:-translate-y-1'>
            <p className='text-2xl font-medium font-playfair'>{item.title}</p>
            <p>{item.description}</p>
            <p className='text-xs text-white/70 mt-3'>{item.expiryDate}</p>
          </div>
          
          <button className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5 transition-all duration-300 group-hover:scale-105'>
            View Offers
            <img className='invert group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="arrow-icon" />
          </button>
          
          {/* Shimmer Effect on Hover */}
          <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out'></div>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default ExclusiveOffers

