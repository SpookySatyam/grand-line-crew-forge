import React from 'react';
import { useStore } from '../store/useStore';
import { secondaryCharacters } from '../lib/characters';
import { Link } from 'react-router-dom';
import ChallengeHeader from '../components/challenge/ChallengeHeader';
import ChallengeCard from '../components/challenge/ChallengeCard';
import ChallengeLibrary from '../components/challenge/ChallengeLibrary';

export default function ChallengeAssignment() {
  const { crews, assignChallenges } = useStore();
  const [isAssigning, setIsAssigning] = React.useState(false);

  if (crews.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-12 text-center relative z-10 bg-darkBrown/80 backdrop-blur-md rounded-2xl border border-gold/30 shadow-2xl">
        <h1 className="text-4xl text-pirateRed mb-4 drop-shadow-md font-display">No Crews Formed</h1>
        <p className="text-xl text-parchment/80 mb-8 font-sans">You must assemble your crews before facing the challenges of the Grand Line.</p>
        <Link to="/formation" className="inline-block px-8 py-4 bg-gold/20 border-2 border-gold text-gold rounded hover:bg-gold hover:text-black font-display tracking-widest transition-all">
          Go to Crew Assembly
        </Link>
      </div>
    );
  }

  const handleAssign = async () => {
    setIsAssigning(true);
    try {
      await assignChallenges();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAssigning(false);
    }
  };

  const secondaryKeys = Object.keys(secondaryCharacters);
  const unassigned = crews.some(c => !c.challenge);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 my-8 relative z-10">
      <ChallengeHeader />
      
      {unassigned && (
        <div className="text-center mb-12">
          <button 
            onClick={handleAssign}
            disabled={isAssigning}
            className="px-8 py-4 bg-gradient-to-r from-pirateRed to-red-900 border-2 border-gold text-parchment font-display tracking-[0.1em] text-xl rounded shadow-[0_10px_20px_rgba(186,12,12,0.4)] transition-all hover:scale-105 disabled:opacity-50"
          >
            {isAssigning ? 'ASSIGNING...' : 'AUTO ASSIGN CHALLENGES'}
          </button>
        </div>
      )}

      <ChallengeLibrary />

      <div className="space-y-12">
        {crews.map((crew, idx) => {
          const challenge = crew.challenge;
          const compatibilityScore = crew.compatibilityScore || 0;
          const secondaryCharKey = secondaryKeys[idx % secondaryKeys.length];
          const secondaryChar = secondaryCharacters[secondaryCharKey];

          if (!challenge) return null;

          return (
            <ChallengeCard 
              key={crew._id}
              crew={crew}
              challenge={challenge}
              compatibilityScore={compatibilityScore}
              secondaryChar={secondaryChar}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
}
