import React from 'react';
import { motion } from 'framer-motion';
import { characters } from '../../lib/characters';

export default function TeamMemberCard({ member, index }) {
  // Use character image if they picked a valid role
  const charAsset = member.roleKey ? characters[member.roleKey]?.image : null;

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 * index }}
      className="group/card flex items-center bg-black/40 backdrop-blur-sm p-3 rounded-md border-l-4 border-gold/50 hover:border-pirateRed hover:bg-black/60 transition-all duration-300 relative overflow-hidden"
    >
      {charAsset && (
        <div className="absolute right-0 top-0 bottom-0 w-24 opacity-20 group-hover/card:opacity-40 transition-opacity">
          <img src={charAsset} alt={member.role} className="w-full h-full object-cover object-top mask-image-gradient" style={{ WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }} />
        </div>
      )}
      
      <div className="flex-1 relative z-10">
        <div className="font-bold text-xl text-parchment drop-shadow-sm flex items-baseline gap-2">
          {member.name}
          <span className="text-xs text-gold/60 font-sans tracking-widest uppercase">{member.role}</span>
        </div>
        <div className="text-sm text-parchment/70 italic font-sans mt-1 flex flex-wrap gap-1">
          {member.skills.slice(0, 3).map(skill => (
            <span key={skill} className="px-2 py-0.5 bg-darkBrown/80 rounded-sm text-xs border border-darkBrown/50">{skill}</span>
          ))}
          {member.skills.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-parchment/40">+{member.skills.length - 3}</span>
          )}
        </div>
      </div>
      
      <div className="relative z-10 bg-pirateRed text-parchment font-display px-3 py-1 rounded shadow-[0_0_10px_rgba(186,12,12,0.5)] text-lg">
        {member.role}
      </div>
    </motion.div>
  );
}
