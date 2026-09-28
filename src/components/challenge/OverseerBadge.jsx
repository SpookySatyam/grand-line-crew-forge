import React from 'react';

export default function OverseerBadge({ secondaryChar }) {
  if (!secondaryChar) return null;
  
  // Note: the updated characters schema uses "name", not "characterName"
  const overseerName = secondaryChar.name || secondaryChar.characterName;
  
  return (
    <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-gold/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors hover:border-gold/60 hover:bg-black/70 cursor-help group">
      <img 
        src={secondaryChar.image} 
        alt={overseerName} 
        className="w-10 h-10 rounded-full border-2 border-gold object-cover shadow-sm group-hover:scale-110 transition-transform" 
      />
      <div className="flex flex-col justify-center">
        <span className="text-[10px] uppercase tracking-widest text-parchment/50 font-sans leading-none mb-1">Challenge Overseer</span>
        <span className="text-sm font-display tracking-wider text-gold drop-shadow-md leading-none">{overseerName}</span>
      </div>
    </div>
  );
}
