import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { characters } from '../lib/characters';
// Removing uuid import

import CharacterReaction from '../components/CharacterReaction';
import RecruitmentHeader from '../components/recruitment/RecruitmentHeader';
import SkillInput from '../components/recruitment/SkillInput';
import InterestInput from '../components/recruitment/InterestInput';
import RoleSelector from '../components/recruitment/RoleSelector';
import RecruitmentSummary from '../components/recruitment/RecruitmentSummary';
import SubmissionLoader from '../components/recruitment/SubmissionLoader';

export default function Recruitment() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [roleKey, setRoleKey] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const addParticipant = useStore((state) => state.addParticipant);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || skills.length === 0 || !roleKey) return;
    setIsSubmitting(true);
  };

  const finalizeSubmission = async () => {
    try {
      await addParticipant({
        name,
        skills,
        interests,
        roleKey
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Failed to recruit');
      setIsSubmitting(false); // reset loader if fail
    }
  };

  const selectedChar = roleKey ? characters[roleKey] : null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 my-8 relative z-10">
      <RecruitmentHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleSubmit} 
            className="bg-darkBrown/80 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-gold/30"
          >
            <div className="mb-8">
              <label className="block font-display text-2xl mb-3 text-gold">Recruit Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border-2 border-gold/30 rounded-lg p-4 text-parchment focus:border-pirateRed focus:outline-none transition-all font-sans text-xl shadow-inner"
                placeholder="Enter your name..."
                required
              />
            </div>
            
            <SkillInput skills={skills} setSkills={setSkills} />
            
            <InterestInput interests={interests} setInterests={setInterests} />

            <RoleSelector roleKey={roleKey} setRoleKey={setRoleKey} />
            
            <RecruitmentSummary 
              name={name}
              skills={skills}
              interests={interests}
              roleKey={roleKey}
              roleName={selectedChar?.role}
            />

            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
              whileTap={{ scale: 0.98 }}
              disabled={!name || skills.length === 0 || !roleKey}
              className="w-full mt-10 py-5 bg-gradient-to-r from-pirateRed to-red-900 text-parchment font-display tracking-[0.2em] text-2xl rounded-xl shadow-[0_10px_20px_rgba(186,12,12,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gold/50 hover:border-gold"
            >
              JOIN THE GRAND FLEET
            </motion.button>
          </form>
        </div>

        {/* Reaction Column */}
        <div className="lg:col-span-5 self-start lg:sticky lg:top-24 w-full">
          <CharacterReaction 
            characterKey={roleKey} 
            roleName={selectedChar?.role} 
            characterName={selectedChar?.name}
            message={selectedChar?.message} 
            image={selectedChar?.image} 
          />
        </div>
      </div>

      <AnimatePresence>
        {isSubmitting && <SubmissionLoader onComplete={finalizeSubmission} />}
      </AnimatePresence>
    </div>
  );
}
