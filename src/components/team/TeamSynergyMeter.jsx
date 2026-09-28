import React from 'react';

export default function TeamSynergyMeter({ score }) {
  // Color depends on score
  let color = 'text-pirateRed';
  if (score >= 80) color = 'text-green-400';
  else if (score >= 50) color = 'text-gold';

  return (
    <div className="text-right bg-black/60 p-3 rounded-lg border border-gold/30 shadow-inner">
      <div className="text-[10px] uppercase tracking-widest text-parchment/60 font-sans mb-1">Synergy</div>
      <div className="flex items-center justify-end gap-2">
        <div className="w-20 h-1.5 bg-darkBrown rounded-full overflow-hidden">
          <div 
            className="h-full bg-current transition-all duration-1000" 
            style={{ width: `${score}%`, color: score >= 80 ? '#4ade80' : score >= 50 ? '#d4af37' : '#ba0c0c' }}
          />
        </div>
        <div className={`text-2xl font-display ${color} drop-shadow-md leading-none`}>
          {score}%
        </div>
      </div>
    </div>
  );
}
