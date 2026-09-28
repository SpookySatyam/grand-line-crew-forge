import React from 'react';
import { motion } from 'framer-motion';
import CrewMatchSection from './CrewMatchSection';
import ChallengeDetailsSection from './ChallengeDetailsSection';

export default function ChallengeCard({ crew, challenge, compatibilityScore, secondaryChar, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.3, type: "spring", stiffness: 80 }}
      className="bg-deepOcean/90 backdrop-blur-xl text-parchment rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row border border-gold/40 relative group"
    >
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
      
      <CrewMatchSection 
        crew={crew} 
        compatibilityScore={compatibilityScore} 
      />
      
      <ChallengeDetailsSection 
        challenge={challenge} 
        secondaryChar={secondaryChar} 
        crew={crew}
      />
    </motion.div>
  );
}
