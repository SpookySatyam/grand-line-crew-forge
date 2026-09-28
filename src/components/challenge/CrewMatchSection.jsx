import React from 'react';

export default function CrewMatchSection({ crew, compatibilityScore }) {
  return (
    <div className="p-8 md:w-1/3 bg-black/60 border-r-4 border-gold/40 flex flex-col justify-center relative overflow-hidden backdrop-blur-md">
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/one-piece/11-straw-hat-crew-secondary.jpg')] bg-cover bg-center mix-blend-overlay blur-sm"></div>
      
      <div className="relative z-10">
        <h3 className="text-sm tracking-[0.2em] uppercase text-gold/70 mb-3 font-sans border-b border-gold/20 pb-2 inline-block">Challenger Crew</h3>
        <h2 className="text-4xl lg:text-5xl font-display mb-8 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-none">{crew.name}</h2>
        
        <div className="space-y-3 mb-10">
          {crew.members.map(m => (
            <div key={m.id} className="flex items-center gap-4 text-sm text-parchment font-sans bg-black/50 p-3 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors">
              <span className="w-2.5 h-2.5 rounded-full bg-pirateRed shadow-[0_0_8px_rgba(186,12,12,0.8)] flex-shrink-0"></span>
              <div className="flex flex-col leading-tight overflow-hidden">
                <span className="font-bold text-base truncate">{m.name}</span>
                <span className="text-gold/60 text-xs uppercase tracking-wider">{m.role}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-auto bg-gradient-to-br from-black/80 to-darkBrown/80 p-5 rounded-xl border border-green-500/30 shadow-inner">
          <div className="text-xs tracking-[0.15em] uppercase text-parchment/60 font-sans mb-2 flex items-center gap-2">
            <span className="text-green-400">⚡</span> Crew Compatibility
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-5xl font-display text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)] leading-none">
              {compatibilityScore}%
            </div>
            <div className="text-sm text-green-400/60 font-sans">Optimal Match</div>
          </div>
        </div>
      </div>
    </div>
  );
}
