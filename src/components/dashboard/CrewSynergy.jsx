import React from 'react';
import { motion } from 'framer-motion';

export default function CrewSynergy({ topSkills = [], topInterests = [] }) {
  return (
    <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gold/20 h-full">
      <h3 className="text-sm tracking-[0.2em] uppercase text-gold/80 mb-4 font-sans font-bold border-b border-gold/10 pb-2">
        Fleet Synergy Analysis
      </h3>
      
      {participants.length === 0 ? (
        <div className="text-sm text-parchment/50 font-sans italic">
          No recruits to analyze.
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.1em] text-parchment/40 mb-2">Dominant Skills</h4>
            {topSkills.length > 0 ? topSkills.map(([skill, count]) => (
              <div key={skill} className="text-sm text-parchment/80 font-sans mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full inline-block" />
                {count} member{count !== 1 ? 's' : ''} with <span className="font-bold text-gold">{skill}</span> experience.
              </div>
            )) : <span className="text-xs text-parchment/40">No skills logged.</span>}
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.1em] text-parchment/40 mb-2 mt-4">Shared Passions</h4>
            {topInterests.length > 0 ? topInterests.map(([interest, count]) => (
              <div key={interest} className="text-sm text-parchment/80 font-sans mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pirateRed rounded-full inline-block" />
                <span className="font-bold text-gold">{interest}</span> interest shared by {count}.
              </div>
            )) : <span className="text-xs text-parchment/40">No interests logged.</span>}
          </div>
        </div>
      )}
    </div>
  );
}
