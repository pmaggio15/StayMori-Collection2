import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ booking, bookingId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24));
    return nights;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success/${bookingId}`,
        },
        redirect: 'if_required'
      });

      if (submitError) {
        setError(submitError.message);
        setProcessing(false);
      } else {
        // Payment successful - confirm on backend
        const token = await getToken();
        await fetch(`${API_BASE}/api/payment/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ bookingId })
        });

        window.location.href = '/my-bookings';
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-playfair text-gray-900 mb-8">Complete Your Booking</h1>

        {/* Booking Summary */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Booking Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Hotel:</span>
              <span className="font-medium text-gray-900">{booking.hotel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium text-gray-900">{formatDate(booking.checkInDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium text-gray-900">{formatDate(booking.checkOutDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nights:</span>
              <span className="font-medium text-gray-900">{calculateNights()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Guests:</span>
              <span className="font-medium text-gray-900">{booking.guests}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">${booking.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Information</h2>
        
        {/* ADD THIS TEST CARD INFO BOX */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Test Card</p>
            <div className="text-xs text-blue-800 space-y-1">
            <p><strong>Card:</strong> 4242 4242 4242 4242</p>
            <p><strong>Expiry:</strong> 12/34 | <strong>CVC:</strong> 123 | <strong>ZIP:</strong> 12345</p>
            </div>
        </div>

        <PaymentElement className="mb-6" />
        
        {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
            </div>
        )}

        <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-gray-900 text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
            {processing ? 'Processing...' : `Pay $${booking.totalPrice}`}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
            Your payment is secured by Stripe
        </p>
        </form>
      </div>
    </div>
  );
}

export default function Payment() {
  const { bookingId } = useParams();
  const { getToken, userId } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
      return;
    }

    initPayment();
  }, [bookingId, userId]);

  const initPayment = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      // Get booking details
      const bookingRes = await fetch(`${API_BASE}/api/payment/booking/${bookingId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const bookingData = await bookingRes.json();

      if (!bookingData.success) {
        throw new Error(bookingData.message);
      }

      setBooking(bookingData.booking);

      // Create payment intent
      const paymentRes = await fetch(`${API_BASE}/api/payment/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookingId })
      });

      const paymentData = await paymentRes.json();

      if (!paymentData.success) {
        throw new Error(paymentData.message);
      }

      setClientSecret(paymentData.clientSecret);
      setLoading(false);

    } catch (err) {
      console.error('Payment initialization error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#111827',
      }
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm booking={booking} bookingId={bookingId} />
    </Elements>
  );
}