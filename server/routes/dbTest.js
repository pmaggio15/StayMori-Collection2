import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const TestSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
});

// Avoid model overwrite error in dev
const Test = mongoose.models.Test || mongoose.model("Test", TestSchema);

router.get("/test", async (req, res) => {
  try {
    const doc = await Test.create({ name: "Mongo is LIVE (local)" });
    return res.json({ success: true, doc });
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    return res
      .status(500)
      .json({ success: false, error: err.message });
  }
});

export default router;
