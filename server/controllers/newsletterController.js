import Newsletter from "../models/Newsletter.js";
import { Resend } from 'resend';

// Initialize Resend (only if API key is provided)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Subscribe to newsletter
// POST /api/newsletter/subscribe
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.json({ success: false, message: "This email is already subscribed" });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        return res.json({ success: true, message: "Subscription reactivated!" });
      }
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({ email });

    // Send confirmation email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'StayMori Collection <onboarding@resend.dev>', // Change this to your verified domain
          to: email,
          subject: 'Welcome to StayMori Collection Insider Perks! 🎉',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 20px;">Welcome to Insider Perks!</h1>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to StayMori Collection's exclusive newsletter!
              </p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                You'll now receive:
              </p>
              
              <ul style="color: #4b5563; font-size: 16px; line-height: 1.8;">
                <li>🏨 Exclusive hotel deals and discounts</li>
                <li>✨ Early access to special offers</li>
                <li>🌍 Insider travel tips and destination guides</li>
                <li>🎁 Member-only perks and surprises</li>
              </ul>
              
              <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
                <p style="color: #1f2937; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                  Start Exploring Now
                </p>
                <p style="color: #4b5563; font-size: 14px; margin-bottom: 15px;">
                  Browse our luxury accommodations and book your next unforgettable stay.
                </p>
                <a href="https://stay-mori-collection02.vercel.app/rooms" 
                   style="display: inline-block; background-color: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  View Hotels
                </a>
              </div>
              
              <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
                You're receiving this email because you subscribed to StayMori Collection's newsletter.
              </p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the subscription if email fails
      }
    }

    res.json({ 
      success: true, 
      message: "Successfully subscribed to newsletter!",
      subscriber 
    });

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get all subscribers (admin only)
// GET /api/newsletter/subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 });
    
    res.json({ 
      success: true, 
      subscribers,
      count: subscribers.length 
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Unsubscribe from newsletter
// POST /api/newsletter/unsubscribe
export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const subscriber = await Newsletter.findOne({ email });
    
    if (!subscriber) {
      return res.json({ success: false, message: "Email not found" });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.json({ success: true, message: "Successfully unsubscribed" });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.json({ success: false, message: error.message });
  }
};