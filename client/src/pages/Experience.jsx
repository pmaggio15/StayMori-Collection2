import React from 'react';
import { useNavigate } from 'react-router-dom';



const Experience = () => {
    const navigate = useNavigate();

  const handleDiscoverCollection = () => {
    navigate('/rooms'); 
  };
  return (
    <div className=' relative flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")] bg-no-repeat bg-cover bg-center min-h-screen'>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl">

        {/* Main Heading */}
        <h1 className="mt-32 font-playfair text-3xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-xl mb-8">
          Where Luxury Meets
          <span className="block text-white/90">Authentic Experience</span>
        </h1>

        {/* Main Content Card */}
        <div className="bg-white/95 backdrop-blur-lg text-gray-700 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 mb-8">
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              At StayMori Collection, we don't just offer accommodation—we curate 
              <span className="font-semibold text-gray-800"> transformative journeys</span>. 
              Every detail is orchestrated to create moments that transcend the ordinary: from our 
              intuitive concierge who anticipates your needs before you voice them, to our 
              locally-sourced amenities that tell the story of each destination.
            </p>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Whether it's the hand-selected art adorning your suite, the private rooftop dinner 
              under city lights, or the sunrise yoga session tailored to your schedule, we believe 
              luxury isn't about opulence—it's about 
              <span className="font-semibold text-gray-800"> authenticity, connection</span>, and 
              the perfect harmony between comfort and discovery.
            </p>

            {/* Highlight Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <p className="text-xl md:text-2xl font-playfair text-gray-800 mb-4">
                Here, you don't just <span className="font-semibold">stay</span>. 
                You <span className="font-semibold">belong</span>. 
                You <span className="font-semibold">explore</span>. 
                You <span className="font-semibold">remember</span>.
              </p>
              
              <blockquote className="text-lg font-medium text-gray-600 italic">
                "Where every moment is intentionally crafted, and every stay becomes a story worth telling."
              </blockquote>
            </div>

            {/* Visual Elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Crafted with Care</h3>
                <p className="text-sm text-gray-600">Every detail thoughtfully considered</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Locally Inspired</h3>
                <p className="text-sm text-gray-600">Authentic cultural connections</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Unforgettable Moments</h3>
                <p className="text-sm text-gray-600">Memories that last a lifetime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <button type='button' onClick={handleDiscoverCollection} className="cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 mb-12 mx-auto">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Discover Our Collection</span>
        </button>
      </div>
    </div>
  );
};

export default Experience;




