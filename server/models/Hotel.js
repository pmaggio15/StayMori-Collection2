import mongoose from "mongoose";
const { Schema } = mongoose;

const hotelSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true },

    // 🔥 RELATIONSHIP: Hotel owned by a User (Mongo user, not Clerk)
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
