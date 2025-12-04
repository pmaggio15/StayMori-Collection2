import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

// Function to Check Availability of Room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
      status: { $ne: "cancelled" }
    });

    const isAvailable = bookings.length === 0;
    return isAvailable;

  } catch (error) {
    console.error(error.message);
    return false;
  }
};

// API to check availability of room
// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to create a new booking
// POST /api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    
    // Get user ID from Clerk auth
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    // Before Booking Check Availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available for selected dates" });
    }

    // Get room data
    const roomData = await Room.findById(room);
    
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    let totalPrice = roomData.pricePerNight;

    // Calculate totalPrice based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= nights;

    // Create booking
    const booking = await Booking.create({
      user: userId,
      room,
      hotel: roomData.hotel, // This is the hotel name string from your seeded data
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
      status: "confirmed"
    });

    res.json({ 
      success: true, 
      message: "Booking created successfully",
      booking: {
        _id: booking._id,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        totalPrice: booking.totalPrice,
        nights
      }
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to create booking" });
  }
};

// API to get all bookings for a user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate("room")
      .sort({ createdAt: -1 });

    // Transform bookings to include hotel info from room
    const transformedBookings = bookings.map(booking => ({
      _id: booking._id,
      room: booking.room,
      hotel: {
        name: booking.hotel,
        address: booking.hotel
      },
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      totalPrice: booking.totalPrice,
      guests: booking.guests,
      status: booking.status,
      isPaid: booking.isPaid,
      createdAt: booking.createdAt
    }));

    res.json({ success: true, bookings: transformedBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

// API to get hotel bookings (for hotel owners)
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "No Hotel found" });
    }
    
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room user")
      .sort({ createdAt: -1 });
      
    // Total Bookings
    const totalBookings = bookings.length;
    // Total Revenue
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({ 
      success: true, 
      dashboardData: { totalBookings, totalRevenue, bookings } 
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};