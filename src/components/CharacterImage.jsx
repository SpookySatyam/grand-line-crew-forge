import React from 'react';
import { motion } from 'framer-motion';

export default function CharacterImage({ image, roleName }) {
  if (!image) {
    return (
      <div className="w-56 h-72 rounded-xl border-4 border-dashed border-gold/50 flex flex-col items-center justify-center bg-black/40 mb-6 relative z-10">
        <span className="text-gold opacity-80 font-display text-3xl uppercase tracking-widest mb-2">?</span>
        <span className="text-gold/50 uppercase text-xs tracking-widest text-center px-2">Awaiting Character</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, filter: 'brightness(0.5)' }}
      animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
      transition={{ duration: 0.5 }}
      className="relative z-10 mb-6 group"
    >
      <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img 
        src={image} 
        alt={roleName} 
        className="w-56 h-72 object-cover object-center rounded-xl border-4 border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
      />
    </motion.div>
  );
}
