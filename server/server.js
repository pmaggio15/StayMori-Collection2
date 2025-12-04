// server/server.js
import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebHooks.js";

import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import amadeusRouter from "./routes/amadeusRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://stay-mori-collection02.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

// Clerk webhooks
app.use("/api/clerk", clerkWebhooks);

// Health route
app.get("/", (req, res) => res.send("API is working"));

// API routes
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/amadeus", amadeusRouter);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    console.log("🚀 Starting API server…");
    await connectDB();          // ⬅️ Mongo FIRST
    connectCloudinary();        // ⬅️ Then Cloudinary

    app.listen(PORT, () => {
      console.log(`✅ API server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("💥 Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
