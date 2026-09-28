import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Skull, Compass, ArrowLeft, MailCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { sendPasswordRecovery } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your pirate email address.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await sendPasswordRecovery(email);
      setSentSuccess(true);
      toast.success('Password recovery instructions sent to your email!');
    } catch (err) {
      setError(err.message || 'Failed to dispatch recovery instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 md:p-8 my-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/60 backdrop-blur-md p-8 rounded-xl border-2 border-gold/40 shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            {sentSuccess ? (
              <MailCheck className="w-12 h-12 text-gold drop-shadow-md animate-bounce" />
            ) : (
              <Compass className="w-12 h-12 text-gold drop-shadow-md" />
            )}
          </div>

          <h2 className="text-3xl font-pirate tracking-widest text-gold text-center mb-2">
            Lost Your Compass?
          </h2>
          <p className="text-parchment/60 font-sans text-center text-sm uppercase tracking-widest mb-8">
            Recover Secret Phrase
          </p>

          {error && (
            <div className="bg-pirateRed/10 border border-pirateRed/30 text-pirateRed p-3 rounded text-sm mb-6 font-sans text-center">
              {error}
            </div>
          )}

          {sentSuccess ? (
            <div className="space-y-6 text-center">
              <div className="bg-gold/10 border border-gold/30 text-gold p-4 rounded text-sm font-sans text-left">
                A password reset scroll has been dispatched to <span className="font-bold">{email}</span>. Click the link within to forge a new secret phrase.
              </div>

              <Link
                to="/login"
                className="w-full py-4 bg-pirateRed text-white rounded font-display tracking-[0.2em] uppercase hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Port (Login)</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold/80 mb-2 font-display">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-gold/30 rounded p-3 text-parchment font-sans focus:outline-none focus:border-gold transition-colors"
                  placeholder="pirate@strawhats.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-pirateRed text-white rounded font-display tracking-[0.2em] uppercase hover:bg-red-700 transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Dispatching...' : 'Send Recovery Scroll'}
              </button>

              <div className="mt-6 text-center font-sans text-parchment/60 text-sm">
                Remembered your secret phrase?{' '}
                <Link to="/login" className="text-gold hover:text-white transition-colors underline decoration-gold/30">
                  Set Sail (Login)
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
