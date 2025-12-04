import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE; // http://localhost:4000

const CreateRoom = () => {
  const [roomType, setRoomType] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [amenities, setAmenities] = useState(""); // comma separated
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("roomType", roomType);
      formData.append("pricePerNight", pricePerNight);
      formData.append("amenities", JSON.stringify(
        amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean)
      ));

      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await axios.post(`${API_BASE}/api/rooms`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Create room response:", res.data);
      alert(res.data.message || "Room created");
      setStatus("done");
      setRoomType("");
      setPricePerNight("");
      setAmenities("");
      setImages([]);
    } catch (err) {
      console.error("Create room error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Failed to create room. Check console."
      );
      setStatus("idle");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Room</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Room Type *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Deluxe King, Suite, etc."
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price Per Night (USD) *
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Amenities (comma separated)
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="WiFi, Pool, Gym"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Images (optional)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {status === "loading" ? "Creating..." : "Create Room"}
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
