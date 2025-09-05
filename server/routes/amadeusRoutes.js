import express from "express";

const amadeusRouter = express.Router();

amadeusRouter.get("/hotels", async (req, res) => {
  try {
    const { cityCode, checkInDate, checkOutDate, adults } = req.query;
    
    console.log("Amadeus API called with:", { cityCode, checkInDate, checkOutDate, adults });
    
    // Unique images for each hotel in each city
    const cityImageMap = {
      NYC: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=500&h=300&fit=crop"
      ],
      DXB: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop", 
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=500&h=300&fit=crop", 
        "https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?w=500&h=300&fit=crop", 
        "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=500&h=300&fit=crop"  
  ],
      SIN: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=500&h=300&fit=crop"
      ],
      LON: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=500&h=300&fit=crop"
      ]
    };

    // Get images for the specific city, fallback to NYC if city not found
    const cityImages = cityImageMap[cityCode] || cityImageMap.NYC;
    
    const mockHotels = [
      {
        hotel: {
          hotelId: `HOTEL_001_${cityCode}`,
          name: `Luxury Hotel in ${cityCode}`,
          address: {
            cityName: cityCode === "DXB" ? "Dubai" : 
                     cityCode === "NYC" ? "New York" : 
                     cityCode === "SIN" ? "Singapore" :
                     cityCode === "LON" ? "London" : cityCode
          }
        },
        offers: [{
          price: {
            total: Math.floor(Math.random() * 500) + 200,
            currency: "USD"
          }
        }],
        images: [cityImages[0], cityImages[1]]
      },
      {
        hotel: {
          hotelId: `HOTEL_002_${cityCode}`, 
          name: `Premium Resort ${cityCode}`,
          address: {
            cityName: cityCode === "DXB" ? "Dubai" : 
                     cityCode === "NYC" ? "New York" : 
                     cityCode === "SIN" ? "Singapore" :
                     cityCode === "LON" ? "London" : cityCode
          }
        },
        offers: [{
          price: {
            total: Math.floor(Math.random() * 400) + 150,
            currency: "USD"
          }
        }],
        images: [cityImages[1], cityImages[2]]
      },
      {
        hotel: {
          hotelId: `HOTEL_003_${cityCode}`,
          name: `Grand Hotel ${cityCode}`,
          address: {
            cityName: cityCode === "DXB" ? "Dubai" : 
                     cityCode === "NYC" ? "New York" : 
                     cityCode === "SIN" ? "Singapore" :
                     cityCode === "LON" ? "London" : cityCode
          }
        },
        offers: [{
          price: {
            total: Math.floor(Math.random() * 600) + 300,
            currency: "USD"
          }
        }],
        images: [cityImages[2], cityImages[3]]
      },
      {
        hotel: {
          hotelId: `HOTEL_004_${cityCode}`,
          name: `Elite Suites ${cityCode}`,
          address: {
            cityName: cityCode === "DXB" ? "Dubai" : 
                     cityCode === "NYC" ? "New York" : 
                     cityCode === "SIN" ? "Singapore" :
                     cityCode === "LON" ? "London" : cityCode
          }
        },
        offers: [{
          price: {
            total: Math.floor(Math.random() * 800) + 400,
            currency: "USD"
          }
        }],
        images: [cityImages[3], cityImages[0]]
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

