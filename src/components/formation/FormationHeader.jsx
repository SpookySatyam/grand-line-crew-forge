import React from 'react';
import { motion } from 'framer-motion';

export default function FormationHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-5xl md:text-6xl font-pirate text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] mb-4">
        Crew Assembly
      </h1>
      <p className="text-xl text-parchment/80 font-sans max-w-2xl mx-auto">
        The winds of fate are blowing. Let the Grand Line decide who sails together based on skill, synergy, and destiny.
      </p>
    </motion.div>
  );
}
