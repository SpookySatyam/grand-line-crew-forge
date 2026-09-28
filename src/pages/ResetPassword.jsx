import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Skull, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuthStore();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isLinkMissing = !userId || !secret;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your secret phrase.');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(userId, secret, password);
      setSuccess(true);
      toast.success('Your secret phrase has been reset! Please log in.');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2500);
    } catch (err) {
      setError(err.message || 'This password recovery link has expired or is invalid.');
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
            {success ? (
              <CheckCircle2 className="w-12 h-12 text-gold drop-shadow-md animate-bounce" />
            ) : isLinkMissing ? (
              <AlertCircle className="w-12 h-12 text-pirateRed drop-shadow-md" />
            ) : (
              <KeyRound className="w-12 h-12 text-gold drop-shadow-md" />
            )}
          </div>

          <h2 className="text-3xl font-pirate tracking-widest text-gold text-center mb-2">
            Forge New Phrase
          </h2>
          <p className="text-parchment/60 font-sans text-center text-sm uppercase tracking-widest mb-8">
            Reset Account Password
          </p>

          {isLinkMissing ? (
            <div className="space-y-6 text-center">
              <div className="bg-pirateRed/10 border border-pirateRed/30 text-pirateRed p-4 rounded text-sm font-sans">
                This password recovery link is missing required parameters or is incomplete.
              </div>
              <Link
                to="/forgot-password"
                className="inline-block py-3 px-6 bg-pirateRed text-white rounded font-display tracking-[0.15em] uppercase hover:bg-red-700 transition-colors text-sm"
              >
                Request New Reset Link
              </Link>
            </div>
          ) : success ? (
            <div className="space-y-6 text-center">
              <div className="bg-gold/10 border border-gold/30 text-gold p-4 rounded text-sm font-sans">
                Secret phrase successfully updated! Navigating to login...
              </div>
              <Link
                to="/login"
                className="w-full py-4 bg-pirateRed text-white rounded font-display tracking-[0.2em] uppercase hover:bg-red-700 transition-colors inline-block text-center"
              >
                Log In Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-pirateRed/10 border border-pirateRed/30 text-pirateRed p-3 rounded text-sm font-sans text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold/80 mb-2 font-display">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gold/30 rounded p-3 text-parchment font-sans focus:outline-none focus:border-gold transition-colors"
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold/80 mb-2 font-display">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gold/30 rounded p-3 text-parchment font-sans focus:outline-none focus:border-gold transition-colors"
                  placeholder="Repeat new password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-pirateRed text-white rounded font-display tracking-[0.2em] uppercase hover:bg-red-700 transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Updating Secret...' : 'Set New Secret Phrase'}
              </button>

              <div className="mt-6 text-center font-sans text-parchment/60 text-sm">
                Expired or invalid?{' '}
                <Link to="/forgot-password" className="text-gold hover:text-white transition-colors underline decoration-gold/30">
                  Request New Link
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
