import React from 'react';
import { motion } from 'framer-motion';

export default function CharacterSpotlight() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-xl"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-b from-gold/10 via-gold/5 to-transparent blur-3xl opacity-60" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-pirateRed/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl" />
    </motion.div>
  );
}
