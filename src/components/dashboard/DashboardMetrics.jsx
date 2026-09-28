import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardMetrics({ totalRecruits }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
    >
      <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl border border-gold/30 flex flex-col items-center justify-center shadow-lg">
        <div className="text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2">Total Recruits</div>
        <div className="text-5xl font-display text-gold drop-shadow-md leading-none">{totalRecruits}</div>
      </div>
      <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl border border-gold/30 flex flex-col items-center justify-center shadow-lg">
        <div className="text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2">Fleet Status</div>
        <div className={`text-2xl font-display mt-2 leading-none ${totalRecruits >= 3 ? 'text-green-400' : 'text-pirateRed'}`}>
          {totalRecruits >= 3 ? 'READY' : 'GATHERING'}
        </div>
      </div>
      <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl border border-gold/30 flex flex-col items-center justify-center shadow-lg md:col-span-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/one-piece/10-straw-hat-crew-primary.jpg')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="relative z-10 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-parchment/80 mb-2">Command Directive</div>
          <div className="text-lg font-sans text-gold/90 italic">
            {totalRecruits >= 3 
              ? '"The pieces are in place. Assemble the crews and set sail!"' 
              : '"A crew needs numbers. Keep recruiting before you brave the seas."'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
