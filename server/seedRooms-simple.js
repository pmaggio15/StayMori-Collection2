// ========================================
// MONGODB SEED SCRIPT - HARDCODED CONNECTION
// This bypasses .env issues
// ========================================

import mongoose from "mongoose";

// ========================================
// STEP 1: Define Room Schema (MATCHES YOUR MODEL)
// ========================================
const roomSchema = new mongoose.Schema(
  {
    hotel: { type: String, ref: "Hotel", required: true },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

// ========================================
// STEP 2: Define Your Real Rooms Data
// ========================================
const realRooms = [
  // NEW YORK - 3 rooms
  {
    hotel: "The Plaza Hotel - New York",
    roomType: "Deluxe",
    pricePerNight: 895,
    amenities: ["Free WiFi", "Room Service", "Minibar", "City View", "Marble Bathroom", "Premium Bedding"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "The Plaza Hotel - New York",
    roomType: "Suite",
    pricePerNight: 1495,
    amenities: ["Free WiFi", "Room Service", "Minibar", "Park View", "Separate Living Area", "Butler Service"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "1 Hotel Brooklyn Bridge - New York",
    roomType: "Deluxe",
    pricePerNight: 675,
    amenities: ["Free WiFi", "Organic Bath Products", "River View", "In-room Tablet", "Eco-friendly"],
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"
    ],
    isAvailable: true
  },

  // MIAMI - 2 rooms
  {
    hotel: "Fontainebleau Miami Beach",
    roomType: "Standard",
    pricePerNight: 425,
    amenities: ["Free WiFi", "Pool Access", "Beach Access", "Fitness Center", "Ocean View"],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "The Setai Miami Beach",
    roomType: "Premium Suite",
    pricePerNight: 1250,
    amenities: ["Free WiFi", "Butler Service", "Ocean View", "Private Balcony", "Espresso Machine", "Designer Toiletries"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    isAvailable: true
  },

  // LOS ANGELES - 3 rooms
  {
    hotel: "The Beverly Hills Hotel",
    roomType: "Deluxe",
    pricePerNight: 785,
    amenities: ["Free WiFi", "Room Service", "Garden View", "Private Patio", "Luxury Linens", "Pillow Menu"],
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "Shutters on the Beach - Santa Monica",
    roomType: "Suite",
    pricePerNight: 1125,
    amenities: ["Free WiFi", "Beach Access", "Ocean View", "Fireplace", "Separate Living Room", "Beach Cruiser Bikes"],
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "Hotel Bel-Air - Los Angeles",
    roomType: "Standard",
    pricePerNight: 695,
    amenities: ["Free WiFi", "Garden View", "Fireplace", "Terrace", "Italian Linens", "Swan Lake Views"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
    ],
    isAvailable: true
  },

  // SAN FRANCISCO - 2 rooms
  {
    hotel: "Fairmont San Francisco",
    roomType: "Standard",
    pricePerNight: 495,
    amenities: ["Free WiFi", "City View", "Fitness Center", "Business Center", "Concierge Service"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "The St. Regis San Francisco",
    roomType: "Executive Suite",
    pricePerNight: 1475,
    amenities: ["Free WiFi", "Butler Service", "City View", "Separate Living Area", "Walk-in Closet", "Soaking Tub"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800"
    ],
    isAvailable: true
  },

  // LAS VEGAS - 3 rooms
  {
    hotel: "The Venetian Resort",
    roomType: "Suite",
    pricePerNight: 385,
    amenities: ["Free WiFi", "Sunken Living Room", "Italian Marble Bathroom", "Pool Access", "Casino Access"],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "Bellagio Las Vegas",
    roomType: "Premium Suite",
    pricePerNight: 895,
    amenities: ["Free WiFi", "Fountain View", "Spa Tub", "Separate Living Area", "Premium Bedding", "24hr Room Service"],
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "Wynn Las Vegas",
    roomType: "Deluxe",
    pricePerNight: 575,
    amenities: ["Free WiFi", "Floor-to-Ceiling Windows", "Pillow-Top Mattress", "Pool Access", "Resort Credit"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    isAvailable: true
  },

  // CHICAGO - 2 rooms
  {
    hotel: "The Peninsula Chicago",
    roomType: "Deluxe",
    pricePerNight: 625,
    amenities: ["Free WiFi", "City View", "Bedside Control Panel", "Marble Bathroom", "Terry Robes", "Nespresso Machine"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "Four Seasons Hotel Chicago",
    roomType: "Suite",
    pricePerNight: 1195,
    amenities: ["Free WiFi", "Lake View", "Separate Living Room", "Marble Bathroom", "Walk-in Closet", "Premium Minibar"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
    ],
    isAvailable: true
  },

  // SEATTLE - 2 rooms
  {
    hotel: "Four Seasons Hotel Seattle",
    roomType: "Standard",
    pricePerNight: 545,
    amenities: ["Free WiFi", "Water View", "Floor-to-Ceiling Windows", "Soaking Tub", "Rainfall Shower"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "The Edgewater Hotel - Seattle",
    roomType: "Deluxe",
    pricePerNight: 475,
    amenities: ["Free WiFi", "Waterfront View", "Gas Fireplace", "Mountain Lodge Decor", "Pike Place Market Nearby"],
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
    ],
    isAvailable: true
  },

  // BOSTON - 2 rooms
  {
    hotel: "The Liberty Hotel Boston",
    roomType: "Standard",
    pricePerNight: 485,
    amenities: ["Free WiFi", "City View", "Luxury Linens", "Marble Bathroom", "Historic Building"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    isAvailable: true
  },
  {
    hotel: "Boston Harbor Hotel",
    roomType: "Suite",
    pricePerNight: 1085,
    amenities: ["Free WiFi", "Harbor View", "Separate Living Room", "Marble Bathroom", "Waterfront Location"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    isAvailable: true
  }
];

// ========================================
// STEP 3: Main Seeding Function
// ========================================
const seedDatabase = async () => {
  try {
    console.log("\n🚀 Starting MongoDB Seeding Process...\n");
   
    
    const MONGODB_URI = "mongodb+srv://pmaggio15:pmaggio15@cluster.d0wuwgh.mongodb.net/hotel-booking";

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB!\n");

    // Clear existing rooms
    console.log("🗑️  Clearing existing rooms from database...");
    const deleteResult = await Room.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing rooms\n`);

    // Insert new rooms
    console.log("🌱 Seeding new rooms...");
    const createdRooms = await Room.insertMany(realRooms);
    console.log(`✅ Successfully seeded ${createdRooms.length} rooms!\n`);

    // Show summary
    console.log("=" .repeat(50));
    console.log("📊 SEEDING SUMMARY");
    console.log("=" .repeat(50));
    console.log(`Total Rooms Added: ${createdRooms.length}`);
    
    // Count rooms by hotel
    const hotelCounts = {};
    createdRooms.forEach(room => {
      hotelCounts[room.hotel] = (hotelCounts[room.hotel] || 0) + 1;
    });
    
    console.log("\n🏨 Rooms by Hotel:");
    Object.entries(hotelCounts).forEach(([hotel, count]) => {
      console.log(`   ${hotel}: ${count} room(s)`);
    });
    
    console.log("\n" + "=" .repeat(50));
    console.log("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    console.log("=" .repeat(50) + "\n");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 MongoDB connection closed\n");
    process.exit(0);

  } catch (error) {
    console.error("\n" + "=" .repeat(50));
    console.error("❌ ERROR DURING SEEDING:");
    console.error("=" .repeat(50));
    console.error(error.message);
    console.error("\n💡 Full error:", error);
    
    await mongoose.connection.close();
    process.exit(1);
  }
};

// ========================================
// RUN THE SEED FUNCTION
// ========================================
console.log("\n" + "=" .repeat(50));
console.log("🏨 HOTEL ROOMS DATABASE SEEDER");
console.log("=" .repeat(50));

seedDatabase();