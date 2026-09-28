import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Skull } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Skull className="w-32 h-32 text-pirateRed mx-auto mb-8 drop-shadow-[0_0_15px_rgba(186,12,12,0.8)]" />
      </motion.div>
      <h1 className="text-6xl font-pirate text-gold mb-4 tracking-widest">404</h1>
      <h2 className="text-2xl font-display text-parchment mb-8 uppercase tracking-[0.2em]">Off The Edge of the Map</h2>
      <p className="text-parchment/70 font-sans max-w-md mx-auto mb-12">
        You've sailed into uncharted waters. This destination does not exist in the Grand Line.
      </p>
      <Link 
        to="/"
        className="px-8 py-4 bg-gradient-to-r from-pirateRed to-red-900 border border-gold text-parchment font-display tracking-[0.2em] rounded shadow-lg hover:shadow-[0_0_20px_rgba(186,12,12,0.6)] transition-all hover:-translate-y-1"
      >
        RETURN TO PORT
      </Link>
    </div>
  );
}
