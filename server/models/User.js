import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "hotelOwner"],
      default: "user",
    },

    recentSearchedCities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
