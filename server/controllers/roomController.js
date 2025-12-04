import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

// API to create a new room for a hotel
// POST /api/rooms
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    
    // Use placeholder images instead of Cloudinary upload
    const placeholderImages = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
    ];

    // For seeded rooms, just use a generic hotel name
    const room = await Room.create({
      hotel: "Your Hotel - Testing", // Generic hotel name
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images: placeholderImages,
    });

    res.json({ success: true, message: "Room created successfully", room });
  } catch (error) {
    console.error("createRoom error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms (UPDATED - works with seeded data)
// GET /api/rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate('hotel')
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get a single room by ID
// GET /api/rooms/:id
export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate('hotel');
    
    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, room });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get rooms by city (extracts city from hotel name)
// GET /api/rooms/city/:cityName
export const getRoomsByCity = async (req, res) => {
  try {
    const { cityName } = req.params;
    
    // Find rooms where hotel name contains the city name (case-insensitive)
    const rooms = await Room.find({
      hotel: { $regex: cityName, $options: 'i' },
      isAvailable: true
    }).sort({ createdAt: -1 });

    res.json({ success: true, rooms, count: rooms.length });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to search and filter rooms
// GET /api/rooms/search?city=Miami&minPrice=200&maxPrice=1000&roomType=Suite
export const searchRooms = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, roomType, sortBy } = req.query;
    
    // Build query object
    let query = { isAvailable: true };

    // Filter by city (in hotel name)
    if (city) {
      query.hotel = { $regex: city, $options: 'i' };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    // Filter by room type
    if (roomType) {
      query.roomType = { $regex: roomType, $options: 'i' };
    }

    // Build sort object
    let sort = { createdAt: -1 }; // default: newest first
    if (sortBy === 'price-asc') sort = { pricePerNight: 1 };
    if (sortBy === 'price-desc') sort = { pricePerNight: -1 };

    const rooms = await Room.find(query).sort(sort);

    res.json({ success: true, rooms, count: rooms.length });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all unique cities from rooms
// GET /api/rooms/cities/all
export const getAllCities = async (req, res) => {
  try {
    // Get all unique hotel names
    const rooms = await Room.find({ isAvailable: true }).distinct('hotel');
    
    // Extract cities from hotel names (assumes format: "Hotel Name - City")
    const cities = [...new Set(
      rooms.map(hotelName => {
        // Try to extract city after last dash or after last comma
        const parts = hotelName.split(' - ');
        if (parts.length > 1) {
          return parts[parts.length - 1].trim();
        }
        // Fallback: look for common city names in the string
        const cityKeywords = ['New York', 'Miami', 'Los Angeles', 'San Francisco', 'Las Vegas', 'Chicago', 'Seattle', 'Boston'];
        const foundCity = cityKeywords.find(city => hotelName.includes(city));
        return foundCity || 'Other';
      })
    )].sort();

    res.json({ success: true, cities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get rooms by price range
// GET /api/rooms/price-range?min=200&max=800
export const getRoomsByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    
    const query = {
      isAvailable: true,
      pricePerNight: {
        $gte: Number(min) || 0,
        $lte: Number(max) || 10000
      }
    };

    const rooms = await Room.find(query).sort({ pricePerNight: 1 });

    res.json({ success: true, rooms, count: rooms.length });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get featured/popular rooms (by price and quality)
// GET /api/rooms/featured
export const getFeaturedRooms = async (req, res) => {
  try {
    // Get a mix of different price ranges and room types
    const rooms = await Room.aggregate([
      { $match: { isAvailable: true } },
      { $sample: { size: 8 } } // Get 8 random rooms
    ]);

    // Populate hotel data for each room
    await Room.populate(rooms, { path: 'hotel' });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms for a specific hotel (EXISTING - unchanged)
// GET /api/rooms/owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to toggle availability of a room (EXISTING - unchanged)
// POST /api/rooms/toggle-availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "Room availability Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};