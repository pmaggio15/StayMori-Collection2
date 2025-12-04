import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const clerkUserId = req.auth?.userId;

    if (!clerkUserId) {
      return res.status(401).json({ success: false, message: "not authenticated" });
    }
   
    let user = await User.findOne({ clerkId: clerkUserId });

    if (!user) {
      user = await User.create({
        clerkId: clerkUserId,
        username: clerkUserId,        
        email: `${clerkUserId}@temp.com`, 
        image: "",                    
      });
    }

  
    req.user = user;
    next();
  } catch (err) {
    console.error("protect middleware error:", err);
    return res.status(500).json({ success: false, message: "auth error" });
  }
};
