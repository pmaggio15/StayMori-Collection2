import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";


export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;


    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res.status(400).json({
        success: false,
        message: "No hotel found for this user. Register a hotel first.",
      });
    }


    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadImages = req.files.map(async (file) => {
        const response = await cloudinary.uploader.upload(file.path);
        return response.secure_url;
      });
      images = await Promise.all(uploadImages);
    }

  
    let parsedAmenities = [];
    if (typeof amenities === "string") {
      parsedAmenities = JSON.parse(amenities);
    } else if (Array.isArray(amenities)) {
      parsedAmenities = amenities;
    }

    const room = await Room.create({
      hotel: hotel._id, 
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: parsedAmenities,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("createRoom error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate("hotel")
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("getRooms error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate("hotel");

    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, room });
  } catch (error) {
    console.error("getRoomById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoomsByCity = async (req, res) => {
  try {
    const { cityName } = req.params;
    const regex = new RegExp(cityName, "i");

    let rooms = await Room.find({ isAvailable: true })
      .populate("hotel")
      .sort({ createdAt: -1 });

    rooms = rooms.filter((room) => room.hotel && regex.test(room.hotel.city));

    res.json({ success: true, rooms, count: rooms.length });
  } catch (error) {
    console.error("getRoomsByCity error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const searchRooms = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, roomType, sortBy } = req.query;

  
    const query = { isAvailable: true };

  
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }


    if (roomType) {
      query.roomType = { $regex: roomType, $options: "i" };
    }


    let sort = { createdAt: -1 };
    if (sortBy === "price-asc") sort = { pricePerNight: 1 };
    if (sortBy === "price-desc") sort = { pricePerNight: -1 };

    let rooms = await Room.find(query).populate("hotel").sort(sort);

   
    if (city) {
      const regex = new RegExp(city, "i");
      rooms = rooms.filter((room) => room.hotel && regex.test(room.hotel.city));
    }

    res.json({ success: true, rooms, count: rooms.length });
  } catch (error) {
    console.error("searchRooms error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllCities = async (req, res) => {
  try {
    const cities = await Hotel.distinct("city");
    cities.sort();

    res.json({ success: true, cities });
  } catch (error) {
    console.error("getAllCities error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getRoomsByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;

    const query = {
      isAvailable: true,
      pricePerNight: {
        $gte: Number(min) || 0,
        $lte: Number(max) || 10000,
      },
    };

    const rooms = await Room.find(query)
      .populate("hotel")
      .sort({ pricePerNight: 1 });

    res.json({ success: true, rooms, count: rooms.length });
  } catch (error) {
    console.error("getRoomsByPriceRange error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate("hotel")
      .limit(8);

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("getFeaturedRooms error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const hotelData = await Hotel.findOne({ owner: req.user._id });
    if (!hotelData) {
      return res.json({
        success: false,
        message: "No hotel found for this user",
      });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("getOwnerRooms error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    console.error("toggleRoomAvailability error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
