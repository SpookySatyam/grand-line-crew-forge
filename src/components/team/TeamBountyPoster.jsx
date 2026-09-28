import React from 'react';
import { motion } from 'framer-motion';

export default function TeamBountyPoster({ bgImage, isHovered }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: isHovered ? 1.05 : 1.1, opacity: isHovered ? 0.6 : 0.4 }}
        transition={{ duration: 0.7 }}
        src={bgImage} 
        alt="Crew Reveal Background" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-darkBrown via-darkBrown/80 to-transparent"></div>
      
      {/* Wanted Poster styling overlay */}
      <div className="absolute top-4 left-0 right-0 text-center opacity-20 font-display text-8xl tracking-widest text-parchment pointer-events-none uppercase">
        Wanted
      </div>
    </div>
  );
}
