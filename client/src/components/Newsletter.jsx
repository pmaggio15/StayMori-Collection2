import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import Title from './Title.jsx';

const Newsletter = () => {
  // No TypeScript generic here — plain JSX
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'done'
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // simulate request
    setTimeout(() => {
      setStatus('done');
    }, 1200);
  };

  const resetForm = () => {
    setEmail('');
    setStatus('idle');
  };

  const isLoading = status === 'loading';
  const isDone = status === 'done';

  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">
      <Title
        title="Insider Perks"
        subTitle="Join our exclusive email list and unlock insider travel deals, special perks, and unforgettable stays across the globe."
      />

      {/* IDLE: form */}
      {status === 'idle' && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 w-full max-w-xl"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none w-full"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 group bg-slate-50 text-gray-800 px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all disabled:opacity-60"
            disabled={!email}
          >
            Subscribe
            <img
              src={assets.arrowIcon}
              alt="arrow-icon"
              className="w-3.5 group-hover:translate-x-1 transition-all"
            />
          </button>
        </form>
      )}

      {/* LOADING: skeleton */}
      {isLoading && (
        <div className="w-full max-w-xl mt-6" aria-busy="true">
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-11 rounded bg-white/10 border border-white/10" />
            </div>
            <div className="animate-pulse">
              <div className="h-11 w-40 rounded bg-white/10 border border-white/10" />
            </div>
            <p className="text-xs text-gray-400 mt-2">Submitting…</p>
          </div>
        </div>
      )}

      {/* DONE: success */}
      {isDone && (
        <div className="w-full max-w-xl mt-8 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
            <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7L9 18l-5-5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold">Thank you!</h3>
          <p className="mt-2 text-gray-300">
            You’re on the list. Look out for insider perks and exclusive offers in your inbox.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={resetForm}
              className="px-5 py-2.5 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 transition"
            >
              Subscribe Another Email
            </button>
          </div>
          <p className="text-gray-500 mt-6 text-xs">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      )}

      {/* Idle disclaimer (only when idle) */}
      {status === 'idle' && (
        <p className="text-gray-500 mt-6 text-xs text-center">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      )}
    </div>
  );
};

export default Newsletter;








