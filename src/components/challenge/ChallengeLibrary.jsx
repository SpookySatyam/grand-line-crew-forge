import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';
import CreateChallengeModal from './CreateChallengeModal';

export default function ChallengeLibrary() {
  const { challenges } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gold/20 mt-12 mb-8">
      <div className="flex justify-between items-center mb-6 border-b border-gold/10 pb-4">
        <h3 className="text-xl tracking-[0.2em] uppercase text-gold/80 font-sans font-bold">
          Challenge Library
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-pirateRed/20 hover:bg-pirateRed/50 border border-pirateRed text-parchment rounded text-sm uppercase tracking-wider transition-colors"
        >
          <Plus size={16} />
          Create Mission
        </button>
      </div>

      {!challenges || challenges.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-parchment/60 font-sans italic">No missions documented. Create one to begin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(challenges || []).map((challenge, idx) => {
            if (!challenge) return null;
            return (
            <motion.div 
              key={challenge._id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/60 border border-gold/30 rounded-lg p-4 hover:border-gold/60 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-display text-gold truncate pr-2">{challenge.title}</h4>
                <span className={`text-[10px] px-2 py-1 rounded uppercase tracking-wider ${
                  challenge.difficulty === 'Hard' ? 'bg-pirateRed/20 text-pirateRed border border-pirateRed/30' :
                  challenge.difficulty === 'Medium' || challenge.difficulty === 'Normal' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                  'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
              
              {challenge.description && (
                <p className="text-sm text-parchment/70 font-sans line-clamp-2 mb-4">
                  {challenge.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-auto">
                {(challenge.requiredSkills || []).map(skill => (
                  <span key={skill} className="text-[10px] bg-white/5 text-parchment/60 px-2 py-1 rounded border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            );
          })}
        </div>
      )}

      <CreateChallengeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
