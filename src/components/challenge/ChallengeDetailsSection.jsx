import React from 'react';
import OverseerBadge from './OverseerBadge';

export default function ChallengeDetailsSection({ challenge, secondaryChar }) {
  return (
    <div className="p-8 md:w-2/3 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-darkBrown/90 to-deepOcean/90">
      {/* Decorative SVG */}
      <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none transform rotate-12 mix-blend-overlay">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M12 18v-6"></path><path d="M8 15h8"></path>
        </svg>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="inline-block bg-pirateRed/20 border border-pirateRed/40 text-pirateRed px-3 py-1 text-xs uppercase tracking-[0.2em] font-bold rounded">
            Target Operation
          </div>
          <OverseerBadge secondaryChar={secondaryChar} />
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-display mb-8 text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
          {challenge.title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-black/40 p-6 rounded-xl border border-gold/10 shadow-inner">
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-parchment/60 mb-3 font-sans flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full inline-block" /> Required Arsenal
            </h4>
            <div className="flex flex-wrap gap-2">
              {challenge.requiredSkills.map(s => (
                <span key={s} className="px-3 py-1.5 bg-darkBrown/80 rounded border border-gold/20 text-sm text-parchment/90 font-sans shadow-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-parchment/60 mb-3 font-sans flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pirateRed rounded-full inline-block" /> Threat Level
            </h4>
            <div className="text-3xl font-display tracking-widest text-pirateRed drop-shadow-md">
              {challenge.difficulty}
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-6 mt-auto">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold/60 mb-4 font-sans">Strategic Analysis</h4>
          <ul className="space-y-3 text-sm text-parchment/80 font-sans grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <li className="flex items-center gap-3 bg-black/30 p-2.5 rounded-lg border border-white/5">
              <span className="text-green-400 text-lg drop-shadow-sm bg-green-400/10 w-6 h-6 flex items-center justify-center rounded-full leading-none">✓</span> 
              Skill Match Confirmed
            </li>
            <li className="flex items-center gap-3 bg-black/30 p-2.5 rounded-lg border border-white/5">
              <span className="text-green-400 text-lg drop-shadow-sm bg-green-400/10 w-6 h-6 flex items-center justify-center rounded-full leading-none">✓</span> 
              Role Coverage Optimal
            </li>
            <li className="flex items-center gap-3 bg-black/30 p-2.5 rounded-lg border border-white/5">
              <span className="text-green-400 text-lg drop-shadow-sm bg-green-400/10 w-6 h-6 flex items-center justify-center rounded-full leading-none">✓</span> 
              Power Level Aligned
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
