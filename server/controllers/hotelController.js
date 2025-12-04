// server/controllers/hotelController.js

import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
  
    const { name, address, contact, city } = req.body;

    if (!name || !address || !contact || !city) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (name, address, contact, city)",
      });
    }

    
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const owner = req.user._id;

    console.log("registerHotel called for owner:", owner.toString(), {
      name,
      city,
    });

    const existingHotel = await Hotel.findOne({ owner });
    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel already registered for this user",
      });
    }

    const hotel = await Hotel.create({
      name,
      address,
      contact,
      city,
      owner, 
    });

    
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    return res.status(201).json({
      success: true,
      message: "Hotel registered successfully",
      hotel,
    });
  } catch (error) {
    console.error("registerHotel error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error registering hotel",
    });
  }
};


export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      hotels,
    });
  } catch (error) {
    console.error("getHotels error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching hotels",
    });
  }
};


export const getMyHotel = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const owner = req.user._id;
    const hotel = await Hotel.findOne({ owner });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "No hotel registered for this user",
      });
    }

    return res.json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error("getMyHotel error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching hotel",
    });
  }
};
