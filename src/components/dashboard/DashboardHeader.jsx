import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h1 className="text-5xl md:text-6xl font-pirate text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] mb-2 uppercase tracking-widest">
        Grand Fleet Command
      </h1>
      <p className="text-xl text-parchment/80 font-sans max-w-3xl">
        Monitor your gathered recruits, review their capabilities, and prepare them for the challenges of the Grand Line.
      </p>
    </motion.div>
  );
}
