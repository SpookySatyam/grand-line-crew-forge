import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

export default function SkillInput({ skills, setSkills }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      setSkills([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="mb-6">
      <label className="block font-display text-2xl mb-3 text-gold">Abilities & Skills</label>
      
      <div className="flex gap-2 mb-3">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd(e)}
          className="flex-1 bg-black/40 border-2 border-gold/30 rounded-lg p-3 text-parchment focus:border-pirateRed focus:outline-none transition-all font-sans text-lg"
          placeholder="React, C++, Machine Learning..."
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
          {skills.map((skill) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 bg-darkBrown/80 border border-gold/40 text-parchment px-3 py-1.5 rounded-full text-sm font-sans"
            >
              <span>{skill}</span>
              <button 
                type="button" 
                onClick={() => handleRemove(skill)}
                className="text-parchment/60 hover:text-pirateRed transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {skills.length === 0 && (
            <span className="text-parchment/40 text-sm italic py-2">No abilities added yet...</span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
