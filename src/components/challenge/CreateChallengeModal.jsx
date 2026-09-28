import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function CreateChallengeModal({ isOpen, onClose }) {
  const addChallenge = useStore(state => state.addChallenge);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Normal',
    type: 'Frontend',
    requiredSkills: '',
    requiredRoles: '',
    tags: '',
    minTeamSize: 2
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      addChallenge({
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        type: formData.type,
        requiredSkills: formData.requiredSkills ? formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean) : [],
        requiredRoles: formData.requiredRoles ? formData.requiredRoles.split(',').map(s => s.trim()).filter(Boolean) : [],
        tags: formData.tags ? formData.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        minTeamSize: Number(formData.minTeamSize) || 1
      });
      onClose();
      setFormData({ title: '', description: '', difficulty: 'Normal', type: 'Frontend', requiredSkills: '', requiredRoles: '', tags: '', minTeamSize: 2 });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-darkBrown border-2 border-gold/50 rounded-2xl p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-parchment/60 hover:text-gold transition-colors"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-3xl font-display text-gold mb-6 border-b border-gold/20 pb-4">New Mission Directive</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Mission Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                placeholder="e.g. Infiltrate Enies Lobby"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Mission Briefing</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all min-h-[100px]"
                placeholder="Describe the objective..."
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Threat Level</label>
                <select 
                  value={formData.difficulty}
                  onChange={e => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none"
                >
                  <option value="Easy">Easy (East Blue)</option>
                  <option value="Normal">Normal (Grand Line)</option>
                  <option value="Hard">Hard (New World)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Domain</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none"
                >
                  <option value="Frontend">Frontend (Visuals)</option>
                  <option value="Backend">Backend (Logic)</option>
                  <option value="Fullstack">Fullstack (Complete)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Required Skills (comma separated)</label>
              <input 
                type="text" 
                value={formData.requiredSkills}
                onChange={e => setFormData({...formData, requiredSkills: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none transition-all"
                placeholder="React, Node.js, Design"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Required Roles (comma separated)</label>
              <input 
                type="text" 
                value={formData.requiredRoles}
                onChange={e => setFormData({...formData, requiredRoles: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none transition-all"
                placeholder="Navigator, Shipwright"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Tags / Interests (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none transition-all"
                  placeholder="AI, Security"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Minimum Team Size</label>
                <input 
                  type="number" 
                  min="1"
                  value={formData.minTeamSize}
                  onChange={e => setFormData({...formData, minTeamSize: e.target.value})}
                  className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none transition-all"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pirateRed to-red-900 border border-gold text-parchment font-display tracking-[0.2em] text-xl rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(186,12,12,0.6)] transition-all transform hover:-translate-y-1 mt-4"
            >
              ISSUE DIRECTIVE
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
