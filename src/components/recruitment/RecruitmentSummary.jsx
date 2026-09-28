import React from 'react';
import { motion } from 'framer-motion';

export default function RecruitmentSummary({ name, skills, interests, roleKey, roleName }) {
  if (!name && skills.length === 0 && interests.length === 0 && !roleKey) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl"
    >
      <h3 className="font-display text-xl text-gold mb-4 border-b border-gold/20 pb-2">Recruitment Dossier</h3>
      
      <div className="space-y-3 font-sans text-parchment/90">
        <div className="flex gap-2">
          <span className="font-bold text-parchment/60 w-24">Name:</span>
          <span>{name || <span className="text-parchment/30 italic">Unknown</span>}</span>
        </div>
        
        <div className="flex gap-2">
          <span className="font-bold text-parchment/60 w-24">Role:</span>
          <span>{roleName || <span className="text-parchment/30 italic">Undecided</span>}</span>
        </div>
        
        <div className="flex gap-2">
          <span className="font-bold text-parchment/60 w-24">Abilities:</span>
          <div className="flex-1 flex flex-wrap gap-1">
            {skills.length > 0 ? (
              skills.map(s => <span key={s} className="px-2 py-0.5 bg-darkBrown rounded text-sm">{s}</span>)
            ) : (
              <span className="text-parchment/30 italic">None registered</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <span className="font-bold text-parchment/60 w-24">Passions:</span>
          <div className="flex-1 flex flex-wrap gap-1">
            {interests.length > 0 ? (
              interests.map(i => <span key={i} className="px-2 py-0.5 bg-darkBrown rounded text-sm">{i}</span>)
            ) : (
              <span className="text-parchment/30 italic">None registered</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
