import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import SearchResults from './components/SearchResults';
import Hero from './components/Hero';
import { useState } from 'react';
import Experience from './pages/Experience';
import { Toaster } from 'react-hot-toast';
import Payment from './pages/Payment';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const [showHotelReg, setShowHotelReg] = useState(false);

  // Function to open the hotel registration modal
  const openHotelReg = () => {
    setShowHotelReg(true);
  };

  // Function to close the hotel registration modal
  const closeHotelReg = () => {
    setShowHotelReg(false);
  };

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar onOpenHotelReg={openHotelReg} />}
      {showHotelReg && <HotelReg onClose={closeHotelReg} />}
      
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/experience' element={<Experience />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />  
          <Route path='/payment/:bookingId' element={<Payment />} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
