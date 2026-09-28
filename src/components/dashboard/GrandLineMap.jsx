import React from 'react';
import { motion } from 'framer-motion';

export default function GrandLineMap({ stats }) {
  const { totalRecruits = 0, totalCrews = 0, totalChallenges = 0 } = stats || {};

  const stages = [
    { id: 'recruit', label: 'RECRUITS', active: true },
    { id: 'crew', label: 'CREW', active: totalRecruits > 0 },
    { id: 'challenge', label: 'CHALLENGE', active: totalCrews > 0 },
    { id: 'mission', label: 'MISSION', active: totalChallenges > 0 && totalCrews > 0 },
  ];

  return (
    <div className="bg-darkBrown/60 backdrop-blur-md p-6 rounded-xl border border-gold/30 mb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/one-piece/02-brook-secondary.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay" />
      
      <h3 className="text-sm tracking-[0.3em] uppercase text-gold/80 mb-6 text-center font-sans font-bold">Grand Line Journey</h3>
      
      <div className="relative flex items-center justify-between px-4 sm:px-12">
        {/* Connecting Line */}
        <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gold/20 -z-10 -translate-y-1/2" />
        
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex flex-col items-center gap-3">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, type: 'spring' }}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-black
                ${stage.active ? 'border-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'border-gold/30'}`}
            >
              {stage.active && <div className="w-2 h-2 rounded-full bg-gold" />}
            </motion.div>
            <span className={`text-[10px] sm:text-xs tracking-widest uppercase font-sans
              ${stage.active ? 'text-gold' : 'text-parchment/40'}`}>
              {stage.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
