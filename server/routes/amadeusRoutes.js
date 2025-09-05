import express from "express";

const amadeusRouter = express.Router();

// Mock Amadeus API endpoint for now
amadeusRouter.get("/hotels", async (req, res) => {
  try {
    const { cityCode, checkInDate, checkOutDate, adults } = req.query;
    
    console.log("Amadeus API called with:", { cityCode, checkInDate, checkOutDate, adults });
    
    // Mock response that matches Amadeus format
  const mockHotels = [
    {
        hotel: {
        hotelId: "HOTEL_001",
        name: `Luxury Hotel in ${cityCode}`,
        address: {
            cityName: cityCode === "DXB" ? "Dubai" : cityCode === "NYC" ? "New York" : cityCode
        }
        },
        offers: [{
        price: {
            total: Math.floor(Math.random() * 500) + 200,
            currency: "USD"
        }
        }],
        images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop"
        ]
    },
    {
        hotel: {
        hotelId: "HOTEL_002", 
        name: `Premium Resort ${cityCode}`,
        address: {
            cityName: cityCode === "DXB" ? "Dubai" : cityCode === "NYC" ? "New York" : cityCode
        }
        },
        offers: [{
        price: {
            total: Math.floor(Math.random() * 400) + 150,
            currency: "USD"
        }
        }],
        images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop"
        ]
    },
    {
        hotel: {
        hotelId: "HOTEL_003",
        name: `Grand Hotel ${cityCode}`,
        address: {
            cityName: cityCode === "DXB" ? "Dubai" : cityCode === "NYC" ? "New York" : cityCode
        }
        },
        offers: [{
        price: {
            total: Math.floor(Math.random() * 600) + 300,
            currency: "USD"
        }
        }],
        images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=300&fit=crop"
        ]
    },
    {
        hotel: {
        hotelId: "HOTEL_004",
        name: `Elite Suites ${cityCode}`,
        address: {
            cityName: cityCode === "DXB" ? "Dubai" : cityCode === "NYC" ? "New York" : cityCode
        }
        },
        offers: [{
        price: {
            total: Math.floor(Math.random() * 800) + 400,
            currency: "USD"
        }
        }],
        images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578774204375-82d1a11c0095?w=500&h=300&fit=crop"
        ]
    }
    ];

    res.json({
      data: mockHotels,
      meta: {
        count: mockHotels.length
      }
    });

  } catch (error) {
    console.error("Amadeus API Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch hotels",
      message: error.message 
    });
  }
});

export default amadeusRouter;