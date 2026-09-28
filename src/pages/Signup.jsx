import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Skull } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, loading, error, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/dashboard', { replace: true });
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
            Forge Your Crew
          </h2>
          <p className="text-parchment/60 font-sans text-center text-sm uppercase tracking-widest mb-8">
            Create an Account
          </p>

          {error && (
            <div className="bg-pirateRed/10 border border-pirateRed/30 text-pirateRed p-3 rounded text-sm mb-6 font-sans text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gold/80 mb-2 font-display">
                Captain Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/50 border border-gold/30 rounded p-3 text-parchment font-sans focus:outline-none focus:border-gold transition-colors"
                placeholder="Monkey D. Luffy"
              />
            </div>

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
              <label className="block text-xs uppercase tracking-widest text-gold/80 mb-2 font-display">
                Password
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-pirateRed text-white rounded font-display tracking-[0.2em] uppercase hover:bg-red-700 transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? 'Forging...' : 'Register'}
            </button>
          </form>

          <div className="mt-8 text-center font-sans text-parchment/60 text-sm">
            Already have a crew?{' '}
            <Link to="/login" className="text-gold hover:text-white transition-colors underline decoration-gold/30">
              Set Sail
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
