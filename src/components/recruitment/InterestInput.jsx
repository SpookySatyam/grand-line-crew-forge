import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

export default function InterestInput({ interests, setInterests }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !interests.includes(inputValue.trim())) {
      setInterests([...interests, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (interestToRemove) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  return (
    <div className="mb-6">
      <label className="block font-display text-2xl mb-3 text-gold">Passions & Interests</label>
      
      <div className="flex gap-2 mb-3">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd(e)}
          className="flex-1 bg-black/40 border-2 border-gold/30 rounded-lg p-3 text-parchment focus:border-pirateRed focus:outline-none transition-all font-sans text-lg"
          placeholder="Web3, AI, Video Games..."
        />
        <button 
          type="button"
          onClick={handleAdd}
          className="px-4 bg-gold/20 hover:bg-gold/40 border-2 border-gold/50 rounded-lg text-gold transition-colors flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        <AnimatePresence>
          {interests.map((interest) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 bg-blue-900/40 border border-blue-400/40 text-parchment px-3 py-1.5 rounded-full text-sm font-sans"
            >
              <span>{interest}</span>
              <button 
                type="button" 
                onClick={() => handleRemove(interest)}
                className="text-parchment/60 hover:text-blue-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {interests.length === 0 && (
            <span className="text-parchment/40 text-sm italic py-2">No passions added yet...</span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
