import React from 'react';
import { motion } from 'framer-motion';

export default function CrewStatusCard({ stats }) {
  const { totalRecruits = 0, totalCrews = 0, totalChallenges = 0 } = stats || {};
  
  let status = 'RECRUITING';
  let message = 'Gathering the crew.';
  
  if (totalRecruits > 0 && totalCrews === 0) {
    status = 'ASSEMBLING';
    message = 'Ready to forge crews.';
  } else if (totalCrews > 0 && totalChallenges === 0) {
    status = 'READY';
    message = 'Awaiting challenges.';
  } else if (totalCrews > 0 && totalChallenges > 0) {
    status = 'ON MISSION';
    message = 'Navigating the Grand Line.';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gold/20 flex flex-col items-center justify-center h-full hover:border-gold/50 transition-colors"
    >
      <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mb-4 bg-black/50">
        <span className="text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">
          {status === 'RECRUITING' && '📝'}
          {status === 'ASSEMBLING' && '⚓'}
          {status === 'READY' && '⚔️'}
          {status === 'ON MISSION' && '🗺️'}
        </span>
      </div>
      <h4 className="text-[10px] uppercase tracking-[0.2em] text-parchment/60 font-sans mb-1">Fleet Status</h4>
      <div className="text-xl font-display tracking-widest text-gold drop-shadow-sm mb-2">{status}</div>
      <p className="text-xs text-parchment/70 font-sans text-center">{message}</p>
    </motion.div>
  );
}
