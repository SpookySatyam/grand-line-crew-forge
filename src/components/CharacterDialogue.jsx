import React from 'react';
import { motion } from 'framer-motion';

export default function CharacterDialogue({ message }) {
  if (!message) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="relative z-10 bg-black/60 p-5 rounded-lg border-l-4 border-gold max-w-[85%] mt-4 shadow-xl backdrop-blur-sm"
    >
      <p className="text-xl italic font-sans leading-relaxed text-parchment/95">
        "{message}"
      </p>
    </motion.div>
  );
}
