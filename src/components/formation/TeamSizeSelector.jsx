import React from 'react';

export default function TeamSizeSelector({ teamSize, setTeamSize }) {
  const sizes = [2, 3, 4, 5, 6];

  return (
    <div className="flex flex-col items-center justify-center bg-black/40 p-6 rounded-xl border border-gold/20 mb-8 max-w-lg mx-auto">
      <h3 className="text-sm tracking-[0.2em] uppercase text-gold/80 mb-4 font-sans font-bold">Crew Size Target</h3>
      <div className="flex gap-4">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => setTeamSize(size)}
            className={`w-12 h-12 rounded-lg font-display text-xl transition-all ${
              teamSize === size 
                ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.6)] scale-110' 
                : 'bg-black/60 text-gold/60 border border-gold/30 hover:border-gold hover:text-gold hover:bg-black/80'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
