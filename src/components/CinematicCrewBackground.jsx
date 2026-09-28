import React from 'react';
import { motion } from 'framer-motion';
import { backgroundAssets } from '../lib/characters';

export default function CinematicCrewBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
      {/* Base Ocean/Cinematic Image */}
      <motion.div 
        className="absolute inset-[-5%] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundAssets.cinematic.image}')` }}
        animate={{ 
          x: ["-2%", "2%", "-2%"],
          y: ["-2%", "2%", "-2%"],
        }}
        transition={{ 
          duration: 30, 
          ease: "linear",
          repeat: Infinity 
        }}
      />
      
      {/* Deep Ocean Overlay (Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-deepOcean/80 to-transparent"></div>

      {/* Atmospheric Fog */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-parchment/5 to-transparent mix-blend-overlay pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Subtle Dust/Particles (CSS driven or lightweight Framer Motion) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/20"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100 - Math.random() * 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
}
