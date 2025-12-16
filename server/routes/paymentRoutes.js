import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  createPaymentIntent, 
  confirmPayment,
  getBookingForPayment 
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-intent', protect, createPaymentIntent);
paymentRouter.post('/confirm', protect, confirmPayment);
paymentRouter.get('/booking/:bookingId', protect, getBookingForPayment);

export default paymentRouter;