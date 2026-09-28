import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Skull } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const targetFrom = location.state?.from?.pathname;
  const from = (targetFrom && targetFrom !== '/login' && targetFrom !== '/verify-email') ? targetFrom : '/dashboard';

  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (_err) {
      // Error is handled and displayed by store
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
            <Skull className="w-12 h-12 text-pirateRed drop-shadow-md" />
          </div>
          <h2 className="text-3xl font-pirate tracking-widest text-gold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-parchment/60 font-sans text-center text-sm uppercase tracking-widest mb-8">
            Enter the Grand Line
          </p>

          {error && (
            <div className="bg-pirateRed/10 border border-pirateRed/30 text-pirateRed p-3 rounded text-sm mb-6 font-sans text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gold/80 mb-2 font-display">
                Email Address
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-widest text-gold/80 font-display">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-gold/80 hover:text-white transition-colors underline decoration-gold/30 font-sans"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-gold/30 rounded p-3 text-parchment font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-pirateRed text-white rounded font-display tracking-[0.2em] uppercase hover:bg-red-700 transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? 'Boarding...' : 'Set Sail'}
            </button>
          </form>

          <div className="mt-8 text-center font-sans text-parchment/60 text-sm">
            Don't have a crew yet?{' '}
            <Link to="/signup" className="text-gold hover:text-white transition-colors underline decoration-gold/30">
              Forge One
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
