import React from 'react';
import { motion } from 'framer-motion';
import { characters } from '../../lib/characters';

export default function RoleSelector({ roleKey, setRoleKey }) {
  return (
    <div className="mb-8">
      <label className="block font-display text-2xl mb-4 text-gold">Choose Your Destiny (Pirate Role)</label>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(characters).map(([key, char]) => {
          const isSelected = roleKey === key;
          
          return (
            <motion.button
              key={key}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRoleKey(key)}
              className={`relative p-4 rounded-xl border-2 text-center transition-all overflow-hidden ${
                isSelected 
                  ? 'border-pirateRed bg-pirateRed/20 shadow-[0_0_15px_rgba(186,12,12,0.5)]' 
                  : 'border-gold/30 bg-black/40 hover:border-gold/60'
              }`}
            >
              {isSelected && (
                <motion.div 
                  layoutId="roleGlow"
                  className="absolute inset-0 bg-pirateRed/20 blur-md -z-10"
                />
              )}
              <div className={`font-display text-xl tracking-wider ${isSelected ? 'text-parchment' : 'text-gold'}`}>
                {char.role}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
