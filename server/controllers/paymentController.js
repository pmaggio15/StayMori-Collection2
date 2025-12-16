import Stripe from 'stripe';
import Booking from '../models/Booking.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.auth.userId;

    // Get booking
    const booking = await Booking.findById(bookingId).populate('room');
    
    if (!booking) {
      return res.json({ success: false, message: 'Booking not found' });
    }

    // Verify ownership
    if (booking.user !== userId) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    // Check if already paid
    if (booking.isPaid) {
      return res.json({ success: false, message: 'Booking already paid' });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalPrice * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId: booking._id.toString(),
        userId: booking.user,
        hotelName: booking.hotel
      },
      automatic_payment_methods: { enabled: true }
    });

    // Update booking with payment intent ID
    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.json({ 
      success: true,
      clientSecret: paymentIntent.client_secret,
      bookingId: booking._id
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Confirm Payment (called after Stripe confirms payment)
export const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.auth.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({ success: false, message: 'Booking not found' });
    }

    if (booking.user !== userId) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(booking.paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      booking.isPaid = true;
      booking.status = 'confirmed';
      booking.paymentMethod = 'Stripe';
      await booking.save();

      res.json({ 
        success: true, 
        message: 'Payment confirmed',
        booking 
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Payment not successful' 
      });
    }

  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.json({ success: false, message: error.message });
  }
};

// Get booking for payment page
export const getBookingForPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.auth.userId;

    const booking = await Booking.findById(bookingId).populate('room');

    if (!booking) {
      return res.json({ success: false, message: 'Booking not found' });
    }

    if (booking.user !== userId) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, booking });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};