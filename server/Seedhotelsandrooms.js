import mongoose from "mongoose";
import "dotenv/config";

// ========================================
// MODELS
// ========================================
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  owner: { type: String, required: true, default: "system" },
  description: { type: String },
  image: { type: String }
}, { timestamps: true });

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  amenities: { type: Array, required: true },
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);
const Room = mongoose.model("Room", roomSchema);

// ========================================
// SEED DATA - Hotels with their Rooms
// ========================================
const hotelsWithRooms = [
  {
    hotel: {
      name: "The Plaza Hotel",
      address: "768 5th Ave, New York, NY 10019",
      city: "New York",
      description: "Iconic luxury hotel in Manhattan",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"
    },
    rooms: [
      {
        roomType: "Deluxe",
        pricePerNight: 895,
        amenities: ["Free WiFi", "Room Service", "Minibar", "City View", "Marble Bathroom", "Premium Bedding"],
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
        ]
      },
      {
        roomType: "Suite",
        pricePerNight: 1495,
        amenities: ["Free WiFi", "Room Service", "Minibar", "Park View", "Separate Living Area", "Butler Service"],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "1 Hotel Brooklyn Bridge",
      address: "60 Furman St, Brooklyn, NY 11201",
      city: "New York",
      description: "Eco-luxury hotel with stunning views",
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"
    },
    rooms: [
      {
        roomType: "Deluxe",
        pricePerNight: 675,
        amenities: ["Free WiFi", "Organic Bath Products", "River View", "In-room Tablet", "Eco-friendly"],
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800",
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Fontainebleau Miami Beach",
      address: "4441 Collins Ave, Miami Beach, FL 33140",
      city: "Miami",
      description: "Legendary beachfront resort",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
    },
    rooms: [
      {
        roomType: "Standard",
        pricePerNight: 425,
        amenities: ["Free WiFi", "Pool Access", "Beach Access", "Fitness Center", "Ocean View"],
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "The Setai Miami Beach",
      address: "2001 Collins Ave, Miami Beach, FL 33139",
      city: "Miami",
      description: "Asian-inspired luxury oceanfront hotel",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    },
    rooms: [
      {
        roomType: "Premium Suite",
        pricePerNight: 1250,
        amenities: ["Free WiFi", "Butler Service", "Ocean View", "Private Balcony", "Espresso Machine", "Designer Toiletries"],
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "The Beverly Hills Hotel",
      address: "9641 Sunset Blvd, Beverly Hills, CA 90210",
      city: "Los Angeles",
      description: "The Pink Palace of Beverly Hills",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"
    },
    rooms: [
      {
        roomType: "Deluxe",
        pricePerNight: 785,
        amenities: ["Free WiFi", "Room Service", "Garden View", "Private Patio", "Luxury Linens", "Pillow Menu"],
        images: [
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Shutters on the Beach",
      address: "1 Pico Blvd, Santa Monica, CA 90405",
      city: "Los Angeles",
      description: "Beachfront luxury in Santa Monica",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
    },
    rooms: [
      {
        roomType: "Suite",
        pricePerNight: 1125,
        amenities: ["Free WiFi", "Beach Access", "Ocean View", "Fireplace", "Separate Living Room", "Beach Cruiser Bikes"],
        images: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
          "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Hotel Bel-Air",
      address: "701 Stone Canyon Rd, Los Angeles, CA 90077",
      city: "Los Angeles",
      description: "Legendary hotel in a private canyon",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
    },
    rooms: [
      {
        roomType: "Standard",
        pricePerNight: 695,
        amenities: ["Free WiFi", "Garden View", "Fireplace", "Terrace", "Italian Linens", "Swan Lake Views"],
        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Fairmont San Francisco",
      address: "950 Mason St, San Francisco, CA 94108",
      city: "San Francisco",
      description: "Historic hotel atop Nob Hill",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
    },
    rooms: [
      {
        roomType: "Standard",
        pricePerNight: 495,
        amenities: ["Free WiFi", "City View", "Fitness Center", "Business Center", "Concierge Service"],
        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "The St. Regis San Francisco",
      address: "125 3rd St, San Francisco, CA 94103",
      city: "San Francisco",
      description: "Modern luxury in downtown SF",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    },
    rooms: [
      {
        roomType: "Executive Suite",
        pricePerNight: 1475,
        amenities: ["Free WiFi", "Butler Service", "City View", "Separate Living Area", "Walk-in Closet", "Soaking Tub"],
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
          "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "The Venetian Resort",
      address: "3355 S Las Vegas Blvd, Las Vegas, NV 89109",
      city: "Las Vegas",
      description: "All-suite Italian-inspired resort",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"
    },
    rooms: [
      {
        roomType: "Suite",
        pricePerNight: 385,
        amenities: ["Free WiFi", "Sunken Living Room", "Italian Marble Bathroom", "Pool Access", "Casino Access"],
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Bellagio Las Vegas",
      address: "3600 S Las Vegas Blvd, Las Vegas, NV 89109",
      city: "Las Vegas",
      description: "Iconic resort with famous fountains",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"
    },
    rooms: [
      {
        roomType: "Premium Suite",
        pricePerNight: 895,
        amenities: ["Free WiFi", "Fountain View", "Spa Tub", "Separate Living Area", "Premium Bedding", "24hr Room Service"],
        images: [
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Wynn Las Vegas",
      address: "3131 S Las Vegas Blvd, Las Vegas, NV 89109",
      city: "Las Vegas",
      description: "Luxury resort and casino",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    },
    rooms: [
      {
        roomType: "Deluxe",
        pricePerNight: 575,
        amenities: ["Free WiFi", "Floor-to-Ceiling Windows", "Pillow-Top Mattress", "Pool Access", "Resort Credit"],
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "The Peninsula Chicago",
      address: "108 E Superior St, Chicago, IL 60611",
      city: "Chicago",
      description: "Five-star luxury on the Magnificent Mile",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    },
    rooms: [
      {
        roomType: "Deluxe",
        pricePerNight: 625,
        amenities: ["Free WiFi", "City View", "Bedside Control Panel", "Marble Bathroom", "Terry Robes", "Nespresso Machine"],
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Four Seasons Hotel Chicago",
      address: "120 E Delaware Pl, Chicago, IL 60611",
      city: "Chicago",
      description: "Lakefront luxury hotel",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    },
    rooms: [
      {
        roomType: "Suite",
        pricePerNight: 1195,
        amenities: ["Free WiFi", "Lake View", "Separate Living Room", "Marble Bathroom", "Walk-in Closet", "Premium Minibar"],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Four Seasons Hotel Seattle",
      address: "99 Union St, Seattle, WA 98101",
      city: "Seattle",
      description: "Downtown waterfront luxury",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
    },
    rooms: [
      {
        roomType: "Standard",
        pricePerNight: 545,
        amenities: ["Free WiFi", "Water View", "Floor-to-Ceiling Windows", "Soaking Tub", "Rainfall Shower"],
        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "The Edgewater Hotel",
      address: "2411 Alaskan Way, Seattle, WA 98121",
      city: "Seattle",
      description: "Only hotel on Seattle's waterfront",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"
    },
    rooms: [
      {
        roomType: "Deluxe",
        pricePerNight: 475,
        amenities: ["Free WiFi", "Waterfront View", "Gas Fireplace", "Mountain Lodge Decor", "Pike Place Market Nearby"],
        images: [
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "The Liberty Hotel Boston",
      address: "215 Charles St, Boston, MA 02114",
      city: "Boston",
      description: "Historic luxury in former jail",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    },
    rooms: [
      {
        roomType: "Standard",
        pricePerNight: 485,
        amenities: ["Free WiFi", "City View", "Luxury Linens", "Marble Bathroom", "Historic Building"],
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
        ]
      }
    ]
  },
  {
    hotel: {
      name: "Boston Harbor Hotel",
      address: "70 Rowes Wharf, Boston, MA 02110",
      city: "Boston",
      description: "Waterfront luxury hotel",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    },
    rooms: [
      {
        roomType: "Suite",
        pricePerNight: 1085,
        amenities: ["Free WiFi", "Harbor View", "Separate Living Room", "Marble Bathroom", "Waterfront Location"],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
        ]
      }
    ]
  }
];

// ========================================
// SEED FUNCTION
// ========================================
const seedDatabase = async () => {
  try {
    console.log("\n🚀 Starting MongoDB Seeding with Hotels...\n");

    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://pmaggio15:YOUR_PASSWORD@cluster.d0wuwgh.mongodb.net/hotel-booking";

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB!\n");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Room.deleteMany({});
    await Hotel.deleteMany({});
    console.log("✅ Cleared old data\n");

    // Create hotels and rooms
    console.log("🌱 Creating hotels and rooms...");
    let totalRooms = 0;

    for (const data of hotelsWithRooms) {
      // Create hotel
      const hotel = await Hotel.create(data.hotel);
      console.log(`   ✓ Created hotel: ${hotel.name}`);

      // Create rooms for this hotel
      for (const roomData of data.rooms) {
        await Room.create({
          ...roomData,
          hotel: hotel._id  // Link to hotel ObjectId
        });
        totalRooms++;
      }
    }

    console.log(`\n✅ Successfully seeded ${hotelsWithRooms.length} hotels and ${totalRooms} rooms!\n`);

    console.log("=" .repeat(50));
    console.log("🎉 SEEDING COMPLETED!");
    console.log("=" .repeat(50) + "\n");

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// RUN
seedDatabase();