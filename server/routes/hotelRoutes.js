import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerHotel,
  getHotels,
  getMyHotel,
} from "../controllers/hotelController.js";

const hotelRouter = express.Router();


hotelRouter.post("/", protect, registerHotel);
hotelRouter.post("/register", protect, registerHotel);


hotelRouter.get("/", getHotels);


hotelRouter.get("/me", protect, getMyHotel);

export default hotelRouter;
