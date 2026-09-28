import React from 'react';
import { motion } from 'framer-motion';

export default function RecruitmentHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <h1 className="text-5xl md:text-6xl font-pirate text-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] mb-4">
        Crew Recruitment
      </h1>
      <p className="text-xl text-parchment/80 font-sans max-w-2xl mx-auto">
        Every legend begins with a single step. Declare your name, state your abilities, and claim your role on the Grand Line.
      </p>
    </motion.div>
  );
}
