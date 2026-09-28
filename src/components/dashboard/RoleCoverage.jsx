import React from 'react';
import { motion } from 'framer-motion';
import { characters } from '../../lib/characters';

export default function RoleCoverage({ roleCounts = {} }) {
  const allRoles = [
    { key: 'captain', label: 'Captain' },
    { key: 'navigator', label: 'Navigator' },
    { key: 'sniper', label: 'Sniper' },
    { key: 'chef', label: 'Chef' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'shipwright', label: 'Shipwright' }
  ];

  return (
    <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gold/20 flex flex-col h-full">
      <h3 className="text-sm tracking-[0.2em] uppercase text-gold/80 mb-4 font-sans font-bold border-b border-gold/10 pb-2">
        Fleet Role Coverage
      </h3>
      <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {allRoles.map((role, idx) => {
          const count = roleCounts[role.key] || 0;
          const isCovered = count > 0;
          const charData = characters[role.key];

          return (
            <motion.div 
              key={role.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
                isCovered ? 'bg-gold/10 border-gold/30' : 'bg-black/40 border-white/5 opacity-60'
              }`}
            >
              <div className="w-8 h-8 rounded-full border border-gold overflow-hidden shrink-0">
                <img 
                  src={charData?.image || '/assets/one-piece/01-luffy-captain.jpg'} 
                  alt={role.label} 
                  className={`w-full h-full object-cover ${!isCovered && 'grayscale'}`} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm uppercase tracking-wider text-parchment font-bold truncate">
                  {role.label}
                </div>
                <div className="text-[10px] text-parchment/60 font-sans truncate">
                  {isCovered ? `${count} Available` : 'Missing Role'}
                </div>
              </div>
              <div>
                {isCovered ? (
                  <span className="text-green-400 bg-green-400/10 w-6 h-6 rounded-full flex items-center justify-center text-xs">✓</span>
                ) : (
                  <span className="text-pirateRed bg-pirateRed/10 w-6 h-6 rounded-full flex items-center justify-center text-xs">⚠</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
