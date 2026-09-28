import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Ship } from 'lucide-react';
import TeamReveal from '../components/TeamReveal';
import FormationHeader from '../components/formation/FormationHeader';
import FormationAlgorithmLoader from '../components/formation/FormationAlgorithmLoader';
import TeamSizeSelector from '../components/formation/TeamSizeSelector';

export default function CrewFormation() {
  const { participants, crews, formCrews } = useStore();
  const [isForming, setIsForming] = useState(false);
  const [teamSize, setTeamSize] = useState(3);
  const handleFormCrews = async () => {
    setIsForming(true);
    
    try {
      await formCrews(teamSize);
    } catch (error) {
      console.error(error);
    } finally {
      setIsForming(false);
    }
  };

  if (participants.length < 2) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-12 text-center relative z-10 bg-darkBrown/80 backdrop-blur-md rounded-2xl border border-gold/30">
        <h1 className="text-4xl font-display text-pirateRed mb-4 drop-shadow-md">Not Enough Recruits</h1>
        <p className="text-xl text-parchment/80 mb-8 font-sans">You need at least 2 recruits in the system to form a proper crew. Currently have {participants.length}.</p>
        <Link to="/recruit" className="inline-block px-8 py-4 bg-gold/20 border-2 border-gold text-gold rounded hover:bg-gold hover:text-black font-display tracking-widest transition-all">
          Back to Recruitment
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 my-8 relative z-10">
      <FormationHeader />

      <AnimatePresence mode="wait">
        {crews.length === 0 && !isForming && (
          <motion.div 
            key="init"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center mt-12"
          >
            <TeamSizeSelector teamSize={teamSize} setTeamSize={setTeamSize} />
            <motion.button 
              whileHover={participants.length >= teamSize ? { scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' } : {}}
              whileTap={participants.length >= teamSize ? { scale: 0.95 } : {}}
              onClick={handleFormCrews} 
              disabled={participants.length < teamSize}
              className="px-12 py-6 bg-gradient-to-r from-pirateRed to-red-900 border-2 border-gold text-parchment font-display tracking-[0.2em] text-2xl rounded-xl shadow-[0_15px_30px_rgba(186,12,12,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Compass className="inline-block w-8 h-8 mr-3 animate-spin-slow" />
              COMMENCE FORMATION
            </motion.button>
            {participants.length < teamSize && (
              <p className="mt-4 text-pirateRed font-sans">
                You need at least {teamSize} recruits to form a crew of this size. (You currently have {participants.length})
              </p>
            )}
          </motion.div>
        )}

        {isForming && (
          <motion.div key="forming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FormationAlgorithmLoader />
          </motion.div>
        )}

        {crews.length > 0 && !isForming && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-black/40 p-6 rounded-xl border border-gold/20">
              <h2 className="text-3xl lg:text-4xl font-display text-gold drop-shadow-md">
                The Grand Fleet is Ready
              </h2>
              <Link 
                to="/challenge" 
                className="flex items-center gap-2 px-8 py-3 bg-pirateRed/90 hover:bg-pirateRed border border-pirateRed text-parchment font-display tracking-widest text-lg rounded shadow-lg transition-all"
              >
                <Ship className="w-5 h-5" />
                Assign Challenges
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {crews.map((crew, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.2), duration: 0.5 }}
                  key={crew.id}
                  className="h-full"
                >
                  <TeamReveal crew={crew} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
