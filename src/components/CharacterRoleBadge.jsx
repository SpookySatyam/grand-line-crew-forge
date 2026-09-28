import React from 'react';
import { motion } from 'framer-motion';

export default function CharacterRoleBadge({ roleName }) {
  if (!roleName) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="relative z-10 mb-2"
    >
      <span className="px-4 py-1 bg-pirateRed text-parchment text-xs font-bold tracking-[0.2em] uppercase rounded shadow-lg border border-pirateRed/50">
        {roleName}
      </span>
    </motion.div>
  );
}
