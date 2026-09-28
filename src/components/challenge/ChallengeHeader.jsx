import React from 'react';
import { motion } from 'framer-motion';

export default function ChallengeHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl md:text-6xl font-pirate text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] mb-4 uppercase tracking-widest">
        Davy Back Challenges
      </h1>
      <p className="text-xl text-parchment/80 font-sans max-w-2xl mx-auto">
        Your crew is formed. The challenges await. Prove your worth on the Grand Line and cement your legacy.
      </p>
    </motion.div>
  );
}
