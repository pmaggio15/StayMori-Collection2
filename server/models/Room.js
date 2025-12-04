import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    // 🔥 RELATIONSHIP: Room belongs to a Hotel
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    roomType: { type: String, required: true }, // "Single", "Double"
    pricePerNight: { type: Number, required: true },

    // Make this cleaner: array of strings instead of raw Array
    amenities: [{ type: String, required: true }],

    images: [{ type: String }],

    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
